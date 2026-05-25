import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

import { initTreeGlobals } from './utils/treeGlobals'
import { initTransferListGlobals } from './utils/transferListGlobals'

initTreeGlobals();
initTransferListGlobals();

// Dynamically inject the Stencil component library as a standalone <script type="module">.
// This ensures all lazy-loaded chunks and the Stencil runtime share ONE module instance.
//
// Why not use `import { defineCustomElements } from 'atomicuilibrary/loader'`?
// Vite inlines the Stencil runtime (index-DUsoYu9r.js) into the main bundle at build
// time, while the lazy component chunks (served from /exploration-project-tailwind/)
// each do `import('./index-DUsoYu9r.js')` as a separate URL at runtime — producing
// two distinct `plt` objects. Components then register to runtime #2 but the custom
// element shell was created by runtime #1 → hydration never completes → components
// remain stuck with Stencil's `{visibility:hidden}` rule applied.
//
// The standalone exploration-project-tailwind.esm.js auto-initialises using
// import.meta.url so every chunk resolves its siblings from the same directory,
// guaranteeing a single shared runtime.
(function injectStencilLibrary() {
  const script = document.createElement('script');
  script.type = 'module';
  // import.meta.env.BASE_URL is replaced at build time ('/atom/' in production, '/' in dev)
  script.src = `${import.meta.env.BASE_URL}exploration-project-tailwind/exploration-project-tailwind.esm.js`;
  document.head.appendChild(script);
})();

try {
  (window as any).registerIconLibrary?.('lucide', {
    resolver: (name: string) => `https://cdn.jsdelivr.net/npm/lucide-static@0.400.0/icons/${name}.svg`
  });
} catch (e) {
  console.warn("Could not register icon library:", e);
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
