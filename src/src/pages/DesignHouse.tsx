import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ─── Data ─────────────────────────────────────────────────────────────────────

const NAV_SECTIONS = [
  { id: 'philosophy', label: 'Design Philosophy', icon: 'compass' },
  { id: 'themes', label: 'Theme System', icon: 'palette' },
  { id: 'tokens', label: 'Design Tokens', icon: 'sliders-horizontal' },
  { id: 'typography', label: 'Typography', icon: 'type' },
  { id: 'motion', label: 'Motion & Animation', icon: 'activity' },
  { id: 'building', label: 'Building Apps', icon: 'blocks' },
  { id: 'patterns', label: 'UI Patterns', icon: 'layout-template' },
];

const DESIGN_PRINCIPLES = [
  {
    icon: 'layers',
    color: 'from-blue-500 to-cyan-400',
    glow: 'rgba(59,130,246,0.15)',
    title: 'Atomic Architecture',
    subtitle: 'Compose, don\'t override',
    body: 'Every component is a self-contained unit. They are designed to be composed into larger patterns without side-effects. Props are explicit, behaviour is predictable, and the surface area for bugs is minimal.',
  },
  {
    icon: 'eye',
    color: 'from-emerald-500 to-teal-400',
    glow: 'rgba(16,185,129,0.15)',
    title: 'Perceived Performance',
    subtitle: 'Fast by default, responsive by design',
    body: 'We obsess over perceived latency. Skeleton loaders, optimistic updates, spring-physics animations, and <1 KB component payloads make every interaction feel instant on any device or network.',
  },
  {
    icon: 'shield-check',
    color: 'from-violet-500 to-purple-400',
    glow: 'rgba(139,92,246,0.15)',
    title: 'Accessibility First',
    subtitle: 'WCAG 2.1 AA out of the box',
    body: 'Keyboard navigation, ARIA roles, focus management, colour-contrast enforcement, and screen-reader announcements are built into every component — not added as an afterthought.',
  },
  {
    icon: 'globe',
    color: 'from-amber-400 to-orange-500',
    glow: 'rgba(245,158,11,0.15)',
    title: 'Framework Agnostic',
    subtitle: 'Web Standards, not vendor lock-in',
    body: 'Built on native Custom Elements (Web Components). Drop them into React, Vue, Angular, Svelte, or plain HTML. The same tag, the same props, the same behaviour — everywhere.',
  },
  {
    icon: 'minimize-2',
    color: 'from-rose-500 to-pink-400',
    glow: 'rgba(244,63,94,0.15)',
    title: 'Zero Dependencies',
    subtitle: 'No bloat, no supply-chain risk',
    body: 'The entire runtime is ~42 KB gzipped with no external libraries. Icons are loaded on-demand from CDN. Updates never break your build because there is no peer-dependency matrix.',
  },
  {
    icon: 'sun-moon',
    color: 'from-cyan-400 to-sky-500',
    glow: 'rgba(20,184,166,0.15)',
    title: 'Adaptive Theming',
    subtitle: 'Light, dark, and everything in between',
    body: 'A CSS Custom Properties token system means switching themes is a single class change. Every component inherits the active theme automatically — including nested iframes via the environment provider.',
  },
];

const THEME_TOKENS = [
  { token: '--background', dark: '#000000', light: '#f9fafb', role: 'Page canvas' },
  { token: '--surface', dark: '#111111', light: '#ffffff', role: 'Cards, panels, sidebars' },
  { token: '--surface-hover', dark: '#222222', light: '#f3f4f6', role: 'Interactive element hover' },
  { token: '--text-primary', dark: '#ffffff', light: '#111827', role: 'Body text, headings' },
  { token: '--text-secondary', dark: '#888888', light: '#4b5563', role: 'Captions, meta, hints' },
  { token: '--border', dark: '#333333', light: '#e5e7eb', role: 'Dividers, card outlines' },
];

const SEMANTIC_COLORS = [
  { label: 'Primary', dark: '#10b981', light: '#059669', tw: 'bg-emerald-500' },
  { label: 'Success', dark: '#22c55e', light: '#16a34a', tw: 'bg-green-500' },
  { label: 'Warning', dark: '#f59e0b', light: '#d97706', tw: 'bg-amber-500' },
  { label: 'Danger', dark: '#ef4444', light: '#dc2626', tw: 'bg-red-500' },
  { label: 'Info', dark: '#3b82f6', light: '#2563eb', tw: 'bg-blue-500' },
  { label: 'Secondary', dark: '#8b5cf6', light: '#7c3aed', tw: 'bg-violet-500' },
];

const TYPE_SCALE = [
  { name: 'Display', size: '3.5rem / 56px', weight: '800', usage: 'Hero headings, marketing splash' },
  { name: 'H1', size: '2.25rem / 36px', weight: '700', usage: 'Page titles' },
  { name: 'H2', size: '1.5rem / 24px', weight: '700', usage: 'Section headers' },
  { name: 'H3', size: '1.125rem / 18px', weight: '600', usage: 'Card headers, labels' },
  { name: 'Body', size: '0.9375rem / 15px', weight: '400', usage: 'Paragraph text' },
  { name: 'Small', size: '0.8125rem / 13px', weight: '400', usage: 'Captions, meta, badges' },
  { name: 'Mono', size: '0.8125rem / 13px', weight: '500', usage: 'Code, tag names, tokens' },
];

const MOTION_TOKENS = [
  { token: 'easing-spring', value: 'cubic-bezier(0.34, 1.56, 0.64, 1)', usage: 'Expand, reveal, pop-in' },
  { token: 'easing-smooth', value: 'cubic-bezier(0.4, 0, 0.2, 1)', usage: 'Slide, fade, colour change' },
  { token: 'easing-exit', value: 'cubic-bezier(0.4, 0, 1, 1)', usage: 'Close, collapse, dismiss' },
  { token: 'duration-instant', value: '80ms', usage: 'Hover states, cursor feedback' },
  { token: 'duration-fast', value: '150ms', usage: 'Tooltips, dropdowns, focus' },
  { token: 'duration-normal', value: '250ms', usage: 'Panel slides, tab switches' },
  { token: 'duration-slow', value: '400ms', usage: 'Page transitions, modals' },
];

const APP_STEPS = [
  {
    step: '01',
    icon: 'download-cloud',
    color: 'text-emerald-400',
    ring: 'border-emerald-500/30',
    title: 'Install the library',
    code: `npm install @kmn/atom-ui
# or via CDN (no build step required)
<script type="module" src="https://cdn.atom-ui.dev/latest/atom-ui.esm.js"></script>`,
    desc: 'The entire library is a single ESM bundle. Load it once and every custom element is registered globally.',
  },
  {
    step: '02',
    icon: 'file-code',
    color: 'text-sky-400',
    ring: 'border-sky-500/30',
    title: 'Choose your theme',
    code: `<!-- Light mode -->
<body class="theme-light">

<!-- Dark mode -->
<body class="theme-dark">

<!-- JS toggle at runtime -->
document.body.classList.toggle('theme-dark');`,
    desc: 'Apply the theme class to <body>. Every component inherits the full token set automatically.',
  },
  {
    step: '03',
    icon: 'component',
    color: 'text-violet-400',
    ring: 'border-violet-500/30',
    title: 'Drop in components',
    code: `<!-- HTML / any framework template -->
<ui-button variant="filled" color="primary">
  Get Started
</ui-button>

<ui-input label="Email" type="email" prefix-icon="mail" />

<ui-accordion enable-search="true">
  <ui-step title="Section 1">Content here</ui-step>
</ui-accordion>`,
    desc: 'Components speak HTML. No need to import, register, or wrap — just write the tag.',
  },
  {
    step: '04',
    icon: 'git-merge',
    color: 'text-amber-400',
    ring: 'border-amber-500/30',
    title: 'React / Vue integration',
    code: `// React (JSX) — works without wrappers
import '@kmn/atom-ui';

function App() {
  return (
    <ui-button
      variant="filled"
      onClick={(e) => console.log(e)}
    >
      React Ready
    </ui-button>
  );
}`,
    desc: 'Custom Elements fire DOM events. In React 19+ they are fully first-class. For older versions, use the thin React adapter package.',
  },
  {
    step: '05',
    icon: 'sparkles',
    color: 'text-rose-400',
    ring: 'border-rose-500/30',
    title: 'Customise with tokens',
    code: `/* Override any token globally */
:root {
  --atom-primary: #6366f1;       /* indigo brand */
  --atom-radius-md: 6px;         /* tighter corners */
  --atom-font-sans: 'Geist', sans-serif;
}

/* Or scope to a subtree */
.my-widget {
  --atom-primary: #f472b6;       /* pink variant */
}`,
    desc: 'Every visual decision in the library is backed by a CSS Custom Property. No need to fork the source.',
  },
];

const UI_PATTERNS = [
  {
    icon: 'layout-dashboard',
    color: 'from-blue-500 to-cyan-400',
    title: 'Dashboard Shell',
    desc: 'Combine ui-navigation-bar + ui-top-bar + main content area for the canonical enterprise layout.',
    tags: ['navigation-bar', 'top-bar', 'card', 'progress'],
  },
  {
    icon: 'table-2',
    color: 'from-emerald-500 to-teal-400',
    title: 'Data-Driven Pages',
    desc: 'Pair ui-advanced-data-table with ui-dropdown filters, ui-pagination, and ui-badge status chips.',
    tags: ['advanced-data-table', 'dropdown', 'pagination', 'badge'],
  },
  {
    icon: 'form-input',
    color: 'from-violet-500 to-purple-400',
    title: 'Form Workflows',
    desc: 'Build multi-step flows with ui-stepper, ui-input, ui-checkbox, ui-radio-group, and ui-button.',
    tags: ['stepper', 'input', 'checkbox', 'radio', 'button'],
  },
  {
    icon: 'bell',
    color: 'from-amber-400 to-orange-500',
    title: 'Feedback System',
    desc: 'Layer ui-snackbar, ui-dialog, ui-callout-banner, and ui-tooltip for comprehensive user feedback.',
    tags: ['snackbar', 'dialog', 'callout-banner', 'tooltip'],
  },
  {
    icon: 'bar-chart-4',
    color: 'from-rose-500 to-pink-400',
    title: 'Analytics Screens',
    desc: 'Combine chart components (bar, line, pie, sparkline) with ui-card, ui-meter-group, and ui-timeline.',
    tags: ['bar-chart', 'line-chart', 'sparkline', 'meter-group'],
  },
  {
    icon: 'settings-2',
    color: 'from-cyan-400 to-sky-500',
    title: 'Settings Panels',
    desc: 'Use ui-tabs + ui-switch, ui-color-picker, ui-range-slider, and ui-aside-panel for rich settings UX.',
    tags: ['tabs', 'switch', 'color-picker', 'range-slider'],
  },
];

// ─── Section Components ───────────────────────────────────────────────────────

function SectionBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-3 py-1 mb-4">
      {label}
    </span>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-3xl md:text-4xl font-extrabold text-[var(--text-primary)] mb-3 leading-tight">{children}</h2>
  );
}

function SectionLead({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[var(--text-secondary)] text-base max-w-2xl leading-relaxed mb-10">{children}</p>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function DesignHouse() {
  const [activeSection, setActiveSection] = useState('philosophy');
  const [activeTheme, setActiveTheme] = useState<'dark' | 'light'>('dark');
  const [copiedStep, setCopiedStep] = useState<number | null>(null);

  const handleCopy = (code: string, i: number) => {
    navigator.clipboard.writeText(code);
    setCopiedStep(i);
    setTimeout(() => setCopiedStep(null), 2000);
  };

  return (
    <div className="w-full text-[var(--text-primary)] flex">

      {/* ── Sticky Left Nav ─────────────────────────────────────────────────── */}
      <aside className="hidden lg:flex flex-col w-56 flex-shrink-0 self-start sticky top-0 max-h-screen border-r border-[var(--border)] bg-[var(--background)]/50 backdrop-blur-xl pt-10 pb-6 px-4 gap-1 overflow-y-auto">
        <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-secondary)]/50 px-3 mb-3">On this page</p>
        {NAV_SECTIONS.map(sec => (
          <button
            key={sec.id}
            onClick={() => {
              setActiveSection(sec.id);
              document.getElementById(sec.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
            className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-all text-left ${
              activeSection === sec.id
                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-hover)]'
            }`}
          >
            <ui-icon name={sec.icon} size="13" />
            {sec.label}
          </button>
        ))}
      </aside>

      {/* ── Main Content ────────────────────────────────────────────────────── */}
      <div className="flex-1 min-w-0">

        {/* Hero */}
        <div className="relative overflow-hidden pt-16 pb-14 px-8 border-b border-[var(--border)]">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-16 left-1/4 w-96 h-96 rounded-full bg-emerald-500/5 blur-3xl" />
            <div className="absolute top-8 right-0 w-72 h-72 rounded-full bg-violet-500/5 blur-3xl" />
          </div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="relative max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-[var(--surface-hover)] border border-[var(--border)] rounded-full px-4 py-1.5 text-xs text-[var(--text-secondary)] mb-6">
              <ui-icon name="palette" size="12" class="text-emerald-400" />
              Atom UI — Design House
            </div>
            <h1 className="text-5xl md:text-6xl font-black leading-tight mb-5" style={{ color: 'var(--text-primary)' }}>
              Design &amp;
              <br />
              <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">Theme System</span>
            </h1>
            <p className="text-[var(--text-secondary)] text-lg max-w-2xl leading-relaxed">
              A deep-dive into the philosophy, token system, visual language, and patterns that form the foundation of every Atom UI application.
            </p>
          </motion.div>
        </div>

        <div className="px-8 py-12 space-y-24">

          {/* ── 1. DESIGN PHILOSOPHY ──────────────────────────────────────── */}
          <section id="philosophy" onFocus={() => setActiveSection('philosophy')} className="scroll-mt-8">
            <SectionBadge label="Principles" />
            <SectionHeading>Design Philosophy</SectionHeading>
            <SectionLead>
              Six guiding principles shape every decision — from API design to visual defaults. They exist to make applications faster to build, easier to maintain, and better for every user.
            </SectionLead>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {DESIGN_PRINCIPLES.map((p, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="group rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 hover:bg-white/[0.05] transition-all"
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = `0 0 28px 0 ${p.glow}`; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = ''; }}
                >
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${p.color} flex items-center justify-center mb-4 opacity-90`}>
                    <ui-icon name={p.icon} size="18" class="text-white" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-0.5">{p.title}</h3>
                  <p className="text-xs text-emerald-400/80 font-medium mb-3">{p.subtitle}</p>
                  <p className="text-sm text-white/45 leading-relaxed">{p.body}</p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* ── 2. THEME SYSTEM ───────────────────────────────────────────── */}
          <section id="themes" className="scroll-mt-8">
            <SectionBadge label="Theming" />
            <SectionHeading>Theme System</SectionHeading>
            <SectionLead>
              Atom UI ships two production themes — Dark and Light — and an open token architecture that lets teams create custom themes without touching component source code.
            </SectionLead>

            {/* Theme preview toggle */}
            <div className="rounded-2xl border border-white/[0.07] overflow-hidden mb-8">
              <div className="flex items-center justify-between px-5 py-3 bg-white/[0.03] border-b border-white/[0.06]">
                <span className="text-xs font-medium text-white/50">Live Theme Preview</span>
                <div className="flex items-center bg-white/[0.06] border border-white/[0.08] rounded-lg p-0.5 gap-0.5">
                  {(['dark', 'light'] as const).map(t => (
                    <button
                      key={t}
                      onClick={() => setActiveTheme(t)}
                      className={`px-3 py-1 rounded-md text-xs font-medium capitalize transition-all ${
                        activeTheme === t ? 'bg-emerald-500 text-black' : 'text-white/40 hover:text-white/70'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTheme}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`p-8 ${activeTheme === 'light' ? 'bg-gray-50' : 'bg-[#0a0a0a]'}`}
                >
                  <div className="flex flex-wrap gap-3 mb-6">
                    {SEMANTIC_COLORS.map(c => (
                      <div key={c.label} className="flex items-center gap-2">
                        <div className={`w-5 h-5 rounded-md ${c.tw}`} />
                        <span className={`text-xs font-medium ${activeTheme === 'light' ? 'text-gray-600' : 'text-white/50'}`}>
                          {c.label}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <div className={`px-4 py-2 rounded-xl text-sm font-semibold ${activeTheme === 'light' ? 'bg-white border border-gray-200 text-gray-800 shadow-sm' : 'bg-white/[0.06] border border-white/[0.08] text-white'}`}>
                      Surface Card
                    </div>
                    <div className={`px-4 py-2 rounded-xl text-sm font-semibold bg-emerald-500 text-black`}>
                      Primary Action
                    </div>
                    <div className={`px-4 py-2 rounded-xl text-sm font-medium ${activeTheme === 'light' ? 'border border-gray-200 text-gray-600 bg-transparent' : 'border border-white/[0.12] text-white/60 bg-transparent'}`}>
                      Outline
                    </div>
                    <div className={`px-4 py-2 rounded-xl text-xs font-bold bg-emerald-500/15 text-emerald-500`}>
                      Badge NEW
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Token table */}
            <h3 className="text-base font-bold text-white/80 mb-4">Core CSS Tokens</h3>
            <div className="rounded-2xl border border-white/[0.07] overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-white/[0.03] border-b border-white/[0.06]">
                    <th className="text-left px-4 py-3 text-xs text-white/40 font-semibold">Token</th>
                    <th className="text-left px-4 py-3 text-xs text-white/40 font-semibold">Dark</th>
                    <th className="text-left px-4 py-3 text-xs text-white/40 font-semibold">Light</th>
                    <th className="text-left px-4 py-3 text-xs text-white/40 font-semibold">Role</th>
                  </tr>
                </thead>
                <tbody>
                  {THEME_TOKENS.map((t, i) => (
                    <tr key={i} className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors">
                      <td className="px-4 py-3 font-mono text-[11px] text-emerald-400">{t.token}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 rounded border border-white/[0.12]" style={{ background: t.dark }} />
                          <code className="text-[11px] text-white/50">{t.dark}</code>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 rounded border border-white/[0.12]" style={{ background: t.light }} />
                          <code className="text-[11px] text-white/50">{t.light}</code>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-xs text-white/35">{t.role}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* ── 3. DESIGN TOKENS ─────────────────────────────────────────── */}
          <section id="tokens" className="scroll-mt-8">
            <SectionBadge label="Tokens" />
            <SectionHeading>Design Tokens</SectionHeading>
            <SectionLead>
              Design tokens are the single source of truth for all visual decisions. Override them globally or scope them to any element to create component-level themes.
            </SectionLead>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 mb-10">
              {SEMANTIC_COLORS.map(c => (
                <div key={c.label} className="flex flex-col items-center gap-2 p-4 rounded-2xl border border-white/[0.06] bg-white/[0.02]">
                  <div className={`w-12 h-12 rounded-xl ${c.tw} shadow-lg`} />
                  <span className="text-xs font-semibold text-white/70">{c.label}</span>
                  <code className="text-[9px] text-white/30">{c.dark}</code>
                </div>
              ))}
            </div>

            <div className="rounded-2xl border border-white/[0.07] bg-[var(--surface)] p-5">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500/70" />
                <div className="w-3 h-3 rounded-full bg-amber-500/70" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/70" />
                <span className="ml-2 text-xs text-white/25 font-mono">custom-theme.css</span>
              </div>
              <pre className="text-[12px] leading-6 text-white/60 overflow-x-auto font-mono">{`/* Scoped brand override — no build step needed */
.my-brand-section {
  --atom-primary:        #6366f1;   /* indigo */
  --atom-primary-hover:  #4f46e5;
  --atom-radius-sm:      4px;
  --atom-radius-md:      8px;
  --atom-radius-lg:      12px;
  --atom-font-sans:      'Geist', -apple-system, sans-serif;
  --atom-shadow-lg:      0 20px 60px rgba(99, 102, 241, 0.18);
}

/* All ui-* components inside .my-brand-section
   inherit these values automatically. */`}</pre>
            </div>
          </section>

          {/* ── 4. TYPOGRAPHY ────────────────────────────────────────────── */}
          <section id="typography" className="scroll-mt-8">
            <SectionBadge label="Typography" />
            <SectionHeading>Typography Scale</SectionHeading>
            <SectionLead>
              Every text size in the system maps to a semantic role. Using the scale consistently creates visual hierarchy that guides attention without decoration.
            </SectionLead>

            <div className="rounded-2xl border border-white/[0.07] overflow-hidden">
              <div className="bg-white/[0.02] border-b border-white/[0.06] px-5 py-3 flex gap-8 text-[10px] font-bold uppercase tracking-widest text-white/25">
                <span className="w-20">Name</span>
                <span className="w-36">Size / Weight</span>
                <span className="flex-1">Sample</span>
                <span className="w-44">Usage</span>
              </div>
              {TYPE_SCALE.map((t, i) => (
                <div key={i} className="flex items-center gap-8 px-5 py-4 border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors last:border-0">
                  <span className="w-20 text-xs text-white/40 font-mono">{t.name}</span>
                  <span className="w-36 text-[10px] text-white/30 font-mono">{t.size} / {t.weight}</span>
                  <span
                    className="flex-1 text-white/80 truncate"
                    style={{
                      fontSize: t.name === 'Display' ? '1.5rem' : t.name === 'H1' ? '1.25rem' : t.name === 'H2' ? '1.1rem' : t.name === 'H3' ? '1rem' : t.name === 'Mono' ? '0.8125rem' : '0.875rem',
                      fontWeight: Number(t.weight),
                      fontFamily: t.name === 'Mono' ? 'monospace' : 'inherit',
                    }}
                  >
                    {t.name === 'Display' ? 'The Quick Brown Fox' : t.name === 'Mono' ? '<ui-button variant="filled">' : 'The quick brown fox jumps over the lazy dog'}
                  </span>
                  <span className="w-44 text-[10px] text-white/30">{t.usage}</span>
                </div>
              ))}
            </div>
          </section>

          {/* ── 5. MOTION ────────────────────────────────────────────────── */}
          <section id="motion" className="scroll-mt-8">
            <SectionBadge label="Animation" />
            <SectionHeading>Motion &amp; Animation</SectionHeading>
            <SectionLead>
              Motion should serve communication, not distract from it. Atom UI uses physics-based easing curves and a structured duration scale so animations feel natural and purposeful.
            </SectionLead>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
              {MOTION_TOKENS.map((m, i) => (
                <div key={i} className="flex items-start gap-4 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
                  <div className="w-8 h-8 rounded-lg bg-violet-500/10 flex items-center justify-center flex-shrink-0">
                    <ui-icon name="clock" size="15" class="text-violet-400" />
                  </div>
                  <div>
                    <code className="text-xs font-mono text-violet-400">{m.token}</code>
                    <p className="text-[11px] text-white/30 font-mono mt-0.5">{m.value}</p>
                    <p className="text-xs text-white/45 mt-1">{m.usage}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Reduced motion note */}
            <div className="flex items-start gap-3 rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
              <ui-icon name="alert-triangle" size="16" class="text-amber-400 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-white/50 leading-relaxed">
                <strong className="text-amber-400">Respects prefers-reduced-motion.</strong> All animations are automatically disabled for users who have enabled the reduced-motion OS setting, ensuring an accessible experience for everyone.
              </p>
            </div>
          </section>

          {/* ── 6. BUILDING APPS ─────────────────────────────────────────── */}
          <section id="building" className="scroll-mt-8">
            <SectionBadge label="Guide" />
            <SectionHeading>Building Apps</SectionHeading>
            <SectionLead>
              From install to production in five steps. Atom UI is designed to be dropped into any project with zero configuration and progressively enhanced as needed.
            </SectionLead>

            <div className="space-y-4">
              {APP_STEPS.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className={`rounded-2xl border ${s.ring} bg-white/[0.02] overflow-hidden`}
                >
                  <div className="flex items-center gap-4 px-6 py-4 border-b border-white/[0.05]">
                    <span className="text-3xl font-black text-white/10 select-none leading-none">{s.step}</span>
                    <div className={`w-8 h-8 rounded-lg bg-white/[0.05] flex items-center justify-center ${s.color}`}>
                      <ui-icon name={s.icon} size="16" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white">{s.title}</h3>
                      <p className="text-xs text-white/35">{s.desc}</p>
                    </div>
                    <button
                      className="ml-auto flex items-center gap-1.5 text-xs text-white/30 hover:text-white/60 transition-colors border border-white/[0.08] rounded-lg px-3 py-1.5"
                      onClick={() => handleCopy(s.code, i)}
                    >
                      <ui-icon name={copiedStep === i ? 'check' : 'copy'} size="11" />
                      {copiedStep === i ? 'Copied' : 'Copy'}
                    </button>
                  </div>
                  <div className="bg-[var(--surface)] px-6 py-4">
                    <pre className="text-[11.5px] leading-6 text-white/55 font-mono overflow-x-auto">{s.code}</pre>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* ── 7. UI PATTERNS ───────────────────────────────────────────── */}
          <section id="patterns" className="scroll-mt-8">
            <SectionBadge label="Patterns" />
            <SectionHeading>UI Patterns</SectionHeading>
            <SectionLead>
              Common application screens assembled from Atom UI components. Each pattern is a proven composition that you can use as a starting point.
            </SectionLead>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {UI_PATTERNS.map((p, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 hover:bg-white/[0.05] transition-all"
                >
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${p.color} flex items-center justify-center mb-4 opacity-90`}>
                    <ui-icon name={p.icon} size="18" class="text-white" />
                  </div>
                  <h3 className="text-sm font-bold text-white mb-1">{p.title}</h3>
                  <p className="text-xs text-white/40 leading-relaxed mb-3">{p.desc}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {p.tags.map(tag => (
                      <span key={tag} className="font-mono text-[9px] text-white/30 bg-white/[0.04] border border-white/[0.06] rounded px-1.5 py-0.5">
                        &lt;ui-{tag}&gt;
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* ── Footer CTA ───────────────────────────────────────────────── */}
          <div className="rounded-3xl border border-white/[0.07] bg-gradient-to-br from-emerald-500/5 to-transparent p-10 text-center relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-32 bg-emerald-500/8 blur-3xl rounded-full" />
            </div>
            <div className="relative">
              <div className="inline-flex items-center gap-2 text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-1.5 mb-5">
                <ui-icon name="zap" size="11" />
                Ready to build?
              </div>
              <h2 className="text-2xl font-extrabold mb-3">Start with the Component Guide</h2>
              <p className="text-white/35 text-sm max-w-md mx-auto mb-7">
                Browse all 73+ components, each with a live playground, props reference, and copy-ready code.
              </p>
              <div className="flex justify-center gap-3 flex-wrap">
                <button
                  onClick={() => window.dispatchEvent(new CustomEvent('appNavigate', { detail: { id: 'components-guide' } }))}
                  className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-bold px-5 py-2.5 rounded-xl text-sm transition-colors"
                >
                  <ui-icon name="layout-grid" size="15" />
                  Component Guide
                </button>
                <button
                  onClick={() => window.dispatchEvent(new CustomEvent('appNavigate', { detail: { id: 'interactive-docs' } }))}
                  className="flex items-center gap-2 bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.1] text-white font-medium px-5 py-2.5 rounded-xl text-sm transition-colors"
                >
                  <ui-icon name="book-open" size="15" />
                  Interactive Docs
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

