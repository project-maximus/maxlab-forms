import type { FormConfig, FieldOption } from '@/lib/types';
import {
  COMPASS_QUESTIONS,
  ANXIETY_LEVELS,
  SPECIALTY_LINES,
  PHYSICIAN_INVOLVEMENT,
  BRAND_COLOR_PRESETS,
  DIRECTIONS,
  TRUST_STYLES,
  PHOTOGRAPHY_STYLES,
  NAV_STYLES,
  HOMEPAGE_STRUCTURES,
  CTA_STYLES,
  COMPONENT_GROUPS,
} from '@/lib/npsi-selector-data';

// This FormConfig is a *data dictionary* — it gives the generic view/email
// renderers field labels to display. The live fill-out experience is a
// bespoke component (NPSISelectorClient), not the generic FormClient, but it
// writes into `values` using exactly these field ids so both renderers agree.

const toOptions = (labels: readonly string[]): FieldOption[] => labels.map(l => ({ value: l, label: l }));

const compassField = (q: (typeof COMPASS_QUESTIONS)[number]) => ({
  id: q.id,
  type: 'radio' as const,
  label: q.question,
  options: toOptions(q.options),
});

const npsiDirectionSelector: FormConfig = {
  id: 'npsi-direction-selector',
  slug: 'npsi-direction-selector',
  title: 'North PKWY Surgical Institute · Website Direction Selector',
  heroAccent: 'Direction',
  eyebrow: 'Pre-Design · Website Direction Selector',
  description: 'Aligning your website with your patients, your physicians, and your practice — before design begins.',
  client: 'North PKWY Surgical Institute',
  sections: [
    {
      id: 'compass',
      num: '01',
      title: 'Strategic compass',
      description: 'Intent before aesthetics — this shapes which direction actually fits.',
      fields: [
        ...COMPASS_QUESTIONS.map(compassField),
        { id: 'anxiety_level', type: 'radio', label: 'On average, how anxious are incoming patients?', options: toOptions(ANXIETY_LEVELS) },
        { id: 'specialty_priority', type: 'radio', label: 'Which specialty line drives the most patient volume?', options: toOptions(SPECIALTY_LINES) },
        { id: 'physician_involved', type: 'radio', label: 'Will lead physicians be involved in approving the design?', options: toOptions(PHYSICIAN_INVOLVEMENT) },
      ],
    },
    {
      id: 'brand-colors',
      num: '02',
      title: 'Brand colors',
      description: 'Every direction below is re-rendered in this color — not a generic preset.',
      fields: [
        { id: 'brand_name', type: 'text', label: 'Business name used in previews' },
        { id: 'brand_primary_color', type: 'text', label: 'Primary brand color', placeholder: BRAND_COLOR_PRESETS[0].hex },
      ],
    },
    {
      id: 'direction',
      num: '03',
      title: 'Visual direction',
      description: 'The primary aesthetic and emotional register of the website.',
      fields: [
        { id: 'primary_direction', type: 'radio', label: 'Selected direction', options: toOptions(DIRECTIONS.map(d => d.name)) },
        { id: 'eliminated_directions', type: 'checkboxgroup', label: 'Directions ruled out before reviewing', options: toOptions(DIRECTIONS.map(d => d.name)) },
        { id: 'direction_notes', type: 'textarea', label: 'Notes on the chosen direction', rows: 3 },
      ],
    },
    {
      id: 'trust',
      num: '04',
      title: 'Trust & credential style',
      description: 'How accreditation and physician credentials are displayed.',
      fields: [
        { id: 'trust_style', type: 'radio', label: 'Trust display approach', options: toOptions(TRUST_STYLES.map(t => t.label)) },
      ],
    },
    {
      id: 'photography',
      num: '05',
      title: 'Photography approach',
      description: 'Locking this in now avoids scope surprises during the build.',
      fields: [
        { id: 'photography_style', type: 'radio', label: 'Photography style', options: toOptions(PHOTOGRAPHY_STYLES.map(p => p.label)) },
      ],
    },
    {
      id: 'structure',
      num: '06',
      title: 'Navigation & homepage structure',
      description: 'Chosen by information hierarchy, not visual preference.',
      fields: [
        { id: 'navigation_style', type: 'radio', label: 'Navigation structure', options: toOptions(NAV_STYLES.map(n => n.label)) },
        { id: 'homepage_structure', type: 'radio', label: 'Homepage section order', options: toOptions(HOMEPAGE_STRUCTURES.map(h => h.label)) },
      ],
    },
    {
      id: 'cta',
      num: '07',
      title: 'Call-to-action commitment',
      description: 'The primary conversion action, decided before design begins.',
      fields: [
        { id: 'cta_style', type: 'radio', label: 'Primary call to action', options: toOptions(CTA_STYLES.map(c => c.label)) },
      ],
    },
    {
      id: 'components',
      num: '08',
      title: 'Component refinement (optional)',
      description: 'Skippable — only for clients who want to go a level deeper.',
      fields: COMPONENT_GROUPS.flatMap(g =>
        g.categories.map(c => ({
          id: c.fieldId,
          type: 'radio' as const,
          label: `${g.moment} — ${c.label}`,
          options: toOptions(c.options.map(o => o.label)),
        }))
      ),
    },
    {
      id: 'summary',
      num: '09',
      title: 'Summary & delivery',
      description: 'Review the alignment statement, add notes, and submit.',
      fields: [
        { id: 'agency_notes', type: 'textarea', label: 'Anything else for the agency', rows: 4 },
      ],
    },
  ],
};

export default npsiDirectionSelector;
