import clsx from 'clsx';
import type { Palette } from '@/lib/npsi-selector-data';

// ── Tiny rendered building blocks ───────────────────────────────────────────────

function Bar({ className, palette, tone = 'ink', opacity = 0.18 }: { className: string; palette: Palette; tone?: 'ink' | 'accent'; opacity?: number }) {
  return <div className={clsx('h-1.5 rounded-full', className)} style={{ background: palette[tone === 'ink' ? 'ink' : 'accent'], opacity }} />;
}

function Block({ className, palette, tint = false }: { className: string; palette: Palette; tint?: boolean }) {
  const bg = tint ? `${palette.ink}0f` : `linear-gradient(135deg, ${palette.accent}55, ${palette.secondary}40)`;
  return <div className={clsx('rounded-sm flex-shrink-0', className)} style={{ background: bg }} />;
}

function Circle({ className, palette }: { className: string; palette: Palette }) {
  return <div className={clsx('rounded-full flex-shrink-0', className)} style={{ background: `linear-gradient(135deg, ${palette.accent}66, ${palette.secondary}40)` }} />;
}

function Glyph({ children, palette, className }: { children: string; palette: Palette; className?: string }) {
  return <span className={clsx('leading-none', className)} style={{ color: palette.accent, fontSize: 9 }}>{children}</span>;
}

function Card({ palette, children, className }: { palette: Palette; children: React.ReactNode; className?: string }) {
  return (
    <div className={clsx('rounded-lg p-2 flex flex-col gap-1.5 justify-center', className)} style={{ background: palette.bg, border: `1px solid ${palette.ink}1f` }}>
      {children}
    </div>
  );
}

// ── 24 option-level mini mockups, keyed `${fieldId}:${optionId}` ──────────────

const PREVIEWS: Record<string, (p: Palette) => React.ReactNode> = {
  'hero_component:full-bleed': p => (
    <Card palette={p}>
      <Block className="w-full h-6" palette={p} />
      <Bar className="w-3/4" palette={p} />
      <Bar className="w-1/3" palette={p} opacity={0.1} />
    </Card>
  ),
  'hero_component:split': p => (
    <Card palette={p}>
      <div className="flex gap-1.5 items-center">
        <div className="flex-1 flex flex-col gap-1">
          <Bar className="w-full" palette={p} />
          <Bar className="w-2/3" palette={p} opacity={0.1} />
        </div>
        <Block className="w-7 h-7" palette={p} />
      </div>
    </Card>
  ),
  'hero_component:physician-led': p => (
    <Card palette={p}>
      <div className="flex gap-1.5 items-center">
        <Circle className="w-7 h-7" palette={p} />
        <div className="flex-1 flex flex-col gap-1">
          <Bar className="w-full" palette={p} />
          <Bar className="w-1/2" palette={p} opacity={0.1} />
        </div>
      </div>
    </Card>
  ),

  'trust_component:logo-strip': p => (
    <Card palette={p}>
      <Bar className="w-1/2" palette={p} opacity={0.1} />
      <div className="flex gap-1">
        {[0, 1, 2].map(i => <Block key={i} className="w-5 h-2.5" palette={p} tint />)}
      </div>
    </Card>
  ),
  'trust_component:hero-integrated': p => (
    <Card palette={p}>
      <div className="relative">
        <Block className="w-full h-6" palette={p} />
        <span
          className="absolute top-1 left-1 text-[6px] font-mono font-semibold px-1 rounded"
          style={{ background: p.bg, color: p.accent }}
        >● AAAHC</span>
      </div>
    </Card>
  ),
  'trust_component:dedicated': p => (
    <Card palette={p}>
      <Bar className="w-2/3" palette={p} />
      <Bar className="w-full" palette={p} opacity={0.1} />
      <Bar className="w-1/4" palette={p} tone="accent" opacity={0.7} />
    </Card>
  ),

  'physicians_component:grid': p => (
    <Card palette={p}>
      <div className="flex gap-1.5">
        {[0, 1, 2].map(i => (
          <div key={i} className="flex-1 flex flex-col items-center gap-1">
            <Circle className="w-4 h-4" palette={p} />
            <Bar className="w-full" palette={p} opacity={0.1} />
          </div>
        ))}
      </div>
    </Card>
  ),
  'physicians_component:spotlight': p => (
    <Card palette={p}>
      <div className="flex gap-1.5 items-center">
        <Circle className="w-9 h-9" palette={p} />
        <div className="flex-1 flex flex-col gap-1">
          <Bar className="w-full" palette={p} />
          <Bar className="w-2/3" palette={p} opacity={0.1} />
        </div>
      </div>
    </Card>
  ),
  'physicians_component:team-photo': p => (
    <Card palette={p}>
      <Block className="w-full h-6" palette={p} />
      <div className="flex gap-1 -mt-2 pl-1">
        {[0, 1, 2].map(i => <Circle key={i} className="w-3 h-3 border" palette={p} />)}
      </div>
    </Card>
  ),

  'specialties_component:icon-grid': p => (
    <Card palette={p}>
      <div className="grid grid-cols-3 gap-1">
        {[0, 1, 2, 3, 4, 5].map(i => (
          <div key={i} className="flex flex-col items-center gap-0.5">
            <Circle className="w-3 h-3" palette={p} />
            <Bar className="w-3/4" palette={p} opacity={0.1} />
          </div>
        ))}
      </div>
    </Card>
  ),
  'specialties_component:photo-cards': p => (
    <Card palette={p}>
      <div className="flex gap-1">
        {[0, 1, 2].map(i => <Block key={i} className="flex-1 h-8" palette={p} />)}
      </div>
    </Card>
  ),
  'specialties_component:text-list': p => (
    <Card palette={p}>
      {[0, 1, 2].map(i => (
        <div key={i} className="flex items-center justify-between">
          <Bar className="w-3/4" palette={p} opacity={0.12} />
          <Glyph palette={p}>⌄</Glyph>
        </div>
      ))}
    </Card>
  ),

  'proof_component:pull-quote': p => (
    <Card palette={p}>
      <Glyph palette={p} className="text-base">“</Glyph>
      <Bar className="w-full" palette={p} opacity={0.14} />
      <Bar className="w-1/3" palette={p} opacity={0.1} />
    </Card>
  ),
  'proof_component:video': p => (
    <Card palette={p}>
      <div className="flex gap-1">
        {[0, 1, 2].map(i => (
          <div key={i} className="relative flex-1">
            <Block className="w-full h-7" palette={p} />
            <span className="absolute inset-0 flex items-center justify-center text-[8px]" style={{ color: p.bg }}>▶</span>
          </div>
        ))}
      </div>
    </Card>
  ),
  'proof_component:ratings': p => (
    <Card palette={p}>
      <Glyph palette={p} className="text-[10px]">★★★★★</Glyph>
      <Bar className="w-full" palette={p} opacity={0.1} />
      <Bar className="w-2/3" palette={p} opacity={0.1} />
    </Card>
  ),

  'patient_info_component:faq': p => (
    <Card palette={p}>
      {[0, 1, 2].map(i => (
        <div key={i} className="flex items-center justify-between">
          <Bar className="w-3/4" palette={p} opacity={0.12} />
          <Glyph palette={p}>⌄</Glyph>
        </div>
      ))}
    </Card>
  ),
  'patient_info_component:timeline': p => (
    <Card palette={p}>
      <div className="flex items-center gap-1">
        {[0, 1, 2, 3].map(i => (
          <div key={i} className="flex-1 flex items-center">
            <Circle className="w-2.5 h-2.5" palette={p} />
            {i < 3 && <div className="flex-1 h-px" style={{ background: `${p.ink}30` }} />}
          </div>
        ))}
      </div>
      <Bar className="w-full" palette={p} opacity={0.08} />
    </Card>
  ),
  'patient_info_component:downloads': p => (
    <Card palette={p}>
      {[0, 1, 2].map(i => (
        <div key={i} className="flex items-center gap-1.5">
          <Glyph palette={p}>▤</Glyph>
          <Bar className="w-2/3" palette={p} opacity={0.12} />
        </div>
      ))}
    </Card>
  ),

  'contact_component:phone-forward': p => (
    <Card palette={p}>
      <Bar className="w-full h-3" palette={p} tone="accent" opacity={0.85} />
      <Bar className="w-1/2" palette={p} opacity={0.1} />
    </Card>
  ),
  'contact_component:form-phone': p => (
    <Card palette={p}>
      <div className="flex gap-1.5">
        <div className="flex-1 flex flex-col gap-1">
          <Block className="w-full h-2" palette={p} tint />
          <Block className="w-full h-2" palette={p} tint />
        </div>
        <Bar className="w-6 self-center" palette={p} tone="accent" opacity={0.7} />
      </div>
    </Card>
  ),
  'contact_component:referral': p => (
    <Card palette={p}>
      <Bar className="w-1/2" palette={p} opacity={0.7} tone="accent" />
      <Block className="w-full h-2" palette={p} tint />
      <Block className="w-full h-2" palette={p} tint />
    </Card>
  ),

  'location_component:map': p => (
    <Card palette={p}>
      <div className="relative">
        <Block className="w-full h-9" palette={p} tint />
        <span className="absolute inset-0 flex items-center justify-center text-[10px]" style={{ color: p.accent }}>📍</span>
      </div>
    </Card>
  ),
  'location_component:gallery-map': p => (
    <Card palette={p}>
      <div className="flex gap-1">
        <Block className="flex-1 h-8" palette={p} />
        <Block className="flex-1 h-8" palette={p} />
        <div className="relative flex-1">
          <Block className="w-full h-8" palette={p} tint />
          <span className="absolute inset-0 flex items-center justify-center text-[9px]" style={{ color: p.accent }}>📍</span>
        </div>
      </div>
    </Card>
  ),
};

export default function ComponentPreview({ fieldId, optionId, palette }: { fieldId: string; optionId: string; palette: Palette }) {
  const render = PREVIEWS[`${fieldId}:${optionId}`];
  return render ? <>{render(palette)}</> : null;
}
