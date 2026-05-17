import { useEffect, useRef, useState, lazy, Suspense } from 'react';

import { topNavItems, categoryNavItems, bottomNavItems, userProfileNavItems } from './navigation.data';
import './App.css';

import Home from './pages/Home';
import Overview from './pages/Overview';
import Documentation from './pages/Documentation';
import DesignHouse from './pages/DesignHouse';

// Component Pages — lazy loaded for performance
const ButtonPage = lazy(() => import('./pages/components/ButtonPage'));
const CheckboxPage = lazy(() => import('./pages/components/CheckboxPage'));
const InputPage = lazy(() => import('./pages/components/InputPage'));
const IconPage = lazy(() => import('./pages/components/IconPage'));
const AvatarPage = lazy(() => import('./pages/components/AvatarPage'));
const BadgePage = lazy(() => import('./pages/components/BadgePage'));
const ProgressPage = lazy(() => import('./pages/components/ProgressPage'));
const SwitchPage = lazy(() => import('./pages/components/SwitchPage'));

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

export default function App() {
  const navRef = useRef<any>(null);
  const [collapsed, setCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState('home');
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  useEffect(() => {
    if (navRef.current) {
      navRef.current.categories = topNavItems;
      navRef.current.items = categoryNavItems;
      navRef.current.bottomItems = bottomNavItems;
      navRef.current.bottomItemsSecondary = userProfileNavItems;
      navRef.current.selectedItem = activeItem;

      const handleNavClick = (e: any) => {
        const id = e.detail?.id;
        if (id) setActiveItem(id);
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
      case 'home': return <Home />;
      case 'overview': return <Overview />;
      case 'documentation': return <Documentation />;
      case 'design-house': return <DesignHouse />;
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

    // Placeholder for unmapped components
    return <ComponentPlaceholder id={activeItem} />;
  };

  const isHome = activeItem === 'home';
  const isComponentPage = COMPONENT_IDS.has(activeItem);

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
        <div slot="header" className="nav-brand-header cursor-pointer" onClick={() => setActiveItem('home')}>
          <div className="nav-brand-logo bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white font-bold">
            A
          </div>
          <span className="nav-brand-name font-bold text-xl ml-2 gradient-text">Atom UI</span>
        </div>
      </ui-navigation-bar>

      {/* Main Content Area */}
      <main className="main-content">
        {/* Top Bar — hidden on home and component pages (they have their own header) */}
        {!isHome && !isComponentPage && (
          <header className="h-16 border-b border-[#222] bg-black/50 backdrop-blur-md flex items-center justify-between px-8 z-20 flex-shrink-0">
            <div className="flex items-center gap-4">
              <h1 className="text-lg font-medium capitalize">{activeItem.replace(/-/g, ' ')}</h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <ui-icon name="search" class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size="18" />
                <input
                  type="text"
                  placeholder="Search components..."
                  className="bg-[#111] border border-[#333] rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-green-500 transition-colors w-64"
                />
              </div>
              <button className="p-2 hover:bg-[#222] rounded-full transition-colors text-gray-400 hover:text-white">
                <ui-icon name="bell" size="20" />
              </button>
              <button
                onClick={toggleTheme}
                className="p-2 hover:bg-[#222] rounded-full transition-colors text-gray-400 hover:text-white"
                title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              >
                <ui-icon name={theme === 'dark' ? 'sun' : 'moon'} size="20" />
              </button>
              <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 border border-white/20" />
            </div>
          </header>
        )}

        {/* Thin top-bar for component pages */}
        {isComponentPage && (
          <div className="cp-topbar">
            <div className="cp-topbar-breadcrumb">
              <button className="cp-topbar-home" onClick={() => setActiveItem('home')}>
                <ui-icon name="house" size="14" />
              </button>
              <ui-icon name="chevron-right" size="12" />
              <span className="cp-topbar-category">Components</span>
              <ui-icon name="chevron-right" size="12" />
              <span className="cp-topbar-current">{activeItem.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}</span>
            </div>
            <button
              onClick={toggleTheme}
              className="cp-topbar-theme-btn"
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              <ui-icon name={theme === 'dark' ? 'sun' : 'moon'} size="16" />
            </button>
          </div>
        )}

        {/* Content Body */}
        <div className={`content-body ${isHome ? '' : ''} ${isComponentPage ? 'content-body--component' : ''}`}>
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/10 blur-[100px] rounded-full" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-green-900/10 blur-[100px] rounded-full" />
          </div>
          <div className={`relative z-10 ${isHome || isComponentPage ? '' : 'max-w-6xl mx-auto p-8'}`}>
            {renderContent()}
          </div>
        </div>
      </main>
    </div>
  );
}
