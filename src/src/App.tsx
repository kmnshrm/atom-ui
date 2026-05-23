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

// Component Pages — lazy loaded for performance
const ButtonPage = lazy(() => import('./pages/components/ButtonPage'));
const CheckboxPage = lazy(() => import('./pages/components/CheckboxPage'));
const InputPage = lazy(() => import('./pages/components/InputPage'));
const IconPage = lazy(() => import('./pages/components/IconPage'));
const AvatarPage = lazy(() => import('./pages/components/AvatarPage'));
const BadgePage = lazy(() => import('./pages/components/BadgePage'));
const ProgressPage = lazy(() => import('./pages/components/ProgressPage'));
const SwitchPage = lazy(() => import('./pages/components/SwitchPage'));
const RadioPage = lazy(() => import('./pages/components/RadioPage'));
const AccordionPage = lazy(() => import('./pages/components/AccordionPage'));
const ButtonTogglePage = lazy(() => import('./pages/components/ButtonTogglePage'));
const DropdownPage = lazy(() => import('./pages/components/DropdownPage'));
const DynamicComponentPage = lazy(() => import('./pages/components/DynamicComponentPage'));

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
};

// All nav IDs that are component pages
const COMPONENT_IDS = new Set(Object.keys(COMPONENT_PAGES));

function PageLoader() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '50vh', flexDirection: 'column', gap: '1rem' }}>
      <ui-icon name="loader" size="32" spin />
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

export default function App() {
  const navRef = useRef<any>(null);
  const [collapsed, setCollapsed] = useState(true);
  const [activeItem, setActiveItem] = useState(() => {
    return getPageIdFromHash(window.location.hash);
  });
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  const navigate = (id: string) => {
    window.location.hash = getHashFromPageId(id);
  };

  useEffect(() => {
    document.body.classList.remove('theme-light', 'theme-dark');
    document.body.classList.add(`theme-${theme}`);
  }, [theme]);

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
        window.scrollTo({ top: 0, behavior: 'smooth' });
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
      navRef.current.selectedItem = activeItem;

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
    // Static pages
    switch (activeItem) {
      case 'home': return <Home onNavigate={navigate} />;
      case 'overview': return <Overview />;
      case 'documentation': return <Documentation />;
      case 'design-house': return <DesignHouse />;
      case 'installation': return <Installation />;
      case 'pricing': return <Pricing />;
      case 'components-guide': return <ComponentsGuide onNavigate={navigate} />;
      case 'interactive-docs': return <InteractiveDocsPage />;
    }

    // Component playground pages
    if (COMPONENT_IDS.has(activeItem)) {
      const Page = COMPONENT_PAGES[activeItem];
      return (
        <Suspense fallback={<PageLoader />}>
          <Page />
        </Suspense>
      );
    }

    // Fallback to Dynamic Design Studio for all other library components
    const isStatic = STATIC_PAGES.has(activeItem);
    if (!isStatic) {
      return (
        <Suspense fallback={<PageLoader />}>
          <DynamicComponentPage id={activeItem} />
        </Suspense>
      );
    }

    // Placeholder for other elements
    return <ComponentPlaceholder id={activeItem} />;
  };

  const isHome = activeItem === 'home';
  const isStaticPage = STATIC_PAGES.has(activeItem);
  const isInteractiveDocs = activeItem === 'interactive-docs';
  const isComponentPage = !isStaticPage || isInteractiveDocs;

  return (
    <div className={`app-container layout-sidebar ${collapsed ? 'sidebar-collapsed' : ''} theme-${theme}`}>
      {/* Sidebar Navigation */}
      <ui-navigation-bar
        ref={navRef}
        class="main-nav"
        orientation="vertical"
        collapsible="true"
        mode={collapsed ? 'collapsed' : 'expanded'}
        theme={theme}
        show-search="true"
        max-items="100"
        company-name="AetherUI"
      >
        <div slot="header" className="nav-brand-header cursor-pointer" onClick={() => navigate('home')}>
          <div className="nav-brand-logo bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white font-bold">
            A
          </div>
          <span className="nav-brand-name font-bold text-xl ml-2 gradient-text">Atom UI</span>
        </div>
      </ui-navigation-bar>

      {/* Main Content Area */}
      <main className={`main-content ${isComponentPage ? 'main-content--component' : ''}`}>
        {/* Top Bar — hidden on home and component pages (they have their own header) */}
        {!isHome && !isComponentPage && (
          <header className="h-16 border-b border-[#222] bg-black/50 backdrop-blur-md flex items-center justify-between px-8 z-20 flex-shrink-0">
            <div className="flex items-center gap-4">
              <h1 className="text-lg font-medium capitalize">{activeItem.replace(/-/g, ' ')}</h1>
            </div>
            <div className="flex items-center gap-4">
              <ui-input
                type="search"
                placeholder="Search components..."
                prefix-icon="search"
                size="sm"
                class="w-64"
              />
              <ui-button
                icon="bell"
                icon-only
                shape="circle"
                variant="ghost"
              />
              <ui-button
                icon={theme === 'dark' ? 'sun' : 'moon'}
                icon-only
                shape="circle"
                variant="ghost"
                onClick={toggleTheme}
                title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              />
              <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 border border-white/20" />
            </div>
          </header>
        )}

        {/* Thin top-bar for component pages */}
        {isComponentPage && !isInteractiveDocs && (
          <div className="cp-topbar">
            <div className="cp-topbar-breadcrumb">
              <ui-button
                icon="house"
                icon-only
                shape="circle"
                variant="ghost"
                size="sm"
                class="cp-topbar-home"
                onClick={() => navigate('home')}
              />
              <ui-icon name="chevron-right" size="12" />
              <span className="cp-topbar-category">Components</span>
              <ui-icon name="chevron-right" size="12" />
              <span className="cp-topbar-current">{activeItem.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}</span>
            </div>
            <ui-button
              icon={theme === 'dark' ? 'sun' : 'moon'}
              icon-only
              shape="circle"
              variant="ghost"
              size="sm"
              class="cp-topbar-theme-btn"
              onClick={toggleTheme}
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            />
          </div>
        )}

        {/* Content Body */}
        <div className={`content-body ${isHome ? '' : ''} ${isComponentPage ? 'content-body--component' : ''}`}>
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/10 blur-[100px] rounded-full" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-green-900/10 blur-[100px] rounded-full" />
          </div>
          <div className={`relative z-10 ${isComponentPage ? 'cp-wrapper' : (isHome || activeItem === 'components-guide') ? 'w-full' : 'max-w-6xl mx-auto p-8'}`}>
            {renderContent()}
          </div>
        </div>
      </main>
    </div>
  );
}
