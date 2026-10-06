import type { FormConfig } from '@/lib/types';

// ── World Times Institute hiring · technology team ───────────────────────────
// One form, four tracks. Section 01 asks which role you are applying for and
// every role-specific section below is gated on that answer via `showIf`, so an
// applicant only ever sees their own track.
//
// The institute runs exam-preparation programmes; this team builds and runs the
// software behind them: the public site, admissions, the student portal and the
// mock-test platform.

const ROLE_FIELD = 'role';

const worldTimesHiring: FormConfig = {
  id: 'worldtimes-hiring',
  slug: 'worldtimes-hiring',
  brand: 'worldtimes',
  title: 'Technology Team Application',
  heroAccent: 'Application',
  eyebrow: 'World Times Institute · Hiring · Technology team',
  description:
    'We are building our in-house technology team. Pick the role you are applying for and the rest of the form changes to match it.',
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
