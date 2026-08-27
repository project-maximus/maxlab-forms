import type { FormConfig, FormField, FieldOption } from '@/lib/types';

// ── G.O.A.T Kitchen & Meats · first discovery ────────────────────────────────
// Filled live during the meeting. Every choice question carries a free-text
// note, because the interviewee's own wording is usually the useful part.
// The fit score, blockers, scope flags and recommended layers are computed from
// these answers in lib/goat-discovery-scoring and land in the admin email.

const NOTE = { placeholder: 'In her words, whatever the options miss' } as const;

/** Choice question with the standard note companion attached. */
function q(
  id: string,
  label: string,
  options: string[],
  extra: Partial<FormField> = {},
): FormField {
  return {
    id,
    type: 'radio',
    layout: 'list',
    label,
    options: options.map<FieldOption>(o => ({ value: o, label: o })),
    note: NOTE,
    ...extra,
  };
}

/** Multi-select question with the same note companion. */
function multi(
  id: string,
  label: string,
  options: string[],
  extra: Partial<FormField> = {},
): FormField {
  return {
    id,
    type: 'checkboxgroup',
    layout: 'list',
    label,
    options: options.map<FieldOption>(o => ({ value: o, label: o })),
    note: NOTE,
    ...extra,
  };
}

const goatDiscovery: FormConfig = {
  id: 'goat-discovery',
  slug: 'goat-discovery',
  title: 'G.O.A.T Discovery Intake · Kitchen & Meats',
  heroAccent: 'Intake',
  eyebrow: 'Maxxlab · Discovery intake · In person · ~25 min',
  description:
    'Tap answers during the meeting. Everything is a tap or one line, and every question has a note field for whatever the options miss. Answers save on this device as you go.',
  client: 'G.O.A.T Kitchen & Meats',
  layout: 'steps',
  footerNote: 'Questions? Contact: admin@maxxlab.tech',
  sections: [
    // ── 01 · The business today ───────────────────────────────────────────
    {
      id: 'business',
      num: '01',
      title: 'The business today',
      description:
        'Feeds the sizing of every layer. Rough bands are fine, we verify against system exports later.',
      fields: [
        q('sites', 'Locations running right now', ['1', '2', '3', '3 + one closed', '4+']),
        q('orders', 'Orders per day, all channels, all sites', [
          '< 50', '50-150', '150-300', '300+', 'Honestly not sure',
        ]),
        multi('mix', 'Revenue engines', [
          'Takeaway / walk-in', 'Catering & events', 'Restaurant meat supply (B2B)',
          'Business meal programs', 'Marketplace delivery', 'Fresh meat counter',
        ], { hint: 'Tap all that apply.' }),
        q('catwk', 'Catering events in a typical week', ['0-2', '3-5', '6-10', '10+']),
        q('b2bn', 'Restaurants / businesses you supply on repeat', ['None', '1-3', '4-8', '9+']),
        q('team', 'Total team across sites', ['< 10', '10-20', '21-40', '40+']),
        multi('peak', 'Busiest stretches of the year', [
          'Ramadan / Eid', 'Wedding season (May-Sep)', 'Summer BBQ / parks',
          'Diwali', 'December holidays', 'Steady all year',
        ], {
          maxSelect: 3,
          hint: 'Pick up to 3, and note any hard date. This sets the rollout calendar: we pilot before a peak and freeze cutovers during one.',
        }),
      ],
    },

    // ── 02 · Systems in use ───────────────────────────────────────────────
    {
      id: 'systems',
      num: '02',
      title: 'Systems in use',
      description:
        'Feeds L0 and the integration map. This decides what we connect versus replace. "None / paper" is a perfectly good answer, it just means we start cleaner.',
      fields: [
        q('pos', 'POS at the counter', [
          'Square', 'Toast', 'Lightspeed', 'Clover', 'TouchBistro', 'Cash register / none', 'Other',
        ], {
          hint: 'Square, Toast, Lightspeed and Clover all have solid APIs, so we connect directly with no re-keying.',
          note: { placeholder: 'Which one?', openWhen: 'Other' },
        }),
        q('possame', 'Same POS at every site?', ['Yes', 'No / mixed', 'N/A']),
        q('poshist', 'How far back does usable sales data go?', [
          '2+ years', 'About a year', '6 months', 'Just started', 'No idea',
        ], {
          hint: 'Forecasting needs history. Under 6 months means we forecast on thinner ground and lean on catering bookings first.',
        }),
        multi('mkt', 'Delivery marketplaces live', ['Uber Eats', 'DoorDash', 'SkipTheDishes', 'None']),
        multi('catin', 'How catering enquiries arrive', [
          'Phone call', 'Website form', 'WhatsApp', 'Instagram DM', 'Email', 'Walk-in',
        ], { hint: 'Tap all that apply.' }),
        q('sched', 'Staff scheduling done with', [
          '7shifts', 'Homebase', 'WhatsApp + spreadsheet', 'Paper / verbal', 'Other',
        ], { note: { placeholder: 'Which one?', openWhen: 'Other' } }),
        q('inv', 'Inventory tracked in', [
          'Software', 'Spreadsheet', 'Counts on paper', 'In our heads',
        ], { hint: 'The bigger the gap, the bigger the win from Layer 3.' }),
        q('acct', 'Accounting / invoicing', [
          'QuickBooks', 'Wave', 'Xero', 'Accountant handles it', 'Manual invoices',
        ]),
        q('temp', 'Fridge / freezer temperature logs', [
          'Sensors (automatic)', 'Paper log sheets', 'Sometimes', 'Not really',
        ]),
        q('phone2', 'Business phone setup', [
          'Regular line per site', 'One number, forwards around', 'VoIP system', 'Mostly personal cells',
        ]),
        q('admin', 'Who holds the logins and admin access to all of this?', [
          'Ankita', 'Family member', 'Manager', 'Scattered, depends on the tool',
        ], { hint: 'We need admin or export access for the data audit, nothing more.' }),
      ],
    },

    // ── 03 · Where it hurts ───────────────────────────────────────────────
    {
      id: 'pain',
      num: '03',
      title: 'Where it hurts',
      description:
        'Feeds the L1 to L4 priority order. Pick what actually happens, not what sounds right. This sets which layer we build first.',
      fields: [
        multi('pains', 'Top 3 pains, the ones costing real money', [
          'Missed calls / slow quotes', 'Wrong orders going out', 'Late orders, long waits',
          'Stock-outs mid-service', 'Over-ordering & waste', 'Staff no-shows / roster chaos',
          'Unpaid B2B invoices', 'No view across sites', 'Everything routes through Ankita',
        ], { maxSelect: 3, hint: 'Pick up to 3, in priority order.' }),
        q('wrongwk', 'Wrong or remade orders per week, all sites', ['0-2', '3-5', '6-10', '10+', 'No idea']),
        q('misscall', 'Calls that ring out or hit voicemail on a busy day', [
          'Hardly any', 'A few', 'Lots', 'No way to know',
        ]),
        q('quotetime', 'Time from catering enquiry to a priced quote', [
          'Under 1 hour', 'Same day', '1-2 days', 'Depends who picks up',
        ]),
        q('lostcat', 'Catering enquiries lost per month (ghosted, too slow, said no)', [
          '0-2', '3-5', '6+', 'Not tracked',
        ]),
        q('ankhrs', 'Hours per day Ankita spends on daily ops (calls, fires, approvals)', [
          '< 4', '4-8', '8-12', 'Basically all day',
        ], { hint: 'This is the number the whole system is accountable for cutting.' }),
        q('tried', 'What has already been tried to fix this?', [
          'Nothing yet', 'Bought software, it did not stick', 'Hired someone, did not work out',
          'Built something ourselves', 'Mid-way through something now',
        ], {
          hint: 'The honest answer. Tells us what she will be sceptical about, and why the last attempt did not stick.',
        }),
      ],
    },

    // ── 04 · How work runs ────────────────────────────────────────────────
    {
      id: 'process',
      num: '04',
      title: 'How work runs',
      description: 'Feeds L2 to L4 process facts. Quick yes or no, no judgement, just mapping.',
      fields: [
        q('catprice', 'How does a catering price get worked out?', [
          'Fixed per-head packages', 'Packages, but prices flex', 'Custom quote every time', 'Depends who quotes it',
        ], {
          hint: 'A price list we can encode means a quoting engine in weeks. Bespoke every time means we build the price book with you first.',
        }),
        q('recipes', 'Recipes and portions written down anywhere?', [
          'Yes, documented', 'Partly', "In the cooks' heads",
        ]),
        q('packcheck', 'Anyone checks items against the order before it leaves?', [
          'Always', 'Usually', "When it's busy, no", 'No step for this',
        ]),
        q('eta', 'Customers get told when their order will be ready?', [
          'Yes, and updates', 'Only when asked', 'Rarely',
        ]),
        q('drivers', 'Deliveries are done by', [
          'Our own drivers', 'Marketplace couriers', 'Both', 'Customer picks up',
        ]),
        q('standing', 'B2B standing orders written anywhere?', [
          'Yes, on paper / sheet', "In someone's memory", 'No standing orders',
        ]),
        q('discounts', 'Who can approve a discount or a big quote?', [
          'Only Ankita', 'Ankita + managers', 'Anyone senior', 'No clear rule',
        ]),
        q('away', 'If Ankita is away for a week, who runs the day?', [
          'Nobody, it waits for me', 'A manager, partly', 'Managers handle it fully', 'Family member steps in',
        ], {
          hint: 'The founder-hours KPI only moves if there is someone to hand decisions to. This is the ceiling on Layer 5.',
        }),
        q('halal', 'Halal certification held?', ['Yes (HMA / ISNA)', 'In progress', 'Not yet', 'Not sure']),
        q('wholesale', 'Plans for a licensed wholesale or provincial meat plant?', [
          'Already licensed', 'Next 12 months', 'Someday', 'No',
        ]),
      ],
    },

    // ── 05 · Tech readiness ───────────────────────────────────────────────
    {
      id: 'tech',
      num: '05',
      title: 'Tech readiness',
      description: 'Feeds L0. Can we plug in?',
      fields: [
        q('export', 'Can someone export a sales report from the POS today?', [
          'Yes, easily', 'Probably', 'Never tried',
        ]),
        q('webadmin', 'Website and Google Business, who has access?', [
          'We do', 'An agency / freelancer', 'Not sure',
        ]),
        q('wifi', 'Internet at the sites', ['Solid everywhere', 'Drops sometimes', 'One site is bad'], {
          hint: 'The kitchen screens work offline either way, this just shapes the sync design.',
        }),
        q('phones', 'Do floor staff have smartphones they would use for taps and checklists?', [
          'Yes, all', 'Most', 'Prefer shared device',
        ]),
        q('langs', 'Languages the floor team works in', [
          'English', 'English + Hindi/Urdu', 'English + Punjabi', 'Mixed, several',
        ]),
        q('itlead', 'Who fixes tech when it breaks today?', [
          'Ankita', 'A family member', 'A manager', 'An outside person', 'Nobody really',
        ]),
      ],
    },

    // ── 06 · Goals, budget, decision ──────────────────────────────────────
    {
      id: 'commercial',
      num: '06',
      title: 'Goals, budget, decision',
      description: 'Feeds the fit read and the commercial shape.',
      fields: [
        multi('goal', 'If only two things improve in 6 months, they should be', [
          'Fewer mistakes & refunds', 'Faster quotes, more catering won', 'Lower food cost / waste',
          'Sane schedules, less no-show chaos', 'Ankita off the phones', 'More B2B contracts',
        ], { maxSelect: 2, hint: 'Pick up to 2, in priority order.' }),
        q('spend', 'Current software spend per month, all tools, roughly', [
          '< $200', '$200-500', '$500-1,000', '$1,000+', 'No idea',
        ]),
        q('invest', 'Comfortable investment for phase one (90 days) if the KPI case is clear', [
          '< $10k', '$10-25k', '$25-50k', '$50k+', 'Depends on the case',
        ]),
        q('decide', 'Who signs off?', [
          'Ankita alone', 'Ankita + partner', 'Family decision', 'Needs investor / bank',
        ]),
        q('when', 'Timeline', ['Start ASAP', 'Within 1-3 months', 'This year', 'Just exploring']),
        q('phased', 'Reaction to "one layer at a time, each gated on a measured KPI"', [
          'Exactly what I want', 'Makes sense', 'Prefer all at once', 'Sceptical',
        ]),
        {
          id: 'champion',
          type: 'text',
          label: 'Ops lead per site we would work with day-to-day',
          placeholder: 'Names, or "to be hired"',
        },
        {
          id: 'anything',
          type: 'textarea',
          label: 'One thing Ankita says we have not asked about',
          placeholder: 'Her words, one line',
          rows: 3,
        },
      ],
    },
  ],
};

export default goatDiscovery;
