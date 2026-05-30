'use client';

export default function PrintButton({ label = 'Save PDF' }: { label?: string }) {
  return (
    <button
      onClick={() => window.print()}
      className="px-3.5 py-2 text-xs font-medium border border-brand-line rounded-full hover:border-brand-ink transition-colors"
    >
      {label}
    </button>
  );
}
