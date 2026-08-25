import type { FormConfig, FormField } from '@/lib/types';
import { faceScale, ratingRow } from '@/lib/scale';

// ── NGHI instructor & staff feedback · AI learning platform demo ──────────────
// The educator-side counterpart to nghi-student-feedback. Same face scales and
// the same "only your name is required" rule, but the questions ask whether the
// content is safe to put in front of a class and what the teacher-facing side
// still needs.

const QUALITY = ['Poor', 'Below average', 'Fine', 'Good', 'Excellent'] as const;

/** One row of the "rate what you saw" matrix. */
function qualityRow(id: string, label: string): FormField {
  return ratingRow(id, label, QUALITY, "Didn't review");
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

const nghiInstructorFeedback: FormConfig = {
  id: 'nghi-instructor-feedback',
  slug: 'nghi-instructor-feedback',
  title: 'Instructor & Staff Feedback · Platform Demo',
  heroAccent: 'Feedback',
  eyebrow: 'Next Gen Health Institute · AI Learning Platform · Demo',
  description:
    "Thanks for reviewing the demo. We're after your read as an educator: whether the content is accurate enough to put in front of students, and what the teacher-facing side needs next. Mostly tick-boxes, about 6 minutes.",
  client: 'Next Gen Health Institute',
  layout: 'steps',
  footerNote:
    'Only your name is required. Skip anything outside your role. Questions? admin@maxxlab.tech',
  sections: [
    // ── 01 · Who's answering ────────────────────────────────────────────────
    {
      id: 'about-you',
      num: '01',
      title: 'Before we start',
      description:
        'So we know whose read this is and which programs you are speaking for. Nothing here is shared outside the team.',
      fields: [
        { id: 'full_name', type: 'text', label: 'Your name', required: true, halfWidth: true },
        { id: 'email', type: 'email', label: 'Your email', halfWidth: true },
        {
          id: 'role',
          type: 'text',
          label: 'Your role',
          placeholder: 'e.g. Instructor, Program Director, Registrar',
          halfWidth: true,
        },
        { id: 'demo_date', type: 'date', label: 'Date you reviewed the demo', halfWidth: true },
        {
          id: 'programs',
          type: 'checkboxgroup',
          layout: 'list',
          label: 'Program or programs you teach or oversee',
          hint: 'Tick every one you can speak for.',
          options: [
            { value: 'All programs', label: 'All programs' },
            ...PROGRAMS.map(name => ({ value: name, label: name })),
            { value: 'Other / not listed', label: 'Other / not listed' },
          ],
        },
      ],
    },

    // ── 02 · Overall ────────────────────────────────────────────────────────
    {
      id: 'overall',
      num: '02',
      title: 'Overall',
      description:
        'Your headline read on the platform as it stands today, before we get into specifics.',
      fields: [
        {
          id: 'overall_impression',
          type: 'emojiscale',
          label: 'Overall impression of the platform in its current state',
          scaleLabels: { low: 'Not there yet', high: 'Very strong' },
          options: faceScale(['Not there yet', 'Some way off', 'Getting there', 'Strong', 'Very strong']),
        },
        {
          id: 'replaces_classroom',
          type: 'emojiscale',
          label: 'How well could this eventually replace Google Classroom for your program?',
          scaleLabels: { low: 'Not confident', high: 'Very confident' },
          options: faceScale([
            'Not confident',
            'Doubtful',
            'Possibly',
            'Confident',
            'Very confident',
          ]),
        },
        {
          id: 'mock_exam_vs_examsoft',
          type: 'radio',
          layout: 'list',
          label: 'How close is the Mock Exam to what you would need in place of ExamSoft?',
          options: [
            { value: 'Close enough already', label: 'Close enough already' },
            { value: 'Close, with specific gaps', label: 'Close, with specific gaps' },
            { value: 'Not close yet', label: 'Not close yet' },
            { value: "Didn't review it", label: "Didn't review it" },
          ],
        },
      ],
    },

    // ── 03 · Content and teaching fit ───────────────────────────────────────
    {
      id: 'content-fit',
      num: '03',
      title: 'Content and teaching fit',
      description:
        "Rate what you saw, from poor to excellent. Pick the opt-out for anything you didn't review. A blank row tells us nothing, an honest skip does.",
      fields: [
        qualityRow('rate_dashboard_personalization', 'Dashboard personalization feature'),
        qualityRow('rate_syllabus_scope', 'Answers staying inside your syllabus'),
        qualityRow('rate_citations', 'Source citations / page references'),
        qualityRow('rate_next_ai', "Next AI (Teacher's Assistant)"),
        qualityRow('rate_mock_exam_realism', 'Realism of the mock exam'),
        qualityRow('rate_unit_week_structure', 'Unit-and-week structure vs. how you teach'),
        qualityRow('rate_progress_visibility', 'Visibility of student progress'),
      ],
    },

    // ── 04 · Fit with how you run the course ────────────────────────────────
    {
      id: 'course-fit',
      num: '04',
      title: 'Fit with how you run the course',
      description:
        'What it would change about your week, and what you would need walked through before you rely on it.',
      fields: [
        {
          id: 'time_saved',
          type: 'radio',
          layout: 'list',
          label: 'Compared with how you run the course today, how much time would this save you each week?',
          options: [
            { value: 'None', label: 'None' },
            { value: 'Under an hour', label: 'Under an hour' },
            { value: '1–3 hours', label: '1–3 hours' },
            { value: 'More than 3 hours', label: 'More than 3 hours' },
            { value: 'Too early to say', label: 'Too early to say' },
          ],
        },
        {
          id: 'walkthrough_wanted',
          type: 'checkboxgroup',
          layout: 'list',
          label: 'What would you most want to see in the teacher and admin walkthrough?',
          hint: 'Tick all that apply.',
          options: [
            {
              value: 'How student performance is tracked and reported',
              label: 'How student performance is tracked and reported',
            },
            { value: 'How to upload and edit course content', label: 'How to upload and edit course content' },
            {
              value: 'How AI-generated questions are reviewed and approved',
              label: 'How AI-generated questions are reviewed and approved',
            },
            { value: 'How to set up and run a mock exam', label: 'How to set up and run a mock exam' },
            {
              value: 'How to manage the community page and bookings',
              label: 'How to manage the community page and bookings',
            },
            { value: 'Something else', label: 'Something else', description: 'Tell us below.' },
          ],
        },
        {
          id: 'walkthrough_other',
          type: 'textarea',
          label: 'If you ticked "Something else", what is it?',
          rows: 3,
        },
        {
          id: 'checkpoint_interval',
          type: 'radio',
          layout: 'list',
          label: 'What checkpoint-quiz interval would suit your lectures?',
          options: [
            { value: 'Every 10–15 minutes', label: 'Every 10–15 minutes' },
            { value: 'Every 20–30 minutes', label: 'Every 20–30 minutes' },
            { value: 'Every 30–40 minutes', label: 'Every 30–40 minutes' },
            { value: 'Configurable per lecture', label: 'Configurable per lecture' },
          ],
        },
      ],
    },

    // ── 05 · The teacher side ───────────────────────────────────────────────
    {
      id: 'teacher-side',
      num: '05',
      title: 'The teacher side',
      description:
        'The half of the platform you would live in. Ranking these is what decides what we build first.',
      fields: [
        {
          id: 'dashboard_priorities',
          type: 'checkboxgroup',
          layout: 'list',
          label: 'What would you most want on the teacher dashboard?',
          hint: 'Tick your top three. Forcing a choice here is the point.',
          maxSelect: 3,
          options: [
            { value: 'Per-student performance breakdown', label: 'Per-student performance breakdown' },
            { value: 'Class-wide weak-topic summary', label: 'Class-wide weak-topic summary' },
            { value: 'Progress and completion tracking', label: 'Progress and completion tracking' },
            { value: 'Video and checkpoint activity', label: 'Video and checkpoint activity' },
            { value: 'Mock exam results by competency', label: 'Mock exam results by competency' },
            { value: 'Alerts for students falling behind', label: 'Alerts for students falling behind' },
            { value: 'Homework submission tracking', label: 'Homework submission tracking' },
            { value: 'Uploading and editing curriculum content', label: 'Uploading and editing curriculum content' },
            { value: 'Approving AI-generated questions', label: 'Approving AI-generated questions' },
          ],
        },
        {
          id: 'community_vs_whatsapp',
          type: 'radio',
          layout: 'list',
          label: 'Will the community page realistically replace the WhatsApp group?',
          options: [
            { value: 'Yes, students will move over', label: 'Yes, students will move over' },
            { value: 'Partly, some will stay on WhatsApp', label: 'Partly, some will stay on WhatsApp' },
            { value: 'No', label: 'No' },
          ],
        },
        {
          id: 'leaderboard_timing',
          type: 'radio',
          layout: 'list',
          label: 'Leaderboard and achievements are currently switched off. When should they come on?',
          options: [
            { value: 'Keep them off', label: 'Keep them off' },
            { value: 'Opt-in per student', label: 'Opt-in per student' },
            { value: 'For a future cohort', label: 'For a future cohort' },
            { value: 'Turn them on now', label: 'Turn them on now' },
          ],
        },
      ],
    },

    // ── 06 · Open answers ───────────────────────────────────────────────────
    {
      id: 'in-your-own-words',
      num: '06',
      title: 'In your own words',
      description:
        'The tick-boxes tell us what. These tell us why, and one specific example is worth more than a general verdict.',
      fields: [
        {
          id: 'most_useful',
          type: 'textarea',
          label: 'What stood out as most useful in the demo?',
          rows: 3,
        },
        {
          id: 'biggest_gap',
          type: 'textarea',
          label: 'What is the biggest gap you would want closed next?',
          hint: 'If it would stop you putting this in front of a class, say so plainly.',
          rows: 4,
        },
        {
          id: 'anything_else',
          type: 'textarea',
          label: 'Anything else for the development team?',
          hint: "We can also walk through your notes live if that's easier. Just say so here.",
          rows: 4,
        },
      ],
    },
  ],
};

export default nghiInstructorFeedback;
