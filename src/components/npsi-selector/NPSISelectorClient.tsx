'use client';

import { useState, useEffect, useCallback, useRef, type ReactNode } from 'react';
import clsx from 'clsx';
import type { FormConfig } from '@/lib/types';
import Logo from '../Logo';
import SubmitModal from '../SubmitModal';
import Toast from '../Toast';
import {
  COMPASS_QUESTIONS, ANXIETY_LEVELS, SPECIALTY_LINES, PHYSICIAN_INVOLVEMENT, PHYSICIAN_INVOLVEMENT_NOTE,
  BRAND_COLOR_PRESETS, DEFAULT_BRAND_NAME, DIRECTIONS, scoreDirections, directionByName, TRUST_STYLES, PHOTOGRAPHY_STYLES, NAV_STYLES,
  HOMEPAGE_STRUCTURES, CTA_STYLES, COMPONENT_GROUPS, buildAlignmentStatement,
  type CompassAnswers, type Direction,
} from '@/lib/npsi-selector-data';
import { deriveBrandPalette } from '@/lib/color';
import { NavWireframe, HomepageWireframe, TrustDiagram } from './Wireframe';
import BrandCompassCard from './BrandCompassCard';
import DirectionCard from './DirectionCard';
import ComponentPreview from './ComponentPreview';
import DirectionDetailModal from './DirectionDetailModal';
import MiniMockup from './MiniMockup';

type Values = Record<string, string | string[]>;
const STORAGE_KEY = 'maxxlab-npsi-selector';
const LAST_STEP = 9;

const STEP_TITLES = [
  'Introduction', 'Strategic Compass', 'Brand Colors', 'Visual Direction', 'Trust & Credential Style',
  'Photography Approach', 'Navigation & Homepage', 'Call-to-Action', 'Component Refinement', 'Summary & Delivery',
];

// ── Small shared option primitives ──────────────────────────────────────────────

function RadioDotMini({ active }: { active: boolean }) {
  return (
    <span className={clsx(
      'flex-shrink-0 w-[18px] h-[18px] rounded-full border-2 flex items-center justify-center mt-0.5 transition-colors',
      active ? 'border-brand-red bg-brand-red' : 'border-brand-line-2'
    )}>
      {active && <span className="w-[7px] h-[7px] rounded-full bg-white block" />}
    </span>
  );
}

function PillGroup({ options, value, onChange }: { options: string[]; value?: string; onChange: (v: string) => void }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map(opt => (
        <button
          key={opt} type="button" onClick={() => onChange(opt)} aria-pressed={value === opt}
          className={clsx(
            'px-4 py-2 rounded-xl text-[13px] font-medium border-2 transition-colors',
            value === opt ? 'bg-brand-ink text-white border-brand-ink' : 'bg-white text-brand-ink-2 border-brand-line hover:border-brand-red hover:text-brand-red'
          )}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

function OptionCard({
  label, description, caution, recommended, selected, onSelect, visual, compact, visualWidth = 'w-20',
}: {
  label: string; description: string; caution?: string; recommended?: boolean;
  selected: boolean; onSelect: () => void; visual?: ReactNode; compact?: boolean; visualWidth?: string;
}) {
  return (
    <button
      type="button" onClick={onSelect} aria-pressed={selected}
      className={clsx(
        'w-full text-left flex items-start gap-3 border-2 rounded-xl transition-colors',
        compact ? 'px-3.5 py-2.5' : 'px-4 py-3.5',
        selected ? 'border-brand-red bg-red-50/40' : 'border-brand-line bg-white hover:border-brand-red/30'
      )}
    >
      <RadioDotMini active={selected} />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <div className={clsx('font-medium text-brand-ink', compact ? 'text-[13px]' : 'text-[14px]')}>{label}</div>
          {recommended && (
            <span className="text-[9px] font-mono uppercase text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-full px-1.5 py-0.5">
              Recommended
            </span>
          )}
        </div>
        <div className={clsx('text-brand-ink-3 mt-0.5 leading-relaxed', compact ? 'text-[11px]' : 'text-[12px]')}>{description}</div>
        {caution && <div className="text-[11px] text-amber-700 mt-1 italic">{caution}</div>}
      </div>
      {visual && <div className={clsx('flex-shrink-0', visualWidth)}>{visual}</div>}
    </button>
  );
}

function StepHeader({ num, title, description }: { num: string; title: string; description?: string }) {
  return (
    <div>
      <div className="flex items-center gap-3 mb-1">
        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-brand-red text-white font-mono text-[10px] font-bold flex-shrink-0">{num}</span>
        <div className="h-px flex-1 bg-brand-line/60" />
      </div>
      <h2 className="font-serif text-[26px] font-normal text-brand-ink mt-2">{title}</h2>
      {description && <p className="text-[13px] text-brand-ink-3 mt-1 leading-relaxed">{description}</p>}
    </div>
  );
}

function EliminationTile({
  direction, eliminated, brandName, onToggle,
}: { direction: Direction; eliminated: boolean; brandName: string; onToggle: () => void }) {
  return (
    <button
      type="button" onClick={onToggle}
      className={clsx(
        'relative rounded-xl border-2 p-3 text-left transition-all',
        eliminated ? 'border-brand-line opacity-50' : 'border-brand-line hover:border-brand-red/40'
      )}
    >
      <MiniMockup direction={direction} brandName={brandName} compact />
      <div className="text-[13px] font-medium text-brand-ink mt-2.5">{direction.name}</div>
      <div className="text-[11px] text-brand-ink-4 mt-0.5 leading-snug">{direction.tagline}</div>
      <span className={clsx(
        'absolute top-2.5 right-2.5 text-[11px] font-mono w-5 h-5 rounded-full flex items-center justify-center border',
        eliminated ? 'bg-red-50 text-red-600 border-red-200' : 'bg-white text-brand-ink-4 border-brand-line'
      )}>
        {eliminated ? '↺' : '✕'}
      </span>
    </button>
  );
}

// ── Main client ─────────────────────────────────────────────────────────────────

export default function NPSISelectorClient({ form }: { form: FormConfig }) {
  const [step, setStep] = useState(0);
  const [directionPhase, setDirectionPhase] = useState<'eliminate' | 'gallery'>('eliminate');
  const [values, setValues] = useState<Values>({});
  const [lastSaved, setLastSaved] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [viewFullId, setViewFullId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState<{ msg: string; error?: boolean } | null>(null);
  const autosaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw);
      const restoredValues: Values = parsed.values ?? {};
      setValues(restoredValues);
      setStep(parsed.step ?? 0);
      if (parsed.step === 3) {
        const progressed = !!restoredValues.primary_direction ||
          (Array.isArray(restoredValues.eliminated_directions) && restoredValues.eliminated_directions.length > 0);
        setDirectionPhase(progressed ? 'gallery' : 'eliminate');
      }
      setLastSaved('restored');
    } catch { /* ignore */ }
  }, []);

  useEffect(() => {
    if (autosaveTimer.current) clearTimeout(autosaveTimer.current);
    autosaveTimer.current = setTimeout(() => {
      try {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ values, step }));
        setLastSaved(new Date().toLocaleTimeString());
      } catch { /* ignore */ }
    }, 500);
    return () => { if (autosaveTimer.current) clearTimeout(autosaveTimer.current); };
  }, [values, step]);

  const showToast = useCallback((msg: string, error = false) => {
    setToast({ msg, error });
    setTimeout(() => setToast(null), 3500);
  }, []);

  const str = (id: string) => (typeof values[id] === 'string' ? (values[id] as string) : '');
  const arr = (id: string) => (Array.isArray(values[id]) ? (values[id] as string[]) : []);
  const update = useCallback((id: string, value: string | string[]) => {
    setValues(prev => ({ ...prev, [id]: value }));
  }, []);

  function toggleEliminate(name: string) {
    const current = arr('eliminated_directions');
    const isElim = current.includes(name);
    update('eliminated_directions', isElim ? current.filter(n => n !== name) : [...current, name]);
    if (!isElim && str('primary_direction') === name) update('primary_direction', '');
  }

  const compassAnswers: CompassAnswers = {
    reason: str('reason'),
    audience: str('audience'),
    feeling: str('feeling'),
    differentiator: str('differentiator'),
    anxiety_level: str('anxiety_level'),
    specialty_priority: str('specialty_priority'),
  };
  const eliminatedNames = arr('eliminated_directions');

  const brandColorHex = str('brand_primary_color') || BRAND_COLOR_PRESETS[0].hex;
  const brandPalette = deriveBrandPalette(brandColorHex);
  const brandName = str('brand_name').trim() || DEFAULT_BRAND_NAME;
  const resolveDirection = (d: Direction): Direction => ({ ...d, palette: brandPalette });

  const canAdvance = (() => {
    switch (step) {
      case 1: return !!(str('reason') && str('audience') && str('feeling') && str('differentiator') && str('anxiety_level'));
      case 3: return directionPhase === 'eliminate' ? true : !!str('primary_direction');
      case 4: return !!str('trust_style');
      case 5: return !!str('photography_style');
      case 6: return !!str('navigation_style') && !!str('homepage_structure');
      case 7: return !!str('cta_style');
      default: return true;
    }
  })();

  function handleBack() {
    if (step === 3 && directionPhase === 'gallery') { setDirectionPhase('eliminate'); return; }
    setStep(s => Math.max(0, s - 1));
  }
  function handleNext() {
    if (step === 3 && directionPhase === 'eliminate') { setDirectionPhase('gallery'); return; }
    setStep(s => Math.min(LAST_STEP, s + 1));
  }

  function handleExport() {
    const blob = new Blob([JSON.stringify({ form: form.title, exported_at: new Date().toISOString(), data: values }, null, 2)], { type: 'application/json' });
    const a = Object.assign(document.createElement('a'), { href: URL.createObjectURL(blob), download: `${form.slug}.json` });
    a.click(); URL.revokeObjectURL(a.href);
    showToast('Exported successfully');
  }

  async function handleSubmit(senderName: string, senderEmail: string, senderNote: string) {
    if (!senderName.trim()) { showToast('Please enter your name.', true); return; }
    if (!senderEmail.includes('@')) { showToast('Please enter a valid email.', true); return; }
    setSubmitting(true);
    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ formSlug: form.slug, senderName: senderName.trim(), senderEmail: senderEmail.trim(), senderNote: senderNote.trim(), data: values }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? 'Submission failed');
      setModalOpen(false);
      showToast('Submitted! Check your inbox for confirmation.');
      window.open(`/view/${json.id}`, '_blank');
      try { sessionStorage.removeItem(STORAGE_KEY); } catch { /* ignore */ }
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Submission failed. Please try again.', true);
    } finally {
      setSubmitting(false);
    }
  }

  // ── Step renderers ────────────────────────────────────────────────────────────

  function renderIntro() {
    return (
      <div className="text-center max-w-lg mx-auto py-10">
        <div className="flex justify-center mb-6"><Logo size={56} /></div>
        {form.eyebrow && (
          <div className="inline-flex items-center gap-2 border border-brand-red/30 bg-red-50 text-brand-red rounded-full px-4 py-1.5 mb-6">
            <span className="w-1.5 h-1.5 bg-brand-red rounded-full" />
            <span className="font-mono text-[11px] uppercase tracking-widest">{form.eyebrow}</span>
          </div>
        )}
        <h1 className="font-serif text-4xl sm:text-5xl text-brand-ink font-normal leading-tight mb-4">{form.title}</h1>
        {form.description && <p className="text-brand-ink-3 text-[15px] leading-relaxed mb-8">{form.description}</p>}
        <div className="flex items-center justify-center gap-3 text-[12px] text-brand-ink-4 font-mono mb-9 flex-wrap">
          <span>~15 minutes</span><span>·</span><span>9 sections</span><span>·</span><span>Nothing here is final</span>
        </div>
        <button onClick={() => setStep(1)} className="px-7 py-3 text-sm font-semibold bg-brand-red text-white rounded-full hover:bg-brand-red-dark transition-colors">
          Begin →
        </button>
      </div>
    );
  }

  function renderCompass() {
    return (
      <div className="space-y-7">
        <StepHeader num="01" title="Strategic compass" description="Intent before aesthetics — this shapes which direction actually fits." />
        {COMPASS_QUESTIONS.map(q => (
          <div key={q.id}>
            <div className="text-[13px] font-medium text-brand-ink mb-1">{q.question}</div>
            {q.hint && <p className="text-[12px] text-brand-ink-4 italic mb-2">{q.hint}</p>}
            <PillGroup options={q.options} value={str(q.id)} onChange={v => update(q.id, v)} />
          </div>
        ))}
        <div>
          <div className="text-[13px] font-medium text-brand-ink mb-1">On average, how anxious are incoming patients when they arrive?</div>
          <PillGroup options={[...ANXIETY_LEVELS]} value={str('anxiety_level')} onChange={v => update('anxiety_level', v)} />
        </div>
        <div>
          <div className="text-[13px] font-medium text-brand-ink mb-1">Which specialty line drives the most patient volume?</div>
          <PillGroup options={SPECIALTY_LINES} value={str('specialty_priority')} onChange={v => update('specialty_priority', v)} />
        </div>
        <div>
          <div className="text-[13px] font-medium text-brand-ink mb-1">Will lead physicians be involved in approving the design?</div>
          <PillGroup options={PHYSICIAN_INVOLVEMENT} value={str('physician_involved')} onChange={v => update('physician_involved', v)} />
          {str('physician_involved') === 'Yes' && (
            <p className="text-[12px] text-brand-red bg-red-50 border border-red-200/70 rounded-lg px-3 py-2 mt-2 leading-relaxed">
              {PHYSICIAN_INVOLVEMENT_NOTE}
            </p>
          )}
        </div>
      </div>
    );
  }

  function renderBrandColors() {
    const previewDirection = directionByName(str('primary_direction')) ?? DIRECTIONS[0];
    return (
      <div className="space-y-6">
        <StepHeader
          num="02" title="Brand colors"
          description="Pick the color your brand will use — every direction in the next step is shown in this color, not a generic preset."
        />
        <div>
          <label className="block text-[12px] font-medium text-brand-ink-3 mb-1.5">Business name (used throughout the previews)</label>
          <input
            type="text" value={str('brand_name')} onChange={e => update('brand_name', e.target.value)}
            placeholder={DEFAULT_BRAND_NAME} className="field-line max-w-xs"
          />
        </div>
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-2.5">
          {BRAND_COLOR_PRESETS.map(p => (
            <button
              key={p.id} type="button" onClick={() => update('brand_primary_color', p.hex)}
              className={clsx(
                'flex flex-col items-center gap-1.5 p-2 rounded-xl border-2 transition-colors',
                brandColorHex === p.hex ? 'border-brand-red' : 'border-transparent hover:border-brand-line'
              )}
            >
              <span className="w-9 h-9 rounded-full border border-black/10" style={{ background: p.hex }} />
              <span className="text-[10px] text-brand-ink-3 text-center leading-tight">{p.label}</span>
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <label className="text-[12px] font-medium text-brand-ink-3">Or choose a custom color</label>
          <input
            type="color" value={brandColorHex} onChange={e => update('brand_primary_color', e.target.value)}
            className="w-10 h-10 rounded-lg border border-brand-line cursor-pointer"
          />
          <span className="font-mono text-[12px] text-brand-ink-4">{brandColorHex.toUpperCase()}</span>
        </div>
        <div>
          <div className="text-[12px] font-medium text-brand-ink-3 mb-2">Live preview — {previewDirection.name} style, in your color</div>
          <MiniMockup direction={resolveDirection(previewDirection)} brandName={brandName} />
        </div>
      </div>
    );
  }

  function renderDirection() {
    if (directionPhase === 'eliminate') {
      return (
        <div className="space-y-5">
          <StepHeader
            num="03" title="Visual direction"
            description="First, rule out anything that's clearly not you — it's easier to react against a direction than rank all five at once."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {DIRECTIONS.map(d => (
              <EliminationTile
                key={d.id} direction={resolveDirection(d)} brandName={brandName}
                eliminated={eliminatedNames.includes(d.name)} onToggle={() => toggleEliminate(d.name)}
              />
            ))}
          </div>
          <p className="text-[12px] text-brand-ink-4 italic">Ruling nothing out is fine too — click "Continue" to see the full gallery.</p>
        </div>
      );
    }

    const scored = scoreDirections(compassAnswers).filter(s => !eliminatedNames.includes(s.direction.name));

    if (scored.length === 0) {
      return (
        <div className="space-y-4 text-center py-10">
          <p className="text-brand-ink-3 text-sm">You've ruled out every direction.</p>
          <button onClick={() => setDirectionPhase('eliminate')} className="px-4 py-2 text-[13px] font-medium border border-brand-line rounded-xl hover:border-brand-ink transition-colors">
            ← Restore at least one
          </button>
        </div>
      );
    }

    const topScore = scored[0].score;

    return (
      <div className="space-y-5">
        <StepHeader
          num="03" title="Visual direction"
          description="Ranked using your strategic compass — the top direction is the strongest structural fit for what you told us."
        />
        <button onClick={() => setDirectionPhase('eliminate')} className="text-[12px] font-medium text-brand-ink-3 hover:text-brand-red transition-colors">
          ← Back to elimination
        </button>
        <div className="space-y-4">
          {scored.map(({ direction, score, reason }) => (
            <DirectionCard
              key={direction.id}
              direction={resolveDirection(direction)}
              brandName={brandName}
              selected={str('primary_direction') === direction.name}
              eliminated={false}
              recommended={topScore > 0 && score === topScore}
              matchReason={reason}
              note={str('primary_direction') === direction.name ? str('direction_notes') : ''}
              onSelect={() => { update('primary_direction', direction.name); setViewFullId(direction.id); }}
              onEliminate={() => toggleEliminate(direction.name)}
              onNoteChange={v => update('direction_notes', v)}
              onViewFull={() => setViewFullId(direction.id)}
            />
          ))}
        </div>
      </div>
    );
  }

  function renderTrust() {
    return (
      <div className="space-y-5">
        <StepHeader
          num="04" title="Trust & credential style"
          description="How AAAHC accreditation and physician credentials are displayed — a decision most ASC projects handle inconsistently if left unresolved."
        />
        <div className="flex flex-col gap-2.5">
          {TRUST_STYLES.map(t => (
            <OptionCard
              key={t.id} label={t.label} description={t.description} caution={t.caution}
              recommended={!!t.recommended} selected={str('trust_style') === t.label}
              onSelect={() => update('trust_style', t.label)}
              visual={<TrustDiagram position={t.badgePosition} />}
            />
          ))}
        </div>
      </div>
    );
  }

  function renderPhotography() {
    return (
      <div className="space-y-5">
        <StepHeader
          num="05" title="Photography approach"
          description="Facility shoots, physician headshots, and lifestyle photography have different budgets and lead times — locking this in now avoids scope surprises."
        />
        <div className="flex flex-col gap-2.5">
          {PHOTOGRAPHY_STYLES.map(p => (
            <OptionCard
              key={p.id} label={p.label} description={p.description}
              selected={str('photography_style') === p.label} onSelect={() => update('photography_style', p.label)}
              visual={<div className="w-16 h-16 rounded-lg ml-auto" style={{ background: p.swatch }} />}
            />
          ))}
        </div>
      </div>
    );
  }

  function renderStructure() {
    return (
      <div className="space-y-8">
        <StepHeader num="06" title="Navigation & homepage structure" description="Wireframe only — chosen by information hierarchy, not visual preference." />
        <div>
          <div className="text-[13px] font-semibold text-brand-ink mb-2.5">Navigation pattern</div>
          <div className="flex flex-col gap-2.5">
            {NAV_STYLES.map(n => (
              <OptionCard
                key={n.id} label={n.label} description={n.description}
                selected={str('navigation_style') === n.label} onSelect={() => update('navigation_style', n.label)}
                visual={<NavWireframe items={n.items} />} visualWidth="w-40"
              />
            ))}
          </div>
        </div>
        <div>
          <div className="text-[13px] font-semibold text-brand-ink mb-2.5">Homepage section order</div>
          <div className="flex flex-col gap-2.5">
            {HOMEPAGE_STRUCTURES.map(h => (
              <OptionCard
                key={h.id} label={h.label} description={h.sections.join(' → ')}
                selected={str('homepage_structure') === h.label} onSelect={() => update('homepage_structure', h.label)}
                visual={<HomepageWireframe sections={h.sections} />}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  function renderCta() {
    return (
      <div className="space-y-5">
        <StepHeader num="07" title="Call-to-action commitment" description="The primary conversion action, decided before design begins — this shapes the entire homepage composition." />
        <div className="flex flex-col gap-2.5">
          {CTA_STYLES.map(c => (
            <OptionCard key={c.id} label={c.label} description={c.description} selected={str('cta_style') === c.label} onSelect={() => update('cta_style', c.label)} />
          ))}
        </div>
      </div>
    );
  }

  function renderComponents() {
    const palette = brandPalette;
    return (
      <div className="space-y-7">
        <StepHeader num="08" title="Component refinement" description="Optional — only for clients who want to go a level deeper. Skip straight to the summary at any time." />
        {COMPONENT_GROUPS.map(g => (
          <div key={g.id}>
            <div className="text-[13px] font-semibold text-brand-ink">{g.moment}</div>
            <p className="text-[12px] text-brand-ink-4 mb-2.5">{g.description}</p>
            <div className="space-y-4">
              {g.categories.map(c => (
                <div key={c.fieldId}>
                  <div className="text-[11px] font-medium text-brand-ink-3 uppercase tracking-wide mb-1.5">{c.label}</div>
                  <div className="flex flex-col gap-2">
                    {c.options.map(o => (
                      <OptionCard
                        key={o.id} label={o.label} description={o.description} compact visualWidth="w-28"
                        selected={str(c.fieldId) === o.label} onSelect={() => update(c.fieldId, o.label)}
                        visual={<ComponentPreview fieldId={c.fieldId} optionId={o.id} palette={palette} />}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  function renderSummary() {
    const direction = directionByName(str('primary_direction'));
    const alignment = buildAlignmentStatement(values);
    const recap: [string, string][] = [
      ['Trust style', str('trust_style')],
      ['Photography', str('photography_style')],
      ['Navigation', str('navigation_style')],
      ['Homepage structure', str('homepage_structure')],
      ['Primary CTA', str('cta_style')],
    ];
    return (
      <div className="space-y-6">
        <StepHeader num="09" title="Summary & delivery" description="Review the alignment statement below, add any notes for the agency, then submit." />

        <div className="rounded-2xl bg-[#0f172a] p-6">
          <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-brand-red mb-2">Alignment statement</div>
          <p className="text-[15px] leading-relaxed text-slate-100">{alignment}</p>
        </div>

        {direction && (
          <div className="rounded-2xl border border-brand-line p-5">
            <div className="flex items-center justify-between gap-3 mb-2">
              <div className="font-mono text-[10px] uppercase tracking-[0.1em] text-brand-ink-4">Chosen direction</div>
              <span className="flex items-center gap-1.5 text-[11px] font-mono text-brand-ink-3">
                <span className="w-3.5 h-3.5 rounded-full border border-black/10" style={{ background: brandColorHex }} />
                {brandColorHex.toUpperCase()}
              </span>
            </div>
            <h3 className="font-serif text-2xl text-brand-ink mb-1">{direction.name}</h3>
            <p className="text-[13px] text-brand-ink-3">{direction.description}</p>
          </div>
        )}

        <div className="rounded-2xl border border-brand-line divide-y divide-brand-line/60">
          {recap.map(([label, value]) => (
            <div key={label} className="flex gap-4 px-5 py-3 flex-col sm:flex-row">
              <dt className="text-[12px] text-brand-ink-3 font-medium w-40 flex-shrink-0">{label}</dt>
              <dd className="text-[13px] text-brand-ink">{value || <span className="italic text-brand-ink-4">Not set</span>}</dd>
            </div>
          ))}
        </div>

        <div>
          <label className="block text-[13px] font-medium text-brand-ink mb-1.5">Anything else for the agency</label>
          <textarea
            value={str('agency_notes')} onChange={e => update('agency_notes', e.target.value)} rows={4}
            placeholder="Open notes, links, ideas, concerns…" className="field-line field-line-area"
          />
        </div>
      </div>
    );
  }

  const STEP_RENDERERS = [
    renderIntro, renderCompass, renderBrandColors, renderDirection, renderTrust, renderPhotography, renderStructure, renderCta, renderComponents, renderSummary,
  ];

  const nextLabel = step === 3 && directionPhase === 'eliminate' ? 'Continue to gallery →' : 'Next →';

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-brand-line/60 no-print">
        <div className="max-w-3xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 bg-brand-ink rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
              <Logo size={22} white />
            </div>
            <span className="font-semibold text-sm text-brand-ink hidden sm:block">Maxxlab</span>
            <span className="text-brand-line hidden sm:block">·</span>
            <span className="font-mono text-[10px] text-brand-ink-3 uppercase tracking-wider truncate">{STEP_TITLES[step]}</span>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            {lastSaved && (
              <span className="hidden sm:inline font-mono text-[10px] text-brand-ink-4">
                {lastSaved === 'restored' ? 'Restored' : `Saved ${lastSaved}`}
              </span>
            )}
            {step > 0 && <span className="font-mono text-[11px] text-brand-ink-3">Step {step} of {LAST_STEP}</span>}
          </div>
        </div>
        <div className="h-[3px] bg-brand-line/40">
          <div className="h-full bg-brand-red transition-all duration-300" style={{ width: `${(step / LAST_STEP) * 100}%` }} />
        </div>
      </header>

      <main className="bg-[#f8fafc] min-h-screen pb-28">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
          {step >= 2 && (
            <div className="mb-5"><BrandCompassCard answers={compassAnswers} /></div>
          )}
          <div className="bg-white rounded-2xl border border-brand-line p-6 sm:p-9 print-break-avoid">
            {STEP_RENDERERS[step]()}
          </div>
        </div>
      </main>

      {step > 0 && (
        <div
          className="fixed bottom-0 left-0 right-0 z-50 no-print"
          style={{ background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(12px)', borderTop: '1px solid #f0f4f8', boxShadow: '0 -4px 24px rgba(15,23,42,0.08)' }}
        >
          <div className="max-w-3xl mx-auto px-6 py-3.5 flex items-center justify-between gap-3">
            <button onClick={handleBack} className="px-4 py-2 text-[12px] font-medium text-brand-ink-3 hover:text-brand-ink transition-colors">
              ← Back
            </button>
            <div className="flex items-center gap-2">
              {step === 8 && (
                <button onClick={() => setStep(9)} className="px-4 py-2 text-[12px] font-medium border border-brand-line rounded-xl hover:border-brand-ink transition-colors">
                  Skip →
                </button>
              )}
              {step < LAST_STEP ? (
                <button
                  onClick={handleNext} disabled={!canAdvance}
                  className="px-5 py-2.5 text-[13px] font-semibold bg-brand-red text-white rounded-xl hover:bg-brand-red-dark transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {nextLabel}
                </button>
              ) : (
                <>
                  <button onClick={handleExport} className="hidden sm:block px-4 py-2 text-[12px] font-medium border border-brand-line rounded-xl hover:border-brand-ink transition-colors">
                    Export JSON
                  </button>
                  <button onClick={() => window.print()} className="hidden sm:block px-4 py-2 text-[12px] font-medium border border-brand-line rounded-xl hover:border-brand-ink transition-colors">
                    Print
                  </button>
                  <button onClick={() => setModalOpen(true)} className="px-5 py-2.5 text-[13px] font-semibold bg-brand-red text-white rounded-xl hover:bg-brand-red-dark transition-colors">
                    Submit to Maxxlab →
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {modalOpen && (
        <SubmitModal onClose={() => setModalOpen(false)} onSubmit={handleSubmit} loading={submitting} />
      )}

      {viewFullId && (
        <DirectionDetailModal
          direction={resolveDirection(DIRECTIONS.find(d => d.id === viewFullId)!)}
          brandName={brandName}
          onClose={() => setViewFullId(null)}
        />
      )}

      {toast && <Toast msg={toast.msg} error={toast.error} />}
    </>
  );
}
