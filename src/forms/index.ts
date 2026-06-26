import type { FormConfig } from '@/lib/types';
import nutriPathWebsite from './nutripath-website';
import nutriPathBrandContent from './nutripath-brand-content';
import npsiDirectionSelector from './npsi-direction-selector';

// ── Form registry ─────────────────────────────────────────────────────────────
// Add new forms here — they'll appear on the home page automatically.

const forms: FormConfig[] = [
  nutriPathWebsite,
  nutriPathBrandContent,
  npsiDirectionSelector,
];

export function getAllForms(): FormConfig[] {
  return forms;
}

export function getFormBySlug(slug: string): FormConfig | undefined {
  return forms.find(f => f.slug === slug);
}
