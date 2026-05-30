// ── Field & Form Config types ────────────────────────────────────────────────

export type FieldType =
  | 'text'
  | 'email'
  | 'phone'
  | 'number'
  | 'url'
  | 'date'
  | 'textarea'
  | 'radio'
  | 'checkboxgroup'
  | 'select';

export type RadioLayout = 'list' | 'pills' | 'grid';

export interface FieldOption {
  value: string;
  label: string;
  description?: string;
  badge?: string;
  badgeVariant?: 'red' | 'green' | 'amber' | 'blue';
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
}

export interface FormSection {
  id: string;
  num: string;
  title: string;
  description?: string;
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
  /** All form values; arrays for multi-select fields */
  data: Record<string, string | string[]>;
}

export interface SubmissionIndexEntry {
  id: string;
  formSlug: string;
  formTitle: string;
  senderName: string;
  senderEmail: string;
  submittedAt: string;
}
