import { useState, useEffect, Suspense, lazy } from 'react';
import { categoryNavItems } from '../navigation.data';
import type { NavItem } from '../navigation.data';
import type { ExampleConfig } from '../components/playground/ComponentPlayground';
import '../components/playground/ComponentPlayground.css';
import './InteractiveDocsPage.css';

const DynamicComponentPage = lazy(() => import('./components/DynamicComponentPage'));

// ─── Helpers ─────────────────────────────────────────────────────────────────
const TOC_SECTIONS = [
  { id: 'section-overview', label: 'Overview', icon: 'info' },
  { id: 'section-playground', label: 'Design Studio', icon: 'sliders-horizontal' },
  { id: 'section-props', label: 'Props Reference', icon: 'list' },
  { id: 'section-examples', label: 'Examples', icon: 'code-2' },
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
}: {
  activeId: string;
  onSelect: (id: string) => void;
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
      <div className="id-sidebar-header">
        <ui-icon name="layout-panel-left" size="15" />
        <span>Components</span>
        <span className="id-sidebar-count">
          {categoryNavItems.reduce((s, c) => s + (c.children?.length || 0), 0)}
        </span>
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
function RightToc({ activeSection, onScrollTo, examples }: { activeSection: string; onScrollTo: (id: string) => void; examples: ExampleConfig[]; }) {
  return (
    <aside className="id-right-toc">
      <div className="cp-toc-header">
        <ui-icon name="menu" size="12" />
        On this page
      </div>
      <div className="cp-toc-list">
        {TOC_SECTIONS.map(sec => (
          <button
            key={sec.id}
            className={`cp-toc-item ${activeSection === sec.id ? 'cp-toc-item--active' : ''}`}
            onClick={() => onScrollTo(sec.id)}
          >
            <ui-icon name={sec.icon} size="12" />
            {sec.label}
          </button>
        ))}
        {examples.length > 0 && (
          <div className="cp-toc-sublist">
            {examples.map((ex, i) => (
              <button
                key={i}
                className={`cp-toc-item ${activeSection === `example-heading-${i}` ? 'cp-toc-item--active' : ''}`}
                onClick={() => onScrollTo(`example-heading-${i}`)}
              >
                <ui-icon name="code-2" size="10" />
                {ex.title}
              </button>
            ))}
          </div>
        )}
      </div>
    </aside>
  );
}

// ─── Empty State ──────────────────────────────────────────────────────────────
function WelcomeState() {
  return (
    <div className="id-welcome">
      <div className="id-welcome-icon">
        <ui-icon name="layout-panel-left" size="48" />
      </div>
      <h2 className="id-welcome-title">Interactive Documentation</h2>
      <p className="id-welcome-desc">
        Select any component from the left sidebar to explore its live design studio,
        props reference, and usage examples — all in one scrollable view.
      </p>
      <div className="id-welcome-stats">
        <div className="id-stat">
          <span className="id-stat-value">
            {categoryNavItems.reduce((s, c) => s + (c.children?.length || 0), 0)}
          </span>
          <span className="id-stat-label">Components</span>
        </div>
        <div className="id-stat">
          <span className="id-stat-value">{categoryNavItems.length}</span>
          <span className="id-stat-label">Categories</span>
        </div>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function InteractiveDocsPage() {
  const [selectedId, setSelectedId] = useState(() => getIdFromHash());
  const [activeSection, setActiveSection] = useState('section-overview');
  const [examples, setExamples] = useState<ExampleConfig[]>([]);

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
      const ids = TOC_SECTIONS.map(s => s.id);
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
  }, [selectedId]);

  return (
    <div className="id-page">
      {/* Left Sidebar */}
      <LeftSidebar activeId={selectedId} onSelect={handleSelect} />

      {/* Center Content */}
      <main className="id-center" id="id-center-scroll">
        {!selectedId ? (
          <WelcomeState />
        ) : (
          <Suspense
            fallback={
              <div className="id-loading">
                <ui-icon name="loader" size="28" spin />
                <span>Loading component...</span>
              </div>
            }
          >
            <DynamicComponentPage key={selectedId} id={selectedId} interactiveDocs={true} onExamplesLoaded={setExamples} />
          </Suspense>
        )}
      </main>

      {/* Right TOC */}
      {selectedId && (
        <RightToc activeSection={activeSection} onScrollTo={handleScrollTo} examples={examples} />
      )}
    </div>
  );
}
