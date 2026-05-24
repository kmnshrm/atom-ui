import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type BillingCycle = 'monthly' | 'halfyearly' | 'yearly';

interface PricingTier {
  id: string;
  name: string;
  tagline: string;
  icon: string;
  color: string;
  accent: string;
  accentBg: string;
  accentBorder: string;
  popular?: boolean;
  prices: Record<BillingCycle, number | null>;
  frontFeatures: string[];
  backFeatures: { label: string; included: boolean; note?: string }[];
  cta: string;
  ctaVariant: string;
}

const CYCLE_LABELS: Record<BillingCycle, string> = {
  monthly: 'Monthly',
  halfyearly: '6 Months',
  yearly: 'Yearly',
};

const CYCLE_SAVINGS: Record<BillingCycle, string | null> = {
  monthly: null,
  halfyearly: 'Save 20%',
  yearly: 'Save 35%',
};

const TIERS: PricingTier[] = [
  {
    id: 'starter',
    name: 'Starter',
    tagline: 'Perfect for side projects and exploration',
    icon: 'zap',
    color: 'zinc',
    accent: 'text-zinc-300',
    accentBg: 'bg-zinc-500/10',
    accentBorder: 'border-zinc-500/20',
    prices: { monthly: 0, halfyearly: 0, yearly: 0 },
    frontFeatures: [
      '8 Core Components',
      '1 Active Project',
      'Community Forum Access',
      'MIT License',
    ],
    backFeatures: [
      { label: '8 Core Components', included: true },
      { label: '1 Active Project', included: true },
      { label: 'Community Forum', included: true },
      { label: 'MIT License', included: true },
      { label: 'Custom Theming', included: false },
      { label: 'Priority Support', included: false },
      { label: 'Advanced Components', included: false },
      { label: 'Commercial License', included: false },
      { label: 'SLA Guarantee', included: false },
      { label: 'Custom Builds', included: false },
    ],
    cta: 'Get Started Free',
    ctaVariant: 'outline',
  },
  {
    id: 'pro',
    name: 'Pro',
    tagline: 'For growing teams shipping production apps',
    icon: 'star',
    color: 'green',
    accent: 'text-green-400',
    accentBg: 'bg-green-500/10',
    accentBorder: 'border-green-500/20',
    popular: true,
    prices: { monthly: 29, halfyearly: 23, yearly: 19 },
    frontFeatures: [
      'All 60+ Components',
      '15 Active Projects',
      'Email Support (48h SLA)',
      'Commercial License',
    ],
    backFeatures: [
      { label: 'All 60+ Components', included: true },
      { label: '15 Active Projects', included: true },
      { label: 'Email Support (48h)', included: true },
      { label: 'Commercial License', included: true },
      { label: 'Custom Theming Tokens', included: true },
      { label: 'Priority Updates', included: true },
      { label: 'Figma Design Kit', included: true },
      { label: 'Dedicated Slack Channel', included: false },
      { label: 'SLA Guarantee', included: false },
      { label: 'Custom Builds', included: false },
    ],
    cta: 'Start Pro Trial',
    ctaVariant: 'primary',
  },
  {
    id: 'business',
    name: 'Business',
    tagline: 'Scale across multiple teams and products',
    icon: 'building-2',
    color: 'purple',
    accent: 'text-purple-400',
    accentBg: 'bg-purple-500/10',
    accentBorder: 'border-purple-500/20',
    prices: { monthly: 79, halfyearly: 63, yearly: 51 },
    frontFeatures: [
      'Everything in Pro',
      'Unlimited Projects',
      'Priority Support (8h SLA)',
      'Dedicated Slack Channel',
    ],
    backFeatures: [
      { label: 'All 60+ Components', included: true },
      { label: 'Unlimited Projects', included: true },
      { label: 'Priority Support (8h)', included: true },
      { label: 'Commercial License', included: true },
      { label: 'Advanced Theming Studio', included: true },
      { label: 'Dedicated Slack Channel', included: true },
      { label: 'Figma + Storybook Kit', included: true },
      { label: 'White-label Option', included: true },
      { label: 'SLA Guarantee', included: false },
      { label: 'Custom Builds', included: false },
    ],
    cta: 'Start Business Trial',
    ctaVariant: 'secondary',
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    tagline: 'Custom solutions at organizational scale',
    icon: 'shield-check',
    color: 'amber',
    accent: 'text-amber-400',
    accentBg: 'bg-amber-500/10',
    accentBorder: 'border-amber-500/20',
    prices: { monthly: null, halfyearly: null, yearly: null },
    frontFeatures: [
      'Everything in Business',
      'Custom SLA Agreement',
      'Dedicated Success Manager',
      'Source Code Access',
    ],
    backFeatures: [
      { label: 'All 60+ Components', included: true },
      { label: 'Unlimited Projects & Teams', included: true },
      { label: '24/7 Dedicated Support', included: true },
      { label: 'Custom SLA (99.9% uptime)', included: true },
      { label: 'Source Code Access', included: true },
      { label: 'On-Premise Deployment', included: true },
      { label: 'Custom Component Builds', included: true },
      { label: 'Security Audit Reports', included: true },
      { label: 'Dedicated Success Manager', included: true },
      { label: 'Legal & Compliance Docs', included: true },
    ],
    cta: 'Contact Sales',
    ctaVariant: 'warning',
  },
];

function PricingCard({ tier, cycle }: { tier: PricingTier; cycle: BillingCycle }) {
  const [flipped, setFlipped] = useState(false);
  const price = tier.prices[cycle];

  const colorMap: Record<string, { glow: string; badge: string; dot: string }> = {
    zinc:   { glow: 'rgba(113,113,122,0.15)',  badge: 'bg-zinc-500/10 border-zinc-500/20 text-zinc-300',   dot: '#a1a1aa' },
    green:  { glow: 'rgba(34,197,94,0.18)',    badge: 'bg-green-500/10 border-green-500/20 text-green-400', dot: '#4ade80' },
    purple: { glow: 'rgba(168,85,247,0.18)',   badge: 'bg-purple-500/10 border-purple-500/20 text-purple-400', dot: '#c084fc' },
    amber:  { glow: 'rgba(245,158,11,0.18)',   badge: 'bg-amber-500/10 border-amber-500/20 text-amber-400', dot: '#fbbf24' },
  };
  const cm = colorMap[tier.color];

  return (
    <div
      className="relative cursor-pointer select-none"
      style={{ perspective: '1200px', height: '480px' }}
      onClick={() => setFlipped(f => !f)}
      onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && setFlipped(f => !f)}
      role="button"
      tabIndex={0}
      aria-label={`${tier.name} pricing card — click to flip`}
    >
      {/* Popular badge */}
      {tier.popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-bold tracking-widest uppercase bg-green-500 text-black px-3 py-1 rounded-full shadow-lg shadow-green-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-black/40 inline-block" />
            Most Popular
          </span>
        </div>
      )}

      {/* 3D flip container */}
      <div
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          transformStyle: 'preserve-3d',
          transition: 'transform 0.7s cubic-bezier(0.4, 0.2, 0.2, 1)',
          transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        {/* ===== FRONT FACE ===== */}
        <div
          className={`absolute inset-0 rounded-2xl border overflow-hidden flex flex-col ${
            tier.popular
              ? 'border-green-500/40 bg-gradient-to-b from-zinc-900/90 to-zinc-950/90'
              : 'border-zinc-800 bg-zinc-900/60'
          }`}
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            boxShadow: tier.popular
              ? `0 0 60px ${cm.glow}, inset 0 1px 0 rgba(255,255,255,0.04)`
              : `0 0 30px ${cm.glow}`,
          }}
        >
          {/* Glow orb */}
          <div
            className="absolute top-0 right-0 w-40 h-40 rounded-full blur-[80px] pointer-events-none opacity-60"
            style={{ background: cm.glow }}
          />

          <div className="relative z-10 flex flex-col h-full p-6">
            {/* Header */}
            <div className="flex items-start justify-between mb-5">
              <div className={`p-2.5 rounded-xl border ${tier.accentBg} ${tier.accentBorder}`}>
                <ui-icon name={tier.icon} size="20" class={tier.accent} />
              </div>
              {tier.popular && (
                <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-full border ${cm.badge}`}>
                  Pro Plan
                </span>
              )}
            </div>

            <h3 className="text-xl font-black text-white mb-1">{tier.name}</h3>
            <p className="text-xs text-zinc-500 leading-relaxed mb-5">{tier.tagline}</p>

            {/* Price */}
            <div className="mb-6">
              {price === null ? (
                <div>
                  <span className="text-4xl font-black text-white">Custom</span>
                  <p className="text-xs text-zinc-500 mt-1">Tailored to your org size</p>
                </div>
              ) : price === 0 ? (
                <div>
                  <span className="text-4xl font-black text-white">Free</span>
                  <p className="text-xs text-zinc-500 mt-1">Forever, no credit card</p>
                </div>
              ) : (
                <div className="flex items-end gap-1">
                  <span className="text-lg font-bold text-zinc-400 self-start mt-2">$</span>
                  <span className={`text-5xl font-black ${tier.accent}`}>{price}</span>
                  <span className="text-zinc-500 text-sm mb-1.5">/mo</span>
                </div>
              )}
              {cycle !== 'monthly' && price !== null && price > 0 && (
                <span className="inline-block mt-1.5 text-[10px] bg-green-500/10 border border-green-500/20 text-green-400 px-2 py-0.5 rounded-full font-semibold">
                  {CYCLE_SAVINGS[cycle]} vs monthly
                </span>
              )}
            </div>

            {/* Top features */}
            <ul className="space-y-2.5 flex-1">
              {tier.frontFeatures.map((f, i) => (
                <li key={i} className="flex items-center gap-2.5 text-sm text-zinc-300">
                  <span
                    className="flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center"
                    style={{ background: `${cm.glow}`, border: `1px solid ${cm.dot}33` }}
                  >
                    <ui-icon name="check" size="10" class={tier.accent} />
                  </span>
                  {f}
                </li>
              ))}
            </ul>

            {/* Flip hint */}
            <div className="mt-4 flex items-center justify-center gap-1.5 text-[11px] text-zinc-600">
              <ui-icon name="rotate-ccw" size="11" />
              Click to see all features
            </div>
          </div>
        </div>

        {/* ===== BACK FACE ===== */}
        <div
          className={`absolute inset-0 rounded-2xl border overflow-hidden flex flex-col ${
            tier.popular
              ? 'border-green-500/40 bg-gradient-to-b from-zinc-950/95 to-black/95'
              : 'border-zinc-800 bg-zinc-950/90'
          }`}
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            boxShadow: tier.popular ? `0 0 60px ${cm.glow}` : `0 0 30px ${cm.glow}`,
          }}
        >
          {/* Back glow */}
          <div
            className="absolute bottom-0 left-0 w-48 h-48 rounded-full blur-[80px] pointer-events-none opacity-40"
            style={{ background: cm.glow }}
          />

          <div className="relative z-10 flex flex-col h-full p-6">
            {/* Back header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className={`p-2 rounded-lg border ${tier.accentBg} ${tier.accentBorder}`}>
                  <ui-icon name={tier.icon} size="14" class={tier.accent} />
                </div>
                <span className="text-sm font-bold text-white">{tier.name} — Full Features</span>
              </div>
              <div className="text-[10px] text-zinc-600 flex items-center gap-1">
                <ui-icon name="rotate-ccw" size="10" /> flip back
              </div>
            </div>

            {/* Feature list */}
            <ul className="space-y-2 flex-1 overflow-auto">
              {tier.backFeatures.map((f, i) => (
                <li key={i} className="flex items-center gap-3 text-xs">
                  <span
                    className={`flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center ${
                      f.included ? tier.accentBg : 'bg-zinc-800'
                    }`}
                    style={{ border: f.included ? `1px solid ${cm.dot}44` : '1px solid #333' }}
                  >
                    <ui-icon
                      name={f.included ? 'check' : 'x'}
                      size="10"
                      class={f.included ? tier.accent : 'text-zinc-600'}
                    />
                  </span>
                  <span className={f.included ? 'text-zinc-200' : 'text-zinc-600 line-through'}>{f.label}</span>
                  {f.note && <span className="text-zinc-500 ml-auto">{f.note}</span>}
                </li>
              ))}
            </ul>

            {/* CTA */}
            <div className="mt-5 space-y-2">
              <button
                className={`w-full py-2.5 rounded-xl text-sm font-bold transition-all active:scale-95 ${
                  tier.ctaVariant === 'primary'
                    ? 'bg-green-500 hover:bg-green-400 text-black shadow-lg shadow-green-500/20'
                    : tier.ctaVariant === 'secondary'
                    ? 'bg-purple-500 hover:bg-purple-400 text-white shadow-lg shadow-purple-500/20'
                    : tier.ctaVariant === 'warning'
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black shadow-lg shadow-amber-500/20'
                    : 'bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700'
                }`}
                onClick={e => e.stopPropagation()}
              >
                {tier.cta}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Pricing() {
  const [cycle, setCycle] = useState<BillingCycle>('monthly');

  const cycleOptions: BillingCycle[] = ['monthly', 'halfyearly', 'yearly'];

  return (
    <div className="max-w-6xl space-y-16 pb-24">
      {/* ── Premium Header ─────────────────────────────────────── */}
      <header className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-500/10 via-purple-500/5 to-transparent border border-green-500/10 p-8 md:p-14 text-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-green-500/10 blur-[120px] rounded-full pointer-events-none -mt-20" />
        <div className="absolute bottom-0 right-0 w-[300px] h-[200px] bg-purple-500/10 blur-[100px] rounded-full pointer-events-none" />
        <div className="relative z-10 space-y-5">
          <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase">
            <ui-icon name="credit-card" size="13" />
            Transparent Licensing
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
            <span className="text-white drop-shadow-sm">Simple, Predictable</span><br />
            <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">Pricing</span>
          </h1>
          <p className="text-gray-400 text-lg leading-relaxed max-w-xl mx-auto">
            One license, all components. Scale from side project to enterprise — flip any card to explore what's included.
          </p>

          {/* Billing toggle */}
          <div className="inline-flex items-center bg-zinc-900/80 backdrop-blur border border-zinc-800 rounded-xl p-1 mt-4">
            {cycleOptions.map(c => (
              <button
                key={c}
                onClick={() => setCycle(c)}
                className={`relative px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200 ${
                  cycle === c
                    ? 'bg-zinc-800 text-white shadow-lg'
                    : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                {CYCLE_LABELS[c]}
                {CYCLE_SAVINGS[c] && (
                  <span
                    className={`ml-2 text-[10px] font-bold px-1.5 py-0.5 rounded-full transition-all ${
                      cycle === c
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-zinc-700 text-zinc-500'
                    }`}
                  >
                    {CYCLE_SAVINGS[c]}
                  </span>
                )}
              </button>
            ))}
          </div>

          {cycle !== 'monthly' && (
            <motion.p
              key={cycle}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xs text-green-400/80 mt-2"
            >
              Billed {cycle === 'halfyearly' ? 'every 6 months' : 'annually'} — you save up to {cycle === 'halfyearly' ? '20%' : '35%'} compared to monthly.
            </motion.p>
          )}
        </div>
      </header>

      {/* ── Pricing Cards Grid ──────────────────────────────────── */}
      <section>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mt-6">
          <AnimatePresence mode="wait">
            {TIERS.map((tier, i) => (
              <motion.div
                key={`${tier.id}-${cycle}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                className={tier.popular ? 'mt-0 sm:-mt-6' : 'mt-0'}
              >
                <PricingCard tier={tier} cycle={cycle} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        <p className="text-center text-xs text-zinc-600 mt-8 flex items-center justify-center gap-1.5">
          <ui-icon name="mouse-pointer-click" size="12" />
          Click any card to flip and explore the complete feature breakdown
        </p>
      </section>

      {/* ── Feature Comparison Strip ────────────────────────────── */}
      <section className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-black text-white tracking-tight">At a Glance</h2>
          <p className="text-sm text-zinc-500">Key differentiators across tiers</p>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-zinc-800">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-zinc-900/80 border-b border-zinc-800">
                <th className="px-6 py-4 text-left text-xs font-bold text-zinc-500 uppercase tracking-wider w-1/3">Feature</th>
                {TIERS.map(t => (
                  <th key={t.id} className={`px-4 py-4 text-center text-xs font-bold uppercase tracking-wider ${t.accent}`}>
                    {t.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60">
              {[
                { label: 'Components',         values: ['8 Core', 'All 60+', 'All 60+', 'All 60+'] },
                { label: 'Projects',           values: ['1', '15', 'Unlimited', 'Unlimited'] },
                { label: 'Support',            values: ['Community', '48h Email', '8h Priority', '24/7 Dedicated'] },
                { label: 'Commercial License', values: [false, true, true, true] },
                { label: 'Custom Theming',     values: [false, true, true, true] },
                { label: 'Figma Kit',          values: [false, true, true, true] },
                { label: 'White-label',        values: [false, false, true, true] },
                { label: 'Source Code',        values: [false, false, false, true] },
                { label: 'SLA',                values: [false, false, false, true] },
              ].map((row, ri) => (
                <tr key={ri} className="hover:bg-zinc-900/40 transition-colors">
                  <td className="px-6 py-3.5 text-zinc-400 font-medium">{row.label}</td>
                  {row.values.map((v, vi) => (
                    <td key={vi} className="px-4 py-3.5 text-center">
                      {typeof v === 'boolean' ? (
                        v ? (
                          <ui-icon name="check-circle" size="16" class={TIERS[vi].accent} style={{ display: 'inline-block' }} />
                        ) : (
                          <ui-icon name="minus" size="16" class="text-zinc-700" style={{ display: 'inline-block' }} />
                        )
                      ) : (
                        <span className="text-zinc-300 text-xs font-medium">{v}</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── Enterprise CTA ──────────────────────────────────────── */}
      <section className="relative overflow-hidden rounded-2xl border border-amber-500/20 bg-gradient-to-br from-amber-500/8 via-zinc-900/60 to-zinc-900/80 p-8 md:p-12">
        <div className="absolute top-0 right-0 w-[350px] h-[250px] bg-amber-500/10 blur-[100px] rounded-full pointer-events-none -mt-10 -mr-10" />
        <div className="absolute bottom-0 left-0 w-[200px] h-[200px] bg-orange-500/8 blur-[80px] rounded-full pointer-events-none" />
        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div className="space-y-4 max-w-xl">
            <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 text-amber-400 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase">
              <ui-icon name="shield-check" size="13" />
              Enterprise Grade
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
              Need a tailored solution<br />
              <span className="text-amber-400">for your organization?</span>
            </h2>
            <p className="text-gray-400 leading-relaxed">
              Get a custom license, dedicated onboarding, compliance documentation, on-premise deployment, and a dedicated engineering contact.
            </p>
            <div className="flex flex-wrap gap-3">
              {['Custom SLA', 'Unlimited Seats', 'Source Access', 'On-Premise', 'SOC 2 Ready'].map(tag => (
                <span key={tag} className="text-xs bg-zinc-800/80 border border-zinc-700 text-zinc-300 px-3 py-1.5 rounded-full font-medium">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-3 shrink-0 w-full lg:w-auto">
            <button className="w-full lg:w-56 py-3.5 px-6 rounded-xl text-sm font-bold bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black shadow-lg shadow-amber-500/25 transition-all active:scale-95">
              Contact Sales
            </button>
            <button className="w-full lg:w-56 py-3.5 px-6 rounded-xl text-sm font-bold border border-zinc-700 text-white hover:bg-zinc-800/60 transition-all">
              Schedule a Demo
            </button>
          </div>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────────────────── */}
      <section className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-black text-white tracking-tight">Frequently Asked</h2>
          <p className="text-sm text-zinc-500">Quick answers to common licensing questions</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              q: 'Can I upgrade or downgrade my plan?',
              a: 'Yes. You can change plans at any time. Upgrades take effect immediately; downgrades apply at the next billing cycle.',
            },
            {
              q: 'Is there a free trial for paid plans?',
              a: '14-day full-featured trial for Pro and Business — no credit card required.',
            },
            {
              q: 'What frameworks does Atom UI support?',
              a: 'React 17+, Angular 14+, Vue 3+, and any framework that supports Web Components / Custom Elements v1 spec.',
            },
            {
              q: 'How does the commercial license work?',
              a: 'Paid plans include a commercial license letting you ship unlimited end-user apps. The Starter tier is MIT-licensed for open-source use.',
            },
            {
              q: 'Do you offer refunds?',
              a: 'We offer a 30-day money-back guarantee on all paid plans. No questions asked.',
            },
            {
              q: 'Is Atom UI SSR / SSG compatible?',
              a: 'Yes — Stencil-based components work with Next.js SSR, SvelteKit, Nuxt, and other SSR/SSG setups with a minimal hydration wrapper.',
            },
          ].map((faq, i) => (
            <div key={i} className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-5 space-y-2 hover:border-zinc-700 transition-colors">
              <div className="flex items-start gap-3">
                <div className="p-1.5 bg-green-500/10 border border-green-500/20 rounded-lg shrink-0 mt-0.5">
                  <ui-icon name="help-circle" size="13" class="text-green-400" />
                </div>
                <h4 className="text-sm font-bold text-white">{faq.q}</h4>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed pl-9">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Trust Strip ─────────────────────────────────────────── */}
      <section className="flex flex-col items-center gap-6 py-4">
        <p className="text-xs text-zinc-600 uppercase tracking-widest font-semibold">Trusted guarantees</p>
        <div className="flex flex-wrap justify-center gap-6">
          {[
            { icon: 'shield', label: 'Secure Payments', sub: 'SSL & PCI compliant' },
            { icon: 'refresh-ccw', label: '30-Day Refund', sub: 'No questions asked' },
            { icon: 'lock', label: 'Data Privacy', sub: 'GDPR compliant' },
            { icon: 'headphones', label: 'Dedicated Support', sub: 'Real humans, fast' },
          ].map(({ icon, label, sub }) => (
            <div key={label} className="flex flex-col items-center gap-2 text-center">
              <div className="p-3 bg-zinc-900 border border-zinc-800 rounded-xl">
                <ui-icon name={icon} size="20" class="text-zinc-400" />
              </div>
              <span className="text-xs font-semibold text-zinc-300">{label}</span>
              <span className="text-[11px] text-zinc-600">{sub}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
