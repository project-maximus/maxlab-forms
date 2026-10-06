// ── Brand registry ────────────────────────────────────────────────────────────
// One deployment serves several clients' forms. A form carries a `brand` id and
// the renderer swaps the logo, the submit wording and the footer credit from
// here. The house styling (type, spacing, colour) never changes: only the mark
// at the top and the name on the button.
//
// `host` additionally scopes a client's own domain. When a request arrives on
// that hostname, only that brand's forms resolve and everything else 404s, so
// one client's domain can never serve another client's contract or pricing.

export interface Brand {
  id: string;
  /** Legal or trading name, used in the submit button and page metadata. */
  name: string;
  /**
   * Logo file in /public. Left undefined, the hero falls back to a wordmark set
   * in the house type, which keeps a brand usable before its artwork arrives.
   */
  logo?: { src: string; alt: string; height: number };
  /** Wording on the primary submit button. */
  submitLabel: string;
  /** Quiet line under the footer note. Omitted for Maxxlab's own forms. */
  credit?: string;
  /** Dedicated hostname. Requests on it resolve only this brand's forms. */
  host?: string;
  /**
   * Where the bare hostname should land. Someone who types the domain without
   * a path gets sent here rather than a 404. Leave unset to 404 the root.
   */
  home?: string;
}

export const MAXXLAB: Brand = {
  id: 'maxxlab',
  name: 'Maxxlab',
  submitLabel: 'Send to Maxxlab',
};

const BRANDS: Brand[] = [
  MAXXLAB,
  {
    id: 'worldtimes',
    name: 'World Times Institute',
    // Horizontal lockup, trimmed to its artwork so `height` is exact.
    logo: { src: '/worldtimes.png', alt: 'World Times Institute', height: 44 },
    submitLabel: 'Send application',
    host: 'forms.worldtimesinstitute.com.pk',
    home: '/forms/worldtimes-hiring',
  },
];

export function brandById(id: string | undefined): Brand {
  if (!id) return MAXXLAB;
  return BRANDS.find(b => b.id === id) ?? MAXXLAB;
}

/**
 * The brand that owns a hostname, or undefined for Maxxlab's own domains.
 * Port and case are stripped so this works on localhost and preview URLs.
 */
export function brandForHost(host: string | null | undefined): Brand | undefined {
  if (!host) return undefined;
  const clean = host.split(':')[0].trim().toLowerCase();
  return BRANDS.find(b => b.host && b.host.toLowerCase() === clean);
}
