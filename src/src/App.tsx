import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

import { topNavItems, categoryNavItems, bottomNavItems, userProfileNavItems } from './navigation.data';
import './App.css';

import Home from './pages/Home';
import Overview from './pages/Overview';
import Documentation from './pages/Documentation';
import DesignHouse from './pages/DesignHouse';

export default function App() {
  const navRef = useRef<any>(null);
  const [collapsed, setCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState('home');
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  useEffect(() => {
    if (navRef.current) {
      // Set properties on the custom element
      navRef.current.categories = topNavItems;
      navRef.current.items = categoryNavItems;
      navRef.current.bottomItems = bottomNavItems;
      navRef.current.bottomItemsSecondary = userProfileNavItems;
      navRef.current.selectedItem = activeItem;
      
      // Add event listeners for navigation
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
    switch (activeItem) {
      case 'home':
        return <Home />;
      case 'overview':
        return <Overview />;
      case 'documentation':
        return <Documentation />;
      case 'design-house':
        return <DesignHouse />;
      default:
        return (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            <div className="w-20 h-20 bg-[#111] border border-[#333] rounded-3xl flex items-center justify-center mb-6">
              <ui-icon name="package" size="40" class="text-green-500"></ui-icon>
            </div>
            <h2 className="text-3xl font-bold mb-2">Component View: {activeItem}</h2>
            <p className="text-gray-400 max-w-md">
              This is a placeholder for the {activeItem} component showcase. 
              In a real app, this would route to the specific documentation or demo page.
            </p>
            <ui-button variant="outline" class="mt-8" onClick={() => setActiveItem('home')}>
              Return to Dashboard
            </ui-button>
          </div>
        );
    }
  };

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
        max-items="8"
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
      <main className="main-content flex-1 flex flex-col overflow-hidden">
        {/* Top Bar - Hidden on Home to show custom landing nav */}
        {activeItem !== 'home' && (
          <header className="h-16 border-b border-[#222] bg-black/50 backdrop-blur-md flex items-center justify-between px-8 z-20">
            <div className="flex items-center gap-4">
              <h1 className="text-lg font-medium capitalize">{activeItem.replace('-', ' ')}</h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative group">
                <ui-icon name="search" class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size="18"></ui-icon>
                <input 
                  type="text" 
                  placeholder="Search components..." 
                  className="bg-[#111] border border-[#333] rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-green-500 transition-colors w-64"
                />
              </div>
              <button className="p-2 hover:bg-[#222] rounded-full transition-colors text-gray-400 hover:text-white">
                <ui-icon name="bell" size="20"></ui-icon>
              </button>
              <button className="p-2 hover:bg-[#222] rounded-full transition-colors text-gray-400 hover:text-white">
                <ui-icon name="settings" size="20"></ui-icon>
              </button>
              
              <button 
                onClick={toggleTheme}
                className="p-2 hover:bg-[#222] rounded-full transition-colors text-gray-400 hover:text-white flex items-center gap-2"
                title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              >
                <ui-icon name={theme === 'dark' ? 'sun' : 'moon'} size="20"></ui-icon>
              </button>
              
              <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 border border-white/20"></div>
            </div>
          </header>
        )}

        {/* Content Body */}
        <div className={`content-body flex-1 overflow-y-auto relative ${activeItem === 'home' ? 'p-0' : 'p-8'}`}>
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/10 blur-[100px] rounded-full"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-green-900/10 blur-[100px] rounded-full"></div>
          </div>

          <div className={`relative z-10 ${activeItem === 'home' ? '' : 'max-w-6xl mx-auto'}`}>
            {renderContent()}
          </div>
        </div>
      </main>
    </div>
  );
}
