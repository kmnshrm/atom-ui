import { motion } from 'framer-motion';

export default function Home({ onNavigate }: { onNavigate?: (id: string) => void }) {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const stagger = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const statsCards = [
    {
      num: '73',
      label: 'Components',
      backTitle: 'Core Library',
      backText: 'Atomic elements, layout managers, and advanced visualizations.',
      color: 'cyan'
    },
    {
      num: '71',
      label: 'Playgrounds',
      backTitle: 'Interactive',
      backText: 'Live environments to test configurations and copy ready-made snippets.',
      color: 'purple'
    },
    {
      num: '100%',
      label: 'Web Components',
      backTitle: 'Universal',
      backText: 'Built on standard Web APIs. Works with React, Vue, Svelte, or Vanilla.',
      color: 'green'
    },
    {
      num: '0 KB',
      label: 'No Dependencies',
      backTitle: 'Pure Logic',
      backText: 'Zero-bloat architecture. Minimal footprint, maximum performance.',
      color: 'orange'
    },
  ];

  const featuredComponents = [
    { id: 'advanced-data-table', label: 'Advanced Data Table', category: 'Data', icon: 'table', description: 'Enterprise-grade grid with virtualization, filtering, and export.', badge: 'NEW', img: 'assets/images/data-grid-ui.png' },
    { id: 'kanban-board', label: 'Kanban Board', category: 'Foundation', icon: 'layout', description: 'Collaborative task management with drag-and-drop workflow.', badge: 'PRO', img: 'assets/images/kanban-ui.png' },
    { id: 'smart-dashboard', label: 'Smart Dashboard', category: 'Layout', icon: 'activity', description: 'Dynamic widget-based control center with real-time updates.', badge: 'POPULAR', img: 'assets/images/dashboard-ui.png' },
    { id: 'file-manager', label: 'File Manager', category: 'Navigation', icon: 'folder', description: 'Advanced file explorer with cloud integration and permissions.', img: 'assets/images/file-manager-ui.png' },
    { id: 'real-time-chat', label: 'Real-time Chat', category: 'Feedback', icon: 'message-square', description: 'Full-featured messaging module with live presence status.', badge: 'PRO', img: 'assets/images/chat-ui.png' },
    { id: 'advanced-analytics', label: 'Advanced Analytics', category: 'Data Display', icon: 'bar-chart', description: 'Deep-dive telemetry with interactive charts and reports.', img: 'assets/images/analytics-ui.png' },
    { id: 'premium-login', label: 'Premium Login', category: 'Foundation', icon: 'lock', description: 'Secure, multi-factor authentication system with OTP support.', img: 'assets/images/login-ui.png' },
    { id: 'ecommerce-hub', label: 'E-commerce Hub', category: 'Display', icon: 'shopping-cart', description: 'Complete retail interface for catalogues and checkouts.', badge: 'PREMIUM', img: 'assets/images/ecommerce-ui.png' },
    { id: 'settings-panel', label: 'Settings Panel', category: 'Foundation', icon: 'settings', description: 'Comprehensive configuration suite with granular controls.', img: 'assets/images/settings-ui.png' },
    { id: 'modern-inputs', label: 'Modern Form Set', category: 'Inputs', icon: 'mouse-pointer', description: 'A robust collection of inputs, selects, and pickers.', img: 'assets/images/ui-stack.png' },
    { id: 'revenue-tracker', label: 'Revenue Tracker', category: 'Data Display', icon: 'pie-chart', description: 'Financial oversight tools with trend analysis models.', img: 'assets/images/revenue-chart.png' },
    { id: 'process-stepper', label: 'Smart Stepper', category: 'Navigation', icon: 'list', description: 'Guided multi-step workflows with progress tracking.', badge: 'PRO', img: 'assets/images/sales-trend.png' },
  ];

  const categories = [
    { id: 'charts', label: 'Charts & Graphs', icon: 'pie-chart', count: 19, desc: 'Advanced data visualization components for any screen.' },
    { id: 'foundation', label: 'Foundation & Layout', icon: 'layout', count: 9, desc: 'Essential building blocks for layouts and structure.' },
    { id: 'navigation', label: 'Navigation', icon: 'map', count: 11, desc: 'Intuitive navigation patterns for seamless user journeys.' },
    { id: 'inputs', label: 'Inputs & Forms', icon: 'keyboard', count: 16, desc: 'Rich form controls for data collection and interaction.' },
    { id: 'data-display', label: 'Data Display', icon: 'table', count: 12, desc: 'Powerful components for presenting complex data.' },
    { id: 'feedback', label: 'Feedback & Overlays', icon: 'message-circle', count: 12, desc: 'User feedback and overlay components for better UX.' },
  ];

  const iconLibraries = [
    { name: 'Lucide Icons', count: '1,000+', library: 'lucide', sampleIcons: ['house', 'search', 'settings', 'user', 'bell', 'heart'], color: 'text-cyan-400' },
    { name: 'Font Awesome', count: '2,000+', library: 'fontawesome', sampleIcons: ['fa-star', 'fa-bolt', 'fa-camera', 'fa-envelope', 'fa-eye', 'fa-globe'], color: 'text-purple-400' },
    { name: 'Material Icons', count: '3,000+', library: 'google', sampleIcons: ['face', 'home', 'info', 'lock', 'print', 'star'], color: 'text-green-400' },
    { name: 'Remix Icons', count: '2,500+', library: 'remixicon', sampleIcons: ['ri-home-line', 'ri-user-line', 'ri-settings-line', 'ri-notification-line', 'ri-chat-line', 'ri-heart-line'], color: 'text-yellow-400' },
  ];

  return (
    <div className="min-h-screen text-white overflow-x-hidden relative bg-[#050505]">
      {/* Top Navigation */}
      <nav className="sticky top-0 h-20 border-b border-white/5 bg-black/50 backdrop-blur-xl z-50 px-8 flex items-center justify-between w-full">
        <div className="flex items-center gap-12">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate?.('home')}>
            <div className="w-8 h-8 rounded bg-white flex items-center justify-center text-black font-black">A</div>
            <span className="font-bold text-xl tracking-tight">AetherUI</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
            <span className="hover:text-white cursor-pointer transition-colors" onClick={() => onNavigate?.('layout')}>Components</span>
            <span className="hover:text-white cursor-pointer transition-colors" onClick={() => onNavigate?.('documentation')}>Docs</span>
            <span className="hover:text-white cursor-pointer transition-colors">Pricing</span>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="relative hidden lg:block">
            <ui-icon name="search" class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size="16"></ui-icon>
            <input 
              type="text" 
              placeholder="Search components..." 
              className="bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-4 text-xs focus:outline-none focus:border-white/20 w-48"
            />
          </div>
          <ui-button variant="primary" class="bg-white text-black hover:bg-gray-200 px-6 py-2 rounded-full text-sm font-bold">
            Get Started
          </ui-button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-10">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-blue-400">
              AETHER 1.1 IS HERE
            </motion.div>
            <motion.h1 {...fadeInUp} className="text-6xl md:text-7xl font-black leading-[1.1] tracking-tight">
              The Absolute Best <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                UI Component Hub
              </span>
            </motion.h1>
            <motion.p {...fadeInUp} transition={{ delay: 0.1 }} className="text-gray-400 text-xl leading-relaxed max-w-lg">
              A premium collection of framework-agnostic UI components designed for building professional, high-performance web applications with ease.
            </motion.p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {statsCards.map((stat, i) => (
                <div key={i} className="stat-flip-card">
                  <div className="flip-card-inner">
                    <div className="flip-card-front glass-panel">
                      <div className="text-2xl font-black mb-1">{stat.num}</div>
                      <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{stat.label}</div>
                      <div className="absolute bottom-2 text-[8px] opacity-40 font-bold uppercase tracking-tighter">Flip</div>
                    </div>
                    <div className={`flip-card-back glass-panel border-${stat.color}-500/50`}>
                      <div className={`text-[10px] font-black text-${stat.color}-400 mb-2 uppercase`}>{stat.backTitle}</div>
                      <p className="text-[10px] text-gray-400 leading-tight">{stat.backText}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-4">
              <ui-button variant="primary" size="lg" class="bg-blue-600 hover:bg-blue-500 text-white px-8">Explore Gallery</ui-button>
              <ui-button variant="outline" size="lg" class="border-white/10 text-white px-8">View Docs</ui-button>
            </div>
          </div>

          <div className="relative h-[550px] hidden lg:block">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <motion.div 
                key={i}
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                style={{ top: i * 40, left: i * 40, zIndex: 10 - i }}
                className="absolute w-72 glass-panel rounded-2xl overflow-hidden shadow-2xl hover:z-20 hover:-translate-y-4 transition-all duration-500 cursor-pointer"
              >
                <div className="px-4 py-3 bg-[#111] border-b border-white/5 text-[10px] font-black uppercase text-gray-400">
                  {['Login UI', 'Dashboard', 'UI Stack', 'Settings', 'Data Grid', 'Analytics'][i-1]}
                </div>
                <img src={`assets/images/${['login-ui', 'dashboard-ui', 'ui-stack', 'settings-ui', 'data-grid-ui', 'analytics-ui'][i-1]}.png`} alt="UI" className="w-full opacity-80" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Grid */}
      <section className="py-32 px-8 max-w-7xl mx-auto">
        <div className="text-center mb-20 space-y-4">
          <div className="text-blue-500 text-sm font-black uppercase tracking-widest">Featured Elements</div>
          <h2 className="text-5xl font-black">Elite UI Components</h2>
          <p className="text-gray-400 text-xl">A glimpse into our high-performance component collection</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredComponents.map((comp, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10 }}
              className="cover-card relative aspect-[3/4] rounded-3xl overflow-hidden border border-white/5 group cursor-pointer shadow-xl"
            >
              <div className="absolute inset-0 bg-black/60 z-10 transition-colors group-hover:bg-black/80" />
              <img src={comp.img} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={comp.label} />
              <div className="absolute inset-0 z-20 p-6 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-[10px] font-bold uppercase">{comp.category}</span>
                  {comp.badge && <span className="px-3 py-1 rounded-full bg-blue-600 text-[10px] font-black uppercase shadow-lg shadow-blue-500/40">{comp.badge}</span>}
                </div>
                <div>
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center mb-4 border border-white/10">
                    <ui-icon name={comp.icon} size="20"></ui-icon>
                  </div>
                  <h3 className="text-xl font-black mb-2">{comp.label}</h3>
                  <p className="text-xs text-gray-400 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">{comp.description}</p>
                </div>
              </div>
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-500/50 rounded-3xl transition-colors z-30 pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Powerful Categories */}
      <section className="py-32 bg-[#080808] border-y border-white/5 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 space-y-4">
            <div className="text-cyan-400 text-sm font-black uppercase tracking-widest">System Architecture</div>
            <h2 className="text-5xl font-black">Powerful Categories</h2>
            <p className="text-gray-400 text-xl">Expertly organized elements to accelerate your design-to-code workflow</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((cat, i) => (
              <div key={i} className="glass-panel p-8 rounded-[2.5rem] border border-white/5 hover:bg-white/5 transition-all group">
                <div className="flex justify-between items-start mb-8">
                  <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 border border-cyan-500/20 group-hover:scale-110 transition-transform">
                    <ui-icon name={cat.icon} size="28"></ui-icon>
                  </div>
                  <span className="text-2xl font-black text-gray-700">{cat.count}</span>
                </div>
                <h3 className="text-2xl font-bold mb-4">{cat.label}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-8">{cat.desc}</p>
                <div className="flex items-center gap-2 text-cyan-400 text-sm font-bold cursor-pointer group-hover:gap-4 transition-all">
                  Explore Gallery <ui-icon name="chevron-right" size="16"></ui-icon>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Icon Support */}
      <section className="py-32 px-8 max-w-7xl mx-auto">
        <div className="text-center mb-20 space-y-4">
          <div className="text-purple-400 text-sm font-black uppercase tracking-widest">Icon Infrastructure</div>
          <h2 className="text-5xl font-black">Premium Icon Support</h2>
          <p className="text-gray-400 text-xl">Native integration for the world's most popular icon libraries</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {iconLibraries.map((lib, i) => (
            <div key={i} className="glass-panel p-10 rounded-[3rem] border border-white/5 bg-[#0a0a0a]">
              <div className="flex justify-between items-center mb-10">
                <div>
                  <h3 className="text-2xl font-black mb-1">{lib.name}</h3>
                  <p className="text-xs text-gray-500">{lib.count} Icons Available</p>
                </div>
                <div className={`w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center ${lib.color}`}>
                  <ui-icon name={lib.sampleIcons[0]} library={lib.library} size="24"></ui-icon>
                </div>
              </div>
              <div className="grid grid-cols-6 gap-4">
                {lib.sampleIcons.map((icon, j) => (
                  <div key={j} className="aspect-square rounded-xl bg-white/5 border border-white/5 flex items-center justify-center hover:bg-white/10 hover:border-white/20 transition-all cursor-help">
                    <ui-icon name={icon} library={lib.library} size="20"></ui-icon>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-40 px-8 text-center bg-gradient-to-b from-[#050505] to-blue-900/10">
        <div className="max-w-4xl mx-auto space-y-12">
          <h2 className="text-6xl md:text-7xl font-black leading-tight">Ready to Build <br /> Something Amazing?</h2>
          <p className="text-gray-400 text-xl">Start exploring our component library and accelerate your development workflow</p>
          <ui-button variant="primary" size="lg" class="bg-blue-600 hover:bg-blue-500 text-white px-12 py-6 text-xl rounded-full shadow-2xl shadow-blue-500/20">
            Get Started Now <ui-icon name="arrow-right" size="20" class="ml-2"></ui-icon>
          </ui-button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-8 border-t border-white/5 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-white" />
            <span className="font-bold text-xl">AetherUI</span>
          </div>
          <p className="text-gray-500 text-sm max-w-xs leading-relaxed">
            Refining the world's most fluid design system for modern engineering teams.
          </p>
        </div>
        
        <div>
          <h4 className="font-black text-xs uppercase tracking-widest mb-8 text-gray-400">Platform</h4>
          <ul className="space-y-4 text-gray-500 text-sm font-bold">
            <li className="hover:text-white transition-colors cursor-pointer">Components</li>
            <li className="hover:text-white transition-colors cursor-pointer">Theme Builder</li>
            <li className="hover:text-white transition-colors cursor-pointer">Playground</li>
          </ul>
        </div>

        <div>
          <h4 className="font-black text-xs uppercase tracking-widest mb-8 text-gray-400">Resources</h4>
          <ul className="space-y-4 text-gray-500 text-sm font-bold">
            <li className="hover:text-white transition-colors cursor-pointer">Documentation</li>
            <li className="hover:text-white transition-colors cursor-pointer">Showcase</li>
            <li className="hover:text-white transition-colors cursor-pointer">API Reference</li>
          </ul>
        </div>

        <div className="space-y-8">
          <h4 className="font-black text-xs uppercase tracking-widest text-gray-400">Stay Updated</h4>
          <div className="relative">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-5 text-sm focus:outline-none focus:border-blue-500 transition-colors"
            />
            <ui-button variant="primary" size="sm" class="absolute right-2 top-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-xl">Join</ui-button>
          </div>
        </div>

        <div className="md:col-span-4 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-gray-600 font-bold uppercase tracking-widest">
          <p>© 2026 AetherUI. All rights reserved.</p>
          <div className="flex gap-12">
            <span className="hover:text-white cursor-pointer">Privacy</span>
            <span className="hover:text-white cursor-pointer">Terms</span>
            <span className="hover:text-white cursor-pointer">Cookies</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
