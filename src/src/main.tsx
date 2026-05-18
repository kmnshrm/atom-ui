import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// @ts-ignore
import { defineCustomElements } from 'atomicuilibrary/loader'

// Import a mock or real registerIconLibrary if available, 
// but for now we'll use the window object as the library likely checks there or we can try to find the export.
// Based on the Angular project, it's a global registration.
try {
  (window as any).registerIconLibrary?.('lucide', {
    resolver: (name: string) => `https://cdn.jsdelivr.net/npm/lucide-static@0.400.0/icons/${name}.svg`
  });
} catch (e) {
  console.warn("Could not register icon library:", e);
}

try {
  const isProd = import.meta.env.PROD;
  const base = isProd ? '/atom-ui/' : '/';
  const resourcesUrl = `${window.location.origin}${base}exploration-project-tailwind/`;

  defineCustomElements(window, {
    resourcesUrl
  });
  
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
} catch (e) {
  console.error("Error during initialization:", e);
}
