import type { FormConfig } from '@/lib/types';

// ── Maxxlab hiring — Full-Stack / Frontend / QA / UI-UX ──────────────────────
// One form, four tracks. Section 01 asks which role you're applying for and
// every role-specific section below is gated on that answer via `showIf`, so an
// applicant only ever sees (and only ever gets emailed back) their own track.

const ROLE_FIELD = 'role';

const hiringProductTeam: FormConfig = {
  id: 'hiring-product-team',
  slug: 'hiring-product-team',
  title: 'Maxxlab Team Application · Full-Stack · Frontend · QA · UI/UX',
  heroAccent: 'Application',
  eyebrow: 'Maxxlab · Hiring · Remote · Canadian hours overlap',
  description:
    "We're hiring across engineering, quality and design. Pick your role and we'll only ask what's relevant to it.",
  client: 'Maxxlab',
  layout: 'steps',
  footerNote: 'Questions about the role? Contact: admin@maxxlab.tech',
  sections: [
    // ── 01 · Role picker (always shown) ──────────────────────────────────────
    {
      id: 'role-select',
      num: '01',
      title: 'Which role are you applying for?',
      description:
        'Pick one and the rest of the form changes to match. All four are fully remote.',
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
              badge: 'Closed',
              badgeVariant: 'red',
              description: 'TypeScript, Node + Hono, raw SQL on Postgres, React 19.',
              disabled: true,
              disabledNote: '114 / 114 applications received. Applications are closed.',
            },
            {
              value: 'frontend',
              label: 'Frontend Developer',
              badge: 'Engineering',
              badgeVariant: 'blue',
              description: 'React 19, Vite, vanilla-extract, design systems, accessibility.',
            },
            {
              value: 'qa',
              label: 'QA Tester',
              badge: 'Quality',
              badgeVariant: 'green',
              description: 'End-to-end product testing, accessibility, payments, multi-tenant.',
            },
            {
              value: 'uiux',
              label: 'UI/UX Designer',
              badge: 'Design',
              badgeVariant: 'amber',
              description: 'Figma, design systems, prototypes, developer handoff.',
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
      description: 'TypeScript Product Engineering. Fully remote.',
      showIf: { field: ROLE_FIELD, equals: ['fullstack'] },
      fields: [
        {
          id: 'fs_brief_intro',
          type: 'note',
          body: [
            'Maxxlab builds custom software and AI-driven products for clients: full digital platforms, multi-tenant SaaS, and intelligent automation. We’re expanding our engineering team and looking for a full-stack developer who wants to ship real, production-grade products with us, not for a single contract but as a long-term part of a fast-moving team that ships across multiple client projects.',
            'You’ll build features end-to-end on a modern, lean TypeScript stack: typed APIs on the backend, React on the frontend, and a Postgres data layer you understand down to the SQL. If you like owning a feature from schema to screen, this is for you.',
          ],
        },
        {
          id: 'fs_brief_backend',
          type: 'note',
          label: "What you'll work on · Backend & API",
          body: [
            '- Design and build HTTP APIs with Node, TypeScript and Hono, with Zod schemas validating every input and output',
            '- Write raw SQL against PostgreSQL: schema design, migrations, indexing, and query performance. We don’t use an ORM, and we consider that a feature',
            '- Build multi-tenant data layers with strict tenant isolation, RBAC, and auditability. Data never leaks across tenants, a hard requirement on everything we build',
            '- Implement authentication and session flows (bcrypt password handling, secure session/token design)',
            '- Integrate Stripe for payments: Stripe Elements checkout, webhook handling with signature verification, and subscription logic',
          ],
        },
        {
          id: 'fs_brief_frontend',
          type: 'note',
          label: 'Frontend',
          body: [
            '- Build product UIs with React 19 on Vite and React Router 7',
            '- Style with vanilla-extract: type-safe, build-time CSS with design tokens as CSS custom properties (our products are white-labelled per tenant at runtime, so tokens matter)',
            '- Ship accessible interfaces. WCAG 2.1 AA is a CI gate for us, not an afterthought',
          ],
        },
        {
          id: 'fs_brief_quality',
          type: 'note',
          label: 'Quality & delivery',
          body: [
            '- Write and maintain tests with Vitest',
            '- Work in a pnpm monorepo with Biome for lint/format',
            '- Git-based collaborative workflow with real code review',
          ],
        },
        {
          id: 'fs_brief_how',
          type: 'note',
          label: 'How we work',
          variant: 'callout',
          body: [
            'You’ll have direct access to the founders and work closely with a technical lead who reviews your code and helps you grow, not just approves PRs. Because our client projects vary, you’ll get exposure to new stacks and problems over time rather than being locked into one codebase.',
            'Location: fully remote, with working-hours overlap on Canadian business hours (~9-5 ET).',
          ],
        },
      ],
    },

    // ── Role brief · Frontend ────────────────────────────────────────────────
    {
      id: 'brief-frontend',
      num: '02',
      title: 'The role · Frontend Developer',
      description: 'React and design sense. Fully remote.',
      showIf: { field: ROLE_FIELD, equals: ['frontend'] },
      fields: [
        {
          id: 'fe_brief_intro',
          type: 'note',
          body: [
            "Maxxlab builds custom software and AI-driven products for clients, and the frontends we ship are white-labelled, accessible, and design-system-driven. We're looking for a frontend developer who cares about the details, not just whether a screen renders but whether it feels right, and who wants to be a long-term part of a fast-moving team across multiple client projects rather than a single-contract hire.",
            "You'll own the frontend. Designs and high-fidelity prototypes come to you decided; you turn them into production React that holds up across tenants, breakpoints, and every state the data can be in.",
          ],
        },
        {
          id: 'fe_brief_work',
          type: 'note',
          label: "What you'll be working on",
          body: [
            '- Build product UIs with React 19, Vite, and React Router 7 in a pnpm monorepo',
            '- Implement design systems with vanilla-extract. Every colour is a CSS custom property, because our products re-theme per tenant at runtime. A hardcoded hex in a component is a broken feature, not a style nit',
            '- Build every screen in every state: populated, empty, zero-data, loading, and error are all designed states, not afterthoughts',
            '- Ship WCAG 2.1 AA-compliant interfaces: visible focus everywhere, 44px touch targets, status never carried by colour alone. This is a CI gate on everything we release',
            '- Build responsive layouts from 375px up',
            '- Turn high-fidelity prototypes and written specifications into production components faithfully, without silently dropping functionality',
            '- Consume typed APIs (Zod-validated contracts) and handle loading, error, and retry flows properly',
            '- Write component and interaction tests with Vitest, in a codebase kept clean with Biome',
          ],
        },
        {
          id: 'fe_brief_sense',
          type: 'note',
          label: 'Design sense matters',
          body: [
            "We're not looking for someone who only implements what they're handed. A prototype never covers everything. You'll make dozens of small calls a week that nobody mocked up, and we want those calls to be good ones.",
            '- Recognise when something feels cluttered, unbalanced, or inconsistent, and know what to change',
            '- Get spacing, hierarchy, and typography right without being told the exact values',
            "- Fill in the states and edge cases a design didn't cover, in keeping with the rest of the system",
            '- Know when to follow the existing design system and when a pattern genuinely needs to evolve',
            "- Push back when a design won't survive real data, a narrow screen, or a keyboard, before it's built rather than after",
            '- Defend a decision with reasoning rather than "it looks better"',
            "On some projects there'll be a designer and a Figma file. On others there'll be a rough prototype, a written spec, and you. Both need to end up looking like we meant it.",
          ],
        },
        {
          id: 'fe_brief_how',
          type: 'note',
          label: 'How we work',
          variant: 'callout',
          body: [
            "You'll have direct access to the founders and work closely with a technical lead who reviews your code and helps you grow, not just approves PRs. Our process is a short technical assessment, then a trial period, then paid probation. Strong performers move into a permanent, long-term role from there. Because our client projects vary, you'll get exposure to new products and problems over time rather than being locked into one codebase.",
            'Location: fully remote, with working-hours overlap on Canadian business hours (~9-5 ET).',
          ],
        },
      ],
    },

    // ── Role brief · QA ──────────────────────────────────────────────────────
    {
      id: 'brief-qa',
      num: '02',
      title: 'The role · QA Tester',
      description: 'Product Quality and Release Testing. Fully remote.',
      showIf: { field: ROLE_FIELD, equals: ['qa'] },
      fields: [
        {
          id: 'qa_brief_intro',
          type: 'note',
          body: [
            'Maxxlab builds custom software and AI-driven products for clients, and we ship products where correctness is contractual: multi-tenant data isolation, payment flows, and accessibility gates.',
            'We’re looking for a QA tester who breaks things methodically and writes it up so a developer can fix it in one read. Someone who wants to be a long-term part of a fast-moving team across multiple client projects.',
          ],
        },
        {
          id: 'qa_brief_work',
          type: 'note',
          label: "What you'll be working on",
          body: [
            '- Test web applications end-to-end against written specifications and acceptance criteria: functional, regression, and exploratory testing',
            '- Verify every screen in every state: populated, empty, zero-data, loading, and error',
            '- Test edge cases and business rules, not just happy paths: gated flows, empty accounts, declined payments, expired sessions',
            '- Accessibility testing against WCAG 2.1 AA: keyboard navigation, focus visibility, touch targets, and screen reader spot checks',
            '- Responsive testing from 375px up, across browsers and devices',
            '- Test payment flows (Stripe test mode) and multi-tenant behaviour, including confirming data never appears across tenants',
            '- Write clear, reproducible bug reports: steps, expected vs. actual, severity, environment',
            '- Maintain test plans and regression checklists per release; verify fixes and close the loop with developers',
          ],
        },
        {
          id: 'qa_brief_how',
          type: 'note',
          label: 'How we work',
          variant: 'callout',
          body: [
            'You’ll have direct access to the founders and work closely with a technical lead who helps you grow. Because our client projects vary, you’ll get exposure to new products and problems over time rather than being locked into one codebase.',
            'Location: fully remote, with working-hours overlap on Canadian business hours (~9-5 ET).',
          ],
        },
      ],
    },

    // ── Role brief · UI/UX ───────────────────────────────────────────────────
    {
      id: 'brief-uiux',
      num: '02',
      title: 'The role · UI/UX Designer',
      description: 'Figma and design systems. Fully remote.',
      showIf: { field: ROLE_FIELD, equals: ['uiux'] },
      fields: [
        {
          id: 'ux_brief_intro',
          type: 'note',
          body: [
            'Maxxlab builds custom software and AI-driven products for clients, and we’re looking for a UI/UX designer who cares about the details, not just how a screen looks but how the entire product feels, behaves, and gets handed off to engineering.',
            'We’re looking for someone with a strong design sense, excellent visual judgment, and a product mindset. Someone who can look at a design and understand what feels right, what feels off, and why.',
          ],
        },
        {
          id: 'ux_brief_work',
          type: 'note',
          label: "What you'll be working on",
          body: [
            '- Design high-fidelity UI screens, wireframes, and interactive prototypes in Figma',
            '- Translate product requirements, user flows, and written specifications into polished, intuitive interfaces',
            '- Build complete user flows rather than isolated screens, including loading, empty, zero-data, success, error, disabled, hover, focus, and validation states',
            '- Create and maintain scalable Figma design systems with reusable components, variants, properties, variables, typography, spacing, colour tokens, and responsive patterns',
            '- Create interactive prototypes that communicate real product behaviour and edge cases',
            '- Prepare professional developer handoffs with component naming, measurements, spacing, states, annotations, assets, and interaction notes',
            '- Understand Storybook and component-driven development, including how Figma components and variants translate into coded components',
            '- Review implemented interfaces and perform design QA against the original Figma designs',
            "- You'll hand off directly to full-stack developers, not to a frontend specialist. Your handoff has to be complete enough that someone whose main job is the backend can build your screen correctly without asking you three questions a day",
            '- Keep Figma files professionally organized and structured for long-term team usage',
          ],
        },
        {
          id: 'ux_brief_sense',
          type: 'note',
          label: 'Design sense matters',
          body: [
            'We’re not looking for someone who simply knows how to use Figma. You should have a strong eye for what makes a product feel polished and professional, and be able to make those decisions intentionally.',
            '- Take a rough idea and turn it into a clean, well-structured product experience',
            '- Recognize when a design feels cluttered, unbalanced, inconsistent, or visually weak',
            '- Create hierarchy without over-designing, and keep interfaces simple without making them feel empty',
            '- Think about user experience, business requirements, and engineering constraints together',
            '- Defend design decisions with reasoning rather than "it looks better"',
            '- Know when to follow an existing design system and when a pattern genuinely needs to evolve',
          ],
        },
        {
          id: 'ux_brief_how',
          type: 'note',
          label: 'How we work',
          variant: 'callout',
          body: [
            'We don’t want designers who throw designs over the wall to engineering. We want someone who owns the complete lifecycle: Idea → UX → Wireframes → High-Fidelity UI → Design System → Prototype → Developer Handoff → Implementation → Design QA.',
            'You’ll have direct access to the founders and work closely with developers and a technical lead. Because our client projects vary, you’ll work across different products, industries, and design challenges rather than one visual style.',
            'Location: fully remote, with working-hours overlap on Canadian business hours (~9-5 ET).',
          ],
        },
      ],
    },

    // ── Basics (always shown) ────────────────────────────────────────────────
    {
      id: 'basics',
      num: '03',
      title: 'You, in brief',
      description: 'The essentials: who you are and how to reach you.',
      fields: [
        { id: 'full_name', type: 'text', label: 'Full name', required: true, halfWidth: true },
        { id: 'email', type: 'email', label: 'Email address', required: true, halfWidth: true },
        { id: 'phone', type: 'phone', label: 'Phone / WhatsApp', halfWidth: true },
        { id: 'location', type: 'text', label: 'Location & timezone', hint: 'We need overlap with ~9-5 ET.', halfWidth: true },
        { id: 'linkedin_url', type: 'url', label: 'LinkedIn profile', halfWidth: true },
        { id: 'portfolio_url', type: 'url', label: 'Portfolio / personal site', halfWidth: true },
      ],
    },

    // ── About you (always shown) ─────────────────────────────────────────────
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
          hint: 'Your background, what you care about in your craft, and what kind of products you want to work on.',
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
            { value: '1to2', label: '1-2 years' },
            { value: '3to5', label: '3-5 years' },
            { value: '5to8', label: '5-8 years' },
            { value: '8plus', label: '8+ years' },
          ],
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
      description: "Where you're strongest across the stack, and the work that proves it.",
      showIf: { field: ROLE_FIELD, equals: ['fullstack'] },
      fields: [
        {
          id: 'fs_core_skills',
          type: 'checkboxgroup',
          layout: 'list',
          label: 'Core skills: select what you have real production experience with',
          hint: 'Only tick what you could own today without hand-holding.',
          options: [
            { value: 'ts_prod', label: 'TypeScript in production', description: 'Both backend and frontend.' },
            { value: 'node_rest', label: 'Node.js and REST API design' },
            { value: 'sql_postgres', label: 'SQL & PostgreSQL fundamentals', description: "Comfortable without an ORM: schema design, indexing, query performance." },
            { value: 'react', label: 'React and modern frontend tooling', description: 'Vite or similar.' },
            { value: 'tested_code', label: 'Writing tested, reviewed code' },
          ],
        },
        {
          id: 'fs_bonus_skills',
          type: 'checkboxgroup',
          layout: 'list',
          label: 'Bonus skills: any of these make you stand out',
          options: [
            { value: 'hono_fastify', label: 'Hono, Fastify, or other lightweight Node frameworks' },
            { value: 'zod', label: 'Zod or other schema-validation libraries' },
            { value: 'token_css', label: 'vanilla-extract, CSS Modules, or other token-driven styling' },
            { value: 'stripe', label: 'Stripe or comparable payment integrations' },
            { value: 'multi_tenant', label: 'Multi-tenant or SaaS-style product experience' },
            { value: 'llm', label: 'LLM / AI feature integration' },
            { value: 'wcag', label: 'Accessibility (WCAG) experience' },
            { value: 'monorepo', label: 'pnpm monorepos, Biome, or Vitest' },
          ],
        },
        {
          id: 'fs_strongest',
          type: 'textarea',
          label: "Which responsibilities are you strongest in and ready to take on, and what are you most excited to work on next?",
          hint: 'This is the paragraph we read most closely. Be specific about real work you have shipped.',
          rows: 5,
          required: true,
        },
        {
          id: 'fs_sql_comfort',
          type: 'textarea',
          label: 'Tell us about your SQL experience without an ORM',
          hint: 'Schema you designed, a query you had to optimise, or a migration that went sideways. Anything concrete.',
          rows: 3,
        },
        {
          id: 'fs_github_url',
          type: 'url',
          label: 'GitHub profile',
          required: true,
          halfWidth: true,
        },
        {
          id: 'fs_repo_highlight',
          type: 'url',
          label: 'The one repo we should look at first',
          hint: 'Best representation of your full-stack work.',
          halfWidth: true,
        },
      ],
    },

    // ── Skills · Frontend ────────────────────────────────────────────────────
    {
      id: 'skills-frontend',
      num: '05',
      title: 'Your frontend experience',
      description: "What you've built, and how much of the detail you own.",
      showIf: { field: ROLE_FIELD, equals: ['frontend'] },
      fields: [
        {
          id: 'fe_core_skills',
          type: 'checkboxgroup',
          layout: 'list',
          label: 'Core skills: select what you have real production experience with',
          hint: 'Only tick what you could own today without hand-holding.',
          options: [
            { value: 'react_prod', label: 'React in production' },
            { value: 'typescript', label: 'Strong TypeScript' },
            { value: 'css', label: 'CSS fundamentals', description: 'Layout, typography, responsive behaviour, beyond utility frameworks.' },
            { value: 'faithful', label: 'Implementing a design faithfully from a prototype or spec' },
            { value: 'states', label: 'Building complete states', description: 'Loading, empty, error, disabled, focus, validation.' },
            { value: 'figma_specs', label: 'Reading a Figma file and pulling specs from it directly', description: 'Components, variants, variables, measurements.' },
            { value: 'tested', label: 'Writing tested, reviewed code' },
          ],
        },
        {
          id: 'fe_bonus_skills',
          type: 'checkboxgroup',
          layout: 'list',
          label: 'Bonus skills: any of these make you stand out',
          options: [
            { value: 'css_in_js', label: 'vanilla-extract, CSS Modules, or Stitches', description: "Note: we don't use Tailwind." },
            { value: 'tokens', label: 'Design tokens, theming, or white-label / multi-tenant products' },
            { value: 'a11y', label: 'Accessibility work', description: 'axe, Lighthouse, keyboard and screen reader testing.' },
            { value: 'vite_router', label: 'Vite and React Router 7' },
            { value: 'storybook', label: 'Storybook or component-driven development' },
            { value: 'tooling', label: 'Vitest, pnpm monorepos, or Biome' },
            { value: 'dashboards', label: 'Dashboards, complex workflows, or data-heavy applications' },
            { value: 'dataviz', label: 'Data visualization' },
            { value: 'animation', label: 'Animation and interaction detail' },
          ],
        },
        {
          id: 'fe_strongest',
          type: 'textarea',
          label: 'Which responsibilities are you strongest in, and what are you most excited to work on next?',
          hint: 'This is the paragraph we read most closely. Be specific about real work you have shipped.',
          rows: 5,
          required: true,
        },
        {
          id: 'fe_handed_design',
          type: 'textarea',
          label: 'Tell us about a UI you built where the design was handed to you',
          hint: "How close was the result, and where did you have to make calls the design didn't cover? Those calls are the part we're interested in.",
          rows: 5,
        },
        {
          id: 'fe_theming',
          type: 'textarea',
          label: 'How do you structure styles for a product that re-themes per client?',
          hint: "Tokens, custom properties, whatever you've actually used, and what breaks when someone hardcodes a value.",
          rows: 4,
        },
        {
          id: 'fe_taste',
          type: 'textarea',
          label: 'Show us a piece of interface you think is well made, and one you think is weak',
          hint: "Anything public: an app, a site, a single screen. Say why in each case. We're testing your eye, not your diplomacy.",
          rows: 5,
        },
        {
          id: 'fe_github_url',
          type: 'url',
          label: 'GitHub profile',
          halfWidth: true,
        },
        {
          id: 'fe_live_url',
          type: 'url',
          label: 'A live UI we can click through',
          hint: "The best representation of your frontend work. Make sure it's publicly accessible.",
          halfWidth: true,
        },
        {
          id: 'fe_repo_highlight',
          type: 'url',
          label: 'The one repo we should look at first',
          hint: 'Optional. If the code tells a better story than the live version.',
        },
      ],
    },

    // ── Skills · QA ──────────────────────────────────────────────────────────
    {
      id: 'skills-qa',
      num: '05',
      title: 'Your QA experience',
      description: 'How you test, and how you write it up. The written answers below matter more to us than the checkboxes, so take your time on them.',
      showIf: { field: ROLE_FIELD, equals: ['qa'] },
      fields: [
        {
          id: 'qa_core_skills',
          type: 'checkboxgroup',
          layout: 'list',
          label: 'Core skills: select what you have hands-on experience with',
          options: [
            { value: 'web_testing', label: 'Testing web applications hands-on' },
            { value: 'spec_to_cases', label: 'Deriving test cases from a spec', description: "Including what the spec implies but doesn't spell out." },
            { value: 'bug_reports', label: 'Clear written bug reports', description: 'Steps, expected vs. actual, severity, environment.' },
            { value: 'devtools', label: 'Browser dev tools' },
            { value: 'regression', label: 'Regression checklists and test plans per release' },
          ],
        },
        {
          id: 'qa_bonus_skills',
          type: 'checkboxgroup',
          layout: 'list',
          label: 'Bonus skills: any of these make you stand out',
          options: [
            { value: 'api_testing', label: 'API testing', description: 'Postman or similar.' },
            { value: 'automation', label: 'Test automation exposure', description: "Playwright, Vitest. We'd grow this over time." },
            { value: 'a11y_tools', label: 'Accessibility testing tools', description: 'axe, Lighthouse, screen readers.' },
            { value: 'istqb', label: 'ISTQB or equivalent certification' },
            { value: 'payments_saas', label: 'Testing payments, SaaS, or multi-tenant products' },
            { value: 'responsive', label: 'Cross-browser and responsive testing from 375px up' },
          ],
        },
        {
          id: 'qa_strongest',
          type: 'textarea',
          label: "Which responsibilities are you strongest in, and what are you most excited to work on next?",
          hint: 'This is the paragraph we read most closely.',
          rows: 5,
          required: true,
        },
        {
          id: 'qa_bug_report',
          type: 'textarea',
          label: "Paste a bug report you've written",
          hint: "Real one from real work, redacted however you need. Change product and company names, that's fine. Include whatever you'd normally include: title, environment, steps, expected vs. actual, severity. If you'd rather write a fresh one against any public website, do that instead and tell us which site.",
          rows: 10,
          required: true,
        },
        {
          id: 'qa_checkout_scenario',
          type: 'textarea',
          label: 'A checkout page takes a card, applies a discount code, and starts a monthly subscription. Where do you start testing, and what are the first ten things you\u2019d try?',
          hint: "Don't write a full test plan. We want to see how you think about coverage and what you reach for first. Bullet points are fine.",
          rows: 10,
          required: true,
        },
        {
          id: 'qa_escaped_bug',
          type: 'textarea',
          label: "Tell us about a bug that reached users on something you'd tested",
          hint: 'Everyone has one. What was it, why did it get past you, and what did you change afterwards. We\u2019re more interested in the "what changed afterwards" than the bug.',
          rows: 8,
          required: true,
        },
        {
          id: 'qa_doc_link',
          type: 'url',
          label: 'A test plan, checklist, or QA doc we can open',
          hint: 'Optional. Google Doc, Notion, Sheet, however you actually work. Make sure the link is publicly viewable.',
        },
      ],
    },

    // ── Skills · UI/UX ───────────────────────────────────────────────────────
    {
      id: 'skills-uiux',
      num: '05',
      title: 'Your design experience',
      description: 'Figma depth, design systems, and how you hand off to engineering.',
      showIf: { field: ROLE_FIELD, equals: ['uiux'] },
      fields: [
        {
          id: 'ux_core_skills',
          type: 'checkboxgroup',
          layout: 'list',
          label: 'Core skills: select what you have real hands-on experience with',
          options: [
            { value: 'figma', label: 'Figma: components, variants, variables, styles' },
            { value: 'hifi', label: 'High-fidelity UI, wireframes, and interactive prototypes' },
            { value: 'design_systems', label: 'Design systems and reusable component libraries' },
            { value: 'states', label: 'Designing complete states and edge cases', description: 'Loading, empty, error, disabled, focus, validation.' },
            { value: 'responsive', label: 'Responsive web and mobile design across breakpoints' },
            { value: 'handoff', label: 'Professional developer handoffs', description: 'Naming, measurements, annotations, assets, interaction notes.' },
            { value: 'tokens', label: 'Design tokens and variables', description: 'Figma variables and styles structured so they map cleanly onto CSS custom properties.' },
            { value: 'frontend_fundamentals', label: 'Frontend fundamentals', description: 'HTML, CSS, responsive behaviour, component-based UI.' },
          ],
        },
        {
          id: 'ux_bonus_skills',
          type: 'checkboxgroup',
          layout: 'list',
          label: 'Bonus skills: any of these make you stand out',
          options: [
            { value: 'storybook', label: 'Storybook and component-driven development' },
            { value: 'figma_to_code', label: 'Understanding how Figma components map to coded components' },
            { value: 'react_teams', label: 'Working alongside React / frontend teams' },
            { value: 'wcag', label: 'Accessibility and WCAG principles' },
            { value: 'white_label', label: 'White-label, multi-theme, or SaaS products' },
            { value: 'dashboards', label: 'Dashboards, complex workflows, or data-heavy applications' },
            { value: 'framer', label: 'Framer or other modern prototyping tools' },
            { value: 'git', label: 'Basic Git / GitHub and frontend workflows' },
            { value: 'design_qa', label: 'Performing design QA on live products' },
            { value: 'html_to_system', label: 'Turning existing frontend implementations into reusable design-system patterns' },
          ],
        },
        {
          id: 'ux_strongest',
          type: 'textarea',
          label: "Which responsibilities are you strongest in, and what are you most excited to work on next?",
          hint: 'This is the paragraph we read most closely.',
          rows: 5,
          required: true,
        },
        {
          id: 'ux_systems_handoff',
          type: 'textarea',
          label: 'How do you approach design systems and developer handoffs?',
          hint: 'How you structure a Figma file, name components, and what you give engineering so nothing gets lost.',
          rows: 4,
          required: true,
        },
        {
          id: 'ux_nonspecialist_handoff',
          type: 'textarea',
          label: "Have you handed designs to developers who weren't frontend specialists?",
          hint: 'What went wrong the first time, and what you changed about your handoff afterwards.',
          rows: 4,
        },
        {
          id: 'ux_storybook',
          type: 'textarea',
          label: 'Your experience with Storybook or frontend component libraries',
          hint: "If you haven't used it, say so and tell us how you think about Figma components mapping to coded ones.",
          rows: 3,
        },
        {
          id: 'ux_design_decision',
          type: 'textarea',
          label: 'Describe a design decision you had to defend with reasoning',
          hint: 'What the disagreement was, how you argued it, and what happened.',
          rows: 3,
        },
        {
          id: 'ux_figma_url',
          type: 'url',
          label: 'Figma portfolio link',
          hint: "Optional. If you have no public link, upload work in Resume & work samples instead. Make sure anything you link is publicly viewable.",
          halfWidth: true,
        },
        {
          id: 'ux_product_links',
          type: 'url',
          label: 'A live product you designed',
          hint: 'Optional. A shipped product we can click through.',
          halfWidth: true,
        },
        {
          id: 'ux_board_url',
          type: 'url',
          label: 'A working board we can open',
          hint: 'FigJam, Miro, Notion, Linear, however you run a project. We want to see how you organise and structure a board, not a polished deliverable. Make sure the link is publicly viewable.',
        },
      ],
    },

    // ── Availability (always shown) ──────────────────────────────────────────
    {
      id: 'logistics',
      num: '06',
      title: 'Availability & working style',
      description:
        'Fully remote, with working-hours overlap on Canadian business hours.',
      fields: [
        { id: 'start_date', type: 'date', label: 'Earliest start date', halfWidth: true },
        {
          id: 'compensation_expectation',
          type: 'text',
          label: 'Compensation expectation',
          hint: 'Monthly or hourly, whatever is easiest to compare. Quote it in CAD.',
          placeholder: 'e.g. $150/month CAD',
          halfWidth: true,
        },
        {
          id: 'weekly_hours',
          type: 'radio',
          layout: 'pills',
          label: 'Hours you can commit per week',
          options: [
            { value: 'under20', label: 'Under 20' },
            { value: '20to30', label: '20-30' },
            { value: '30to40', label: '30-40' },
            { value: '40plus', label: '40+' },
          ],
        },
        {
          id: 'et_overlap',
          type: 'text',
          label: 'Your daily overlap with Canadian business hours (~9-5 ET)',
          hint: 'Give us a rough window in your own timezone. This one genuinely matters to us.',
          required: true,
        },
      ],
    },

    // ── Uploads (always shown) ───────────────────────────────────────────────
    {
      id: 'uploads',
      num: '07',
      title: 'Resume & work samples',
      description:
        'Files are stored securely and used only for this application.',
      fields: [
        {
          id: 'resume',
          type: 'file',
          label: 'Resume / CV',
          hint: 'PDF preferred. If you would rather send a LinkedIn profile, put it in the section above and skip this.',
          accept: '.pdf,.doc,.docx',
          multiple: false,
          required: true,
        },
        {
          id: 'work_samples',
          type: 'file',
          label: 'Work samples',
          hint: 'Optional. Case studies, a bug report or test plan, design exports, code samples, anything relevant. Multiple files OK.',
          multiple: true,
        },
      ],
    },

    // ── Anything else (always shown) ─────────────────────────────────────────
    {
      id: 'anything-else',
      num: '08',
      title: 'Anything else',
      description: "Last chance to tell us something the questions above missed.",
      fields: [
        { id: 'referral_source', type: 'text', label: 'How did you hear about this role?', halfWidth: true },
        { id: 'notice_period', type: 'text', label: 'Notice period, if any', halfWidth: true },
        {
          id: 'questions_for_us',
          type: 'textarea',
          label: 'Questions for us',
          hint: 'Anything you want to know about the role, the team, or how we work.',
          rows: 3,
        },
        { id: 'notes', type: 'textarea', label: "Anything else you'd like us to know", rows: 3 },
      ],
    },
  ],
};

export default hiringProductTeam;
