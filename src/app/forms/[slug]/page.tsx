import { notFound } from 'next/navigation';
import { getFormBySlug } from '@/forms';
import FormClient from '@/components/FormClient';
import NPSISelectorClient from '@/components/npsi-selector/NPSISelectorClient';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const form = getFormBySlug(slug);
  if (!form) return {};
  return {
    title: `${form.title} — Maxxlab`,
    description: form.description,
  };
}

export default async function FormPage({ params }: Props) {
  const { slug } = await params;
  const form = getFormBySlug(slug);
  if (!form) notFound();
  if (slug === 'npsi-direction-selector') return <NPSISelectorClient form={form} />;
  return <FormClient form={form} />;
}
