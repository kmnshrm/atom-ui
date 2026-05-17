import ComponentPlayground from '../../components/playground/ComponentPlayground';
import type { PropConfig, ExampleConfig, DocSection } from '../../components/playground/ComponentPlayground';

const propConfigs: PropConfig[] = [
  { name: 'name', type: 'string', label: 'Icon Name', defaultValue: 'star', description: 'Lucide icon name' },
  { name: 'size', type: 'number', label: 'Size (px)', defaultValue: 24, description: 'Icon size in pixels' },
  { name: 'color', type: 'color', label: 'Color', defaultValue: '#34d399', description: 'Icon color' },
  { name: 'library', type: 'select', label: 'Library', defaultValue: 'lucide', options: ['lucide', 'fontawesome', 'bootstrap', 'remixicon', 'google', 'emoji'], description: 'Icon library to use' },
  { name: 'spin', type: 'boolean', label: 'Spin', defaultValue: false, description: 'Animates the icon in a spinning loop' },
  { name: 'label', type: 'string', label: 'ARIA Label', defaultValue: '', description: 'Accessible label (adds role="img")' },
];

const buildCode = (p: Record<string, any>) => {
  const attrs: string[] = [`name="${p.name}"`, `size="${p.size}"`, `color="${p.color}"`];
  if (p.library !== 'lucide') attrs.push(`library="${p.library}"`);
  if (p.spin) attrs.push('spin');
  if (p.label) attrs.push(`label="${p.label}"`);
  return `<ui-icon ${attrs.join(' ')}></ui-icon>`;
};

const renderPreview = (p: Record<string, any>) => (
  <ui-icon
    key={JSON.stringify(p)}
    name={p.name}
    size={String(p.size)}
    color={p.color}
    library={p.library}
    spin={p.spin || undefined}
    label={p.label || undefined}
  />
);

const docs: DocSection[] = [
  {
    title: 'Overview',
    content: `
      <p>The <code>ui-icon</code> component is a universal icon renderer supporting multiple popular icon libraries out of the box.</p>
      <h3>Supported Libraries</h3>
      <ul>
        <li><code>lucide</code> — Lucide Icons (default, 1000+ icons)</li>
        <li><code>fontawesome</code> — Font Awesome 6 (2000+ icons)</li>
        <li><code>bootstrap</code> — Bootstrap Icons</li>
        <li><code>remixicon</code> — Remix Icons</li>
        <li><code>google</code> — Google Material Symbols</li>
        <li><code>emoji</code> — Renders any emoji character</li>
      </ul>
      <h3>Auto-Detection</h3>
      <p>When <code>library</code> is not set (or set to <code>default</code>), the component auto-detects the library based on the icon name prefix (e.g., <code>bi-</code> → Bootstrap, <code>ri-</code> → Remix).</p>
    `,
  },
];

const examples: ExampleConfig[] = [
  {
    title: 'Icon Gallery',
    description: 'Lucide icons at various sizes',
    code: `<ui-icon name="house" size="32"></ui-icon>
<ui-icon name="settings" size="32"></ui-icon>
<ui-icon name="user" size="32"></ui-icon>
<ui-icon name="bell" size="32"></ui-icon>
<ui-icon name="heart" size="32"></ui-icon>
<ui-icon name="star" size="32"></ui-icon>`,
    render: () => (
      <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        {['house', 'settings', 'user', 'bell', 'heart', 'star', 'search', 'mail', 'calendar', 'chart-bar'].map(n => (
          <ui-icon key={n} name={n} size="32" />
        ))}
      </div>
    ),
  },
  {
    title: 'Colored Icons',
    description: 'Using the color prop for accent colors',
    code: `<ui-icon name="check-circle" size="40" color="#34d399"></ui-icon>
<ui-icon name="alert-circle" size="40" color="#fbbf24"></ui-icon>
<ui-icon name="x-circle" size="40" color="#f87171"></ui-icon>
<ui-icon name="info" size="40" color="#60a5fa"></ui-icon>`,
    render: () => (
      <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
        <ui-icon name="check-circle" size="40" color="#34d399" />
        <ui-icon name="alert-circle" size="40" color="#fbbf24" />
        <ui-icon name="x-circle" size="40" color="#f87171" />
        <ui-icon name="info" size="40" color="#60a5fa" />
      </div>
    ),
  },
  {
    title: 'Spinning Icons',
    description: 'Loading spinner using the spin prop',
    code: `<ui-icon name="loader" size="32" spin color="#34d399"></ui-icon>
<ui-icon name="refresh-cw" size="32" spin color="#60a5fa"></ui-icon>`,
    render: () => (
      <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center' }}>
        <ui-icon name="loader" size="32" spin color="#34d399" />
        <ui-icon name="refresh-cw" size="32" spin color="#60a5fa" />
      </div>
    ),
  },
  {
    title: 'Emoji Icons',
    description: 'Use emoji as icons with the emoji library',
    code: `<ui-icon name="🚀" library="emoji" size="40"></ui-icon>
<ui-icon name="🎨" library="emoji" size="40"></ui-icon>
<ui-icon name="⚡" library="emoji" size="40"></ui-icon>`,
    render: () => (
      <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
        {['🚀', '🎨', '⚡', '🎯', '💎', '🔥'].map(e => (
          <ui-icon key={e} name={e} library="emoji" size="40" />
        ))}
      </div>
    ),
  },
];

export default function IconPage() {
  return (
    <ComponentPlayground
      componentName="Icon"
      tagName="ui-icon"
      description="Universal icon renderer supporting Lucide, Font Awesome, Bootstrap, Remix, Google Material, and emoji libraries."
      props={propConfigs}
      renderPreview={renderPreview}
      buildCode={buildCode}
      docs={docs}
      examples={examples}
    />
  );
}
