'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import clsx from 'clsx';
import type { FormConfig } from '@/lib/types';
import SubmitModal from '@/components/SubmitModal';
import Toast from '@/components/Toast';
import SignaturePad from '@/components/noorani/SignaturePad';
import {
  CLIENT, CONTACT, GROWTH_SCOPE, LATER, MINILABS_SCOPE, PRICE, PROPOSAL_DATE, PROVIDER, REF, SECTIONS,
  TERMS, TIMELINE, TOGETHER, VALID_UNTIL, WEBSITE_SCOPE,
  type ContractState,
  cad, compute, defaultState, longDate, mo, summaryText,
} from '@/lib/airport-limo-contract';

const STORAGE_KEY = 'maxxlab-form-airport-limo-contract-v1';
const todayIso = () => new Date().toISOString().slice(0, 10);

// ── brand lockup: Maxxlab × Minilabs, both real wordmarks ───────────────────
function Lockup({ white = false, height = 26 }: { white?: boolean; height?: number }) {
  return (
    <span className="inline-flex items-center" style={{ gap: height * 0.5 }} aria-label="Maxxlab and Minilabs">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={white ? '/maxxlab-white.png' : '/maxxlab-ink.png'} alt="Maxxlab" style={{ height, width: 'auto' }} className="block" />
      <span className={clsx('leading-none font-light', white ? 'text-white/45' : 'text-brand-ink-4')} style={{ fontSize: height * 0.62 }} aria-hidden="true">
        ×
      </span>
      {/* The Minilabs wordmark has no ascender-height mark, so it is set a little shorter to balance optically. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={white ? '/minilabs-white.png' : '/minilabs-ink.png'} alt="Minilabs" style={{ height: height * 0.6, width: 'auto' }} className="block" />
    </span>
  );
}

// ── layout primitives, matching the discovery forms ─────────────────────────
/**
 * One section: number, title and note on the left; content on the right.
 * On screen only the active step is shown (the others stay mounted so drafts
 * and signatures survive navigation); print lays every section out in order.
 */
function Section({ id, n, title, note, active, children }: {
  id: string; n: string; title: string; note?: React.ReactNode; active: boolean; children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={clsx(
        'print:block print:mt-10 print:pt-10 print:border-t print:border-brand-line print:first:mt-0 print:first:pt-0 print:first:border-t-0',
        !active && 'hidden',
      )}
    >
      <div className="grid gap-x-16 gap-y-9 lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)] print:block">
        <div className="print:mb-5">
          <div className="font-mono text-[11px] tracking-[0.14em] text-brand-ink-4 tabular-nums">
            {n} / {String(SECTIONS.length).padStart(2, '0')}
          </div>
          <h2 className="mt-4 text-[28px] sm:text-[32px] font-medium tracking-[-0.028em] leading-[1.12] text-brand-ink">{title}</h2>
          {note && <div className="mt-4 text-[15px] leading-[1.65] text-brand-ink-3">{note}</div>}
        </div>
        <div className="min-w-0">{children}</div>
      </div>
    </section>
  );
}
/** Mono sub-heading inside a section's content column. */
const Sub = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <h3 className={clsx('font-mono text-[10px] uppercase tracking-[0.16em] text-brand-ink-4 pb-2 border-b border-brand-line', className)}>{children}</h3>
);
/**
 * Collapsible scope panel. The trigger keeps the `Sub` heading's styling so the
 * section reads the same as before, just foldable. The body stays in the DOM and
 * print re-reveals it, because a printed contract must carry the full scope.
 */
function Panel({
  title, open, onToggle, className, children,
}: {
  title: React.ReactNode; open: boolean; onToggle: () => void;
  className?: string; children: React.ReactNode;
}) {
  return (
    <div className={clsx('print-break-avoid', className)}>
      <button
        type="button"
        aria-expanded={open}
        onClick={onToggle}
        className="w-full flex items-center gap-3 text-left pb-2 border-b border-brand-line group"
      >
        <span className="flex-1 font-mono text-[10px] uppercase tracking-[0.16em] text-brand-ink-4 group-hover:text-brand-ink-3 transition-colors">
          {title}
        </span>
        <svg
          className={clsx('w-3.5 h-3.5 flex-shrink-0 text-brand-ink-4 transition-transform duration-200 no-print', open && 'rotate-180')}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div className={clsx(!open && 'hidden print:block')}>{children}</div>
    </div>
  );
}

const P = ({ children, muted }: { children: React.ReactNode; muted?: boolean }) => (
  <p className={clsx('mb-2.5 leading-[1.65]', muted ? 'text-[13px] text-brand-ink-4' : 'text-[14.5px] text-brand-ink-2')}>{children}</p>
);

type Cell = React.ReactNode | { r: React.ReactNode } | { b: React.ReactNode };
const isObj = (c: Cell): c is { r: React.ReactNode } | { b: React.ReactNode } =>
  typeof c === 'object' && c !== null && !Array.isArray(c) && ('r' in (c as object) || 'b' in (c as object));
const cellNode = (c: Cell) => (isObj(c) ? ('r' in c ? c.r : c.b) : c);
const cellRight = (c: Cell) => isObj(c) && 'r' in c;
const cellBold = (c: Cell) => isObj(c) && 'b' in c;

function DocTable({ head, rows, widths, className }: {
  head: Cell[];
  rows: { cells: Cell[]; off?: boolean }[];
  widths?: number[];
  className?: string;
}) {
  return (
    <div className={clsx('overflow-x-auto my-3', className)}>
      <table className="w-full border-collapse text-[13px] tabular-nums">
        <thead>
          <tr>
            {head.map((h, i) => (
              <th
                key={i}
                style={widths ? { width: `${widths[i]}%` } : undefined}
                className={clsx(
                  'text-left font-mono font-medium text-[9.5px] uppercase tracking-[0.12em] text-brand-ink-4 border-b-[1.5px] border-brand-ink px-2 py-1.5 align-bottom',
                  cellRight(h) && 'text-right',
                )}
              >
                {cellNode(h)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, ri) => (
            <tr key={ri} className={clsx(r.off && 'opacity-35 print:hidden')}>
              {r.cells.map((c, ci) => (
                <td
                  key={ci}
                  className={clsx(
                    'px-2 py-2 align-top text-brand-ink-2 border-b border-brand-line leading-relaxed',
                    cellBold(c) && 'font-semibold text-brand-ink',
                    cellRight(c) && 'text-right whitespace-nowrap',
                  )}
                >
                  {cellNode(c)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const Strike = ({ children }: { children: React.ReactNode }) => (
  <span className="line-through text-brand-ink-4 decoration-brand-ink-4/60">{children}</span>
);

/** The plan switch, styled like a checkbox option in the discovery forms. */
function PlanToggle({ on, onChange }: { on: boolean; onChange: (v: boolean) => void }) {
  return (
    <label
      className={clsx(
        'flex items-start gap-3.5 rounded-md border px-4 py-3.5 cursor-pointer transition-colors',
        on ? 'border-brand-ink' : 'border-brand-line hover:border-brand-line-2',
      )}
    >
      <input
        type="checkbox"
        checked={on}
        onChange={e => onChange(e.target.checked)}
        className="mt-[3px] w-[16px] h-[16px] accent-[#0f172a] flex-shrink-0 cursor-pointer"
      />
      <span className="min-w-0">
        <span className="block text-[15px] font-medium text-brand-ink leading-snug">Include the Minilabs Booking System</span>
        <span className="block text-[13px] text-brand-ink-3 mt-0.5 leading-snug">
          With the booking system, or the website and Website Growth only.
        </span>
      </span>
    </label>
  );
}

function SignedColumn({ who, name, title, date, sig, stamp }: { who: string; name: string; title: string; date: string; sig: string; stamp: string }) {
  const line = (value: React.ReactNode, caption: string, tall = false) => (
    <>
      <div className={clsx('flex items-end text-[13px] text-brand-ink', tall ? 'h-[46px] pb-1' : 'h-[30px]')}>{value}</div>
      <div className="border-b border-brand-ink" />
      <div className="font-mono text-[9px] uppercase tracking-[0.12em] text-brand-ink-4 mt-1 mb-3">{caption}</div>
    </>
  );
  return (
    <div>
      <div className="font-mono text-[9.5px] uppercase tracking-[0.12em] text-brand-ink-4 mb-2">{who}</div>
      {line(
        sig
          // eslint-disable-next-line @next/next/no-img-element
          ? <img src={sig} alt={`${who} signature`} className="max-h-[44px] object-contain object-left" />
          : <span className="text-[12px] text-brand-ink-4 italic">Unsigned</span>,
        stamp,
        true,
      )}
      {line(name, 'Name')}
      {line(title, 'Title')}
      {line(date ? longDate(date) : '', 'Date')}
    </div>
  );
}

export default function AirportLimoContractClient({ form }: { form: FormConfig }) {
  const [S, setS] = useState<ContractState>(defaultState);
  const [step, setStep] = useState(0);
  /** Scope panels that are open. 'a' leads so the section is never a blank list. */
  const [openScope, setOpenScope] = useState<string[]>(['a']);
  const SCOPE_KEYS = ['a', 'b', 'c', 'later'];
  const allScopeOpen = SCOPE_KEYS.every(k => openScope.includes(k));
  const toggleScope = (k: string) =>
    setOpenScope(openScope.includes(k) ? openScope.filter(x => x !== k) : [...openScope, k]);
  const stepTopRef = useRef<HTMLDivElement | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState<{ msg: string; error?: boolean } | null>(null);
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = useCallback((msg: string, error = false) => {
    setToast({ msg, error });
    setTimeout(() => setToast(null), 3200);
  }, []);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setS(prev => ({ ...prev, ...JSON.parse(raw) }));
    } catch { /* ignore */ }
  }, []);

  const patch = useCallback((p: Partial<ContractState>) => {
    setS(prev => {
      const next = { ...prev, ...p };
      if (saveTimer.current) clearTimeout(saveTimer.current);
      saveTimer.current = setTimeout(() => {
        try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch { /* ignore */ }
      }, 400);
      return next;
    });
  }, []);

  const lastStep = SECTIONS.length - 1;
  const goToStep = useCallback((i: number) => {
    setStep(Math.max(0, Math.min(SECTIONS.length - 1, i)));
    // Bring the top of the new step into view, the way the stepped forms do.
    requestAnimationFrame(() => stepTopRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
  }, []);

  const C = useMemo(() => compute(S), [S]);
  const on = S.minilabs;

  function openSend() {
    if (!S.cSignature) {
      showToast('Please sign before sending.', true);
      goToStep(lastStep);
      return;
    }
    if (!S.cSign.trim()) {
      showToast('Please add your name under the signature.', true);
      goToStep(lastStep);
      return;
    }
    setModalOpen(true);
  }

  async function handleSubmit(senderName: string, senderEmail: string, senderNote: string) {
    if (!senderName.trim()) { showToast('Please enter your name.', true); return; }
    if (!senderEmail.includes('@')) { showToast('Please enter a valid email.', true); return; }
    setSubmitting(true);
    try {
      // A flat record of what was agreed, so the email and the submission viewer
      // can report it without re-computing anything.
      const data: Record<string, string> = {
        plan: on ? 'Website + Website Growth + Minilabs Booking System' : 'Website + Website Growth only',
        minilabs: on ? `Included · ${mo(PRICE.minilabsLaunch)} for months 1 to 3, then ${mo(PRICE.minilabsRegular)} · setup waived` : 'Not included',
        one_time: cad(C.oneTime),
        monthly_launch: mo(C.launch),
        monthly_after: mo(C.after),
        payment_schedule: `50% ${cad(C.deposit)} on signing · 50% ${cad(C.deposit)} at launch · ${C.monthlyText}`,
        minimum_term: `${PRICE.launchMonths} months, then month to month (30 days' written notice)`,
        client_legal: CLIENT,
        client_signatory: [S.cSign, S.cTitle].filter(Boolean).join(', ') || 'Not provided',
        client_date: S.cDate ? longDate(S.cDate) : 'Not provided',
        provider_signatory: [S.pSign, S.pTitle].filter(Boolean).join(', ') || 'Not yet countersigned',
        provider_date: S.pDate ? longDate(S.pDate) : 'Not yet countersigned',
        reference: REF,
        proposal_date: longDate(PROPOSAL_DATE),
        valid_until: longDate(VALID_UNTIL),
        governing_law: 'Ontario, Canada',
        client_signature: S.cSignature,
        provider_signature: S.pSignature,
        contract_state: JSON.stringify(S),
      };
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ formSlug: form.slug, senderName: senderName.trim(), senderEmail: senderEmail.trim(), senderNote: senderNote.trim(), data }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? 'Submission failed');
      setModalOpen(false);
      showToast('Sent to Maxxlab. Check your inbox for a copy.');
      window.open(`/view/${json.id}`, '_blank');
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Submission failed. Please try again.', true);
    } finally {
      setSubmitting(false);
    }
  }

  function copySummary() {
    const txt = summaryText(S);
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(txt).then(
        () => showToast('Summary copied.'),
        () => showToast('Copy was blocked here.', true),
      );
    } else showToast('Copy is not available in this browser.', true);
  }

  const dim = !on && 'opacity-35 print:hidden';
  const partRow = 'flex items-start justify-between gap-5 rounded-md border px-4 py-3.5';

  return (
    <>
      {/* ── Hero ── */}
      <div className="bg-white">
        <div className="max-w-5xl mx-auto px-5 sm:px-8">
          <div className="pt-16 pb-2">
            {/* Lockup and reference line sit centred, letterhead style, above the
                left-aligned headline and body. */}
            <div className="flex justify-center">
              <Lockup height={30} />
            </div>

            <div className="mt-9 text-center font-mono text-[10px] uppercase tracking-[0.18em] text-brand-ink-4">
              Proposal and service agreement · {REF} · Prepared for {CLIENT}
            </div>

            {/* Rule closing the centred letterhead, before the proposal itself. */}
            <div className="mt-10 border-t border-brand-line" />

            <h1 className="mt-10 max-w-3xl text-[38px] sm:text-[46px] leading-[1.06] tracking-[-0.032em] font-medium text-brand-ink">
              A modern website and a booking system <span className="text-brand-ink-4">that never misses a ride.</span>
            </h1>
            <p className="mt-5 max-w-xl text-[15px] leading-[1.65] text-brand-ink-3">
              Everything Airport Limo Toronto needs to look premium online, be found on Google, and turn every call and
              message into a booking. Based on our Audit and Research Report.
            </p>

            <dl className="mt-10 pt-6 border-t border-brand-line grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-5 max-w-3xl">
              {[
                ['Client', CLIENT],
                ['Provider', PROVIDER],
                ['Currency', 'CAD'],
                ['Date', longDate(PROPOSAL_DATE)],
                ['Valid until', longDate(VALID_UNTIL)],
                ['Contact', `${CONTACT.name} · ${CONTACT.phone}`],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-brand-ink-4 mb-1">{k}</dt>
                  <dd className="text-[14px] text-brand-ink">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {/* ── Sections ── */}
      <main className="bg-white pb-36 print:pb-0">
        <div ref={stepTopRef} className="scroll-mt-6" />
        <div className="max-w-5xl mx-auto px-5 sm:px-8 pt-16">

          <Section
            active={step === 0} id="overview" n="01" title="What you get"
            note="Three parts that work together. The website is the base. Website Growth keeps you climbing on Google every month. The Minilabs Booking System runs behind the website so no call, message or return trip is missed."
          >
            {/* Deliberately no figures here. The opening section is about what the
                three parts are; every number lives in section 03 so the client
                reads the offer before the price. */}
            <div className="space-y-2.5">
              <div className={clsx(partRow, 'border-brand-line')}>
                <div>
                  <div className="text-[15px] font-medium text-brand-ink">A · New website</div>
                  <div className="text-[13px] text-brand-ink-3 mt-0.5">One-time build</div>
                </div>
                <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-brand-ink-4 pt-1.5 whitespace-nowrap">Included</div>
              </div>
              <div className={clsx(partRow, 'border-brand-line')}>
                <div>
                  <div className="text-[15px] font-medium text-brand-ink">B · Website Growth</div>
                  <div className="text-[13px] text-brand-ink-3 mt-0.5">
                    {on ? 'Monthly, bundled with the Booking System' : 'Monthly'}
                  </div>
                </div>
                <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-brand-ink-4 pt-1.5 whitespace-nowrap">Included</div>
              </div>
              <div className={clsx(partRow, 'transition-opacity', on ? 'border-brand-ink' : 'border-brand-line', dim)}>
                <div>
                  <div className="text-[15px] font-medium text-brand-ink">C · Minilabs Booking System</div>
                  <div className="text-[13px] text-brand-ink-3 mt-0.5">
                    {on ? 'Monthly, with the setup fee waived' : 'Monthly'}
                  </div>
                </div>
                <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-brand-ink-4 pt-1.5 whitespace-nowrap">
                  {on ? 'Included' : 'Not included'}
                </div>
              </div>
            </div>
            <p className="mt-4 text-[12.5px] text-brand-ink-4">
              Pricing is set out in section 03.
            </p>
          </Section>

          <Section
            active={step === 1} id="scope" n="02" title="Scope of work"
            note="Exactly what is delivered under this agreement, part by part."
          >
            <div className="flex justify-end -mt-1 mb-2 no-print">
              <button
                type="button"
                onClick={() => setOpenScope(allScopeOpen ? [] : SCOPE_KEYS)}
                className="text-[12px] font-medium text-brand-ink-3 hover:text-brand-ink transition-colors"
              >
                {allScopeOpen ? 'Collapse all' : 'Expand all'}
              </button>
            </div>

            <Panel title="A · New website · one-time" open={openScope.includes('a')} onToggle={() => toggleScope('a')}>
              <DocTable
                className="!mt-0"
                head={['Deliverable', 'What is included']}
                widths={[32, 68]}
                rows={WEBSITE_SCOPE.map(([k, v]) => ({ cells: [{ b: k }, v] }))}
              />
            </Panel>

            <Panel className="mt-8" title="B · Website Growth · monthly" open={openScope.includes('b')} onToggle={() => toggleScope('b')}>
              <div className="mt-3">
                <P>
                  The monthly work that helps your website and Google profile rank higher over time. We promise the work
                  and the reporting; rankings are tracked, not guaranteed.
                </P>
              </div>
              <DocTable head={['Every month']} rows={GROWTH_SCOPE.map(x => ({ cells: [x] }))} />
              <P muted>Review requests and review replies are handled by the Minilabs Booking System, so they are not charged twice.</P>
            </Panel>

            <Panel
              className={clsx('mt-8 transition-opacity', dim)}
              title={<>C · Minilabs Booking System · monthly{!on && ' · not included'}</>}
              open={openScope.includes('c')}
              onToggle={() => toggleScope('c')}
            >
              <div className="mt-3"><P>Runs behind the website and on your phone. Goes live on launch day.</P></div>
              <DocTable
                head={['What is set up', 'What it does for you']}
                widths={[32, 68]}
                rows={MINILABS_SCOPE.map(([k, v]) => ({ cells: [{ b: k }, v] }))}
              />
              <P muted>Text messages and phone calls through the system are included for normal business use.</P>
            </Panel>

            <Panel className="mt-8" title="Available later · not in this agreement" open={openScope.includes('later')} onToggle={() => toggleScope('later')}>
              <ul className="mt-3 space-y-1.5">
                {LATER.map(x => (
                  <li key={x} className="flex gap-2.5 text-[14.5px] text-brand-ink-2 leading-relaxed">
                    <span className="mt-[10px] w-[3px] h-[3px] rounded-full bg-brand-ink-4 flex-shrink-0" />{x}
                  </li>
                ))}
              </ul>
            </Panel>
          </Section>

          <Section
            active={step === 2} id="investment" n="03" title="Investment"
            note="All prices in Canadian dollars. Tick or untick the booking system to compare the two plans."
          >
            <div className="no-print mb-5">
              <PlanToggle on={on} onChange={v => patch({ minilabs: v })} />
            </div>
            <DocTable
              className="!mt-0"
              head={['Item', { r: 'Regular' }, { r: 'Your price' }]}
              widths={[60, 20, 20]}
              rows={[
                { cells: ['A · New website build (one-time)', { r: cad(PRICE.build) }, { r: cad(PRICE.build) }] },
                { cells: ['C · Minilabs setup (one-time)', { r: <Strike>{cad(PRICE.minilabsSetup)}</Strike> }, { r: <b className="font-semibold text-brand-ink">Waived</b> }], off: !on },
                on
                  ? { cells: ['B · Website Growth (monthly), bundled with Minilabs', { r: <Strike>{mo(PRICE.growthRegular)}</Strike> }, { r: <b className="font-semibold text-brand-ink">{mo(PRICE.growthBundle)}</b> }] }
                  : { cells: ['B · Website Growth (monthly), months 1 to 3', { r: <Strike>{mo(PRICE.growthRegular)}</Strike> }, { r: <b className="font-semibold text-brand-ink">{mo(PRICE.growthBundle)}</b> }] },
                ...(on ? [] : [{ cells: ['B · Website Growth (monthly), from month 4', { r: mo(PRICE.growthRegular) }, { r: mo(PRICE.growthRegular) }] as Cell[] }]),
                { cells: ['C · Minilabs Booking System (monthly), months 1 to 3', { r: <Strike>{mo(PRICE.minilabsRegular)}</Strike> }, { r: <b className="font-semibold text-brand-ink">{mo(PRICE.minilabsLaunch)}</b> }], off: !on },
                { cells: ['C · Minilabs Booking System (monthly), from month 4', { r: mo(PRICE.minilabsRegular) }, { r: mo(PRICE.minilabsRegular) }], off: !on },
              ]}
            />

            <dl className="grid grid-cols-3 gap-5 sm:gap-8 mt-9 mb-7 print-break-avoid">
              {[
                ['One-time', cad(C.oneTime)],
                ['Monthly, months 1 to 3', mo(C.launch)],
                ['Monthly, from month 4', mo(C.after)],
              ].map(([k, v]) => (
                <div key={k} className="border-t-2 border-brand-ink pt-3 flex flex-col justify-between">
                  <dt className="font-mono text-[9.5px] sm:text-[10px] uppercase tracking-[0.14em] text-brand-ink-4">{k}</dt>
                  <dd className="text-[24px] sm:text-[32px] font-medium tracking-[-0.03em] text-brand-ink mt-2 leading-none tabular-nums">{v}</dd>
                </div>
              ))}
            </dl>

            {on ? (
              <P>
                <b className="text-brand-ink font-semibold">Why the launch rate?</b> We want you to see real results before you pay the full
                monthly price. For the first 3 months you pay {mo(C.launch)} in total, and your monthly report shows exactly
                what came in. From month 4, the regular {mo(C.after)} applies.
              </P>
            ) : (
              <P>
                <b className="text-brand-ink font-semibold">Website only:</b> Website Growth is {mo(PRICE.growthBundle)} for the first 3 months
                (50% off the regular {mo(PRICE.growthRegular)}), then {mo(PRICE.growthRegular)} from month 4. Add the Minilabs
                Booking System at any time and Website Growth stays at the {mo(PRICE.growthBundle)} bundle price.
              </P>
            )}
            <P muted>
              Paid directly by you to others: domain renewal, website hosting plan, Square card fees and any Google Ads spend.
            </P>
          </Section>

          <Section
            active={step === 3} id="payments" n="04" title="Payments"
            note="Monthly fees are billed in advance each month, starting on launch day. Minimum term: 3 months, then month to month. Either side can stop with 30 days' written notice."
          >
            <DocTable
              className="!mt-0"
              head={['When', 'What', { r: 'Amount' }]}
              widths={[26, 54, 20]}
              rows={[
                { cells: [{ b: 'On signing' }, '50% of the website build, to start work', { r: cad(C.deposit) }] },
                { cells: [{ b: 'At launch' }, '50% of the website build', { r: cad(C.deposit) }] },
                { cells: [{ b: 'Monthly from launch' }, C.monthlyText, { r: mo(C.launch) }] },
              ]}
            />
          </Section>

          <Section
            active={step === 4} id="timeline" n="05" title="Timeline"
            note="About 6 weeks from the first payment and access. Delays in feedback or access move the dates by the same amount."
          >
            <DocTable
              className="!mt-0"
              head={['When', 'What happens', 'Your part']}
              widths={[20, 46, 34]}
              rows={TIMELINE.map(t => ({
                cells: [
                  { b: t.when },
                  <>{t.what}{t.ml && on && <> {t.ml}</>}</>,
                  t.you,
                ],
              }))}
            />
          </Section>

          <Section active={step === 5} id="together" n="06" title="Working together" note="What each side brings, so the six weeks stay six weeks.">
            <DocTable
              className="!mt-0"
              head={['We will', 'You will']}
              widths={[50, 50]}
              rows={TOGETHER.map(t => ({ cells: [t.we, t.mlOnly && !on ? '' : t.you] }))}
            />
          </Section>

          <Section active={step === 6} id="terms" n="07" title="Terms" note="Fourteen short clauses, in plain language.">
            <div className="-mt-1">
              {TERMS.map(([title, body], i) => (
                <div key={title} className="print-break-avoid py-4 border-b border-brand-line first:pt-0">
                  <h3 className="text-[14.5px] font-medium text-brand-ink mb-1.5 flex gap-3">
                    <span className="font-mono text-[11px] text-brand-ink-4 tabular-nums pt-[3px]">{String(i + 1).padStart(2, '0')}</span>
                    {title}
                  </h3>
                  <p className="text-[14px] text-brand-ink-2 leading-[1.65] pl-[30px]">{body}</p>
                </div>
              ))}
            </div>
          </Section>

          <Section
            active={step === 7} id="acceptance" n="08" title="Acceptance"
            note={<>
              By signing, both sides agree to the scope, prices and terms above
              {on ? ' (including the Minilabs Booking System)' : ' (website and Website Growth only, without the Minilabs Booking System)'}.
              This proposal is valid until {longDate(VALID_UNTIL)}.
            </>}
          >
            {/* interactive signing — screen only */}
            <div className="space-y-12 no-print">
              {([
                { who: `For ${CLIENT}`, sig: 'cSignature', name: 'cSign', title: 'cTitle', date: 'cDate', label: 'Signature' },
                { who: 'For Maxxlab and Minilabs', sig: 'pSignature', name: 'pSign', title: 'pTitle', date: 'pDate', label: 'Signature' },
              ] as const).map(col => (
                <div key={col.who}>
                  <Sub className="mb-5">{col.who}</Sub>
                  <SignaturePad
                    label={col.label}
                    value={S[col.sig]}
                    onChange={v => patch({ [col.sig]: v, ...(v && !S[col.date] ? { [col.date]: todayIso() } : {}) } as Partial<ContractState>)}
                  />
                  <div className="mt-6">
                    <label className="block">
                      <span className="block text-[13.5px] text-brand-ink-2 mb-2">Full name</span>
                      <input className="field-line" value={S[col.name]} onChange={e => patch({ [col.name]: e.target.value } as Partial<ContractState>)} autoComplete="name" />
                    </label>
                  </div>
                  <div className="field-pair mt-6">
                    <label className="field-cell block">
                      <span className="block text-[13.5px] text-brand-ink-2 mb-2">Title</span>
                      <span />
                      <input className="field-line" value={S[col.title]} onChange={e => patch({ [col.title]: e.target.value } as Partial<ContractState>)} />
                    </label>
                    <label className="field-cell block">
                      <span className="block text-[13.5px] text-brand-ink-2 mb-2">Date</span>
                      <span />
                      <input type="date" className="field-line" value={S[col.date]} onChange={e => patch({ [col.date]: e.target.value } as Partial<ContractState>)} />
                    </label>
                  </div>
                </div>
              ))}
            </div>

            {/* signed block — print / PDF only */}
            <div className="hidden print:grid grid-cols-2 gap-8 print-break-avoid">
              <SignedColumn who={`For ${CLIENT}`} name={S.cSign} title={S.cTitle} date={S.cDate} sig={S.cSignature} stamp="Signature" />
              <SignedColumn who="For Maxxlab and Minilabs" name={S.pSign} title={S.pTitle} date={S.pDate} sig={S.pSignature} stamp="Signature" />
            </div>
          </Section>

          {/* ── Step navigation ── */}
          <div className="mt-16 pt-6 border-t border-brand-line flex items-center justify-between gap-4 no-print">
            <button
              type="button"
              onClick={() => goToStep(step - 1)}
              disabled={step === 0}
              className="group flex items-center gap-2 text-[13px] font-medium text-brand-ink-3 hover:text-brand-ink disabled:opacity-0 disabled:pointer-events-none transition-colors"
            >
              <svg className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </button>

            <div className="flex items-center gap-1.5">
              {SECTIONS.map((sec, i) => (
                <button
                  key={sec.id}
                  type="button"
                  onClick={() => goToStep(i)}
                  title={sec.title}
                  aria-label={`Step ${i + 1}: ${sec.title}`}
                  aria-current={i === step ? 'step' : undefined}
                  className={clsx(
                    'h-1 rounded-full transition-all duration-200',
                    i === step ? 'w-6 bg-brand-ink' : 'w-1.5 bg-brand-line-2 hover:bg-brand-ink-4',
                  )}
                />
              ))}
            </div>

            {step < lastStep ? (
              <button
                type="button"
                onClick={() => goToStep(step + 1)}
                className="group flex items-center gap-2 text-[13px] font-medium text-brand-ink hover:text-brand-red transition-colors"
              >
                {step === lastStep - 1 ? 'Review and sign' : 'Next'}
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            ) : (
              <button
                type="button"
                onClick={openSend}
                className="group flex items-center gap-2 text-[13px] font-medium text-brand-red hover:text-brand-red-dark transition-colors"
              >
                Sign and send
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </button>
            )}
          </div>

          {/* End note */}
          <div className="mt-14 max-w-2xl">
            <p className="text-[13px] text-brand-ink-3 leading-relaxed">
              Minilabs is a trade name of Maxxlab. Questions? {CONTACT.name} · {CONTACT.phone} ·{' '}
              <a href={`mailto:${CONTACT.email}`} className="font-medium text-brand-ink underline decoration-brand-line-2 underline-offset-[3px] hover:decoration-brand-ink transition-colors">
                {CONTACT.email}
              </a>
            </p>
          </div>
        </div>
      </main>

      {/* ── Action bar ── */}
      <div className="fixed bottom-0 left-0 right-0 z-50 no-print" style={{ background: '#ffffff', borderTop: '1px solid #e2e8f0' }}>
        <div className="max-w-3xl mx-auto px-5 sm:px-6 py-3.5 flex items-center justify-between gap-3">
          {/* Left: the running total, but only once the client has reached the
              Investment section. Before that the bar stays quiet so the first
              screens are about the offer, not the price. */}
          <div className="min-w-0 tabular-nums">
            {step >= 2 ? (
              <>
                <div className="text-[15px] sm:text-[17px] font-medium tracking-[-0.02em] text-brand-ink leading-none whitespace-nowrap">
                  {mo(C.launch)} <span className="text-brand-ink-4 text-[12.5px] font-normal">then {mo(C.after)}</span>
                </div>
                <div className="hidden sm:block font-mono text-[10px] uppercase tracking-[0.12em] text-brand-ink-4 mt-1.5">
                  Months 1 to 3 · {cad(C.oneTime)} one-time · {on ? 'with Minilabs' : 'website only'}
                </div>
              </>
            ) : (
              <>
                <div className="text-[14px] sm:text-[15px] font-medium tracking-[-0.02em] text-brand-ink leading-none truncate">
                  {CLIENT}
                </div>
                <div className="hidden sm:block font-mono text-[10px] uppercase tracking-[0.12em] text-brand-ink-4 mt-1.5">
                  Proposal · {REF}
                </div>
              </>
            )}
          </div>

          {/* Right: actions */}
          <div className="flex items-center gap-2">
            <button type="button" onClick={copySummary} className="hidden md:block px-3.5 py-2 text-[12px] font-medium text-brand-ink-2 border border-brand-line rounded-md hover:border-brand-ink transition-colors">
              Copy summary
            </button>
            <button type="button" onClick={() => window.print()} className="hidden sm:block px-3.5 py-2 text-[12px] font-medium text-brand-ink-2 border border-brand-line rounded-md hover:border-brand-ink transition-colors">
              Print / PDF
            </button>
            <button
              type="button"
              onClick={openSend}
              className={clsx(
                'px-5 py-2.5 text-[13px] font-medium rounded-md transition-colors flex items-center gap-2 whitespace-nowrap',
                S.cSignature ? 'bg-brand-red text-white hover:bg-brand-red-dark' : 'bg-brand-line-2 text-white hover:bg-brand-ink-4',
              )}
              title={S.cSignature ? undefined : 'Sign on the last step first'}
            >
              Sign and send
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {modalOpen && (
        <SubmitModal
          onClose={() => setModalOpen(false)}
          onSubmit={handleSubmit}
          defaultName={S.cSign}
          defaultEmail=""
          loading={submitting}
        />
      )}
      {toast && <Toast msg={toast.msg} error={toast.error} />}
    </>
  );
}
