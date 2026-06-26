'use client';

import type { ReactNode } from 'react';
import { DEFAULT_BRAND_NAME, type Direction } from '@/lib/npsi-selector-data';
import {
  HeroAsset, GlassDashboardAsset, TrustAsset, FeaturesAsset, TeamAsset, TestimonialAsset,
  AssistantAsset, HowItWorksAsset, PricingAsset, JourneyAsset, CtaAsset,
} from './AssetPreview';
import { ComparisonTable } from './ComparisonTable';
import { TabbedFeatureExplorer } from './TabbedFeatureExplorer';
import Reveal from './Reveal';

interface AssetDef {
  title: string;
  bestFit: string;
  render: (d: Direction, brandName: string) => ReactNode;
  appliesTo?: (d: Direction) => boolean;
}

const ASSETS: AssetDef[] = [
  { title: 'Homepage hero', bestFit: 'The first 3 seconds — sets the tone before anything else loads.', render: (d, b) => <HeroAsset direction={d} brandName={b} /> },
  {
    title: 'Glass outcomes dashboard',
    bestFit: 'A floating, frosted stat card beside the hero — proof of quality at a glance.',
    render: d => <GlassDashboardAsset direction={d} />,
    appliesTo: d => d.id === 'glass-motion',
  },
  { title: 'Trust band', bestFit: 'Directly below the hero — leads with credibility before anything else.', render: d => <TrustAsset direction={d} /> },
  { title: 'Features grid', bestFit: 'Service discovery — what you offer, browsable at a glance.', render: d => <FeaturesAsset direction={d} /> },
  { title: 'Tabbed feature explorer', bestFit: 'Lets a visitor self-select what matters to them without leaving the page.', render: d => <TabbedFeatureExplorer palette={d.palette} /> },
  { title: 'Team introductions', bestFit: 'Credibility — named people, not an anonymous company.', render: d => <TeamAsset direction={d} /> },
  { title: 'Client testimonial', bestFit: 'Social proof — a real client voice, not marketing copy.', render: d => <TestimonialAsset direction={d} /> },
  { title: 'Comparison table', bestFit: 'A head-to-head against the status quo — the highest-converting proof pattern.', render: (d, b) => <ComparisonTable palette={d.palette} brandName={b} /> },
  { title: 'Support assistant', bestFit: 'Instant, specific answers — proves the site can handle real questions, not just FAQs.', render: (d, b) => <AssistantAsset direction={d} brandName={b} /> },
  { title: 'How it works', bestFit: 'Sets expectations — visitors want to see the steps before they commit.', render: d => <HowItWorksAsset direction={d} /> },
  { title: 'Pricing', bestFit: 'Three real plans, with the most common path clearly highlighted.', render: d => <PricingAsset direction={d} /> },
  { title: 'Visitor journey, scroll-by-scroll', bestFit: 'How a real visit unfolds, from landing to taking action.', render: d => <JourneyAsset direction={d} /> },
  { title: 'Call to action', bestFit: 'The conversion moment — sized and worded to match this direction.', render: (d, b) => <CtaAsset direction={d} brandName={b} /> },
];

export default function DirectionDetailModal({
  direction, brandName = DEFAULT_BRAND_NAME, onClose,
}: { direction: Direction; brandName?: string; onClose: () => void }) {
  const assets = ASSETS.filter(a => !a.appliesTo || a.appliesTo(direction));
  return (
    <div className="fixed inset-0 z-[400] overflow-y-auto bg-[#f8fafc] no-print">
      <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-[#0f172a]">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-slate-400">Full Direction Preview</div>
          <h2 className="font-serif text-xl text-white mt-0.5">{direction.name}</h2>
        </div>
        <button
          type="button" onClick={onClose}
          className="px-4 py-2 text-[12px] font-semibold bg-brand-red text-white rounded-full hover:bg-brand-red-dark transition-colors flex-shrink-0"
        >
          Close ✕
        </button>
      </div>

      <div className="max-w-2xl mx-auto px-5 sm:px-6 py-8 space-y-9">
        <div>
          <p className="text-[14px] text-brand-ink-3 leading-relaxed">{direction.description}</p>
          <p className="text-[12px] text-brand-ink-4 italic mt-1.5">{direction.personality}</p>
        </div>

        {assets.map((asset, i) => (
          <Reveal key={asset.title}>
            <div className="font-mono text-[11px] text-brand-ink-4 uppercase tracking-wide mb-1">
              Asset {String(i + 1).padStart(2, '0')} · {asset.title}
            </div>
            <p className="text-[12px] text-brand-ink-3 mb-3"><strong className="text-brand-ink font-semibold">Best fit:</strong> {asset.bestFit}</p>
            {asset.render(direction, brandName)}
          </Reveal>
        ))}

        <div className="flex justify-center pt-2 pb-4">
          <button
            type="button" onClick={onClose}
            className="px-6 py-3 text-[13px] font-semibold bg-brand-red text-white rounded-full hover:bg-brand-red-dark transition-colors"
          >
            Close preview
          </button>
        </div>
      </div>
    </div>
  );
}
