import { getDemosForComponent, getEventsForComponent, getMethodsForComponent, getSlotsForComponent, getPartsForComponent } from '../../utils/componentMetadata';
import ComponentPlayground from '../../components/playground/ComponentPlayground';
import type { PropConfig, ExampleConfig, DocSection } from '../../components/playground/ComponentPlayground';

const ANIMATION_TYPES = [
  'spinner', 'dots', 'bar', 'pulse', 'ring', 'bounce', 'grid', 'wave',
  'dual-ring', 'heartbeat', 'clock', 'raining-letters', 'ripple', 'infinite',
  'wifi', 'rainbow', 'square-shuffle', 'dna-helix', 'atom-sphere', 'staircase',
  'radar', 'liquid-drop', 'neon-path', 'neuro-pulse', 'vortex-ring', 'cube-fold',
  'breathing', 'glitch-text', 'plc-module', 'm580-signal', 'circuit-board',
  'callout-rotate', 'infinite-roller', 'image',
];

const propConfigs: PropConfig[] = [
  {
    name: 'type',
    type: 'select',
    label: 'Animation Type',
    defaultValue: 'spinner',
    options: ANIMATION_TYPES,
    description: 'The animation style to render',
  },
  {
    name: 'size',
    type: 'select',
    label: 'Size',
    defaultValue: 'md',
    options: ['3xs', 'xs', 'small', 'md', 'large', 'xl', '3xl', 'jumbo'],
    description: 'Size preset for the loader',
  },
  {
    name: 'color',
    type: 'string',
    label: 'Color / Gradient',
    defaultValue: 'primary',
    description: 'Token (primary, success…), HEX (#ff0000), or CSS gradient',
  },
  {
    name: 'variant',
    type: 'select',
    label: 'Variant',
    defaultValue: 'standard',
    options: ['standard', 'glass', 'neon', 'minimal', 'linear-strip'],
    description: 'Visual style variant of the loader container',
  },
  {
    name: 'visible',
    type: 'boolean',
    label: 'Visible',
    defaultValue: true,
    description: 'Show or hide the loader',
  },
  {
    name: 'label',
    type: 'string',
    label: 'Label',
    defaultValue: '',
    description: 'Text shown below (or around) the animation',
  },
  {
    name: 'description',
    type: 'string',
    label: 'Description',
    defaultValue: '',
    description: 'Optional sub-text beneath the label',
  },
  {
    name: 'label-position',
    type: 'select',
    label: 'Label Position',
    defaultValue: 'bottom',
    options: ['bottom', 'top', 'left', 'right'],
    description: 'Where the label is rendered relative to the animation',
  },
  {
    name: 'overlay',
    type: 'boolean',
    label: 'Overlay',
    defaultValue: false,
    description: 'Renders a full-screen overlay behind the loader',
  },
  {
    name: 'enable-blur',
    type: 'boolean',
    label: 'Enable Blur',
    defaultValue: false,
    description: 'Applies a backdrop blur when overlay is active',
  },
  {
    name: 'trap-focus',
    type: 'boolean',
    label: 'Trap Focus',
    defaultValue: false,
    description: 'Traps keyboard focus inside the overlay (accessibility)',
  },
  {
    name: 'value',
    type: 'number',
    label: 'Progress Value (0-100)',
    defaultValue: 0,
    description: 'Determinate progress percentage (0 = indeterminate)',
  },
  {
    name: 'thickness',
    type: 'number',
    label: 'Thickness (px)',
    defaultValue: 3,
    description: 'Stroke/bar thickness in pixels',
  },
  {
    name: 'width',
    type: 'string',
    label: 'Width',
    defaultValue: '',
    description: 'CSS width for bar/linear-strip types (e.g. 300px)',
  },
  {
    name: 'predictive',
    type: 'boolean',
    label: 'Predictive Progress',
    defaultValue: false,
    description: 'Auto-crawls progress towards 95% for bar/linear types',
  },
  {
    name: 'aria-live',
    type: 'select',
    label: 'ARIA Live',
    defaultValue: 'polite',
    options: ['polite', 'assertive', 'off'],
    description: 'ARIA live region verbosity',
  },
  {
    name: 'overlay-background',
    type: 'string',
    label: 'Overlay Background',
    defaultValue: '',
    description: 'Custom CSS color or gradient for the overlay backdrop',
  },
  {
    name: 'image',
    type: 'string',
    label: 'Image URL',
    defaultValue: 'https://cdn-icons-png.flaticon.com/512/9333/9333991.png',
    description: 'Image URL when type="image"',
  },
  {
    name: 'rain-text',
    type: 'string',
    label: 'Rain Text',
    defaultValue: '',
    description: 'Character pool for raining-letters type (default: A–Z 0–9)',
  },
  {
    name: 'rain-columns',
    type: 'number',
    label: 'Rain Columns',
    defaultValue: 5,
    description: 'Number of falling columns for raining-letters type',
  },
];

const buildCode = (p: Record<string, any>) => {
  const attrs: string[] = [
    `type="${p.type}"`,
    `size="${p.size}"`,
    `color="${p.color}"`,
    `visible="${p.visible ?? true}"`,
  ];
  if (p.variant && p.variant !== 'standard') attrs.push(`variant="${p.variant}"`);
  if (p.label) {
    attrs.push(`label="${p.label}"`);
    if (p['label-position'] && p['label-position'] !== 'bottom') attrs.push(`label-position="${p['label-position']}"`);
  }
  if (p.description) attrs.push(`description="${p.description}"`);
  if (p.overlay) attrs.push('overlay="true"');
  if (p['enable-blur']) attrs.push('enable-blur="true"');
  if (p['trap-focus']) attrs.push('trap-focus="true"');
  if (p.value) attrs.push(`value="${p.value}"`);
  if (p.thickness && p.thickness !== 3) attrs.push(`thickness="${p.thickness}"`);
  if (p.width) attrs.push(`width="${p.width}"`);
  if (p.predictive) attrs.push('predictive="true"');
  if (p['aria-live'] && p['aria-live'] !== 'polite') attrs.push(`aria-live="${p['aria-live']}"`);
  if (p['overlay-background']) attrs.push(`overlay-background="${p['overlay-background']}"`);
  if (p.type === 'image' && p.image) attrs.push(`image="${p.image}"`);
  if (p.type === 'raining-letters') {
    if (p['rain-text']) attrs.push(`rain-text="${p['rain-text']}"`);
    if (p['rain-columns'] && p['rain-columns'] !== 5) attrs.push(`rain-columns="${p['rain-columns']}"`);
  }
  return `<ui-loader\n  ${attrs.join('\n  ')}\n></ui-loader>`;
};

const renderPreview = (p: Record<string, any>) => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '160px' }}>
    <ui-loader
      key={JSON.stringify(p)}
      type={p.type}
      size={p.size}
      color={p.color}
      visible={p.visible === false ? 'false' : undefined}
      variant={p.variant !== 'standard' ? p.variant : undefined}
      label={p.label || undefined}
      description={p.description || undefined}
      label-position={p['label-position'] !== 'bottom' ? p['label-position'] : undefined}
      overlay={p.overlay ? 'true' : undefined}
      enable-blur={p['enable-blur'] ? 'true' : undefined}
      trap-focus={p['trap-focus'] ? 'true' : undefined}
      value={p.value ? String(p.value) : undefined}
      thickness={p.thickness !== 3 ? String(p.thickness) : undefined}
      width={p.width || undefined}
      predictive={p.predictive ? 'true' : undefined}
      aria-live={p['aria-live'] !== 'polite' ? p['aria-live'] : undefined}
      overlay-background={p['overlay-background'] || undefined}
      image={p.type === 'image' && p.image ? p.image : undefined}
      rain-text={p.type === 'raining-letters' && p['rain-text'] ? p['rain-text'] : undefined}
      rain-columns={p.type === 'raining-letters' && p['rain-columns'] !== 5 ? String(p['rain-columns']) : undefined}
    />
  </div>
);

const docs: DocSection[] = [
  {
    title: 'Overview',
    content: `
      <p>The <code>ui-loader</code> component provides 34 high-fidelity loading animations for every use-case — from micro inline indicators to full-screen overlays. It supports determinate progress, predictive crawl behaviour, message rotation, and accessibility out-of-the-box.</p>

      <h3>Key Features</h3>
      <ul>
        <li><strong>34 animation types</strong> — spinner, dots, bar, heartbeat, DNA helix, neon-path, and more</li>
        <li><strong>8 size presets</strong> — from <code>3xs</code> (8px) to <code>jumbo</code> (full-screen)</li>
        <li><strong>Full color control</strong> — named tokens, HEX, and CSS gradients</li>
        <li><strong>Overlay mode</strong> — blocks interaction with optional backdrop blur</li>
        <li><strong>Predictive progress</strong> — auto-crawls the bar to 95% for unknown durations</li>
        <li><strong>Message rotation</strong> — set an array of messages via <code>.messages</code> property to keep users informed</li>
        <li><strong>Accessible</strong> — built-in ARIA live region support</li>
      </ul>

      <h3>Animation Types</h3>
      <p>Set the <code>type</code> attribute to any of the following values:</p>
      <ul>
        <li><code>spinner</code>, <code>dots</code>, <code>bar</code>, <code>pulse</code>, <code>ring</code>, <code>bounce</code>, <code>grid</code>, <code>wave</code></li>
        <li><code>dual-ring</code>, <code>heartbeat</code>, <code>clock</code>, <code>ripple</code>, <code>infinite</code>, <code>wifi</code>, <code>rainbow</code></li>
        <li><code>square-shuffle</code>, <code>dna-helix</code>, <code>atom-sphere</code>, <code>staircase</code>, <code>radar</code>, <code>liquid-drop</code></li>
        <li><code>neon-path</code>, <code>neuro-pulse</code>, <code>vortex-ring</code>, <code>cube-fold</code>, <code>breathing</code>, <code>glitch-text</code></li>
        <li><code>plc-module</code>, <code>m580-signal</code>, <code>circuit-board</code>, <code>callout-rotate</code>, <code>infinite-roller</code>, <code>raining-letters</code>, <code>image</code></li>
      </ul>

      <h3>Variant Styles</h3>
      <ul>
        <li><code>standard</code> — Default transparent background</li>
        <li><code>glass</code> — Frosted-glass card effect</li>
        <li><code>neon</code> — Glowing neon container</li>
        <li><code>minimal</code> — Animation only, no container</li>
        <li><code>linear-strip</code> — Thin top-bar progress (like YouTube/GitHub)</li>
      </ul>

      <h3>Overlay & Page Loading</h3>
      <p>Add <code>overlay="true"</code> to block the page. Combine with <code>enable-blur="true"</code> for a polished backdrop:</p>
      <pre><code>&lt;ui-loader type="spinner" overlay="true" enable-blur="true" label="Saving..."&gt;&lt;/ui-loader&gt;</code></pre>

      <h3>Message Rotation</h3>
      <p>Set the <code>.messages</code> property (JS array) and optional <code>.messageInterval</code> (ms) to cycle through status updates:</p>
      <pre><code>const loader = document.querySelector('ui-loader');
loader.messages = ['Connecting...', 'Verifying...', 'Almost there...'];
loader.messageInterval = 2500;</code></pre>

      <h3>Determinate Progress</h3>
      <p>Set the <code>value</code> attribute (0–100) to show a specific percentage. Works best with <code>type="bar"</code>:</p>
      <pre><code>&lt;ui-loader type="bar" value="72" label="Uploading files..."&gt;&lt;/ui-loader&gt;</code></pre>

      <h3>Accessibility</h3>
      <p>The component contains an ARIA live region by default. Control announcement verbosity with the <code>aria-live</code> attribute (<code>polite</code>, <code>assertive</code>, or <code>off</code>). Use <code>trap-focus="true"</code> with overlay loaders to prevent keyboard escape.</p>
    `,
  },
  {
    title: 'Props Reference',
    content: `
      <table style="width:100%; border-collapse: collapse; font-size: 13px;">
        <thead>
          <tr style="border-bottom: 2px solid #e2e8f0;">
            <th style="text-align:left; padding: 8px 12px;">Prop</th>
            <th style="text-align:left; padding: 8px 12px;">Type</th>
            <th style="text-align:left; padding: 8px 12px;">Default</th>
            <th style="text-align:left; padding: 8px 12px;">Description</th>
          </tr>
        </thead>
        <tbody>
          <tr style="border-bottom:1px solid #f1f5f9;"><td style="padding:8px 12px;"><code>type</code></td><td style="padding:8px 12px;">string</td><td style="padding:8px 12px;"><code>spinner</code></td><td style="padding:8px 12px;">Animation style (34 options)</td></tr>
          <tr style="border-bottom:1px solid #f1f5f9;"><td style="padding:8px 12px;"><code>size</code></td><td style="padding:8px 12px;">string</td><td style="padding:8px 12px;"><code>md</code></td><td style="padding:8px 12px;">Size preset: 3xs · xs · small · md · large · xl · 3xl · jumbo</td></tr>
          <tr style="border-bottom:1px solid #f1f5f9;"><td style="padding:8px 12px;"><code>color</code></td><td style="padding:8px 12px;">string</td><td style="padding:8px 12px;"><code>primary</code></td><td style="padding:8px 12px;">Token, HEX, or CSS gradient</td></tr>
          <tr style="border-bottom:1px solid #f1f5f9;"><td style="padding:8px 12px;"><code>variant</code></td><td style="padding:8px 12px;">string</td><td style="padding:8px 12px;"><code>standard</code></td><td style="padding:8px 12px;">standard · glass · neon · minimal · linear-strip</td></tr>
          <tr style="border-bottom:1px solid #f1f5f9;"><td style="padding:8px 12px;"><code>label</code></td><td style="padding:8px 12px;">string</td><td style="padding:8px 12px;">—</td><td style="padding:8px 12px;">Primary text shown with the animation</td></tr>
          <tr style="border-bottom:1px solid #f1f5f9;"><td style="padding:8px 12px;"><code>description</code></td><td style="padding:8px 12px;">string</td><td style="padding:8px 12px;">—</td><td style="padding:8px 12px;">Secondary sub-text beneath label</td></tr>
          <tr style="border-bottom:1px solid #f1f5f9;"><td style="padding:8px 12px;"><code>label-position</code></td><td style="padding:8px 12px;">string</td><td style="padding:8px 12px;"><code>bottom</code></td><td style="padding:8px 12px;">top · bottom · left · right</td></tr>
          <tr style="border-bottom:1px solid #f1f5f9;"><td style="padding:8px 12px;"><code>overlay</code></td><td style="padding:8px 12px;">boolean</td><td style="padding:8px 12px;"><code>false</code></td><td style="padding:8px 12px;">Full-screen overlay backdrop</td></tr>
          <tr style="border-bottom:1px solid #f1f5f9;"><td style="padding:8px 12px;"><code>enable-blur</code></td><td style="padding:8px 12px;">boolean</td><td style="padding:8px 12px;"><code>false</code></td><td style="padding:8px 12px;">Backdrop blur when overlay is active</td></tr>
          <tr style="border-bottom:1px solid #f1f5f9;"><td style="padding:8px 12px;"><code>trap-focus</code></td><td style="padding:8px 12px;">boolean</td><td style="padding:8px 12px;"><code>false</code></td><td style="padding:8px 12px;">Traps keyboard focus inside overlay</td></tr>
          <tr style="border-bottom:1px solid #f1f5f9;"><td style="padding:8px 12px;"><code>value</code></td><td style="padding:8px 12px;">number</td><td style="padding:8px 12px;">—</td><td style="padding:8px 12px;">0–100 for determinate progress state</td></tr>
          <tr style="border-bottom:1px solid #f1f5f9;"><td style="padding:8px 12px;"><code>predictive</code></td><td style="padding:8px 12px;">boolean</td><td style="padding:8px 12px;"><code>false</code></td><td style="padding:8px 12px;">Auto-crawls bar to 95% for unknown durations</td></tr>
          <tr style="border-bottom:1px solid #f1f5f9;"><td style="padding:8px 12px;"><code>thickness</code></td><td style="padding:8px 12px;">number</td><td style="padding:8px 12px;"><code>3</code></td><td style="padding:8px 12px;">Stroke thickness in pixels</td></tr>
          <tr style="border-bottom:1px solid #f1f5f9;"><td style="padding:8px 12px;"><code>visible</code></td><td style="padding:8px 12px;">boolean</td><td style="padding:8px 12px;"><code>true</code></td><td style="padding:8px 12px;">Show or hide the loader</td></tr>
          <tr style="border-bottom:1px solid #f1f5f9;"><td style="padding:8px 12px;"><code>overlay-background</code></td><td style="padding:8px 12px;">string</td><td style="padding:8px 12px;">—</td><td style="padding:8px 12px;">Custom CSS color/gradient for overlay backdrop</td></tr>
          <tr style="border-bottom:1px solid #f1f5f9;"><td style="padding:8px 12px;"><code>aria-live</code></td><td style="padding:8px 12px;">string</td><td style="padding:8px 12px;"><code>polite</code></td><td style="padding:8px 12px;">ARIA live region: polite · assertive · off</td></tr>
          <tr style="border-bottom:1px solid #f1f5f9;"><td style="padding:8px 12px;"><code>rain-text</code></td><td style="padding:8px 12px;">string</td><td style="padding:8px 12px;">A-Z 0-9</td><td style="padding:8px 12px;">Character pool for raining-letters type</td></tr>
          <tr style="border-bottom:1px solid #f1f5f9;"><td style="padding:8px 12px;"><code>rain-columns</code></td><td style="padding:8px 12px;">number</td><td style="padding:8px 12px;"><code>5</code></td><td style="padding:8px 12px;">Number of columns for raining-letters type</td></tr>
          <tr><td style="padding:8px 12px;"><code>image</code></td><td style="padding:8px 12px;">string</td><td style="padding:8px 12px;">—</td><td style="padding:8px 12px;">Image URL when type="image"</td></tr>
        </tbody>
      </table>
    `,
  },
];

const examples: ExampleConfig[] = [
  {
    title: 'Common Types',
    description: 'The most frequently used animation types side by side',
    code: `<ui-loader type="spinner" color="primary" size="xl"></ui-loader>
<ui-loader type="dots"    color="success" size="xl"></ui-loader>
<ui-loader type="bar"     color="warning" size="xl"></ui-loader>
<ui-loader type="pulse"   color="danger"  size="xl"></ui-loader>
<ui-loader type="ring"    color="info"    size="xl"></ui-loader>
<ui-loader type="bounce"  color="primary" size="xl"></ui-loader>`,
    render: () => (
      <div style={{ display: 'flex', gap: '2.5rem', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', padding: '2rem' }}>
        {(['spinner', 'dots', 'bar', 'pulse', 'ring', 'bounce'] as const).map((type, i) => {
          const colors = ['primary', 'success', 'warning', 'danger', 'info', 'primary'];
          return (
            <div key={type} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
              <ui-loader type={type} color={colors[i]} size="xl" />
              <code style={{ fontSize: '11px', color: '#64748b' }}>{type}</code>
            </div>
          );
        })}
      </div>
    ),
  },
  {
    title: 'All Size Presets',
    description: 'From 3xs micro-indicators to jumbo full-screen loaders',
    code: `<ui-loader type="spinner" size="3xs" color="primary"></ui-loader>
<ui-loader type="spinner" size="xs"  color="primary"></ui-loader>
<ui-loader type="spinner" size="small" color="primary"></ui-loader>
<ui-loader type="spinner" size="md"  color="primary"></ui-loader>
<ui-loader type="spinner" size="large" color="primary"></ui-loader>
<ui-loader type="spinner" size="xl"  color="primary"></ui-loader>
<ui-loader type="spinner" size="3xl" color="primary"></ui-loader>`,
    render: () => (
      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }}>
        {['3xs', 'xs', 'small', 'md', 'large', 'xl', '3xl'].map(s => (
          <div key={s} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
            <ui-loader type="spinner" size={s} color="primary" />
            <code style={{ fontSize: '10px', color: '#64748b', fontWeight: 700 }}>{s.toUpperCase()}</code>
          </div>
        ))}
      </div>
    ),
  },
  {
    title: 'Color Variants',
    description: 'All named color tokens — HEX and gradients also accepted',
    code: `<ui-loader type="spinner" size="xl" color="primary"></ui-loader>
<ui-loader type="spinner" size="xl" color="success"></ui-loader>
<ui-loader type="spinner" size="xl" color="warning"></ui-loader>
<ui-loader type="spinner" size="xl" color="danger"></ui-loader>
<ui-loader type="spinner" size="xl" color="info"></ui-loader>
<ui-loader type="dots"    size="xl" color="#ff00ff"></ui-loader>
<ui-loader type="dots"    size="xl" color="linear-gradient(90deg,#4facfe,#00f2fe)"></ui-loader>`,
    render: () => (
      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', padding: '1.5rem' }}>
        {[
          { type: 'spinner', color: 'primary', label: 'primary' },
          { type: 'spinner', color: 'success', label: 'success' },
          { type: 'spinner', color: 'warning', label: 'warning' },
          { type: 'spinner', color: 'danger',  label: 'danger' },
          { type: 'spinner', color: 'info',    label: 'info' },
          { type: 'dots',    color: '#ff00ff', label: '#ff00ff' },
          { type: 'dots',    color: 'linear-gradient(90deg,#4facfe,#00f2fe)', label: 'gradient' },
        ].map(({ type, color, label }) => (
          <div key={label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
            <ui-loader type={type} size="xl" color={color} />
            <code style={{ fontSize: '10px', color: '#64748b' }}>{label}</code>
          </div>
        ))}
      </div>
    ),
  },
  {
    title: 'With Label & Description',
    description: 'Labels can be positioned on any side of the animation',
    code: `<ui-loader type="spinner" color="primary" size="xl"
  label="Loading dashboard"
  description="Fetching your data...">
</ui-loader>

<ui-loader type="dots" color="success" size="xl"
  label="Saving changes"
  label-position="right">
</ui-loader>`,
    render: () => (
      <div style={{ display: 'flex', gap: '3rem', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', padding: '2rem' }}>
        <ui-loader type="spinner" color="primary" size="xl" label="Loading dashboard" description="Fetching your data..." />
        <ui-loader type="dots" color="success" size="xl" label="Saving changes" label-position="right" />
        <ui-loader type="pulse" color="warning" size="xl" label="Please wait" label-position="top" />
      </div>
    ),
  },
  {
    title: 'Variant Styles',
    description: 'glass, neon, and minimal visual container variants',
    code: `<ui-loader type="spinner" size="xl" color="primary" variant="glass"   label="Glass"></ui-loader>
<ui-loader type="spinner" size="xl" color="primary" variant="neon"    label="Neon"></ui-loader>
<ui-loader type="spinner" size="xl" color="primary" variant="minimal" label="Minimal"></ui-loader>`,
    render: () => (
      <div style={{ display: 'flex', gap: '3rem', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', padding: '2rem', background: '#0f172a', borderRadius: '12px' }}>
        {(['glass', 'neon', 'minimal'] as const).map(v => (
          <div key={v} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
            <ui-loader type="spinner" size="xl" color="primary" variant={v} />
            <code style={{ fontSize: '11px', color: '#94a3b8' }}>{v}</code>
          </div>
        ))}
      </div>
    ),
  },
  {
    title: 'Predictive Progress Bar',
    description: 'Auto-crawls to 95% — ideal when you cannot know the exact duration',
    code: `<ui-loader
  type="bar"
  predictive="true"
  label="Uploading files..."
  thickness="6"
  color="#10b981"
  style="width: 300px;"
></ui-loader>`,
    render: () => (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
        <ui-loader type="bar" predictive="true" label="Uploading files..." thickness="6" color="#10b981" style={{ width: '300px' }} />
      </div>
    ),
  },
  {
    title: 'Linear Strip (Top-bar)',
    description: 'YouTube/GitHub-style page navigation indicator',
    code: `<div style="position: relative; height: 80px; border: 1px dashed #cbd5e1; border-radius: 8px;">
  <ui-loader variant="linear-strip" status="loading" predictive="true"
    style="position: absolute; top: 0; left: 0; width: 100%;">
  </ui-loader>
</div>`,
    render: () => (
      <div style={{ position: 'relative', height: '80px', border: '1px dashed #cbd5e1', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', width: '100%' }}>
        <span style={{ fontSize: '12px', color: '#94a3b8' }}>Page content area</span>
        <ui-loader variant="linear-strip" status="loading" predictive="true" style={{ position: 'absolute', top: 0, left: 0, width: '100%' }} />
      </div>
    ),
  },
  {
    title: 'Industrial / Specialized Types',
    description: 'PLC module, M580 signal, circuit board — for industrial dashboards',
    code: `<ui-loader type="plc-module"    size="xl" color="primary"></ui-loader>
<ui-loader type="m580-signal"   size="xl" color="success"></ui-loader>
<ui-loader type="circuit-board" size="xl" color="info"></ui-loader>
<ui-loader type="dna-helix"     size="xl" color="warning"></ui-loader>`,
    render: () => (
      <div style={{ display: 'flex', gap: '2.5rem', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', padding: '2rem', background: '#0f172a', borderRadius: '12px' }}>
        {[
          { type: 'plc-module', color: 'primary' },
          { type: 'm580-signal', color: 'success' },
          { type: 'circuit-board', color: 'info' },
          { type: 'dna-helix', color: 'warning' },
        ].map(({ type, color }) => (
          <div key={type} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
            <ui-loader type={type} size="xl" color={color} />
            <code style={{ fontSize: '10px', color: '#94a3b8' }}>{type}</code>
          </div>
        ))}
      </div>
    ),
  },
  {
    title: 'Raining Letters',
    description: 'Matrix-style animation — customise the character pool and column count',
    code: `<ui-loader type="raining-letters" size="xl" color="primary"></ui-loader>
<ui-loader type="raining-letters" size="xl" color="#10b981" rain-text="01"></ui-loader>
<ui-loader type="raining-letters" size="xl" color="#8b5cf6" rain-text="★♦♣♠♥" rain-columns="5"></ui-loader>`,
    render: () => (
      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', padding: '2rem', background: '#0f172a', borderRadius: '12px' }}>
        {[
          { color: 'primary',  rainText: undefined,   label: 'Default (A–Z 0–9)' },
          { color: '#10b981',  rainText: '01',        label: 'Binary Matrix' },
          { color: '#8b5cf6',  rainText: '★♦♣♠♥',   label: 'Symbols' },
        ].map(({ color, rainText, label }) => (
          <div key={label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
            <ui-loader type="raining-letters" size="xl" color={color} rain-text={rainText} />
            <code style={{ fontSize: '10px', color: '#94a3b8' }}>{label}</code>
          </div>
        ))}
      </div>
    ),
  },
];

export default function LoaderPage() {
  return (
    <ComponentPlayground
      componentName="Loader"
      tagName="ui-loader"
      description="34 high-fidelity loading animations — from inline spinners to full-screen overlays with message rotation and predictive progress."
      props={propConfigs}
      renderPreview={renderPreview}
      buildCode={buildCode}
      docs={docs}
      examples={examples}
      demoSections={getDemosForComponent('loader')}
      events={getEventsForComponent('ui-loader')}
      methods={getMethodsForComponent('ui-loader')}
      slots={getSlotsForComponent('ui-loader')}
      parts={getPartsForComponent('ui-loader')}
    />
  );
}
