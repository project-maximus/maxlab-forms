import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { saveSubmission } from '@/lib/storage';
import { sendSubmissionEmails } from '@/lib/email';
import { getFormBySlug } from '@/forms';
import { closedAnswers } from '@/lib/form-logic';
import { brandById, brandNotifies } from '@/lib/brands';
import type { FormSubmission } from '@/lib/types';

// Cross-site forms (e.g. pricing.maxxlab.tech) post here directly, so this
// route needs CORS enabled for those origins specifically — everything else
// stays same-origin only.
const ALLOWED_ORIGINS = [
  'https://pricing.maxxlab.tech',
  'https://maxxlab.tech',
];

function corsHeaders(req: NextRequest): Record<string, string> {
  const origin = req.headers.get('origin');
  const isLocalDev = origin ? /^http:\/\/localhost:\d+$/.test(origin) : false;
  if (!origin || (!ALLOWED_ORIGINS.includes(origin) && !isLocalDev)) return {};
  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}

export async function OPTIONS(req: NextRequest) {
  return new NextResponse(null, { status: 204, headers: corsHeaders(req) });
}

export async function POST(req: NextRequest) {
  const headers = corsHeaders(req);
  try {
    const body = await req.json();
    const { formSlug, senderName, senderEmail, senderNote, data, clientId } = body as {
      formSlug: string;
      senderName: string;
      senderEmail: string;
      senderNote: string;
      data: Record<string, string | string[]>;
      /** Stable across retries of the same submission. See saveSubmission. */
      clientId?: string;
    };

    // Validate required fields
    if (!formSlug || !senderName?.trim() || !senderEmail?.trim()) {
      return NextResponse.json({ error: 'formSlug, senderName, and senderEmail are required.' }, { status: 400, headers });
    }

    if (!senderEmail.includes('@')) {
      return NextResponse.json({ error: 'Invalid email address.' }, { status: 400, headers });
    }

    const form = getFormBySlug(formSlug);
    if (!form) {
      return NextResponse.json({ error: `Form "${formSlug}" not found.` }, { status: 404, headers });
    }

    // A closed option is unselectable in the UI, but this endpoint takes a plain
    // POST — reject it here too so the role can't be applied for out of band.
    const closed = closedAnswers(form, data ?? {});
    if (closed.length > 0) {
      console.warn('[submit] Rejected closed option:', closed);
      return NextResponse.json(
        { error: 'That role is no longer accepting applications.' },
        { status: 409, headers },
      );
    }

    const submission: FormSubmission = {
      id: uuidv4(),
      formSlug,
      formTitle: form.title,
      senderName: senderName.trim(),
      senderEmail: senderEmail.trim().toLowerCase(),
      senderNote: senderNote?.trim() ?? '',
      submittedAt: new Date().toISOString(),
      data: data ?? {},
    };

    // The database write is the whole promise we make to the person submitting.
    // Nothing else happens before it, and the response only reports success
    // once it has returned.
    const saved = await saveSubmission(submission, clientId);

    // High-volume forms opt out of email entirely. Two messages per submission
    // across thousands of applicants is a deliverability risk and an extra
    // failure point in the request path, so those are read in the admin panel.
    const brand = brandById(form.brand);
    let emailSent = false;
    if (brandNotifies(brand) && !saved.duplicate) {
      const emailResult = await sendSubmissionEmails(submission);
      emailSent = emailResult.ok;
      if (!emailResult.ok) {
        console.warn('[submit] Email send failed:', emailResult.error);
      }
    }

    return NextResponse.json({
      id: saved.id,
      emailSent,
      duplicate: saved.duplicate,
    }, { status: 201, headers });

  } catch (err) {
    console.error('[submit] Unexpected error:', err);
    const msg = err instanceof Error ? err.message : 'Internal server error';
    return NextResponse.json({ error: msg }, { status: 500, headers });
  }
}
