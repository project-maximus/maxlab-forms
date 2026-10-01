import type { FormConfig, FormField } from '@/lib/types';

// Like noorani-contract, this FormConfig is a *data dictionary*, not a fill-out
// form. The live page is a bespoke component (AirportLimoContractClient) that
// writes these exact field ids, so the submission viewer and the notification
// email can label and render the signed agreement.

const text = (id: string, label: string, extra: Partial<FormField> = {}): FormField =>
  ({ id, type: 'text', label, ...extra });

const airportLimoContract: FormConfig = {
  id: 'airport-limo-contract',
  slug: 'airport-limo-contract',
  title: 'Airport Limo Toronto · Proposal and Service Agreement',
  heroAccent: 'Agreement',
  eyebrow: 'Maxxlab × Minilabs · Proposal · Airport Limo Toronto',
  description:
    'A modern website, monthly Website Growth and the Minilabs Booking System. Review the scope and price, choose your plan, sign, and send it to Maxxlab.',
  client: 'Airport Limo Toronto',
  footerNote: 'Questions? Usman Khan · +1 437 981 9816 · admin@maxxlab.tech',
  sections: [
    {
      id: 'agreement',
      num: '01',
      title: 'Agreed plan',
      description: 'The commercial terms captured when this was signed.',
      fields: [
        text('plan', 'Plan'),
        text('minilabs', 'Minilabs Booking System'),
        text('one_time', 'One-time, website build'),
        text('monthly_launch', 'Monthly, months 1–3'),
        text('monthly_after', 'Monthly, from month 4'),
        text('payment_schedule', 'Payment schedule'),
        text('minimum_term', 'Minimum term'),
      ],
    },
    {
      id: 'parties',
      num: '02',
      title: 'Parties, dates and signatures',
      description: 'Who signed, on what date, under which law.',
      fields: [
        text('client_legal', 'Client'),
        text('client_signatory', 'Client signatory'),
        text('client_date', 'Client signing date'),
        text('provider_signatory', 'Maxxlab and Minilabs signatory'),
        text('provider_date', 'Provider signing date'),
        text('reference', 'Reference'),
        text('proposal_date', 'Proposal date'),
        text('valid_until', 'Valid until'),
        text('governing_law', 'Governing law'),
        { id: 'client_signature', type: 'signature', label: 'Client signature' },
        { id: 'provider_signature', type: 'signature', label: 'Maxxlab and Minilabs signature' },
      ],
    },
  ],
};

export default airportLimoContract;
