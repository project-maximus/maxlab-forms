import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { saveSubmission } from '@/lib/storage';
import { sendSubmissionEmails } from '@/lib/email';
import { getFormBySlug } from '@/forms';
import type { FormSubmission } from '@/lib/types';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { formSlug, senderName, senderEmail, senderNote, data } = body as {
      formSlug: string;
      senderName: string;
      senderEmail: string;
      senderNote: string;
      data: Record<string, string | string[]>;
    };

    // Validate required fields
    if (!formSlug || !senderName?.trim() || !senderEmail?.trim()) {
      return NextResponse.json({ error: 'formSlug, senderName, and senderEmail are required.' }, { status: 400 });
    }

    if (!senderEmail.includes('@')) {
      return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 });
    }

    const form = getFormBySlug(formSlug);
    if (!form) {
      return NextResponse.json({ error: `Form "${formSlug}" not found.` }, { status: 404 });
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

    // Save to database first — email failure should not block submission
    await saveSubmission(submission);

    // Send emails (non-blocking on failure)
    const emailResult = await sendSubmissionEmails(submission);
    if (!emailResult.ok) {
      console.warn('[submit] Email send failed:', emailResult.error);
    }

    return NextResponse.json({
      id: submission.id,
      emailSent: emailResult.ok,
    }, { status: 201 });

  } catch (err) {
    console.error('[submit] Unexpected error:', err);
    const msg = err instanceof Error ? err.message : 'Internal server error';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
