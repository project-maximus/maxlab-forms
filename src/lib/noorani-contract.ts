// ── Noorani Surgical · two-phase agreement ───────────────────────────────────
// Phase 1 is the Maxxlab website agreement. Phase 2 is the Minilabs sales-system
// order form, signed separately so either can change without touching the other.
// Catalogue, pricing and both document models live here, free of React so the
// builder, the email and the viewer all compute the same numbers.

export interface CatalogueItem {
  id: string;
  name: string;
  price: number;
  desc: string;
  weeks?: number;
  group?: string;
  why?: string;
  requires?: string[];
}

export interface TierOption { v: string; label: string; price: number; weeks: number }
export interface Tier { id: string; name: string; opts: TierOption[]; desc: string }

export const CORE: CatalogueItem[] = [
  { id: 'core_discovery', name: 'Discovery and strategy', price: 20000, desc: 'Kickoff workshop in Lahore or online. Interviews with sales, accounts and warehouse staff. Review of top products and customers. Speed, SEO and security audit of the current site. Platform decision, price policy, and a written discovery report with agreed targets.' },
  { id: 'core_build', name: 'Website design and build', price: 45000, desc: 'Mobile-first design with four buyer paths: hospitals and government, clinics and doctors, home-care families, and dealers. Homepage, category, product, About, Contact, FAQ, policy and landing pages. Target: good mobile Core Web Vitals on key pages. Up to {rev} rounds of design revisions.' },
  { id: 'core_migration', name: 'Catalogue and data migration', price: 20000, desc: 'Transfer of products, variants, images, categories, customers and order history where the platform allows. Cleanup of names, specs and categories. A 301 redirect from every old URL so search rankings carry over.' },
  { id: 'core_payments', name: 'Payments, delivery and policies', price: 15000, desc: 'Cash on delivery, JazzCash, Easypaisa, bank transfer and cards through a local gateway. Delivery zones and rates, courier booking link-up, and plain-language return, warranty and privacy policies for your review.' },
  { id: 'core_launch', name: 'Launch, analytics and training', price: 10000, desc: 'Testing on phones, tablets and desktop. GA4 with ecommerce tracking. Go-live on {site} with a rollback plan. Two staff training sessions with recorded videos and a written guide.' },
];

export const OPT: CatalogueItem[] = [
  { id: 'brand', name: 'Brand refresh and heritage story', price: 15000, weeks: 0, group: 'Brand and trust', desc: 'Logo cleanup (not a new identity), colour palette, typography and a short brand guide. A consistent "Since 1949" story, corrected About page, current certificates and government approvals shown up front.', why: 'The homepage says 75 years, the About page says 65+, and the company was founded in 1949. The About page still cites ISO 9001:2008.' },
  { id: 'photo', name: 'Photography day', price: 10000, weeks: 0, group: 'Brand and trust', desc: 'One day at the Bank Square showroom and Harbanspura workshop: products, team, workshop and real installations.', why: 'Real photos build trust with procurement buyers. Stock images do not.' },
  { id: 'wa_basic', name: 'WhatsApp Business setup', price: 5000, weeks: 0, group: 'Sales channels', desc: 'WhatsApp Business profile and product catalogue, and a WhatsApp button on every product page that opens with the product name already typed in. The same number is later connected to the Minilabs inbox if that service is taken.', why: "21.7% of Pakistan's WhatsApp accounts are Business accounts (TechJuice, 2025). Today the homepage shows only a phone number." },
  { id: 'quote', name: 'Institutional quote portal and clinic accounts', price: 35000, weeks: 1, group: 'Sales channels', desc: "Quote cart on the website with GST-ready PDF quotations. Hospital and clinic accounts with tier pricing. Downloadable spec sheets, certificates and a tender pack. Every quote request is sent to the client's CRM; follow-ups and pipeline tracking run in Minilabs when taken.", why: '67% of B2B buyers prefer to buy without a sales rep (Gartner, 2026). Thankful Surgical and Meg Medius already offer quotes and bulk tiers.' },
  { id: 'dealer', name: 'Dealer and reseller portal', price: 25000, weeks: 1, group: 'Sales channels', requires: ['quote'], desc: 'Dealer application and approval, dealer login with trade prices, stock availability and a marketing kit.', why: 'Meg Medius runs a "Becoming A Dealer" programme to reach smaller cities.' },
  { id: 'daraz', name: 'Daraz storefront and stock sync', price: 15000, weeks: 0.5, group: 'Sales channels', desc: 'Daraz store setup for fast-moving home-care items, with stock synced from the main site.', why: 'Daraz already offers COD, cards, JazzCash and monthly instalments in the wheelchair and hospital bed category.' },
  { id: 'rental', name: 'Equipment rental module', price: 20000, weeks: 0.5, group: 'New revenue', desc: 'Weekly or monthly rental of hospital beds, wheelchairs and oxygen concentrators, with deposit, delivery, setup and pickup booking.', why: "HealthServices.pk rents with setup and pickup. Pakistan's 60+ population is projected to reach 40.6M by 2050." },
  { id: 'amc', name: 'AMC offer and service booking pages', price: 15000, weeks: 0.5, group: 'New revenue', desc: 'AMC plans and pricing pages, AMC contract templates, and a service and repair booking form on the website. Visit tracking and maintenance reminders run in the Minilabs Service Lab (separate agreement).', why: "Noorani's own mission mentions after-sales support. Henry Schein runs a repair business (ProRepair) alongside sales." },
  { id: 'ai', name: 'AI assistant knowledge base', price: 20000, weeks: 1, group: 'AI and automation', requires: ['wa_basic'], desc: 'We write and test what the assistant needs to know: catalogue questions and answers, price-policy answers, hand-over rules, and reply scripts in English and Roman Urdu, plus a product data feed kept in sync with the store. The assistant itself runs in the Minilabs Agent Lab (separate agreement) or another WhatsApp tool the client chooses.', why: 'Good answers depend on good product knowledge. Today enquiries that come in after hours go unanswered.' },
  { id: 'pricing', name: 'Price update helper', price: 20000, weeks: 1, group: 'AI and automation', desc: 'Suggests new prices for imported items based on cost and the exchange rate. A manager approves before anything goes live.', why: 'The homepage asks buyers to call before ordering because prices change with currency devaluation.' },
  { id: 'tender', name: 'Tender watch alerts', price: 15000, weeks: 0.5, group: 'AI and automation', desc: 'Scans EPADS and provincial procurement portals for relevant tenders and sends the team a short summary.', why: 'Noorani is a registered supplier to the Ministry of Defence and four provincial governments.' },
  { id: 'local', name: 'Google Business Profiles and Search Console', price: 5000, weeks: 0, group: 'Search and data', desc: 'Google Business Profiles for Lahore and Karachi, Search Console, sitemap and structured product data. Automatic review requests after delivery are part of the Minilabs Reputation Lab.', why: 'Google says businesses with complete, accurate profiles are more likely to show in local results.' },
  { id: 'crm', name: 'Lead capture and CRM connection', price: 5000, weeks: 0, group: 'Search and data', desc: "Every quote request, form and WhatsApp click is tagged by source and product and sent to the client's CRM: Minilabs when taken, or a free CRM (e.g., HubSpot free tier) if not.", why: 'Needed to see where enquiries come from and to measure quote-to-order rate.' },
  { id: 'dashboard', name: 'Website and channel dashboard', price: 10000, weeks: 0, group: 'Search and data', requires: ['crm'], desc: 'Monthly dashboard for website traffic, store orders, quote requests submitted, Daraz sales, page speed and Google Maps views. Sales pipeline results (quotes won, response times) come from the Minilabs owner dashboard.', why: 'Keeps both teams focused on numbers that matter.' },
];

export const TIERS: Tier[] = [
  { id: 'copy', name: 'Product pages rewritten', desc: 'Product pages rewritten for the top {n} products, with warranty, dispatch time and the DRAP details you supply.', opts: [
    { v: '50', label: 'Top 50 products', price: 5000, weeks: 0 },
    { v: '150', label: 'Top 150 products', price: 20000, weeks: 0.5 },
    { v: '300', label: 'Top 300 products', price: 35000, weeks: 0.75 }] },
  { id: 'content', name: 'City pages and buying guides', desc: '{label} to win local searches and answer common buyer questions (e.g., choosing a wheelchair or BP monitor).', opts: [
    { v: 'none', label: 'None', price: 0, weeks: 0 },
    { v: 'std', label: '3 city pages + 6 guides', price: 10000, weeks: 0.5 },
    { v: 'ext', label: '6 city pages + 12 guides', price: 20000, weeks: 0.75 }] },
  { id: 'furniture', name: 'Custom hospital furniture orders', desc: '{label} for custom hospital furniture (size, material, quantity) that turns into a quote.', opts: [
    { v: 'none', label: 'None', price: 0, weeks: 0 },
    { v: 'form', label: 'Enquiry form', price: 5000, weeks: 0 },
    { v: 'config', label: 'Guided configurator', price: 20000, weeks: 0.5 }] },
  { id: 'support', name: 'Bug-fix support after launch', desc: 'Maxxlab fixes bugs in its own work for {label} after launch at no extra charge.', opts: [
    { v: '30', label: '30 days', price: 0, weeks: 0 },
    { v: '60', label: '60 days', price: 5000, weeks: 0 },
    { v: '90', label: '90 days', price: 10000, weeks: 0 }] },
];

export interface Pkg {
  name: string;
  /** Fixed monthly retainer that goes with this package */
  retainer: number;
  retScope: string;
  items: string[];
  tiers: Record<string, string>;
  blurb: string;
}

export const PACKAGES: Record<string, Pkg> = {
  foundation: {
    name: 'Foundation', retainer: 15000,
    retScope: 'One SEO article a month, one campaign message written for WhatsApp or email, small content and product updates, and a short monthly report.',
    items: ['brand', 'wa_basic', 'local'], tiers: { copy: '50', content: 'none', furniture: 'none', support: '30' },
    blurb: 'A properly rebuilt store with clear pricing, local payments, WhatsApp and a corrected heritage brand.',
  },
  growth: {
    name: 'Growth', retainer: 30000,
    retScope: 'Two SEO articles a month, campaign content for WhatsApp and email, AI assistant knowledge base updates, landing page updates, conversion improvements and a monthly review call.',
    items: ['brand', 'wa_basic', 'local', 'photo', 'quote', 'rental', 'amc', 'ai', 'crm'], tiers: { copy: '150', content: 'std', furniture: 'form', support: '60' },
    blurb: 'Adds the institutional quote system, clinic accounts, rentals, AMC, the WhatsApp AI assistant and local search.',
  },
  leader: {
    name: 'Market Leader', retainer: 45000,
    retScope: 'Everything in the Growth retainer, plus four SEO articles a month, dealer and Daraz catalogue upkeep, price helper and tender watch tuning, and a monthly dashboard review.',
    items: ['brand', 'wa_basic', 'local', 'photo', 'quote', 'rental', 'amc', 'ai', 'crm', 'dealer', 'daraz', 'pricing', 'tender', 'dashboard'], tiers: { copy: '300', content: 'ext', furniture: 'config', support: '90' },
    blurb: 'Adds dealers, Daraz, price and tender automation, a furniture configurator and monthly reporting.',
  },
};

export const SECTIONS = [
  { id: 'compare', name: 'Why this is different' },
  { id: 'goals', name: 'Goals and measures' },
  { id: 'platform', name: 'Platform comparison' },
  { id: 'risks', name: 'Risks' },
  { id: 'terms', name: 'Terms and conditions' },
  { id: 'sources', name: 'Sources' },
] as const;

// ── Minilabs (Phase 2) ───────────────────────────────────────────────────────
export interface Lab { id: string; name: string; phase: 1 | 2 | 3; desc: string }

export const LABS: Lab[] = [
  { id: 'inbox', name: 'Inbox Lab', phase: 1, desc: 'Shared inbox for WhatsApp, website chat, Facebook, Instagram, Google Business chat and email. Each lead is assigned to a salesperson, with a login for each salesperson.' },
  { id: 'pipeline', name: 'Pipeline Lab', phase: 1, desc: 'Two pipelines. Hospitals and bulk orders: Inquiry, Needs checked, Quote sent, Negotiation, Purchase order received, Delivered and installed. Clinics and retail: Inquiry, Quote sent, Paid, Delivered. Contacts tagged by product category and customer type.' },
  { id: 'automation', name: 'Automation Lab', phase: 1, desc: 'Instant WhatsApp reply and lead assignment. A friendly follow-up and a salesperson task when a quote gets no reply in 2 days. A manager alert when a deal is stuck. A thank-you message on delivery.' },
  { id: 'service', name: 'Service Lab', phase: 2, desc: 'Service and repair requests from the website logged as jobs. Maintenance and calibration reminders before each yearly service is due.' },
  { id: 'reputation', name: 'Reputation Lab', phase: 2, desc: 'A simple Google review request sent after delivery or installation.' },
  { id: 'insights', name: 'Insights Lab', phase: 2, desc: 'Owner dashboard: leads per week, where they came from, quotes sent, deals won, and response time per salesperson.' },
  { id: 'marketing', name: 'Marketing Lab', phase: 3, desc: 'WhatsApp and email campaigns for new stock, catalogues and offers to doctor, clinic and hospital lists (opted-in contacts only).' },
  { id: 'ads', name: 'Ads Lab', phase: 3, desc: 'Google and Meta (Facebook and Instagram) ad campaign management: setup, targeting, creatives, weekly optimisation and reporting. Leads from ads flow straight into the inbox and pipeline. Ad spend is paid separately by the client.' },
  { id: 'agent', name: 'Agent Lab', phase: 3, desc: 'AI assistant on WhatsApp and website chat that answers product questions from the knowledge base and hands over to a person.' },
];

export const ML_PHASES: Record<number, string> = {
  1: 'Step 1 · No inquiry goes unanswered',
  2: 'Step 2 · After-sales and trust',
  3: 'Step 3 · Grow repeat sales and ads',
};
export const ML_STATUS: Record<string, string> = {
  parallel: 'Offered alongside, under a separate agreement',
  later: 'To be added after the website launch',
  none: 'Not taken for now',
};

export const BASE_WEEKS = 6;
export const SITE = 'nooranisurgical.com';

export interface MinilabsState {
  status: string;
  labs: Record<string, boolean>;
  setup: Record<string, number | ''>;
  monthly: Record<string, number | ''>;
  onboard: number | '';
  seats: number;
  term: string;
  ref: string;
  sign: string;
  title: string;
}

export interface ContractState {
  pkg: string;
  items: Record<string, boolean>;
  tiers: Record<string, string>;
  prices: Record<string, number | null>;
  discount: number; tax: number; schedule: string; dueDays: number; revisions: string;
  /** `tier` is a package key, or 'auto' to follow the chosen package */
  ret: { on: boolean; tier: string; months: string };
  platform: string;
  cLegal: string; cSign: string; cTitle: string; pSign: string; pTitle: string;
  date: string; valid: number; ref: string; law: string;
  sections: Record<string, boolean>;
  notes: string;
  /** Which document is on screen: the Maxxlab agreement or the Minilabs order form */
  view: 'maxx' | 'ml';
  ml: MinilabsState;
  /** PNG data URLs */
  cSignature: string; pSignature: string; mlSignature: string;
}

export function applyPackage(s: ContractState, key: string): ContractState {
  const p = PACKAGES[key];
  const items: Record<string, boolean> = {};
  OPT.forEach(o => { items[o.id] = p.items.includes(o.id); });
  return { ...s, pkg: key, items, tiers: { ...p.tiers } };
}

export function defaultState(): ContractState {
  const base: ContractState = {
    pkg: 'growth', items: {}, tiers: {}, prices: {},
    discount: 0, tax: 0, schedule: '40-30-30', dueDays: 7, revisions: '3',
    ret: { on: true, tier: 'auto', months: '3' }, platform: 'discovery',
    cLegal: 'Noorani Surgical (Pvt) Ltd', cSign: '', cTitle: '', pSign: 'Rayyan', pTitle: 'Chief Executive Officer',
    date: '2026-09-28', valid: 21, ref: 'MXL-NS-2026-01', law: 'pk',
    sections: { compare: true, goals: true, platform: true, risks: true, terms: true, sources: true },
    notes: '', view: 'maxx',
    ml: {
      status: 'parallel',
      labs: { inbox: true, pipeline: true, automation: true, service: true, reputation: true, insights: true, marketing: true, ads: true, agent: false },
      setup: {}, monthly: {}, onboard: '', seats: 3, term: '6', ref: 'ML-NS-2026-01', sign: 'Usman Khan', title: 'Minilabs',
    },
    cSignature: '', pSignature: '', mlSignature: '',
  };
  return applyPackage(base, 'growth');
}

// ── money + dates ────────────────────────────────────────────────────────────
export const fmt = (n: number) => 'PKR ' + Math.round(n).toLocaleString('en-US');
export const num = (n: number) => Math.round(n).toLocaleString('en-US');
export const priceOf = (s: ContractState, it: CatalogueItem) =>
  s.prices[it.id] != null ? Number(s.prices[it.id]) : it.price;
export const tierPriceKey = (t: Tier, o: TierOption) => `${t.id}:${o.v}`;
export const tierPrice = (s: ContractState, t: Tier, o: TierOption) =>
  s.prices[tierPriceKey(t, o)] != null ? Number(s.prices[tierPriceKey(t, o)]) : o.price;

export function addDays(iso: string, d: number): Date {
  const x = new Date(iso + 'T12:00:00');
  if (isNaN(x.getTime())) return new Date();
  x.setDate(x.getDate() + Number(d || 0));
  return x;
}
export function longDate(d: string | Date): string {
  const x = d instanceof Date ? d : new Date(d + 'T12:00:00');
  if (isNaN(x.getTime())) return String(d);
  return x.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}

/** The retainer that applies: the explicit choice, else the package's own. */
export function retInfo(s: ContractState, pkgKey: string) {
  const k = s.ret.tier && s.ret.tier !== 'auto' ? s.ret.tier : (pkgKey === 'custom' ? 'growth' : pkgKey);
  const p = PACKAGES[k];
  return { key: k, name: p.name, fee: p.retainer, scope: p.retScope };
}

export function packageTotal(s: ContractState, key: string): number {
  const p = PACKAGES[key];
  let t = CORE.reduce((a, c) => a + priceOf(s, c), 0);
  OPT.forEach(o => { if (p.items.includes(o.id)) t += priceOf(s, o); });
  TIERS.forEach(tr => {
    const o = tr.opts.find(x => x.v === p.tiers[tr.id]);
    if (o) t += tierPrice(s, tr, o);
  });
  return t;
}

export function matchPackage(s: ContractState): string {
  for (const k of Object.keys(PACKAGES)) {
    const p = PACKAGES[k];
    const itemsOk = OPT.every(o => !!s.items[o.id] === p.items.includes(o.id));
    const tiersOk = TIERS.every(t => s.tiers[t.id] === p.tiers[t.id]);
    if (itemsOk && tiersOk) return k;
  }
  return 'custom';
}

export interface Line { id: string; name: string; price: number; desc: string; group: string; core?: boolean }
export interface Installment { pct: number; when: string; amt: number }
export interface Computed {
  lines: Line[]; subtotal: number; disc: number; tax: number; total: number;
  weeks: number; pkgKey: string; pkgName: string; inst: Installment[];
  support: string; validUntil: Date;
  ret: { key: string; name: string; fee: number; scope: string };
}

const SCHEDULE_LABELS: Record<string, string[]> = {
  '40-30-30': ['On signing, to begin work', 'On design approval and staging review', 'On launch acceptance'],
  '50-50': ['On signing, to begin work', 'On launch acceptance'],
  '30-40-30': ['On signing, to begin work', 'On staging site review', 'On launch acceptance'],
  '25-25-25-25': ['On signing, to begin work', 'On design approval', 'On staging site review', 'On launch acceptance'],
};

export function compute(s: ContractState): Computed {
  const lines: Line[] = [];
  CORE.forEach(c => lines.push({ id: c.id, name: c.name, price: priceOf(s, c), core: true, desc: c.desc, group: 'Core build' }));
  OPT.forEach(o => { if (s.items[o.id]) lines.push({ id: o.id, name: o.name, price: priceOf(s, o), desc: o.desc, group: o.group ?? 'Options' }); });

  let weeks = BASE_WEEKS + OPT.filter(o => s.items[o.id]).reduce((a, o) => a + (o.weeks ?? 0), 0);
  TIERS.forEach(t => {
    const o = t.opts.find(x => x.v === s.tiers[t.id]) ?? t.opts[0];
    weeks += o.weeks;
    if (o.v === 'none') return;
    const d = t.desc.replace('{n}', o.v).replace('{label}', o.label);
    lines.push({
      id: t.id, name: `${t.name} · ${o.label}`, price: tierPrice(s, t, o), desc: d,
      group: t.id === 'support' ? 'Launch and support' : (t.id === 'furniture' ? 'New revenue' : 'Content'),
    });
  });
  weeks = Math.ceil(weeks);

  const subtotal = lines.reduce((a, l) => a + l.price, 0);
  const disc = Math.round(subtotal * (Number(s.discount) || 0) / 100);
  const afterDisc = subtotal - disc;
  const tax = Math.round(afterDisc * (Number(s.tax) || 0) / 100);
  const total = afterDisc + tax;

  const pkgKey = matchPackage(s);
  const pkgName = pkgKey === 'custom' ? 'Custom' : PACKAGES[pkgKey].name;
  const pct = s.schedule.split('-').map(Number);
  const labels = SCHEDULE_LABELS[s.schedule] ?? SCHEDULE_LABELS['40-30-30'];
  let acc = 0;
  const inst: Installment[] = pct.map((p, i) => {
    const amt = i === pct.length - 1 ? total - acc : Math.round(total * p / 100 / 1000) * 1000;
    acc += amt;
    return { pct: p, when: labels[i], amt };
  });
  const support = TIERS[3].opts.find(o => o.v === s.tiers.support)?.label ?? '30 days';
  return { lines, subtotal, disc, tax, total, weeks, pkgKey, pkgName, inst, support, validUntil: addDays(s.date, s.valid), ret: retInfo(s, pkgKey) };
}

export function platformText(s: ContractState): string {
  if (s.platform === 'shopify') return 'We will build the store on Shopify. Shopify handles hosting, security and updates. Shopify Payments is not available in Pakistan, so JazzCash, Easypaisa and cards run through a third-party gateway, and Shopify adds its own fee on those payments (2% on Basic, 1% on Grow). B2B company accounts, net terms and quick order work on all plans, with up to three B2B catalogues below Shopify Plus.';
  if (s.platform === 'woo') return 'We will rebuild the store cleanly on WooCommerce with managed hosting. There is no platform fee and no extra fee on local gateway payments. Quotes, tier pricing, rentals and dealer roles are handled through plugins and custom work, with no catalogue limit. Maxxlab includes hosting updates during the support period.';
  return 'Both Shopify and WooCommerce can run a good store. We will present a scored comparison at the end of discovery and agree the platform with you in writing. Our starting view is that WooCommerce fits best if the quote, rental and dealer features are included, and Shopify fits best if retail simplicity is the priority.';
}

// ── document model, shared by the preview, the export and the email ──────────
export type Cell = string | { b: string } | { r: string };
export type Block =
  | { t: 'cover'; kicker: string; t1: string; t2: string; blurb: string; cells: [string, string][] }
  | { t: 'h'; n: string; text: string }
  | { t: 'h5'; text: string }
  | { t: 'p'; text: string; muted?: boolean }
  | { t: 'callout'; text: string }
  | { t: 'ul'; items: string[] }
  | { t: 'table'; head: Cell[]; widths?: number[]; rows: (Cell[] | { cls?: string; cells: Cell[] })[] }
  | { t: 'clauses'; items: [string, string][] }
  | { t: 'sig'; provider: string; pName: string; pTitle: string; providerSig: string }
  | { t: 'src'; items: string[] };

export interface DocModel { M: Block[]; meta: { title: string; footer: string } }

export function buildModel(s: ContractState): DocModel & { C: Computed } {
  const C = compute(s);
  const M: Block[] = [];
  let n = 0;
  const H = (t: string) => M.push({ t: 'h', n: String(++n).padStart(2, '0'), text: t });

  M.push({
    t: 'cover',
    kicker: `Phase 1 · Proposal and Service Agreement · ${s.ref}`,
    t1: 'More than a new website.',
    t2: 'A sales system for Noorani Surgical.',
    blurb: C.pkgKey === 'custom' ? "A custom package built around Noorani's priorities." : PACKAGES[C.pkgKey].blurb,
    cells: [['Client', s.cLegal], ['Provider', 'Maxxlab · maxxlab.tech'], ['Package', `${C.pkgName} · ${C.weeks} weeks`],
      ['Total', fmt(C.total)], ['Date', longDate(s.date)], ['Valid until', longDate(C.validUntil)]],
  });

  if (s.sections.compare) {
    H('Why this proposal looks different');
    M.push({ t: 'p', text: 'A new template makes a site look newer. It does not fix the reasons Noorani loses online sales today: hidden prices, no quote path for hospitals, no WhatsApp, and no rental or service offer. This proposal fixes the reasons.' });
    M.push({ t: 'table', head: ['Area', 'A template-only rebuild', 'This proposal'], widths: [22, 34, 44], rows: [
      [{ b: 'Starting point' }, 'Pick a theme, move the products over', 'Discovery week: team interviews, top products and customers, speed and SEO audit'],
      [{ b: 'Who the site serves' }, 'One general shop', 'Four paths: hospitals and government, clinics, home-care families, dealers'],
      [{ b: 'Pricing' }, '"Call before ordering" stays', 'A clear price policy with "price valid on" dates, and quotes for exchange-rate items'],
      [{ b: 'New revenue' }, 'None', 'Chosen from quotes, clinic accounts, rentals, AMC, dealers and marketplaces'],
      [{ b: 'After launch' }, 'A walkthrough', `Training, written guides, ${C.support} of support and measurable targets`],
    ] });
  }
  if (s.sections.goals) {
    H('Goals and how we will measure them');
    M.push({ t: 'ul', items: [
      `Turn ${SITE} from a catalogue into a real sales channel`,
      'Win more hospital, clinic and dealer business through faster, easier quotes',
      "Make Noorani's 1949 heritage and government approvals visible to every buyer",
      'Reduce the time sales staff spend on routine calls and price checks',
    ] });
    M.push({ t: 'p', text: 'We will report on qualified enquiries per month, quote-to-order rate, online revenue and average order value, active clinic, dealer, rental and AMC accounts, mobile page speed, and Google Maps views. Starting numbers are recorded in week one. Targets are agreed at the end of discovery, based on real data.' });
  }
  if (s.sections.platform) {
    H('Platform');
    M.push({ t: 'p', text: platformText(s) });
    M.push({ t: 'p', muted: true, text: `Whatever the platform, the store, the data and all accounts belong to ${s.cLegal}.` });
  }

  H('Scope of work');
  M.push({ t: 'p', text: `Maxxlab will deliver the following for the ${C.pkgName} package. Anything not listed here is out of scope and would be quoted separately.` });
  const groups: { name: string; rows: Line[] }[] = [];
  C.lines.forEach(l => {
    let g = groups.find(x => x.name === l.group);
    if (!g) { g = { name: l.group, rows: [] }; groups.push(g); }
    g.rows.push(l);
  });
  const scopeRows: Cell[][] = [];
  groups.forEach(g => g.rows.forEach((l, i) => scopeRows.push([
    i === 0 ? { b: g.name } : '', { b: l.name }, l.desc.replace('{rev}', s.revisions).replace('{site}', SITE),
  ])));
  M.push({ t: 'table', head: ['Area', 'Deliverable', 'What is included'], widths: [18, 26, 56], rows: scopeRows });
  const excluded = OPT.filter(o => !s.items[o.id]).map(o => o.name);
  if (excluded.length) M.push({ t: 'p', muted: true, text: `Not included in this agreement (available later as a change order): ${excluded.join(', ')}.` });
  if (s.notes && s.notes.trim()) M.push({ t: 'callout', text: `Special notes: ${s.notes.trim()}` });

  M.push({ t: 'h5', text: 'What Minilabs covers (separate agreement)' });
  if (s.ml.status === 'none') {
    M.push({ t: 'p', text: 'The client has chosen not to take Minilabs for now. Maxxlab will connect every lead to a free CRM instead. Minilabs can be added later without any rework to the website.' });
  } else {
    M.push({ t: 'p', text: `Noorani's sales system (shared inbox, sales pipelines, follow-up automations, service reminders, review requests, campaigns, Google and Meta ad management, and the owner dashboard) is provided by Minilabs under its own order form. Status: ${ML_STATUS[s.ml.status].toLowerCase()}. Maxxlab builds the website so that every form, quote request and WhatsApp click flows into Minilabs. The Minilabs software, setup and monthly fees are not part of this agreement or its fees.` });
  }

  H('Investment');
  const invRows: (Cell[] | { cls?: string; cells: Cell[] })[] = C.lines.map(l => [l.name, { r: num(l.price) }]);
  invRows.push({ cls: 'sub', cells: ['Subtotal', { r: num(C.subtotal) }] });
  if (C.disc) invRows.push({ cls: 'sub', cells: [`Discount (${s.discount}%)`, { r: '- ' + num(C.disc) }] });
  if (C.tax) invRows.push({ cls: 'sub', cells: [`Tax (${s.tax}%)`, { r: num(C.tax) }] });
  invRows.push({ cls: 'tot', cells: ['Total, one-time (PKR)' + (C.tax ? '' : ', excluding applicable taxes'), { r: num(C.total) }] });
  M.push({ t: 'table', head: ['Item', { r: 'PKR' }], widths: [78, 22], rows: invRows });

  if (s.ret.on) {
    M.push({ t: 'h5', text: 'Monthly retainer (fixed)' });
    M.push({ t: 'table', head: ['Retainer', 'What it covers', { r: 'PKR / month' }], widths: [20, 62, 18], rows: [
      [{ b: C.ret.name }, C.ret.scope, { r: num(C.ret.fee) }],
      { cls: 'sub', cells: ['Minimum term', `${s.ret.months} months, billed monthly in advance from launch`, { r: num(C.ret.fee * Number(s.ret.months)) + ' total' }] },
    ] });
  }

  H('Timeline and payments');
  const w = C.weeks;
  const rng = (a: number, b: number) => (a >= b ? String(a) : `${a}-${b}`);
  const b1 = Math.max(2, Math.round(w * 0.3));
  const b2 = Math.max(b1 + 1, Math.round(w * 0.7));
  M.push({ t: 'table', head: ['Weeks', 'Phase', 'What happens', 'Your sign-off'], widths: [12, 20, 42, 26], rows: [
    ['1', { b: 'Discovery' }, 'Workshop, interviews, audit, baseline numbers, platform decision, price policy', 'Discovery report and targets'],
    [rng(2, b1), { b: 'Brand and design' }, 'Brand guide, key page designs' + (s.items.photo ? ', photography day' : ''), `Design approval (${s.revisions} revision rounds)`],
    [rng(b1 + 1, b2), { b: 'Build and migration' }, 'Store build, migration, payments and selected modules', 'Staging site review'],
    [rng(b2 + 1, w - 1), { b: 'Automation, content, testing' }, 'Automation, product copy, device testing, staff training', 'Go-live approval'],
    [String(w), { b: 'Launch' }, `Go-live on ${SITE}, monitoring and first fixes`, 'Launch acceptance'],
  ] });
  M.push({ t: 'p', muted: true, text: `Estimated ${w} weeks from kickoff. Exact dates are fixed in the discovery report and start once the first payment and account access are received.` });
  M.push({ t: 'h5', text: 'Payment schedule' });
  const payRows: (Cell[] | { cls?: string; cells: Cell[] })[] = C.inst.map(i => [{ b: `${i.pct}%` }, i.when, { r: num(i.amt) }]);
  payRows.push({ cls: 'tot', cells: ['Total', '', { r: num(C.total) }] });
  M.push({ t: 'table', head: ['Share', 'When', { r: 'PKR' }], widths: [14, 60, 26], rows: payRows });
  M.push({ t: 'p', text: `Invoices are due within ${s.dueDays} days, by bank transfer to the account named on the invoice.` });
  M.push({ t: 'h5', text: `Third-party costs, paid directly by ${s.cLegal}` });
  const tp: string[] = [];
  if (s.platform === 'shopify') tp.push("Shopify plan (from $29 to $79 USD a month billed yearly) and paid apps, plus Shopify's fee on third-party gateway payments");
  else if (s.platform === 'woo') tp.push('Managed hosting and any paid plugins');
  else tp.push('Platform or hosting fees and any paid apps or plugins, confirmed after the platform decision');
  tp.push('Payment gateway fees and domain renewal');
  if (s.items.ai) tp.push('WhatsApp Business API messaging fees charged by Meta or its provider');
  if (s.items.daraz) tp.push('Daraz commissions and fees');
  if (s.ml.status !== 'none') tp.push('Minilabs subscription and setup, under the separate Minilabs order form');
  tp.push('Courier charges');
  M.push({ t: 'ul', items: tp });

  H('Working together');
  M.push({ t: 'table', head: ['Maxxlab will', `${s.cLegal} will`], widths: [50, 50], rows: [
    ['Name a project lead as your single point of contact', 'Name one decision-maker who can approve work'],
    ['Send a written update every week and hold a call every two weeks', 'Provide site, hosting, domain, social and payment account access within 5 working days'],
    ['Share a staging site before launch', 'Provide product data, prices, warranty terms and DRAP enlistment or registration details'],
    ['Keep all logins in a password vault owned by the client', 'Give feedback on each deliverable within 5 working days'],
    ['Flag any risk to the launch date early, in writing', 'Open merchant accounts with payment gateways and couriers'],
  ] });
  if (s.sections.risks) {
    M.push({ t: 'h5', text: 'Key risks and how we handle them' });
    M.push({ t: 'table', head: ['Risk', 'How we reduce it'], widths: [32, 68], rows: [
      [{ b: 'Product data incomplete' }, 'A simple spreadsheet template in week one; top-selling items first.'],
      [{ b: 'Prices move with the exchange rate' }, 'Agreed price policy, "valid on" dates and quote-only items' + (s.items.pricing ? ', plus the approval-based price helper.' : '.')],
      [{ b: 'Search rankings dip after launch' }, '301 redirects for every old URL and daily Search Console checks for two weeks.'],
      [{ b: 'Gateway approval takes time' }, 'Applications start in week one; COD and bank transfer go live first if needed.'],
      [{ b: 'Regulatory questions' }, 'Only products confirmed as DRAP enlisted or registered are listed. Regulatory responsibility stays with the client.'],
    ] });
  }

  if (s.sections.terms) {
    H('Terms and conditions');
    const law = s.law === 'on'
      ? 'the laws of the Province of Ontario, Canada, and the courts of Ontario will have jurisdiction'
      : 'the laws of Pakistan, and the courts at Lahore will have jurisdiction';
    M.push({ t: 'clauses', items: [
      ['Scope and changes', 'Maxxlab will deliver the items in the scope section. New requests are quoted in writing as change orders and are binding only when both parties approve them in writing, including by email.'],
      ['Revisions', `Design includes up to ${s.revisions} rounds of revisions and content includes two. Further rounds are billed at PKR 6,000 per hour, with an estimate first.`],
      ['Timeline', 'Timelines start once the first payment and access are received. Delays in client feedback, access or data move the launch date by the same amount. Maxxlab is not responsible for delays caused by third-party platforms, gateways or Meta approvals.'],
      ['Acceptance', 'Each milestone is accepted when the client approves it in writing, or 5 working days after delivery if no specific in-scope issues are raised.'],
      ['Ownership', 'On full payment, the client owns the website design, content, product data, brand files and all project accounts. Third-party software stays under its own licence. Maxxlab keeps its general know-how and reusable internal tools, and may show the project in its portfolio unless asked not to in writing.'],
      ['Confidentiality', "Both parties keep each other's business information, prices, customer data and logins confidential during the project and for three years after."],
      ['Data protection', 'Maxxlab uses customer data only to deliver this project, stores logins in a secure vault, and removes its access on request after handover.'],
      ['Warranty and support', `Maxxlab fixes bugs in its own work at no charge for ${C.support} after launch. This excludes changes made by others, third-party outages and new features.`],
      ['Payments', 'Fees and schedule are as set out above. Work may pause if an invoice is more than 14 days overdue, and the timeline moves accordingly.' + (s.ret.on ? " The retainer is billed monthly in advance for the minimum term, then continues month to month until either party gives 30 days' notice." : '')],
      ['Liability', "Each party's total liability is limited to the fees paid under this agreement. Neither party is liable for indirect or lost-profit losses. Product claims, pricing and regulatory compliance of listed items remain the client's responsibility."],
      ['Ending the agreement', "Either party may end this agreement with 14 days' written notice. The client pays for work completed to that date and Maxxlab hands over all completed work and access. Deposits cover work already started and are not refundable."],
      ['Related Minilabs services', "Minilabs services are covered only by a separate Minilabs order form. The two agreements are independent: either can be signed, changed or ended without changing the scope or fees of the other. Maxxlab's work ends at connecting the website to the client's CRM."],
      ['Disputes and governing law', `The parties will first try to settle any dispute through discussion between senior contacts within 30 days. This agreement is governed by ${law}.`],
    ] });
  }

  H('Acceptance');
  M.push({ t: 'p', text: `This proposal is valid until ${longDate(C.validUntil)}. By signing, both parties agree to the ${C.pkgName} package as set out above, a total of ${fmt(C.total)}${C.tax ? '' : ' (excluding applicable taxes)'}${s.ret.on ? `, plus the ${C.ret.name} retainer at ${fmt(C.ret.fee)} per month for at least ${s.ret.months} months` : ''}.` });
  M.push({ t: 'sig', provider: 'Maxxlab', pName: s.pSign, pTitle: s.pTitle, providerSig: s.pSignature });

  if (s.sections.sources) {
    M.push({ t: 'h5', text: 'Sources' });
    M.push({ t: 'src', items: [
      'Shopify pricing: https://www.shopify.com/pricing',
      'Shopify B2B vs Plus (BizSpice, 2026): https://www.bizspice.com/blogs/shopify-b2b-vs-plus/',
      'Payments in Pakistan without Shopify Payments (UnumPay): https://www.unumpay.com/blog/how-to-accept-payments-in-pakistan-without-shopify-payments/',
      'Gartner, B2B buyers and rep-free buying (Mar 2026): https://www.gartner.com/en/newsroom/press-releases/2026-03-09-gartner-sales-survey-finds-67-percent-of-b2b-buyers-prefer-a-rep-free-experience',
      'Noorani Surgical About page: https://nooranisurgical.com/about/',
      'DRAP Medical Devices Rules 2017: https://www.dra.gov.pk/wp-content/uploads/2022/02/FFMedicalDevicesRules2017Notifiedon16-01-2018-1.pdf',
    ] });
  }
  return { M, C, meta: { title: `Noorani Surgical, Proposal and Service Agreement (${C.pkgName})`, footer: `MAXXLAB · NOORANI SURGICAL · ${s.ref}` } };
}

// ── Minilabs order form ──────────────────────────────────────────────────────
export const mlNum = (v: number | '' | null | undefined): number | null =>
  v === '' || v == null || isNaN(Number(v)) ? null : Number(v);

export interface ComputedML { labs: Lab[]; setup: number; monthly: number; tbc: boolean; validUntil: Date }

export function computeML(s: ContractState): ComputedML {
  const labs = LABS.filter(l => s.ml.labs[l.id]);
  let setup = 0, monthly = 0, tbc = false;
  labs.forEach(l => {
    const a = mlNum(s.ml.setup[l.id]);
    const b = mlNum(s.ml.monthly[l.id]);
    if (a == null || b == null) tbc = true;
    setup += a ?? 0;
    monthly += b ?? 0;
  });
  const ob = mlNum(s.ml.onboard);
  if (ob == null) tbc = true;
  setup += ob ?? 0;
  return { labs, setup, monthly, tbc, validUntil: addDays(s.date, s.valid) };
}

export function buildMinilabsModel(s: ContractState): DocModel & { X: ComputedML } {
  const X = computeML(s);
  const M: Block[] = [];
  let n = 0;
  const H = (t: string) => M.push({ t: 'h', n: String(++n).padStart(2, '0'), text: t });
  const money = (v: number | '' | undefined) => { const x = mlNum(v); return x == null ? 'After Phase 1' : num(x); };

  M.push({
    t: 'cover',
    kicker: `Phase 2 · Minilabs Order Form · ${s.ml.ref}`,
    t1: 'Every inquiry answered.',
    t2: 'Every follow-up done.',
    blurb: "One system for Noorani Surgical's leads, customers, messages and follow-ups, working alongside the new website built by Maxxlab.",
    cells: [['Client', s.cLegal], ['Provider', 'Minilabs · minilabs.ca'], ['Labs', `${X.labs.length} selected`],
      ['Setup', X.tbc ? 'Visible after Phase 1' : fmt(X.setup)], ['Monthly', X.tbc ? 'Visible after Phase 1' : fmt(X.monthly)],
      ['Valid until', longDate(X.validUntil)]],
  });

  H('What Minilabs does for Noorani');
  M.push({ t: 'p', text: "Noorani Surgical has 77 years of trust, hospital clients across Pakistan and a wide product range. Today, an inquiry that is not answered or followed up is simply lost, and nobody can see it. Minilabs gives the sales team one screen for every lead, message and follow-up." });
  M.push({ t: 'table', head: ['', 'Today', 'With Minilabs'], widths: [20, 38, 42], rows: [
    [{ b: 'New inquiry' }, 'Depends on someone picking up the phone', 'Logged, assigned and answered on WhatsApp within minutes'],
    [{ b: 'Quote sent' }, 'No reminder if the buyer goes quiet', 'Automatic follow-up after 2 days, plus a task for the salesperson'],
    [{ b: 'After delivery' }, 'No review, no service reminder', 'Review request, and a reminder before the yearly service'],
    [{ b: "Owner's view" }, 'No record of who asked, who replied or what was won', 'Leads, sources, quotes, wins and response times on one dashboard'],
  ] });

  H('How Minilabs works with the Maxxlab website');
  M.push({ t: 'p', text: 'The work is split so that nothing is paid for twice. Maxxlab builds the website and everything a buyer sees. Minilabs runs the sales system behind it.' });
  M.push({ t: 'table', head: ['Area', 'Maxxlab (website agreement)', 'Minilabs (this order form)'], widths: [18, 41, 41], rows: [
    [{ b: 'Website and store' }, 'Design, build, catalogue, payments', 'Not included'],
    [{ b: 'Quote requests' }, 'Quote cart and GST-ready PDF quotations', 'Pipeline tracking and automatic follow-ups'],
    [{ b: 'WhatsApp' }, 'Business profile, catalogue, buttons on every page', 'Shared inbox, API connection, automatic replies'],
    [{ b: 'AI assistant' }, 'Knowledge base and reply scripts', 'Runs the assistant (Agent Lab)'],
    [{ b: 'Service and AMC' }, 'AMC offer pages and booking form', 'Job tracking and maintenance reminders'],
    [{ b: 'Reviews' }, 'Google Business Profile setup', 'Review requests after delivery'],
    [{ b: 'Campaigns' }, 'Campaign content (in the retainer)', 'Contact lists and sending'],
    [{ b: 'Ads (Google and Meta)' }, 'Landing pages and tracking (GA4, Meta pixel)', 'Campaign management (Ads Lab)'],
    [{ b: 'Reporting' }, 'Website and channel dashboard', 'Owner sales dashboard'],
  ] });
  if (s.ml.status === 'later') M.push({ t: 'callout', text: 'Minilabs is planned to start after the website launch. The website is built ready to connect, so no rework is needed.' });

  H('Labs and fees');
  const rows: (Cell[] | { cls?: string; cells: Cell[] })[] = X.labs.map(l =>
    [{ b: l.name }, l.desc, { r: money(s.ml.setup[l.id]) }, { r: money(s.ml.monthly[l.id]) }]);
  rows.push([{ b: 'Onboarding and training' }, `Account setup, import of existing contacts, ${s.ml.seats} user logins, a short training session and a simple how-to guide.`, { r: money(s.ml.onboard) }, { r: '-' }]);
  rows.push({ cls: 'tot', cells: ['Total', '', { r: X.tbc ? 'After Phase 1' : num(X.setup) }, { r: X.tbc ? 'After Phase 1' : num(X.monthly) }] });
  M.push({ t: 'table', head: ['Lab', 'What is set up', { r: 'Setup PKR' }, { r: 'Monthly PKR' }], widths: [17, 53, 15, 15], rows });
  const off = LABS.filter(l => !s.ml.labs[l.id]).map(l => l.name);
  if (off.length) M.push({ t: 'p', muted: true, text: `Available to add later: ${off.join(', ')}.` });
  if (X.tbc) M.push({ t: 'callout', text: 'Charges are visible once Phase 1 with Maxxlab is completed. The fees will be agreed in writing before this order form is signed.' });

  H('Phase 2 rollout in three steps');
  M.push({ t: 'table', head: ['Step', 'Labs'], widths: [40, 60], rows: ([1, 2, 3] as const).map(k =>
    [{ b: ML_PHASES[k] }, X.labs.filter(l => l.phase === k).map(l => l.name).join(', ') || 'Nothing selected']) });
  M.push({ t: 'p', text: 'Minilabs is Phase 2. It starts once Phase 1 (the Maxxlab website) is complete. Step 1 brings the biggest win on its own: no inquiry goes unanswered. Each later step builds on it, and Noorani can pause between steps.' });

  H('Billing');
  M.push({ t: 'ul', items: [
    'Setup fees are invoiced on signing.',
    'Monthly fees are billed in advance from the day Step 1 goes live.',
    `Minimum term: ${s.ml.term} months, then month to month with 30 days' written notice.`,
    `${s.ml.seats} user logins are included. Extra logins are quoted separately.`,
    "Paid directly by the client: WhatsApp Business API add-on, Meta's per-conversation fees, and Google and Meta ad spend.",
  ] });

  H('Things to confirm together');
  M.push({ t: 'ul', items: [
    "Payments: Minilabs' built-in payments mainly work through Stripe, which is not available in Pakistan. Online payments (JazzCash, Easypaisa, cards) stay on the website store, or orders are paid offline.",
    'WhatsApp: needs a WhatsApp Business number linked to Minilabs, with a small monthly add-on and per-conversation fees from Meta.',
    'Tenders: government tenders still go through official procurement portals. Minilabs tracks those deals and deadlines but does not replace the tender process.',
    'Team: how many salespeople will use it, and who handles hospital and retail inquiries.',
    'Contacts: an export of existing customer and hospital contacts for import.',
  ] });

  if (s.sections.terms) {
    H('Service terms');
    const law = s.law === 'on' ? 'the laws of the Province of Ontario, Canada' : 'the laws of Pakistan, with the courts at Lahore having jurisdiction';
    M.push({ t: 'clauses', items: [
      ['Subscription', 'Minilabs provides the Labs selected above as a hosted service for the minimum term and then month to month. Features may improve over time; nothing selected here will be removed during the term without notice.'],
      ['Your data', 'The client owns its contacts, messages and deal records. On request, and within 14 days after the service ends, Minilabs provides an export of that data.'],
      ['Messaging rules', "Campaigns go only to contacts who have agreed to hear from Noorani. WhatsApp use follows Meta's business messaging policies."],
      ['Support', "Support is available during business hours in Pakistan and Canada. Outages of third-party channels (WhatsApp, Meta, email providers) are outside Minilabs' control."],
      ['Relationship to the Maxxlab agreement', 'This order form is separate from the Maxxlab website agreement. Either can be signed, changed or ended without changing the scope or fees of the other.'],
      ['Price changes', "Monthly fees are fixed for the minimum term. After that, any change needs 30 days' written notice."],
      ['Confidentiality', "Both parties keep each other's business information and customer data confidential."],
      ['Liability', "Each party's total liability is limited to the fees paid under this order form in the previous three months."],
      ['Governing law', `This order form is governed by ${law}.`],
    ] });
  }

  H('Acceptance');
  M.push({ t: 'p', text: `This order form is valid until ${longDate(X.validUntil)}. By signing, both parties agree to the Labs, fees and terms set out above.` });
  M.push({ t: 'sig', provider: 'Minilabs', pName: s.ml.sign, pTitle: s.ml.title, providerSig: s.mlSignature });

  return { M, X, meta: { title: 'Noorani Surgical, Minilabs Order Form', footer: `MINILABS · NOORANI SURGICAL · ${s.ml.ref}` } };
}

/** Plain-text summary for the clipboard, for whichever document is on screen. */
export function summaryText(s: ContractState): string {
  if (s.view === 'ml') {
    const X = computeML(s);
    return [
      `Noorani Surgical, Minilabs order form (${s.ml.ref})`,
      `Labs: ${X.labs.map(l => l.name).join(', ')}`,
      X.tbc ? 'Charges are visible once Phase 1 with Maxxlab is completed.' : `Setup: ${fmt(X.setup)} · Monthly: ${fmt(X.monthly)}`,
      `Minimum term: ${s.ml.term} months · ${s.ml.seats} logins`,
      `Valid until ${longDate(X.validUntil)}`,
    ].join('\n');
  }
  const C = compute(s);
  return [
    `Noorani Surgical, Maxxlab proposal (${s.ref})`,
    `Package: ${C.pkgName} · ${C.weeks} weeks`,
    `Total: ${fmt(C.total)}${C.tax ? '' : ' (excl. taxes)'}`,
    `Includes: ${C.lines.filter(l => !CORE.find(c => c.id === l.id)).map(l => l.name).join('; ')}`,
    `Payments: ${C.inst.map(i => `${i.pct}% ${fmt(i.amt)}`).join(' / ')}`,
    s.ret.on ? `Retainer: ${fmt(C.ret.fee)}/month (${C.ret.name}), min ${s.ret.months} months` : '',
    `Valid until ${longDate(C.validUntil)}`,
  ].filter(Boolean).join('\n');
}
