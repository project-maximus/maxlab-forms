import type { FormConfig, FormField } from '@/lib/types';
import { faceScale, ratingRow } from '@/lib/scale';

// ── NGHI student feedback · AI learning platform demo ────────────────────────
// Paper handout turned into a form. Every question except the student's name is
// optional on purpose: this goes out right after a demo session and a student
// who only opened two screens should still be able to send what they saw.

const USEFULNESS = [
  'Not useful',
  'Barely useful',
  'Somewhat useful',
  'Useful',
  'Very useful',
] as const;

/** One row of the "rate each area you tried" matrix. */
function usefulnessRow(id: string, label: string): FormField {
  return ratingRow(id, label, USEFULNESS, "Didn't try it");
}

const PROGRAMS = [
  'Medical Assistant',
  'Nursing Assistant',
  'Phlebotomy Technician',
  'EKG Technician',
  'Patient Care Technician',
  'MRI Technician',
  'Medical Administrative Assistant',
  'Medical Billing & Coding',
  'Mental Health Technician',
  'Orthopedic Casting',
  'Physical Therapy Aide',
];

const nghiStudentFeedback: FormConfig = {
  id: 'nghi-student-feedback',
  slug: 'nghi-student-feedback',
  title: 'Student Feedback · Platform Demo',
  heroAccent: 'Feedback',
  eyebrow: 'Next Gen Health Institute · AI Learning Platform · Demo',
  description:
    "Thanks for trying the platform. This is an early demo, so we mainly want first impressions: what felt useful, what was confusing, and what you'd want before the full cohort starts. Mostly tick-boxes, about 5 minutes.",
  client: 'Next Gen Health Institute',
  layout: 'steps',
  footerNote:
    "Only your name is required. Skip anything you didn't get a chance to try. Questions? admin@maxxlab.tech",
  sections: [
    // ── 01 · Who's answering ────────────────────────────────────────────────
    {
      id: 'about-you',
      num: '01',
      title: 'Before we start',
      description:
        'Just so we know whose feedback this is and which program you are on. Nothing here is shared outside the team.',
      fields: [
        { id: 'full_name', type: 'text', label: 'Your name', required: true, halfWidth: true },
        {
          id: 'email',
          type: 'email',
          label: 'Your email',
          hint: "Optional. We'll send you a copy of your answers.",
          halfWidth: true,
        },
        {
          id: 'program',
          type: 'select',
          label: 'Program',
          halfWidth: true,
          options: [
            ...PROGRAMS.map(name => ({ value: name, label: name })),
            { value: 'Other / not listed', label: 'Other / not listed' },
          ],
        },
        { id: 'demo_date', type: 'date', label: 'Date you tried the platform', halfWidth: true },
      ],
    },

    // ── 02 · First impressions ──────────────────────────────────────────────
    {
      id: 'first-impressions',
      num: '02',
      title: 'First impressions',
      description:
        'What you got to open, and how it felt to move around. Tick only what you actually tried.',
      fields: [
        {
          id: 'tried_parts',
          type: 'checkboxgroup',
          layout: 'list',
          label: 'Which parts did you get to try?',
          hint: 'Tick all that apply.',
          options: [
            { value: 'Dashboard and widgets', label: 'Dashboard and widgets' },
            {
              value: 'Learn page',
              label: 'Learn page',
              description: 'Lecture video, transcript, notes.',
            },
            { value: 'Practice questions and flashcards', label: 'Practice questions and flashcards' },
            { value: 'Mock Exam', label: 'Mock Exam' },
            { value: 'AI Tutor chat', label: 'AI Tutor chat' },
            { value: 'Next AI / Correction Agent', label: 'Next AI / Correction Agent' },
          ],
        },
        {
          id: 'ease_of_navigation',
          type: 'emojiscale',
          label: 'How easy was it to find your way around?',
          scaleLabels: { low: 'Confusing', high: 'Very easy' },
          options: faceScale([
            'Confusing',
            'A bit of a hunt',
            'Okay once I looked',
            'Easy',
            'Very easy',
          ]),
        },
        {
          id: 'vs_google_classroom',
          type: 'emojiscale',
          label: 'Compared with Google Classroom, how did it feel to use?',
          scaleLabels: { low: 'Much harder', high: 'Much easier' },
          options: faceScale([
            'Much harder',
            'A bit harder',
            'About the same',
            'A bit easier',
            'Much easier',
          ]),
        },
      ],
    },

    // ── 03 · Usefulness matrix ──────────────────────────────────────────────
    {
      id: 'rate-each-part',
      num: '03',
      title: 'What you thought of each part',
      description:
        "Rate each area you tried, from not useful to very useful. Pick N/A for anything you didn't get to open. A blank row tells us nothing, an honest N/A does.",
      fields: [
        usefulnessRow('rate_dashboard', 'Dashboard and widgets'),
        usefulnessRow('rate_learn_page', 'Learn page (video, transcript, notes)'),
        usefulnessRow('rate_practice', 'Practice questions and flashcards'),
        usefulnessRow('rate_mock_exam', 'Mock Exam'),
        usefulnessRow('rate_ai_tutor', 'AI Tutor chat'),
        usefulnessRow('rate_next_ai', 'Next AI / Correction Agent'),
      ],
    },

    // ── 04 · What matters most ──────────────────────────────────────────────
    {
      id: 'what-matters',
      num: '04',
      title: 'What would actually help you',
      description:
        'These four shape what we build next, so pick the answer that is true for you rather than the one that sounds best.',
      fields: [
        {
          id: 'most_helpful',
          type: 'radio',
          layout: 'list',
          label: 'Which one would help your studying the most?',
          hint: 'Pick one.',
          options: [
            { value: 'Everything for a week in one place', label: 'Everything for a week in one place' },
            {
              value: 'AI tutor that answers from our own material',
              label: 'AI tutor that answers from our own material',
            },
            { value: 'Mock exam and the report afterwards', label: 'Mock exam and the report afterwards' },
            { value: 'Practice questions with explanations', label: 'Practice questions with explanations' },
            {
              value: 'Progress tracking / knowing where I stand',
              label: 'Progress tracking / knowing where I stand',
            },
            {
              value: 'Personalized session built around my weak areas',
              label: 'Personalized session built around my weak areas',
            },
          ],
        },
        {
          id: 'checkpoint_questions',
          type: 'radio',
          layout: 'list',
          label: 'The lecture video pauses for a checkpoint question. How did that feel?',
          options: [
            { value: 'About right', label: 'About right' },
            { value: 'Too often', label: 'Too often' },
            { value: 'Not often enough', label: 'Not often enough' },
            { value: "I'd rather they were optional", label: "I'd rather they were optional" },
            { value: "Didn't try it", label: "Didn't try it" },
          ],
        },
        {
          id: 'ai_tutor_compare',
          type: 'radio',
          layout: 'list',
          label: "When you're stuck on a topic, how does the AI tutor compare with what you do now?",
          options: [
            { value: 'Better than re-reading my notes', label: 'Better than re-reading my notes' },
            { value: 'Better than asking a classmate', label: 'Better than asking a classmate' },
            { value: 'About the same as what I do now', label: 'About the same as what I do now' },
            { value: "I'd still rather ask my instructor", label: "I'd still rather ask my instructor" },
            { value: "Didn't try it", label: "Didn't try it" },
          ],
        },
        {
          id: 'mock_exam_realism',
          type: 'radio',
          layout: 'list',
          label: 'Did the mock exam feel like the real computerized exam?',
          options: [
            { value: 'Yes, very close', label: 'Yes, very close' },
            { value: 'Close, but something was missing', label: 'Close, but something was missing' },
            { value: 'Not really', label: 'Not really' },
            { value: "Didn't try it", label: "Didn't try it" },
          ],
        },
      ],
    },

    // ── 05 · Open answers ───────────────────────────────────────────────────
    {
      id: 'in-your-own-words',
      num: '05',
      title: 'In your own words',
      description:
        'The tick-boxes tell us what. These tell us why, and a single specific sentence beats a paragraph of politeness.',
      fields: [
        {
          id: 'favourite_thing',
          type: 'textarea',
          label: 'What was your favourite thing about it?',
          rows: 3,
        },
        {
          id: 'confusing_or_broken',
          type: 'textarea',
          label: 'Was anything confusing, or did anything not work the way you expected?',
          hint: 'Where you were and what you expected to happen is enough. We can find the rest.',
          rows: 4,
        },
        {
          id: 'wishlist',
          type: 'textarea',
          label: 'What would you want added or changed before the full cohort starts?',
          rows: 4,
        },
      ],
    },

    // ── 06 · Overall ────────────────────────────────────────────────────────
    {
      id: 'overall',
      num: '06',
      title: 'Overall',
      description: 'Last two questions, then you are done.',
      fields: [
        {
          id: 'overall_rating',
          type: 'emojiscale',
          label: 'Overall, how would you rate the platform?',
          scaleLabels: { low: 'Poor', high: 'Excellent' },
          options: faceScale(['Poor', 'Below average', 'Fine', 'Good', 'Excellent']),
        },
        {
          id: 'would_recommend',
          type: 'radio',
          layout: 'pills',
          label: 'Would you recommend it to a classmate?',
          options: [
            { value: 'Definitely', label: 'Definitely' },
            { value: 'Probably', label: 'Probably' },
            { value: 'Not sure', label: 'Not sure' },
            { value: 'Probably not', label: 'Probably not' },
          ],
        },
        {
          id: 'anything_else',
          type: 'textarea',
          label: 'Anything else you want the team to know?',
          rows: 4,
        },
      ],
    },
  ],
};

export default nghiStudentFeedback;
