import { getDb } from './db';
import type { FormSubmission, SubmissionIndexEntry } from './types';

/* eslint-disable @typescript-eslint/no-explicit-any */
type Row = Record<string, any>;

/**
 * Writes a submission and returns the id that is now stored.
 *
 * `clientId` makes this idempotent. The browser generates it once per submit
 * attempt and resends the same value on a retry, so a dropped response or a
 * double click resolves to the row that already exists rather than a second
 * applicant. Without a clientId the insert is unconditional, which keeps the
 * older forms and the cross-site posts working unchanged.
 */
export async function saveSubmission(
  submission: FormSubmission,
  clientId?: string,
): Promise<{ id: string; duplicate: boolean }> {
  const sql = getDb();

  if (!clientId) {
    await sql`
      INSERT INTO submissions (id, form_slug, form_title, sender_name, sender_email, sender_note, submitted_at, data)
      VALUES (
        ${submission.id}, ${submission.formSlug}, ${submission.formTitle},
        ${submission.senderName}, ${submission.senderEmail}, ${submission.senderNote || ''},
        ${submission.submittedAt}, ${JSON.stringify(submission.data)}::jsonb
      )
    `;
    return { id: submission.id, duplicate: false };
  }

  const inserted = await sql`
    INSERT INTO submissions (id, form_slug, form_title, sender_name, sender_email, sender_note, submitted_at, data, client_id)
    VALUES (
      ${submission.id}, ${submission.formSlug}, ${submission.formTitle},
      ${submission.senderName}, ${submission.senderEmail}, ${submission.senderNote || ''},
      ${submission.submittedAt}, ${JSON.stringify(submission.data)}::jsonb, ${clientId}
    )
    -- The unique index on client_id is partial (WHERE client_id IS NOT NULL),
    -- so the predicate has to be repeated here or Postgres cannot match the
    -- index and raises "no unique or exclusion constraint matching".
    ON CONFLICT (client_id) WHERE client_id IS NOT NULL DO NOTHING
    RETURNING id
  ` as Row[];

  if (inserted.length > 0) return { id: inserted[0].id, duplicate: false };

  // Lost the race, or this is a retry: hand back the row that is already there.
  const existing = await sql`
    SELECT id FROM submissions WHERE client_id = ${clientId} LIMIT 1
  ` as Row[];
  return { id: existing[0]?.id ?? submission.id, duplicate: true };
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



// ── Admin panel queries ───────────────────────────────────────────────────────
// Scoped to one form and paged, because a popular form can hold thousands of
// rows and nothing here should ever load all of them at once.

export interface SubmissionPage {
  rows: SubmissionIndexEntry[];
  total: number;
}

export async function listSubmissionsForForm(
  formSlug: string,
  opts: { limit?: number; offset?: number; search?: string; role?: string } = {},
): Promise<SubmissionPage> {
  const sql = getDb();
  const limit = Math.min(Math.max(opts.limit ?? 50, 1), 200);
  const offset = Math.max(opts.offset ?? 0, 0);
  const search = opts.search?.trim() ?? '';
  const like = `%${search}%`;
  const role = opts.role?.trim() ?? '';

  // Both filters are optional, expressed as "no filter given, or it matches",
  // so this stays one statement instead of four hand-written variants.
  const rows = await sql`
    SELECT id, form_slug, form_title, sender_name, sender_email, submitted_at, data
    FROM submissions
    WHERE form_slug = ${formSlug}
      AND (${search}::text = '' OR sender_name ILIKE ${like} OR sender_email ILIKE ${like})
      AND (${role}::text = '' OR data ->> 'role' = ${role})
    ORDER BY submitted_at DESC
    LIMIT ${limit} OFFSET ${offset}
  ` as Row[];

  const counted = await sql`
    SELECT COUNT(*)::int AS n
    FROM submissions
    WHERE form_slug = ${formSlug}
      AND (${search}::text = '' OR sender_name ILIKE ${like} OR sender_email ILIKE ${like})
      AND (${role}::text = '' OR data ->> 'role' = ${role})
  ` as Row[];

  return {
    total: counted[0]?.n ?? 0,
    rows: rows.map(r => ({
      id: r.id,
      formSlug: r.form_slug,
      formTitle: r.form_title,
      senderName: r.sender_name,
      senderEmail: r.sender_email,
      submittedAt: r.submitted_at,
      data: typeof r.data === 'string' ? JSON.parse(r.data) : r.data,
    })),
  };
}

/** How many submissions chose each value of a field. Drives the role counts. */
export async function countByField(
  formSlug: string,
  fieldId: string,
): Promise<Record<string, number>> {
  const sql = getDb();
  const rows = await sql`
    SELECT data ->> ${fieldId} AS value, COUNT(*)::int AS n
    FROM submissions
    WHERE form_slug = ${formSlug}
    GROUP BY 1
  ` as Row[];
  const out: Record<string, number> = {};
  for (const r of rows) if (r.value) out[r.value] = r.n;
  return out;
}

/**
 * Streams every submission for a form in id order, a page at a time, so an
 * export of thousands of rows never holds them all in memory at once.
 */
export async function* iterateSubmissionsForForm(
  formSlug: string,
  batch = 200,
): AsyncGenerator<FormSubmission[]> {
  const sql = getDb();
  let offset = 0;
  for (;;) {
    const rows = await sql`
      SELECT id, form_slug, form_title, sender_name, sender_email, sender_note, submitted_at, data
      FROM submissions
      WHERE form_slug = ${formSlug}
      ORDER BY submitted_at DESC
      LIMIT ${batch} OFFSET ${offset}
    ` as Row[];
    if (rows.length === 0) return;
    yield rows.map(r => ({
      id: r.id,
      formSlug: r.form_slug,
      formTitle: r.form_title,
      senderName: r.sender_name,
      senderEmail: r.sender_email,
      senderNote: r.sender_note,
      submittedAt: r.submitted_at,
      data: typeof r.data === 'string' ? JSON.parse(r.data) : r.data,
    }));
    if (rows.length < batch) return;
    offset += batch;
  }
}
