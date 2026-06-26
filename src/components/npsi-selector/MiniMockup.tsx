import clsx from 'clsx';
import { DEFAULT_BRAND_NAME, type Direction } from '@/lib/npsi-selector-data';

// ── Shared mini webpage mockup ──────────────────────────────────────────────────
// Used in both the elimination tiles (compact) and the full gallery cards (full).
// This is the actual visual preview that replaces design jargon — a client never
// needs to know what "glassmorphism" means if they can just see it rendered.

export default function MiniMockup({
  direction, compact = false, brandName = DEFAULT_BRAND_NAME,
}: { direction: Direction; compact?: boolean; brandName?: string }) {
  const { palette, typography } = direction;

  return (
    <div className="rounded-xl overflow-hidden shadow-md" style={{ background: palette.bg, border: `1px solid ${palette.ink}1a` }}>
      {!compact && (
        <div className="h-5 flex items-center gap-1 px-2.5" style={{ background: `${palette.ink}0d` }}>
          <span className="w-1.5 h-1.5 rounded-full bg-red-300" />
          <span className="w-1.5 h-1.5 rounded-full bg-amber-300" />
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-300" />
        </div>
      )}

      <div
        className={clsx('flex items-center justify-between', compact ? 'px-2.5 py-1.5' : 'px-4 py-2.5')}
        style={{ borderBottom: `1px solid ${palette.ink}14` }}
      >
        <div className="flex items-center gap-1.5">
          <span className={compact ? 'w-3 h-3 rounded' : 'w-4 h-4 rounded'} style={{ background: palette.accent }} />
          {!compact && <span className={typography.labelClass} style={{ color: palette.ink }}>{brandName}</span>}
        </div>
        <div className="flex gap-1">
          {[0, 1, 2].map(i => (
            <span key={i} className={clsx('h-1 rounded-full', compact ? 'w-3' : 'w-5')} style={{ background: palette.ink, opacity: 0.18 }} />
          ))}
        </div>
      </div>

      <div className={clsx('flex items-center gap-2.5', compact ? 'px-2.5 py-2.5' : 'px-4 py-5')}>
        <div className="flex-1 min-w-0">
          {!compact && (
            <div className={typography.labelClass} style={{ color: palette.accent }}>{brandName}</div>
          )}
          <div className={clsx(typography.headingClass, compact ? 'mt-0 leading-tight' : 'mt-1')} style={{ color: palette.ink, fontSize: compact ? 13 : undefined }}>
            {direction.typography.sample}
          </div>
          {!compact && <div className="h-1.5 w-28 rounded-full mt-2.5" style={{ background: palette.ink, opacity: 0.14 }} />}
          <span
            className={clsx('inline-block rounded-full font-semibold', compact ? 'mt-1.5 px-2.5 py-1 text-[9px]' : 'mt-3 px-3 py-1.5 text-[10px]')}
            style={{ background: palette.accent, color: palette.buttonText }}
          >
            {compact ? 'Get started' : 'Get started today'}
          </span>
        </div>
        <div
          className={clsx('rounded-lg flex-shrink-0', compact ? 'w-11 h-9' : 'w-20 h-16')}
          style={{ background: `linear-gradient(135deg, ${palette.accent}40, ${palette.secondary}40)` }}
        />
      </div>

      {!compact && (
        <div
          className="flex items-center gap-2.5 px-4 py-2.5"
          style={{ background: `${palette.secondary}14`, borderTop: `1px solid ${palette.ink}10` }}
        >
          <span
            className="text-[7px] font-mono font-semibold uppercase tracking-wide flex items-center gap-1 flex-shrink-0"
            style={{ color: palette.accent }}
          >
            <span className="w-1 h-1 rounded-full" style={{ background: palette.accent }} /> Certified
          </span>
          {[0, 1, 2].map(i => (
            <span key={i} className="h-2.5 w-7 rounded" style={{ background: palette.ink, opacity: 0.12 }} />
          ))}
        </div>
      )}
    </div>
  );
}
