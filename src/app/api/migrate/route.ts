import { NextRequest, NextResponse } from 'next/server';
import { createTable, seedFromJson } from '@/lib/migrate';

export async function POST(req: NextRequest) {
  try {
    // Simple token-based auth to prevent public access
    const { searchParams } = new URL(req.url);
    const token = searchParams.get('token');
    const expected = process.env.MIGRATE_SECRET || 'maxxlab-migrate-2026';

    if (token !== expected) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Create tables
    await createTable();

    // Seed from existing JSON files
    const seeded = await seedFromJson();

    return NextResponse.json({
      ok: true,
      message: `Migration complete. ${seeded} submissions seeded.`,
    });
  } catch (err) {
    console.error('[migrate] Error:', err);
    const msg = err instanceof Error ? err.message : 'Migration failed';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
