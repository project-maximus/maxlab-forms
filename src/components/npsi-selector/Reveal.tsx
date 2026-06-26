'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

// Scroll-triggered rise-in, once per element — built on framer-motion's
// viewport detection (the same engine behind Aceternity/Magic UI/HeroUI).
export default function Reveal({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}
