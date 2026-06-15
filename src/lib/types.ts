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
  | 'select'
  | 'slider'
  | 'file';

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
  /** Pre-filled value (e.g. brand palette hex codes, slider defaults) */
  defaultValue?: string;
  /** checkboxgroup: cap how many options can be selected */
  maxSelect?: number;
  /** slider: two end-point labels, e.g. [{value:'0',label:'Formal'},{value:'100',label:'Casual'}] */
  /** file: accepted file types, e.g. "image/*,.svg,.pdf" */
  accept?: string;
  /** file: allow multiple uploads for this field */
  multiple?: boolean;
}

// ── File upload value ─────────────────────────────────────────────────────────

export interface FileValue {
  name: string;
  url: string;
  size: number;
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
