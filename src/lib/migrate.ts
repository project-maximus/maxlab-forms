import { getDb } from './db';
import fs from 'fs';
import path from 'path';
import type { FormSubmission } from './types';

// ── Create the submissions table ──────────────────────────────────────────────
export async function createTable() {
  const sql = getDb();
  await sql`
    CREATE TABLE IF NOT EXISTS submissions (
      id            TEXT PRIMARY KEY,
      form_slug     TEXT NOT NULL,
      form_title    TEXT NOT NULL,
      sender_name   TEXT NOT NULL,
      sender_email  TEXT NOT NULL,
      sender_note   TEXT NOT NULL DEFAULT '',
      submitted_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      data          JSONB NOT NULL DEFAULT '{}'::jsonb
    )
  `;
  // Index for listing submissions in reverse-chrono order
  await sql`
    CREATE INDEX IF NOT EXISTS idx_submissions_submitted_at
    ON submissions (submitted_at DESC)
  `;
}

// ── Seed existing JSON submissions into the database ──────────────────────────
export async function seedFromJson(): Promise<number> {
  const sql = getDb();
  const dataDir = path.join(process.cwd(), 'data', 'submissions');
  const indexFile = path.join(process.cwd(), 'data', 'index.json');

  // Read the index to get submission IDs
  let ids: string[] = [];
  try {
    const raw = fs.readFileSync(indexFile, 'utf-8');
    const entries = JSON.parse(raw) as { id: string }[];
    ids = entries.map(e => e.id);
  } catch {
    // No index file — try reading directory directly
    try {
      ids = fs.readdirSync(dataDir)
        .filter(f => f.endsWith('.json'))
        .map(f => f.replace('.json', ''));
    } catch {
      return 0; // No data to seed
    }
  }

  let seeded = 0;
  for (const id of ids) {
    try {
      const filePath = path.join(dataDir, `${id}.json`);
      const raw = fs.readFileSync(filePath, 'utf-8');
      const sub = JSON.parse(raw) as FormSubmission;

      // Upsert — skip if already exists
      await sql`
        INSERT INTO submissions (id, form_slug, form_title, sender_name, sender_email, sender_note, submitted_at, data)
        VALUES (
          ${sub.id},
          ${sub.formSlug},
          ${sub.formTitle},
          ${sub.senderName},
          ${sub.senderEmail},
          ${sub.senderNote || ''},
          ${sub.submittedAt},
          ${JSON.stringify(sub.data)}::jsonb
        )
        ON CONFLICT (id) DO NOTHING
      `;
      seeded++;
    } catch (err) {
      console.warn(`[migrate] Skipping ${id}:`, err);
    }
  }
  return seeded;
}
