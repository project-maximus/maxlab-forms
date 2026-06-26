'use client';

import { motion } from 'framer-motion';
import clsx from 'clsx';
import type { Palette } from '@/lib/npsi-selector-data';

interface ComparisonRow {
  label: string;
  us: boolean;
  them: boolean;
}

const ROWS: ComparisonRow[] = [
  { label: 'Dedicated point of contact', us: true, them: false },
  { label: 'Transparent, upfront pricing', us: true, them: false },
  { label: 'Fast turnaround', us: true, them: true },
  { label: 'Ongoing support after launch', us: true, them: false },
  { label: 'Locked into a long contract', us: false, them: true },
];

function CheckOrX({ ok, palette, muted }: { ok: boolean; palette: Palette; muted?: boolean }) {
  return (
    <span className="flex justify-center w-16 flex-shrink-0">
      {ok ? (
        <span
          className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold"
          style={{ background: muted ? `${palette.ink}15` : palette.accent, color: muted ? palette.ink : palette.buttonText }}
        >
          ✓
        </span>
      ) : (
        <span className="w-5 h-5 rounded-full flex items-center justify-center text-[10px]" style={{ background: `${palette.ink}0a`, color: palette.ink, opacity: 0.35 }}>
          ✕
        </span>
      )}
    </span>
  );
}

export function ComparisonTable({ palette, brandName }: { palette: Palette; brandName: string }) {
  return (
    <div className="rounded-2xl overflow-hidden shadow-sm" style={{ border: `1px solid ${palette.ink}14`, background: palette.bg }}>
      <div className="flex items-center gap-3 px-4 py-3" style={{ borderBottom: `1px solid ${palette.ink}14` }}>
        <span className="flex-1 text-[10px] uppercase tracking-wide" style={{ color: palette.ink, opacity: 0.45 }}>What you get</span>
        <span className="w-16 flex-shrink-0 text-[9px] leading-tight font-bold text-center" style={{ color: palette.accent }}>{brandName}</span>
        <span className="w-16 flex-shrink-0 text-[9px] leading-tight font-medium text-center" style={{ color: palette.ink, opacity: 0.5 }}>Status quo</span>
      </div>
      {ROWS.map((row, i) => (
        <motion.div
          key={row.label}
          initial={{ opacity: 0, x: -8 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.3, delay: i * 0.05 }}
          className={clsx('flex items-center gap-3 px-4 py-2.5', i > 0 && 'border-t')}
          style={{ borderColor: `${palette.ink}0d` }}
        >
          <span className="flex-1 text-[11px]" style={{ color: palette.ink, opacity: 0.8 }}>{row.label}</span>
          <CheckOrX ok={row.us} palette={palette} />
          <CheckOrX ok={row.them} palette={palette} muted />
        </motion.div>
      ))}
    </div>
  );
}
