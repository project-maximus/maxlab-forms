import type { FieldOption, FormField } from './types';

// ── Face rating scales ────────────────────────────────────────────────────────
// Shared by the NGHI feedback forms so a 3 always looks like a 3, whichever
// form you are filling in. Face names come from components/FaceIcon.

const FACES = ['angry', 'frown', 'meh', 'smile', 'laugh'] as const;

/** Wording for points 1 to 5, low end first. */
export type ScaleWords = readonly [string, string, string, string, string];

/** The five faces, numbered 1 to 5, each carrying its own wording. */
export function faceScale(words: ScaleWords): FieldOption[] {
  return words.map((label, i) => ({ value: String(i + 1), label, face: FACES[i] }));
}

/**
 * One row of a rating matrix: the same five faces in the compact layout, with
 * an opt-out on the end. The opt-out carries no face, so it renders as a text
 * chip rather than a sixth expression.
 */
export function ratingRow(
  id: string,
  label: string,
  words: ScaleWords,
  optOutLabel: string,
): FormField {
  return {
    id,
    type: 'emojiscale',
    layout: 'compact',
    label,
    options: [...faceScale(words), { value: 'na', label: optOutLabel }],
  };
}
