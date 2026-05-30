'use client';

import { useState } from 'react';

export default function CopyButton({ slug }: { slug: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    const url = `${window.location.origin}/forms/${slug}`;
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      onClick={handleCopy}
      className="px-4 py-2.5 text-sm font-medium border border-brand-line rounded-full hover:border-brand-ink transition-colors"
    >
      {copied ? 'Copied!' : 'Copy link'}
    </button>
  );
}
