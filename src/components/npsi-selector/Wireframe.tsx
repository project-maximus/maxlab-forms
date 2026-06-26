import clsx from 'clsx';

// ── Grayscale layout-skeleton diagrams ──────────────────────────────────────────
// Used by navigation, homepage-structure, and trust-style options. Deliberately
// unstyled (no color, no brand voice) so clients choose structure, not taste.

export function NavWireframe({ items }: { items: string[] }) {
  return (
    <div className="border border-slate-300 rounded-md bg-white px-2 py-2 flex items-center gap-1.5 overflow-hidden">
      <div className="w-3.5 h-3.5 rounded-full bg-slate-700 flex-shrink-0" />
      <div className="flex-1 flex items-center justify-end gap-1 min-w-0">
        {items.slice(0, 4).map((item, i) => (
          <span
            key={i}
            className="inline-block text-[7px] font-mono text-slate-500 bg-slate-100 border border-slate-200 rounded px-1 py-0.5 truncate max-w-[26px] flex-shrink-0"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

const SECTION_HEIGHT: Record<string, string> = {
  Hero: 'h-9', 'Physician-led intro': 'h-8',
};

export function HomepageWireframe({ sections }: { sections: string[] }) {
  return (
    <div className="border border-slate-300 rounded-md bg-white p-2 flex flex-col gap-1">
      {sections.map((s, i) => (
        <div
          key={i}
          className={clsx(
            'rounded-sm bg-slate-100 border border-slate-200 flex items-center px-2',
            SECTION_HEIGHT[s] ?? 'h-5'
          )}
        >
          <span className="text-[8px] font-mono text-slate-500 uppercase tracking-wide truncate">{s}</span>
        </div>
      ))}
    </div>
  );
}

export function TrustDiagram({ position }: { position: 'hero' | 'band' | 'section' | 'footer' }) {
  const Dot = () => (
    <span className="inline-flex items-center gap-1 text-[7px] font-mono font-semibold text-brand-red bg-red-50 border border-red-200 rounded px-1 py-0.5 whitespace-nowrap">
      <span className="w-1 h-1 rounded-full bg-brand-red" /> AAAHC
    </span>
  );
  return (
    <div className="border border-slate-300 rounded-md bg-white p-2 flex flex-col gap-1">
      <div className="h-4 rounded-sm bg-slate-100 border border-slate-200 flex items-center justify-between px-1.5">
        <span className="text-[7px] font-mono text-slate-400">NAV</span>
        {position === 'hero' && <Dot />}
      </div>
      <div className="h-7 rounded-sm bg-slate-100 border border-slate-200 flex items-center justify-center">
        {position === 'band' ? <Dot /> : <span className="text-[7px] font-mono text-slate-400">HERO</span>}
      </div>
      <div className="h-5 rounded-sm bg-slate-100 border border-slate-200 flex items-center justify-center gap-1.5">
        <span className="text-[7px] font-mono text-slate-400">PHYSICIANS</span>
        {position === 'section' && <Dot />}
      </div>
      <div className="h-3 rounded-sm bg-slate-50 border border-slate-200 flex items-center justify-center">
        {position === 'footer' ? <Dot /> : <span className="text-[6px] font-mono text-slate-300">FOOTER</span>}
      </div>
    </div>
  );
}
