import { getDemosForComponent, getEventsForComponent, getMethodsForComponent, getSlotsForComponent, getPartsForComponent } from '../../utils/componentMetadata';
import ComponentPlayground from '../../components/playground/ComponentPlayground';
import type { PropConfig, ExampleConfig, DocSection } from '../../components/playground/ComponentPlayground';

const propConfigs: PropConfig[] = [
  // Content
  { name: 'value', type: 'string', label: 'Value (text/number)', defaultValue: 'New', description: 'Badge text or number. Use with max prop for overflow.' },
  { name: 'max', type: 'number', label: 'Max (overflow at)', defaultValue: 99, description: 'Shows "99+" when value exceeds this' },
  { name: 'show-zero', type: 'boolean', label: 'Show Zero', defaultValue: false, description: 'Shows "0" instead of hiding the badge' },
  { name: 'icon', type: 'string', label: 'Icon', defaultValue: '', description: 'Lucide icon name inside the badge' },
  { name: 'icon-position', type: 'select', label: 'Icon Position', defaultValue: 'left', options: ['left', 'right'], description: 'Icon placement relative to text' },
  // Appearance
  { name: 'color', type: 'select', label: 'Color', defaultValue: 'danger', options: ['primary', 'secondary', 'success', 'warning', 'danger', 'info', 'none'], description: 'Badge accent color' },
  { name: 'variant', type: 'select', label: 'Variant', defaultValue: 'standard', options: ['standard', 'outlined', 'ghost'], description: 'Visual style' },
  { name: 'shape', type: 'select', label: 'Shape', defaultValue: 'default', options: ['default', 'circle', 'square'], description: 'Badge shape' },
  { name: 'size', type: 'select', label: 'Size', defaultValue: 'md', options: ['sm', 'md', 'lg'], description: 'Badge size' },
  // Custom Colors
  { name: 'custom-color', type: 'color', label: 'Custom BG Color', defaultValue: '', description: 'Override background with any CSS color' },
  { name: 'custom-text-color', type: 'color', label: 'Custom Text Color', defaultValue: '', description: 'Override text color' },
  { name: 'gradient', type: 'string', label: 'Gradient', defaultValue: '', description: 'CSS gradient string (e.g., linear-gradient(135deg, #f093fb, #f5576c))' },
  // Mode
  { name: 'dot', type: 'boolean', label: 'Dot Mode', defaultValue: false, description: 'Shows a small dot only (no text)' },
  { name: 'inline', type: 'boolean', label: 'Inline', defaultValue: false, description: 'Renders inline instead of absolute positioned' },
  // Positioning (when wrapping another element)
  { name: 'position', type: 'select', label: 'Position (overlay)', defaultValue: 'top-right', options: ['top-right', 'top-left', 'bottom-right', 'bottom-left'], description: 'Position when overlaying another element' },
  { name: 'offset-x', type: 'number', label: 'Offset X (px)', defaultValue: 0, description: 'Horizontal offset from the position' },
  { name: 'offset-y', type: 'number', label: 'Offset Y (px)', defaultValue: 0, description: 'Vertical offset from the position' },
  // Effects
  { name: 'animation', type: 'select', label: 'Animation', defaultValue: 'none', options: ['none', 'pulse', 'bounce', 'ping'], description: 'Badge animation effect' },
  { name: 'glow', type: 'boolean', label: 'Glow Effect', defaultValue: false, description: 'Glowing shadow around the badge' },
  // Interaction
  { name: 'interactive', type: 'boolean', label: 'Interactive', defaultValue: false, description: 'Makes the badge clickable with hover effects' },
  { name: 'closeable', type: 'boolean', label: 'Closeable', defaultValue: false, description: 'Shows an × close button' },
  { name: 'rtl', type: 'boolean', label: 'RTL', defaultValue: false, description: 'Right-to-left layout' },
];

const buildCode = (p: Record<string, any>) => {
  const attrs: string[] = [`value="${p.value}"`, `color="${p.color}"`, `size="${p.size}"`];
  if (p.max !== 99) attrs.push(`max="${p.max}"`);
  if (p['show-zero']) attrs.push('show-zero');
  if (p.icon) attrs.push(`icon="${p.icon}"`);
  if (p['icon-position'] !== 'left') attrs.push(`icon-position="${p['icon-position']}"`);
  if (p.variant !== 'standard') attrs.push(`variant="${p.variant}"`);
  if (p.shape !== 'default') attrs.push(`shape="${p.shape}"`);
  if (p['custom-color']) attrs.push(`custom-color="${p['custom-color']}"`);
  if (p['custom-text-color']) attrs.push(`custom-text-color="${p['custom-text-color']}"`);
  if (p.gradient) attrs.push(`gradient="${p.gradient}"`);
  if (p.dot) attrs.push('dot');
  if (p.inline) attrs.push('inline');
  if (p.position !== 'top-right') attrs.push(`position="${p.position}"`);
  if (p['offset-x']) attrs.push(`offset-x="${p['offset-x']}"`);
  if (p['offset-y']) attrs.push(`offset-y="${p['offset-y']}"`);
  if (p.animation !== 'none') attrs.push(`animation="${p.animation}"`);
  if (p.glow) attrs.push('glow');
  if (p.interactive) attrs.push('interactive');
  if (p.closeable) attrs.push('closeable');
  if (p.rtl) attrs.push('rtl');
  return `<ui-badge ${attrs.join('\n  ')}></ui-badge>`;
};

const renderPreview = (p: Record<string, any>) => (
  <ui-badge
    key={JSON.stringify(p)}
    value={p.value}
    max={p.max}
    show-zero={p['show-zero'] || undefined}
    color={p.color}
    size={p.size}
    variant={p.variant}
    shape={p.shape}
    icon={p.icon || undefined}
    icon-position={p['icon-position']}
    custom-color={p['custom-color'] || undefined}
    custom-text-color={p['custom-text-color'] || undefined}
    gradient={p.gradient || undefined}
    dot={p.dot || undefined}
    inline={p.inline || undefined}
    position={p.position}
    offset-x={p['offset-x'] || undefined}
    offset-y={p['offset-y'] || undefined}
    animation={p.animation !== 'none' ? p.animation : undefined}
    glow={p.glow || undefined}
    interactive={p.interactive || undefined}
    closeable={p.closeable || undefined}
    rtl={p.rtl || undefined}
  />
);

const docs: DocSection[] = [
  {
    title: 'Overview',
    content: `
      <p>The <code>ui-badge</code> component is a versatile label for statuses, counts, tags, and notifications. It supports 22 props.</p>
      <h3>Overlay Mode</h3>
      <p>When used as a child of a positioned element, the badge can be positioned absolutely using the <code>position</code>, <code>offset-x</code>, and <code>offset-y</code> props.</p>
      <h3>Max Value</h3>
      <p>Set <code>max</code> (default: 99) to automatically display "99+" when the numeric <code>value</code> exceeds the limit.</p>
      <h3>Events</h3>
      <ul>
        <li><code>badgeClose</code> — Fired when the close button is clicked (requires <code>closeable</code>)</li>
        <li><code>badgeClick</code> — Fired when clicked (requires <code>interactive</code>)</li>
      </ul>
    `,
  },
];

const examples: ExampleConfig[] = [
  {
    title: 'All Color Variants',
    code: `<ui-badge value="Primary" color="primary"></ui-badge>
<ui-badge value="Success" color="success"></ui-badge>
<ui-badge value="Warning" color="warning"></ui-badge>
<ui-badge value="Danger" color="danger"></ui-badge>
<ui-badge value="Info" color="info"></ui-badge>`,
    render: () => (
      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        {['primary', 'success', 'warning', 'danger', 'info'].map(c => (
          <ui-badge key={c} value={c.charAt(0).toUpperCase() + c.slice(1)} color={c} />
        ))}
      </div>
    ),
  },
  {
    title: 'Variants',
    description: 'Standard, outlined, and ghost',
    code: `<ui-badge value="Standard" variant="standard" color="primary"></ui-badge>
<ui-badge value="Outlined" variant="outlined" color="primary"></ui-badge>
<ui-badge value="Ghost" variant="ghost" color="primary"></ui-badge>`,
    render: () => (
      <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
        {['standard', 'outlined', 'ghost'].map(v => (
          <ui-badge key={v} value={v.charAt(0).toUpperCase() + v.slice(1)} variant={v} color="primary" />
        ))}
      </div>
    ),
  },
  {
    title: 'With Icons',
    description: 'Badges with leading or trailing icons',
    code: `<ui-badge value="Active" icon="check-circle" color="success"></ui-badge>
<ui-badge value="Beta" icon="flask-conical" color="info" icon-position="right"></ui-badge>
<ui-badge value="Error" icon="x-circle" color="danger"></ui-badge>`,
    render: () => (
      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <ui-badge value="Active" icon="check-circle" color="success" />
        <ui-badge value="Beta" icon="flask-conical" color="info" icon-position="right" />
        <ui-badge value="Error" icon="x-circle" color="danger" />
      </div>
    ),
  },
  {
    title: 'Animated Badges',
    description: 'Pulse, bounce, and ping animations',
    code: `<ui-badge value="pulse" color="danger" animation="pulse"></ui-badge>
<ui-badge value="ping" color="success" animation="ping"></ui-badge>
<ui-badge dot color="warning" animation="pulse"></ui-badge>`,
    render: () => (
      <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', alignItems: 'center' }}>
        <ui-badge value="pulse" color="danger" animation="pulse" />
        <ui-badge value="ping" color="success" animation="ping" />
        <ui-badge dot color="warning" animation="pulse" />
      </div>
    ),
  },
  {
    title: 'Gradient & Glow',
    code: `<ui-badge value="Gradient" gradient="linear-gradient(135deg,#f093fb,#f5576c)" glow></ui-badge>
<ui-badge value="Neon" custom-color="#00ff88" custom-text-color="#000" glow></ui-badge>`,
    render: () => (
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
        <ui-badge value="Gradient" gradient="linear-gradient(135deg,#f093fb,#f5576c)" glow />
        <ui-badge value="Neon" custom-color="#00ff88" custom-text-color="#000" glow />
      </div>
    ),
  },
  {
    title: 'Closeable & Interactive',
    code: `<ui-badge value="Closeable" closeable color="primary"></ui-badge>
<ui-badge value="Clickable" interactive color="success" icon="external-link" icon-position="right"></ui-badge>`,
    render: () => (
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
        <ui-badge value="Closeable" closeable color="primary" />
        <ui-badge value="Clickable" interactive color="success" icon="external-link" icon-position="right" />
      </div>
    ),
  },
  {
    title: 'Max Overflow',
    description: 'Automatically truncates high numeric values',
    code: `<ui-badge value="99" max="99" color="danger"></ui-badge>
<ui-badge value="150" max="99" color="danger"></ui-badge>
<ui-badge value="0" color="danger" show-zero></ui-badge>`,
    render: () => (
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
          <ui-badge value="99" max="99" color="danger" />
          <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)' }}>value=99</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
          <ui-badge value="150" max="99" color="danger" />
          <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)' }}>value=150, max=99</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
          <ui-badge value="0" color="primary" show-zero />
          <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)' }}>show-zero</span>
        </div>
      </div>
    ),
  },
];

export default function BadgePage() {
  return (
    <ComponentPlayground
      componentName="Badge"
      tagName="ui-badge"
      description="A compact label for statuses, counts, and tags. Supports 22 props including gradients, animations, glow, icons, and interactive/closeable modes."
      props={propConfigs}
      renderPreview={renderPreview}
      buildCode={buildCode}
      docs={docs}
      examples={examples}
      demoSections={getDemosForComponent('badge')}
      events={getEventsForComponent('ui-badge')}
      methods={getMethodsForComponent('ui-badge')}
      slots={getSlotsForComponent('ui-badge')}
      parts={getPartsForComponent('ui-badge')}
    />
  );
}
