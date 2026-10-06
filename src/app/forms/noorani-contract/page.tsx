import { notFound } from 'next/navigation';
import NooraniContractClient from '@/components/noorani/NooraniContractClient';
import { formForRequest, metadataFor } from '@/lib/form-access';
import type { Metadata } from 'next';

// Its own route segment, so this client component ships only on this URL and
// never lands in the chunk that every other form downloads.
const SLUG = 'noorani-contract';

export const generateMetadata = (): Promise<Metadata> => metadataFor(SLUG);

export default async function Page() {
  const form = await formForRequest(SLUG);
  if (!form) notFound();
  return <NooraniContractClient form={form} />;
}
