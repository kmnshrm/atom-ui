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
    // Insert HTML so <script> tags inside demos can run
    ref.current.innerHTML = html;

    // Trigger any inline script tags (not auto-executed via innerHTML)
    const scripts = ref.current.querySelectorAll('script');
    scripts.forEach(oldScript => {
      const newScript = document.createElement('script');
      Array.from(oldScript.attributes).forEach(attr =>
        newScript.setAttribute(attr.name, attr.value)
      );
      newScript.textContent = oldScript.textContent;
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
