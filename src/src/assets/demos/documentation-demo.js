export function initDocumentationDemo() {
  const section = document.getElementById('documentation');
  if (!section) return;
  section.innerHTML = `
    <div style="padding: 40px; max-width: 800px; margin: 0 auto;">
      <h1 style="font-size: 2.5rem; margin-bottom: 24px;">🚀 Getting Started</h1>
      <p style="font-size: 1.2rem; color: #64748b; margin-bottom: 32px;">Learn how to integrate our premium component library into your projects.</p>
      
      <div style="background: #1e293b; padding: 24px; border-radius: 12px; margin-bottom: 32px;">
        <code style="color: #38bdf8; font-size: 1.1rem;">npm install @stencil/app-ui</code>
      </div>

      <h2 style="margin-bottom: 16px;">Core Concepts</h2>
      <ul style="line-height: 1.8; color: #334155; padding-left: 20px;">
        <li><strong>Web Components:</strong> Standards-based components that work anywhere (React, Vue, Angular, or Vanilla JS).</li>
        <li><strong>Design Tokens:</strong> Harmonious color, spacing, and typography variables managed via CSS Custom Properties.</li>
        <li><strong>Modern Tooling:</strong> Optimized for performance and developer experience using Stencil.js.</li>
      </ul>

      <h2 style="margin: 32px 0 16px;">Framework Integration</h2>
      <p style="margin-bottom: 16px;">Follow our specific guides to get the most out of our components in your favorite framework:</p>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
        <div style="padding: 16px; border: 1px solid #e2e8f0; border-radius: 8px;">
          <h4 style="margin-bottom: 8px;">React</h4>
          <p style="font-size: 14px; color: #64748b;">Full type support and event mapping for React 18+ applications.</p>
        </div>
        <div style="padding: 16px; border: 1px solid #e2e8f0; border-radius: 8px;">
          <h4 style="margin-bottom: 8px;">Angular</h4>
          <p style="font-size: 14px; color: #64748b;">Seamless integration with NgModule and standalone component patterns.</p>
        </div>
      </div>
    </div>
  `;
}
