import type { AnswerMap } from './form-logic';

// ── G.O.A.T discovery read-out ───────────────────────────────────────────────
// The intake form is scored so the admin email carries the fit read, the deal
// blockers, the scope flags and the recommended first layers. Ported from the
// original standalone discovery page so the numbers stay identical.

export const LAYERS: Record<string, string> = {
  L0: 'Data Spine',
  L1: 'Intake & Quoting',
  L2: 'Kitchen & Fulfilment',
  L3: 'Inventory & Meat Supply',
  L4: 'Workforce',
  L5: 'Command Center',
  L6: 'Growth & Accounts',
};

/** Points per answer. Higher means more urgency, more budget, or more upside. */
const SCORES: Record<string, Record<string, number>> = {
  orders:    { '150-300': 6, '300+': 8, '50-150': 4, 'Honestly not sure': 2 },
  poshist:   { '2+ years': 3, 'About a year': 2, '6 months': 1 },
  inv:       { 'In our heads': 6, 'Counts on paper': 5, Spreadsheet: 4, Software: 1 },
  temp:      { 'Paper log sheets': 3, Sometimes: 4, 'Not really': 4 },
  wrongwk:   { '3-5': 2, '6-10': 3, '10+': 4, 'No idea': 3 },
  misscall:  { 'A few': 2, Lots: 4, 'No way to know': 3 },
  quotetime: { 'Same day': 2, '1-2 days': 4, 'Depends who picks up': 4 },
  lostcat:   { '3-5': 3, '6+': 4, 'Not tracked': 3 },
  ankhrs:    { '4-8': 2, '8-12': 4, 'Basically all day': 5 },
  tried:     { 'Bought software, it did not stick': 3, 'Hired someone, did not work out': 2, 'Built something ourselves': 3, 'Nothing yet': 2 },
  catprice:  { 'Custom quote every time': 3, 'Depends who quotes it': 3, 'Packages, but prices flex': 2 },
  packcheck: { "When it's busy, no": 3, 'No step for this': 4 },
  away:      { 'Nobody, it waits for me': 5, 'A manager, partly': 3, 'Family member steps in': 2 },
  export:    { 'Yes, easily': 3, Probably: 2 },
  itlead:    { 'Nobody really': 2 },
  invest:    { '$10-25k': 4, '$25-50k': 6, '$50k+': 8, 'Depends on the case': 3, '< $10k': 1 },
  decide:    { 'Ankita alone': 4, 'Ankita + partner': 3, 'Family decision': 2 },
  when:      { 'Start ASAP': 6, 'Within 1-3 months': 4, 'This year': 2 },
  phased:    { 'Exactly what I want': 4, 'Makes sense': 3 },
};

/** Multi-select questions score per pick, weighted by how many can be chosen. */
const PER_PICK: Record<string, { points: number; max: number }> = {
  pains: { points: 3, max: 3 },
};

/** Which layer a given pain or goal points at. */
const LAYER_MAP: Record<string, Record<string, string>> = {
  pains: {
    'Missed calls / slow quotes': 'L1',
    'Wrong orders going out': 'L2',
    'Late orders, long waits': 'L2',
    'Stock-outs mid-service': 'L3',
    'Over-ordering & waste': 'L3',
    'Staff no-shows / roster chaos': 'L4',
    'Unpaid B2B invoices': 'L6',
    'No view across sites': 'L5',
    'Everything routes through Ankita': 'L5',
  },
  goal: {
    'Fewer mistakes & refunds': 'L2',
    'Faster quotes, more catering won': 'L1',
    'Lower food cost / waste': 'L3',
    'Sane schedules, less no-show chaos': 'L4',
    'Ankita off the phones': 'L5',
    'More B2B contracts': 'L6',
  },
};

const MAX_SCORE =
  Object.values(SCORES).reduce((sum, table) => sum + Math.max(...Object.values(table)), 0) +
  Object.values(PER_PICK).reduce((sum, p) => sum + p.points * p.max, 0);

const one = (d: AnswerMap, k: string) => (typeof d[k] === 'string' ? (d[k] as string) : '');
const many = (d: AnswerMap, k: string) =>
  Array.isArray(d[k]) ? (d[k] as unknown[]).filter((v): v is string => typeof v === 'string') : [];

/** Fit score out of 100. */
export function fitScore(d: AnswerMap): number {
  let total = 0;
  for (const [field, table] of Object.entries(SCORES)) {
    const value = one(d, field);
    if (value && table[value]) total += table[value];
  }
  for (const [field, { points, max }] of Object.entries(PER_PICK)) {
    total += points * Math.min(many(d, field).length, max);
  }
  return Math.round((total / MAX_SCORE) * 100);
}

/** Things that stop a deal, not just shape it. */
export function blockers(d: AnswerMap): string[] {
  const out: string[] = [];
  if (one(d, 'when') === 'Just exploring') out.push('Timeline is "exploring". Nurture, do not scope.');
  if (one(d, 'invest') === '< $10k') out.push('Phase-one budget under $10k. Advisory plus L0 only.');
  if (one(d, 'decide') === 'Needs investor / bank') out.push('Financing dependency. Align before the SOW.');
  if (one(d, 'phased') === 'Prefer all at once') out.push('Wants big-bang. Re-anchor on gated layers before proposing.');
  if (one(d, 'tried') === 'Mid-way through something now') out.push('Another vendor is mid-engagement. Clarify overlap before proposing.');
  if (one(d, 'away') === 'Nobody, it waits for me' && /hire|none|nobody/i.test(one(d, 'champion'))) {
    out.push('No one to delegate to. The founder-hours KPI cannot move until an ops lead exists.');
  }
  return out;
}

/** Extra work to price into the proposal. */
export function scopeFlags(d: AnswerMap): string[] {
  const out: string[] = [];
  const is = (k: string, ...v: string[]) => v.includes(one(d, k));
  if (is('pos', 'Cash register / none')) out.push('No POS API. Order capture starts at a screen we provide.');
  if (is('possame', 'No / mixed')) out.push('Mixed POS across sites. One adapter per system in L0.');
  if (is('poshist', 'Just started', '6 months')) out.push('Thin sales history. Forecasting leans on catering bookings until data builds.');
  if (is('catprice', 'Custom quote every time', 'Depends who quotes it')) out.push('No price book. L1 includes building the catering price and portion model.');
  if (is('recipes', "In the cooks' heads")) out.push('Recipes undocumented. BOM workshop needed before stock depletion works.');
  if (is('inv', 'In our heads')) out.push('No stock baseline. Two-week count period before L3 goes live.');
  if (is('export', 'Never tried')) out.push('POS export unverified. Week-1 task, could change the L0 plan.');
  if (is('wifi', 'One site is bad')) out.push('One site on poor internet. Local-first capture required there.');
  if (is('admin', 'Scattered, depends on the tool')) out.push('Access scattered. Name one access owner in week 0.');
  if (is('langs', 'Mixed, several', 'English + Punjabi', 'English + Hindi/Urdu')) out.push('Floor UI and SMS templates need a second language.');
  const peak = many(d, 'peak');
  if (peak.length && peak[0] !== 'Steady all year') out.push(`Peak: ${peak.join(', ')}. Pilot before it, freeze cutovers during it.`);
  if (is('wholesale', 'Next 12 months')) out.push('Wholesale within a year. Build lot traceability into L3 from day one.');
  return out;
}

/** Top two layers to lead with, weighted by pain and goal ordering. */
export function recommendedLayers(d: AnswerMap): string[] {
  const hits: Record<string, number> = {};
  const add = (layer: string, weight: number) => { hits[layer] = (hits[layer] ?? 0) + weight; };

  (['pains', 'goal'] as const).forEach(field => {
    many(d, field).forEach((answer, i) => {
      const layer = LAYER_MAP[field][answer];
      if (layer) add(layer, 3 - Math.min(i, 2));
    });
  });
  if (['In our heads', 'Counts on paper'].includes(one(d, 'inv'))) add('L3', 2);
  if (['No step for this', "When it's busy, no"].includes(one(d, 'packcheck'))) add('L2', 2);
  if (['1-2 days', 'Depends who picks up'].includes(one(d, 'quotetime'))) add('L1', 2);
  if (one(d, 'away') === 'Nobody, it waits for me') add('L5', 2);

  return Object.entries(hits).sort((a, b) => b[1] - a[1]).slice(0, 2).map(([layer]) => layer);
}

export interface Verdict { tone: 'go' | 'maybe' | 'no'; word: string }

export function verdict(score: number, blockerCount: number): Verdict {
  if (score >= 60 && blockerCount === 0) return { tone: 'go', word: 'Strong fit. Book the 2-week discovery.' };
  if (score < 35 || blockerCount >= 3) return { tone: 'no', word: 'Not yet. Advisory first, revisit in a quarter.' };
  return { tone: 'maybe', word: 'Qualified. Shape the deal.' };
}

export interface Readout {
  score: number;
  verdict: Verdict;
  blockers: string[];
  scopeFlags: string[];
  layers: string[];
  phaseOne: string;
}

export function buildReadout(d: AnswerMap): Readout {
  const score = fitScore(d);
  const blocks = blockers(d);
  const layers = recommendedLayers(d);
  const lead = layers[0] ?? 'L1';
  const queued = layers[1];
  return {
    score,
    verdict: verdict(score, blocks.length),
    blockers: blocks,
    scopeFlags: scopeFlags(d),
    layers,
    phaseOne:
      `L0 ${LAYERS.L0} + ${lead} ${LAYERS[lead]}` +
      (queued ? `, with ${queued} ${LAYERS[queued]} queued` : ''),
  };
}
