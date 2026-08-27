// ── Field & Form Config types ────────────────────────────────────────────────

export type FieldType =
  /** Read-only prose block — renders copy, collects no answer */
  | 'note'
  | 'text'
  | 'email'
  | 'phone'
  | 'number'
  | 'url'
  | 'date'
  | 'textarea'
  | 'radio'
  | 'checkboxgroup'
  | 'select'
  | 'slider'
  /** Row of emoji faces standing in for a 1-5 scale (feedback forms) */
  | 'emojiscale'
  | 'file';

export type RadioLayout = 'list' | 'pills' | 'grid' | 'compact';

export interface FieldOption {
  value: string;
  label: string;
  description?: string;
  badge?: string;
  badgeVariant?: 'red' | 'green' | 'amber' | 'blue';
  /**
   * emojiscale: name of the face drawn for this point on the scale — see the
   * `FaceName` union in components/FaceIcon. An option without one renders as
   * a text chip instead; that's how "N/A" sits on the end of a face row.
   */
  face?: string;
  /** Renders the option unselectable, e.g. a role that is no longer hiring */
  disabled?: boolean;
  /** Shown in place of the option's normal affordance when disabled */
  disabledNote?: string;
}

/**
 * Show a section only when another field's answer matches. Used by branching
 * forms — e.g. the hiring form asks which role you're applying for up front and
 * then shows only that role's questions.
 */
export interface ShowIf {
  /** id of the field to test — must live in a section that is always visible */
  field: string;
  /** section shows when the field's value is one of these */
  equals: string[];
}

export interface FormField {
  id: string;
  type: FieldType;
  label?: string;
  placeholder?: string;
  hint?: string;
  required?: boolean;
  /** For radio / checkboxgroup */
  options?: FieldOption[];
  /** How options are rendered */
  layout?: RadioLayout;
  /** textarea: min visible rows */
  rows?: number;
  /** Place side-by-side with the next half-width field */
  halfWidth?: boolean;
  /** Pre-filled value (e.g. brand palette hex codes, slider defaults) */
  defaultValue?: string;
  /** checkboxgroup: cap how many options can be selected */
  maxSelect?: number;
  /** emojiscale: captions printed under the two ends of the row */
  scaleLabels?: { low: string; high: string };
  /** slider: two end-point labels, e.g. [{value:'0',label:'Formal'},{value:'100',label:'Casual'}] */
  /** file: accepted file types, e.g. "image/*,.svg,.pdf" */
  accept?: string;
  /** file: allow multiple uploads for this field */
  multiple?: boolean;
  /** note: paragraphs of copy; a line starting with "- " renders as a bullet */
  body?: string[];
  /** note: renders as a highlighted callout rather than plain prose */
  variant?: 'plain' | 'callout';
  /**
   * Optional free-text companion, revealed by a "+ note" toggle under the
   * control and stored at `${id}__note`. Built for live discovery intake, where
   * the interviewee's own wording is often worth more than the option picked.
   */
  note?: {
    placeholder?: string;
    /** Open the note automatically once the answer equals this value, e.g. "Other" */
    openWhen?: string;
  };
}

/** Answer key holding a field's free-text note. */
export const noteKey = (fieldId: string) => `${fieldId}__note`;

// ── File upload value ─────────────────────────────────────────────────────────

export interface FileValue {
  name: string;
  url: string;
  size: number;
}

export interface FormSection {
  id: string;
  /** Display number. Branching forms renumber visible sections at render time. */
  num: string;
  title: string;
  description?: string;
  /** Omit to always show; otherwise the section appears only when the rule matches */
  showIf?: ShowIf;
  fields: FormField[];
}

export interface FormConfig {
  id: string;
  slug: string;
  /** Short title shown in the header */
  title: string;
  /** Italic part of the hero heading (e.g. "discovery") */
  heroAccent?: string;
  /** Hero subtitle copy */
  description?: string;
  /** e.g. "Phase 0 · Pre-meeting · Form 1 of 2" */
  eyebrow?: string;
  client: string;
  /**
   * 'steps' walks one section at a time with back/next navigation;
   * 'stacked' (default) renders every section down the page.
   * Both lay a section out as copy on the left, fields on the right.
   */
  layout?: 'stacked' | 'steps';
  /** Overrides the default reassurance note above the submit bar */
  footerNote?: string;
  sections: FormSection[];
}

// ── Submission types ─────────────────────────────────────────────────────────

export interface FormSubmission {
  id: string;
  formSlug: string;
  formTitle: string;
  senderName: string;
  senderEmail: string;
  senderNote: string;
  submittedAt: string;
  /** All form values; arrays for multi-select fields, FileValue[] for uploads */
  data: Record<string, string | string[] | FileValue[]>;
}

export interface SubmissionIndexEntry {
  id: string;
  formSlug: string;
  formTitle: string;
  senderName: string;
  senderEmail: string;
  submittedAt: string;
}
