'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import clsx from 'clsx';
import type { Palette } from '@/lib/npsi-selector-data';

// Aceternity / Magic UI "BentoGrid" pattern: a grid of cards that fade/rise in
// on scroll, lift on hover, with a rotating conic-gradient border ("Border
// Beam") on the featured tile — built on framer-motion, not hand-rolled CSS.

export interface BentoItem {
  title: string;
  description: string;
  badge?: string;
  span?: 2;
}

function BorderBeamCard({ palette, children }: { palette: Palette; children: ReactNode }) {
  return (
    <div className="relative rounded-xl p-[1.5px] overflow-hidden h-full">
      <motion.div
        className="absolute -inset-[60%]"
        style={{ background: `conic-gradient(${palette.accent}, ${palette.secondary}, transparent 40%, ${palette.accent})` }}
        animate={{ rotate: 360 }}
        transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
      />
      <div className="relative rounded-[10px] h-full p-3.5" style={{ background: palette.bg }}>
        {children}
      </div>
    </div>
  );
}

function CardContent({ item, palette }: { item: BentoItem; palette: Palette }) {
  return (
    <>
      <div className="flex items-center justify-between mb-1.5">
        <span className="w-6 h-6 rounded-full" style={{ background: `${palette.accent}1f` }} />
        {item.badge && (
          <span
            className="text-[8px] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded-full"
            style={{ background: palette.accent, color: palette.buttonText }}
          >
            {item.badge}
          </span>
        )}
      </div>
      <div className="text-[12px] font-semibold" style={{ color: palette.ink }}>{item.title}</div>
      <div className="text-[10px] mt-0.5 leading-snug" style={{ color: palette.ink, opacity: 0.6 }}>{item.description}</div>
    </>
  );
}

export function BentoGrid({ items, palette }: { items: BentoItem[]; palette: Palette }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {items.map((item, i) => (
        <motion.div
          key={item.title}
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.4, delay: i * 0.07 }}
          whileHover={{ y: -3 }}
          className={clsx(item.span === 2 && 'col-span-2')}
        >
          {item.span === 2 ? (
            <BorderBeamCard palette={palette}><CardContent item={item} palette={palette} /></BorderBeamCard>
          ) : (
            <div className="rounded-xl p-3.5 h-full" style={{ background: palette.bg, border: `1px solid ${palette.ink}14` }}>
              <CardContent item={item} palette={palette} />
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
}
