import type { FormConfig, FormField, FieldOption, MatrixRow } from '@/lib/types';

// ── NutriPath x Maxxlab · Launch Discovery 2026 ──────────────────────────────
// Stage 01 of 05 in the Maxxlab launch process. Sixteen questions, mostly tick
// boxes. Ported from the printed discovery document, so the question numbering
// below matches the PDF one-for-one.

const opts = (...labels: string[]): FieldOption[] => labels.map(l => ({ value: l, label: l }));
const rows = (...items: (string | MatrixRow)[]): MatrixRow[] =>
  items.map(i => (typeof i === 'string' ? { id: i.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, ''), label: i } : i));

/** Row x column grid, the PDF's recurring "tick a column per row" question. */
function matrix(id: string, label: string, matrixRows: MatrixRow[], columns: string[], extra: Partial<FormField> = {}): FormField {
  return { id, type: 'matrix', label, matrixRows, options: opts(...columns), ...extra };
}

const nutripathDiscovery: FormConfig = {
  id: 'nutripath-discovery',
  slug: 'nutripath-discovery',
  title: 'NutriPath Launch Discovery · Marketing, CRM & Automation',
  heroAccent: 'Discovery',
  eyebrow: 'Prepared for Berin Arikan · NutriPath · Stage 01 of 05 · 16 questions · ~15 minutes',
  description:
    "Tick the direction, we'll build it. Mostly tick boxes: we have filled in everything we could work out ourselves, so this is only the decisions that need to be yours. Fifteen minutes, and we can start.",
  client: 'NutriPath',
  layout: 'steps',
  footerNote: 'Questions? Contact: admin@maxxlab.tech',
  sections: [
    // ── 01 · How this works ───────────────────────────────────────────────
    {
      id: 'process',
      num: '01',
      title: 'How this works',
      description: 'Before you start. Read this, then the questions begin on the next step.',
      fields: [
        {
          id: 'process_intro',
          type: 'note',
          body: [
            'You have bought a capable platform. What it does for NutriPath depends on a handful of decisions that are about your business, not about software. This is those decisions, and nothing else.',
          ],
        },
        {
          id: 'process_steps',
          type: 'note',
          label: 'The five stages',
          body: [
            '- 01 Discovery, this document. You set the direction. Fifteen minutes.',
            '- 02 Working session. We go through your answers together and fill any gaps.',
            '- 03 System Plan. A written plan: what gets built, in what order, what stays as it is, timeline and cost. You approve it before anything starts.',
            '- 04 Build and test, one piece at a time. We build each automation, then hand it to you to test before moving to the next. Nothing is built in a black box.',
            '- 05 Full testing and handover. Everything tested end to end, a walkthrough, and a short guide so you can run it yourself.',
          ],
        },
      ],
    },

    // ── 02 · The seven things you asked for ───────────────────────────────
    {
      id: 'asked-for',
      num: '02',
      title: 'The seven things you asked for',
      description:
        'A CRM, advertising, conversion statistics, email, text, WhatsApp and a booking calendar. Each means several different things in practice. This settles which one you mean.',
      fields: [
        {
          id: 'crm_first_screen',
          type: 'checkboxgroup',
          layout: 'list',
          label: 'Q1 · The CRM: when you open it, what do you want on the first screen?',
          hint: 'Tick all that apply.',
          options: opts(
            'Everyone who signed up recently',
            'Anyone who has not been followed up yet',
            'Who is on a trial and who has paid',
            'Where each person came from, which ad, page or link',
            'Ability to message someone straight from that screen',
            'Notes I can add after speaking to someone',
          ),
        },
        {
          id: 'ads_owner',
          type: 'radio',
          layout: 'list',
          label: 'Q2 · Advertising: who set up and runs your Google Ads?',
          options: opts(
            'I set it up and manage it myself',
            'An agency or freelancer runs it',
            'Someone set it up and nobody manages it now',
            'I would like Maxxlab to take it over',
          ),
          note: {
            placeholder: 'Agency or freelancer name and email',
            openWhen: 'An agency or freelancer runs it',
          },
        },
        matrix('ads_channels', 'Q3 · Anywhere else you want to advertise?',
          rows('Instagram / Facebook', 'TikTok', 'LinkedIn', 'Professional associations or university programs'),
          ['At launch', 'Later', 'No'],
        ),
        {
          id: 'stats_decisions',
          type: 'checkboxgroup',
          layout: 'list',
          label: 'Q4 · Conversion statistics: which decisions should the numbers help you make?',
          hint: 'Tick all that apply.',
          options: opts(
            'Whether to spend more or less on advertising',
            'Which ads to keep and which to switch off',
            'What it costs me to get one paying student',
            'Where people drop off before paying',
            'Whether the free trial is converting',
            'Whether the price is right',
          ),
        },
        {
          id: 'email_sending',
          type: 'radio',
          layout: 'list',
          label: 'Q5 · Email: beyond automatic messages, will you send a newsletter or one-off emails?',
          options: opts(
            'Yes, regularly, weekly or fortnightly',
            'Yes, monthly or now and then',
            'Only for announcements',
            'No, automatic messages only',
          ),
        },
        matrix('text_uses', 'Q6 · Text message: what should text be used for, and what should never go by text?',
          rows(
            'Appointment reminders',
            'Trial ending or payment reminders',
            'Nudging someone who signed up but went quiet',
            'Study encouragement and exam countdowns',
            'Promotions and offers',
            'Replying to students one to one',
          ),
          ['Yes', 'Never'],
        ),
        {
          id: 'whatsapp_role',
          type: 'checkboxgroup',
          layout: 'list',
          label: 'Q7 · WhatsApp: what would WhatsApp do that email and text would not?',
          hint: 'Tick all that apply.',
          options: opts(
            'My students already use it, they will actually read it',
            'Best for internationally based candidates',
            'For one-to-one conversation, not for sending to a list',
            'I already message students there today',
            'Nice to have, not important right now',
          ),
        },
        {
          id: 'whatsapp_note',
          type: 'note',
          variant: 'callout',
          body: ['WhatsApp needs approval from Meta before it can be switched on, so we will confirm the timing in your System Plan.'],
        },
        matrix('booking_types', 'Q8 · Booking calendar: what would people be booking?',
          rows(
            'Tutoring sessions with a tutor',
            'A short call with you before someone buys',
            'An onboarding or welcome call after they buy',
            'Group sessions or webinars',
          ),
          ['At launch', 'Later', 'No'],
        ),
        {
          id: 'calendly',
          type: 'radio',
          layout: 'list',
          label: 'Q9 · Calendly, where do you stand?',
          options: opts(
            'Using it and happy with it, keep it',
            'Using it but never really got on with it',
            'Signed up but barely used it',
            'Not using it, happy for you to choose',
          ),
        },
      ],
    },

    // ── 03 · What good looks like ─────────────────────────────────────────
    {
      id: 'direction',
      num: '03',
      title: 'What good looks like',
      description: 'Two questions. They set what the whole system is aimed at.',
      fields: [
        {
          id: 'success_signals',
          type: 'checkboxgroup',
          layout: 'list',
          label: 'Q10 · Ninety days after launch, which of these would tell you it is working?',
          hint: 'Tick all that apply, then name the most important one in the note.',
          options: opts(
            'A certain number of paying students',
            'Steady sign-ups coming in every week without me chasing',
            'Knowing which advertising is actually producing students',
            'Spending less of my own time on admin and follow-up',
            'Students staying engaged rather than signing up and disappearing',
            'Revenue reaching a particular figure',
            'Something else',
          ),
          note: { placeholder: 'Which one matters most, and anything else' },
        },
        {
          id: 'success_numbers',
          type: 'textarea',
          label: 'Numbers, if you have any in mind',
          hint: 'A student count, a revenue figure, a cost per student. Anything you are aiming at.',
          rows: 3,
        },
        matrix('audience_priority', 'Q11 · Who should the advertising go after first?',
          rows(
            'First-time candidates finishing their internship',
            'Candidates resitting the exam',
            'Internationally educated candidates',
            'Students still early in their program',
            'Universities or internship programs, rather than individuals',
          ),
          ['First', 'Later', 'Not us'],
        ),
      ],
    },

    // ── 04 · The path we would build ──────────────────────────────────────
    {
      id: 'journey',
      num: '04',
      title: 'The path we would build',
      description:
        'Rather than ask you to describe it, here is the journey we would build by default. Read it and tell us what is wrong.',
      fields: [
        {
          id: 'journey_steps',
          type: 'note',
          label: 'What we would build',
          body: [
            '- 01 A student searches, or sees your ad. Google Ads, and later social if you want it',
            '- 02 They land on a page and sign up. We track which ad or link brought them',
            '- 03 They appear in your CRM straight away, tagged with where they came from',
            '- 04 They get a welcome message and start the free trial. Automatic, within minutes',
            '- 05 If they go quiet, they hear from you again. A short sequence, then it stops',
            '- 06 They pay, and everything sales-related stops. The platform tells the CRM they have bought',
            '- 07 They get a welcome and check-ins as a student, alongside the app itself',
            '- 08 After the exam, you ask for feedback and referrals. Later phase, once students have finished',
          ],
        },
        {
          id: 'journey_verdict',
          type: 'radio',
          layout: 'list',
          label: 'Q12 · Is this the path you want?',
          options: opts(
            'Yes, that is right',
            'Mostly right, with the changes noted below',
            'Not quite, let us talk it through',
          ),
          note: { placeholder: 'What would you change?' },
        },
        matrix('moments', 'Q13 · At which moments should the system reach out on its own, and on which channel?',
          rows(
            'Someone gives you their email for the first time',
            'Someone starts the free trial',
            'The free trial is about to end',
            'Someone showed interest but has gone quiet',
            'Someone becomes a paying student',
            'A student has not logged in for a while',
            'A student books or is due a session',
            'A student finishes, or sits the exam',
            { id: 'missed', label: 'Anything we have missed', freeform: true },
          ),
          ['Email', 'Text', 'Neither'],
          { note: { placeholder: 'Any moment we have missed, and how it should be handled' } },
        ),
      ],
    },

    // ── 05 · What stays and what goes ─────────────────────────────────────
    {
      id: 'tools',
      num: '05',
      title: 'What stays and what goes',
      description:
        'We do not replace things that are working. Here is everything we found. Tick what you want to keep in your day-to-day.',
      fields: [
        matrix('tool_decisions', 'Q14 · Which of these do you want to keep using?',
          [
            { id: 'tlp', label: 'TLP Tech', description: 'The platform this project is built on' },
            { id: 'kit', label: 'Kit', description: 'Your email tool, paid for the year' },
            { id: 'calendly', label: 'Calendly', description: 'If you are using it' },
            { id: 'google_ads', label: 'Google Ads', description: 'Running now' },
            { id: 'other', label: 'Anything else you pay for that we have not listed', freeform: true },
          ],
          ['Keep', 'Drop', 'Not sure'],
        ),
        {
          id: 'tools_missed',
          type: 'textarea',
          label: 'Anything we missed',
          hint: 'Including things you bought and never used, or that someone else set up.',
          rows: 3,
        },
      ],
    },

    // ── 06 · What you want to see ─────────────────────────────────────────
    {
      id: 'reporting',
      num: '06',
      title: 'What you want to see',
      description:
        'Tick everything you want. "Check often" only decides what sits on the front screen. Everything ticked gets built either way.',
      fields: [
        matrix('reporting', 'Q15 · Which of these do you want, and which would you check often?',
          rows(
            'New sign-ups this week',
            'Free trials started',
            'Trials that turned into paying students',
            'Total paying students',
            'Revenue this month',
            'Where sign-ups came from',
            'Ad spend, and cost per sign-up',
            'Cost to get one paying student',
            'How many people open and click your emails',
            'Bookings made and attended',
            'Students who have gone quiet',
            { id: 'something_else', label: 'Something else', freeform: true },
          ),
          ['Want it', 'Check often'],
          {
            multiColumn: true,
            hint: 'A number can be both. Tick "want it" for everything you want built, and "check often" only for the ones that belong on the front screen.',
            note: { placeholder: 'Anything else you want to see' },
          },
        ),
      ],
    },

    // ── 07 · What we build first ──────────────────────────────────────────
    {
      id: 'sequence',
      num: '07',
      title: 'What we build first',
      description:
        'Everything you have ticked gets built. This only decides the order, so the pieces you care about most are working and tested first.',
      fields: [
        matrix('build_order', 'Q16 · Mark each of these as first wave or later.',
          rows(
            'Sign-ups landing in the CRM with their source tracked',
            'Automatic welcome and follow-up messages',
            'Trial ending and payment reminders',
            'Booking calendar with reminders',
            'Text messaging switched on',
            'WhatsApp switched on',
            'Your reporting screen',
            'Ad tracking through to paying students',
            'Re-engaging people who went quiet',
          ),
          ['First', 'Later'],
        ),
        {
          id: 'anything_else',
          type: 'textarea',
          label: 'Anything else we should know',
          hint: 'Dates you are working to, things that went wrong before, anything you do not want us to touch.',
          rows: 4,
        },
      ],
    },

    // ── 08 · Access ───────────────────────────────────────────────────────
    {
      id: 'access',
      num: '08',
      title: 'What we still need access to',
      description:
        'Three things, so we can look them up rather than ask you. All of it is access to accounts you already own. Nothing is transferred, and you can remove us at any time.',
      fields: [
        {
          id: 'access_how',
          type: 'note',
          label: 'How to give it',
          body: [
            '- Google Ads, Admin. Tools, then Access and security, then +, then add our email as Admin',
            '- Google Analytics, Editor. Admin, then Access management, then +, then add our email. If it is not set up, tell us and we will handle it',
            '- Stripe, read only. Settings, then Team, then invite, then Analyst',
            '- TLP Tech, Kit, Website and Domain. We already have these, thank you',
          ],
        },
        matrix('access_granted', 'Which of these have you granted?',
          [
            { id: 'google_ads', label: 'Google Ads', description: 'Admin' },
            { id: 'google_analytics', label: 'Google Analytics', description: 'Editor' },
            { id: 'stripe', label: 'Stripe', description: 'Read only' },
          ],
          ['Done', 'Need help', 'Not yet'],
          { note: { placeholder: 'Anything blocking access' } },
        ),
        {
          id: 'access_email',
          type: 'email',
          label: 'Best email to send the access requests to',
          placeholder: 'you@nutripath.com',
        },
      ],
    },
  ],
};

export default nutripathDiscovery;
