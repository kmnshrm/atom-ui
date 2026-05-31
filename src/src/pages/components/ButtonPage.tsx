import { getPropsForComponent, getEventsForComponent, getMethodsForComponent, getSlotsForComponent, getPartsForComponent } from '../../utils/componentMetadata';
import ComponentPlayground from '../../components/playground/ComponentPlayground';
import type { PropConfig, ExampleConfig, DocSection, DemoSection } from '../../components/playground/ComponentPlayground';

const propConfigs: PropConfig[] = [
  // Content
  { name: 'label', type: 'string', label: 'Label', defaultValue: 'Click Me', description: 'Button label text' },
  { name: 'subtitle', type: 'string', label: 'Subtitle', defaultValue: '', description: 'Secondary text below/above the label' },
  { name: 'description-position', type: 'select', label: 'Subtitle Position', defaultValue: 'below', options: ['above', 'below', 'left', 'right'], description: 'Position of the subtitle text' },
  // Appearance
  { name: 'variant', type: 'select', label: 'Variant', defaultValue: 'primary', options: ['primary', 'secondary', 'outline', 'ghost', 'danger', 'success', 'warning', 'link', 'none'], description: 'Visual style of the button' },
  { name: 'color', type: 'select', label: 'Color Override', defaultValue: 'none', options: ['none', 'primary', 'success', 'warning', 'danger', 'info'], description: 'Color override on top of variant' },
  { name: 'size', type: 'select', label: 'Size', defaultValue: 'md', options: ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'], description: 'Button size' },
  { name: 'shape', type: 'select', label: 'Shape', defaultValue: 'rounded', options: ['rounded', 'pill', 'circle', 'square'], description: 'Corner shape style' },
  { name: 'align', type: 'select', label: 'Align', defaultValue: 'center', options: ['start', 'center', 'end'], description: 'Content alignment within the button' },
  { name: 'justify', type: 'select', label: 'Justify', defaultValue: 'center', options: ['start', 'center', 'end', 'between', 'around'], description: 'Content justification' },
  // Icon
  { name: 'icon', type: 'string', label: 'Icon', defaultValue: '', description: 'Lucide icon name' },
  { name: 'icon-position', type: 'select', label: 'Icon Position', defaultValue: 'left', options: ['left', 'right', 'top', 'bottom'], description: 'Icon position relative to the label' },
  { name: 'icon-only', type: 'boolean', label: 'Icon Only', defaultValue: false, description: 'Show only the icon (no label)' },
  // States
  { name: 'disabled', type: 'boolean', label: 'Disabled', defaultValue: false, description: 'Disables the button' },
  { name: 'loading', type: 'boolean', label: 'Loading', defaultValue: false, description: 'Shows a loading spinner' },
  { name: 'loading-position', type: 'select', label: 'Loading Position', defaultValue: 'left', options: ['left', 'right', 'center', 'icon'], description: 'Where the loading spinner appears' },
  { name: 'selected', type: 'boolean', label: 'Selected', defaultValue: false, description: 'Selected state (toggle groups)' },
  // Layout
  { name: 'full-width', type: 'boolean', label: 'Full Width', defaultValue: false, description: 'Expands button to 100% width' },
  { name: 'grow', type: 'boolean', label: 'Grow', defaultValue: false, description: 'Grows to fill available flex space' },
  { name: 'width', type: 'string', label: 'Width', defaultValue: '', description: 'Custom width (e.g. 200px, 100%)' },
  // Badge
  { name: 'badge', type: 'string', label: 'Badge', defaultValue: '', description: 'Badge value (text or number)' },
  { name: 'badge-color', type: 'select', label: 'Badge Color', defaultValue: 'danger', options: ['danger', 'primary', 'success', 'warning', 'info'], description: 'Badge accent color' },
  { name: 'badge-position', type: 'select', label: 'Badge Position', defaultValue: 'top-right', options: ['top-right', 'top-left', 'bottom-right', 'bottom-left', 'inline-left', 'inline-right'], description: 'Badge placement' },
  // Link
  { name: 'href', type: 'string', label: 'Link URL', defaultValue: '', description: 'Renders the button as an anchor <a> tag' },
  // Effects
  { name: 'no-ripple', type: 'boolean', label: 'No Ripple', defaultValue: false, description: 'Disables the ripple click effect' },
  { name: 'elevation', type: 'number', label: 'Elevation (0-5)', defaultValue: 0, description: 'Shadow elevation level' },
  { name: 'reveal', type: 'select', label: 'Reveal Animation', defaultValue: 'none', options: ['none', 'fade-in', 'slide-up', 'zoom'], description: 'Entrance animation' },
  { name: 'progress', type: 'number', label: 'Progress Fill %', defaultValue: 0, description: 'Fills button background to this percentage' },
  // Copy
  { name: 'copy-value', type: 'string', label: 'Copy Value', defaultValue: '', description: 'Text to copy to clipboard on click' },
  // RTL
  { name: 'rtl', type: 'boolean', label: 'RTL', defaultValue: false, description: 'Right-to-left layout' },
];

const buildCode = (p: Record<string, any>) => {
  const attrs: string[] = [`variant="${p.variant}"`, `size="${p.size}"`];
  if (p.color !== 'none') attrs.push(`color="${p.color}"`);
  if (p.shape !== 'rounded') attrs.push(`shape="${p.shape}"`);
  if (p.align !== 'center') attrs.push(`align="${p.align}"`);
  if (p.justify !== 'center') attrs.push(`justify="${p.justify}"`);
  if (p.icon) attrs.push(`icon="${p.icon}"`);
  if (p['icon-position'] !== 'left') attrs.push(`icon-position="${p['icon-position']}"`);
  if (p['icon-only']) attrs.push('icon-only');
  if (p.disabled) attrs.push('disabled');
  if (p.loading) attrs.push('loading');
  if (p['loading-position'] !== 'left') attrs.push(`loading-position="${p['loading-position']}"`);
  if (p.selected) attrs.push('selected');
  if (p['full-width']) attrs.push('full-width');
  if (p.grow) attrs.push('grow');
  if (p.width) attrs.push(`width="${p.width}"`);
  if (p.badge) attrs.push(`badge="${p.badge}"`);
  if (p.badge && p['badge-color'] !== 'danger') attrs.push(`badge-color="${p['badge-color']}"`);
  if (p.badge && p['badge-position'] !== 'top-right') attrs.push(`badge-position="${p['badge-position']}"`);
  if (p.href) attrs.push(`href="${p.href}"`);
  if (p['no-ripple']) attrs.push('no-ripple');
  if (p.elevation) attrs.push(`elevation="${p.elevation}"`);
  if (p.reveal !== 'none') attrs.push(`reveal="${p.reveal}"`);
  if (p.progress) attrs.push(`progress="${p.progress}"`);
  if (p['copy-value']) attrs.push(`copy-value="${p['copy-value']}"`);
  if (p.rtl) attrs.push('rtl');
  if (p.subtitle) attrs.push(`subtitle="${p.subtitle}"`);
  if (p['description-position'] !== 'below') attrs.push(`description-position="${p['description-position']}"`);
  return `<ui-button ${attrs.join('\n  ')}>\n  ${p.label}\n</ui-button>`;
};

const renderPreview = (p: Record<string, any>) => (
  <ui-button
    key={JSON.stringify(p)}
    variant={p.variant}
    size={p.size}
    color={p.color !== 'none' ? p.color : undefined}
    shape={p.shape}
    align={p.align}
    justify={p.justify}
    icon={p.icon || undefined}
    icon-position={p['icon-position']}
    icon-only={p['icon-only'] || undefined}
    disabled={p.disabled || undefined}
    loading={p.loading || undefined}
    loading-position={p['loading-position']}
    selected={p.selected || undefined}
    full-width={p['full-width'] || undefined}
    grow={p.grow || undefined}
    width={p.width || undefined}
    badge={p.badge || undefined}
    badge-color={p['badge-color']}
    badge-position={p['badge-position']}
    href={p.href || undefined}
    no-ripple={p['no-ripple'] || undefined}
    elevation={p.elevation || undefined}
    reveal={p.reveal !== 'none' ? p.reveal : undefined}
    progress={p.progress || undefined}
    copy-value={p['copy-value'] || undefined}
    rtl={p.rtl || undefined}
    subtitle={p.subtitle || undefined}
    description-position={p['description-position']}
  >
    {p.label}
  </ui-button>
);

const docs: DocSection[] = [
  {
    title: 'Overview',
    content: `
      <p>The <code>ui-button</code> component is the foundational interactive element of AtomUI. It supports multiple visual variants, sizes, states, icon slots, badge overlays, link rendering, and animations.</p>
      <h3>Rendering as a Link</h3>
      <p>When the <code>href</code> prop is set, the button renders as an <code>&lt;a&gt;</code> tag with <code>role="button"</code>. Use <code>target</code> and <code>rel</code> props for link behavior.</p>
      <h3>Form Integration</h3>
      <p>The component is <code>formAssociated</code>. Set <code>type="submit"</code> or <code>type="reset"</code> to integrate with native HTML forms.</p>
      <h3>Copy to Clipboard</h3>
      <p>Set <code>copy-value</code> to any string — the button will copy it on click and display a ✓ confirmation briefly.</p>
      <h3>Events</h3>
      <ul>
        <li><code>buttonClick</code> — Fired on click (not fired when disabled/loading)</li>
      </ul>
    `,
  },
  {
    title: 'Shape Options',
    content: `
      <p>The <code>shape</code> prop controls corner rounding:</p>
      <ul>
        <li><code>rounded</code> — Default soft rounded corners</li>
        <li><code>pill</code> — Fully rounded ends (capsule shape)</li>
        <li><code>circle</code> — Perfect circle (best with icon-only)</li>
        <li><code>square</code> — No border radius</li>
      </ul>
    `,
  },
];

const examples: ExampleConfig[] = [
  {
    title: 'All Variants',
    description: 'All available button variants side by side',
    code: `<ui-button variant="primary">Primary</ui-button>
<ui-button variant="secondary">Secondary</ui-button>
<ui-button variant="outline">Outline</ui-button>
<ui-button variant="ghost">Ghost</ui-button>
<ui-button variant="danger">Danger</ui-button>
<ui-button variant="success">Success</ui-button>
<ui-button variant="warning">Warning</ui-button>`,
    render: () => (
      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        {['primary', 'secondary', 'outline', 'ghost', 'danger', 'success', 'warning'].map(v => (
          <ui-button key={v} variant={v}>{v.charAt(0).toUpperCase() + v.slice(1)}</ui-button>
        ))}
      </div>
    ),
  },
  {
    title: 'Sizes',
    description: 'All button sizes from xs to xxl',
    code: `<ui-button size="xs">XS</ui-button>
<ui-button size="sm">SM</ui-button>
<ui-button size="md">MD</ui-button>
<ui-button size="lg">LG</ui-button>
<ui-button size="xl">XL</ui-button>
<ui-button size="xxl">XXL</ui-button>`,
    render: () => (
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        {['xs', 'sm', 'md', 'lg', 'xl', 'xxl'].map(s => (
          <ui-button key={s} size={s}>{s.toUpperCase()}</ui-button>
        ))}
      </div>
    ),
  },
  {
    title: 'Icon Positions',
    description: 'Icons in all four positions relative to the label',
    code: `<ui-button icon="arrow-left" icon-position="left">Left</ui-button>
<ui-button icon="arrow-right" icon-position="right">Right</ui-button>
<ui-button icon="arrow-up" icon-position="top">Top</ui-button>
<ui-button icon="arrow-down" icon-position="bottom">Bottom</ui-button>`,
    render: () => (
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
        <ui-button icon="arrow-left" icon-position="left">Left</ui-button>
        <ui-button icon="arrow-right" icon-position="right">Right</ui-button>
        <ui-button icon="arrow-up" icon-position="top" variant="outline">Top</ui-button>
        <ui-button icon="arrow-down" icon-position="bottom" variant="outline">Bottom</ui-button>
      </div>
    ),
  },
  {
    title: 'Icon Only — Shapes',
    description: 'Icon-only buttons in different shapes',
    code: `<ui-button icon="heart" icon-only shape="circle"></ui-button>
<ui-button icon="star" icon-only shape="rounded"></ui-button>
<ui-button icon="bookmark" icon-only shape="square" variant="outline"></ui-button>
<ui-button icon="share-2" icon-only shape="pill" variant="ghost"></ui-button>`,
    render: () => (
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', alignItems: 'center' }}>
        <ui-button icon="heart" icon-only shape="circle" />
        <ui-button icon="star" icon-only shape="rounded" />
        <ui-button icon="bookmark" icon-only shape="square" variant="outline" />
        <ui-button icon="share-2" icon-only shape="pill" variant="ghost" />
      </div>
    ),
  },
  {
    title: 'Badge Overlays',
    description: 'Buttons with notification badges',
    code: `<ui-button icon="bell" icon-only badge="5" badge-position="top-right"></ui-button>
<ui-button icon="mail" icon-only badge="12" badge-color="primary" badge-position="top-right"></ui-button>
<ui-button variant="outline" badge="New" badge-color="success" badge-position="inline-right">Updates</ui-button>`,
    render: () => (
      <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', alignItems: 'center' }}>
        <ui-button icon="bell" icon-only badge="5" badge-position="top-right" />
        <ui-button icon="mail" icon-only badge="12" badge-color="primary" badge-position="top-right" />
        <ui-button variant="outline" badge="New" badge-color="success" badge-position="inline-right">Updates</ui-button>
      </div>
    ),
  },
  {
    title: 'States',
    description: 'Loading, disabled, and selected states',
    code: `<ui-button loading>Saving...</ui-button>
<ui-button loading loading-position="right" variant="outline">Processing</ui-button>
<ui-button disabled>Disabled</ui-button>
<ui-button selected variant="outline" icon="check">Selected</ui-button>`,
    render: () => (
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <ui-button loading>Saving...</ui-button>
        <ui-button loading loading-position="right" variant="outline">Processing</ui-button>
        <ui-button disabled>Disabled</ui-button>
        <ui-button selected variant="outline" icon="check">Selected</ui-button>
      </div>
    ),
  },
  {
    title: 'Progress Fill',
    description: 'Button with a background progress fill bar',
    code: `<ui-button progress="75" variant="outline" style="width:200px">Uploading 75%</ui-button>`,
    render: () => (
      <ui-button progress="75" variant="outline" style={{ width: '200px' }}>Uploading 75%</ui-button>
    ),
  },
  {
    title: 'Copy to Clipboard',
    description: 'Click to copy a value to the clipboard',
    code: `<ui-button icon="copy" copy-value="npm install atomicuilibrary">Copy Install Command</ui-button>`,
    render: () => (
      <ui-button icon="copy" copy-value="npm install atomicuilibrary">Copy Install Command</ui-button>
    ),
  },
];

const demoSections: DemoSection[] = [
  {
    title: 'Variants',
    description: 'All visual variants including gradient families',
    html: `
      <div class="demo-block">
        <h3>Standard Variants</h3>
        <div style="display:flex;gap:12px;flex-wrap:wrap;margin:16px 0;">
          <ui-button label="Primary" variant="primary"></ui-button>
          <ui-button label="Secondary" variant="secondary"></ui-button>
          <ui-button label="Success" variant="success"></ui-button>
          <ui-button label="Danger" variant="danger"></ui-button>
          <ui-button label="Warning" variant="warning"></ui-button>
          <ui-button label="Info" variant="info"></ui-button>
          <ui-button label="Outline" variant="outline"></ui-button>
          <ui-button label="Ghost" variant="ghost"></ui-button>
          <ui-button label="Glass" variant="glass"></ui-button>
          <ui-button label="Raised" variant="raised"></ui-button>
          <ui-button label="Dark" variant="dark"></ui-button>
        </div>
        <h4>🌈 Gradient Variants</h4>
        <div style="display:flex;gap:12px;flex-wrap:wrap;margin-bottom:8px;">
          <ui-button label="Brand" variant="gradient"></ui-button>
          <ui-button label="Blue Purple" variant="gradient-blue"></ui-button>
          <ui-button label="Purple Pink" variant="gradient-purple"></ui-button>
          <ui-button label="Orange Red" variant="gradient-orange"></ui-button>
          <ui-button label="Ocean" variant="gradient-ocean"></ui-button>
          <ui-button label="Sunset" variant="gradient-sunset"></ui-button>
          <ui-button label="Candy" variant="gradient-candy"></ui-button>
          <ui-button label="Gold" variant="gradient-gold"></ui-button>
        </div>
      </div>
      <div class="demo-block">
        <h3>Link & Width Configuration</h3>
        <div style="display:flex;gap:12px;flex-wrap:wrap;margin-bottom:16px;">
          <ui-button label="Real Anchor Link" href="https://example.com" target="_blank" variant="outline" icon="link" icon-library="lucide"></ui-button>
          <ui-button label="No Ripple" no-ripple variant="secondary"></ui-button>
        </div>
        <div style="display:flex;flex-direction:column;gap:12px;">
          <ui-button label="Full Width Button" full-width variant="primary"></ui-button>
          <div style="display:flex;gap:12px;flex-wrap:wrap;">
            <ui-button label="Width: 200px" width="200px" variant="outline"></ui-button>
            <ui-button label="Width: 50%" width="50%" variant="info"></ui-button>
            <ui-button label="Min-Width: 150px" min-width="150px" variant="secondary"></ui-button>
          </div>
        </div>
      </div>
    `,
  },
  {
    title: 'Sizes & Shapes',
    description: 'All sizes with label-only, icon+label, badge, and icon-only combinations',
    html: `
      <div class="demo-block">
        <h3>Sizes &amp; Height Consistency</h3>
        <div style="display:flex;flex-direction:column;gap:20px;">
          ${['xs','sm','md','lg','xl','xxl'].map(s => `
            <div style="display:flex;align-items:center;gap:16px;flex-wrap:wrap;">
              <span style="min-width:80px;font-size:13px;font-weight:600;opacity:0.6;">${s}:</span>
              <ui-button size="${s}" variant="primary" label="Simple"></ui-button>
              <ui-button size="${s}" variant="primary" icon="zap" icon-library="lucide" label="With Icon"></ui-button>
              <ui-button size="${s}" variant="primary" icon="bell" icon-library="lucide" label="Badge" badge="8"></ui-button>
              <ui-button size="${s}" variant="primary" icon="zap" icon-library="lucide" icon-only shape="circle"></ui-button>
            </div>
          `).join('')}
        </div>
      </div>
      <div class="demo-block">
        <h3>Shapes</h3>
        <div class="demo-grid-wrapper">
          <ui-button variant="secondary" shape="square" label="Square"></ui-button>
          <ui-button variant="secondary" shape="rounded" label="Rounded"></ui-button>
          <ui-button variant="secondary" shape="pill" label="Pill Shape"></ui-button>
          <ui-button variant="primary" shape="circle" icon="plus" icon-library="lucide"></ui-button>
        </div>
      </div>
    `,
  },
  {
    title: 'Icons & Layouts',
    description: 'Icon positions, icon-only shapes, libraries, and badge placements',
    html: `
      <div class="demo-block">
        <h3>Icon Positions</h3>
        <div style="display:flex;gap:12px;flex-wrap:wrap;">
          <ui-button label="Left Icon" icon="arrow-left" icon-library="lucide" icon-position="left" variant="outline"></ui-button>
          <ui-button label="Right Icon" icon="arrow-right" icon-library="lucide" icon-position="right" variant="outline"></ui-button>
          <ui-button label="Top Icon" icon="arrow-up" icon-library="lucide" icon-position="top" variant="outline"></ui-button>
          <ui-button label="Bottom Icon" icon="arrow-down" icon-library="lucide" icon-position="bottom" variant="outline"></ui-button>
        </div>
      </div>
      <div class="demo-block">
        <h3>Icon Only — Shape Masterclass</h3>
        <div style="display:flex;gap:20px;align-items:center;flex-wrap:wrap;">
          <div style="display:flex;flex-direction:column;align-items:center;gap:8px;">
            <ui-button icon="settings" icon-library="lucide" icon-only variant="primary" size="lg" shape="circle"></ui-button>
            <span style="font-size:11px;opacity:0.5;">CIRCLE</span>
          </div>
          <div style="display:flex;flex-direction:column;align-items:center;gap:8px;">
            <ui-button icon="bell" icon-library="lucide" icon-only variant="success" size="lg"></ui-button>
            <span style="font-size:11px;opacity:0.5;">DEFAULT (ROUNDED)</span>
          </div>
          <div style="display:flex;flex-direction:column;align-items:center;gap:8px;">
            <ui-button icon="share-2" icon-library="lucide" icon-only variant="warning" size="lg" shape="square"></ui-button>
            <span style="font-size:11px;opacity:0.5;">SQUARE</span>
          </div>
          <div style="display:flex;flex-direction:column;align-items:center;gap:8px;">
            <ui-button icon="mail" icon-library="lucide" icon-only variant="danger" size="lg" pill></ui-button>
            <span style="font-size:11px;opacity:0.5;">PILL</span>
          </div>
        </div>
      </div>
      <div class="demo-block">
        <h3>Badge Masterclass</h3>
        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:24px;">
          <div style="display:flex;flex-direction:column;gap:12px;">
            <h4>Shapes &amp; Corners</h4>
            <div style="display:flex;gap:20px;flex-wrap:wrap;">
              <ui-button icon="bell" icon-library="lucide" icon-only badge="9+" variant="primary"></ui-button>
              <ui-button icon="mail" icon-library="lucide" icon-only badge="3" variant="success" shape="circle"></ui-button>
              <ui-button icon="message-square" icon-library="lucide" icon-only badge="New" variant="info" pill></ui-button>
            </div>
          </div>
          <div style="display:flex;flex-direction:column;gap:12px;">
            <h4>Positions (TR, TL, BR, BL)</h4>
            <div style="display:flex;gap:20px;flex-wrap:wrap;">
              <ui-button icon="bell" icon-library="lucide" icon-only badge="TR" badge-position="top-right" variant="secondary"></ui-button>
              <ui-button icon="bell" icon-library="lucide" icon-only badge="TL" badge-position="top-left" variant="secondary"></ui-button>
              <ui-button icon="bell" icon-library="lucide" icon-only badge="BR" badge-position="bottom-right" variant="secondary"></ui-button>
              <ui-button icon="bell" icon-library="lucide" icon-only badge="BL" badge-position="bottom-left" variant="secondary"></ui-button>
            </div>
          </div>
        </div>
      </div>
    `,
  },
  {
    title: 'Avatar Buttons',
    description: 'Buttons with circular profile images and status indicators',
    html: `
      <div class="demo-block">
        <h3>User Profile Buttons</h3>
        <div style="display:flex;gap:16px;flex-wrap:wrap;align-items:center;">
          <ui-button label="Praveen" avatar-src="https://i.pravatar.cc/100?u=praveen" avatar-status="online" variant="outline" shape="pill"></ui-button>
          <ui-button label="Sarah Chen" avatar-src="https://i.pravatar.cc/100?u=sarah" avatar-status="busy" variant="outline" shape="rounded"></ui-button>
          <ui-button label="System Admin" avatar-src="https://i.pravatar.cc/100?u=admin" avatar-status="offline" variant="dark" shape="pill"></ui-button>
        </div>
      </div>
      <div class="demo-block">
        <h3>Avatar Only (Quick Select)</h3>
        <div style="display:flex;gap:16px;flex-wrap:wrap;align-items:center;">
          <ui-button avatar-src="https://i.pravatar.cc/100?u=1" avatar-status="online" variant="ghost"></ui-button>
          <ui-button avatar-src="https://i.pravatar.cc/100?u=2" avatar-status="away" variant="ghost"></ui-button>
          <ui-button avatar-src="https://i.pravatar.cc/100?u=3" avatar-status="busy" variant="ghost"></ui-button>
          <ui-button avatar-src="https://i.pravatar.cc/100?u=4" avatar-status="online" variant="ghost"></ui-button>
          <ui-button variant="outline" shape="circle" icon="plus" icon-library="lucide"></ui-button>
        </div>
      </div>
    `,
  },
  {
    title: 'States',
    description: 'Loading, disabled, selected, and inline counter states',
    html: `
      <div class="demo-block">
        <h3>Loading States</h3>
        <div style="display:flex;gap:12px;flex-wrap:wrap;">
          <ui-button label="Loading Left" loading loading-position="left" variant="primary"></ui-button>
          <ui-button label="Loading Right" loading loading-position="right" variant="success"></ui-button>
          <ui-button label="Outline Loading" loading variant="outline" shape="pill"></ui-button>
        </div>
      </div>
      <div class="demo-block">
        <h3>Disabled States</h3>
        <div style="display:flex;gap:12px;flex-wrap:wrap;">
          <ui-button label="Primary" disabled variant="primary"></ui-button>
          <ui-button label="Success" disabled variant="success"></ui-button>
          <ui-button label="Danger" disabled variant="danger"></ui-button>
        </div>
      </div>
      <div class="demo-block">
        <h3>Selected / Active</h3>
        <div style="display:flex;gap:12px;flex-wrap:wrap;">
          <ui-button label="Selected" selected variant="outline" icon="check" icon-library="lucide"></ui-button>
          <ui-button label="Not Selected" variant="outline"></ui-button>
          <ui-button label="Selected Primary" selected variant="primary"></ui-button>
        </div>
      </div>
    `,
  },
  {
    title: 'Rich Layouts — Subtitle & Description',
    description: 'Buttons with subtitle/description placed in 4 positions',
    html: `
      <div class="demo-block">
        <h3>Rich Typography &amp; Metadata</h3>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:24px;">
          <div class="demo-card-inner">
            <h4>POSITION: BELOW (DEFAULT)</h4>
            <div style="display:flex;flex-direction:column;gap:12px;">
              <ui-button label="Network Status" description="Connected to Enterprise-WiFi" icon="wifi" icon-library="lucide" variant="outline" full-width></ui-button>
              <ui-button label="Save Changes" subtitle="Updating 12 parameters..." icon="save" icon-library="lucide" variant="success" full-width></ui-button>
            </div>
          </div>
          <div class="demo-card-inner">
            <h4>POSITION: ABOVE</h4>
            <div style="display:flex;flex-direction:column;gap:12px;">
              <ui-button description="SYSTEM CRITICAL" label="Shutdown Server" description-position="above" icon="power" icon-library="lucide" variant="danger" full-width></ui-button>
              <ui-button description="BETA FEATURE" label="Explore Labs" description-position="above" variant="outline" color="primary" full-width></ui-button>
            </div>
          </div>
          <div class="demo-card-inner">
            <h4>POSITION: LEFT</h4>
            <div style="display:flex;flex-direction:column;gap:12px;">
              <ui-button description="5.2GB" label="Download Data" description-position="left" icon="download" icon-library="lucide" variant="outline" full-width></ui-button>
              <ui-button description="v2.4.0" label="Deploy Model" description-position="left" icon="zap" icon-library="lucide" variant="outline" color="success" full-width></ui-button>
            </div>
          </div>
          <div class="demo-card-inner">
            <h4>POSITION: RIGHT</h4>
            <div style="display:flex;flex-direction:column;gap:12px;">
              <ui-button description="Locked" label="Admin Panel" description-position="right" icon="lock" icon-library="lucide" variant="outline" color="warning" full-width></ui-button>
              <ui-button description="2 min ago" label="Last Updated" description-position="right" icon="clock" icon-library="lucide" variant="ghost" full-width></ui-button>
            </div>
          </div>
        </div>
      </div>
    `,
  },
  {
    title: 'Gradient Buttons',
    description: 'All 8 gradient variants — solid, with icons, pill, and icon-only',
    html: `
      <div class="demo-block">
        <h3>🌈 Solid Gradients</h3>
        <div style="display:flex;gap:12px;flex-wrap:wrap;">
          <ui-button variant="gradient" label="Brand Green"></ui-button>
          <ui-button variant="gradient-blue" label="Blue Purple"></ui-button>
          <ui-button variant="gradient-purple" label="Purple Pink"></ui-button>
          <ui-button variant="gradient-orange" label="Orange Red"></ui-button>
          <ui-button variant="gradient-ocean" label="Ocean"></ui-button>
          <ui-button variant="gradient-sunset" label="Sunset"></ui-button>
          <ui-button variant="gradient-candy" label="Candy"></ui-button>
          <ui-button variant="gradient-gold" label="Gold"></ui-button>
        </div>
      </div>
      <div class="demo-block">
        <h3>With Icons &amp; Pill Shape</h3>
        <div style="display:flex;gap:12px;flex-wrap:wrap;margin-bottom:16px;">
          <ui-button variant="gradient" label="Dashboard" icon="layout-dashboard" icon-library="lucide"></ui-button>
          <ui-button variant="gradient-blue" label="Analytics" icon="bar-chart-2" icon-library="lucide"></ui-button>
          <ui-button variant="gradient-purple" label="Premium" icon="star" icon-library="lucide"></ui-button>
          <ui-button variant="gradient-candy" label="Like" icon="heart" icon-library="lucide"></ui-button>
          <ui-button variant="gradient-gold" label="Award" icon="award" icon-library="lucide"></ui-button>
        </div>
        <div style="display:flex;gap:12px;flex-wrap:wrap;">
          <ui-button variant="gradient" label="Green Pill" pill></ui-button>
          <ui-button variant="gradient-blue" label="Blue Pill" pill></ui-button>
          <ui-button variant="gradient-purple" label="Purple Pill" pill></ui-button>
          <ui-button variant="gradient-sunset" label="Sunset Pill" pill></ui-button>
        </div>
      </div>
      <div class="demo-block">
        <h3>Icon Only Gradients</h3>
        <div style="display:flex;gap:12px;flex-wrap:wrap;">
          <ui-button variant="gradient" icon="zap" icon-library="lucide" icon-only pill></ui-button>
          <ui-button variant="gradient-blue" icon="star" icon-library="lucide" icon-only pill></ui-button>
          <ui-button variant="gradient-purple" icon="heart" icon-library="lucide" icon-only pill></ui-button>
          <ui-button variant="gradient-orange" icon="flame" icon-library="lucide" icon-only pill></ui-button>
          <ui-button variant="gradient-ocean" icon="waves" icon-library="lucide" icon-only pill></ui-button>
          <ui-button variant="gradient-candy" icon="candy" icon-library="lucide" icon-only pill></ui-button>
          <ui-button variant="gradient-gold" icon="award" icon-library="lucide" icon-only pill></ui-button>
        </div>
      </div>
    `,
  },
  {
    title: 'Selection Groups',
    description: 'Button toggle groups with rich multi-select, avatar, and staggered reveal',
    html: `
      <div class="demo-block">
        <h3>Avatar Status Select</h3>
        <ui-button-toggle-group value="online" color="info">
          <ui-button value="online" label="Online" avatar-src="https://i.pravatar.cc/150?u=1" avatar-status="online" icon="user-check" icon-library="lucide"></ui-button>
          <ui-button value="away" label="Away" avatar-src="https://i.pravatar.cc/150?u=2" avatar-status="away" icon="clock" icon-library="lucide"></ui-button>
          <ui-button value="busy" label="Do Not Disturb" avatar-src="https://i.pravatar.cc/150?u=3" avatar-status="busy" icon="minus-circle" icon-library="lucide"></ui-button>
        </ui-button-toggle-group>
      </div>
      <div class="demo-block">
        <h3>Rich Multi-Select (Vertical)</h3>
        <ui-button-toggle-group multi-select value='["opt1"]' orientation="vertical" color="primary" style="max-width:450px;">
          <ui-button value="opt1" label="Standard License" description="Personal projects only" description-position="right" variant="outline"></ui-button>
          <ui-button value="opt2" label="Commercial Pro" description="Corporate &amp; Production use" description-position="right" variant="outline"></ui-button>
          <ui-button value="opt3" label="Enterprise Elite" description="Unlimited scale &amp; 24/7 support" description-position="right" variant="outline"></ui-button>
        </ui-button-toggle-group>
      </div>
      <div class="demo-block">
        <h3>Connected Segmented Control</h3>
        <ui-button-group fill connected gap="0">
          <ui-button variant="outline" label="Daily"></ui-button>
          <ui-button variant="primary" label="Weekly"></ui-button>
          <ui-button variant="outline" label="Monthly"></ui-button>
        </ui-button-group>
      </div>
    `,
  },
];

export default function ButtonPage() {
  const dynamicProps = getPropsForComponent('ui-button');
  const mergedProps = dynamicProps.length > 0 ? dynamicProps.map(dp => {
    const localProp = propConfigs.find(lp => lp.name === dp.name);
    if (localProp) {
      return {
        ...dp,
        defaultValue: localProp.defaultValue !== undefined ? localProp.defaultValue : dp.defaultValue,
        options: localProp.options || dp.options,
        type: localProp.type || dp.type,
      };
    }
    return dp;
  }) : propConfigs;

  return (
    <ComponentPlayground
      componentName="Button"
      tagName="ui-button"
      description="The foundational interactive element. Supports pristine, compile-time props and high-fidelity live demos directly from the Stencil package."
      props={mergedProps}
      renderPreview={renderPreview}
      buildCode={buildCode}
      docs={docs}
      examples={examples}
      demoSections={demoSections}
      events={getEventsForComponent('ui-button')}
      methods={getMethodsForComponent('ui-button')}
      slots={getSlotsForComponent('ui-button')}
      parts={getPartsForComponent('ui-button')}
    />
  );
}
