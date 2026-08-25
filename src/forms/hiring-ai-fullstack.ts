import type { FormConfig } from '@/lib/types';

const hiringAiFullstack: FormConfig = {
  id: 'hiring-ai-fullstack',
  slug: 'hiring-ai-fullstack',
  title: 'Full-Stack / AI Engineer Application · Remote',
  heroAccent: 'Application',
  eyebrow: 'Maxxlab · Hiring · AI-Powered Product Infrastructure · Remote',
  description: "We're hiring AI and Full-Stack engineers to build production-grade AI products with us long-term. Tell us about yourself, what you're strongest in, and share your work.",
  client: 'Maxxlab',
  layout: 'steps',
  footerNote: "Fields marked with a dot are required. Everything else helps us understand your fit faster — share as much as you can.",
  sections: [
    {
      id: 'basics',
      num: '01',
      title: 'You, in brief',
      description: 'The essentials — who you are and how to reach you.',
      fields: [
        { id: 'full_name', type: 'text', label: 'Full name', required: true, halfWidth: true },
        { id: 'email', type: 'email', label: 'Email address', required: true, halfWidth: true },
        { id: 'phone', type: 'phone', label: 'Phone / WhatsApp', halfWidth: true },
        { id: 'location', type: 'text', label: 'Location & timezone', halfWidth: true },
        { id: 'github_url', type: 'url', label: 'GitHub profile', required: true, halfWidth: true },
        { id: 'linkedin_url', type: 'url', label: 'LinkedIn profile', halfWidth: true },
        { id: 'portfolio_url', type: 'url', label: 'Portfolio / personal site', hint: 'Optional — if you have a site showcasing your work beyond GitHub.' },
        {
          id: 'track', type: 'radio', layout: 'pills', label: 'Which are you applying for?', required: true,
          options: [
            { value: 'fullstack', label: 'Full-Stack Engineer' },
            { value: 'ai_ml', label: 'AI / ML Engineer' },
            { value: 'both', label: 'Both' },
          ],
        },
      ],
    },
    {
      id: 'about',
      num: '02',
      title: 'About you',
      description: 'Your background and what kind of work environment you thrive in.',
      fields: [
        { id: 'about', type: 'textarea', label: 'Tell us about yourself', hint: 'Your background, what you care about as an engineer, and what got you into building AI-powered products.', rows: 4, required: true },
        { id: 'current_role', type: 'text', label: 'Current role / title', halfWidth: true },
        {
          id: 'years_experience', type: 'radio', layout: 'pills', label: 'Years of professional engineering experience',
          options: [
            { value: 'under1', label: 'Under 1 year' },
            { value: '1to2', label: '1–2 years' },
            { value: '3to5', label: '3–5 years' },
            { value: '5to8', label: '5–8 years' },
            { value: '8plus', label: '8+ years' },
          ],
        },
        {
          id: 'work_type', type: 'radio', layout: 'pills', label: 'What are you looking for?',
          options: [
            { value: 'fulltime', label: 'Full-time' },
            { value: 'contract', label: 'Contract / freelance' },
            { value: 'either', label: 'Open to either' },
          ],
        },
      ],
    },
    {
      id: 'responsibilities',
      num: '03',
      title: 'Responsibilities overview',
      description: "This role spans AI integration, API/middleware, data architecture, frontend, payments, and cloud delivery. Tell us where you're strongest.",
      fields: [
        {
          id: 'strongest_responsibilities', type: 'checkboxgroup', layout: 'list', label: 'Which responsibility areas are you strongest in?',
          hint: 'Select every area you can genuinely own today, not just ones you find interesting.',
          options: [
            { value: 'ai_llm', label: 'AI & LLM integration', description: 'Streaming, structured output, tool/agent logic, RAG pipelines.' },
            { value: 'api_middleware', label: 'API engineering & middleware', description: 'REST, OAuth2, webhooks, schema design, service layers.' },
            { value: 'data_multitenant', label: 'Data & multi-tenant architecture', description: 'PostgreSQL schema design, RBAC, tenant isolation, safe migrations.' },
            { value: 'frontend_realtime', label: 'Frontend & real-time delivery', description: 'Next.js/React UI, WebSockets/SSE, LLM streaming to the client.' },
            { value: 'payments_security', label: 'Payments & secure systems', description: 'Stripe integration, subscriptions, webhook verification, RBAC.' },
            { value: 'cloud_delivery', label: 'Cloud & delivery', description: 'Deployments, CI/CD, Docker, monitoring and logging.' },
          ],
        },
        { id: 'responsibilities_overview', type: 'textarea', label: "Which of the responsibilities above are you strongest in and ready to take on — and what are you most excited to work on next?", hint: 'This is the paragraph we read most closely — be specific about real work you\'ve shipped.', rows: 5, required: true },
      ],
    },
    {
      id: 'skills',
      num: '04',
      title: 'Hands-on skills',
      description: 'Core stack we work in daily, plus the bonus tools that make you stand out.',
      fields: [
        {
          id: 'core_skills', type: 'checkboxgroup', layout: 'list', label: 'Core skills — select what you have real production experience with',
          options: [
            { value: 'js_ts', label: 'JavaScript / TypeScript' },
            { value: 'python', label: 'Python' },
            { value: 'react_next', label: 'React & Next.js (App Router)' },
            { value: 'node_rest', label: 'Node.js & REST API design' },
            { value: 'postgres_orm', label: 'PostgreSQL & ORMs', description: 'Drizzle, Prisma, or Supabase.' },
            { value: 'auth', label: 'Authentication flows', description: 'OAuth, JWT / session-based, NextAuth or similar.' },
            { value: 'payments', label: 'Payment integrations', description: 'Stripe or comparable.' },
            { value: 'git_review', label: 'Git-based collaborative workflows' },
          ],
        },
        {
          id: 'bonus_skills', type: 'checkboxgroup', layout: 'list', label: "Bonus skills — anything you've used in production or serious side projects",
          options: [
            { value: 'vercel_ai_sdk', label: 'Vercel AI SDK', description: 'LLM streaming and inference.' },
            { value: 'rag_vector', label: 'RAG pipelines, embeddings & vector databases', description: 'pgvector, Pinecone, or similar.' },
            { value: 'langchain', label: 'LangChain / LangGraph or other agent orchestration' },
            { value: 'mlflow', label: 'MLflow or other MLOps / experiment tracking' },
            { value: 'aws', label: 'AWS infrastructure', description: 'Lambda, EC2, S3, IAM, CloudWatch.' },
            { value: 'docker', label: 'Docker & container orchestration' },
            { value: 'realtime', label: 'Real-time systems', description: 'WebSockets, SSE, event-driven pipelines.' },
            { value: 'kyc', label: 'KYC / identity verification integrations' },
            { value: 'dataviz', label: 'd3.js or mermaid.js visualization pipelines' },
            { value: 'ml_observability', label: 'ML observability or monitoring tools' },
            { value: 'multi_tenant_saas', label: 'Multi-tenant or SaaS-style products' },
          ],
        },
        { id: 'ai_llm_experience', type: 'textarea', label: 'Brief overview of your experience with AI/LLM frameworks and API engineering', hint: "Frameworks, models, and providers you've worked with, and the kind of API/integration work you've done.", rows: 4, required: true },
        { id: 'notable_project', type: 'textarea', label: 'Describe one project where you shipped something end-to-end', hint: 'A project you owned from idea to production — what it did, your role, and the stack.', rows: 4 },
      ],
    },
    {
      id: 'logistics',
      num: '05',
      title: 'Availability & working style',
      description: "How we work: direct founder access, and a long-term seat if it's a fit.",
      fields: [
        { id: 'start_date', type: 'date', label: 'Earliest start date', halfWidth: true },
        { id: 'compensation_expectation', type: 'text', label: 'Compensation expectation', hint: 'Monthly or hourly rate, whatever is easiest to compare.', halfWidth: true },
        {
          id: 'weekly_hours', type: 'radio', layout: 'pills', label: 'Hours you can commit per week',
          options: [
            { value: 'under20', label: 'Under 20' },
            { value: '20to30', label: '20–30' },
            { value: '30to40', label: '30–40' },
            { value: '40plus', label: '40+' },
          ],
        },
        { id: 'overlap_hours', type: 'text', label: 'Hours you can overlap with US/EU business hours', hint: 'Rough daily window in your timezone — helps us plan syncs and code review.' },
      ],
    },
    {
      id: 'uploads',
      num: '06',
      title: 'Resume & work samples',
      description: 'Upload your resume and anything that shows your work — files are stored securely and only used for this application.',
      fields: [
        { id: 'resume', type: 'file', label: 'Resume / CV', hint: 'PDF preferred.', accept: '.pdf,.doc,.docx', multiple: false, required: true },
        { id: 'project_files', type: 'file', label: 'Project files, case studies, or writing samples', hint: 'Optional — code samples, architecture diagrams, deck, anything relevant. Multiple files OK.', multiple: true },
        { id: 'github_repo_highlight', type: 'url', label: "A specific repo you'd like us to look at first", hint: 'If you have many repos, point us to the one that best represents this role.' },
      ],
    },
    {
      id: 'anything-else',
      num: '07',
      title: 'Anything else',
      description: "Last chance to tell us something that isn't captured above.",
      fields: [
        { id: 'referral_source', type: 'text', label: 'How did you hear about this role?', halfWidth: true },
        { id: 'questions_for_us', type: 'textarea', label: 'Questions for us', hint: 'Anything you want to know about the role, the team, or how we work.', rows: 3 },
        { id: 'notes', type: 'textarea', label: "Anything else you'd like us to know", rows: 3 },
      ],
    },
  ],
};

export default hiringAiFullstack;
