import type { FormConfig } from '@/lib/types';

// ── World Times Tech hiring ──────────────────────────────────────────────────
// Same shape as the Maxxlab hiring form: one form, several tracks, with every
// role-specific section gated on the answer to section 01 via `showIf`.
//
// Everything below the role picker is role-independent and final. The per-role
// brief and skills sections are added once World Times confirm the tracks they
// are hiring for and supply the job descriptions, and they slot in between
// section 01 and "You, in brief" exactly as they do in hiring-product-team.ts.

const ROLE_FIELD = 'role';

const worldTimesHiringTech: FormConfig = {
  id: 'worldtimes-hiring-tech',
  slug: 'worldtimes-hiring-tech',
  brand: 'worldtimes',
  title: 'Tech Team Application',
  heroAccent: 'Application',
  eyebrow: 'Hiring · Technology team · Pakistan',
  description:
    'We are building out our technology team. Pick the role you are applying for and the rest of the form adjusts to match it.',
  client: 'World Times Tech',
  layout: 'steps',
  footerNote: 'Questions about the role? Contact: careers@worldtimesinstitute.com.pk',
  sections: [
    // ── 01 · Role picker ─────────────────────────────────────────────────────
    // PLACEHOLDER TRACKS. Replace the options below with the roles World Times
    // are actually hiring for, then add a brief section per role keyed on
    // `showIf: { field: ROLE_FIELD, equals: ['<value>'] }`.
    {
      id: 'role-select',
      num: '01',
      title: 'Which role are you applying for?',
      description: 'Pick one and the rest of the form changes to match.',
      fields: [
        {
          id: ROLE_FIELD,
          type: 'radio',
          layout: 'list',
          label: 'Choose your track',
          required: true,
          options: [
            {
              value: 'web',
              label: 'Web Developer',
              badge: 'Engineering',
              badgeVariant: 'blue',
              description: 'Builds and maintains the institute website and student-facing tools.',
            },
            {
              value: 'design',
              label: 'Graphic Designer',
              badge: 'Design',
              badgeVariant: 'amber',
              description: 'Course creatives, social posts, print material and brand work.',
            },
            {
              value: 'video',
              label: 'Video Editor',
              badge: 'Content',
              badgeVariant: 'green',
              description: 'Lecture recordings, promotional clips and short-form social video.',
            },
            {
              value: 'marketing',
              label: 'Digital Marketing',
              badge: 'Growth',
              badgeVariant: 'red',
              description: 'Paid campaigns, social channels, SEO and admissions funnels.',
            },
          ],
        },
      ],
    },

    // ── You, in brief ────────────────────────────────────────────────────────
    {
      id: 'basics',
      num: '02',
      title: 'You, in brief',
      description: 'The essentials: who you are and how to reach you.',
      fields: [
        { id: 'full_name', type: 'text', label: 'Full name', required: true, halfWidth: true },
        { id: 'email', type: 'email', label: 'Email address', required: true, halfWidth: true },
        { id: 'phone', type: 'phone', label: 'Phone / WhatsApp', required: true, halfWidth: true },
        { id: 'city', type: 'text', label: 'City', placeholder: 'e.g. Lahore', halfWidth: true },
        { id: 'linkedin_url', type: 'url', label: 'LinkedIn profile', halfWidth: true },
        { id: 'portfolio_url', type: 'url', label: 'Portfolio / personal site', halfWidth: true },
      ],
    },

    // ── About you ────────────────────────────────────────────────────────────
    {
      id: 'about',
      num: '03',
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

    // ── Availability ─────────────────────────────────────────────────────────
    {
      id: 'logistics',
      num: '04',
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
      num: '05',
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
          hint: 'Optional. Designs, code, edited videos, campaign reports, anything relevant. Multiple files are fine.',
          multiple: true,
        },
      ],
    },

    // ── Anything else ────────────────────────────────────────────────────────
    {
      id: 'anything-else',
      num: '06',
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

export default worldTimesHiringTech;
