import type { CompassAnswers } from '@/lib/npsi-selector-data';

interface BrandCompassCardProps {
  answers: CompassAnswers & { physician_involved?: string };
}

const ROWS: { key: keyof BrandCompassCardProps['answers']; label: string }[] = [
  { key: 'reason', label: 'Top reason' },
  { key: 'audience', label: 'Audience to impress' },
  { key: 'feeling', label: 'Desired feeling' },
  { key: 'differentiator', label: 'Differentiator' },
  { key: 'anxiety_level', label: 'Patient anxiety' },
  { key: 'specialty_priority', label: 'Lead specialty' },
];

export default function BrandCompassCard({ answers }: BrandCompassCardProps) {
  const answeredCount = ROWS.filter(r => answers[r.key]).length;

  return (
    <div className="rounded-2xl border border-brand-line bg-white overflow-hidden">
      <div className="px-4 py-3 bg-[#0f172a] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-red" />
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-white">Your Brand Compass</span>
        </div>
        <span className="font-mono text-[10px] text-slate-400">{answeredCount}/{ROWS.length}</span>
      </div>
      <div className="flex flex-wrap gap-1.5 p-3.5">
        {ROWS.map(r => (
          <span
            key={r.key}
            className="inline-flex items-center gap-1.5 text-[11px] bg-brand-bg border border-brand-line rounded-full pl-2 pr-2.5 py-1"
          >
            <span className="text-brand-ink-4 font-mono uppercase text-[9px] tracking-wide">{r.label}</span>
            <span className="text-brand-ink font-medium">{answers[r.key] || '—'}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
