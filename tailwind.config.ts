import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          red: '#fe3030',
          'red-dark': '#dc1c1c',
          ink: '#0f172a',
          'ink-2': '#334155',
          'ink-3': '#64748b',
          'ink-4': '#94a3b8',
          bg: '#f6f7f9',
          line: '#e2e8f0',
          'line-2': '#cbd5e1',
        },
      },
      fontFamily: {
        sans: ['var(--font-geist)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-instrument)', 'Georgia', 'serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
      },
      boxShadow: {
        card: '0 1px 4px rgba(15,23,42,0.06), 0 4px 16px rgba(15,23,42,0.06)',
        'card-hover': '0 2px 8px rgba(15,23,42,0.08), 0 8px 24px rgba(15,23,42,0.08)',
      },
      animation: {
        'slide-up': 'slideUp 0.2s ease',
        'fade-in': 'fadeIn 0.15s ease',
        spin: 'spin 0.6s linear infinite',
        'rise-in': 'riseIn 0.5s ease both',
        drift: 'drift 9s ease-in-out infinite',
        'drift-slow': 'drift 13s ease-in-out infinite',
        'spin-slow': 'spin-slow 3.5s linear infinite',
        blink: 'blink 1s step-end infinite',
        shimmer: 'shimmer 2.2s linear infinite',
      },
      keyframes: {
        slideUp: {
          from: { transform: 'translateY(12px)', opacity: '0' },
          to: { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        riseIn: {
          from: { transform: 'translateY(18px)', opacity: '0' },
          to: { transform: 'translateY(0)', opacity: '1' },
        },
        drift: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '50%': { transform: 'translate(14px, -12px) scale(1.08)' },
        },
        'spin-slow': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        shimmer: {
          from: { backgroundPosition: '0% 0' },
          to: { backgroundPosition: '-200% 0' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
