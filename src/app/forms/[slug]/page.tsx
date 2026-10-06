import { notFound } from 'next/navigation';
import FormClient from '@/components/FormClient';
import { formForRequest, metadataFor } from '@/lib/form-access';
import type { Metadata } from 'next';

// The declarative forms. The three bespoke contracts live in their own route
// segments beside this one, so their code never enters this shared chunk.

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return metadataFor((await params).slug);
}

export default async function FormPage({ params }: Props) {
  const form = await formForRequest((await params).slug);
  if (!form) notFound();
  return <FormClient form={form} />;
}
