'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import {
  JOURNEY_STAGES, GENERIC_TEAM, GENERIC_TESTIMONIALS, GENERIC_JOURNEY, GENERIC_TRUST_SIGNALS, GENERIC_FEATURES,
  GENERIC_PRICING_TIERS, GENERIC_NAV_ITEMS, DEFAULT_BRAND_NAME, type Direction,
} from '@/lib/npsi-selector-data';
import { mix } from '@/lib/color';
import { useInView } from './useInView';
import { BentoGrid } from './BentoGrid';

// Counts up from 0 to `target` once `enabled` — gated on visibility, not mount,
// so the animation actually plays when a user scrolls to it.
function useCountUp(target: number, enabled: boolean, durationMs = 1100) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!enabled) return;
    let raf: number;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / durationMs);
      setValue(Math.round(target * (1 - Math.pow(1 - progress, 3))));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, durationMs, enabled]);
  return value;
}

function ProgressRing({ value, color, trackColor, size = 64 }: { value: number; color: string; trackColor: string; size?: number }) {
  const stroke = 6;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - value / 100);
  return (
    <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
      <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke={trackColor} strokeWidth={stroke} />
      <circle
        cx={size / 2} cy={size / 2} r={radius} fill="none" stroke={color} strokeWidth={stroke}
        strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round"
        className="transition-[stroke-dashoffset] duration-150 ease-out"
      />
    </svg>
  );
}

// Aceternity-style "Spotlight": a radial highlight that follows the cursor.
function SpotlightBlock({ accent, secondary }: { accent: string; secondary: string }) {
  const [pos, setPos] = useState({ x: 50, y: 35 });
  return (
    <div
      onMouseMove={e => {
        const rect = e.currentTarget.getBoundingClientRect();
        setPos({ x: ((e.clientX - rect.left) / rect.width) * 100, y: ((e.clientY - rect.top) / rect.height) * 100 });
      }}
      className="w-40 h-32 rounded-xl flex-shrink-0"
      style={{ background: `radial-gradient(circle at ${pos.x}% ${pos.y}%, ${accent}70, ${secondary}35 65%)` }}
    />
  );
}

// ── Large, detailed, per-direction asset mockups ────────────────────────────────
// Generic, industry-agnostic placeholder copy (not gray bars, not tied to any one
// client) — reusable for any business, styled in the direction's own palette.

export function HeroAsset({ direction, brandName = DEFAULT_BRAND_NAME }: { direction: Direction; brandName?: string }) {
  const { palette, typography } = direction;
  return (
    <div className="rounded-2xl overflow-hidden shadow-sm" style={{ background: palette.bg, border: `1px solid ${palette.ink}1a` }}>
      <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: `1px solid ${palette.ink}14` }}>
        <div className="flex items-center gap-2">
          <span className="w-5 h-5 rounded" style={{ background: palette.accent }} />
          <span className={typography.labelClass} style={{ color: palette.ink }}>{brandName}</span>
        </div>
        <div className="hidden sm:flex gap-5">
          {GENERIC_NAV_ITEMS.map(item => (
            <span key={item} className="text-[11px] font-medium" style={{ color: palette.ink, opacity: 0.55 }}>{item}</span>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-8 px-6 py-10 flex-wrap">
        <div className="flex-1 min-w-[220px]">
          <div className={typography.labelClass} style={{ color: palette.accent }}>{brandName}</div>
          <h3 className={clsx(typography.headingClass, 'text-3xl mt-2')} style={{ color: palette.ink }}>{typography.sample}</h3>
          <p className="text-[13px] mt-3 max-w-sm leading-relaxed" style={{ color: palette.ink, opacity: 0.65 }}>{direction.description}</p>
          <button type="button" className="mt-5 px-5 py-2.5 rounded-full text-[13px] font-semibold" style={{ background: palette.accent, color: palette.buttonText }}>
            Get Started
          </button>
        </div>
        <SpotlightBlock accent={palette.accent} secondary={palette.secondary} />
      </div>
    </div>
  );
}

export function TrustAsset({ direction }: { direction: Direction }) {
  const { palette } = direction;
  return (
    <div className="rounded-2xl p-6 flex items-center justify-between gap-4 flex-wrap shadow-sm" style={{ background: palette.bg, border: `1px solid ${palette.secondary}40` }}>
      {GENERIC_TRUST_SIGNALS.map(c => (
        <div key={c} className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: palette.accent }} />
          <span className="text-[12px] font-semibold" style={{ color: palette.ink }}>{c}</span>
        </div>
      ))}
    </div>
  );
}

export function FeaturesAsset({ direction }: { direction: Direction }) {
  const { palette, typography } = direction;
  const items = GENERIC_FEATURES.map((f, i) => ({
    title: f.title,
    description: f.description,
    badge: i === 0 ? 'Most used' : undefined,
    span: i === 0 ? (2 as const) : undefined,
  }));
  return (
    <div className="rounded-2xl p-6 shadow-sm" style={{ background: palette.bg, border: `1px solid ${palette.ink}1a` }}>
      <div className={typography.labelClass} style={{ color: palette.accent }}>Features</div>
      <div className="mt-3">
        <BentoGrid items={items} palette={palette} />
      </div>
    </div>
  );
}

export function TeamAsset({ direction }: { direction: Direction }) {
  const { palette, typography } = direction;
  return (
    <div className="rounded-2xl p-6 shadow-sm" style={{ background: palette.bg, border: `1px solid ${palette.ink}1a` }}>
      <div className={typography.labelClass} style={{ color: palette.accent }}>Our Team</div>
      <div className="grid grid-cols-3 gap-3 mt-3">
        {GENERIC_TEAM.map(person => (
          <div key={person.name} className="flex flex-col items-center text-center gap-1.5">
            <span className="w-12 h-12 rounded-full flex-shrink-0" style={{ background: `linear-gradient(135deg, ${palette.accent}66, ${palette.secondary}40)` }} />
            <span className="text-[11px] font-semibold leading-snug" style={{ color: palette.ink }}>{person.name}</span>
            <span className="text-[10px]" style={{ color: palette.ink, opacity: 0.6 }}>{person.specialty}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function TestimonialAsset({ direction }: { direction: Direction }) {
  const { palette, typography } = direction;
  const { ref, inView } = useInView();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const id = setInterval(() => setIndex(i => (i + 1) % GENERIC_TESTIMONIALS.length), 4500);
    return () => clearInterval(id);
  }, [inView]);

  const current = GENERIC_TESTIMONIALS[index];

  return (
    <div ref={ref} className="rounded-2xl p-7 shadow-sm" style={{ background: palette.bg, border: `1px solid ${palette.ink}1a` }}>
      <div className="text-4xl leading-none" style={{ color: palette.accent }}>&ldquo;</div>
      <div key={index} className="animate-fade-in motion-reduce:animate-none">
        <p className={clsx(typography.headingClass, 'text-xl mt-1 leading-snug')} style={{ color: palette.ink }}>
          {current.quote}
        </p>
        <div className="text-[11px] font-medium mt-3 uppercase tracking-wide" style={{ color: palette.ink, opacity: 0.55 }}>
          {current.attribution}
        </div>
      </div>
      <div className="flex gap-1.5 mt-4">
        {GENERIC_TESTIMONIALS.map((_, i) => (
          <span
            key={i}
            className="h-1.5 rounded-full transition-all duration-300"
            style={{ width: i === index ? 18 : 7, background: i === index ? palette.accent : `${palette.ink}25` }}
          />
        ))}
      </div>
    </div>
  );
}

export function HowItWorksAsset({ direction }: { direction: Direction }) {
  const { palette, typography } = direction;
  return (
    <div className="rounded-2xl p-6 shadow-sm" style={{ background: palette.bg, border: `1px solid ${palette.ink}1a` }}>
      <div className={typography.labelClass} style={{ color: palette.accent }}>How It Works</div>
      <div className="flex items-start gap-2 mt-3">
        {GENERIC_JOURNEY.map((step, i) => (
          <div key={step.step} className="flex-1 flex flex-col items-center text-center gap-1.5">
            <div className="flex items-center w-full">
              <span
                className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0"
                style={{ background: palette.accent, color: palette.buttonText }}
              >
                {i + 1}
              </span>
              {i < GENERIC_JOURNEY.length - 1 && <div className="flex-1 h-px" style={{ background: `${palette.ink}25` }} />}
            </div>
            <span className="text-[11px] font-semibold" style={{ color: palette.ink }}>{step.step}</span>
            <span className="text-[10px] leading-snug" style={{ color: palette.ink, opacity: 0.55 }}>{step.detail}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function JourneyAsset({ direction }: { direction: Direction }) {
  const { palette } = direction;
  return (
    <div className="grid grid-cols-5 gap-2">
      {JOURNEY_STAGES.map((stage, i) => (
        <div key={stage} className="rounded-xl p-3 text-center" style={{ background: palette.bg, border: `1px solid ${palette.secondary}33` }}>
          <div className="text-[10px] font-mono uppercase tracking-wide mb-1.5" style={{ color: palette.accent }}>{String(i + 1).padStart(2, '0')}</div>
          <div className="text-[10px] leading-snug font-medium" style={{ color: palette.ink }}>{direction.journeyFrames[i]}</div>
        </div>
      ))}
    </div>
  );
}

export function CtaAsset({ direction, brandName = DEFAULT_BRAND_NAME }: { direction: Direction; brandName?: string }) {
  const { palette, typography } = direction;
  return (
    <div className="rounded-2xl p-7 flex items-center justify-between gap-4 flex-wrap shadow-sm" style={{ background: palette.accent }}>
      <div>
        <div className={typography.labelClass} style={{ color: palette.buttonText, opacity: 0.8 }}>Ready when you are</div>
        <div className="text-xl font-semibold mt-1" style={{ color: palette.buttonText }}>Talk to {brandName} today.</div>
      </div>
      <button type="button" className="px-5 py-2.5 rounded-full text-[13px] font-semibold flex-shrink-0" style={{ background: palette.bg, color: palette.ink }}>
        Get in touch →
      </button>
    </div>
  );
}

export function GlassDashboardAsset({ direction }: { direction: Direction }) {
  const { palette } = direction;
  const { ref, inView } = useInView();
  const pct = useCountUp(98, inView);
  return (
    <div
      ref={ref}
      className="relative rounded-2xl p-8 overflow-hidden shadow-sm"
      style={{ background: `linear-gradient(135deg, ${palette.accent}, ${palette.secondary})` }}
    >
      <div
        className="absolute -top-10 -left-10 w-40 h-40 rounded-full blur-2xl opacity-40 animate-drift motion-reduce:animate-none"
        style={{ background: palette.bg }}
      />
      <div
        className="absolute -bottom-12 -right-8 w-36 h-36 rounded-full blur-2xl opacity-30 animate-drift-slow motion-reduce:animate-none"
        style={{ background: palette.ink }}
      />

      <div
        className="relative rounded-2xl p-6 max-w-sm shadow-xl animate-rise-in motion-reduce:animate-none"
        style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.3)' }}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="text-white font-semibold text-[13px]">Your Performance Snapshot</div>
          <span className="text-[9px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1" style={{ background: 'rgba(255,255,255,0.25)', color: 'white' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse motion-reduce:animate-none" /> Live
          </span>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative flex-shrink-0">
            <ProgressRing value={pct} color="#FFFFFF" trackColor="rgba(255,255,255,0.25)" size={64} />
            <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-[13px]">{pct}%</div>
          </div>
          <div className="text-[12px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.92)' }}>
            <div className="font-semibold text-white">Client Satisfaction</div>
            <div>Certified · Always on time</div>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2 text-[10px]" style={{ color: 'rgba(255,255,255,0.92)' }}>
          <div className="rounded-lg px-2.5 py-2" style={{ background: 'rgba(255,255,255,0.12)' }}>15+ years in business</div>
          <div className="rounded-lg px-2.5 py-2" style={{ background: 'rgba(255,255,255,0.12)' }}>500+ clients served</div>
        </div>
      </div>
    </div>
  );
}

type AssistantPhase = 'question' | 'typing' | 'answer';

function AssistantTypingDots({ color }: { color: string }) {
  return (
    <div className="flex items-center gap-1 px-3.5 py-3 rounded-xl w-fit" style={{ background: `${color}10` }}>
      {[0, 1, 2].map(i => (
        <span
          key={i}
          className="w-1.5 h-1.5 rounded-full animate-pulse motion-reduce:animate-none"
          style={{ background: color, animationDelay: `${i * 0.15}s` }}
        />
      ))}
    </div>
  );
}

export function AssistantAsset({ direction, brandName = DEFAULT_BRAND_NAME }: { direction: Direction; brandName?: string }) {
  const { palette } = direction;
  const { ref, inView } = useInView();
  const [phase, setPhase] = useState<AssistantPhase>('question');

  useEffect(() => {
    if (!inView) return;
    const t1 = setTimeout(() => setPhase('typing'), 700);
    const t2 = setTimeout(() => setPhase('answer'), 1700);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [inView]);

  return (
    <div ref={ref} className="rounded-2xl p-5 shadow-sm" style={{ background: palette.bg, border: `1px solid ${palette.ink}1a` }}>
      <div className="flex items-center gap-2 mb-3">
        <span className="text-[12px] font-semibold" style={{ color: palette.ink }}>{brandName} Assistant</span>
        <span className="text-[9px] font-semibold px-2 py-0.5 rounded-full" style={{ background: `${palette.accent}1f`, color: palette.accent }}>24/7</span>
      </div>

      <div
        className="ml-auto mb-2 max-w-[78%] rounded-xl px-3.5 py-2 text-[12px] animate-rise-in motion-reduce:animate-none"
        style={{ background: palette.accent, color: palette.buttonText }}
      >
        How do I get started?
      </div>

      <div className="mb-2.5 min-h-[1px]">
        {phase === 'typing' && <AssistantTypingDots color={palette.ink} />}
        {phase === 'answer' && (
          <div
            className="max-w-[92%] rounded-xl px-3.5 py-3 text-[12px] leading-relaxed animate-rise-in motion-reduce:animate-none"
            style={{ background: `${palette.ink}08`, color: palette.ink }}
          >
            Here&rsquo;s a quick overview:
            <div className="mt-1.5 space-y-1 text-[11px]" style={{ opacity: 0.85 }}>
              <div>✓ Book a short discovery call</div>
              <div>✓ Share a few details about your goals</div>
              <div>✓ Get a proposal within 48 hours</div>
            </div>
            <div className="mt-2 text-[10px] font-medium" style={{ color: palette.accent }}>✓ No commitment required</div>
          </div>
        )}
      </div>

      <div className="flex gap-1.5 flex-wrap mb-2.5">
        {['Talk to someone', 'See pricing', 'Book a call'].map(label => (
          <span key={label} className="text-[10px] font-medium px-2.5 py-1 rounded-full border" style={{ borderColor: `${palette.ink}25`, color: palette.ink }}>
            {label}
          </span>
        ))}
      </div>

      <div className="rounded-full px-3.5 py-2 text-[11px]" style={{ background: `${palette.ink}08`, color: palette.ink, opacity: 0.5 }}>
        Ask us anything…
      </div>
    </div>
  );
}

export function PricingAsset({ direction }: { direction: Direction }) {
  const { palette } = direction;
  const shimmerLight = mix(palette.accent, '#ffffff', 0.55);
  return (
    <div className="rounded-2xl p-6 shadow-sm" style={{ background: `${palette.secondary}10`, border: `1px solid ${palette.ink}14` }}>
      <div className="grid sm:grid-cols-3 gap-3">
        {GENERIC_PRICING_TIERS.map((t, i) => (
          <motion.div
            key={t.label}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            whileHover={{ y: -4, scale: 1.015 }}
            className="rounded-xl p-4 flex flex-col"
            style={{ background: palette.bg, boxShadow: t.highlight ? `0 0 0 2px ${palette.accent}` : `0 0 0 1px ${palette.ink}14` }}
          >
            {t.highlight && (
              <span
                className="self-start text-[8px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full mb-2 animate-shimmer motion-reduce:animate-none"
                style={{
                  color: palette.buttonText,
                  backgroundImage: `linear-gradient(110deg, ${palette.accent} 35%, ${shimmerLight} 50%, ${palette.accent} 65%)`,
                  backgroundSize: '200% 100%',
                }}
              >
                Most Popular
              </span>
            )}
            <div className="text-[13px] font-semibold" style={{ color: palette.ink }}>{t.label}</div>
            <div className="text-[10px] mb-2" style={{ color: palette.ink, opacity: 0.55 }}>{t.desc}</div>
            <div className="space-y-1 mb-3 flex-1">
              {t.features.map(f => (
                <div key={f} className="text-[10px] flex items-start gap-1.5" style={{ color: palette.ink, opacity: 0.75 }}>
                  <span style={{ color: palette.accent }}>✓</span>{f}
                </div>
              ))}
            </div>
            <span
              className="text-[10px] font-semibold text-center py-1.5 rounded-full"
              style={{ background: t.highlight ? palette.accent : `${palette.ink}0d`, color: t.highlight ? palette.buttonText : palette.ink }}
            >
              {t.cta}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
