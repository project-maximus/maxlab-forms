import { NextRequest, NextResponse } from 'next/server';
import { getFormBySlug } from '@/forms';
import { iterateSubmissionsForForm } from '@/lib/storage';
import { inputFields, displayValue, matrixAnswers } from '@/lib/form-logic';
import type { FormField, FormSubmission } from '@/lib/types';

// CSV of every submission for one form. Streamed a page at a time so an export
// of several thousand applications never builds the whole file in memory.
//
// Protected by the same Basic Auth as the dashboard, applied in middleware.

export const dynamic = 'force-dynamic';

function cell(v: string): string {
  // Quote whenever the value could otherwise break the row, and double any
  // quotes inside it. A leading =, +, - or @ is prefixed with a single quote so
  // spreadsheets treat it as text rather than a formula.
  const risky = /^[=+\-@]/.test(v);
  const value = risky ? `'${v}` : v;
  return /[",\n\r]/.test(value) ? `"${value.replace(/"/g, '""')}"` : value;
}

/**
 * displayValue covers text, options and lists, but returns nothing for an
 * upload or a matrix, which would silently drop resume links from the export.
 */
function answerFor(field: FormField, sub: FormSubmission): string {
  const raw = sub.data?.[field.id];

  if (field.type === 'file') {
    if (!Array.isArray(raw)) return '';
    return raw
      .filter((f): f is { name: string; url: string; size: number } =>
        typeof f === 'object' && f !== null && 'url' in f)
      .map(f => f.url)
      .join(' | ');
  }

  if (field.type === 'matrix') {
    return matrixAnswers(field, sub.data ?? {})
      .map(a => `${a.label}: ${a.value}`)
      .join(' | ');
  }

  return displayValue(field, raw);
}

export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get('slug') ?? '';
  const role = (req.nextUrl.searchParams.get('role') ?? '').trim();

  const form = getFormBySlug(slug);
  if (!form) {
    return NextResponse.json({ error: 'Unknown form.' }, { status: 404 });
  }

  // One column per question, in the order they appear on the form.
  const fields: FormField[] = form.sections.flatMap(s => inputFields(s));
  const seen = new Set<string>();
  const columns = fields.filter(f => (seen.has(f.id) ? false : (seen.add(f.id), true)));

  const header = [
    'Submitted at', 'Name', 'Email', 'Reference',
    ...columns.map(f => f.label ?? f.id),
  ];

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      try {
        // BOM so Excel opens UTF-8 names correctly.
        controller.enqueue(encoder.encode('﻿' + header.map(cell).join(',') + '\r\n'));
        for await (const batch of iterateSubmissionsForForm(slug)) {
          let chunk = '';
          for (const sub of batch) {
            if (role && sub.data?.role !== role) continue;
            const row = [
              sub.submittedAt,
              sub.senderName,
              sub.senderEmail,
              sub.id,
              ...columns.map(f => answerFor(f, sub)),
            ];
            chunk += row.map(v => cell(String(v ?? ''))).join(',') + '\r\n';
          }
          if (chunk) controller.enqueue(encoder.encode(chunk));
        }
        controller.close();
      } catch (err) {
        console.error('[export] Failed:', err);
        controller.error(err);
      }
    },
  });

  const stamp = new Date().toISOString().slice(0, 10);
  const name = `${slug}${role ? `-${role}` : ''}-${stamp}.csv`;

  return new NextResponse(stream, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="${name}"`,
      'Cache-Control': 'no-store',
    },
  });
}
