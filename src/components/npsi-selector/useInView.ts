'use client';

import { useRef } from 'react';
import { useInView as useFramerInView } from 'framer-motion';

// Thin wrapper around framer-motion's viewport detection — fires once,
// the moment an element actually scrolls into view. Used to gate "on load"
// animations (count-up, chat sequence, carousel) so they play when a user
// actually sees them, not silently at mount time while off-screen.
export function useInView(amount = 0.2) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useFramerInView(ref, { once: true, amount });
  return { ref, inView } as const;
}
