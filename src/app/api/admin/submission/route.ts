import { NextRequest, NextResponse } from 'next/server';
import { archiveSubmission, restoreSubmission, purgeSubmission } from '@/lib/storage';

// Archive, restore or permanently remove one submission.
//
// Sits under /api/admin, so middleware has already required the dashboard
// password before any of this runs.
//
// "archive" is what the panel's Delete button does: the row stays, it just
// stops appearing. "purge" is the irreversible one and only applies to
// something already archived, so a single misclick can never destroy a live
// application.

export const dynamic = 'force-dynamic';

type Action = 'archive' | 'restore' | 'purge';

export async function POST(req: NextRequest) {
  try {
    const { id, action } = (await req.json()) as { id?: string; action?: Action };

    if (!id || typeof id !== 'string') {
      return NextResponse.json({ error: 'id is required.' }, { status: 400 });
    }
    if (action !== 'archive' && action !== 'restore' && action !== 'purge') {
      return NextResponse.json({ error: 'action must be archive, restore or purge.' }, { status: 400 });
    }

    const changed =
      action === 'archive' ? await archiveSubmission(id)
      : action === 'restore' ? await restoreSubmission(id)
      : await purgeSubmission(id);

    if (!changed) {
      // Either the id is unknown, or it was already in the state asked for.
      return NextResponse.json(
        { error: 'Nothing changed. It may already be in that state.' },
        { status: 404 },
      );
    }

    return NextResponse.json({ ok: true, id, action });
  } catch (err) {
    console.error('[admin/submission] Failed:', err);
    const msg = err instanceof Error ? err.message : 'Request failed';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
