// ── Small color utilities ────────────────────────────────────────────────────
// Used to derive a full, contrast-safe palette from a single brand color the
// client picks — no design background required on their end.

function hexToRgb(hex: string): [number, number, number] {
  const clean = hex.replace('#', '');
  const full = clean.length === 3 ? clean.split('').map(c => c + c).join('') : clean;
  const num = parseInt(full, 16);
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
}

function rgbToHex(r: number, g: number, b: number): string {
  const clamp = (v: number) => Math.max(0, Math.min(255, Math.round(v)));
  return '#' + [clamp(r), clamp(g), clamp(b)].map(v => v.toString(16).padStart(2, '0')).join('');
}

// Mix `hex` toward `target` by `weight` (0 = pure hex, 1 = pure target).
export function mix(hex: string, target: string, weight: number): string {
  const [r1, g1, b1] = hexToRgb(hex);
  const [r2, g2, b2] = hexToRgb(target);
  return rgbToHex(r1 + (r2 - r1) * weight, g1 + (g2 - g1) * weight, b1 + (b2 - b1) * weight);
}

// WCAG relative luminance (0 = black, 1 = white).
export function luminance(hex: string): number {
  const [r, g, b] = hexToRgb(hex).map(v => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export interface DerivedPalette {
  bg: string;
  ink: string;
  accent: string;
  secondary: string;
  buttonText: string;
}

export function deriveBrandPalette(primary: string): DerivedPalette {
  const ink = mix(primary, '#0b1220', 0.82);
  const bg = mix(primary, '#ffffff', 0.94);
  const secondary = mix(primary, '#000000', 0.22);
  const buttonText = luminance(primary) > 0.42 ? '#16222e' : '#ffffff';
  return { bg, ink, accent: primary, secondary, buttonText };
}
