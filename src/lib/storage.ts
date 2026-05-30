import { getDb } from './db';
import type { FormSubmission, SubmissionIndexEntry } from './types';

/* eslint-disable @typescript-eslint/no-explicit-any */
type Row = Record<string, any>;

export async function saveSubmission(submission: FormSubmission): Promise<void> {
  const sql = getDb();
  await sql`
    INSERT INTO submissions (id, form_slug, form_title, sender_name, sender_email, sender_note, submitted_at, data)
    VALUES (
      ${submission.id},
      ${submission.formSlug},
      ${submission.formTitle},
      ${submission.senderName},
      ${submission.senderEmail},
      ${submission.senderNote || ''},
      ${submission.submittedAt},
      ${JSON.stringify(submission.data)}::jsonb
    )
  `;
}

export async function getSubmission(id: string): Promise<FormSubmission | null> {
  const sql = getDb();
  const rows = await sql`
    SELECT id, form_slug, form_title, sender_name, sender_email, sender_note, submitted_at, data
    FROM submissions
    WHERE id = ${id}
    LIMIT 1
  ` as Row[];

  if (rows.length === 0) return null;

  const r = rows[0];
  return {
    id: r.id,
    formSlug: r.form_slug,
    formTitle: r.form_title,
    senderName: r.sender_name,
    senderEmail: r.sender_email,
    senderNote: r.sender_note,
    submittedAt: r.submitted_at,
    data: typeof r.data === 'string' ? JSON.parse(r.data) : r.data,
  };
}

export async function listSubmissions(limit = 50): Promise<SubmissionIndexEntry[]> {
  const sql = getDb();
  const rows = await sql`
    SELECT id, form_slug, form_title, sender_name, sender_email, submitted_at
    FROM submissions
    ORDER BY submitted_at DESC
    LIMIT ${limit}
  ` as Row[];

  return rows.map(r => ({
    id: r.id,
    formSlug: r.form_slug,
    formTitle: r.form_title,
    senderName: r.sender_name,
    senderEmail: r.sender_email,
    submittedAt: r.submitted_at,
  }));
}

