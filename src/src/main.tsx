import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

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
  console.log("Attempting to render App...");
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
  defineCustomElements(window, {
    resourcesUrl: '/exploration-project-tailwind/'
  }).catch((err: any) => console.error("Loader error:", err));
} catch (e) {
  console.error("Error during initialization:", e);
}
