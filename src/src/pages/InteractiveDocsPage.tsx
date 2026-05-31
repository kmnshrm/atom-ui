import { useState, useEffect, Suspense, lazy } from 'react';
import { categoryNavItems } from '../navigation.data';
import type { NavItem } from '../navigation.data';
import '../components/playground/ComponentPlayground.css';
import './InteractiveDocsPage.css';

const DynamicComponentPage = lazy(() => import('./components/DynamicComponentPage'));

// ─── Helpers ─────────────────────────────────────────────────────────────────
const TOC_SECTIONS = [
  { id: 'section-overview', label: 'Overview', icon: 'info' },
  { id: 'section-examples', label: 'Examples', icon: 'code-2' },
  { id: 'section-props', label: 'Props Reference', icon: 'list' },
];

function getIdFromHash() {
  const cleaned = window.location.hash.replace(/^#\/?/, '');
  // Support both #/interactive-docs/button and #/interactive-docs
  const match = cleaned.match(/^interactive-docs\/(.+)$/);
  return match ? match[1] : '';
}

function setIdInHash(id: string) {
  window.history.replaceState(null, '', `#/interactive-docs/${id}`);
}

// ─── Left Sidebar ─────────────────────────────────────────────────────────────
function LeftSidebar({
  activeId,
  onSelect,
  theme,
  toggleTheme,
}: {
  activeId: string;
  onSelect: (id: string) => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}) {
  const [search, setSearch] = useState('');
  const [viewMode, setViewMode] = useState<'list' | 'card'>('list');
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  const toggleCategory = (id: string) => {
    setCollapsed(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const filterItems = (items: NavItem[]): NavItem[] => {
    if (!search.trim()) return items;
    const q = search.toLowerCase();
    return items.reduce<NavItem[]>((acc, cat) => {
      const matched = (cat.children || []).filter(c => c.label.toLowerCase().includes(q));
      if (matched.length > 0) acc.push({ ...cat, children: matched });
      return acc;
    }, []);
  };

  const categories = filterItems(categoryNavItems);

  return (
    <aside className="id-left-sidebar">
      <div className="id-sidebar-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', textTransform: 'none' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          <ui-icon name="layout-panel-left" size="15" />
          <span>Components</span>
          <span className="id-sidebar-count">
            {categoryNavItems.reduce((s, c) => s + (c.children?.length || 0), 0)}
          </span>
        </div>
        <ui-button
          icon={theme === 'dark' ? 'sun' : 'moon'}
          icon-only
          shape="circle"
          variant="ghost"
          size="sm"
          onClick={toggleTheme}
          title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          style={{ color: 'inherit' }}
        />
      </div>

      {/* Search */}
      <div className="cp-sidebar-search-box">
        <ui-icon name="search" size="13" class="cp-sidebar-search-icon" />
        <input
          className="cp-sidebar-search-input"
          placeholder="Filter components..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {/* View toggle */}
      <div className="cp-sidebar-view-row">
        <span className="cp-sidebar-view-label">View</span>
        <div className="cp-sidebar-view-toggle">
          <button
            className={`cp-sidebar-view-btn ${viewMode === 'list' ? 'cp-sidebar-view-btn--active' : ''}`}
            onClick={() => setViewMode('list')}
            title="List view"
          >
            <ui-icon name="list" size="11" />
            List
          </button>
          <button
            className={`cp-sidebar-view-btn ${viewMode === 'card' ? 'cp-sidebar-view-btn--active' : ''}`}
            onClick={() => setViewMode('card')}
            title="Card view"
          >
            <ui-icon name="layout-grid" size="11" />
            Card
          </button>
        </div>
      </div>

      {/* Categories */}
      <div className="cp-sidebar-categories-scroll">
        {categories.map(cat => {
          const isOpen = !collapsed[cat.id];
          return (
            <div key={cat.id} className="cp-sidebar-category-group">
              <button
                className="cp-sidebar-category-header"
                onClick={() => toggleCategory(cat.id)}
              >
                <ui-icon name={cat.icon || 'folder'} size="13" />
                <span className="cp-sidebar-category-name">{cat.label}</span>
                <span
                  className="cp-sidebar-category-chevron"
                  style={{ transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)', display: 'inline-block', transition: 'transform 0.2s' }}
                >
                  <ui-icon name="chevron-right" size="12" />
                </span>
              </button>

              {isOpen && (
                <div className={`cp-sidebar-category-content ${viewMode === 'card' ? 'cp-sidebar-category-content--grid' : ''}`}>
                  {(cat.children || []).map(comp => {
                    const isActive = comp.id === activeId;
                    if (viewMode === 'list') {
                      return (
                        <button
                          key={comp.id}
                          className={`cp-sidebar-comp-row ${isActive ? 'cp-sidebar-comp-row--active' : ''}`}
                          onClick={() => onSelect(comp.id)}
                        >
                          <ui-icon name={comp.icon || 'box'} size="13" class="cp-sidebar-row-icon" />
                          <span className="cp-sidebar-row-label">{comp.label}</span>
                          {comp.badge && (
                            <span style={{ fontSize: '0.6rem', color: '#f59e0b' }}>{comp.badge}</span>
                          )}
                        </button>
                      );
                    } else {
                      return (
                        <button
                          key={comp.id}
                          className={`cp-sidebar-comp-card ${isActive ? 'cp-sidebar-comp-card--active' : ''}`}
                          onClick={() => onSelect(comp.id)}
                        >
                          <div className="cp-sidebar-card-icon-wrapper">
                            <ui-icon name={comp.icon || 'box'} size="14" />
                          </div>
                          <span className="cp-sidebar-card-label">{comp.label}</span>
                        </button>
                      );
                    }
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </aside>
  );
}

// ─── Right TOC ────────────────────────────────────────────────────────────────
function RightToc({
  activeSection,
  onScrollTo,
  examples,
  hasEvents,
  hasMethods,
  hasSlots,
  hasParts,
}: {
  activeSection: string;
  onScrollTo: (id: string) => void;
  examples: { title: string; id: string }[];
  hasEvents: boolean;
  hasMethods: boolean;
  hasSlots: boolean;
  hasParts: boolean;
}) {
  return (
    <aside className="id-right-toc">
      <div className="cp-toc-header">
        <ui-icon name="menu" size="12" />
        On this page
      </div>
      <div className="cp-toc-list">
        {TOC_SECTIONS.map(sec => (
          <div key={sec.id}>
            <button
              className={`cp-toc-item ${
                activeSection === sec.id || 
                (sec.id === 'section-examples' && examples.some(ex => activeSection === ex.id)) ||
                (sec.id === 'section-props' && ['sub-props', 'sub-events', 'sub-methods', 'sub-slots', 'sub-parts', 'sub-notes'].includes(activeSection))
                  ? 'cp-toc-item--active' 
                  : ''
              }`}
              onClick={() => onScrollTo(sec.id)}
            >
              <ui-icon name={sec.icon} size="12" />
              {sec.label}
            </button>
            {sec.id === 'section-examples' && examples.length > 0 && (
              <div className="cp-toc-sublist">
                {examples.map((ex, i) => (
                  <button
                    key={i}
                    className={`cp-toc-item ${activeSection === ex.id ? 'cp-toc-item--active' : ''}`}
                    onClick={() => onScrollTo(ex.id)}
                  >
                    <ui-icon name="code-2" size="10" />
                    {ex.title}
                  </button>
                ))}
              </div>
            )}
            {sec.id === 'section-props' && (
              <div className="cp-toc-sublist">
                <button
                  className={`cp-toc-item ${activeSection === 'sub-props' ? 'cp-toc-item--active' : ''}`}
                  onClick={() => onScrollTo('sub-props')}
                >
                  <ui-icon name="list" size="10" />
                  Props
                </button>
                {hasEvents && (
                  <button
                    className={`cp-toc-item ${activeSection === 'sub-events' ? 'cp-toc-item--active' : ''}`}
                    onClick={() => onScrollTo('sub-events')}
                  >
                    <ui-icon name="zap" size="10" />
                    Events
                  </button>
                )}
                {hasMethods && (
                  <button
                    className={`cp-toc-item ${activeSection === 'sub-methods' ? 'cp-toc-item--active' : ''}`}
                    onClick={() => onScrollTo('sub-methods')}
                  >
                    <ui-icon name="terminal" size="10" />
                    Public Methods
                  </button>
                )}
                {hasSlots && (
                  <button
                    className={`cp-toc-item ${activeSection === 'sub-slots' ? 'cp-toc-item--active' : ''}`}
                    onClick={() => onScrollTo('sub-slots')}
                  >
                    <ui-icon name="layout-template" size="10" />
                    Named Slots
                  </button>
                )}
                {hasParts && (
                  <button
                    className={`cp-toc-item ${activeSection === 'sub-parts' ? 'cp-toc-item--active' : ''}`}
                    onClick={() => onScrollTo('sub-parts')}
                  >
                    <ui-icon name="paintbrush" size="10" />
                    CSS Parts
                  </button>
                )}
                <button
                  className={`cp-toc-item ${activeSection === 'sub-notes' ? 'cp-toc-item--active' : ''}`}
                  onClick={() => onScrollTo('sub-notes')}
                >
                  <ui-icon name="file-text" size="10" />
                  Notes
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </aside>
  );
}

// ─── Empty State ──────────────────────────────────────────────────────────────
function WelcomeState({ onSelect }: { onSelect: (id: string) => void }) {
  const totalComponents = categoryNavItems.reduce((s, c) => s + (c.children?.length || 0), 0);

  // Pick a few top-featured components to highlight at the top
  const featured = [
    { id: 'button', label: 'Button', icon: 'square', desc: 'Interactive actions with badges and counters' },
    { id: 'card', label: 'Card', icon: 'credit-card', desc: 'Structured layouts with hover elevation' },
    { id: 'dialog', label: 'Dialog', icon: 'message-square', desc: 'Overlay modals with keyboard access' },
    { id: 'chart', label: 'Chart', icon: 'bar-chart-4', desc: 'Dynamic data visualization engine' },
  ];

  return (
    <div className="id-welcome">
      {/* Glow Effects */}
      <div className="id-welcome-glow id-glow-1" />
      <div className="id-welcome-glow id-glow-2" />

      <div className="id-welcome-header">
        <div className="id-welcome-badge">
          <span className="id-welcome-badge-dot"></span>
          ATOM UI DOCS STUDIO
        </div>
        <h1 className="id-welcome-title">Interactive Component Explorer</h1>
        <p className="id-welcome-desc">
          A premium design and documentation workspace. Discover, preview, configure, and integrate dozens of responsive web components.
        </p>
      </div>

      {/* Featured Quick Start */}
      <div className="id-welcome-section">
        <h3 className="id-section-label">Popular Starting Points</h3>
        <div className="id-featured-grid">
          {featured.map(item => (
            <button key={item.id} className="id-featured-card" onClick={() => onSelect(item.id)}>
              <div className="id-featured-icon">
                <ui-icon name={item.icon} size="20" />
              </div>
              <div className="id-featured-info">
                <h4 className="id-featured-name">{item.label}</h4>
                <p className="id-featured-desc">{item.desc}</p>
              </div>
              <ui-icon name="arrow-right" size="14" class="id-featured-arrow" />
            </button>
          ))}
        </div>
      </div>

      {/* Categories Directory Grid */}
      <div className="id-welcome-section">
        <h3 className="id-section-label">Explore by Category</h3>
        <div className="id-categories-grid">
          {categoryNavItems.map(cat => {
            const count = cat.children?.length || 0;
            if (count === 0) return null;
            return (
              <div key={cat.id} className="id-category-card">
                <div className="id-category-header">
                  <div className="id-category-title-row">
                    <ui-icon name={cat.icon || 'folder'} size="16" class="id-cat-icon" />
                    <span className="id-category-name">{cat.label}</span>
                  </div>
                  <span className="id-category-count">{count} {count === 1 ? 'item' : 'items'}</span>
                </div>
                <div className="id-category-tags">
                  {(cat.children || []).slice(0, 5).map(comp => (
                    <button
                      key={comp.id}
                      className="id-category-tag-btn"
                      onClick={() => onSelect(comp.id)}
                    >
                      {comp.label}
                      {comp.badge && <span className="id-tag-badge">{comp.badge}</span>}
                    </button>
                  ))}
                  {count > 5 && (
                    <span className="id-category-more-text">
                      +{count - 5} more
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Stats footer */}
      <div className="id-welcome-footer-stats">
        <div className="id-footer-stat">
          <span className="id-stat-num">{totalComponents}</span>
          <span className="id-stat-label">Production Components</span>
        </div>
        <div className="id-footer-stat-divider" />
        <div className="id-footer-stat">
          <span className="id-stat-num">{categoryNavItems.length}</span>
          <span className="id-stat-label">Structured Categories</span>
        </div>
        <div className="id-footer-stat-divider" />
        <div className="id-footer-stat">
          <span className="id-stat-num">100%</span>
          <span className="id-stat-label">Web Component Standards</span>
        </div>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function InteractiveDocsPage({ theme, toggleTheme }: { theme: 'light' | 'dark'; toggleTheme: () => void }) {
  const [selectedId, setSelectedId] = useState(() => getIdFromHash());
  const [activeSection, setActiveSection] = useState('section-overview');
  const [examples, setExamples] = useState<{ title: string; id: string }[]>([]);
  const [hasEvents, setHasEvents] = useState(false);
  const [hasMethods, setHasMethods] = useState(false);
  const [hasSlots, setHasSlots] = useState(false);
  const [hasParts, setHasParts] = useState(false);

  // Sync URL → state when user navigates back/forward
  useEffect(() => {
    const handler = () => {
      const newId = getIdFromHash();
      if (newId !== selectedId) setSelectedId(newId);
    };
    window.addEventListener('hashchange', handler);
    return () => window.removeEventListener('hashchange', handler);
  }, [selectedId]);

  const handleSelect = (id: string) => {
    setSelectedId(id);
    setActiveSection('section-overview');
    setHasEvents(false);
    setHasMethods(false);
    setHasSlots(false);
    setHasParts(false);
    setIdInHash(id);
  };

  const handleScrollTo = (sectionId: string) => {
    const container = document.getElementById('id-center-scroll');
    const target = container?.querySelector(`#${sectionId}`) as HTMLElement | null;
    if (container && target) {
      container.scrollTo({ top: target.offsetTop - 24, behavior: 'smooth' });
    }
    setActiveSection(sectionId);
  };

  // Scroll-spy for TOC
  useEffect(() => {
    const container = document.getElementById('id-center-scroll');
    if (!container) return;
    const handler = () => {
      const ids = [
        'section-overview',
        'section-examples',
        ...examples.map(ex => ex.id),
        'section-props',
        'sub-props',
        ...(hasEvents ? ['sub-events'] : []),
        ...(hasMethods ? ['sub-methods'] : []),
        ...(hasSlots ? ['sub-slots'] : []),
        ...(hasParts ? ['sub-parts'] : []),
        'sub-notes'
      ];
      for (const id of [...ids].reverse()) {
        const el = container.querySelector(`#${id}`) as HTMLElement | null;
        if (el && el.offsetTop <= container.scrollTop + 140) {
          setActiveSection(id);
          return;
        }
      }
      setActiveSection(ids[0]);
    };
    container.addEventListener('scroll', handler, { passive: true });
    return () => container.removeEventListener('scroll', handler);
}, [selectedId, examples, hasEvents, hasMethods, hasSlots, hasParts]);

  return (
    <div className="id-page">
      {/* Left Sidebar */}
      <LeftSidebar activeId={selectedId} onSelect={handleSelect} theme={theme} toggleTheme={toggleTheme} />

      {/* Center Content */}
      <main className="id-center" id="id-center-scroll">
        {!selectedId ? (
          <WelcomeState onSelect={handleSelect} />
        ) : (
          <Suspense
            fallback={
              <div className="id-loading">
                <ui-loader type="spinner" size="md" color="success" />
                <span>Loading component...</span>
              </div>
            }
          >
            <DynamicComponentPage
              key={selectedId}
              id={selectedId}
              interactiveDocs={true}
              onExamplesLoaded={setExamples}
              onMetadataLoaded={(meta) => {
                setHasEvents(meta.hasEvents);
                setHasMethods(meta.hasMethods);
                setHasSlots(meta.hasSlots);
                setHasParts(meta.hasParts);
              }}
            />
          </Suspense>
        )}
      </main>

      {/* Right TOC */}
      {selectedId && (
        <RightToc
          activeSection={activeSection}
          onScrollTo={handleScrollTo}
          examples={examples}
          hasEvents={hasEvents}
          hasMethods={hasMethods}
          hasSlots={hasSlots}
          hasParts={hasParts}
        />
      )}

      {/* Scroll to top button for interactive docs content area */}
      <ui-scroll-top
        target="#id-center-scroll"
        threshold="300"
        position="bottom-right"
        color="primary"
        show-progress="true"
        glassy="true"
      />
    </div>
  );
}
