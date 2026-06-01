import { useEffect, useRef, useState, lazy, Suspense } from 'react';

import { topNavItems, categoryNavItems, bottomNavItems, userProfileNavItems } from './navigation.data';
import './App.css';

import Home from './pages/Home';
import Overview from './pages/Overview';
import Documentation from './pages/Documentation';
import DesignHouse from './pages/DesignHouse';
import Installation from './pages/Installation';
import Pricing from './pages/Pricing';
import ComponentsGuide from './pages/ComponentsGuide';
import InteractiveDocsPage from './pages/InteractiveDocsPage';

// Wraps React.lazy so that a failed chunk fetch (stale browser cache after a new
// deploy) automatically reloads the page once, loading the fresh bundle.
function safeLazy<T extends React.ComponentType<any>>(
  factory: () => Promise<{ default: T }>
) {
  return lazy(() =>
    factory().catch(() => {
      // Guard against infinite reload loops: only auto-reload once per session.
      const key = '__chunkReloaded';
      if (!sessionStorage.getItem(key)) {
        sessionStorage.setItem(key, '1');
        window.location.reload();
      }
      // Return a promise that never resolves so the Suspense fallback stays
      // visible while the page is reloading.
      return new Promise<{ default: T }>(() => {});
    })
  );
}

// Component Pages — lazy loaded for performance
const ButtonPage = safeLazy(() => import('./pages/components/ButtonPage'));
const CheckboxPage = safeLazy(() => import('./pages/components/CheckboxPage'));
const InputPage = safeLazy(() => import('./pages/components/InputPage'));
const IconPage = safeLazy(() => import('./pages/components/IconPage'));
const AvatarPage = safeLazy(() => import('./pages/components/AvatarPage'));
const BadgePage = safeLazy(() => import('./pages/components/BadgePage'));
const ProgressPage = safeLazy(() => import('./pages/components/ProgressPage'));
const SwitchPage = safeLazy(() => import('./pages/components/SwitchPage'));
const RadioPage = safeLazy(() => import('./pages/components/RadioPage'));
const AccordionPage = safeLazy(() => import('./pages/components/AccordionPage'));
const ButtonTogglePage = safeLazy(() => import('./pages/components/ButtonTogglePage'));
const DropdownPage = safeLazy(() => import('./pages/components/DropdownPage'));
const LoaderPage = safeLazy(() => import('./pages/components/LoaderPage'));
const DynamicComponentPage = safeLazy(() => import('./pages/components/DynamicComponentPage'));

// Map nav IDs → component pages
const COMPONENT_PAGES: Record<string, React.ComponentType> = {
  button: ButtonPage,
  checkbox: CheckboxPage,
  input: InputPage,
  'icon': IconPage,
  avatar: AvatarPage,
  badge: BadgePage,
  progress: ProgressPage,
  switch: SwitchPage,
  radio: RadioPage,
  accordion: AccordionPage,
  accordian: AccordionPage,
  'button-toggle': ButtonTogglePage,
  dropdown: DropdownPage,
  loader: LoaderPage,
};

// All nav IDs that are component pages
const COMPONENT_IDS = new Set(Object.keys(COMPONENT_PAGES));

function PageLoader() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '50vh', flexDirection: 'column', gap: '1rem' }}>
      <ui-loader type="spinner" size="xl" color="success" />
      <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem' }}>Loading component...</span>
    </div>
  );
}

function ComponentPlaceholder({ id }: { id: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', textAlign: 'center', padding: '2rem' }}>
      <div style={{ width: '80px', height: '80px', background: 'rgba(52,211,153,0.08)', border: '1px solid rgba(52,211,153,0.2)', borderRadius: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
        <ui-icon name="package" size="36" color="#34d399" />
      </div>
      <div style={{ fontFamily: 'monospace', fontSize: '0.8rem', color: '#34d399', background: 'rgba(52,211,153,0.08)', border: '1px solid rgba(52,211,153,0.2)', borderRadius: '999px', padding: '0.25rem 0.875rem', marginBottom: '1rem' }}>
        &lt;ui-{id}&gt;
      </div>
      <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.75rem' }}>
        {id.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}
      </h2>
      <p style={{ color: 'rgba(255,255,255,0.4)', maxWidth: '42ch', lineHeight: 1.7, fontSize: '0.9rem' }}>
        The playground for <strong style={{ color: 'rgba(255,255,255,0.7)' }}>{id}</strong> is coming soon. 
        Check the sidebar for components that already have interactive design studios.
      </p>
      <div style={{ display: 'flex', gap: '0.75rem', marginTop: '2rem' }}>
        <ui-badge label="Playground" variant="warning" rounded icon="construction" />
        <ui-badge label="Coming Soon" variant="outline" rounded />
      </div>
    </div>
  );
}

const STATIC_PAGES = new Set(['home', 'overview', 'documentation', 'design-house', 'installation', 'components-guide', 'pricing', 'interactive-docs']);

const getPageIdFromHash = (hash: string): string => {
  const cleaned = hash.replace(/^#\/?/, '');
  if (!cleaned) return 'home';

  // Interactive Docs format: interactive-docs/{id} or interactive-docs
  if (cleaned.startsWith('interactive-docs')) return 'interactive-docs';

  // Component tab format: component/{tab}/{id}
  const compMatch = cleaned.match(/^component\/[^/]+\/(.+)$/);
  if (compMatch) return compMatch[1];

  // Static / legacy flat format
  if (cleaned.includes('/')) {
    const parts = cleaned.split('/');
    return parts[parts.length - 1] || 'home';
  }
  return cleaned;
};

const getHashFromPageId = (id: string): string => {
  if (id === 'home') return '#/';
  if (STATIC_PAGES.has(id)) return `#/${id}`;
  // Component pages always open on the playground tab
  return `#/component/playground/${id}`;
};

// Bottom navigation items for mobile
const BOTTOM_NAV_ITEMS = [
  { id: 'home',              label: 'Home',       icon: 'house' },
  { id: 'components-guide',  label: 'Components', icon: 'box' },
  { id: 'interactive-docs',  label: 'Docs',       icon: 'book-open' },
  { id: 'design-house',      label: 'Design',     icon: 'palette' },
];

export default function App() {
  const navRef = useRef<any>(null);
  const [collapsed, setCollapsed] = useState(true);
  const [navOpen, setNavOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(() => {
    return getPageIdFromHash(window.location.hash);
  });
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  const navigate = (id: string) => {
    window.location.hash = getHashFromPageId(id);
    setNavOpen(false); // close mobile drawer on navigate
  };

  const openNav = () => setNavOpen(true);
  const closeNav = () => setNavOpen(false);

  useEffect(() => {
    document.body.classList.remove('theme-light', 'theme-dark');
    document.body.classList.add(`theme-${theme}`);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Persist theme preference
  useEffect(() => {
    try {
      localStorage.setItem('ui-theme', theme);
    } catch {}
  }, [theme]);

  // Load persisted theme on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('ui-theme') as 'light' | 'dark' | null;
      if (saved === 'light' || saved === 'dark') setTheme(saved);
    } catch {}
  }, []);

  // Close nav on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') closeNav(); };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, []);

  // Sync state with hash change
  useEffect(() => {
    const handleHashChange = () => {
      const pageId = getPageIdFromHash(window.location.hash);
      setActiveItem(pageId);
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Listen to custom global navigation event
  useEffect(() => {
    const handleGlobalNav = (e: Event) => {
      const id = (e as CustomEvent).detail?.id;
      if (id) {
        navigate(id);
        const mc = document.querySelector('.main-content');
        if (mc) mc.scrollTop = 0;
      }
    };
    window.addEventListener('appNavigate', handleGlobalNav);
    return () => window.removeEventListener('appNavigate', handleGlobalNav);
  }, []);

  useEffect(() => {
    if (navRef.current) {
      navRef.current.categories = topNavItems;
      navRef.current.items = categoryNavItems;
      navRef.current.bottomItems = bottomNavItems;
      navRef.current.bottomItemsSecondary = userProfileNavItems;
      navRef.current.activeId = activeItem;

      const handleNavClick = (e: any) => {
        const id = e.detail?.id;
        if (id) navigate(id);
      };

      const handleNavToggle = (e: any) => {
        setCollapsed(!e.detail?.expanded);
      };

      navRef.current.addEventListener('navItemClick', handleNavClick);
      navRef.current.addEventListener('navToggle', handleNavToggle);

      return () => {
        if (navRef.current) {
          navRef.current.removeEventListener('navItemClick', handleNavClick);
          navRef.current.removeEventListener('navToggle', handleNavToggle);
        }
      };
    }
  }, [activeItem]);

  const renderContent = () => {
    switch (activeItem) {
      case 'home': return <Home onNavigate={navigate} theme={theme} toggleTheme={toggleTheme} />;
      case 'overview': return <Overview />;
      case 'documentation': return <Documentation />;
      case 'design-house': return <DesignHouse />;
      case 'installation': return <Installation />;
      case 'pricing': return <Pricing />;
      case 'components-guide': return <ComponentsGuide onNavigate={navigate} theme={theme} toggleTheme={toggleTheme} />;
      case 'interactive-docs': return <InteractiveDocsPage theme={theme} toggleTheme={toggleTheme} />;
    }

    if (COMPONENT_IDS.has(activeItem)) {
      const Page = COMPONENT_PAGES[activeItem];
      return (
        <Suspense fallback={<PageLoader />}>
          <Page />
        </Suspense>
      );
    }

    const isStatic = STATIC_PAGES.has(activeItem);
    if (!isStatic) {
      return (
        <Suspense fallback={<PageLoader />}>
          <DynamicComponentPage id={activeItem} />
        </Suspense>
      );
    }

    return <ComponentPlaceholder id={activeItem} />;
  };

  const isHome = activeItem === 'home';
  const isStaticPage = STATIC_PAGES.has(activeItem);
  const isInteractiveDocs = activeItem === 'interactive-docs';
  const isComponentPage = !isStaticPage || isInteractiveDocs;
  const pageTitle = activeItem.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

  return (
    <div className={`app-container layout-sidebar ${collapsed ? 'sidebar-collapsed' : ''} theme-${theme}`}>

      {/* ── Mobile / Tablet nav overlay backdrop ── */}
      {navOpen && (
        <div
          className="nav-overlay"
          onClick={closeNav}
          aria-hidden="true"
        />
      )}

      {/* ── Sidebar Navigation ── */}
      <ui-navigation-bar
        ref={navRef}
        class={`main-nav${navOpen ? ' nav-open' : ''}`}
        orientation="vertical"
        collapsible="true"
        mode={collapsed ? 'collapsed' : 'expanded'}
        theme={theme}
        show-search="true"
        max-items="100"
        company-name="AetherUI"
        aria-label="Main navigation"
      >
        <div slot="header" className="nav-brand-header cursor-pointer" onClick={() => navigate('home')}>
          <div className="nav-brand-logo bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white font-bold">
            A
          </div>
          <span className="nav-brand-name font-bold text-xl ml-2 gradient-text">Atom UI</span>
        </div>
      </ui-navigation-bar>

      {/* ── Main Content Area ── */}
      <main className={`main-content ${isComponentPage ? 'main-content--component' : ''}`} id="main-content" tabIndex={-1}>

        {/* ── Sticky Header (static pages) ── */}
        {!isHome && !isComponentPage && (
          <header className="app-header">
            <div className="app-header-left">
              {/* Mobile menu button */}
              <button
                className="mobile-menu-btn"
                onClick={openNav}
                aria-label="Open navigation menu"
                aria-expanded={navOpen}
                aria-controls="main-nav"
              >
                <ui-icon name="menu" size="18" />
              </button>
              {/* Breadcrumb */}
              <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm">
                <button
                  onClick={() => navigate('home')}
                  className="text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors bg-transparent border-none cursor-pointer p-0"
                  aria-label="Home"
                >
                  <ui-icon name="house" size="14" />
                </button>
                <ui-icon name="chevron-right" size="12" class="text-[var(--text-tertiary)]" />
                <h1 className="app-header-title">{pageTitle}</h1>
              </nav>
            </div>
            <div className="app-header-right">
              {/* Search — hidden on small mobile via CSS */}
              <div className="header-search">
                <ui-input
                  type="search"
                  placeholder="Search components..."
                  prefix-icon="search"
                  size="sm"
                  style={{ width: '220px' }}
                />
              </div>
              <ui-button
                icon={theme === 'dark' ? 'sun' : 'moon'}
                icon-only
                shape="circle"
                variant="ghost"
                size="sm"
                onClick={toggleTheme}
                title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              />
              <div
                className="h-8 w-8 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 border border-white/20 flex-shrink-0 cursor-pointer"
                role="button"
                aria-label="User menu"
                tabIndex={0}
              />
            </div>
          </header>
        )}

        {/* ── Component page topbar (breadcrumb) ── */}
        {isComponentPage && !isInteractiveDocs && (
          <div className="cp-topbar" role="navigation" aria-label="Component breadcrumb">
            <div className="cp-topbar-breadcrumb">
              {/* Mobile menu button */}
              <button
                className="mobile-menu-btn"
                onClick={openNav}
                aria-label="Open navigation menu"
                style={{ marginRight: '0.25rem' }}
              >
                <ui-icon name="menu" size="16" />
              </button>
              <button
                className="cp-topbar-home"
                onClick={() => navigate('home')}
                aria-label="Home"
              >
                <ui-icon name="house" size="13" />
              </button>
              <ui-icon name="chevron-right" size="12" />
              <span className="cp-topbar-category">Components</span>
              <ui-icon name="chevron-right" size="12" />
              <span className="cp-topbar-current">{pageTitle}</span>
            </div>
            <button
              className="cp-topbar-theme-btn"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              <ui-icon name={theme === 'dark' ? 'sun' : 'moon'} size="14" />
            </button>
          </div>
        )}

        {/* ── Content Body ── */}
        <div className={`content-body ${isComponentPage ? 'content-body--component' : ''}`}>
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/10 blur-[100px] rounded-full" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-green-900/10 blur-[100px] rounded-full" />
          </div>
          <div className={`relative z-10 ${isComponentPage ? 'cp-wrapper' : (isHome || activeItem === 'components-guide') ? 'w-full' : 'max-w-6xl mx-auto p-8'}`}>
            {renderContent()}
          </div>
        </div>
      </main>

      {/* ── Mobile Bottom Navigation ── */}
      <nav className="bottom-nav" aria-label="Mobile navigation">
        <div className="bottom-nav-inner">
          {BOTTOM_NAV_ITEMS.map(item => (
            <button
              key={item.id}
              className={`bottom-nav-item${activeItem === item.id ? ' bottom-nav-item--active' : ''}`}
              onClick={() => navigate(item.id)}
              aria-label={item.label}
              aria-current={activeItem === item.id ? 'page' : undefined}
            >
              <ui-icon name={item.icon} size="20" />
              <span className="bottom-nav-label">{item.label}</span>
            </button>
          ))}
          {/* Search / More trigger */}
          <button
            className="bottom-nav-item"
            onClick={openNav}
            aria-label="More navigation"
          >
            <ui-icon name="menu" size="20" />
            <span className="bottom-nav-label">More</span>
          </button>
        </div>
      </nav>

      {/* Scroll to top — not shown in interactive docs */}
      {!isInteractiveDocs && (
        <ui-scroll-top
          target=".main-content"
          threshold="300"
          position="bottom-right"
          color="primary"
          show-progress="true"
          glassy="true"
        />
      )}
    </div>
  );
}
