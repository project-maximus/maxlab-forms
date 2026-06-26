'use client';

import { useState } from 'react';
import clsx from 'clsx';
import { DEFAULT_BRAND_NAME, JOURNEY_STAGES, type Direction } from '@/lib/npsi-selector-data';
import MiniMockup from './MiniMockup';

interface DirectionCardProps {
  direction: Direction;
  selected: boolean;
  eliminated: boolean;
  recommended: boolean;
  matchReason?: string;
  note: string;
  brandName?: string;
  onSelect: () => void;
  onEliminate: () => void;
  onNoteChange: (note: string) => void;
  onViewFull: () => void;
}

const RISK_CLASS: Record<Direction['revisionRisk']['level'], string> = {
  Low: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  Medium: 'bg-amber-50 text-amber-700 border-amber-200',
  Higher: 'bg-red-50 text-red-600 border-red-200',
};

export default function DirectionCard({
  direction, selected, eliminated, recommended, matchReason, note, brandName = DEFAULT_BRAND_NAME,
  onSelect, onEliminate, onNoteChange, onViewFull,
}: DirectionCardProps) {
  const [showJourney, setShowJourney] = useState(false);
  const { palette } = direction;

  return (
    <div
      className={clsx(
        'rounded-2xl border-2 bg-white overflow-hidden transition-all duration-150',
        eliminated ? 'opacity-50 border-brand-line' : selected ? 'border-brand-red shadow-sm' : 'border-brand-line hover:border-brand-red/40'
      )}
    >
      {/* Top: palette swatch + badges */}
      <div className="px-5 pt-4 flex items-start justify-between gap-3">
        <div className="flex gap-1">
          {[palette.bg, palette.ink, palette.accent, palette.secondary].map((c, i) => (
            <span key={i} className="w-5 h-5 rounded-full border border-black/10" style={{ background: c }} />
          ))}
        </div>
        <div className="flex items-center gap-1.5 flex-wrap justify-end">
          {recommended && (
            <span className="text-[9px] font-mono font-semibold uppercase tracking-wide bg-brand-red text-white rounded-full px-2 py-0.5">
              Recommended
            </span>
          )}
          <span className={clsx('text-[9px] font-mono font-semibold uppercase tracking-wide rounded-full px-2 py-0.5 border', RISK_CLASS[direction.revisionRisk.level])}>
            {direction.revisionRisk.level} risk
          </span>
        </div>
      </div>

      {/* Mini webpage mockup: browser chrome + nav + hero + CTA + trust band */}
      <div className="px-5 pt-3">
        <MiniMockup direction={direction} brandName={brandName} />
      </div>

      {/* Body */}
      <div className="px-5 py-4">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="font-serif text-xl text-brand-ink">{direction.name}</h3>
        </div>
        <p className="text-[13px] text-brand-ink-3 leading-relaxed mb-2.5">{direction.description}</p>
        <p className="text-[11px] text-brand-ink-4 italic mb-3">{direction.personality}</p>

        {recommended && matchReason && (
          <div className="text-[12px] text-brand-red bg-red-50 border border-red-200/70 rounded-lg px-3 py-2 mb-3 leading-snug">
            {matchReason}
          </div>
        )}

        <div className="flex flex-wrap gap-1.5 mb-3">
          {direction.bestMatch.map(tag => (
            <span key={tag} className="text-[10px] font-mono bg-brand-bg border border-brand-line rounded-full px-2 py-0.5 text-brand-ink-2">
              {tag}
            </span>
          ))}
        </div>

        <div className="text-[11px] text-brand-ink-4 mb-3">
          Reference brands:{' '}
          {direction.referenceBrands.map((b, i) => (
            <span key={b.name}>
              {i > 0 && ', '}
              {b.url ? (
                <a href={b.url} target="_blank" rel="noopener noreferrer" className="text-brand-ink-3 underline hover:text-brand-red">
                  {b.name}
                </a>
              ) : b.name}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-4 mb-1">
          <button
            type="button"
            onClick={() => setShowJourney(s => !s)}
            className="text-[12px] font-medium text-brand-ink-3 hover:text-brand-red transition-colors"
          >
            {showJourney ? '− Hide' : '+ View'} patient journey preview
          </button>
          <button
            type="button"
            onClick={onViewFull}
            className="text-[12px] font-semibold text-brand-red hover:text-brand-red-dark transition-colors"
          >
            View full direction →
          </button>
        </div>

        {showJourney && (
          <div className="grid grid-cols-5 gap-1.5 mt-2 mb-1">
            {JOURNEY_STAGES.map((stage, i) => (
              <div
                key={stage}
                className="rounded-lg p-2 text-center"
                style={{ background: palette.bg, border: `1px solid ${palette.secondary}33` }}
              >
                <div className="text-[8px] font-mono uppercase tracking-wide mb-1" style={{ color: palette.accent }}>
                  {i + 1}
                </div>
                <div className="text-[9px] leading-tight" style={{ color: palette.ink }}>
                  {direction.journeyFrames[i]}
                </div>
              </div>
            ))}
          </div>
        )}

        {selected && (
          <textarea
            value={note}
            onChange={e => onNoteChange(e.target.value)}
            placeholder="Notes on this direction (optional)…"
            rows={2}
            className="field-line field-line-area mt-3 text-[13px]"
          />
        )}
      </div>

      {/* Footer actions */}
      <div className="px-5 py-3.5 border-t border-brand-line/60 flex items-center justify-between">
        <button
          type="button"
          onClick={onEliminate}
          className="text-[12px] text-brand-ink-4 hover:text-red-600 transition-colors"
        >
          {eliminated ? '↺ Restore' : '✕ Rule out'}
        </button>
        <button
          type="button"
          onClick={onSelect}
          disabled={eliminated}
          className={clsx(
            'px-4 py-2 text-[12px] font-semibold rounded-xl transition-colors disabled:opacity-40 disabled:cursor-not-allowed',
            selected ? 'bg-brand-ink text-white' : 'bg-brand-red text-white hover:bg-brand-red-dark'
          )}
        >
          {selected ? 'Selected ✓' : 'Select this direction'}
        </button>
      </div>
    </div>
  );
}
