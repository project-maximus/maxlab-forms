import type { FormConfig } from '@/lib/types';
import nutriPathWebsite from './nutripath-website';

// ── Form registry ─────────────────────────────────────────────────────────────
// Add new forms here — they'll appear on the home page automatically.

const forms: FormConfig[] = [
  nutriPathWebsite,
];

export function getAllForms(): FormConfig[] {
  return forms;
}

export function getFormBySlug(slug: string): FormConfig | undefined {
  return forms.find(f => f.slug === slug);
}
