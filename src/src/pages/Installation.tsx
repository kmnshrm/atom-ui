import { useState } from 'react';

export default function Installation() {
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(id);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const snippets = {
    npm: 'npm install atomicuilibrary',
    yarn: 'yarn add atomicuilibrary',
    pnpm: 'pnpm add atomicuilibrary',
    mainImport: `import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';

// 1. Import Stencil Custom Elements loader
import { defineCustomElements } from 'atomicuilibrary/loader';

// 2. Define Custom Elements globally
defineCustomElements(window);

createRoot(document.getElementById('root')!).render(
  <App />
);`,
    icons: `// Register Lucide Icon library (or FontAwesome, etc.)
try {
  (window as any).registerIconLibrary?.('lucide', {
    resolver: (name: string) => 
      \`https://cdn.jsdelivr.net/npm/lucide-static@0.400.0/icons/\${name}.svg\`
  });
} catch (e) {
  console.warn("Could not register icon library", e);
}`,
    example: `import React from 'react';

export default function App() {
  const handleButtonClick = () => {
    console.log("Button clicked!");
  };

  return (
    <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* 1. Standard Button component */}
      <ui-button 
        variant="primary" 
        size="md" 
        onClick={handleButtonClick}
      >
        Click Me
      </ui-button>

      {/* 2. Unified Card Component */}
      <ui-card card-title="Enterprise Solution" collapsible="true">
        <p>Atom UI components are natively encapsulated using Shadow DOM.</p>
        
        {/* 3. High-fidelity Loader component */}
        <ui-loader type="dots" color="success" size="sm"></ui-loader>
      </ui-card>
    </div>
  );
}`,
    tailwind: `@import "tailwindcss";

:root {
  --ui-primary-color: #10b981; /* Custom brand green override */
  --ui-secondary-color: #64748b;
  --ui-success-color: #10b981;
  --ui-danger-color: #ef4444;
  --ui-warning-color: #f59e0b;
  --ui-info-color: #06b6d4;
}

body {
  background-color: #09090b;
  color: #fafafa;
  font-family: 'Inter', system-ui, sans-serif;
}`
  };

  return (
    <div className="max-w-4xl space-y-12 pb-16">
      {/* Premium Header */}
      <header className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-500/10 via-purple-500/5 to-transparent border border-green-500/10 p-8 md:p-12">
        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-green-500/10 blur-[100px] rounded-full -mr-20 -mt-20 pointer-events-none" />
        <div className="relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase">
            <ui-icon name="rocket" size="14" />
            Quick Start Guide
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight" style={{ color: 'var(--text-primary)' }}>
            Installation <span style={{ color: '#10b981' }}>&</span> Integration
          </h1>
          <p className="text-gray-400 text-lg md:text-xl leading-relaxed max-w-2xl">
            Get up and running with <span className="text-green-400 font-bold">Atom UI</span> in seconds. Build elite, performant, and visual-rich Web Components in your React, Angular, or Vue application.
          </p>
        </div>
      </header>

      {/* Prerequisites */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-bold tracking-tight text-white">Prerequisites</h2>
          <span className="text-xs bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 px-2 py-0.5 rounded-full font-semibold">Required</span>
        </div>
        <p className="text-gray-400">
          Ensure your environment meets the following requirements before installing Atom UI.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Node.js */}
          <div className="bg-zinc-900/60 backdrop-blur-md rounded-xl border border-zinc-800 p-5 space-y-3 hover:border-zinc-700 transition-all">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-green-500/10 rounded-lg border border-green-500/20">
                <ui-icon name="server" size="16" class="text-green-400" />
              </div>
              <span className="text-sm font-bold text-white">Node.js</span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              Version <span className="text-green-400 font-semibold">16.0+</span> or higher. LTS releases recommended.
            </p>
            <a
              href="https://nodejs.org/en/download"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-green-400 hover:text-green-300 transition-colors"
            >
              Download Node.js <ui-icon name="external-link" size="11" />
            </a>
          </div>

          {/* Package Manager */}
          <div className="bg-zinc-900/60 backdrop-blur-md rounded-xl border border-zinc-800 p-5 space-y-3 hover:border-zinc-700 transition-all">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-blue-500/10 rounded-lg border border-blue-500/20">
                <ui-icon name="package" size="16" class="text-blue-400" />
              </div>
              <span className="text-sm font-bold text-white">Package Manager</span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              <span className="text-blue-400 font-semibold">npm 8+</span>, <span className="text-blue-400 font-semibold">yarn 1.22+</span>, or <span className="text-blue-400 font-semibold">pnpm 7+</span>.
            </p>
            <span className="inline-block text-xs text-zinc-500">Bundled with Node.js install</span>
          </div>

          {/* Browser */}
          <div className="bg-zinc-900/60 backdrop-blur-md rounded-xl border border-zinc-800 p-5 space-y-3 hover:border-zinc-700 transition-all">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-purple-500/10 rounded-lg border border-purple-500/20">
                <ui-icon name="globe" size="16" class="text-purple-400" />
              </div>
              <span className="text-sm font-bold text-white">Browser</span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              Modern browser with <span className="text-purple-400 font-semibold">Custom Elements v1</span> support — Chrome 67+, Firefox 63+, Safari 12.1+, Edge 79+.
            </p>
          </div>

          {/* Framework */}
          <div className="bg-zinc-900/60 backdrop-blur-md rounded-xl border border-zinc-800 p-5 space-y-3 hover:border-zinc-700 transition-all">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-orange-500/10 rounded-lg border border-orange-500/20">
                <ui-icon name="layers" size="16" class="text-orange-400" />
              </div>
              <span className="text-sm font-bold text-white">Framework</span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              <span className="text-orange-400 font-semibold">React 17+</span>, <span className="text-orange-400 font-semibold">Angular 14+</span>, <span className="text-orange-400 font-semibold">Vue 3+</span>, or Vanilla JS / HTML.
            </p>
          </div>
        </div>
      </section>

      {/* Supported Versions */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-bold tracking-tight text-white">Supported Versions</h2>
        </div>
        <p className="text-gray-400">
          Compatibility matrix for <span className="text-white font-semibold">atomicuilibrary</span> releases across major frameworks and runtimes.
        </p>
        <div className="overflow-x-auto rounded-xl border border-zinc-800">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="bg-zinc-900/80 border-b border-zinc-800">
                <th className="px-5 py-3 text-xs font-bold tracking-widest text-zinc-400 uppercase">Library Version</th>
                <th className="px-5 py-3 text-xs font-bold tracking-widest text-zinc-400 uppercase">Status</th>
                <th className="px-5 py-3 text-xs font-bold tracking-widest text-zinc-400 uppercase">Node.js</th>
                <th className="px-5 py-3 text-xs font-bold tracking-widest text-zinc-400 uppercase">React</th>
                <th className="px-5 py-3 text-xs font-bold tracking-widest text-zinc-400 uppercase">Angular</th>
                <th className="px-5 py-3 text-xs font-bold tracking-widest text-zinc-400 uppercase">Vue</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60">
              <tr className="bg-zinc-900/30 hover:bg-zinc-900/60 transition-colors">
                <td className="px-5 py-4 font-mono font-bold text-green-400">
                  v0.0.x
                  <span className="ml-2 text-[10px] bg-green-500/10 border border-green-500/20 text-green-400 px-1.5 py-0.5 rounded-full font-sans">Latest</span>
                </td>
                <td className="px-5 py-4">
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-green-400 bg-green-500/10 border border-green-500/20 px-2.5 py-1 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse inline-block" />
                    Active
                  </span>
                </td>
                <td className="px-5 py-4 text-zinc-300">16+</td>
                <td className="px-5 py-4 text-zinc-300">17, 18, 19</td>
                <td className="px-5 py-4 text-zinc-300">14, 15, 16, 17</td>
                <td className="px-5 py-4 text-zinc-300">3.x</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-zinc-500 flex items-center gap-1.5">
          <ui-icon name="info" size="13" />
          Stencil-based Web Components are framework-agnostic and also work with Vanilla JS / HTML without any framework.
        </p>
      </section>

      {/* Step 1: Install Package */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 font-bold text-sm">
            1
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-white">Install Dependency</h2>
        </div>
        <p className="text-gray-400">
          Install the core package from your terminal. We support npm, yarn, or pnpm out of the box.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* NPM */}
          <div className="bg-zinc-900/60 backdrop-blur-md rounded-xl border border-zinc-800 p-5 flex flex-col justify-between hover:border-zinc-700 transition-all">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest">NPM</span>
              <ui-button 
                variant="ghost" 
                size="sm" 
                icon={copiedText === 'npm' ? 'check' : 'copy'} 
                icon-only 
                onClick={() => copyToClipboard(snippets.npm, 'npm')}
              />
            </div>
            <code className="text-sm font-mono text-green-400 bg-black/40 p-3 rounded-lg border border-black/20 block select-all">
              {snippets.npm}
            </code>
          </div>

          {/* YARN */}
          <div className="bg-zinc-900/60 backdrop-blur-md rounded-xl border border-zinc-800 p-5 flex flex-col justify-between hover:border-zinc-700 transition-all">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest">YARN</span>
              <ui-button 
                variant="ghost" 
                size="sm" 
                icon={copiedText === 'yarn' ? 'check' : 'copy'} 
                icon-only 
                onClick={() => copyToClipboard(snippets.yarn, 'yarn')}
              />
            </div>
            <code className="text-sm font-mono text-green-400 bg-black/40 p-3 rounded-lg border border-black/20 block select-all">
              {snippets.yarn}
            </code>
          </div>

          {/* PNPM */}
          <div className="bg-zinc-900/60 backdrop-blur-md rounded-xl border border-zinc-800 p-5 flex flex-col justify-between hover:border-zinc-700 transition-all">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest">PNPM</span>
              <ui-button 
                variant="ghost" 
                size="sm" 
                icon={copiedText === 'pnpm' ? 'check' : 'copy'} 
                icon-only 
                onClick={() => copyToClipboard(snippets.pnpm, 'pnpm')}
              />
            </div>
            <code className="text-sm font-mono text-green-400 bg-black/40 p-3 rounded-lg border border-black/20 block select-all">
              {snippets.pnpm}
            </code>
          </div>
        </div>
      </section>

      {/* Step 2: Define Custom Elements */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 font-bold text-sm">
            2
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-white">Initialize Custom Elements</h2>
        </div>
        <p className="text-gray-400">
          In your main entrypoint file (like <code className="text-zinc-300 font-semibold bg-zinc-800/40 px-1.5 py-0.5 rounded">main.tsx</code> or <code className="text-zinc-300 font-semibold bg-zinc-800/40 px-1.5 py-0.5 rounded">index.js</code>), import the custom elements loader and register the component custom-elements globally.
        </p>

        <div className="relative group">
          <div className="absolute top-4 right-4 z-20">
            <ui-button 
              variant="outline" 
              size="sm" 
              icon={copiedText === 'mainImport' ? 'check' : 'copy'}
              onClick={() => copyToClipboard(snippets.mainImport, 'mainImport')}
            >
              {copiedText === 'mainImport' ? 'Copied' : 'Copy'}
            </ui-button>
          </div>
          <pre className="overflow-x-auto text-sm font-mono text-zinc-300 bg-black/60 border border-zinc-800 rounded-xl p-6 shadow-2xl relative">
            <div className="absolute top-0 left-0 bg-zinc-800/80 border-r border-b border-zinc-800 text-[10px] uppercase text-zinc-500 font-bold px-3 py-1 rounded-tl-xl rounded-br">
              JavaScript / TypeScript
            </div>
            <code className="block pt-4">{snippets.mainImport}</code>
          </pre>
        </div>
      </section>

      {/* Step 3: Register Icon Library */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 font-bold text-sm">
            3
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-white">Configure Icon Library Resolver</h2>
        </div>
        <p className="text-gray-400">
          Register standard Lucide SVG resolvers or custom local directories so the <code className="text-zinc-300 font-semibold bg-zinc-800/40 px-1.5 py-0.5 rounded">&lt;ui-icon&gt;</code> component downloads and renders dynamic SVG vectors instantly.
        </p>

        <div className="relative group">
          <div className="absolute top-4 right-4 z-20">
            <ui-button 
              variant="outline" 
              size="sm" 
              icon={copiedText === 'icons' ? 'check' : 'copy'}
              onClick={() => copyToClipboard(snippets.icons, 'icons')}
            >
              {copiedText === 'icons' ? 'Copied' : 'Copy'}
            </ui-button>
          </div>
          <pre className="overflow-x-auto text-sm font-mono text-zinc-300 bg-black/60 border border-zinc-800 rounded-xl p-6 shadow-2xl relative">
            <div className="absolute top-0 left-0 bg-zinc-800/80 border-r border-b border-zinc-800 text-[10px] uppercase text-zinc-500 font-bold px-3 py-1 rounded-tl-xl rounded-br">
              Global Script / main.tsx
            </div>
            <code className="block pt-4">{snippets.icons}</code>
          </pre>
        </div>
      </section>

      {/* Step 4: Styling & Custom CSS Variable tokens */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 font-bold text-sm">
            4
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-white">Theme & Global CSS Tokens</h2>
        </div>
        <p className="text-gray-400">
          Atom UI components are built completely with standard CSS custom properties. Customize the global color system, typography, shadows, and spacing parameters effortlessly.
        </p>

        <div className="relative group">
          <div className="absolute top-4 right-4 z-20">
            <ui-button 
              variant="outline" 
              size="sm" 
              icon={copiedText === 'tailwind' ? 'check' : 'copy'}
              onClick={() => copyToClipboard(snippets.tailwind, 'tailwind')}
            >
              {copiedText === 'tailwind' ? 'Copied' : 'Copy'}
            </ui-button>
          </div>
          <pre className="overflow-x-auto text-sm font-mono text-zinc-300 bg-black/60 border border-zinc-800 rounded-xl p-6 shadow-2xl relative">
            <div className="absolute top-0 left-0 bg-zinc-800/80 border-r border-b border-zinc-800 text-[10px] uppercase text-zinc-500 font-bold px-3 py-1 rounded-tl-xl rounded-br">
              index.css
            </div>
            <code className="block pt-4">{snippets.tailwind}</code>
          </pre>
        </div>
      </section>

      {/* Usage Example */}
      <hr className="border-[#222]" />

      <section className="space-y-6">
        <h3 className="text-3xl font-extrabold tracking-tight text-white">Full Usage Example</h3>
        <p className="text-gray-400">
          Use the components directly inside your React components, JSX layouts, or vanilla template scripts. Let the shadow DOM enforce 100% style isolation automatically.
        </p>

        <div className="relative group">
          <div className="absolute top-4 right-4 z-20">
            <ui-button 
              variant="outline" 
              size="sm" 
              icon={copiedText === 'example' ? 'check' : 'copy'}
              onClick={() => copyToClipboard(snippets.example, 'example')}
            >
              {copiedText === 'example' ? 'Copied' : 'Copy'}
            </ui-button>
          </div>
          <pre className="overflow-x-auto text-sm font-mono text-zinc-300 bg-black/60 border border-zinc-800 rounded-xl p-6 shadow-2xl relative">
            <div className="absolute top-0 left-0 bg-zinc-800/80 border-r border-b border-zinc-800 text-[10px] uppercase text-zinc-500 font-bold px-3 py-1 rounded-tl-xl rounded-br">
              React Component (JSX)
            </div>
            <code className="block pt-4">{snippets.example}</code>
          </pre>
        </div>
      </section>

      {/* Older Versions */}
      <section className="bg-zinc-900/40 border border-zinc-800 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-zinc-800/80 rounded-xl border border-zinc-700 shrink-0">
            <ui-icon name="history" size="22" class="text-zinc-300" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-bold text-white">Looking for an older version?</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Browse all published releases of <span className="text-white font-semibold">atomicuilibrary</span> on the npm registry, including changelogs and deprecation notices.
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-3 shrink-0">
          <a
            href="https://www.npmjs.com/package/atomicuilibrary?activeTab=versions"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 hover:border-zinc-600 rounded-lg transition-all"
          >
            <ui-icon name="package" size="15" />
            All npm versions
            <ui-icon name="external-link" size="13" class="text-zinc-400" />
          </a>
          <a
            href="https://github.com/search?q=atomicuilibrary&type=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-zinc-300 hover:text-white bg-transparent hover:bg-zinc-800/60 border border-zinc-700 rounded-lg transition-all"
          >
            <ui-icon name="github" size="15" />
            GitHub Releases
            <ui-icon name="external-link" size="13" class="text-zinc-500" />
          </a>
        </div>
      </section>

      {/* Pro Tips Infobox */}
      <section className="bg-green-500/5 border border-green-500/20 p-8 rounded-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[150px] h-[150px] bg-green-500/5 blur-[50px] rounded-full pointer-events-none" />
        <div className="flex items-start gap-4">
          <div className="p-3 bg-green-500/10 rounded-xl border border-green-500/20 text-green-400">
            <ui-icon name="lightbulb" size="24" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-green-400 mb-2">Pro Tip: React Custom Events</h3>
            <p className="text-gray-400 leading-relaxed">
              Standard Stencil Custom Events (like <code className="text-green-300 font-semibold bg-green-500/10 px-1 py-0.5 rounded">uiShow</code> or <code className="text-green-300 font-semibold bg-green-500/10 px-1 py-0.5 rounded">cardClose</code>) can be listened to using standard React refs and `addEventListener`, or using direct custom element JSX bindings if configured in your environment.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
