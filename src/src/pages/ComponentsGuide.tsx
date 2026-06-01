import { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { categoryNavItems } from '../navigation.data';

// ─── Types ────────────────────────────────────────────────────────────────────

interface ComponentEntry {
  id: string;
  label: string;
  icon: string;
  category: string;
  categoryId: string;
  categoryIcon: string;
  categoryColor: string;
}

interface Props {
  onNavigate?: (id: string) => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

// ─── Category colour palette ──────────────────────────────────────────────────

const CATEGORY_COLORS: Record<string, { accent: string; glow: string; text: string; ring: string }> = {
  layout:    { accent: 'from-blue-500 to-cyan-500',     glow: 'rgba(59,130,246,0.15)',  text: 'text-blue-400',   ring: 'border-blue-500/30' },
  navigation:{ accent: 'from-violet-500 to-purple-600', glow: 'rgba(139,92,246,0.15)', text: 'text-violet-400', ring: 'border-violet-500/30' },
  inputs:    { accent: 'from-emerald-500 to-green-600', glow: 'rgba(16,185,129,0.15)', text: 'text-emerald-400', ring: 'border-emerald-500/30' },
  data:      { accent: 'from-amber-400 to-orange-500',  glow: 'rgba(245,158,11,0.15)', text: 'text-amber-400',  ring: 'border-amber-500/30' },
  display:   { accent: 'from-cyan-400 to-teal-500',     glow: 'rgba(20,184,166,0.15)', text: 'text-cyan-400',   ring: 'border-teal-500/30' },
  overlays:  { accent: 'from-rose-500 to-pink-600',     glow: 'rgba(244,63,94,0.15)',  text: 'text-rose-400',   ring: 'border-rose-500/30' },
  charts:    { accent: 'from-lime-400 to-green-500',    glow: 'rgba(132,204,22,0.15)', text: 'text-lime-400',   ring: 'border-lime-500/30' },
};

const DEFAULT_COLOR = { accent: 'from-slate-500 to-slate-600', glow: 'rgba(100,116,139,0.15)', text: 'text-slate-400', ring: 'border-slate-500/30' };

// ─── Build flat component list from nav data ──────────────────────────────────

function buildComponentList(): ComponentEntry[] {
  const list: ComponentEntry[] = [];
  const SKIP_CATEGORIES = new Set(['mega-menu']);

  for (const cat of categoryNavItems) {
    if (SKIP_CATEGORIES.has(cat.id) || !cat.children) continue;
    for (const comp of cat.children) {
      list.push({
        id: comp.id,
        label: comp.label,
        icon: comp.icon ?? 'box',
        category: cat.label,
        categoryId: cat.id,
        categoryIcon: cat.icon ?? 'layers',
        categoryColor: cat.id,
      });
    }
  }
  return list;
}

const ALL_COMPONENTS = buildComponentList();

type ViewMode = 'card' | 'list';

// ─── Sub-components ───────────────────────────────────────────────────────────

function ComponentListRow({
  comp,
  onNavigate,
  index,
}: {
  comp: ComponentEntry;
  onNavigate?: (id: string) => void;
  index: number;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -20px 0px' });
  const color = CATEGORY_COLORS[comp.categoryColor] ?? DEFAULT_COLOR;

  return (
    <motion.button
      ref={ref}
      initial={{ opacity: 0, x: -10 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.22, delay: Math.min(index * 0.025, 0.4) }}
      whileHover={{ x: 3 }}
      whileTap={{ scale: 0.99 }}
      onClick={() => onNavigate?.(comp.id)}
      className="group w-full flex items-center gap-4 text-left px-4 py-3 rounded-xl border border-transparent bg-white/[0.02] hover:bg-white/[0.06] hover:border-white/[0.08] transition-all duration-150 cursor-pointer outline-none focus-visible:ring-1 focus-visible:ring-white/20"
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.borderColor = color.glow.replace('0.15', '0.35');
        (e.currentTarget as HTMLElement).style.boxShadow = `0 0 16px 0 ${color.glow}`;
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.borderColor = 'transparent';
        (e.currentTarget as HTMLElement).style.boxShadow = '';
      }}
    >
      {/* Icon bubble */}
      <div
        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
        style={{ background: `linear-gradient(135deg, ${color.glow.replace('0.15', '0.3')}, ${color.glow.replace('0.15', '0.08')})` }}
      >
        <ui-icon name={comp.icon} size="15" class={color.text} />
      </div>

      {/* Name */}
      <span className="flex-1 text-sm font-semibold text-white/80 group-hover:text-white transition-colors">
        {comp.label}
      </span>

      {/* Tag name chip */}
      <span className="hidden sm:inline-flex font-mono text-[10px] text-white/25 bg-white/[0.04] border border-white/[0.06] rounded-md px-2 py-0.5">
        &lt;ui-{comp.id}&gt;
      </span>

      {/* Category badge */}
      <span className={`hidden md:inline-flex items-center gap-1 text-[10px] font-medium ${color.text} opacity-60`}>
        <ui-icon name={comp.categoryIcon} size="10" />
        {comp.category}
      </span>

      {/* Design Studio chip — visible on hover */}
      <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-400/0 group-hover:text-emerald-400/80 transition-colors duration-150 flex-shrink-0">
        <ui-icon name="sliders-horizontal" size="10" />
        Design Studio
      </span>

      {/* Arrow */}
      <ui-icon name="chevron-right" size="14" class="text-white/20 group-hover:text-white/50 transition-colors flex-shrink-0" />
    </motion.button>
  );
}

function ComponentCard({
  comp,
  onNavigate,
  index,
}: {
  comp: ComponentEntry;
  onNavigate?: (id: string) => void;
  index: number;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -40px 0px' });
  const color = CATEGORY_COLORS[comp.categoryColor] ?? DEFAULT_COLOR;

  return (
    <motion.button
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.3, delay: Math.min(index * 0.04, 0.6) }}
      whileHover={{ scale: 1.025, y: -2 }}
      whileTap={{ scale: 0.97 }}
      onClick={() => onNavigate?.(comp.id)}
      className="group relative text-left w-full rounded-2xl border bg-white/[0.03] backdrop-blur-sm p-4 transition-all duration-200 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-white/20 hover:bg-white/[0.07]"
      style={{
        borderColor: 'rgba(255,255,255,0.06)',
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.boxShadow = `0 0 24px 0 ${color.glow}, 0 1px 3px rgba(0,0,0,0.4)`;
        (e.currentTarget as HTMLElement).style.borderColor = color.glow.replace('0.15', '0.4');
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.boxShadow = '';
        (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.06)';
      }}
    >
      {/* Icon */}
      <div
        className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 bg-gradient-to-br ${color.accent} bg-opacity-10`}
        style={{ background: `linear-gradient(135deg, ${color.glow.replace('0.15', '0.25')}, ${color.glow.replace('0.15', '0.08')})` }}
      >
        <ui-icon name={comp.icon} size="18" class={color.text} />
      </div>

      {/* Label */}
      <p className="text-sm font-semibold text-white/90 leading-tight group-hover:text-white transition-colors">
        {comp.label}
      </p>

      {/* Category tag */}
      <span className={`mt-2 inline-flex items-center gap-1 text-[10px] font-medium ${color.text} opacity-70`}>
        <ui-icon name={comp.categoryIcon} size="10" />
        {comp.category}
      </span>

      {/* "Design Studio" CTA — slides up on hover */}
      <div className="mt-2 overflow-hidden max-h-0 group-hover:max-h-8 transition-all duration-200">
        <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-400/80 group-hover:text-emerald-400 transition-colors">
          <ui-icon name="sliders-horizontal" size="10" />
          Open Design Studio
        </span>
      </div>

      {/* Arrow — appears on hover */}
      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-60 transition-opacity">
        <ui-icon name="arrow-right" size="14" class="text-white/60" />
      </div>
    </motion.button>
  );
}

function CategorySection({
  categoryId,
  components,
  onNavigate,
  viewMode,
}: {
  categoryId: string;
  components: ComponentEntry[];
  onNavigate?: (id: string) => void;
  viewMode: ViewMode;
}) {
  const color = CATEGORY_COLORS[categoryId] ?? DEFAULT_COLOR;
  const cat = categoryNavItems.find(c => c.id === categoryId);
  if (!cat || components.length === 0) return null;

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      layout
      className="mb-12"
    >
      {/* Section header */}
      <div className="flex items-center gap-3 mb-5">
        <div
          className={`w-9 h-9 rounded-xl flex items-center justify-center bg-gradient-to-br ${color.accent}`}
          style={{ opacity: 0.85 }}
        >
          <ui-icon name={cat.icon ?? 'layers'} size="16" class="text-white" />
        </div>
        <div>
          <h2 className="text-base font-bold text-white">{cat.label}</h2>
          <p className={`text-xs ${color.text} opacity-70`}>{components.length} component{components.length !== 1 ? 's' : ''}</p>
        </div>
        <div className={`ml-auto h-px flex-1 max-w-xs bg-gradient-to-r ${color.accent} opacity-20`} />
      </div>

      {/* Cards grid / list */}
      {viewMode === 'card' ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
          {components.map((comp, i) => (
            <ComponentCard key={comp.id} comp={comp} onNavigate={onNavigate} index={i} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col divide-y divide-white/[0.04] rounded-2xl border border-white/[0.06] overflow-hidden">
          {components.map((comp, i) => (
            <ComponentListRow key={comp.id} comp={comp} onNavigate={onNavigate} index={i} />
          ))}
        </div>
      )}
    </motion.section>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function ComponentsGuide({ onNavigate, theme, toggleTheme }: Props) {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [viewMode, setViewMode] = useState<ViewMode>('card');
  const searchRef = useRef<HTMLInputElement>(null);

  // Focus search on Ctrl/Cmd + K
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const categories = useMemo(() =>
    categoryNavItems.filter(c => c.id !== 'mega-menu' && c.children?.length),
    []
  );

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return ALL_COMPONENTS.filter(c => {
      const matchesSearch = !q || c.label.toLowerCase().includes(q) || c.category.toLowerCase().includes(q);
      const matchesCat = activeCategory === 'all' || c.categoryId === activeCategory;
      return matchesSearch && matchesCat;
    });
  }, [search, activeCategory]);

  // Group filtered by category (preserving original order)
  const grouped = useMemo(() => {
    const map = new Map<string, ComponentEntry[]>();
    for (const comp of filtered) {
      if (!map.has(comp.categoryId)) map.set(comp.categoryId, []);
      map.get(comp.categoryId)!.push(comp);
    }
    return map;
  }, [filtered]);

  const totalCount = ALL_COMPONENTS.length;
  const filteredCount = filtered.length;

  const statItems = [
    { label: 'Total Components', value: totalCount, icon: 'package' },
    { label: 'Categories', value: categories.length, icon: 'layers' },
    { label: 'Interactive Playgrounds', value: 71, icon: 'play-circle' },
    { label: 'Framework Support', value: '4+', icon: 'globe' },
  ];

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--text-primary)]">

      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden pt-10 pb-10 px-4 sm:px-8">
        {/* Background glow blobs */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-emerald-500/5 blur-3xl" />
          <div className="absolute -top-12 right-0 w-80 h-80 rounded-full bg-violet-500/5 blur-3xl" />
          <div className="absolute top-32 left-1/2 w-64 h-64 rounded-full bg-cyan-500/5 blur-3xl" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative max-w-5xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 text-[11px] font-semibold mb-6" style={{background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 999, padding: '0.3rem 0.9rem', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.04em', textTransform: 'uppercase'}}>
            <ui-icon name="sparkles" size="11" class="text-emerald-400" />
            Atom UI — Component Library
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-4">
            All <span style={{background: 'linear-gradient(135deg, #10b981, #34d399)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'}}>Components</span>
          </h1>

          <p className="text-lg text-white/40 max-w-2xl leading-relaxed mb-8">
            Accessible, modern, zero-dependency web components — built for React, Vue, Svelte or
            plain HTML. Browse all {totalCount} components and jump straight to the interactive playground.
          </p>

          {/* Stats row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-0">
            {statItems.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.07 }}
                className="rounded-xl flex items-start gap-3 p-4"
                style={{background: 'var(--surface-2)', border: '1px solid var(--border)', boxShadow: '0 1px 0 rgba(255,255,255,0.04) inset, 0 2px 8px rgba(0,0,0,0.3)'}}
              >
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)'}}>
                  <ui-icon name={s.icon} size="15" class="text-emerald-400" />
                </div>
                <div>
                  <div className="text-xl font-bold tracking-tight" style={{background: 'linear-gradient(135deg, #f1f5f9, #94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'}}>{s.value}</div>
                  <div className="text-[11px] font-medium" style={{color: 'var(--text-secondary)'}}>{s.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ── Sticky Toolbar ────────────────────────────────────────────────────── */}
      <div className="sticky top-0 z-40 border-b px-4 sm:px-8 py-3" style={{background: 'color-mix(in srgb, var(--background) 88%, transparent)', backdropFilter: 'blur(20px) saturate(1.2)', WebkitBackdropFilter: 'blur(20px) saturate(1.2)', borderColor: 'var(--border)', boxShadow: '0 1px 0 var(--border-subtle), 0 4px 16px rgba(0,0,0,0.25)'}}>
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row gap-4 items-start sm:items-center">

          {/* Search */}
          <div className="relative flex-1 max-w-sm">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <ui-icon name="search" size="15" class="text-white/30" />
            </div>
            <input
              ref={searchRef}
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search components… (⌘K)"
              className="w-full rounded-lg pl-9 pr-9 py-2 text-[13px] outline-none transition-all"
              style={{background: 'var(--surface-2)', border: '1px solid var(--border)', color: 'var(--text-primary)'}}
              onFocus={e => (e.currentTarget.style.borderColor = 'var(--border-strong)')}
              onBlur={e => (e.currentTarget.style.borderColor = 'var(--border)')}
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
              >
                <ui-icon name="x" size="14" />
              </button>
            )}
          </div>

          {/* Category chips */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-150 ${
                activeCategory === 'all'
                  ? 'bg-emerald-500 text-black'
                  : 'bg-white/[0.04] text-[var(--text-secondary)]/70 hover:bg-white/[0.08] hover:text-[var(--text-primary)] border border-white/[0.06]'
              }`}
            >
              All
            </button>
            {categories.map(cat => {
              const color = CATEGORY_COLORS[cat.id] ?? DEFAULT_COLOR;
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(isActive ? 'all' : cat.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-150 ${
                    isActive
                      ? `bg-gradient-to-r ${color.accent} text-white`
                      : `bg-white/[0.04] border border-white/[0.06] text-[var(--text-secondary)]/70 hover:bg-white/[0.08] hover:text-[var(--text-primary)]`
                  }`}
                >
                  <ui-icon name={cat.icon ?? 'box'} size="11" />
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* View toggle + Result count */}
          <div className="flex items-center gap-3 ml-auto flex-shrink-0">
            <span className="text-xs text-[var(--text-secondary)]/50">{filteredCount} / {totalCount}</span>
            <ui-button
              icon={theme === 'dark' ? 'sun' : 'moon'}
              icon-only
              shape="circle"
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            />
            <div className="flex items-center bg-white/[0.04] border border-white/[0.08] rounded-lg p-0.5 gap-0.5">
              <button
                onClick={() => setViewMode('card')}
                title="Card view"
                className={`flex items-center justify-center w-7 h-7 rounded-md transition-all duration-150 ${
                  viewMode === 'card'
                    ? 'bg-white/[0.12] text-[var(--text-primary)]'
                    : 'text-[var(--text-secondary)]/40 hover:text-[var(--text-primary)]'
                }`}
              >
                <ui-icon name="layout-grid" size="13" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                title="List view"
                className={`flex items-center justify-center w-7 h-7 rounded-md transition-all duration-150 ${
                  viewMode === 'list'
                    ? 'bg-white/[0.12] text-[var(--text-primary)]'
                    : 'text-[var(--text-secondary)]/40 hover:text-[var(--text-primary)]'
                }`}
              >
                <ui-icon name="list" size="13" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Component Grid ────────────────────────────────────────────────────── */}
      <div className="px-4 sm:px-8 py-8">
        <div className="max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            {filteredCount === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-32 text-center gap-4"
              >
                <div className="w-16 h-16 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center mb-2">
                  <ui-icon name="search-x" size="28" class="text-white/20" />
                </div>
                <p className="text-white/40 text-sm">No components match <strong className="text-white/60">"{search}"</strong></p>
                <button
                  onClick={() => { setSearch(''); setActiveCategory('all'); }}
                  className="text-emerald-400 hover:text-emerald-300 text-sm underline underline-offset-2 transition-colors"
                >
                  Clear filters
                </button>
              </motion.div>
            ) : (
              <motion.div key="results" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                {/* When a single category is active or no search, show grouped view */}
                {search.trim() === '' ? (
                  <>
                    {Array.from(grouped.entries()).map(([catId, comps]) => (
                      <CategorySection
                        key={catId}
                        categoryId={catId}
                        components={comps}
                        onNavigate={onNavigate}
                        viewMode={viewMode}
                      />
                    ))}
                  </>
                ) : (
                  /* Search active → flat results */
                  <div>
                    <p className="text-xs text-white/30 mb-6">
                      Showing {filteredCount} result{filteredCount !== 1 ? 's' : ''} for &quot;{search}&quot;
                    </p>
                    {viewMode === 'card' ? (
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
                        {filtered.map((comp, i) => (
                          <ComponentCard key={comp.id} comp={comp} onNavigate={onNavigate} index={i} />
                        ))}
                      </div>
                    ) : (
                      <div className="flex flex-col divide-y divide-white/[0.04] rounded-2xl border border-white/[0.06] overflow-hidden">
                        {filtered.map((comp, i) => (
                          <ComponentListRow key={comp.id} comp={comp} onNavigate={onNavigate} index={i} />
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ── Footer CTA ────────────────────────────────────────────────────────── */}
      <div className="border-t border-white/[0.05] px-8 py-16">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-1.5 text-xs text-emerald-400 mb-6">
              <ui-icon name="zap" size="11" />
              Zero dependencies · Web Standards
            </div>
            <h2 className="text-3xl font-extrabold mb-4">
              Start building today
            </h2>
            <p className="text-white/40 mb-8 max-w-md mx-auto">
              Every component ships with an interactive playground, live props editor, and copy-ready code snippets.
            </p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <button
                onClick={() => onNavigate?.('installation')}
                className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-bold px-6 py-3 rounded-xl transition-colors text-sm"
              >
                <ui-icon name="download-cloud" size="16" />
                Get Started
              </button>
              <button
                onClick={() => onNavigate?.('documentation')}
                className="inline-flex items-center gap-2 bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.1] text-white font-medium px-6 py-3 rounded-xl transition-colors text-sm"
              >
                <ui-icon name="book-open" size="16" />
                Read the Docs
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
