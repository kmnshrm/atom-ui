import { useEffect, useRef } from 'react';
import './DemoRenderer.css';

interface DemoRendererProps {
  /** Raw HTML string from the demo JS files */
  html: string;
  /** Optional label for the section */
  label?: string;
}

/**
 * DemoRenderer — renders raw HTML from Stencil demo files faithfully.
 * Web components (ui-button, ui-avatar, etc.) work natively regardless
 * of how they're mounted into the DOM.
 */
export default function DemoRenderer({ html, label }: DemoRendererProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    // Inject shared dialog/aside utility globals that are normally defined
    // at the top of the original demo source files but not in extracted HTML blocks.
    if (!(window as any).openDialog) {
      (window as any).openDialog = (id: string) => {
        const el = document.getElementById(id) as any;
        if (!el) return;
        if (typeof el.show === 'function') el.show();
        else el.open = true;
      };
    }
    if (!(window as any).closeDialog) {
      (window as any).closeDialog = (id: string) => {
        const el = document.getElementById(id) as any;
        if (!el) return;
        if (typeof el.hide === 'function') el.hide();
        else el.open = false;
      };
    }

    // Insert HTML so <script> tags inside demos can run
    ref.current.innerHTML = html;

    // Trigger any inline script tags (not auto-executed via innerHTML)
    const scripts = ref.current.querySelectorAll('script');
    scripts.forEach(oldScript => {
      const scriptText = oldScript.textContent || '';

      // Validate inline scripts to prevent syntax errors from crashing the app
      if (!oldScript.hasAttribute('src') && scriptText.trim() !== '') {
        try {
          new Function(scriptText);
        } catch (e) {
          console.warn('Skipping broken inline demo script due to syntax error:', e);
          return;
        }
      }

      const newScript = document.createElement('script');
      Array.from(oldScript.attributes).forEach(attr =>
        newScript.setAttribute(attr.name, attr.value)
      );
      
      let finalScriptText = scriptText;
      if (finalScriptText.includes('section.')) {
        finalScriptText = `const section = document.currentScript.parentElement;\n` + finalScriptText;
      }
      
      newScript.textContent = finalScriptText;
      oldScript.parentNode?.replaceChild(newScript, oldScript);
    });
  }, [html]);

  return (
    <div className="demo-renderer">
      {label && <div className="demo-renderer-label">{label}</div>}
      <div ref={ref} className="demo-renderer-content" />
    </div>
  );
}
