import type { FormConfig } from '@/lib/types';

const websiteTransformation: FormConfig = {
  id: 'website-transformation',
  slug: 'website-transformation',
  title: 'Website Transformation · Discovery Form',
  heroAccent: 'Transformation',
  eyebrow: 'Website Transformation · Discovery Form',
  description: "Tell us about your existing site, what's working, what isn't, and where you want to go. Fill in what you know — leave blanks for anything you're unsure of, and we'll cover it together in our discovery call.",
  client: 'Maxxlab',
  sections: [
    {
      id: 'overview',
      num: '01',
      title: 'Business overview',
      description: "Who you are and who we'll be working with.",
      fields: [
        { id: 'business_name', type: 'text', label: 'Business / organisation name', placeholder: 'e.g. Acme Studio', required: true },
        { id: 'tagline', type: 'text', label: 'Tagline or one-liner', hint: "How you'd describe what you do in one sentence.", placeholder: 'e.g. Helping founders ship faster.' },
        { id: 'contact_name', type: 'text', label: 'Primary contact name', required: true },
        { id: 'contact_email', type: 'email', label: 'Contact email', placeholder: 'you@company.com', required: true, halfWidth: true },
        { id: 'website_url', type: 'url', label: 'Website URL', placeholder: 'https://yoursite.com', required: true, halfWidth: true },
        { id: 'stakeholders', type: 'text', label: 'Other stakeholders who should be in the loop', hint: "Anyone whose sign-off matters — marketing lead, IT, legal, etc.", placeholder: 'Name — role, Name — role' },
        { id: 'about', type: 'textarea', label: 'In a few sentences, what does your business do and who do you serve?', placeholder: 'Give us enough context that a stranger could understand your business in 30 seconds.', rows: 3 },
      ],
    },
    {
      id: 'current-site',
      num: '02',
      title: 'Your current website',
      description: 'Help us understand what exists before we touch anything.',
      fields: [
        {
          id: 'site_age', type: 'radio', layout: 'pills', label: 'How old is your current website?',
          options: [
            { value: 'under1', label: 'Under 1 year' },
            { value: '1to3', label: '1–3 years' },
            { value: '3to5', label: '3–5 years' },
            { value: 'over5', label: '5+ years' },
            { value: 'unsure', label: 'Not sure' },
          ],
        },
        {
          id: 'platform', type: 'radio', layout: 'pills', label: 'What platform or CMS is the site built on?',
          options: [
            { value: 'wordpress', label: 'WordPress' },
            { value: 'webflow', label: 'Webflow' },
            { value: 'squarespace', label: 'Squarespace' },
            { value: 'wix', label: 'Wix' },
            { value: 'shopify', label: 'Shopify' },
            { value: 'custom', label: 'Custom-coded' },
            { value: 'other', label: 'Other / Not sure' },
          ],
        },
        { id: 'platform_notes', type: 'textarea', label: 'If other, specify here', rows: 2 },
        { id: 'managed_by', type: 'text', label: 'Managed by', placeholder: 'e.g. In-house developer, freelancer, agency', halfWidth: true },
        { id: 'hosted_on', type: 'text', label: 'Hosted on', placeholder: 'e.g. GoDaddy, WP Engine, Netlify', halfWidth: true },
        {
          id: 'domain_owner', type: 'radio', layout: 'pills', label: 'Do you own the domain?',
          options: [
            { value: 'yes', label: 'Yes, I own it' },
            { value: 'managed', label: 'Managed by someone else' },
            { value: 'changing', label: 'Changing domain' },
            { value: 'unsure', label: 'Not sure' },
          ],
        },
        {
          id: 'page_count', type: 'radio', layout: 'pills', label: 'Roughly how many pages does the current site have?',
          options: [
            { value: 'under5', label: 'Under 5' },
            { value: '5to10', label: '5–10' },
            { value: '10to20', label: '10–20' },
            { value: '20plus', label: '20+' },
            { value: 'unsure', label: 'Not sure' },
          ],
        },
        { id: 'must_keep', type: 'textarea', label: 'Is there anything on the current site we must not change or remove?', hint: 'Specific pages, content, URLs for SEO, integrations, etc.', placeholder: 'e.g. Blog posts must stay at same URLs, existing checkout flow must remain, /resources section should be preserved.', rows: 3 },
      ],
    },
    {
      id: 'pain-points',
      num: '03',
      title: "What isn't working",
      description: 'The frustrations and limitations that drove you to start this project.',
      fields: [
        {
          id: 'pain_points', type: 'checkboxgroup', layout: 'list', label: 'What are your biggest complaints about the current website?',
          hint: 'Be as honest as you like — this helps us prioritise what to fix first.',
          options: [
            { value: 'looks_outdated', label: 'Looks outdated', description: 'Design no longer reflects the brand or feels dated compared to competitors.' },
            { value: 'not_mobile', label: 'Poor mobile experience', description: "Doesn't work well on phones or tablets." },
            { value: 'slow', label: 'Slow loading speed', description: 'Pages take too long to load, affecting experience and SEO.' },
            { value: 'hard_to_update', label: 'Hard to update content', description: 'Editing anything requires a developer or is too technical.' },
            { value: 'low_conversions', label: 'Low conversions', description: "Visitors aren't taking the actions we want (enquiries, sign-ups, purchases)." },
            { value: 'poor_seo', label: 'Poor search engine visibility', description: 'Not ranking well on Google for our key terms.' },
            { value: 'confusing_nav', label: 'Confusing navigation / structure', description: "Visitors struggle to find what they're looking for." },
            { value: 'missing_features', label: 'Missing features or integrations', description: "The site can't do things we now need it to do." },
            { value: 'security', label: 'Security or reliability concerns', description: 'Site goes down, gets hacked, or feels fragile.' },
            { value: 'off_brand', label: 'Off-brand', description: 'The site no longer reflects where the business is today.' },
          ],
        },
        { id: 'other_pain', type: 'textarea', label: 'Anything else frustrating you about the current site?', placeholder: "Expand on any of the above, or add anything we haven't listed.", rows: 3 },
      ],
    },
    {
      id: 'goals',
      num: '04',
      title: 'Goals of the transformation',
      description: 'What does a successful new website look like — and how will we know it worked?',
      fields: [
        {
          id: 'goals', type: 'checkboxgroup', layout: 'list', label: 'What is the primary purpose of the new website?',
          options: [
            { value: 'leads', label: 'Generate leads / enquiries', description: 'Drive contact form submissions, calls, or consultations.' },
            { value: 'sales', label: 'Drive online sales', description: 'Sell products or services directly from the site.' },
            { value: 'brand', label: 'Build brand credibility', description: 'Establish authority and trust — a "front door" that impresses.' },
            { value: 'seo_content', label: 'Grow organic traffic (SEO / content)', description: 'Rank for keywords and attract visitors through search.' },
            { value: 'support', label: 'Serve existing customers / clients', description: 'Provide resources, portals, or support content.' },
            { value: 'recruitment', label: 'Attract talent or partners', description: 'Showcase culture and opportunities.' },
            { value: 'other_goal', label: 'Other', description: 'Explain below.' },
          ],
        },
        { id: 'success_metric', type: 'textarea', label: 'What does success look like 6 months after launch?', hint: 'e.g. "50 inbound leads per month", "top-5 ranking for [keyword]", "customers can self-serve without calling us"', placeholder: 'Be as specific as you can — even rough targets help us design toward the right outcome.', rows: 3 },
        { id: 'primary_cta', type: 'text', label: 'Is there a specific action you want every visitor to take?', hint: 'The single most important conversion — e.g. book a call, start a free trial, get a quote.', placeholder: 'e.g. Book a free consultation' },
      ],
    },
    {
      id: 'audience',
      num: '05',
      title: 'Target audience',
      description: 'Who the site is designed to speak to — their context, needs, and mindset when they land.',
      fields: [
        { id: 'primary_audience', type: 'textarea', label: 'Who is your primary audience?', hint: 'Describe them as specifically as you can — role, industry, age range, geography, whatever is relevant.', placeholder: 'e.g. Small business owners in Canada, aged 30–50, who are not very technical and are looking for marketing help.', rows: 3 },
        { id: 'secondary_audience', type: 'textarea', label: 'Do you have secondary audiences?', hint: 'e.g. investors, press, potential employees — anyone else the site needs to serve.', placeholder: "List them here, along with what they're looking for.", rows: 3 },
        {
          id: 'audience_changed', type: 'radio', layout: 'pills', label: 'Has your target audience changed since the current site was built?',
          options: [
            { value: 'yes', label: 'Yes — significantly' },
            { value: 'somewhat', label: 'Somewhat' },
            { value: 'no', label: 'No — same audience' },
          ],
        },
        { id: 'audience_changed_notes', type: 'textarea', label: 'If yes or somewhat — describe what changed', rows: 2 },
      ],
    },
    {
      id: 'branding',
      num: '06',
      title: 'Branding & visual identity',
      description: "What brand assets exist, what's changing, and the overall look and feel direction.",
      fields: [
        {
          id: 'brand_status', type: 'radio', layout: 'list', label: 'What is the status of your brand identity?',
          options: [
            { value: 'full', label: 'Full brand kit ready', description: "Logo, colours, fonts, and guidelines — we'll send it over." },
            { value: 'partial', label: 'Partial — logo and colours only', description: 'Some assets exist but no complete system.' },
            { value: 'refresh', label: 'Needs a refresh', description: 'We have assets but they feel stale — part of scope.' },
            { value: 'scratch', label: 'Rebrand from scratch', description: 'Full rebrand alongside the website — new logo, colours, everything.' },
          ],
        },
        {
          id: 'visual_direction', type: 'checkboxgroup', layout: 'list', label: 'Overall visual direction for the new site',
          hint: 'Pick the mood that best describes where you want to go — you can select more than one.',
          options: [
            { value: 'clean', label: 'Clean & minimal', description: 'White space, restraint, clarity-first design.' },
            { value: 'bold', label: 'Bold & confident', description: 'Strong type, high contrast, makes a statement.' },
            { value: 'warm', label: 'Warm & human', description: 'Friendly tones, soft shapes, photography-led.' },
            { value: 'premium', label: 'Premium & editorial', description: 'Refined typography, considered spacing, high-end feel.' },
            { value: 'modern', label: 'Modern & tech-forward', description: 'Dark modes, gradients, product-led aesthetic.' },
            { value: 'playful', label: 'Playful & energetic', description: 'Colour, illustration, motion — fun and engaging.' },
          ],
        },
        { id: 'inspiration', type: 'textarea', label: "Websites or brands you love (yours or others')", hint: 'Paste 3–5 URLs or names. Tell us what you like about each if you can.', placeholder: '1. https://example.com — Love the typography and the way they use white space.\n2. Stripe.com — Clean product marketing, confident copy.\n3. ...', rows: 4 },
        { id: 'avoid_styles', type: 'textarea', label: 'Websites or brands you dislike or want to differentiate from', hint: 'Competitors or examples of styles to avoid.', placeholder: "e.g. [Competitor A] feels too cluttered. We don't want that corporate navy-and-grey look.", rows: 3 },
        { id: 'desired_feeling', type: 'textarea', label: 'What should every visitor feel when they land on the new site?', hint: 'One or two sentences — the emotional impression that matters most.', placeholder: 'e.g. "These people clearly know what they\'re doing and I can trust them with my business."', rows: 2 },
      ],
    },
    {
      id: 'content',
      num: '07',
      title: 'Content',
      description: "What content exists, what's changing, and who's responsible for writing.",
      fields: [
        {
          id: 'content_plan', type: 'checkboxgroup', layout: 'list', label: 'What happens to the existing content?',
          options: [
            { value: 'reuse', label: 'Reuse most existing copy', description: 'Content is still accurate and on-brand — migrate as-is.' },
            { value: 'edit', label: 'Edit and update copy', description: 'Existing copy is a starting point but needs significant updates.' },
            { value: 'rewrite', label: 'Full rewrite', description: "Start fresh — the old content is outdated or doesn't reflect the brand." },
            { value: 'mixed', label: 'Mixed — page by page', description: 'Some pages reuse, others need a full rewrite.' },
          ],
        },
        {
          id: 'copywriter', type: 'radio', layout: 'pills', label: 'Who will write the copy for the new site?',
          options: [
            { value: 'client', label: 'We write it' },
            { value: 'agency', label: 'You write it (add to scope)' },
            { value: 'hybrid', label: 'Hybrid — we draft, you polish' },
            { value: 'unsure', label: 'Not decided yet' },
          ],
        },
        {
          id: 'blog_status', type: 'radio', layout: 'pills', label: 'Do you have a blog or resource section?',
          options: [
            { value: 'yes_keep', label: 'Yes — keep it' },
            { value: 'yes_remove', label: 'Yes — removing it' },
            { value: 'no_add', label: 'No — adding one' },
            { value: 'no_none', label: 'No — not needed' },
          ],
        },
        {
          id: 'media', type: 'checkboxgroup', layout: 'list', label: 'Photography & visual media',
          options: [
            { value: 'existing', label: 'We have existing photos / videos to use' },
            { value: 'stock', label: 'Use stock photography / AI-generated imagery' },
            { value: 'custom_shoot', label: 'Commission a custom photoshoot', description: 'Adds to budget — we can help source or coordinate.' },
            { value: 'illustration', label: 'Custom illustration or iconography', description: 'Adds to budget — we can design or source.' },
          ],
        },
      ],
    },
    {
      id: 'pages',
      num: '08',
      title: 'Pages & structure',
      description: 'What the new site will contain — pages to keep, cut, or add.',
      fields: [
        {
          id: 'pages_wanted', type: 'checkboxgroup', layout: 'list', label: 'Pages you definitely want on the new site',
          options: [
            { value: 'home', label: 'Home' },
            { value: 'about', label: 'About / Our story' },
            { value: 'services', label: 'Services / Products' },
            { value: 'portfolio', label: 'Portfolio / Case studies / Work' },
            { value: 'team', label: 'Team / People' },
            { value: 'testimonials', label: 'Testimonials / Reviews' },
            { value: 'blog', label: 'Blog / News / Resources' },
            { value: 'pricing', label: 'Pricing' },
            { value: 'faq', label: 'FAQ' },
            { value: 'contact', label: 'Contact' },
            { value: 'legal', label: 'Legal — Privacy, Terms, Cookies' },
          ],
        },
        { id: 'extra_pages', type: 'textarea', label: 'Additional pages, landing pages, or sections', hint: 'Anything not listed above — custom landing pages, campaign pages, login portals, etc.', placeholder: 'e.g. A dedicated landing page for our annual conference, a client portal login page.', rows: 3 },
        { id: 'pages_remove', type: 'textarea', label: 'Pages from the current site to remove entirely', hint: "Content or sections that are no longer relevant and shouldn't be carried over.", placeholder: 'e.g. The old newsletter archive, the 2019 team page, the events section we no longer run.', rows: 3 },
      ],
    },
    {
      id: 'features',
      num: '09',
      title: 'Features & integrations',
      description: 'Functionality the new site needs to support — tools to connect, features to add or keep.',
      fields: [
        {
          id: 'features', type: 'checkboxgroup', layout: 'list', label: 'Select all features the new site needs',
          options: [
            { value: 'contact_form', label: 'Contact / lead form' },
            { value: 'booking', label: 'Appointment / booking system', description: 'e.g. Calendly, Acuity, TidyCal.' },
            { value: 'ecommerce', label: 'E-commerce / online shop' },
            { value: 'payments', label: 'Payment processing', description: 'e.g. Stripe, Square, PayPal.' },
            { value: 'email_marketing', label: 'Email marketing integration', description: 'e.g. Mailchimp, Klaviyo, ConvertKit.' },
            { value: 'crm', label: 'CRM integration', description: 'e.g. HubSpot, Salesforce, Pipedrive.' },
            { value: 'live_chat', label: 'Live chat / support widget', description: 'e.g. Intercom, Crisp, Tidio.' },
            { value: 'analytics', label: 'Analytics', description: 'e.g. Google Analytics 4, Plausible, Mixpanel.' },
            { value: 'member_login', label: 'Member area / login portal' },
            { value: 'search', label: 'Site search' },
            { value: 'multilingual', label: 'Multi-language support' },
            { value: 'maps', label: 'Map / location embed' },
            { value: 'video', label: 'Video (hosted or embedded)' },
            { value: 'social_feed', label: 'Social media feed' },
            { value: 'review_widget', label: 'Reviews / testimonials widget', description: 'e.g. Google Reviews, Trustpilot.' },
          ],
        },
        { id: 'existing_tools', type: 'textarea', label: 'Tools you already use that the site should connect to', hint: 'List any software, platforms, or services — especially anything already in your current site.', placeholder: "e.g. HubSpot CRM, Mailchimp, Calendly, Stripe, GA4 — we'd like to keep all of these connected.", rows: 3 },
        { id: 'custom_features', type: 'textarea', label: 'Any other custom features or functionality not listed above?', placeholder: 'e.g. A pricing calculator, a custom quiz or tool, a job board, a client portal with file sharing.', rows: 3 },
      ],
    },
    {
      id: 'seo',
      num: '10',
      title: 'SEO & performance',
      description: 'How search engine visibility and site performance factor into the project.',
      fields: [
        {
          id: 'seo_priority', type: 'radio', layout: 'list', label: 'How important is SEO to this project?',
          options: [
            { value: 'high', label: 'High priority', description: 'Organic search is a major channel — we need strong foundations, keyword targeting, and structured data.' },
            { value: 'medium', label: 'Medium priority', description: "We want clean technical SEO but aren't running a content-heavy strategy right now." },
            { value: 'low', label: 'Lower priority', description: 'We rely on paid ads, referrals, or direct traffic — SEO is secondary for now.' },
          ],
        },
        {
          id: 'keyword_status', type: 'radio', layout: 'pills', label: 'Do you have existing keyword targets or content ranking on Google?',
          hint: 'If yes, we must preserve those URLs and rankings carefully during the migration.',
          options: [
            { value: 'yes_important', label: 'Yes — and it matters a lot' },
            { value: 'yes_minor', label: "Yes — but it's minimal" },
            { value: 'no', label: 'No — starting fresh' },
            { value: 'unsure', label: 'Not sure' },
          ],
        },
        { id: 'seo_tools', type: 'text', label: 'Do you use Google Search Console or any other SEO tools?', placeholder: "e.g. Google Search Console, Semrush, Ahrefs, Yoast — and roughly how long they've been set up." },
        {
          id: 'accessibility', type: 'radio', layout: 'pills', label: 'Accessibility requirements',
          options: [
            { value: 'wcag_aa', label: 'WCAG 2.1 AA' },
            { value: 'basic', label: 'Basic best practices only' },
            { value: 'unsure', label: 'Not sure — advise us' },
          ],
        },
      ],
    },
    {
      id: 'cms-hosting',
      num: '11',
      title: 'CMS & hosting',
      description: 'How the site will be managed after launch — platform, editing, and infrastructure preferences.',
      fields: [
        {
          id: 'cms_change', type: 'radio', layout: 'pills', label: 'Do you want to change the CMS or platform?',
          options: [
            { value: 'keep', label: 'Keep the same platform' },
            { value: 'change', label: 'Switch to a new platform' },
            { value: 'recommend', label: 'Advise us on the best fit' },
          ],
        },
        {
          id: 'platform_pref', type: 'radio', layout: 'pills', label: 'Preferred platform (if switching or starting fresh)',
          options: [
            { value: 'webflow', label: 'Webflow' },
            { value: 'wordpress', label: 'WordPress' },
            { value: 'shopify', label: 'Shopify' },
            { value: 'headless', label: 'Headless / custom' },
            { value: 'no_pref', label: 'No preference' },
          ],
        },
        {
          id: 'editor_team', type: 'radio', layout: 'pills', label: 'Who will edit the website after launch?',
          options: [
            { value: 'agency', label: 'Only your team (change requests)' },
            { value: '1to2', label: '1–2 internal editors' },
            { value: 'team', label: 'Larger internal team' },
            { value: 'unsure', label: 'Not decided yet' },
          ],
        },
        {
          id: 'hosting_pref', type: 'radio', layout: 'pills', label: 'Hosting preference',
          options: [
            { value: 'agency_managed', label: 'Agency-managed (you handle it)' },
            { value: 'client_owned', label: 'We own our hosting account' },
            { value: 'cms_native', label: "Use the CMS's own hosting" },
            { value: 'recommend', label: 'Advise us' },
          ],
        },
      ],
    },
    {
      id: 'timeline-budget',
      num: '12',
      title: 'Timeline & budget',
      description: 'Deadlines and investment range so we can scope appropriately.',
      fields: [
        { id: 'launch_date', type: 'date', label: 'Target date (if known)', halfWidth: true },
        { id: 'launch_event', type: 'text', label: 'Any events or campaigns tied to launch?', placeholder: 'e.g. Product launch in March, trade show in Q2', halfWidth: true },
        {
          id: 'urgency', type: 'radio', layout: 'pills', label: 'How urgent is this project?',
          options: [
            { value: 'asap', label: 'ASAP' },
            { value: 'months1to2', label: '1–2 months' },
            { value: 'months3to4', label: '3–4 months' },
            { value: 'flexible', label: 'Flexible' },
          ],
        },
        {
          id: 'budget', type: 'radio', layout: 'pills', label: 'Budget range for the website transformation',
          hint: "A rough range helps us scope the right solution. Leave blank if you'd prefer to discuss.",
          options: [
            { value: 'under3k', label: 'Under $3k' },
            { value: '3to8k', label: '$3k–$8k' },
            { value: '8to15k', label: '$8k–$15k' },
            { value: '15to30k', label: '$15k–$30k' },
            { value: 'over30k', label: '$30k+' },
            { value: 'discuss', label: 'Prefer to discuss' },
          ],
        },
        {
          id: 'monthly_budget', type: 'radio', layout: 'pills', label: 'Ongoing maintenance budget (monthly)',
          options: [
            { value: 'under100', label: 'Under $100/mo' },
            { value: '100to300', label: '$100–$300/mo' },
            { value: 'over300', label: '$300+/mo' },
            { value: 'discuss', label: 'Discuss in meeting' },
          ],
        },
      ],
    },
    {
      id: 'anything-else',
      num: '13',
      title: 'Anything else',
      description: "Anything we didn't ask — must-haves, deal-breakers, worries, context, or assets you'd like to share.",
      fields: [
        {
          id: 'assets_available', type: 'checkboxgroup', layout: 'list', label: 'Assets you can provide',
          options: [
            { value: 'brand_guide', label: 'Brand guidelines / style guide' },
            { value: 'logo_files', label: 'Logo files (SVG / AI / PNG)' },
            { value: 'photos', label: 'Photography library' },
            { value: 'videos', label: 'Video content' },
            { value: 'copy_docs', label: 'Existing copy / content documents' },
            { value: 'analytics_access', label: 'Google Analytics / Search Console access' },
            { value: 'competitor_notes', label: 'Competitor analysis or research' },
          ],
        },
        { id: 'social_links', type: 'textarea', label: 'Social media & other digital presence', hint: 'Paste your social links so we can review your current voice and visuals.', placeholder: 'LinkedIn: https://...\nInstagram: https://...\nTwitter/X: https://...\nYouTube: https://...', rows: 4 },
        { id: 'notes', type: 'textarea', label: 'Notes for our team', hint: 'Anything else we should know — things that kept the last website from succeeding, non-negotiables, context about your industry, red flags, hopes, etc.', placeholder: 'Tell us anything that helps us understand this project better.', rows: 4 },
      ],
    },
  ],
};

export default websiteTransformation;
