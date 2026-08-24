import type { FormConfig } from '@/lib/types';
import nutriPathWebsite from './nutripath-website';
import nutriPathBrandContent from './nutripath-brand-content';
import npsiDirectionSelector from './npsi-direction-selector';
import websiteTransformation from './website-transformation';
import hiringAiFullstack from './hiring-ai-fullstack';
import ispotPricingCall from './ispot-pricing-call';
import nghiProgramContent from './nghi-program-content';
import hiringProductTeam from './hiring-product-team';

// ── Form registry ─────────────────────────────────────────────────────────────
// Add new forms here — they'll appear on the home page automatically.

const forms: FormConfig[] = [
  nutriPathWebsite,
  nutriPathBrandContent,
  npsiDirectionSelector,
  websiteTransformation,
  hiringAiFullstack,
  ispotPricingCall,
  nghiProgramContent,
  hiringProductTeam,
];

export function getAllForms(): FormConfig[] {
  return forms;
}

export function getFormBySlug(slug: string): FormConfig | undefined {
  return forms.find(f => f.slug === slug);
}
