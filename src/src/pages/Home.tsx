import { motion } from 'framer-motion';

export default function Home({ onNavigate, theme, toggleTheme }: { onNavigate?: (id: string) => void; theme: 'light' | 'dark'; toggleTheme: () => void }) {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
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
    <div className="min-h-screen text-[var(--text-primary)] overflow-x-hidden relative bg-[var(--background)]">
      {/* Top Navigation */}
      <nav className="sticky top-0 h-14 border-b border-[var(--border)] bg-[var(--background)]/85 backdrop-blur-2xl backdrop-saturate-150 z-50 px-4 sm:px-8 flex items-center justify-between w-full" style={{boxShadow: '0 1px 0 var(--border-subtle), 0 4px 20px rgba(0,0,0,0.3)'}}>
        <div className="flex items-center gap-4 sm:gap-10">
          <div className="flex items-center gap-2.5 cursor-pointer select-none" onClick={() => onNavigate?.('home')}>
            <div className="w-7 h-7 rounded-lg flex items-center justify-center font-black text-sm" style={{background: 'linear-gradient(135deg, #10b981, #059669)', boxShadow: '0 0 0 1px rgba(16,185,129,0.3), 0 2px 8px rgba(16,185,129,0.25)'}}>A</div>
            <span className="font-bold text-[15px] tracking-tight" style={{background: 'linear-gradient(135deg, #f1f5f9 0%, #94a3b8 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'}}>AetherUI</span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-[13px] font-medium text-[var(--text-secondary)]">
            <span className="hover:text-[var(--text-primary)] cursor-pointer transition-colors duration-150" onClick={() => onNavigate?.('components-guide')}>Components</span>
            <span className="hover:text-[var(--text-primary)] cursor-pointer transition-colors duration-150" onClick={() => onNavigate?.('documentation')}>Docs</span>
            <span className="hover:text-[var(--text-primary)] cursor-pointer transition-colors duration-150" onClick={() => onNavigate?.('pricing')}>Pricing</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative hidden lg:block">
            <ui-icon name="search" class="absolute left-3 top-1/2 -translate-y-1/2" size="14" style={{color: 'var(--text-tertiary)'}}></ui-icon>
            <input 
              type="text" 
              placeholder="Search components..." 
              className="border rounded-lg py-1.5 pl-9 pr-3 text-[13px] focus:outline-none w-44 transition-all duration-200"
              style={{background: 'var(--surface-2)', borderColor: 'var(--border)', color: 'var(--text-primary)'}}
              onFocus={e => { e.currentTarget.style.borderColor = 'var(--border-strong)'; e.currentTarget.style.width = '200px'; }}
              onBlur={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.width = '176px'; }}
            />
          </div>
          <ui-button
            icon={theme === 'dark' ? 'sun' : 'moon'}
            icon-only
            shape="circle"
            variant="ghost"
            onClick={toggleTheme}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          />
          <ui-button variant="primary" shape="pill" size="sm">
            Get Started
          </ui-button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-24 pb-20 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-10">
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-semibold" style={{background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.22)', color: '#34d399', letterSpacing: '0.05em', textTransform: 'uppercase'}}>
              <span style={{width: 6, height: 6, borderRadius: '50%', background: '#10b981', boxShadow: '0 0 8px rgba(16,185,129,0.6)', display: 'inline-block'}}></span>
              Aether 1.1 is here
            </motion.div>
            <motion.h1 {...fadeInUp} className="text-4xl sm:text-6xl md:text-7xl font-black leading-[1.08] tracking-tight">
              The Absolute Best <br />
              <span className="" style={{background: 'linear-gradient(135deg, #f1f5f9 20%, #64748b 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'}}>
                UI Component Hub
              </span>
            </motion.h1>
            <motion.p {...fadeInUp} transition={{ delay: 0.1 }} className="text-[var(--text-secondary)] text-xl leading-relaxed max-w-lg">
              A premium collection of framework-agnostic UI components designed for building professional, high-performance web applications with ease.
            </motion.p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {statsCards.map((stat, i) => (
                <div key={i} className="stat-flip-card">
                  <div className="flip-card-inner">
                    <div className="flip-card-front" style={{background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 16, boxShadow: '0 1px 0 rgba(255,255,255,0.04) inset, 0 4px 12px rgba(0,0,0,0.4)'}}>
                      <div className="text-2xl font-black mb-1" style={{background: 'linear-gradient(135deg, #f1f5f9, #94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'}}>{stat.num}</div>
                      <div className="text-[10px] font-semibold text-[var(--text-secondary)] uppercase tracking-widest">{stat.label}</div>
                    </div>
                    <div className={`flip-card-back`} style={{background: 'var(--surface-3)', border: '1px solid var(--border-strong)', borderRadius: 16}}>
                      <div className={`text-[10px] font-black text-${stat.color}-400 mb-2 uppercase tracking-wider`}>{stat.backTitle}</div>
                      <p className="text-[10px] text-[var(--text-secondary)] leading-tight">{stat.backText}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-4">
              <ui-button variant="primary" size="lg" onClick={() => onNavigate?.('components-guide')}>Explore Gallery</ui-button>
              <ui-button variant="outline" size="lg" onClick={() => onNavigate?.('documentation')}>View Docs</ui-button>
            </div>
          </div>

          <div className="relative h-[550px] hidden lg:block">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <motion.div 
                key={i}
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                whileHover={{ x: -34, y: -34, scale: 1.08, rotate: 7, transition: { type: 'spring', stiffness: 260, damping: 18 } }}
                transition={{ delay: 0.3 + i * 0.1 }}
                style={{ top: i * 40, left: i * 40, zIndex: 10 - i }}
                className="home-stack-card absolute w-72 glass-panel rounded-2xl overflow-visible shadow-2xl cursor-pointer"
              >
                <div className="home-stack-card-shell rounded-2xl overflow-hidden">
                  <div className="px-4 py-3 bg-[var(--surface)] border-b border-[var(--border)] text-[10px] font-black uppercase text-[var(--text-secondary)]">
                    {['Login UI', 'Dashboard', 'UI Stack', 'Settings', 'Data Grid', 'Analytics'][i-1]}
                  </div>
                  <img src={`assets/images/${['login-ui', 'dashboard-ui', 'ui-stack', 'settings-ui', 'data-grid-ui', 'analytics-ui'][i-1]}.png`} alt="UI" className="w-full opacity-80" />
                </div>
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
          <p className="text-[var(--text-secondary)] text-xl">A glimpse into our high-performance component collection</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredComponents.map((comp, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10 }}
              className="cover-card relative aspect-[3/4] rounded-3xl overflow-hidden border border-[var(--border)] group cursor-pointer shadow-xl"
              onClick={() => onNavigate?.(comp.id)}
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
                  <h3 className="text-xl font-black mb-2 text-white">{comp.label}</h3>
                  <p className="text-xs text-gray-300 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">{comp.description}</p>
                  <div className="mt-3 inline-flex items-center gap-1.5 text-[10px] font-bold text-emerald-400 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-2.5 py-1">
                    <ui-icon name="sliders-horizontal" size="10"></ui-icon>
                    Open Design Studio
                  </div>
                </div>
              </div>
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-500/50 rounded-3xl transition-colors z-30 pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Powerful Categories */}
      <section className="py-32 bg-[var(--surface)]/30 border-y border-[var(--border)] px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 space-y-4">
            <div className="text-cyan-400 text-sm font-black uppercase tracking-widest">System Architecture</div>
            <h2 className="text-5xl font-black">Powerful Categories</h2>
            <p className="text-[var(--text-secondary)] text-xl">Expertly organized elements to accelerate your design-to-code workflow</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((cat, i) => (
              <div key={i} className="glass-panel p-8 rounded-[2.5rem] border border-[var(--border)] hover:bg-[var(--surface-hover)] transition-all group">
                <div className="flex justify-between items-start mb-8">
                  <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 border border-cyan-500/20 group-hover:scale-110 transition-transform">
                    <ui-icon name={cat.icon} size="28"></ui-icon>
                  </div>
                  <span className="text-2xl font-black text-[var(--text-secondary)]/50">{cat.count}</span>
                </div>
                <h3 className="text-2xl font-bold mb-4">{cat.label}</h3>
                <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-8">{cat.desc}</p>
                <div className="flex items-center gap-2 text-cyan-400 text-sm font-bold cursor-pointer group-hover:gap-4 transition-all" onClick={() => onNavigate?.('components-guide')}>
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
          <p className="text-[var(--text-secondary)] text-xl">Native integration for the world's most popular icon libraries</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {iconLibraries.map((lib, i) => (
            <div key={i} className="glass-panel p-10 rounded-[3rem] border border-[var(--border)] bg-[var(--surface)]/20">
              <div className="flex justify-between items-center mb-10">
                <div>
                  <h3 className="text-2xl font-black mb-1">{lib.name}</h3>
                  <p className="text-xs text-[var(--text-secondary)]">{lib.count} Icons Available</p>
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
      <section className="py-40 px-8 text-center bg-gradient-to-b from-[var(--background)] to-[var(--surface)]">
        <div className="max-w-4xl mx-auto space-y-12">
          <h2 className="text-6xl md:text-7xl font-black leading-tight">Ready to Build <br /> Something Amazing?</h2>
          <p className="text-[var(--text-secondary)] text-xl">Start exploring our component library and accelerate your development workflow</p>
          <ui-button variant="primary" size="lg" shape="pill" icon="arrow-right" icon-position="right">
            Get Started Now
          </ui-button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-8 border-t border-[var(--border)] max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-[var(--text-primary)]" />
            <span className="font-bold text-xl">AetherUI</span>
          </div>
          <p className="text-[var(--text-secondary)] text-sm max-w-xs leading-relaxed">
            Refining the world's most fluid design system for modern engineering teams.
          </p>
        </div>
        
        <div>
          <h4 className="font-black text-xs uppercase tracking-widest mb-8 text-[var(--text-secondary)]">Platform</h4>
          <ul className="space-y-4 text-[var(--text-secondary)] text-sm font-bold">
            <li className="hover:text-[var(--text-primary)] transition-colors cursor-pointer">Components</li>
            <li className="hover:text-[var(--text-primary)] transition-colors cursor-pointer">Theme Builder</li>
            <li className="hover:text-[var(--text-primary)] transition-colors cursor-pointer">Playground</li>
          </ul>
        </div>

        <div>
          <h4 className="font-black text-xs uppercase tracking-widest mb-8 text-[var(--text-secondary)]">Resources</h4>
          <ul className="space-y-4 text-[var(--text-secondary)] text-sm font-bold">
            <li className="hover:text-[var(--text-primary)] transition-colors cursor-pointer">Documentation</li>
            <li className="hover:text-[var(--text-primary)] transition-colors cursor-pointer">Showcase</li>
            <li className="hover:text-[var(--text-primary)] transition-colors cursor-pointer">API Reference</li>
          </ul>
        </div>

        <div className="space-y-8">
          <h4 className="font-black text-xs uppercase tracking-widest text-[var(--text-secondary)]">Stay Updated</h4>
          <div className="relative">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="w-full bg-[var(--surface-hover)] border border-[var(--border)] rounded-2xl py-4 px-5 text-sm text-[var(--text-primary)] placeholder-[var(--text-secondary)]/60 focus:outline-none focus:border-blue-500 transition-colors"
            />
            <ui-button variant="primary" size="sm" class="absolute right-2 top-2">Join</ui-button>
          </div>
        </div>

        <div className="md:col-span-4 pt-12 border-t border-[var(--border)] flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-[var(--text-secondary)] font-bold uppercase tracking-widest">
          <p>© 2026 AetherUI. All rights reserved.</p>
          <div className="flex gap-12">
            <span className="hover:text-[var(--text-primary)] cursor-pointer">Privacy</span>
            <span className="hover:text-[var(--text-primary)] cursor-pointer">Terms</span>
            <span className="hover:text-[var(--text-primary)] cursor-pointer">Cookies</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
