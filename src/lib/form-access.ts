import { headers } from 'next/headers';
import { getFormBySlug } from '@/forms';
import { brandById, brandForHost } from '@/lib/brands';
import type { FormConfig } from '@/lib/types';
import type { Metadata } from 'next';

/**
 * A client's own hostname serves only that client's forms. Without this, a
 * request to forms.<client>.com/forms/<another-client-slug> would render the
 * other client's form, pricing and all, under their domain.
 */
export async function allowedOnThisHost(formBrand: string | undefined): Promise<boolean> {
  const hostBrand = brandForHost((await headers()).get('host'));
  if (!hostBrand) return true;              // a Maxxlab domain serves everything
  return brandById(formBrand).id === hostBrand.id;
}

/** The form for a slug, or null when it is unknown or barred on this host. */
export async function formForRequest(slug: string): Promise<FormConfig | null> {
  const form = getFormBySlug(slug);
  if (!form) return null;
  if (!(await allowedOnThisHost(form.brand))) return null;
  return form;
}

export async function metadataFor(slug: string): Promise<Metadata> {
  const form = await formForRequest(slug);
  if (!form) return {};
  // Don't repeat the brand when the form's own title already carries it.
  const brand = brandById(form.brand);
  const title = form.title.includes(brand.name) ? form.title : `${form.title} · ${brand.name}`;
  return { title, description: form.description };
}
