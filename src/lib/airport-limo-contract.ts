// ── Airport Limo Toronto · proposal and service agreement ────────────────────
// One document, two commercial shapes: with the Minilabs Booking System (the
// bundle) or website + Website Growth only. Prices, copy and the totals logic
// live here, free of React, so the page, the submission record and the email
// all report the same numbers.

export const REF = 'MXL-ALT-2026-01';
export const CLIENT = 'Airport Limo Toronto';
export const PROVIDER = 'Maxxlab · Minilabs';
export const PROPOSAL_DATE = '2026-10-01';
export const VALID_UNTIL = '2026-10-22';
export const CONTACT = { name: 'Usman Khan', phone: '+1 437 981 9816', email: 'admin@maxxlab.tech' };

/** All amounts in CAD. */
export const PRICE = {
  build: 2200,
  growthBundle: 170,
  growthRegular: 340,
  minilabsLaunch: 79,
  minilabsRegular: 329,
  minilabsSetup: 549,
  /** Months billed at the launch rate, and the minimum term. */
  launchMonths: 3,
} as const;

export const cad = (n: number) => '$' + Math.round(n).toLocaleString('en-CA');
export const mo = (n: number) => `${cad(n)}/mo`;

export function longDate(d: string | Date): string {
  const date = typeof d === 'string' ? new Date(`${d}T12:00:00`) : d;
  return date.toLocaleDateString('en-CA', { day: 'numeric', month: 'long', year: 'numeric' });
}

export interface ContractState {
  /** Include part C, the Minilabs Booking System */
  minilabs: boolean;
  cSign: string;
  cTitle: string;
  cDate: string;
  cSignature: string;
  pSign: string;
  pTitle: string;
  pDate: string;
  pSignature: string;
}

export function defaultState(): ContractState {
  return {
    minilabs: true,
    cSign: '', cTitle: 'Owner', cDate: '', cSignature: '',
    pSign: '', pTitle: '', pDate: '', pSignature: '',
  };
}

export interface Computed {
  oneTime: number;
  /** Monthly total for months 1 to 3 */
  launch: number;
  /** Monthly total from month 4 */
  after: number;
  deposit: number;
  monthlyText: string;
}

export function compute(s: ContractState): Computed {
  // Website Growth stays at the bundle price for as long as Minilabs is taken;
  // on its own it is half price for the launch months only.
  const launch = PRICE.growthBundle + (s.minilabs ? PRICE.minilabsLaunch : 0);
  const after = s.minilabs ? PRICE.growthBundle + PRICE.minilabsRegular : PRICE.growthRegular;
  return {
    oneTime: PRICE.build,
    launch,
    after,
    deposit: PRICE.build / 2,
    monthlyText: s.minilabs
      ? `Website Growth + Minilabs: ${mo(launch)} for months 1 to 3, then ${mo(after)}`
      : `Website Growth: ${mo(launch)} for months 1 to 3, then ${mo(after)}`,
  };
}

// ── document content ─────────────────────────────────────────────────────────
export const SECTIONS = [
  { id: 'overview', n: '01', title: 'What you get' },
  { id: 'scope', n: '02', title: 'Scope of work' },
  { id: 'investment', n: '03', title: 'Investment' },
  { id: 'payments', n: '04', title: 'Payments' },
  { id: 'timeline', n: '05', title: 'Timeline' },
  { id: 'together', n: '06', title: 'Working together' },
  { id: 'terms', n: '07', title: 'Terms' },
  { id: 'acceptance', n: '08', title: 'Acceptance' },
] as const;

export const WEBSITE_SCOPE: [string, string][] = [
  ['Discovery and keyword plan', 'Kickoff call. We record your starting numbers (rankings, speed, calls, bookings) and agree a list of about 15 to 20 searches you want to win.'],
  ['Fresh, modern design', 'New premium look built for phones first: real fleet photos, clean logo treatment, your 4.9★ Google rating and reviews near the top. Pages: home, fleet, flat rates, airports (Pearson, Billy Bishop, Hamilton, Buffalo), services, corporate, weddings and events, Niagara tours, FAQ, about, contact. Up to 3 rounds of design changes.'],
  ['Speed', 'Fast hosting setup, compressed images and clean code. Target: under 2 to 3 seconds on a phone (today 7.6 s).'],
  ['All current errors fixed', 'Stray "?" heading, broken sentences, placeholder service cards, phone number format, page descriptions, "page not found" handling, blocked zoom on phones, business details for Google.'],
  ['5 new keyword pages', 'New area and airport pages chosen from the keyword plan (for example Mississauga, Brampton, Markham, Vaughan, wedding limo). Existing city pages and blog moved over and improved, with redirects so current rankings are kept.'],
  ['Clear flat-rate prices', 'Flat rates for your main routes shown clearly on the site (you supply the rates).'],
  ['Safe booking form', 'Pickup and drop-off, date and time, flight number, passengers, luggage, car seat, vehicle, return flight details and a "text me about my return pickup" checkbox. No card details on the website. Payment is taken through a secure Square link after you confirm the ride.'],
  ['One-tap contact', 'Call, text and WhatsApp buttons on every page, plus website chat.'],
  ['Tracking', 'Google Analytics, Search Console and Google Ads conversion tracking. Every call tap, form, text and WhatsApp tap tracked by source.'],
  ['Google profile and listings', 'Google Business Profile tuned (categories, services, service areas, photos, address typo fixed). Facebook and key directory listings corrected so your details match everywhere.'],
  ['Launch and support', 'Testing on phones and computers, go-live, a short training session, and 90 days of free bug fixes on our work.'],
];

export const GROWTH_SCOPE: string[] = [
  'Keyword plan: we keep the agreed list of searches up to date and pick the next targets with you',
  '2 new service-area pages or guides a month, each built for one keyword',
  'Google Business Profile: weekly posts and photos, profile upkeep',
  'Technical upkeep: speed, fixes, backups, hosting support, small edits',
  'Monthly report: rankings for the agreed keywords, calls, forms and WhatsApp taps by source, site speed, work done',
];

export const MINILABS_SCOPE: [string, string][] = [
  ['One inbox', 'Calls, texts, WhatsApp, website chat, Facebook, Google messages and email in one app on your phone.'],
  ['Missed-call text back', "Anyone who can't reach you gets a text right away, so the job isn't lost. Your phone number stays the same."],
  ['Automatic customer texts', 'Instant reply to every booking request (even at 3 am), confirmation with your Square payment link, reminder the day before, "your driver is on the way", and a thank-you after the ride.'],
  ['Booking board', 'New request → Quoted → Booked → Completed, plus "No car available → passed to partner" so turned-away jobs are tracked.'],
  ['Reviews', 'A review request after each ride and quick replies to every review, starting with the open 1-star.'],
  ['Return trips and repeat customers', '"Want us to pick you up?" message before a customer\'s return flight, plus offers to past customers (Niagara season, weddings, holidays). Only to customers who agreed to hear from you.'],
  ['Owner dashboard', 'Requests per week, where they came from, bookings and response time.'],
  ['Setup and training', 'Account setup, customer list import, phone app setup, texting registration and a short training session.'],
];

export const LATER: string[] = [
  'Instant fare calculator on the website (type an address, see the price)',
  'AI assistant that answers quote questions after hours',
  'Google Ads management, once tracking shows which ads bring bookings',
];

/** `ml` marks text that only applies when the booking system is included. */
export const TIMELINE: { when: string; what: string; ml?: string; you: string }[] = [
  { when: 'Week 1', what: 'Kickoff, starting numbers, keyword plan', you: 'Share logins, flat rates and fleet photos' },
  { when: 'Weeks 2 to 3', what: 'Design of the new website', you: 'Review and give feedback' },
  { when: 'Weeks 4 to 5', what: 'Build, new pages, booking form, tracking, Google profile and listings clean-up', you: 'Check the preview site' },
  { when: 'Week 6', what: 'Launch.', ml: 'Minilabs Booking System goes live.', you: 'Short training on your phone' },
  { when: 'Every month', what: 'Website Growth work and your monthly report', you: 'Read the report, tell us what you need' },
];

export const TOGETHER: { we: string; you: string; mlOnly?: boolean }[] = [
  { we: 'Be your single point of contact and update you every week during the build', you: 'Share website, domain, Google Business Profile (manager invite), Google Ads, Analytics and Facebook access within 5 working days' },
  { we: 'Show you a preview before anything goes live', you: 'Send flat rates, fleet photos, licence and insurance details' },
  { we: 'Keep your logins safe and use them only for this work', you: 'Give feedback within 5 working days' },
  { we: "Tell you straight away if something isn't helping your business", you: 'Share your past customer list for import', mlOnly: true },
];

export const TERMS: [string, string][] = [
  ['Scope and changes', 'We deliver what is listed in this agreement. Anything new is quoted in writing first and only goes ahead once both sides agree, including by email.'],
  ['Results', 'We promise the work and monthly reporting. Google decides rankings, so no specific position or number of bookings is guaranteed.'],
  ['Design changes', 'Up to 3 rounds of design changes are included. Extra rounds are quoted first.'],
  ['Approval', 'Each stage is approved when you confirm in writing, or 5 working days after we deliver it if no in-scope issues are raised.'],
  ['Payments', 'Invoices are due within 7 days. Work may pause if a payment is more than 14 days late.'],
  ['Monthly plans', 'Monthly fees are billed in advance. The launch rate applies for the first 3 months, then the regular monthly price applies. After the 3-month minimum, plans continue month to month until either side gives 30 days\' written notice. The Website Growth plan and the Minilabs Booking System can each be stopped separately. Website Growth is $170/mo while it is bundled with the Minilabs Booking System; on its own it is $170/mo for the first 3 months and $340/mo after that.'],
  ['Ownership', 'Once the build is paid in full, you own your website design, content, domain, photos and all your accounts. The Minilabs software is provided as a service; your contacts, messages and booking records are yours, and we give you an export within 14 days if the service ends.'],
  ['Messages to customers', "Marketing messages are only sent to customers who agreed to hear from you, as Canada's anti-spam law requires. Booking confirmations and reminders are sent as part of the service."],
  ['Payments from your customers', 'Customer card payments go through your own Square account. We never collect or store customer card details.'],
  ['Support', 'We fix bugs in our own work free for 90 days after launch. This does not cover changes made by others or outages of third-party services (Google, Square, phone carriers, WhatsApp).'],
  ['Confidentiality', "Both sides keep each other's business information, customer data and logins private, during this agreement and for 3 years after."],
  ['Liability', "Each side's total liability is limited to the fees paid under this agreement in the previous 3 months. Neither side is liable for lost profits or indirect losses."],
  ['Ending the agreement', "Either side can end this agreement with 14 days' written notice during the build. You pay for work done up to that date, and we hand over everything completed. The first payment covers work already started and is not refundable."],
  ['Governing law', 'This agreement is governed by the laws of Ontario, Canada.'],
];

/** Plain-text summary for the "Copy summary" button and the submission record. */
export function summaryText(s: ContractState): string {
  const C = compute(s);
  return [
    `${CLIENT} · Proposal and Service Agreement · ${REF}`,
    `Plan: ${s.minilabs ? 'Website + Website Growth + Minilabs Booking System' : 'Website + Website Growth (no Minilabs)'}`,
    `One-time: ${cad(C.oneTime)} (50% on signing, 50% at launch)`,
    `Monthly, months 1 to 3: ${mo(C.launch)}`,
    `Monthly, from month 4: ${mo(C.after)}`,
    `Minimum term: ${PRICE.launchMonths} months, then month to month (30 days' notice)`,
    `Valid until: ${longDate(VALID_UNTIL)}`,
  ].join('\n');
}
