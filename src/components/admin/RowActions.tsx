'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';

// Delete, restore and purge for one row in the admin panel.
//
// Every destructive action takes two clicks: the first turns the control into
// an explicit confirm, the second carries it out. At several thousand rows a
// one-click delete next to every applicant is an accident waiting to happen.

type Action = 'archive' | 'restore' | 'purge';

const LABEL: Record<Action, { idle: string; confirm: string; busy: string }> = {
  archive: { idle: 'Delete', confirm: 'Confirm delete', busy: 'Deleting...' },
  restore: { idle: 'Restore', confirm: 'Confirm restore', busy: 'Restoring...' },
  purge: { idle: 'Delete for good', confirm: 'This cannot be undone', busy: 'Removing...' },
};

export default function RowActions({ id, archived }: { id: string; archived: boolean }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [armed, setArmed] = useState<Action | null>(null);
  const [busy, setBusy] = useState<Action | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function run(action: Action) {
    setBusy(action);
    setError(null);
    try {
      const res = await fetch('/api/admin/submission', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, action }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? 'Failed');
      setArmed(null);
      startTransition(() => router.refresh());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed');
    } finally {
      setBusy(null);
    }
  }

  function button(action: Action, tone: 'quiet' | 'danger') {
    const isArmed = armed === action;
    const isBusy = busy === action;
    const text = isBusy ? LABEL[action].busy : isArmed ? LABEL[action].confirm : LABEL[action].idle;
    return (
      <button
        type="button"
        disabled={isBusy || pending}
        onClick={() => { if (isArmed) { run(action); } else { setArmed(action); setError(null); } }}
        className={[
          'px-2 py-1 rounded text-[12px] font-medium transition-colors disabled:opacity-50 whitespace-nowrap',
          isArmed
            ? 'bg-brand-red text-white hover:bg-brand-red-dark'
            : tone === 'danger'
              ? 'text-brand-red hover:text-brand-red-dark'
              : 'text-brand-ink-3 hover:text-brand-ink',
        ].join(' ')}
      >
        {text}
      </button>
    );
  }

  return (
    <div className="flex items-center justify-end gap-1">
      {error && <span className="text-[11px] text-brand-red mr-1">{error}</span>}
      {armed && (
        <button
          type="button"
          onClick={() => setArmed(null)}
          className="px-2 py-1 text-[12px] text-brand-ink-4 hover:text-brand-ink transition-colors"
        >
          Cancel
        </button>
      )}
      {archived ? (
        <>
          {button('restore', 'quiet')}
          {button('purge', 'danger')}
        </>
      ) : (
        button('archive', 'danger')
      )}
    </div>
  );
}
