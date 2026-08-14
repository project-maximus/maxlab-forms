import type { FormConfig } from '@/lib/types';

const ispotPricingCall: FormConfig = {
  id: 'ispot-pricing-call',
  slug: 'ispot-pricing-call',
  title: 'iSpotGlobal Pricing — Call Request',
  eyebrow: 'pricing.maxxlab.tech',
  description: 'Submitted from the iSpotGlobal pricing page when a plan is selected.',
  client: 'iSpotGlobal',
  sections: [
    {
      id: 'plan',
      num: '01',
      title: 'Plan interest',
      fields: [
        { id: 'planCategory', type: 'text', label: 'Category', halfWidth: true },
        { id: 'planName', type: 'text', label: 'Plan selected', halfWidth: true },
        { id: 'planPrice', type: 'text', label: 'Price', halfWidth: true },
        { id: 'company', type: 'text', label: 'Company', halfWidth: true },
      ],
    },
  ],
};

export default ispotPricingCall;
