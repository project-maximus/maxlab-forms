'use client';

import { useEffect, useRef, useState } from 'react';
import Logo from '@/components/Logo';
import type { Brand } from '@/lib/brands';

/**
 * The mark at the top of a form.
 *
 * Maxxlab's own forms use the inline SVG. A client brand uses its artwork and
 * falls back to its name set in the house type when that file is missing, so a
 * brand can be wired up before its logo is delivered without ever showing a
 * broken image.
 *
 * The server renders the <img>, so a missing file fails while the HTML is still
 * parsing, before React attaches anything. onError alone never fires in that
 * case, so on mount we also ask the element whether it finished loading with no
 * intrinsic size, which is what a failed image looks like.
 */
export default function BrandMark({ brand }: { brand: Brand }) {
  const [failed, setFailed] = useState(false);
  const ref = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (el && el.complete && el.naturalWidth === 0) setFailed(true);
  }, []);

  if (brand.logo && !failed) {
    return (
      /* eslint-disable-next-line @next/next/no-img-element */
      <img
        ref={ref}
        src={brand.logo.src}
        alt={brand.logo.alt}
        style={{ height: brand.logo.height, width: 'auto' }}
        className="block"
        onError={() => setFailed(true)}
      />
    );
  }

  if (brand.id === 'maxxlab') return <Logo size={34} />;

  return (
    <div className="text-[19px] font-medium tracking-[-0.02em] text-brand-ink">
      {brand.name}
    </div>
  );
}
