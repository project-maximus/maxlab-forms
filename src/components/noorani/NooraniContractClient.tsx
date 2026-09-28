'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import clsx from 'clsx';
import type { FormConfig } from '@/lib/types';
import Logo from '@/components/Logo';
import SubmitModal from '@/components/SubmitModal';
import Toast from '@/components/Toast';
import SignaturePad from './SignaturePad';
import {
  CORE, OPT, TIERS, PACKAGES, SECTIONS, LABS, ML_STATUS,
  type ContractState, type Block, type Cell,
  applyPackage, defaultState, compute, buildModel, buildMinilabsModel, computeML,
  packageTotal, priceOf, tierPrice, tierPriceKey, fmt, num, longDate, summaryText,
} from '@/lib/noorani-contract';
import { RESEARCH_STATS, RESEARCH_FINDINGS, RESEARCH_COMPETITORS, RESEARCH_STREAMS } from '@/lib/noorani-research';

// v3: the retainer moved from a free-text fee to a package tier, and the
// Minilabs order form was added, so old drafts are not loadable.
const STORAGE_KEY = 'maxxlab-form-noorani-contract-v3';

// ── document renderer ────────────────────────────────────────────────────────
function cellText(c: Cell): string {
  if (typeof c === 'object') return 'b' in c ? c.b : c.r;
  return c;
}
const cellBold = (c: Cell) => typeof c === 'object' && 'b' in c;
const cellRight = (c: Cell) => typeof c === 'object' && 'r' in c;

function DocTable({ b }: { b: Extract<Block, { t: 'table' }> }) {
  return (
    <div className="overflow-x-auto my-3">
      <table className="w-full border-collapse text-[12.5px] tabular-nums">
        <thead>
          <tr>
            {b.head.map((h, i) => (
              <th
                key={i}
                style={b.widths ? { width: `${b.widths[i]}%` } : undefined}
                className={clsx(
                  'text-left font-mono font-medium text-[9.5px] uppercase tracking-[0.12em] text-brand-ink-4 border-b-[1.5px] border-brand-ink px-2 py-1.5 align-bottom',
                  cellRight(h) && 'text-right'
                )}
              >
                {cellText(h)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {b.rows.map((r, ri) => {
            const cells = Array.isArray(r) ? r : r.cells;
            const cls = Array.isArray(r) ? undefined : r.cls;
            return (
              <tr key={ri} className={clsx(cls === 'tot' && 'font-semibold', cls === 'sub' && 'text-brand-ink-4')}>
                {cells.map((c, ci) => (
                  <td
                    key={ci}
                    className={clsx(
                      'px-2 py-1.5 align-top text-brand-ink-2 border-b border-brand-line',
                      cls === 'tot' && 'border-t-[1.5px] border-t-brand-ink border-b-0 text-brand-ink',
                      cellBold(c) && 'font-semibold text-brand-ink',
                      cellRight(c) && 'text-right whitespace-nowrap'
                    )}
                  >
                    {cellText(c)}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function SignatureBlock({ s, b }: { s: ContractState; b: Extract<Block, { t: 'sig' }> }) {
  const col = (who: string, name: string, title: string, sig: string, stamp: string) => (
    <div>
      <div className="font-mono text-[9.5px] uppercase tracking-[0.12em] text-brand-ink-4 mb-2">{who}</div>
      <div className="h-[46px] flex items-end pb-1">
        {sig
          // eslint-disable-next-line @next/next/no-img-element
          ? <img src={sig} alt={`${who} signature`} className="max-h-[44px] object-contain object-left" />
          : <span className="text-[12px] text-brand-ink-4 italic">Unsigned</span>}
      </div>
      <div className="border-b border-brand-ink" />
      <div className="font-mono text-[9px] uppercase tracking-[0.12em] text-brand-ink-4 mt-1 mb-3">{stamp}</div>
      <div className="h-[30px] flex items-end text-[13px] text-brand-ink">{name}</div>
      <div className="border-b border-brand-ink" />
      <div className="font-mono text-[9px] uppercase tracking-[0.12em] text-brand-ink-4 mt-1 mb-3">Name</div>
      <div className="h-[30px] flex items-end text-[13px] text-brand-ink">{title}</div>
      <div className="border-b border-brand-ink" />
      <div className="font-mono text-[9px] uppercase tracking-[0.12em] text-brand-ink-4 mt-1 mb-3">Title</div>
      <div className="h-[30px] flex items-end text-[13px] text-brand-ink">
        {sig ? longDate(new Date()) : ''}
      </div>
      <div className="border-b border-brand-ink" />
      <div className="font-mono text-[9px] uppercase tracking-[0.12em] text-brand-ink-4 mt-1">Date</div>
    </div>
  );
  return (
    <div className="grid sm:grid-cols-2 gap-8 mt-3 print-break-avoid">
      {col(`For ${s.cLegal}`, s.cSign, s.cTitle, s.cSignature, 'Signature and company stamp')}
      {col(`For ${b.provider}`, b.pName, b.pTitle, b.providerSig, 'Signature')}
    </div>
  );
}

function DocumentView({ s }: { s: ContractState }) {
  const M = useMemo(() => (s.view === 'ml' ? buildMinilabsModel(s) : buildModel(s)).M, [s]);
  return (
    <article className="bg-white border border-brand-line rounded-lg px-6 sm:px-10 py-9 print-break-avoid">
      {M.map((b, i) => {
        if (b.t === 'cover') {
          return (
            <div key={i} className="bg-brand-ink text-white rounded-md px-7 py-7 mb-7">
              <div className="flex items-center gap-2.5 mb-5">
                <Logo size={22} white />
                <span className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-white/55">{b.kicker}</span>
              </div>
              <h3 className="text-[27px] sm:text-[31px] font-medium tracking-[-0.03em] leading-[1.08]">
                {b.t1}<br /><span className="text-white/55">{b.t2}</span>
              </h3>
              <p className="mt-3 text-[13.5px] leading-relaxed text-white/70 max-w-[58ch]">{b.blurb}</p>
              <div className="mt-6 pt-4 border-t border-white/15 grid grid-cols-2 sm:grid-cols-3 gap-4">
                {b.cells.map(([k, v]) => (
                  <div key={k}>
                    <span className="block font-mono text-[9px] uppercase tracking-[0.14em] text-white/45 mb-0.5">{k}</span>
                    <span className="text-[12.5px] text-white/90">{v}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        }
        if (b.t === 'h') return (
          <h4 key={i} className="mt-8 mb-2">
            <span className="block font-mono text-[10px] tracking-[0.14em] text-brand-red mb-1">{b.n}</span>
            <span className="text-[21px] font-medium tracking-[-0.02em] text-brand-ink leading-snug">{b.text}</span>
          </h4>
        );
        if (b.t === 'h5') return <h5 key={i} className="text-[13.5px] font-semibold text-brand-ink mt-4 mb-1.5">{b.text}</h5>;
        if (b.t === 'p') return <p key={i} className={clsx('mb-2.5 max-w-[72ch] leading-relaxed', b.muted ? 'text-[12.5px] text-brand-ink-4' : 'text-[13.5px] text-brand-ink-2')}>{b.text}</p>;
        if (b.t === 'callout') return <div key={i} className="bg-brand-bg rounded-md px-4 py-3 my-3 text-[13px] text-brand-ink-2 leading-relaxed">{b.text}</div>;
        if (b.t === 'ul') return <ul key={i} className="mb-3 space-y-1">{b.items.map((x, j) => (
          <li key={j} className="flex gap-2.5 text-[13.5px] text-brand-ink-2 leading-relaxed">
            <span className="mt-[9px] w-[3px] h-[3px] rounded-full bg-brand-ink-4 flex-shrink-0" />{x}
          </li>))}</ul>;
        if (b.t === 'table') return <DocTable key={i} b={b} />;
        if (b.t === 'clauses') return <div key={i}>{b.items.map((c, j) => (
          <div key={j} className="print-break-avoid">
            <h5 className="text-[13px] font-semibold text-brand-ink mt-3.5 mb-1">{j + 1}. {c[0]}</h5>
            <p className="text-[13px] text-brand-ink-2 leading-relaxed max-w-[72ch]">{c[1]}</p>
          </div>))}</div>;
        if (b.t === 'sig') return <SignatureBlock key={i} s={s} b={b} />;
        if (b.t === 'src') return <ol key={i} className="list-decimal pl-5 text-[11.5px] text-brand-ink-4 space-y-0.5 break-words">{b.items.map((x, j) => <li key={j}>{x}</li>)}</ol>;
        return null;
      })}
    </article>
  );
}

// ── small control primitives, matching the form UI ───────────────────────────
function Group({ title, action, children }: { title: string; action?: React.ReactNode; children: React.ReactNode }) {
  return (
    <section className="border border-brand-line rounded-lg p-4">
      <div className="flex items-center justify-between gap-2 mb-3">
        <h2 className="text-[13px] font-semibold text-brand-ink">{title}</h2>
        {action}
      </div>
      {children}
    </section>
  );
}
// The control is nested inside the label so the two are associated without
// hand-managed ids: clicking the caption focuses the input, and screen readers
// announce the right name.
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block mb-2.5 last:mb-0">
      <span className="block text-[12px] text-brand-ink-3 mb-1">{label}</span>
      {children}
    </label>
  );
}

export default function NooraniContractClient({ form }: { form: FormConfig }) {
  const [S, setS] = useState<ContractState>(defaultState);
  const [tab, setTab] = useState<'build' | 'research'>('build');
  const [editPrices, setEditPrices] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState<{ msg: string; error?: boolean } | null>(null);
  const [resetArmed, setResetArmed] = useState(false);
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

  const C = useMemo(() => compute(S), [S]);
  const X = useMemo(() => computeML(S), [S]);

  // Dependencies are enforced both ways so the contract can never describe a
  // dealer portal without the quote portal it is built on.
  function toggleItem(id: string, on: boolean) {
    const items = { ...S.items, [id]: on };
    const messages: string[] = [];
    if (on) {
      (OPT.find(o => o.id === id)?.requires ?? []).forEach(r => {
        if (!items[r]) { items[r] = true; messages.push(`Also added ${OPT.find(x => x.id === r)!.name}, which it needs.`); }
      });
    } else {
      OPT.forEach(o => {
        if (items[o.id] && (o.requires ?? []).includes(id)) {
          items[o.id] = false;
          messages.push(`Also removed ${o.name}, which needs it.`);
        }
      });
    }
    patch({ items });
    if (messages.length) showToast(messages[0]);
  }

  async function handleSubmit(senderName: string, senderEmail: string, senderNote: string) {
    if (!senderName.trim()) { showToast('Please enter your name.', true); return; }
    if (!senderEmail.includes('@')) { showToast('Please enter a valid email.', true); return; }
    setSubmitting(true);
    try {
      // The answers double as a flat record of the agreed contract, so the
      // email and the submission viewer can report it without re-computing.
      const data: Record<string, string> = {
        package: C.pkgName,
        total: fmt(C.total),
        timeline: `${C.weeks} weeks`,
        subtotal: fmt(C.subtotal),
        discount: S.discount ? `${S.discount}%` : 'None',
        tax: S.tax ? `${S.tax}%` : 'None',
        payment_schedule: C.inst.map(i => `${i.pct}% ${fmt(i.amt)} (${i.when})`).join(' · '),
        retainer: S.ret.on ? `${C.ret.name} · ${fmt(C.ret.fee)}/month, minimum ${S.ret.months} months` : 'Not included',
        retainer_scope: S.ret.on ? C.ret.scope : 'Not included',
        platform: { discovery: 'Decide in discovery', woo: 'WooCommerce', shopify: 'Shopify' }[S.platform] ?? S.platform,
        included: C.lines.map(l => l.name).join('; '),
        excluded: OPT.filter(o => !S.items[o.id]).map(o => o.name).join('; ') || 'None',
        support: C.support,
        revisions: `${S.revisions} rounds`,
        due_days: `${S.dueDays} days`,
        governing_law: S.law === 'on' ? 'Ontario, Canada' : 'Pakistan (Lahore courts)',
        client_legal: S.cLegal,
        client_signatory: [S.cSign, S.cTitle].filter(Boolean).join(', ') || 'Not provided',
        maxxlab_signatory: [S.pSign, S.pTitle].filter(Boolean).join(', ') || 'Not provided',
        reference: S.ref,
        proposal_date: longDate(S.date),
        valid_until: longDate(C.validUntil),
        notes: S.notes || 'None',
        // Phase 2 travels with Phase 1 so the deal record shows both halves.
        minilabs_status: ML_STATUS[S.ml.status],
        minilabs_labs: X.labs.map(l => l.name).join('; ') || 'None selected',
        minilabs_setup: X.tbc ? 'Visible after Phase 1' : fmt(X.setup),
        minilabs_monthly: X.tbc ? 'Visible after Phase 1' : fmt(X.monthly),
        minilabs_term: `${S.ml.term} months, ${S.ml.seats} logins`,
        minilabs_reference: S.ml.ref,
        minilabs_signatory: [S.ml.sign, S.ml.title].filter(Boolean).join(', ') || 'Not provided',
        minilabs_signature: S.mlSignature,
        client_signature: S.cSignature,
        maxxlab_signature: S.pSignature,
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

  const pkgKey = C.pkgKey;

  return (
    <>
      {/* ── header ── */}
      <header className="sticky top-0 z-40 bg-white border-b border-brand-line no-print">
        <div className="max-w-[1500px] mx-auto px-5 sm:px-7 py-3 flex items-center gap-4 flex-wrap">
          <Logo size={24} />
          <div className="min-w-0">
            <div className="text-[13px] font-medium text-brand-ink leading-tight">Noorani Contract Builder</div>
            <div className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-brand-ink-4">Maxxlab · Proposal and service agreement</div>
          </div>

          <div className="flex gap-1 ml-1">
            {(['build', 'research'] as const).map(t => (
              <button
                key={t}
                type="button"
                onClick={() => setTab(t)}
                className={clsx('px-3 py-1.5 text-[12.5px] font-medium rounded-md transition-colors',
                  tab === t ? 'bg-brand-ink text-white' : 'text-brand-ink-3 hover:text-brand-ink')}
              >
                {t === 'build' ? 'Contract builder' : 'Research brief'}
              </button>
            ))}
          </div>

          <div className="ml-auto text-right tabular-nums max-w-[300px]">
            <div className="text-[19px] font-medium tracking-[-0.02em] text-brand-ink leading-none">
              {S.view === 'ml' ? (X.tbc ? 'After Phase 1' : `${fmt(X.monthly)}/mo`) : fmt(C.total)}
            </div>
            <div className="font-mono text-[9.5px] uppercase tracking-[0.12em] text-brand-ink-4 mt-0.5 leading-snug">
              {S.view === 'ml'
                ? (X.tbc ? 'Charges visible once Phase 1 is complete' : `Phase 2 · ${X.labs.length} labs · setup ${fmt(X.setup)}`)
                : `Phase 1 · ${C.pkgName} · ${C.weeks} weeks${S.ret.on ? ` · + ${fmt(C.ret.fee)}/mo` : ''}`}
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button type="button" onClick={copySummary} className="px-3 py-2 text-[12px] font-medium text-brand-ink-2 border border-brand-line rounded-md hover:border-brand-ink transition-colors">Copy summary</button>
            <button type="button" onClick={() => window.print()} className="px-3 py-2 text-[12px] font-medium text-brand-ink-2 border border-brand-line rounded-md hover:border-brand-ink transition-colors">Print / PDF</button>
            <button type="button" onClick={() => setModalOpen(true)} className="px-4 py-2 text-[12.5px] font-medium bg-brand-red text-white rounded-md hover:bg-brand-red-dark transition-colors flex items-center gap-2">
              Send to Maxxlab
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {tab === 'build' ? (
        <main className="bg-white pb-16">
          <div className="max-w-[1500px] mx-auto px-5 sm:px-7 pt-6 grid gap-6 lg:grid-cols-[minmax(0,380px)_minmax(0,1fr)]">

            {/* ── controls ── */}
            <aside className="flex flex-col gap-3.5 lg:sticky lg:top-[76px] lg:self-start lg:max-h-[calc(100vh-96px)] lg:overflow-auto lg:pr-1 no-print">

              <Group title="Package" action={<span className="font-mono text-[10px] uppercase tracking-[0.12em] text-brand-ink-4">{C.pkgName}</span>}>
                <div className="grid grid-cols-3 gap-1.5">
                  {Object.keys(PACKAGES).map(k => (
                    <button
                      key={k}
                      type="button"
                      onClick={() => patch(applyPackage(S, k))}
                      aria-pressed={pkgKey === k}
                      className={clsx('border rounded-md px-2.5 py-2 text-left transition-colors',
                        pkgKey === k ? 'border-brand-ink bg-brand-bg' : 'border-brand-line hover:border-brand-ink-4')}
                    >
                      <span className="block text-[12.5px] font-medium text-brand-ink leading-tight">{PACKAGES[k].name}</span>
                      <span className="block font-mono text-[10px] text-brand-ink-4 tabular-nums mt-0.5">{fmt(packageTotal(S, k))}</span>
                      <span className="block font-mono text-[9.5px] text-brand-ink-4 tabular-nums">+ {num(PACKAGES[k].retainer)}/mo</span>
                    </button>
                  ))}
                </div>
                {pkgKey === 'custom' && (
                  <p className="mt-2.5 text-[12px] text-brand-ink-2 bg-brand-bg rounded-md px-3 py-2">
                    You have changed the items, so this is now a custom package. Pick a package above to reset.
                  </p>
                )}
              </Group>

              <Group
                title="Services and features"
                action={<button type="button" onClick={() => setEditPrices(v => !v)} className="text-[12px] text-brand-ink-3 hover:text-brand-ink transition-colors">{editPrices ? 'Done editing' : 'Edit prices'}</button>}
              >
                <p className="text-[12px] text-brand-ink-4 mb-2.5 leading-relaxed">
                  Tick what to include. Scope, price, timeline and payments update as you go.
                </p>
                {CORE.map(c => (
                  <div key={c.id} className="flex items-start gap-2.5 py-2 border-t border-brand-line first:border-t-0">
                    <span className="mt-[3px] w-[15px] h-[15px] rounded-[3px] bg-brand-ink flex items-center justify-center flex-shrink-0">
                      <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                    </span>
                    <span className="flex-1 text-[12.5px] font-medium text-brand-ink leading-snug">
                      {c.name}
                      <span className="ml-1.5 font-mono text-[9px] uppercase tracking-[0.1em] text-brand-ink-4 border border-brand-line rounded px-1">Core</span>
                    </span>
                    {editPrices
                      ? <input type="number" step={1000} min={0} value={priceOf(S, c)} onChange={e => patch({ prices: { ...S.prices, [c.id]: e.target.value === '' ? null : Math.max(0, Number(e.target.value)) } })} className="w-[86px] text-right text-[11.5px] px-1.5 py-1 border border-brand-line rounded" />
                      : <span className="font-mono text-[11.5px] text-brand-ink-2 tabular-nums">{num(priceOf(S, c))}</span>}
                  </div>
                ))}
                {OPT.map((o, i) => {
                  const prevGroup = i > 0 ? OPT[i - 1].group : null;
                  return (
                    <div key={o.id}>
                      {o.group !== prevGroup && (
                        <div className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-brand-ink-4 mt-3.5 mb-0.5">{o.group}</div>
                      )}
                      <label className="flex items-start gap-2.5 py-2 border-t border-brand-line cursor-pointer">
                        <input type="checkbox" checked={!!S.items[o.id]} onChange={e => toggleItem(o.id, e.target.checked)} className="mt-[3px] w-[15px] h-[15px] accent-[#0f172a] flex-shrink-0" />
                        <span className="flex-1 min-w-0">
                          <span className="block text-[12.5px] font-medium text-brand-ink leading-snug">{o.name}</span>
                          <span className="block text-[11.5px] text-brand-ink-4 mt-0.5 leading-snug">{o.why}</span>
                          {o.requires && <span className="block text-[11px] text-brand-ink-3 mt-0.5">Needs: {o.requires.map(r => OPT.find(x => x.id === r)!.name).join(', ')}</span>}
                        </span>
                        {editPrices
                          ? <input type="number" step={1000} min={0} value={priceOf(S, o)} onClick={e => e.preventDefault()} onChange={e => patch({ prices: { ...S.prices, [o.id]: e.target.value === '' ? null : Math.max(0, Number(e.target.value)) } })} className="w-[86px] text-right text-[11.5px] px-1.5 py-1 border border-brand-line rounded" />
                          : <span className="font-mono text-[11.5px] text-brand-ink-2 tabular-nums">{num(priceOf(S, o))}</span>}
                      </label>
                    </div>
                  );
                })}
              </Group>

              <Group title="Options with levels">
                {TIERS.map(t => (
                  <Field key={t.id} label={t.name}>
                    <select value={S.tiers[t.id]} onChange={e => patch({ tiers: { ...S.tiers, [t.id]: e.target.value } })} className="field-line">
                      {t.opts.map(o => (
                        <option key={o.v} value={o.v}>{o.label}{tierPrice(S, t, o) ? ` · ${fmt(tierPrice(S, t, o))}` : ' · included'}</option>
                      ))}
                    </select>
                    {editPrices && (
                      <div className="grid grid-cols-2 gap-2 mt-1.5">
                        {t.opts.filter(o => o.v !== 'none').map(o => (
                          <div key={o.v}>
                            <label className="block text-[11px] text-brand-ink-4 mb-0.5">{o.label}</label>
                            <input type="number" step={1000} min={0} value={tierPrice(S, t, o)} onChange={e => patch({ prices: { ...S.prices, [tierPriceKey(t, o)]: e.target.value === '' ? null : Math.max(0, Number(e.target.value)) } })} className="field-line" />
                          </div>
                        ))}
                      </div>
                    )}
                  </Field>
                ))}
              </Group>

              <Group title="Pricing and payment">
                <div className="grid grid-cols-2 gap-2.5">
                  <Field label="Discount (%)"><input type="number" min={0} max={50} value={S.discount} onChange={e => patch({ discount: Math.min(50, Math.max(0, Number(e.target.value) || 0)) })} className="field-line" /></Field>
                  <Field label="Tax added (%)"><input type="number" min={0} max={30} step={0.5} value={S.tax} onChange={e => patch({ tax: Math.max(0, Number(e.target.value) || 0) })} className="field-line" /></Field>
                </div>
                <Field label="Payment schedule">
                  <select value={S.schedule} onChange={e => patch({ schedule: e.target.value })} className="field-line">
                    <option value="40-30-30">40% signing · 30% design approval · 30% launch</option>
                    <option value="50-50">50% signing · 50% launch</option>
                    <option value="30-40-30">30% signing · 40% staging review · 30% launch</option>
                    <option value="25-25-25-25">4 x 25%: signing, design, staging, launch</option>
                  </select>
                </Field>
                <div className="grid grid-cols-2 gap-2.5">
                  <Field label="Invoice due (days)"><input type="number" min={0} max={60} value={S.dueDays} onChange={e => patch({ dueDays: Math.max(0, Number(e.target.value) || 0) })} className="field-line" /></Field>
                  <Field label="Design revision rounds">
                    <select value={S.revisions} onChange={e => patch({ revisions: e.target.value })} className="field-line">
                      {['2', '3', '4'].map(r => <option key={r}>{r}</option>)}
                    </select>
                  </Field>
                </div>
                <label className="flex items-center gap-2.5 mt-1 text-[13px] text-brand-ink-2 cursor-pointer">
                  <input type="checkbox" checked={S.ret.on} onChange={e => patch({ ret: { ...S.ret, on: e.target.checked } })} className="w-[15px] h-[15px] accent-[#0f172a]" />
                  Include monthly retainer
                  <span className="font-mono text-[11.5px] text-brand-ink-4 tabular-nums">· {fmt(C.ret.fee)}/month</span>
                </label>
                {S.ret.on && (
                  <div className="grid grid-cols-2 gap-2.5 mt-2">
                    <Field label="Retainer level">
                      <select value={S.ret.tier} onChange={e => patch({ ret: { ...S.ret, tier: e.target.value } })} className="field-line">
                        <option value="auto">Matches package</option>
                        {Object.keys(PACKAGES).map(k => (
                          <option key={k} value={k}>{PACKAGES[k].name} · {fmt(PACKAGES[k].retainer)}</option>
                        ))}
                      </select>
                    </Field>
                    <Field label="Minimum term">
                      <select value={S.ret.months} onChange={e => patch({ ret: { ...S.ret, months: e.target.value } })} className="field-line">
                        {['3', '6', '12'].map(m => <option key={m} value={m}>{m} months</option>)}
                      </select>
                    </Field>
                  </div>
                )}
              </Group>

              <Group title="Platform">
                <Field label="Store platform">
                  <select value={S.platform} onChange={e => patch({ platform: e.target.value })} className="field-line">
                    <option value="discovery">Decide in discovery (recommended)</option>
                    <option value="woo">WooCommerce, clean rebuild on managed hosting</option>
                    <option value="shopify">Shopify</option>
                  </select>
                </Field>
              </Group>

              <Group title="Minilabs division" action={<span className="font-mono text-[10px] uppercase tracking-[0.12em] text-brand-ink-4">Separate agreement</span>}>
                <p className="text-[12px] text-brand-ink-2 bg-brand-bg rounded-md px-3 py-2.5 mb-3 leading-relaxed">
                  Phase 2. The sales system (inbox, pipelines, follow-ups, reviews, campaigns, Google and Meta ads, owner dashboard) sits with Minilabs and starts after the Maxxlab Phase 1 website. The Maxxlab agreement only connects the website to it, so its prices stay the same.
                </p>
                <Field label="Minilabs for this client">
                  <select value={S.ml.status} onChange={e => patch({ ml: { ...S.ml, status: e.target.value } })} className="field-line">
                    <option value="parallel">Offered alongside (separate agreement)</option>
                    <option value="later">To be added after launch</option>
                    <option value="none">Not taken (connect a free CRM)</option>
                  </select>
                </Field>

                {LABS.map((l, i) => (
                  <div key={l.id} className={clsx('py-2', i > 0 && 'border-t border-brand-line')}>
                    <label className="flex items-start gap-2.5 cursor-pointer">
                      <input type="checkbox" checked={!!S.ml.labs[l.id]} onChange={e => patch({ ml: { ...S.ml, labs: { ...S.ml.labs, [l.id]: e.target.checked } } })} className="mt-[3px] w-[15px] h-[15px] accent-[#0f172a] flex-shrink-0" />
                      <span className="flex-1 min-w-0">
                        <span className="text-[12.5px] font-medium text-brand-ink">{l.name}</span>
                        <span className="ml-1.5 font-mono text-[9.5px] uppercase tracking-[0.1em] text-brand-ink-4">Step {l.phase}</span>
                      </span>
                    </label>
                    {S.ml.labs[l.id] && (
                      <div className="grid grid-cols-2 gap-2 mt-1.5 pl-[25px]">
                        <label className="block">
                          <span className="block text-[10.5px] text-brand-ink-4 mb-0.5">Setup PKR</span>
                          <input type="number" min={0} step={1000} placeholder="After Phase 1"
                            value={S.ml.setup[l.id] ?? ''}
                            onChange={e => patch({ ml: { ...S.ml, setup: { ...S.ml.setup, [l.id]: e.target.value === '' ? '' : Math.max(0, Number(e.target.value)) } } })}
                            className="field-line" />
                        </label>
                        <label className="block">
                          <span className="block text-[10.5px] text-brand-ink-4 mb-0.5">Monthly PKR</span>
                          <input type="number" min={0} step={500} placeholder="After Phase 1"
                            value={S.ml.monthly[l.id] ?? ''}
                            onChange={e => patch({ ml: { ...S.ml, monthly: { ...S.ml.monthly, [l.id]: e.target.value === '' ? '' : Math.max(0, Number(e.target.value)) } } })}
                            className="field-line" />
                        </label>
                      </div>
                    )}
                  </div>
                ))}

                <div className="border-t border-brand-line pt-3 mt-2">
                  <Field label='Onboarding and training, setup fee (PKR, leave blank to show "after Phase 1")'>
                    <input type="number" min={0} step={1000} placeholder="After Phase 1"
                      value={S.ml.onboard ?? ''}
                      onChange={e => patch({ ml: { ...S.ml, onboard: e.target.value === '' ? '' : Math.max(0, Number(e.target.value)) } })}
                      className="field-line" />
                  </Field>
                  <div className="grid grid-cols-2 gap-2.5">
                    <Field label="User logins included">
                      <input type="number" min={1} max={50} value={S.ml.seats} onChange={e => patch({ ml: { ...S.ml, seats: Math.max(1, Number(e.target.value) || 1) } })} className="field-line" />
                    </Field>
                    <Field label="Minimum term">
                      <select value={S.ml.term} onChange={e => patch({ ml: { ...S.ml, term: e.target.value } })} className="field-line">
                        {['3', '6', '12'].map(m => <option key={m} value={m}>{m} months</option>)}
                      </select>
                    </Field>
                  </div>
                  <div className="grid grid-cols-2 gap-2.5">
                    <Field label="Minilabs signatory"><input type="text" value={S.ml.sign} onChange={e => patch({ ml: { ...S.ml, sign: e.target.value } })} className="field-line" /></Field>
                    <Field label="Title"><input type="text" value={S.ml.title} onChange={e => patch({ ml: { ...S.ml, title: e.target.value } })} className="field-line" /></Field>
                  </div>
                  <Field label="Order form reference"><input type="text" value={S.ml.ref} onChange={e => patch({ ml: { ...S.ml, ref: e.target.value } })} className="field-line" /></Field>
                </div>
              </Group>

              <Group title="Parties and dates">
                <Field label="Client legal name"><input type="text" value={S.cLegal} onChange={e => patch({ cLegal: e.target.value })} className="field-line" /></Field>
                <div className="grid grid-cols-2 gap-2.5">
                  <Field label="Client signatory"><input type="text" value={S.cSign} onChange={e => patch({ cSign: e.target.value })} placeholder="Name" className="field-line" /></Field>
                  <Field label="Title"><input type="text" value={S.cTitle} onChange={e => patch({ cTitle: e.target.value })} placeholder="e.g. Director" className="field-line" /></Field>
                </div>
                <div className="grid grid-cols-2 gap-2.5">
                  <Field label="Maxxlab signatory"><input type="text" value={S.pSign} onChange={e => patch({ pSign: e.target.value })} className="field-line" /></Field>
                  <Field label="Title"><input type="text" value={S.pTitle} onChange={e => patch({ pTitle: e.target.value })} className="field-line" /></Field>
                </div>
                <div className="grid grid-cols-2 gap-2.5">
                  <Field label="Proposal date"><input type="date" value={S.date} onChange={e => patch({ date: e.target.value })} className="field-line" /></Field>
                  <Field label="Valid for (days)"><input type="number" min={1} max={90} value={S.valid} onChange={e => patch({ valid: Math.max(1, Number(e.target.value) || 1) })} className="field-line" /></Field>
                </div>
                <div className="grid grid-cols-2 gap-2.5">
                  <Field label="Reference"><input type="text" value={S.ref} onChange={e => patch({ ref: e.target.value })} className="field-line" /></Field>
                  <Field label="Governing law">
                    <select value={S.law} onChange={e => patch({ law: e.target.value })} className="field-line">
                      <option value="pk">Pakistan (Lahore courts)</option>
                      <option value="on">Ontario, Canada</option>
                    </select>
                  </Field>
                </div>
              </Group>

              <Group title="Signatures">
                <div className="space-y-4">
                  <SignaturePad label={`For ${S.cLegal}`} value={S.cSignature} onChange={v => patch({ cSignature: v })} />
                  <div className="border-t border-brand-line pt-4">
                    <SignaturePad label="For Maxxlab (Phase 1)" value={S.pSignature} onChange={v => patch({ pSignature: v })} />
                  </div>
                  <div className="border-t border-brand-line pt-4">
                    <SignaturePad label="For Minilabs (Phase 2)" value={S.mlSignature} onChange={v => patch({ mlSignature: v })} />
                  </div>
                </div>
              </Group>

              <Group title="Sections to include">
                <div className="flex flex-wrap gap-1.5">
                  {SECTIONS.map(sec => (
                    <label key={sec.id} className={clsx('flex items-center gap-1.5 border rounded-full px-3 py-1.5 text-[12px] cursor-pointer transition-colors',
                      S.sections[sec.id] ? 'border-brand-ink bg-brand-bg text-brand-ink' : 'border-brand-line text-brand-ink-3 hover:border-brand-ink-4')}>
                      <input type="checkbox" checked={!!S.sections[sec.id]} onChange={e => patch({ sections: { ...S.sections, [sec.id]: e.target.checked } })} className="w-[13px] h-[13px] accent-[#0f172a]" />
                      {sec.name}
                    </label>
                  ))}
                </div>
                <Field label="Special notes (added to the scope section)">
                  <textarea value={S.notes} onChange={e => patch({ notes: e.target.value })} rows={3} placeholder="e.g. Client will supply updated ISO 9001:2015 certificate by week 2." className="field-line field-line-area" />
                </Field>
                <button
                  type="button"
                  onClick={() => {
                    if (!resetArmed) { setResetArmed(true); setTimeout(() => setResetArmed(false), 4000); return; }
                    setResetArmed(false); setEditPrices(false);
                    const d = defaultState();
                    setS(d);
                    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(d)); } catch { /* ignore */ }
                    showToast('Reset to the original Growth proposal.');
                  }}
                  className="text-[12px] text-brand-ink-4 hover:text-brand-red transition-colors mt-1"
                >
                  {resetArmed ? 'Click again to confirm reset' : 'Reset everything to the original proposal'}
                </button>
              </Group>
            </aside>

            {/* ── preview ── */}
            <section className="min-w-0">
              <div className="flex gap-1 mb-3 border border-brand-line rounded-lg p-1 w-fit no-print">
                {([['maxx', 'Phase 1 · Maxxlab agreement'], ['ml', 'Phase 2 · Minilabs order form']] as const).map(([v, label]) => (
                  <button
                    key={v}
                    type="button"
                    role="tab"
                    aria-selected={S.view === v}
                    onClick={() => patch({ view: v })}
                    className={clsx('px-3.5 py-1.5 text-[12.5px] font-medium rounded-md transition-colors',
                      S.view === v ? 'bg-brand-ink text-white' : 'text-brand-ink-3 hover:text-brand-ink')}
                  >
                    {label}
                  </button>
                ))}
              </div>

              <div className="flex flex-wrap gap-2 mb-3 no-print">
                {(S.view === 'ml'
                  ? [['Phase', '2 · after Maxxlab Phase 1'], ['Status', ML_STATUS[S.ml.status]], ['Labs', String(X.labs.length)],
                     ['Logins', String(S.ml.seats)], ['Minimum term', `${S.ml.term} months`], ['Valid until', longDate(X.validUntil)]]
                  : [['Package', C.pkgName], ['Deliverables', String(C.lines.length)], ['Timeline', `${C.weeks} weeks`],
                     ['First payment', fmt(C.inst[0].amt)], ['Valid until', longDate(C.validUntil)]]
                ).map(([k, v]) => (
                  <span key={k} className="font-mono text-[11px] border border-brand-line rounded-full px-3 py-1 text-brand-ink-3 tabular-nums">
                    {k} <b className="text-brand-ink font-medium">{v}</b>
                  </span>
                ))}
              </div>
              <DocumentView s={S} />
            </section>
          </div>
        </main>
      ) : (
        <main className="bg-white pb-16">
          <div className="max-w-3xl mx-auto px-5 sm:px-7 pt-10">
            <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-brand-ink-4">Companion to the proposal · September 2026</div>
            <h2 className="mt-3 text-[30px] font-medium tracking-[-0.03em] leading-[1.1] text-brand-ink">What the research says</h2>
            <p className="mt-4 text-[15px] leading-[1.65] text-brand-ink-3 max-w-[70ch]">
              Noorani Surgical has 77 years of trust, its own manufacturing, and approved-supplier status with the Ministry of Defence and four provincial governments. Very little of that is visible online. Each feature in the builder links back to this evidence.
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-9">
              {RESEARCH_STATS.map(s => (
                <div key={s.n + s.label} className="border-t-2 border-brand-ink pt-2.5">
                  <div className="text-[26px] font-medium tracking-[-0.03em] text-brand-ink tabular-nums leading-none">{s.n}</div>
                  <div className="text-[12.5px] text-brand-ink-2 mt-1.5 leading-snug">{s.label}</div>
                  <a href={s.src} target="_blank" rel="noopener noreferrer" className="text-[11px] text-brand-ink-4 hover:text-brand-ink underline decoration-brand-line-2 underline-offset-2 mt-1 inline-block">Source</a>
                </div>
              ))}
            </div>

            {[
              { title: "What we found on Noorani's site and channels", head: ['Finding', 'Impact', 'Why it matters'], rows: RESEARCH_FINDINGS.map(f => [f.finding, f.sev, f.why]) },
              { title: "What competitors do that Noorani does not", head: ['Competitor', 'What they do well', ''], rows: RESEARCH_COMPETITORS.map(c => [c.name, c.does, c.url]) },
              { title: 'Revenue streams we recommend adding', head: ['Stream', 'Builder feature', ''], rows: RESEARCH_STREAMS.map(r => [r.stream, r.feature, '']) },
            ].map(card => (
              <div key={card.title} className="mt-8 border border-brand-line rounded-lg p-5">
                <h3 className="text-[15px] font-semibold text-brand-ink mb-3">{card.title}</h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-[13px]">
                    <thead><tr>{card.head.map(h => (
                      <th key={h} className="text-left font-mono font-medium text-[9.5px] uppercase tracking-[0.12em] text-brand-ink-4 border-b-[1.5px] border-brand-ink px-2 py-1.5">{h}</th>
                    ))}</tr></thead>
                    <tbody>
                      {card.rows.map((r, i) => (
                        <tr key={i}>
                          <td className="border-b border-brand-line px-2 py-2 align-top font-semibold text-brand-ink">{r[0]}</td>
                          <td className="border-b border-brand-line px-2 py-2 align-top text-brand-ink-2">
                            {['High', 'Medium', 'To test'].includes(r[1])
                              ? <span className="font-mono text-[10px] uppercase tracking-[0.08em] border border-brand-line rounded px-1.5 py-0.5 text-brand-ink-3">{r[1]}</span>
                              : r[1]}
                          </td>
                          <td className="border-b border-brand-line px-2 py-2 align-top text-brand-ink-2">
                            {r[2]?.startsWith('http')
                              ? <a href={r[2]} target="_blank" rel="noopener noreferrer" className="text-brand-ink underline decoration-brand-line-2 underline-offset-2">Visit</a>
                              : r[2]}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}

            <p className="mt-8 text-[12px] text-brand-ink-4 leading-relaxed">
              This page gives business and digital advice, not legal or regulatory advice. Confirm DRAP questions with DRAP or a legal adviser.
            </p>
          </div>
        </main>
      )}

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
