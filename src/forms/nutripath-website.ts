import type { FormConfig } from '@/lib/types';

const nutriPathWebsite: FormConfig = {
  id: 'nutripath-website',
  slug: 'nutripath-website',
  title: 'NutriPath · Website Discovery',
  heroAccent: 'discovery',
  eyebrow: 'Phase 0 · Pre-meeting · Form 1 of 2',
  description: "Fill what you know — leave blank what you don't, and we'll walk through it together in our meeting.",
  client: 'NutriPath',
  sections: [
    {
      id: 'identity',
      num: '01',
      title: 'Project identity',
      description: "Who we're building for, and who we'll be working with day-to-day.",
      fields: [
        {
          id: 'legal_name',
          type: 'text',
          label: 'NutriPath legal entity name',
          placeholder: 'e.g. NutriPath Education Inc.',
          required: true,
        },
        {
          id: 'lead_name',
          type: 'text',
          label: 'Primary project lead — full name',
          placeholder: 'Full name',
          halfWidth: true,
        },
        {
          id: 'lead_email',
          type: 'email',
          label: 'Project lead email',
          placeholder: 'Email address',
          halfWidth: true,
        },
        {
          id: 'lead_phone',
          type: 'phone',
          label: 'Phone / WhatsApp',
          placeholder: 'Optional',
        },
        {
          id: 'sig_name',
          type: 'text',
          label: 'Signature authority name (if different)',
          placeholder: 'Full name',
          halfWidth: true,
        },
        {
          id: 'sig_email',
          type: 'email',
          label: 'Signature authority email',
          placeholder: 'Email address',
          halfWidth: true,
        },
        {
          id: 'stakeholders',
          type: 'textarea',
          label: 'Other stakeholders we should know about',
          hint: "e.g., marketing lead, IT lead, faculty representative — anyone whose sign-off matters",
          placeholder: 'Name — Role — Email',
          rows: 3,
        },
      ],
    },

    {
      id: 'goals',
      num: '02',
      title: 'Goals & success metrics',
      description: "Why this website exists, and how we'll know it worked.",
      fields: [
        {
          id: 'purpose',
          type: 'checkboxgroup',
          label: 'What is the primary purpose of this website?',
          layout: 'list',
          options: [
            { value: 'marketing', label: 'Marketing & awareness', description: 'Tell the NutriPath story to prospective learners' },
            { value: 'enrolment', label: 'Enrolment funnel', description: 'Drive sign-ups for CDRE Platform / programs' },
            { value: 'credibility', label: 'Credibility & partnerships', description: 'Position NutriPath for institutional credibility' },
            { value: 'content', label: 'Content / blog hub', description: 'SEO-driven content marketing' },
            { value: 'other', label: 'Other', description: 'Tell us in notes below' },
          ],
        },
        {
          id: 'success',
          type: 'textarea',
          label: 'What does success look like 6 months after launch?',
          hint: 'e.g., "1,000 CDRE Platform sign-ups", "ranking page 1 for [keyword]", "30 partner inquiries"',
          placeholder: 'Your success metrics',
          rows: 3,
        },
      ],
    },

    {
      id: 'pages',
      num: '03',
      title: 'Page architecture',
      description: 'What pages we\'ll build, and how they connect.',
      fields: [
        {
          id: 'page_count',
          type: 'radio',
          label: 'Estimated page count',
          layout: 'pills',
          options: [
            { value: '<5', label: 'Fewer than 5' },
            { value: '5-10', label: '5–10' },
            { value: '10-20', label: '10–20' },
            { value: '20+', label: '20+' },
            { value: 'unknown', label: 'Not sure' },
          ],
        },
        {
          id: 'core_pages',
          type: 'checkboxgroup',
          label: 'Core pages you know you\'ll need',
          layout: 'list',
          options: [
            { value: 'home', label: 'Home' },
            { value: 'about', label: 'About / Our story' },
            { value: 'programs', label: 'Programs / Courses' },
            { value: 'cdre', label: 'CDRE Platform landing', description: 'Marketing page for the LMS, linking to the platform itself' },
            { value: 'instructors', label: 'Instructors / Faculty' },
            { value: 'testimonials', label: 'Testimonials / Success stories' },
            { value: 'blog', label: 'Blog / Resources' },
            { value: 'pricing', label: 'Pricing' },
            { value: 'contact', label: 'Contact' },
            { value: 'legal', label: 'Legal — Privacy, Terms, Cookies' },
          ],
        },
        {
          id: 'other_pages',
          type: 'textarea',
          label: 'Other pages you have in mind',
          placeholder: 'List any additional pages, sub-pages, or special landing pages',
          rows: 3,
        },
      ],
    },

    {
      id: 'cms',
      num: '04',
      title: 'Content management',
      description: "How you'll edit content after launch.",
      fields: [
        {
          id: 'cms',
          type: 'radio',
          label: 'CMS preference',
          layout: 'list',
          options: [
            { value: 'webflow', label: 'Webflow', description: 'Visual editor, designer-friendly, mid-cost hosting' },
            { value: 'wordpress', label: 'WordPress', description: 'Most flexible, biggest plugin ecosystem, you manage hosting' },
            { value: 'headless', label: 'Headless (Sanity / Contentful + custom front-end)', description: 'Best for complex content models, integrates cleanly with CDRE Platform' },
            { value: 'static', label: 'Static site (no CMS)', description: 'Cheapest hosting, content edits via Maxxlab change requests' },
            { value: 'recommend', label: 'Recommend for me', description: "We'll propose based on your content velocity" },
          ],
        },
        {
          id: 'editors',
          type: 'radio',
          label: 'Who will edit content after launch?',
          layout: 'list',
          options: [
            { value: 'just-maxxlab', label: 'Just Maxxlab (via change requests)' },
            { value: '1-2-internal', label: '1–2 internal editors' },
            { value: 'team', label: 'Team of editors' },
            { value: 'unknown', label: 'Not sure yet' },
          ],
        },
      ],
    },

    {
      id: 'integrations',
      num: '05',
      title: 'Integrations',
      description: 'What the website connects to.',
      fields: [
        {
          id: 'integrations',
          type: 'checkboxgroup',
          label: 'Required integrations',
          layout: 'list',
          options: [
            { value: 'cdre-link', label: 'CDRE Platform link / SSO', description: 'Visitors should be able to sign up or log in to the CDRE LMS from the website' },
            { value: 'forms', label: 'Contact / lead forms' },
            { value: 'email-marketing', label: 'Email marketing', description: 'e.g., Mailchimp, ConvertKit, Klaviyo' },
            { value: 'crm', label: 'CRM', description: 'e.g., HubSpot, Salesforce' },
            { value: 'payments', label: 'Payments / checkout', description: 'e.g., Stripe for program enrolment' },
            { value: 'calendar', label: 'Calendar / booking', description: 'e.g., Calendly for consult calls' },
            { value: 'analytics', label: 'Analytics', description: 'e.g., GA4, Plausible, Mixpanel' },
            { value: 'chat', label: 'Live chat / support', description: 'e.g., Intercom, Crisp' },
          ],
        },
        {
          id: 'existing_tools',
          type: 'textarea',
          label: 'Specific tools you already use (and want us to connect to)',
          placeholder: 'e.g., HubSpot CRM, Mailchimp list, Stripe account',
          rows: 3,
        },
      ],
    },

    {
      id: 'hosting',
      num: '06',
      title: 'Hosting & domain',
      description: "Where your site will live and how it'll be managed.",
      fields: [
        {
          id: 'hosting',
          type: 'radio',
          label: 'Hosting management preference',
          layout: 'list',
          options: [
            { value: 'maxxlab-managed', label: 'Maxxlab-managed', description: 'We host it, monitor it, patch it. Monthly fee included.' },
            { value: 'client-owned', label: 'NutriPath-owned', description: 'You own the hosting account; we deploy into it.' },
            { value: 'cms-platform', label: 'CMS platform hosting', description: 'Webflow hosts on Webflow, WordPress on your provider, etc.' },
            { value: 'recommend', label: 'Recommend for me' },
          ],
        },
        {
          id: 'hosting_platform',
          type: 'radio',
          label: 'Hosting platform preference',
          hint: 'Which provider do you prefer, or want us to deploy to?',
          layout: 'grid',
          options: [
            { value: 'cloudflare', label: 'Cloudflare Pages', description: 'Edge-global CDN, free tier, best performance & DDoS protection', badge: 'Popular', badgeVariant: 'green' },
            { value: 'hostinger', label: 'Hostinger', description: 'Affordable shared/VPS, easy cPanel, good for WordPress', badge: 'Budget-friendly', badgeVariant: 'amber' },
            { value: 'siteground', label: 'SiteGround', description: 'Excellent WordPress performance, managed updates, staging', badge: 'Recommended WP', badgeVariant: 'green' },
            { value: 'vercel', label: 'Vercel', description: 'Best for Next.js / headless; serverless functions included', badge: 'Dev-first', badgeVariant: 'blue' },
            { value: 'netlify', label: 'Netlify', description: 'JAMstack specialist, forms & edge functions built-in', badge: 'Dev-first', badgeVariant: 'blue' },
            { value: 'wpengine', label: 'WP Engine', description: 'Premium managed WordPress; automatic backups, staging, CDN', badge: 'Managed WP', badgeVariant: 'blue' },
            { value: 'kinsta', label: 'Kinsta', description: 'Google Cloud-backed managed WordPress, top-tier speed', badge: 'Managed WP', badgeVariant: 'blue' },
            { value: 'aws', label: 'AWS / Lightsail', description: 'Full control, scalable; requires more DevOps effort', badge: 'Enterprise', badgeVariant: 'blue' },
            { value: 'digitalocean', label: 'DigitalOcean', description: 'Simple VPS / App Platform, developer-friendly, predictable pricing' },
            { value: 'godaddy', label: 'GoDaddy', description: 'Familiar brand, domain + hosting bundled, cPanel-based' },
            { value: 'bluehost', label: 'Bluehost', description: 'WordPress-endorsed, beginner-friendly, affordable plans' },
            { value: 'other', label: 'Other / Not sure', description: 'Specify below or let Maxxlab recommend' },
          ],
        },
        {
          id: 'hosting_platform_notes',
          type: 'textarea',
          label: 'Hosting notes',
          placeholder: "Any notes on hosting preference, existing accounts, or constraints (e.g., 'We already have a Hostinger account')",
          rows: 2,
        },
        {
          id: 'domain',
          type: 'radio',
          label: 'Domain status',
          layout: 'pills',
          options: [
            { value: 'owned', label: 'Already own it' },
            { value: 'need-help', label: 'Need help registering' },
            { value: 'evaluating', label: 'Evaluating options' },
          ],
        },
        {
          id: 'domain_name',
          type: 'url',
          label: 'Domain name (if known)',
          placeholder: 'e.g. nutripath.ca',
        },
      ],
    },

    {
      id: 'brand',
      num: '07',
      title: 'Brand & design',
      description: 'Visual identity and references.',
      fields: [
        {
          id: 'brand_status',
          type: 'radio',
          label: 'Brand assets status',
          layout: 'list',
          options: [
            { value: 'full-kit', label: 'Full brand kit ready', description: 'Logo, colors, fonts, voice — we send it over' },
            { value: 'partial', label: 'Partial — need help finishing', description: 'e.g., have logo but no full system' },
            { value: 'from-scratch', label: 'Build from scratch', description: 'Branding is part of scope' },
          ],
        },
        {
          id: 'design_refs',
          type: 'textarea',
          label: 'Design references / sites you admire',
          hint: 'URLs, screenshots, or descriptions — give us 3–5 you respond to',
          placeholder: 'https://...\nhttps://...\nNotes on what you like about each',
          rows: 4,
        },
        {
          id: 'competitors',
          type: 'textarea',
          label: 'Sites in the dietitian / education space you want to differentiate from',
          placeholder: 'URLs and what to avoid',
          rows: 3,
        },
      ],
    },

    {
      id: 'content',
      num: '08',
      title: 'Content',
      description: 'Copywriting and visual assets.',
      fields: [
        {
          id: 'copy',
          type: 'radio',
          label: 'Copywriting ownership',
          layout: 'list',
          options: [
            { value: 'client', label: 'NutriPath writes the copy' },
            { value: 'maxxlab', label: 'Maxxlab writes it', description: 'Add to scope; includes brand voice work' },
            { value: 'hybrid', label: 'Hybrid', description: 'You draft, we polish' },
          ],
        },
        {
          id: 'visuals',
          type: 'radio',
          label: 'Photography / illustration',
          layout: 'list',
          options: [
            { value: 'stock', label: 'Stock + AI-generated' },
            { value: 'custom', label: 'Custom photography / illustration', description: 'Adds budget; we source or shoot' },
            { value: 'mix', label: 'Mix' },
          ],
        },
      ],
    },

    {
      id: 'compliance',
      num: '09',
      title: 'Compliance, accessibility & SEO',
      fields: [
        {
          id: 'a11y_widget',
          type: 'radio',
          label: 'Accessibility widget',
          hint: 'A floating toolbar letting visitors adjust font size, contrast, dark mode, colour-blind mode, etc.',
          layout: 'list',
          options: [
            { value: 'yes', label: 'Yes — include an accessibility widget', description: 'Recommended for education / health platforms' },
            { value: 'no', label: 'No — not needed' },
            { value: 'third-party', label: 'Yes — use a third-party service', description: 'e.g., UserWay, accessiBe, Equal Web' },
            { value: 'discuss', label: 'Not sure — discuss in meeting' },
          ],
        },
        {
          id: 'a11y_level',
          type: 'checkboxgroup',
          label: 'Accessibility standard',
          layout: 'list',
          options: [
            { value: 'wcag-aa', label: 'WCAG 2.1 AA', description: 'Standard for higher-ed sites' },
            { value: 'aoda', label: 'AODA (Ontario)' },
            { value: 'basic', label: 'Basic only' },
          ],
        },
        {
          id: 'seo',
          type: 'radio',
          label: 'SEO priority',
          layout: 'pills',
          options: [
            { value: 'high', label: 'High — content/SEO is the funnel' },
            { value: 'medium', label: 'Medium — clean foundations + structured data' },
            { value: 'low', label: 'Low — paid + referral driven' },
          ],
        },
        {
          id: 'langs',
          type: 'radio',
          label: 'Languages',
          layout: 'pills',
          options: [
            { value: 'en', label: 'English only' },
            { value: 'en-fr', label: 'English + French' },
            { value: 'other', label: 'Other (specify in notes)' },
          ],
        },
      ],
    },

    {
      id: 'timeline',
      num: '10',
      title: 'Timeline & budget signal',
      fields: [
        {
          id: 'launch_date',
          type: 'date',
          label: 'Target launch date',
        },
        {
          id: 'launch_notes',
          type: 'textarea',
          label: 'Launch notes / hard deadlines',
          placeholder: 'Academic-year start, partnership announcement, etc.',
          rows: 2,
        },
        {
          id: 'budget',
          type: 'radio',
          label: 'Budget range for the website (separate from CDRE Platform)',
          layout: 'pills',
          options: [
            { value: '<1k', label: 'Under $1k' },
            { value: '1k-2k', label: '$1k–2k' },
            { value: '2k-5k', label: '$2k–5k' },
            { value: '5k+', label: '$5k+' },
            { value: 'discuss', label: 'Prefer to discuss' },
          ],
        },
        {
          id: 'monthly_budget',
          type: 'radio',
          label: 'Ongoing monthly hosting / maintenance budget',
          layout: 'pills',
          options: [
            { value: '<100', label: 'Under $100/mo' },
            { value: '100-300', label: '$100–300/mo' },
            { value: '300+', label: '$300+/mo' },
            { value: 'discuss', label: 'Discuss in meeting' },
          ],
        },
      ],
    },

    {
      id: 'notes',
      num: '11',
      title: 'Anything else',
      description: "Things we didn't ask but you want us to know.",
      fields: [
        {
          id: 'notes',
          type: 'textarea',
          label: 'Open notes',
          placeholder: 'Open notes, links, ideas, concerns',
          rows: 6,
        },
      ],
    },
  ],
};

export default nutriPathWebsite;
