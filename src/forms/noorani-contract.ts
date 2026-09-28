import type { FormConfig, FormField } from '@/lib/types';

// This FormConfig is a *data dictionary*, not a fill-out form. The live builder
// is a bespoke component (NooraniContractClient) that writes these exact field
// ids, so the submission viewer and the notification email can label and render
// the agreed contract without re-implementing any of the pricing logic.

const text = (id: string, label: string, extra: Partial<FormField> = {}): FormField =>
  ({ id, type: 'text', label, ...extra });

const nooraniContract: FormConfig = {
  id: 'noorani-contract',
  slug: 'noorani-contract',
  title: 'Noorani Surgical · Proposal and Service Agreement',
  heroAccent: 'Agreement',
  eyebrow: 'Maxxlab · Contract builder · Noorani Surgical',
  description:
    'Build both phases, agree the scope and price, sign, and send it to Maxxlab. Phase 1 is the Maxxlab website agreement, Phase 2 the Minilabs order form.',
  client: 'Noorani Surgical (Pvt) Ltd',
  footerNote: 'Questions? Contact: admin@maxxlab.tech',
  sections: [
    {
      id: 'agreement',
      num: '01',
      title: 'Agreed package',
      description: 'The headline commercial terms captured when this was signed.',
      fields: [
        text('package', 'Package'),
        text('total', 'Total, one-time'),
        text('timeline', 'Estimated timeline'),
        text('subtotal', 'Subtotal'),
        text('discount', 'Discount'),
        text('tax', 'Tax'),
        text('payment_schedule', 'Payment schedule'),
        text('retainer', 'Monthly retainer'),
        { id: 'retainer_scope', type: 'textarea', label: 'What the retainer covers' },
      ],
    },
    {
      id: 'scope',
      num: '02',
      title: 'Scope',
      description: 'What is in the agreement, and what was explicitly left out.',
      fields: [
        text('platform', 'Store platform'),
        { id: 'included', type: 'textarea', label: 'Included deliverables' },
        { id: 'excluded', type: 'textarea', label: 'Not included (change order later)' },
        text('support', 'Bug-fix support after launch'),
        text('revisions', 'Design revision rounds'),
        { id: 'notes', type: 'textarea', label: 'Special notes' },
      ],
    },
    {
      id: 'minilabs',
      num: '03',
      title: 'Phase 2 · Minilabs order form',
      description: 'The sales system, signed separately from the Maxxlab website agreement.',
      fields: [
        text('minilabs_status', 'Status'),
        { id: 'minilabs_labs', type: 'textarea', label: 'Labs selected' },
        text('minilabs_setup', 'Setup total'),
        text('minilabs_monthly', 'Monthly total'),
        text('minilabs_term', 'Minimum term and logins'),
        text('minilabs_reference', 'Order form reference'),
        text('minilabs_signatory', 'Minilabs signatory'),
        { id: 'minilabs_signature', type: 'signature', label: 'Minilabs signature' },
      ],
    },
    {
      id: 'parties',
      num: '04',
      title: 'Parties, dates and signatures',
      description: 'Who signed, on what date, under which law.',
      fields: [
        text('client_legal', 'Client legal name'),
        text('client_signatory', 'Client signatory'),
        text('maxxlab_signatory', 'Maxxlab signatory'),
        text('reference', 'Reference'),
        text('proposal_date', 'Proposal date'),
        text('valid_until', 'Valid until'),
        text('due_days', 'Invoice due'),
        text('governing_law', 'Governing law'),
        { id: 'client_signature', type: 'signature', label: 'Client signature' },
        { id: 'maxxlab_signature', type: 'signature', label: 'Maxxlab signature' },
      ],
    },
  ],
};

export default nooraniContract;
