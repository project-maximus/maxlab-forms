import type { NextConfig } from 'next';

// Slugs that have been renamed. The old URL keeps working, because a form link
// may already be out in the world on a job post, a WhatsApp message or someone's
// open tab. Temporary, so a slug can be reused later if it ever needs to be.
const RENAMED_SLUGS: Record<string, string> = {
  'worldtimes-hiring-tech': 'worldtimes-hiring',
};

const nextConfig: NextConfig = {
  async redirects() {
    return Object.entries(RENAMED_SLUGS).map(([from, to]) => ({
      source: `/forms/${from}`,
      destination: `/forms/${to}`,
      permanent: false,
    }));
  },
  // Polyfill broken Node.js 25 built-in localStorage in the server runtime
  serverExternalPackages: [],
  webpack(config, { isServer }) {
    if (isServer) {
      config.plugins = config.plugins ?? [];
    }
    return config;
  },
};

// Patch the broken Node.js 25 localStorage in server contexts
if (typeof globalThis.localStorage !== 'undefined') {
  try {
    globalThis.localStorage.getItem('__test__');
  } catch {
    // Node 25 localStorage exists but is broken — replace with a no-op shim
    const _store: Record<string, string> = {};
    (globalThis as Record<string, unknown>).localStorage = {
      getItem: (k: string) => _store[k] ?? null,
      setItem: (k: string, v: string) => { _store[k] = v; },
      removeItem: (k: string) => { delete _store[k]; },
      clear: () => { Object.keys(_store).forEach(k => delete _store[k]); },
      key: (i: number) => Object.keys(_store)[i] ?? null,
      get length() { return Object.keys(_store).length; },
    };
  }
}

export default nextConfig;
