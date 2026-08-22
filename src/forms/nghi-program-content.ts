import type { FormConfig, FormField, FormSection } from '@/lib/types';

// ── Program list ──────────────────────────────────────────────────────────────
// Must match content/programs.ts in the nextgen repo exactly (slug + order) —
// that's the single source of truth this form's answers get dropped into.
const PROGRAMS: { slug: string; name: string }[] = [
  { slug: 'medical-assistant', name: 'Medical Assistant' },
  { slug: 'nursing-assistant', name: 'Nursing Assistant' },
  { slug: 'phlebotomy-technician', name: 'Phlebotomy Technician' },
  { slug: 'ekg-technician', name: 'EKG Technician' },
  { slug: 'patient-care-technician', name: 'Patient Care Technician' },
  { slug: 'mri-technician', name: 'MRI Technician' },
  { slug: 'medical-administrative-assistant', name: 'Medical Administrative Assistant' },
  { slug: 'medical-billing-coding', name: 'Medical Billing & Coding' },
  { slug: 'mental-health-technician', name: 'Mental Health Technician' },
  { slug: 'orthopedic-casting', name: 'Orthopedic Casting' },
  { slug: 'physical-therapy-aide', name: 'Physical Therapy Aide' },
];

function programFields(id: string): FormField[] {
  return [
    {
      id: `${id}_skills`,
      type: 'textarea',
      label: "What you'll learn — skills checklist",
      hint: 'One skill per line. 4–8 short skills, shown as a checklist under the program overview.',
      placeholder: 'Patient Vitals\nEKG Basics\nPhlebotomy\nClinical Procedures',
      rows: 3,
    },
    {
      id: `${id}_overview_notes`,
      type: 'textarea',
      label: 'Overview description (optional rewrite)',
      hint: 'Leave blank to keep our current description for this program. Fill in only if you want to replace it with your own copy.',
      rows: 3,
    },
    {
      id: `${id}_curriculum_modules`,
      type: 'textarea',
      label: 'Curriculum — modules & outcomes',
      hint: 'One module per line, formatted as: "Module title | outcome one; outcome two; outcome three"',
      placeholder: 'Clinical Skills | Take and record vital signs; Assist with patient exams; Follow infection-control protocols',
      rows: 6,
    },
    {
      id: `${id}_hands_on_headline`,
      type: 'text',
      label: 'Hands-on training — headline',
      placeholder: 'e.g. "Learn by doing."',
      halfWidth: true,
    },
    {
      id: `${id}_hands_on_tags`,
      type: 'text',
      label: 'Hands-on training — skill tags',
      hint: 'Comma-separated',
      placeholder: 'e.g. EKG, Phlebotomy, Vitals, Patient Care',
      halfWidth: true,
    },
    {
      id: `${id}_hands_on_body`,
      type: 'textarea',
      label: 'Hands-on training — description',
      hint: '1–2 sentences. Leave the three hands-on fields blank if this program has no hands-on/lab component.',
      rows: 3,
    },
    {
      id: `${id}_certifying_body`,
      type: 'text',
      label: 'Certifying body',
      placeholder: 'e.g. AMCA',
      halfWidth: true,
    },
    {
      id: `${id}_testing_info`,
      type: 'text',
      label: 'Exam / testing site',
      placeholder: 'e.g. Pearson VUE — on-campus testing',
      halfWidth: true,
    },
    {
      id: `${id}_certifying_logo`,
      type: 'file',
      label: 'Certifying body logo',
      hint: 'PNG or SVG, transparent background preferred',
      accept: 'image/*,.svg',
      multiple: true,
      halfWidth: true,
    },
    {
      id: `${id}_program_photo`,
      type: 'file',
      label: 'Program photo (hero / card)',
      hint: "Only if you have a real photo for this program — otherwise we'll keep placeholder art",
      accept: 'image/*',
      multiple: true,
      halfWidth: true,
    },
    {
      id: `${id}_testimonial_quote`,
      type: 'textarea',
      label: 'Graduate testimonial — quote',
      rows: 3,
    },
    {
      id: `${id}_testimonial_name`,
      type: 'text',
      label: 'Graduate testimonial — graduate name',
      halfWidth: true,
    },
    {
      id: `${id}_testimonial_employer`,
      type: 'text',
      label: 'Graduate testimonial — current employer (optional)',
      halfWidth: true,
    },
    {
      id: `${id}_testimonial_photo`,
      type: 'file',
      label: 'Graduate testimonial — photo (optional)',
      accept: 'image/*',
      multiple: true,
    },
    {
      id: `${id}_admissions_notes`,
      type: 'textarea',
      label: 'Admissions requirements — differences from standard (optional)',
      hint: 'Our standard checklist applies to every program by default (18+, HS diploma/GED, photo ID, admissions interview, background check + health screening before externship). Only fill this in if this program differs — e.g. no externship, so no background check needed.',
      rows: 2,
    },
  ];
}

const programSections: FormSection[] = PROGRAMS.map((program, i) => ({
  id: program.slug,
  num: String(i + 1).padStart(2, '0'),
  title: program.name,
  description: `Skills, curriculum, hands-on training, certification, and a graduate story for the ${program.name} program page.`,
  fields: programFields(program.slug.replace(/-/g, '_')),
}));

const nghiProgramContent: FormConfig = {
  id: 'nghi-program-content',
  slug: 'nghi-program-content',
  title: 'NextGen Program Content · Data Collection Form',
  heroAccent: 'Content',
  eyebrow: 'NGHI · Program Pages · Content Intake',
  description:
    "Fill in the program-specific details below for each of NGHI's 11 programs — skills, curriculum, hands-on training, certification, and a graduate story. Fill what you have for each program and skip what you don't; we'll follow up on any gaps.",
  client: 'NextGen Health Institute (NGHI)',
  layout: 'accordion',
  footerNote: "Nothing here is required — fill in what you have for each program, we'll follow up on the rest.",
  sections: programSections,
};

export default nghiProgramContent;
