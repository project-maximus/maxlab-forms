'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Palette } from '@/lib/npsi-selector-data';

const TABS = [
  { id: 'overview', label: 'Overview', body: 'A single view of everything in progress right now — nothing buried in email.' },
  { id: 'reports', label: 'Reports', body: 'Clear, exportable reports on demand — no spreadsheets required.' },
  { id: 'support', label: 'Support', body: 'A real person responds, usually within the hour.' },
  { id: 'billing', label: 'Billing', body: 'Transparent invoices, with no surprise line items.' },
];

export function TabbedFeatureExplorer({ palette }: { palette: Palette }) {
  const [active, setActive] = useState(TABS[0].id);
  const activeTab = TABS.find(t => t.id === active) ?? TABS[0];

  return (
    <div className="rounded-2xl overflow-hidden shadow-sm" style={{ background: palette.bg, border: `1px solid ${palette.ink}14` }}>
      <div className="flex gap-1 p-2 overflow-x-auto" style={{ borderBottom: `1px solid ${palette.ink}14` }}>
        {TABS.map(tab => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActive(tab.id)}
            className="relative px-3 py-1.5 text-[11px] font-medium rounded-lg flex-shrink-0 transition-colors"
            style={{ color: active === tab.id ? palette.buttonText : palette.ink, opacity: active === tab.id ? 1 : 0.6 }}
          >
            {active === tab.id && (
              <motion.span
                layoutId="tab-pill"
                className="absolute inset-0 rounded-lg"
                style={{ background: palette.accent }}
                transition={{ type: 'spring', stiffness: 350, damping: 28 }}
              />
            )}
            <span className="relative z-10">{tab.label}</span>
          </button>
        ))}
      </div>
      <div className="p-5 min-h-[110px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
          >
            <div className="text-[12px] leading-relaxed" style={{ color: palette.ink, opacity: 0.75 }}>{activeTab.body}</div>
            <div className="mt-3 grid grid-cols-3 gap-1.5">
              {[0, 1, 2].map(i => (
                <div key={i} className="h-8 rounded-md" style={{ background: `${palette.ink}08` }} />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
