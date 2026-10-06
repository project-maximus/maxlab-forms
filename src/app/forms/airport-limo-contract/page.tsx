import { notFound } from 'next/navigation';
import AirportLimoContractClient from '@/components/airport-limo/AirportLimoContractClient';
import { formForRequest, metadataFor } from '@/lib/form-access';
import type { Metadata } from 'next';

// Its own route segment, so this client component ships only on this URL and
// never lands in the chunk that every other form downloads.
const SLUG = 'airport-limo-contract';

export const generateMetadata = (): Promise<Metadata> => metadataFor(SLUG);

export default async function Page() {
  const form = await formForRequest(SLUG);
  if (!form) notFound();
  return <AirportLimoContractClient form={form} />;
}
