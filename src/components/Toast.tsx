'use client';

import clsx from 'clsx';

export default function Toast({ msg, error }: { msg: string; error?: boolean }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={clsx(
      'fixed bottom-28 left-1/2 -translate-x-1/2 z-[200] px-5 py-3 rounded-md text-[13px] font-medium text-white shadow-lg animate-slide-up pointer-events-none max-w-[90vw] text-center',
      error ? 'bg-brand-red' : 'bg-brand-ink'
    )}>
      {msg}
    </div>
  );
}
