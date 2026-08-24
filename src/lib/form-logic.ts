import type { FormConfig, FormField, FormSection, FileValue } from './types';

export type AnswerMap = Record<string, string | string[] | FileValue[] | undefined>;

/**
 * Branching + counting rules, shared by the form UI, the notification emails and
 * the submission viewer. All three must agree on which sections a given set of
 * answers actually produced — otherwise the email shows questions the applicant
 * was never asked.
 */

/** A `note` field is copy, not a question — it never collects an answer. */
export function isInputField(field: FormField): boolean {
  return field.type !== 'note';
}

export function inputFields(section: FormSection): FormField[] {
  return section.fields.filter(isInputField);
}

/** Does this section's `showIf` rule match the given answers? */
export function sectionMatches(section: FormSection, data: AnswerMap): boolean {
  const rule = section.showIf;
  if (!rule) return true;
  const value = data[rule.field];
  if (typeof value === 'string') return rule.equals.includes(value);
  // Multi-select gate: any overlap counts.
  if (Array.isArray(value)) {
    return value.some(v => typeof v === 'string' && rule.equals.includes(v));
  }
  return false;
}

/**
 * Sections to render for these answers, renumbered so the visible run always
 * reads 01, 02, 03… A branching form's configured `num` can't know which
 * sections survived the branch, so display numbering is derived here.
 */
export function visibleSections(form: FormConfig, data: AnswerMap): FormSection[] {
  return form.sections
    .filter(s => sectionMatches(s, data))
    .map((s, i) => ({ ...s, num: String(i + 1).padStart(2, '0') }));
}

/**
 * Sections that actually collect answers, renumbered contiguously. The form UI
 * numbers every visible section (a copy-only role brief is a real step for the
 * applicant), but the email and the submission viewer only deal in answers —
 * without this a brief would render as an empty card and get reported as
 * "left blank" when there was never anything to fill in.
 */
export function answerableSections(form: FormConfig, data: AnswerMap): FormSection[] {
  return form.sections
    .filter(s => sectionMatches(s, data))
    .map(s => ({ ...s, fields: inputFields(s) }))
    .filter(s => s.fields.length > 0)
    .map((s, i) => ({ ...s, num: String(i + 1).padStart(2, '0') }));
}

/** True once any branching rule exists — lets callers skip the extra work. */
export function isBranching(form: FormConfig): boolean {
  return form.sections.some(s => s.showIf);
}

const isAnswered = (value: AnswerMap[string]): boolean =>
  Array.isArray(value) ? value.length > 0 : typeof value === 'string' && value.trim() !== '';

/** Answered / total across the sections currently in play. */
export function progressFor(form: FormConfig, data: AnswerMap) {
  const fields = visibleSections(form, data).flatMap(inputFields);
  const answered = fields.filter(f => isAnswered(data[f.id])).length;
  return {
    answered,
    total: fields.length,
    pct: fields.length > 0 ? Math.round((answered / fields.length) * 100) : 0,
  };
}

/** Required questions the applicant still has to answer before submitting. */
export function missingRequired(form: FormConfig, data: AnswerMap): FormField[] {
  return visibleSections(form, data)
    .flatMap(inputFields)
    .filter(f => f.required && !isAnswered(data[f.id]));
}
