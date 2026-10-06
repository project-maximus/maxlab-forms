import type { FormConfig } from '@/lib/types';

// ── World Times Institute hiring · technology team ───────────────────────────
// One form, four tracks. Section 01 asks which role you are applying for and
// every role-specific section below is gated on that answer via `showIf`, so an
// applicant only ever sees their own track.
//
// The institute runs exam-preparation programmes. These roles cover the teams
// behind them: the software (public site, admissions, student portal, mock-test
// platform), the design of it, how students hear about us, and the campus IT
// that keeps labs and exams running.

const ROLE_FIELD = 'role';

const worldTimesHiring: FormConfig = {
  id: 'worldtimes-hiring',
  slug: 'worldtimes-hiring',
  brand: 'worldtimes',
  title: 'Team Application',
  heroAccent: 'Application',
  eyebrow: 'World Times Institute · Hiring · Development · Design · Marketing · IT',
  description:
    'We are hiring across development, design, social media, marketing and IT. Pick the role you are applying for and the rest of the form changes to match it.',
  client: 'World Times Institute',
  layout: 'steps',
  footerNote: 'Questions about the role? Contact: careers@worldtimesinstitute.com.pk',
  sections: [
    // ── 01 · Role picker ─────────────────────────────────────────────────────
    {
      id: 'role-select',
      num: '01',
      title: 'Which role are you applying for?',
      description:
        'Pick one and the rest of the form changes to match. The next step explains the role in full before you answer anything.',
      fields: [
        {
          id: ROLE_FIELD,
          type: 'radio',
          layout: 'list',
          label: 'Choose your track',
          required: true,
          options: [
            {
              value: 'fullstack',
              label: 'Full-Stack Developer',
              badge: 'Engineering',
              badgeVariant: 'blue',
              description: 'Student portal, admissions and fee collection, end to end.',
            },
            {
              value: 'frontend',
              label: 'Frontend Developer',
              badge: 'Engineering',
              badgeVariant: 'blue',
              description: 'The public site and every student-facing screen.',
            },
            {
              value: 'uiux',
              label: 'UI/UX Designer',
              badge: 'Design',
              badgeVariant: 'amber',
              description: 'The journey from first visit to enrolled student.',
            },
            {
              value: 'qa',
              label: 'QA Tester',
              badge: 'Quality',
              badgeVariant: 'green',
              description: 'Enrolment, payments and exams, tested before students meet them.',
            },
            {
              value: 'social',
              label: 'Social Media Executive',
              badge: 'Content',
              badgeVariant: 'amber',
              description: 'The channels where most students first hear of us.',
            },
            {
              value: 'marketing',
              label: 'Digital Marketing Executive',
              badge: 'Growth',
              badgeVariant: 'red',
              description: 'Campaigns, search and the admissions funnel.',
            },
            {
              value: 'it',
              label: 'IT Officer',
              badge: 'Operations',
              badgeVariant: 'green',
              description: 'Labs, network, classrooms and exam-day readiness.',
            },
          ],
        },
      ],
    },

    // ── Role brief · Full-Stack ──────────────────────────────────────────────
    {
      id: 'brief-fullstack',
      num: '02',
      title: 'The role · Full-Stack Developer',
      description: 'Own features from database to screen.',
      showIf: { field: ROLE_FIELD, equals: ['fullstack'] },
      fields: [
        {
          id: 'fs_intro',
          type: 'note',
          body: [
            "World Times Institute prepares thousands of students for competitive examinations. Almost everything around that still runs on paper, spreadsheets and phone calls. We are building the software to replace it, and we want a full-stack developer who can own a feature from the database schema through to the screen a student actually uses.",
            "This is not agency work on short contracts. You would be building systems the institute depends on every single intake, and you would still be maintaining them a year later. That changes how you write code, and we are looking for someone who wants that kind of ownership.",
          ],
        },
        {
          id: 'fs_work',
          type: 'note',
          label: "What you'll work on",
          body: [
            '- The student portal: enrolment, class schedules, attendance, results and course material, with separate access for students, instructors and administration',
            '- Admissions: online applications, document uploads, shortlisting and the admin screens the office uses to process them',
            '- Fee collection and receipts, including local payment methods and reconciling what has actually been paid',
            '- The mock-test platform: timed papers, automatic marking where possible, and result reporting students and instructors can both read',
            '- Reporting the management actually asks for: enrolment numbers by programme, fee recovery, batch performance',
          ],
        },
        {
          id: 'fs_tech',
          type: 'note',
          label: 'What we expect technically',
          body: [
            '- Comfortable on both sides: a typed backend with real HTTP API design, and a modern JavaScript frontend',
            '- Relational databases you understand properly: schema design, indexing, and why a query got slow',
            '- Authentication, sessions and role-based access. Student data is sensitive and a student must never see another student record',
            '- Writing code someone else can read and change in six months, and reviewing other people code the same way',
          ],
        },
        {
          id: 'fs_how',
          type: 'note',
          label: 'How we work',
          variant: 'callout',
          body: [
            'The technology team is new, so you would be shaping it rather than joining a finished process. You will work directly with the people running the programmes, which means short feedback loops and very little guessing about what is needed.',
            'Our students are on mid-range Android phones on uneven connections. Performance and reliability are product requirements here, not polish.',
          ],
        },
      ],
    },

    // ── Role brief · Frontend ────────────────────────────────────────────────
    {
      id: 'brief-frontend',
      num: '02',
      title: 'The role · Frontend Developer',
      description: 'Everything a student or a visitor actually sees.',
      showIf: { field: ROLE_FIELD, equals: ['frontend'] },
      fields: [
        {
          id: 'fe_intro',
          type: 'note',
          body: [
            "Every prospective student forms their impression of the institute from a screen before they ever walk into a classroom. You would own those screens: the public site, the course pages, the application flow and the portal students live in once they have enrolled.",
            "We are looking for someone who cares how an interface behaves on a four-year-old Android phone on a weak connection, not only how it looks on a laptop in an office.",
          ],
        },
        {
          id: 'fe_work',
          type: 'note',
          label: "What you'll work on",
          body: [
            '- The public website: programme pages, faculty, results, admissions information, and the content the office needs to update without calling you',
            '- The application and enrolment flow, which has to work for people filling it in on a phone, sometimes with patchy signal',
            '- Student portal screens: schedules, materials, test results, fee status',
            '- A small, consistent component set so new pages take hours rather than days',
          ],
        },
        {
          id: 'fe_tech',
          type: 'note',
          label: 'What we expect technically',
          body: [
            '- Strong React, or equally strong equivalent experience you can show us',
            '- Real responsive work. Mobile first, and tested on actual mid-range devices, not just a resized browser window',
            '- Performance as a habit: image handling, bundle size, and knowing what makes a page feel slow',
            '- Accessible markup. Semantic HTML, keyboard navigation and sensible contrast',
            '- Comfortable turning a design file into an interface faithfully, and pushing back when something will not work',
          ],
        },
        {
          id: 'fe_how',
          type: 'note',
          label: 'How we work',
          variant: 'callout',
          body: [
            'You will work closely with the designer and with whoever is building the backend, in a small team where you can see the effect of your work on real students within the same term.',
          ],
        },
      ],
    },

    // ── Role brief · UI/UX ───────────────────────────────────────────────────
    {
      id: 'brief-uiux',
      num: '02',
      title: 'The role · UI/UX Designer',
      description: 'The path from first visit to enrolled student.',
      showIf: { field: ROLE_FIELD, equals: ['uiux'] },
      fields: [
        {
          id: 'ux_intro',
          type: 'note',
          body: [
            "Our students range from fresh graduates who live on their phones to people returning to study after years away. A design that assumes everyone is comfortable with software will quietly lose a large share of them. We want a designer who treats that as the core of the problem rather than an edge case.",
            "You would design the whole journey: the first page someone lands on, the application they fill in, and the portal they use every week once they are enrolled.",
          ],
        },
        {
          id: 'ux_work',
          type: 'note',
          label: "What you'll work on",
          body: [
            '- The admissions journey end to end, with the aim of fewer abandoned applications and fewer phone calls to the office',
            '- Student portal screens where the information is dense and has to stay readable: timetables, results, fee statements',
            '- A design system the developers can build from: type scale, spacing, components and states, not just finished screens',
            '- Prototypes to test a flow before anybody writes code for it',
          ],
        },
        {
          id: 'ux_tech',
          type: 'note',
          label: 'What we expect',
          body: [
            '- Fluent in Figma, including components, variants and shared libraries',
            '- You design for mobile first, because that is what our students use',
            '- You hand off work developers can build without guessing: spacing, states, edge cases, empty and error screens',
            '- You can explain a decision. We will ask why a screen is laid out the way it is, and "it looks better" is not the answer we are after',
            '- Any experience watching real users attempt a flow is a strong advantage',
          ],
        },
        {
          id: 'ux_how',
          type: 'note',
          label: 'How we work',
          variant: 'callout',
          body: [
            'You would be the first designer on the team, so you are setting the standard rather than following one. You will have direct access to students and to the admissions staff who answer their questions all day, which is the fastest research anyone could ask for.',
          ],
        },
      ],
    },

    // ── Role brief · QA ──────────────────────────────────────────────────────
    {
      id: 'brief-qa',
      num: '02',
      title: 'The role · QA Tester',
      description: 'Catch it before a student does.',
      showIf: { field: ROLE_FIELD, equals: ['qa'] },
      fields: [
        {
          id: 'qa_intro',
          type: 'note',
          body: [
            "When enrolment opens, a few thousand people hit the same forms in the same week. A broken payment step or a mock test that loses answers is not a small bug here, it is a student who misses an intake and an office that spends days on the phone.",
            "We want someone who tests the things that actually hurt when they break, and who writes the problem up clearly enough that a developer can reproduce it on the first try.",
          ],
        },
        {
          id: 'qa_work',
          type: 'note',
          label: "What you'll work on",
          body: [
            '- The admissions and enrolment flow, start to finish, including the awkward paths: back button, double submit, dropped connection, expired session',
            '- Payments and fee receipts, where being wrong is expensive and visible',
            '- The mock-test platform under exam conditions: timers, submissions, a phone that dies halfway through',
            '- Device and browser coverage that reflects what our students genuinely use, which is mostly mid-range Android',
            '- A regression pass before each intake, so a fix in one place does not break another',
          ],
        },
        {
          id: 'qa_tech',
          type: 'note',
          label: 'What we expect',
          body: [
            '- You can write a bug report a developer can act on: steps, expected, actual, environment, and how severe it really is',
            '- You think in edge cases without being handed a list',
            '- Comfortable testing on real devices, not only on a desktop browser',
            '- Any experience with automated testing tools is a bonus, but clear thinking matters more to us than tooling',
          ],
        },
        {
          id: 'qa_how',
          type: 'note',
          label: 'How we work',
          variant: 'callout',
          body: [
            'You would be the first QA person on the team and the last line before something reaches a student. That carries real weight here, and your "no, this is not ready" will be listened to.',
          ],
        },
      ],
    },

    // ── Role brief · Social Media ────────────────────────────────────────────
    {
      id: 'brief-social',
      num: '02',
      title: 'The role · Social Media Executive',
      description: 'Where most students hear of us first.',
      showIf: { field: ROLE_FIELD, equals: ['social'] },
      fields: [
        {
          id: 'sm_intro',
          type: 'note',
          body: [
            "Most of our students find us on a phone, scrolling, long before they read a prospectus. Our channels are where the institute makes its first impression, and right now they are run in the gaps between other work. We want someone whose actual job this is.",
            "This is not a posting job. You would decide what we say, make most of it yourself, and answer the hundreds of people who reply asking about fees, dates and eligibility.",
          ],
        },
        {
          id: 'sm_work',
          type: 'note',
          label: "What you'll work on",
          body: [
            '- A content calendar that runs ahead of the intake cycle rather than reacting to it',
            '- Short-form video: lecture clips, faculty answering a common question, student results, campus moments',
            '- Results and toppers announcements, which are our single strongest piece of proof and deserve better than a plain photo',
            '- Admissions campaigns: deadlines, open days, fee instalment news, in the weeks when it matters',
            '- Replies. Comments, DMs and the same five questions asked a hundred different ways, answered quickly and in the right tone',
          ],
        },
        {
          id: 'sm_expect',
          type: 'note',
          label: 'What we expect',
          body: [
            '- You write well in both Urdu and English, and know which one a given post needs',
            '- You can shoot and cut short-form video yourself on a phone. Fast and good beats slow and perfect here',
            '- You know what actually performs on Facebook, Instagram, TikTok and YouTube in Pakistan, rather than what performs abroad',
            '- You can keep a tone that is warm but still serious. We are preparing people for competitive examinations, not selling a gadget',
            '- You can handle comment volume during admissions week without going quiet',
          ],
        },
        {
          id: 'sm_how',
          type: 'note',
          label: 'How we work',
          variant: 'callout',
          body: [
            'You would have direct access to faculty and students, which is where the good material is. Approval chains are short: an idea in the morning can be published the same afternoon.',
          ],
        },
      ],
    },

    // ── Role brief · Marketing ───────────────────────────────────────────────
    {
      id: 'brief-marketing',
      num: '02',
      title: 'The role · Digital Marketing Executive',
      description: 'Own the number, not the activity.',
      showIf: { field: ROLE_FIELD, equals: ['marketing'] },
      fields: [
        {
          id: 'mk_intro',
          type: 'note',
          body: [
            "Every intake we need a certain number of the right students to find us, enquire, and enrol. At the moment we do not reliably know which of our efforts produced them. We want someone who can both run the campaigns and tell us what they actually returned.",
            "You would own the path from a stranger seeing an ad to a student paying their first instalment, and you would be judged on cost per enrolment rather than on impressions.",
          ],
        },
        {
          id: 'mk_work',
          type: 'note',
          label: "What you'll work on",
          body: [
            '- Paid campaigns on Meta and Google, from targeting and copy through to budget pacing across an intake cycle',
            '- Search: making sure that when someone searches for the exam we prepare people for, we are on the first page',
            '- Landing pages for specific programmes and campaigns, working with the developers and designer',
            '- The enquiry-to-enrolment funnel: where people drop out, and what to change about it',
            '- WhatsApp and SMS campaigns, which still convert better here than email for a lot of our audience',
            '- Reporting that management can read: enquiries, cost per enquiry, cost per enrolment, by programme',
          ],
        },
        {
          id: 'mk_expect',
          type: 'note',
          label: 'What we expect',
          body: [
            '- You have run a real budget and can say what it returned, not only what it was spent on',
            '- Comfortable in Meta Ads Manager and Google Ads, and in analytics rather than only the ad dashboards',
            '- You write copy that gets a click without overpromising. We cannot promise anyone a result in a competitive examination',
            '- You understand this market: how Pakistani students and their parents decide on an institute, and what they are sceptical of',
            '- You can tell the difference between a campaign that is failing and a landing page that is failing',
          ],
        },
        {
          id: 'mk_how',
          type: 'note',
          label: 'How we work',
          variant: 'callout',
          body: [
            'Admissions runs in cycles, so the work is genuinely seasonal: intense in the weeks before an intake, more about building and measuring in between. You will be given the budget and the number, and a lot of latitude on how you reach it.',
          ],
        },
      ],
    },

    // ── Role brief · IT ──────────────────────────────────────────────────────
    {
      id: 'brief-it',
      num: '02',
      title: 'The role · IT Officer',
      description: 'Keep the campus running, especially on exam day.',
      showIf: { field: ROLE_FIELD, equals: ['it'] },
      fields: [
        {
          id: 'it_intro',
          type: 'note',
          body: [
            "Classes, mock examinations, staff work and admissions all depend on the computers, the network and the classroom equipment actually working. When they do not, teaching stops. This role is the person who makes sure that rarely happens, and who fixes it fast when it does.",
            "It is a practical, hands-on job. You will be in the labs and the classrooms, not only at a desk.",
          ],
        },
        {
          id: 'it_work',
          type: 'note',
          label: "What you'll work on",
          body: [
            '- The computer labs: machines, images, software, and keeping them usable through an entire term',
            '- Network and internet across campus, including the wifi students complain about',
            '- Classroom equipment: projectors, screens, audio, and the recording setup we use for lecture content',
            '- Staff accounts, email, shared drives and printers',
            '- Backups, and confirming they can actually be restored rather than assuming',
            '- Exam-day readiness: testing everything in advance and standing by while a mock test runs',
            '- Hardware: diagnosing faults, arranging repairs, and advising on what to buy',
          ],
        },
        {
          id: 'it_expect',
          type: 'note',
          label: 'What we expect',
          body: [
            '- Solid networking basics: IP, DNS, DHCP, routers and switches, and diagnosing a connection that is slow rather than dead',
            '- Windows administration, and comfort with user accounts and permissions',
            '- Real troubleshooting under time pressure, because a lab failing mid-examination will not wait',
            '- Patience with people who are not technical. Explaining the fix matters as much as the fix',
            '- Keeping a record of what you did, so the next problem is faster to solve',
          ],
        },
        {
          id: 'it_how',
          type: 'note',
          label: 'How we work',
          variant: 'callout',
          body: [
            'You would be the person everyone calls, which means real authority over how things are set up. We would rather you spent money preventing a failure than spent a morning recovering from one.',
          ],
        },
      ],
    },

    // ── You, in brief ────────────────────────────────────────────────────────
    {
      id: 'basics',
      num: '03',
      title: 'You, in brief',
      description: 'The essentials: who you are and how to reach you.',
      fields: [
        { id: 'full_name', type: 'text', label: 'Full name', required: true, halfWidth: true },
        { id: 'email', type: 'email', label: 'Email address', required: true, halfWidth: true },
        { id: 'phone', type: 'phone', label: 'Phone / WhatsApp', required: true, halfWidth: true },
        { id: 'city', type: 'text', label: 'City', placeholder: 'e.g. Lahore', required: true, halfWidth: true },
        { id: 'linkedin_url', type: 'url', label: 'LinkedIn profile', halfWidth: true },
        { id: 'portfolio_url', type: 'url', label: 'Portfolio / personal site', halfWidth: true },
      ],
    },

    // ── About you ────────────────────────────────────────────────────────────
    {
      id: 'about',
      num: '04',
      title: 'About you',
      description: 'Your background and what you are looking for.',
      fields: [
        {
          id: 'about',
          type: 'textarea',
          label: 'Tell us about yourself',
          hint: 'Your background, what you care about in your craft, and the kind of work you want to be doing.',
          rows: 4,
          required: true,
        },
        { id: 'current_role', type: 'text', label: 'Current role / title', halfWidth: true },
        {
          id: 'years_experience',
          type: 'radio',
          layout: 'pills',
          label: 'Years of professional experience',
          halfWidth: true,
          options: [
            { value: 'under1', label: 'Under 1 year' },
            { value: '1to2', label: '1 to 2 years' },
            { value: '3to5', label: '3 to 5 years' },
            { value: '5to8', label: '5 to 8 years' },
            { value: '8plus', label: '8+ years' },
          ],
        },
        {
          id: 'qualification',
          type: 'text',
          label: 'Highest qualification',
          placeholder: 'e.g. BS Computer Science, Punjab University',
        },
        {
          id: 'work_type',
          type: 'radio',
          layout: 'pills',
          label: 'What are you looking for?',
          options: [
            { value: 'fulltime', label: 'Full-time' },
            { value: 'parttime', label: 'Part-time' },
            { value: 'contract', label: 'Contract / freelance' },
            { value: 'internship', label: 'Internship' },
            { value: 'either', label: 'Open to any' },
          ],
        },
      ],
    },

    // ── Skills · Full-Stack ──────────────────────────────────────────────────
    {
      id: 'skills-fullstack',
      num: '05',
      title: 'Your engineering experience',
      description: "Where you are strongest across the stack, and the work that proves it.",
      showIf: { field: ROLE_FIELD, equals: ['fullstack'] },
      fields: [
        {
          id: 'fs_core_skills',
          type: 'checkboxgroup',
          layout: 'list',
          label: 'Core skills: select what you have real production experience with',
          hint: 'Only tick what you could own today without hand-holding.',
          options: [
            { value: 'js_ts', label: 'JavaScript and TypeScript', description: 'On both the server and the browser.' },
            { value: 'api', label: 'Building HTTP APIs', description: 'Node, PHP, Python, whichever. We care that you have designed one.' },
            { value: 'sql', label: 'Relational databases and SQL', description: 'Schema design, indexing, query performance.' },
            { value: 'react', label: 'React or a comparable frontend framework' },
            { value: 'auth', label: 'Authentication, sessions and role-based access' },
            { value: 'payments', label: 'Payment or billing integrations' },
            { value: 'reviewed', label: 'Writing tested, reviewed code' },
          ],
        },
        {
          id: 'fs_strongest',
          type: 'textarea',
          label: 'Which of the responsibilities above are you strongest in, and what would you want to take on first?',
          hint: 'This is the paragraph we read most closely. Be specific about real work you have shipped.',
          rows: 5,
          required: true,
        },
        {
          id: 'fs_data_case',
          type: 'textarea',
          label: 'Tell us about a database you designed or had to fix',
          hint: 'A schema you planned, a query you had to optimise, or a migration that went sideways. Anything concrete.',
          rows: 3,
          required: true,
        },
        { id: 'fs_github_url', type: 'url', label: 'GitHub profile', required: true, halfWidth: true },
        {
          id: 'fs_repo_highlight',
          type: 'url',
          label: 'The one project we should look at first',
          hint: 'A repo or a live link. Best representation of your full-stack work.',
          halfWidth: true,
        },
      ],
    },

    // ── Skills · Frontend ────────────────────────────────────────────────────
    {
      id: 'skills-frontend',
      num: '05',
      title: 'Your frontend experience',
      description: 'What you have built, and how it behaves on a real phone.',
      showIf: { field: ROLE_FIELD, equals: ['frontend'] },
      fields: [
        {
          id: 'fe_core_skills',
          type: 'checkboxgroup',
          layout: 'list',
          label: 'Core skills: select what you have real production experience with',
          hint: 'Only tick what you could own today without hand-holding.',
          options: [
            { value: 'react', label: 'React in production' },
            { value: 'js_ts', label: 'Modern JavaScript and TypeScript' },
            { value: 'css', label: 'CSS at depth', description: 'Layout, responsive design, and knowing why something is off by a pixel.' },
            { value: 'responsive', label: 'Mobile-first responsive work tested on real devices' },
            { value: 'perf', label: 'Performance work', description: 'Bundle size, images, load time on slow connections.' },
            { value: 'a11y', label: 'Accessibility: semantic HTML, keyboard navigation, contrast' },
            { value: 'figma_handoff', label: 'Building from Figma or similar design files' },
            { value: 'components', label: 'Building and maintaining a shared component library' },
          ],
        },
        {
          id: 'fe_strongest',
          type: 'textarea',
          label: 'Which of the responsibilities above are you strongest in, and what would you want to take on first?',
          hint: 'This is the paragraph we read most closely. Be specific about real work you have shipped.',
          rows: 5,
          required: true,
        },
        {
          id: 'fe_perf_case',
          type: 'textarea',
          label: 'Tell us about a time you made something noticeably faster, or fixed it for low-end devices',
          hint: 'What was slow, what you changed, and how you knew it worked.',
          rows: 3,
          required: true,
        },
        { id: 'fe_github_url', type: 'url', label: 'GitHub profile', halfWidth: true },
        {
          id: 'fe_live_url',
          type: 'url',
          label: 'A live site you built that we can open',
          hint: 'We will open it on a phone. Pick accordingly.',
          required: true,
          halfWidth: true,
        },
      ],
    },

    // ── Skills · UI/UX ───────────────────────────────────────────────────────
    {
      id: 'skills-uiux',
      num: '05',
      title: 'Your design experience',
      description: 'How you work, and what we can look at.',
      showIf: { field: ROLE_FIELD, equals: ['uiux'] },
      fields: [
        {
          id: 'ux_core_skills',
          type: 'checkboxgroup',
          layout: 'list',
          label: 'Core skills: select what you have real experience with',
          hint: 'Only tick what you could own today without hand-holding.',
          options: [
            { value: 'figma', label: 'Figma: components, variants, shared libraries' },
            { value: 'systems', label: 'Building a design system rather than one-off screens' },
            { value: 'mobile', label: 'Mobile-first product design' },
            { value: 'prototype', label: 'Interactive prototypes used to test a flow' },
            { value: 'research', label: 'Watching real users attempt a task' },
            { value: 'handoff', label: 'Developer handoff: states, spacing, edge cases' },
            { value: 'dense', label: 'Designing dense information screens', description: 'Tables, timetables, dashboards.' },
            { value: 'a11y', label: 'Accessibility and contrast standards' },
          ],
        },
        {
          id: 'ux_strongest',
          type: 'textarea',
          label: 'Which of the responsibilities above are you strongest in, and what would you want to take on first?',
          hint: 'This is the paragraph we read most closely. Be specific about real work you have shipped.',
          rows: 5,
          required: true,
        },
        {
          id: 'ux_decision',
          type: 'textarea',
          label: 'Describe one design decision you made and the reasoning behind it',
          hint: 'What the problem was, what you chose, what you rejected, and how you knew it was right.',
          rows: 4,
          required: true,
        },
        {
          id: 'ux_portfolio_url',
          type: 'url',
          label: 'Portfolio link',
          hint: 'Where we can see your work. Make sure it is publicly viewable.',
          required: true,
          halfWidth: true,
        },
        {
          id: 'ux_figma_url',
          type: 'url',
          label: 'A Figma file we can open',
          hint: 'Optional. If you have one you can share, we would rather see the working file than only the finished image.',
          halfWidth: true,
        },
        {
          id: 'ux_board_url',
          type: 'url',
          label: 'A working board we can open',
          hint: 'FigJam, Miro, Notion, however you organise a project. We want to see how you structure your thinking, not a polished deliverable. Make sure the link is publicly viewable.',
        },
      ],
    },

    // ── Skills · QA ──────────────────────────────────────────────────────────
    {
      id: 'skills-qa',
      num: '05',
      title: 'Your testing experience',
      description: 'We would rather see how you think than a list of tools.',
      showIf: { field: ROLE_FIELD, equals: ['qa'] },
      fields: [
        {
          id: 'qa_core_skills',
          type: 'checkboxgroup',
          layout: 'list',
          label: 'Core skills: select what you have real experience with',
          hint: 'Only tick what you could own today without hand-holding.',
          options: [
            { value: 'manual', label: 'Structured manual testing of a real product' },
            { value: 'reports', label: 'Writing bug reports developers can act on' },
            { value: 'cases', label: 'Writing test cases and regression checklists' },
            { value: 'devices', label: 'Testing on real mobile devices, not just a desktop browser' },
            { value: 'payments', label: 'Testing payment or checkout flows' },
            { value: 'a11y', label: 'Accessibility testing' },
            { value: 'automation', label: 'Automated testing tools', description: 'Any of Playwright, Cypress, Selenium or similar.' },
            { value: 'api_testing', label: 'API testing', description: 'Postman or similar.' },
          ],
        },
        {
          id: 'qa_bug_report',
          type: 'textarea',
          label: 'Write us a bug report',
          hint: 'Pick any bug you have genuinely found and write it as you would file it: steps to reproduce, what you expected, what happened, environment, and how serious it is. We are reading the clarity, not the bug.',
          rows: 6,
          required: true,
        },
        {
          id: 'qa_scenario',
          type: 'textarea',
          label: 'A student is paying their fee online. What do you test?',
          hint: 'List what you would check. We are looking for the paths people forget: double submission, back button, a dropped connection mid-payment, a card that fails, a session that expires.',
          rows: 5,
          required: true,
        },
        {
          id: 'qa_missed',
          type: 'textarea',
          label: 'Tell us about a bug that reached real users',
          hint: 'What slipped through, how it was found, and what you changed afterwards so it would not happen again. We are not looking for someone who has never missed anything.',
          rows: 4,
          required: true,
        },
        {
          id: 'qa_doc_url',
          type: 'url',
          label: 'A test plan, checklist or bug tracker we can look at',
          hint: 'Optional. Anything you have written that shows how you organise testing. Make sure the link is publicly viewable.',
        },
      ],
    },

    // ── Skills · Social Media ────────────────────────────────────────────────
    {
      id: 'skills-social',
      num: '05',
      title: 'Your social media experience',
      description: 'Show us work, not follower counts you bought.',
      showIf: { field: ROLE_FIELD, equals: ['social'] },
      fields: [
        {
          id: 'sm_platforms',
          type: 'checkboxgroup',
          layout: 'list',
          label: 'Platforms you have genuinely run, not just used',
          hint: 'Only tick what you could own today without hand-holding.',
          options: [
            { value: 'facebook', label: 'Facebook pages and groups' },
            { value: 'instagram', label: 'Instagram, including Reels' },
            { value: 'tiktok', label: 'TikTok' },
            { value: 'youtube', label: 'YouTube, including Shorts' },
            { value: 'linkedin', label: 'LinkedIn' },
            { value: 'video_edit', label: 'Short-form video editing', description: 'CapCut, Premiere, or whatever you actually use.' },
            { value: 'design_tools', label: 'Graphics for social', description: 'Canva, Photoshop, Figma.' },
            { value: 'copy_urdu', label: 'Writing social copy in Urdu' },
            { value: 'copy_english', label: 'Writing social copy in English' },
            { value: 'community', label: 'Community management at volume', description: 'Comments, DMs and complaints.' },
          ],
        },
        {
          id: 'sm_strongest',
          type: 'textarea',
          label: 'Which of the responsibilities above are you strongest in, and what would you want to take on first?',
          hint: 'This is the paragraph we read most closely. Be specific about real work you have done.',
          rows: 5,
          required: true,
        },
        {
          id: 'sm_account_url',
          type: 'url',
          label: 'An account you have run that we can open',
          hint: 'Yours or a client page. If it is not public, tell us in the notes at the end instead.',
          required: true,
          halfWidth: true,
        },
        {
          id: 'sm_best_post_url',
          type: 'url',
          label: 'The single post or video you are most proud of',
          hint: 'Link straight to it.',
          halfWidth: true,
        },
        {
          id: 'sm_growth',
          type: 'textarea',
          label: 'Tell us what that account did while you ran it',
          hint: 'Where it started, where it got to, over what period, and what you changed to get there. Numbers help, honesty helps more.',
          rows: 4,
          required: true,
        },
        {
          id: 'sm_idea',
          type: 'textarea',
          label: 'Admissions open next month. Give us one content idea you would run.',
          hint: 'A specific idea, not a strategy. What the post or video actually is, and who it is aimed at.',
          rows: 4,
          required: true,
        },
      ],
    },

    // ── Skills · Marketing ───────────────────────────────────────────────────
    {
      id: 'skills-marketing',
      num: '05',
      title: 'Your marketing experience',
      description: 'What you ran, and what it returned.',
      showIf: { field: ROLE_FIELD, equals: ['marketing'] },
      fields: [
        {
          id: 'mk_channels',
          type: 'checkboxgroup',
          layout: 'list',
          label: 'Channels you have run with a real budget',
          hint: 'Only tick what you could own today without hand-holding.',
          options: [
            { value: 'meta_ads', label: 'Meta Ads', description: 'Facebook and Instagram.' },
            { value: 'google_ads', label: 'Google Ads', description: 'Search, Display or YouTube.' },
            { value: 'tiktok_ads', label: 'TikTok Ads' },
            { value: 'seo', label: 'SEO', description: 'On-page, content, technical.' },
            { value: 'landing', label: 'Landing pages and conversion rate work' },
            { value: 'whatsapp_sms', label: 'WhatsApp or SMS campaigns' },
            { value: 'email', label: 'Email marketing' },
            { value: 'analytics', label: 'Analytics', description: 'GA4, Meta Pixel, conversion tracking and attribution.' },
            { value: 'copywriting', label: 'Writing the ad copy yourself' },
          ],
        },
        {
          id: 'mk_budget',
          type: 'radio',
          layout: 'pills',
          label: 'Largest monthly ad budget you have personally managed',
          required: true,
          options: [
            { value: 'none', label: 'None yet' },
            { value: 'under50k', label: 'Under 50k PKR' },
            { value: '50to200k', label: '50k to 200k PKR' },
            { value: '200to500k', label: '200k to 500k PKR' },
            { value: 'over500k', label: 'Over 500k PKR' },
          ],
        },
        {
          id: 'mk_strongest',
          type: 'textarea',
          label: 'Which of the responsibilities above are you strongest in, and what would you want to take on first?',
          hint: 'This is the paragraph we read most closely. Be specific about real work you have shipped.',
          rows: 5,
          required: true,
        },
        {
          id: 'mk_campaign',
          type: 'textarea',
          label: 'Describe one campaign you ran, with its numbers',
          hint: 'What you were selling, who you targeted, what you spent, and what came back. Cost per lead or per sale if you have it. If a campaign failed and you learned from it, that is a fine answer too.',
          rows: 5,
          required: true,
        },
        {
          id: 'mk_funnel',
          type: 'textarea',
          label: 'Enquiries are coming in but almost none enrol. How do you find out why?',
          hint: 'Walk us through what you would look at, in order. We are reading how you diagnose, not whether you guess the right answer.',
          rows: 4,
          required: true,
        },
      ],
    },

    // ── Skills · IT ──────────────────────────────────────────────────────────
    {
      id: 'skills-it',
      num: '05',
      title: 'Your IT experience',
      description: 'What you have supported, and how you handle it breaking.',
      showIf: { field: ROLE_FIELD, equals: ['it'] },
      fields: [
        {
          id: 'it_areas',
          type: 'checkboxgroup',
          layout: 'list',
          label: 'Areas you have real hands-on experience with',
          hint: 'Only tick what you could own today without hand-holding.',
          options: [
            { value: 'networking', label: 'Networking', description: 'IP, DNS, DHCP, routers, switches, wifi.' },
            { value: 'windows', label: 'Windows administration and user accounts' },
            { value: 'linux', label: 'Linux servers' },
            { value: 'labs', label: 'Running a computer lab or a fleet of shared machines' },
            { value: 'hardware', label: 'Hardware diagnosis and repair' },
            { value: 'av', label: 'Classroom AV', description: 'Projectors, screens, audio, recording.' },
            { value: 'backup', label: 'Backups, and testing that a restore works' },
            { value: 'email_admin', label: 'Email and shared drive administration', description: 'Google Workspace, Microsoft 365, cPanel.' },
            { value: 'security', label: 'Basic security', description: 'Antivirus, patching, access control.' },
            { value: 'cctv', label: 'CCTV or access control systems' },
          ],
        },
        {
          id: 'it_scale',
          type: 'radio',
          layout: 'pills',
          label: 'Largest setup you have been responsible for',
          halfWidth: true,
          options: [
            { value: 'under20', label: 'Under 20 machines' },
            { value: '20to50', label: '20 to 50' },
            { value: '50to150', label: '50 to 150' },
            { value: 'over150', label: 'Over 150' },
          ],
        },
        {
          id: 'it_strongest',
          type: 'textarea',
          label: 'Which of the responsibilities above are you strongest in, and what would you want to take on first?',
          hint: 'This is the paragraph we read most closely. Be specific about real work you have done.',
          rows: 5,
          required: true,
        },
        {
          id: 'it_incident',
          type: 'textarea',
          label: 'Tell us about something that broke at the worst possible moment',
          hint: 'What failed, how you worked out why, what you did, and how long it took. We are interested in how you think when people are waiting on you.',
          rows: 5,
          required: true,
        },
        {
          id: 'it_lab_down',
          type: 'textarea',
          label: 'A lab of 40 machines loses internet ten minutes into a mock exam. What do you do?',
          hint: 'In order. We are reading your diagnosis and what you prioritise, not a textbook answer.',
          rows: 4,
          required: true,
        },
        {
          id: 'it_certs',
          type: 'text',
          label: 'Certifications, if any',
          placeholder: 'e.g. CCNA, CompTIA A+, MCSA',
          hint: 'Optional. We care more about what you have actually fixed.',
        },
      ],
    },

    // ── Availability ─────────────────────────────────────────────────────────
    {
      id: 'logistics',
      num: '06',
      title: 'Availability and working style',
      description: 'When you can start and how you prefer to work.',
      fields: [
        { id: 'start_date', type: 'date', label: 'Earliest start date', halfWidth: true },
        {
          id: 'compensation_expectation',
          type: 'text',
          label: 'Salary expectation',
          hint: 'Monthly, so it is easy to compare. Quote it in PKR.',
          placeholder: 'e.g. 80,000 PKR / month',
          required: true,
          halfWidth: true,
        },
        {
          id: 'work_mode',
          type: 'radio',
          layout: 'pills',
          label: 'How would you prefer to work?',
          options: [
            { value: 'onsite', label: 'On site' },
            { value: 'hybrid', label: 'Hybrid' },
            { value: 'remote', label: 'Remote' },
            { value: 'any', label: 'Open to any' },
          ],
        },
        {
          id: 'can_commute',
          type: 'radio',
          layout: 'pills',
          label: 'Can you work from our campus if the role requires it?',
          required: true,
          options: [
            { value: 'yes', label: 'Yes' },
            { value: 'relocate', label: 'Yes, but I would need to relocate' },
            { value: 'no', label: 'No, remote only' },
          ],
        },
        { id: 'notice_period', type: 'text', label: 'Notice period, if any', halfWidth: true },
      ],
    },

    // ── Uploads ──────────────────────────────────────────────────────────────
    {
      id: 'uploads',
      num: '07',
      title: 'Resume and work samples',
      description: 'Files are stored securely and used only for this application.',
      fields: [
        {
          id: 'resume',
          type: 'file',
          label: 'Resume / CV',
          hint: 'PDF preferred.',
          accept: '.pdf,.doc,.docx',
          multiple: false,
          required: true,
        },
        {
          id: 'work_samples',
          type: 'file',
          label: 'Work samples',
          hint: 'Optional. Case studies, code, design exports, a test plan, anything relevant. Multiple files are fine.',
          multiple: true,
        },
      ],
    },

    // ── Anything else ────────────────────────────────────────────────────────
    {
      id: 'anything-else',
      num: '08',
      title: 'Anything else',
      description: 'Last chance to tell us something the questions above missed.',
      fields: [
        { id: 'referral_source', type: 'text', label: 'How did you hear about this role?', halfWidth: true },
        {
          id: 'questions_for_us',
          type: 'textarea',
          label: 'Questions for us',
          hint: 'Anything you want to know about the role, the team, or how we work.',
          rows: 3,
        },
        { id: 'notes', type: 'textarea', label: 'Anything else you would like us to know', rows: 3 },
      ],
    },
  ],
};

export default worldTimesHiring;
