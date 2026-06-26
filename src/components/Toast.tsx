'use client';

import clsx from 'clsx';

export default function Toast({ msg, error }: { msg: string; error?: boolean }) {
  return (
    <div className={clsx(
      'fixed bottom-28 left-1/2 -translate-x-1/2 z-[200] px-5 py-3 rounded-2xl text-sm font-medium text-white shadow-xl animate-slide-up pointer-events-none max-w-[90vw] text-center',
      error ? 'bg-red-600' : 'bg-[#0f172a]'
    )}>
      {msg}
    </div>
  );
}
