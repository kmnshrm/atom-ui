import ComponentPlayground from '../../components/playground/ComponentPlayground';
import type { PropConfig, ExampleConfig, DocSection, DemoSection } from '../../components/playground/ComponentPlayground';

const propConfigs: PropConfig[] = [
  // Identity
  { name: 'name', type: 'string', label: 'Name', defaultValue: 'Jane Doe', description: 'Generates initials from this name' },
  { name: 'content', type: 'string', label: 'Content (text)', defaultValue: '', description: 'Override auto-initials with custom text' },
  { name: 'src', type: 'string', label: 'Image URL', defaultValue: '', description: 'URL to the avatar image' },
  { name: 'alt', type: 'string', label: 'Alt Text', defaultValue: '', description: 'Accessible alt for the image' },
  // Appearance
  { name: 'size', type: 'select', label: 'Size', defaultValue: 'md', options: ['xs', 'sm', 'md', 'lg', 'xl', '40', '80', '120'], description: 'Size (named or custom number in px)' },
  { name: 'shape', type: 'select', label: 'Shape', defaultValue: 'circle', options: ['circle', 'square', 'rounded', 'hexagon', 'squircle'], description: 'Avatar shape' },
  { name: 'variant', type: 'select', label: 'Variant', defaultValue: 'default', options: ['default', 'outlined', 'ghost', 'glass'], description: 'Style variant' },
  { name: 'fit', type: 'select', label: 'Image Fit', defaultValue: 'cover', options: ['cover', 'contain', 'fill', 'none'], description: 'CSS object-fit for the image' },
  // Colors
  { name: 'bg-color', type: 'color', label: 'BG Color', defaultValue: '#52c41a', description: 'Background color when no image' },
  { name: 'color', type: 'color', label: 'Text Color', defaultValue: '#ffffff', description: 'Text/icon color' },
  { name: 'auto-color', type: 'boolean', label: 'Auto Color', defaultValue: false, description: 'Auto-generate background from the name' },
  { name: 'gradient', type: 'boolean', label: 'Gradient BG', defaultValue: false, description: 'Use a gradient background' },
  { name: 'gradient-colors', type: 'string', label: 'Gradient Colors', defaultValue: '', description: 'Comma-separated hex colors (e.g. #667eea,#764ba2)' },
  // Status
  { name: 'status', type: 'select', label: 'Status', defaultValue: '', options: ['', 'online', 'offline', 'away', 'busy', 'dnd'], description: 'Presence status' },
  { name: 'show-status', type: 'boolean', label: 'Show Status', defaultValue: false, description: 'Displays the status indicator dot' },
  { name: 'status-position', type: 'select', label: 'Status Position', defaultValue: 'bottom-right', options: ['top-right', 'top-left', 'bottom-right', 'bottom-left'], description: 'Status dot position' },
  { name: 'status-pulse', type: 'boolean', label: 'Status Pulse', defaultValue: false, description: 'Pulsing animation on the status dot' },
  // Badge
  { name: 'badge', type: 'string', label: 'Badge', defaultValue: '', description: 'Badge overlay content' },
  { name: 'badge-position', type: 'select', label: 'Badge Position', defaultValue: 'top-right', options: ['top-right', 'top-left', 'bottom-right', 'bottom-left'], description: 'Badge position' },
  { name: 'badge-color', type: 'color', label: 'Badge Color', defaultValue: '#ff4d4f', description: 'Badge background color' },
  // Features
  { name: 'verified', type: 'boolean', label: 'Verified', defaultValue: false, description: 'Shows a verified checkmark badge' },
  { name: 'clickable', type: 'boolean', label: 'Clickable', defaultValue: false, description: 'Makes the avatar interactive' },
  { name: 'href', type: 'string', label: 'Link URL', defaultValue: '', description: 'Renders avatar as an anchor link' },
  { name: 'tooltip-text', type: 'string', label: 'Tooltip', defaultValue: '', description: 'Hover tooltip text' },
  // Effects
  { name: 'animation', type: 'select', label: 'Animation', defaultValue: 'none', options: ['none', 'pulse', 'bounce', 'ring', 'glow'], description: 'Visual animation effect' },
  { name: 'ring-color', type: 'color', label: 'Ring Color', defaultValue: '#3bf673', description: 'Color for ring/glow animation' },
  { name: 'glass', type: 'boolean', label: 'Glass Effect', defaultValue: false, description: 'Glassmorphism overlay' },
  { name: 'reflection', type: 'boolean', label: 'Reflection', defaultValue: false, description: 'Premium light reflection overlay' },
  { name: 'three-d', type: 'boolean', label: '3D Hover Effect', defaultValue: false, description: 'Perspective 3D tilt on hover' },
  // Story Ring
  { name: 'story', type: 'boolean', label: 'Story Ring', defaultValue: false, description: 'Instagram-style story ring' },
  { name: 'story-seen', type: 'boolean', label: 'Story Seen', defaultValue: false, description: 'Gray ring for seen stories' },
  // States
  { name: 'loading', type: 'boolean', label: 'Loading', defaultValue: false, description: 'Loading spinner overlay' },
  { name: 'skeleton', type: 'boolean', label: 'Skeleton', defaultValue: false, description: 'Shimmer skeleton loading state' },
];

const buildCode = (p: Record<string, any>) => {
  const attrs: string[] = [`name="${p.name}"`];
  if (p.src) attrs.push(`src="${p.src}"`);
  if (p.content) attrs.push(`content="${p.content}"`);
  if (p.size !== 'md') attrs.push(`size="${p.size}"`);
  if (p.shape !== 'circle') attrs.push(`shape="${p.shape}"`);
  if (p.variant !== 'default') attrs.push(`variant="${p.variant}"`);
  if (p['bg-color'] !== '#52c41a') attrs.push(`bg-color="${p['bg-color']}"`);
  if (p['auto-color']) attrs.push('auto-color');
  if (p.gradient) attrs.push('gradient');
  if (p['gradient-colors']) attrs.push(`gradient-colors="${p['gradient-colors']}"`);
  if (p.status) attrs.push(`status="${p.status}"`);
  if (p['show-status']) attrs.push('show-status');
  if (p['status-pulse']) attrs.push('status-pulse');
  if (p.badge) attrs.push(`badge="${p.badge}"`);
  if (p.verified) attrs.push('verified');
  if (p.animation !== 'none') attrs.push(`animation="${p.animation}"`);
  if (p.glass) attrs.push('glass');
  if (p.reflection) attrs.push('reflection');
  if (p['three-d']) attrs.push('three-d');
  if (p.story) attrs.push('story');
  if (p['story-seen']) attrs.push('story-seen');
  if (p.loading) attrs.push('loading');
  if (p.skeleton) attrs.push('skeleton');
  return `<ui-avatar\n  ${attrs.join('\n  ')}\n></ui-avatar>`;
};

const renderPreview = (p: Record<string, any>) => (
  <ui-avatar
    key={JSON.stringify(p)}
    name={p.name}
    src={p.src || undefined}
    content={p.content || undefined}
    size={p.size}
    shape={p.shape}
    variant={p.variant}
    fit={p.fit}
    bg-color={p['bg-color']}
    color={p.color}
    auto-color={p['auto-color'] || undefined}
    gradient={p.gradient || undefined}
    gradient-colors={p['gradient-colors'] || undefined}
    status={p.status || undefined}
    show-status={p['show-status'] || undefined}
    status-position={p['status-position']}
    status-pulse={p['status-pulse'] || undefined}
    badge={p.badge || undefined}
    badge-position={p['badge-position']}
    badge-color={p['badge-color']}
    verified={p.verified || undefined}
    clickable={p.clickable || undefined}
    href={p.href || undefined}
    tooltip-text={p['tooltip-text'] || undefined}
    animation={p.animation !== 'none' ? p.animation : undefined}
    ring-color={p['ring-color']}
    glass={p.glass || undefined}
    reflection={p.reflection || undefined}
    three-d={p['three-d'] || undefined}
    story={p.story || undefined}
    story-seen={p['story-seen'] || undefined}
    loading={p.loading || undefined}
    skeleton={p.skeleton || undefined}
  />
);

const docs: DocSection[] = [
  {
    title: 'Overview',
    content: `
      <p>The <code>ui-avatar</code> component is a full-featured user avatar with 33 props. It supports images, initials, icons, status indicators, story rings, group mode, and many premium visual effects.</p>
      <h3>Fallback Hierarchy</h3>
      <ul>
        <li>Image (<code>src</code>) is shown first</li>
        <li>If the image fails to load, initials are generated from <code>name</code></li>
        <li>Custom <code>content</code> overrides auto-initials</li>
        <li>If nothing matches, a fallback icon is shown</li>
      </ul>
      <h3>Group Mode</h3>
      <p>Set <code>group</code> to true and pass an array to <code>avatars</code> to render a stacked avatar group with overflow count and popover.</p>
      <h3>Events</h3>
      <ul>
        <li><code>avatarClick</code> — Emitted when clicked (requires <code>clickable</code>)</li>
        <li><code>avatarUpload</code> — Emitted when file is uploaded (requires <code>editable</code>)</li>
        <li><code>avatarError</code> — Emitted when image fails to load</li>
      </ul>
    `,
  },
];

const examples: ExampleConfig[] = [
  {
    title: 'Status Indicators',
    description: 'Avatars with presence indicators',
    code: `<ui-avatar name="Alice Chen" status="online" show-status size="lg"></ui-avatar>
<ui-avatar name="Bob Smith" status="away" show-status size="lg"></ui-avatar>
<ui-avatar name="Carol J" status="busy" show-status size="lg"></ui-avatar>
<ui-avatar name="Dave W" status="offline" show-status size="lg"></ui-avatar>`,
    render: () => (
      <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
        {[['Alice Chen', 'online'], ['Bob Smith', 'away'], ['Carol J', 'busy'], ['Dave W', 'offline']].map(([name, status]) => (
          <div key={name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
            <ui-avatar name={name} status={status} show-status size="lg" />
            <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)' }}>{status}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    title: 'All Shapes',
    description: 'Circle, square, rounded, hexagon, squircle',
    code: `<ui-avatar name="Alex" size="xl" shape="circle"></ui-avatar>
<ui-avatar name="Alex" size="xl" shape="rounded"></ui-avatar>
<ui-avatar name="Alex" size="xl" shape="square"></ui-avatar>
<ui-avatar name="Alex" size="xl" shape="hexagon"></ui-avatar>
<ui-avatar name="Alex" size="xl" shape="squircle"></ui-avatar>`,
    render: () => (
      <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', alignItems: 'center' }}>
        {['circle', 'rounded', 'square', 'hexagon', 'squircle'].map(s => (
          <div key={s} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
            <ui-avatar name="Alex" size="xl" shape={s} />
            <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)' }}>{s}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    title: 'Premium Effects',
    description: 'Glass, reflection, 3D, and gradient',
    code: `<ui-avatar name="Ana" size="xl" glass gradient gradient-colors="#667eea,#764ba2"></ui-avatar>
<ui-avatar name="Ben" size="xl" reflection gradient gradient-colors="#f093fb,#f5576c"></ui-avatar>
<ui-avatar name="Cat" size="xl" three-d animation="ring"></ui-avatar>`,
    render: () => (
      <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center' }}>
        <ui-avatar name="Ana" size="xl" glass gradient gradient-colors="#667eea,#764ba2" />
        <ui-avatar name="Ben" size="xl" reflection gradient gradient-colors="#f093fb,#f5576c" />
        <ui-avatar name="Cat" size="xl" three-d animation="ring" />
      </div>
    ),
  },
  {
    title: 'Story Ring',
    description: 'Instagram-style story rings',
    code: `<ui-avatar name="Lily" size="xl" story></ui-avatar>
<ui-avatar name="Mark" size="xl" story story-seen></ui-avatar>`,
    render: () => (
      <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
          <ui-avatar name="Lily" size="xl" story />
          <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)' }}>Unseen</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
          <ui-avatar name="Mark" size="xl" story story-seen />
          <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)' }}>Seen</span>
        </div>
      </div>
    ),
  },
  {
    title: 'Auto Color from Name',
    description: 'Automatically generates a distinct color for each name',
    code: `<ui-avatar name="Alice Brown" auto-color size="lg"></ui-avatar>
<ui-avatar name="Charlie Davis" auto-color size="lg"></ui-avatar>
<ui-avatar name="Eve Martinez" auto-color size="lg"></ui-avatar>`,
    render: () => (
      <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
        {['Alice Brown', 'Charlie Davis', 'Eve Martinez', 'Frank White', 'Grace Lee'].map(n => (
          <ui-avatar key={n} name={n} auto-color size="lg" />
        ))}
      </div>
    ),
  },
  {
    title: 'Verified + Badge',
    description: 'Avatar with verified tick and notification badge',
    code: `<ui-avatar name="Kate Admin" size="xl" verified badge="3" show-status status="online"></ui-avatar>`,
    render: () => (
      <ui-avatar name="Kate Admin" size="xl" verified badge="3" show-status status="online" />
    ),
  },
];


const demoSections: DemoSection[] = [
  {
    title: 'Visual Styles',
    description: 'Shapes, sizes, image sources, and system states',
    html: `
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(360px,1fr));gap:32px;">
        <div class="demo-card">
          <h4>Geometric Shapes</h4>
          <div style="display:flex;gap:24px;align-items:center;flex-wrap:wrap;">
            <div style="text-align:center;"><ui-avatar src="https://i.pravatar.cc/150?img=1" shape="circle" size="l"></ui-avatar><p style="font-size:10px;margin-top:6px;opacity:0.5;">CIRCLE</p></div>
            <div style="text-align:center;"><ui-avatar src="https://i.pravatar.cc/150?img=2" shape="squircle" size="l"></ui-avatar><p style="font-size:10px;margin-top:6px;opacity:0.5;">SQUIRCLE</p></div>
            <div style="text-align:center;"><ui-avatar src="https://i.pravatar.cc/150?img=3" shape="hexagon" size="l"></ui-avatar><p style="font-size:10px;margin-top:6px;opacity:0.5;">HEXAGON</p></div>
            <div style="text-align:center;"><ui-avatar src="https://i.pravatar.cc/150?img=4" shape="square" size="l"></ui-avatar><p style="font-size:10px;margin-top:6px;opacity:0.5;">SQUARE</p></div>
          </div>
        </div>
        <div class="demo-card">
          <h4>Sizing Scale</h4>
          <div style="display:flex;gap:16px;align-items:flex-end;flex-wrap:wrap;">
            <div style="text-align:center;"><ui-avatar src="https://i.pravatar.cc/150?img=5" size="xs"></ui-avatar><p style="font-size:9px;">XS</p></div>
            <div style="text-align:center;"><ui-avatar src="https://i.pravatar.cc/150?img=5" size="s"></ui-avatar><p style="font-size:9px;">S</p></div>
            <div style="text-align:center;"><ui-avatar src="https://i.pravatar.cc/150?img=5" size="m"></ui-avatar><p style="font-size:9px;">M</p></div>
            <div style="text-align:center;"><ui-avatar src="https://i.pravatar.cc/150?img=5" size="l"></ui-avatar><p style="font-size:9px;">L</p></div>
            <div style="text-align:center;"><ui-avatar src="https://i.pravatar.cc/150?img=5" size="xl"></ui-avatar><p style="font-size:9px;">XL</p></div>
            <div style="text-align:center;"><ui-avatar src="https://i.pravatar.cc/150?img=5" size="120"></ui-avatar><p style="font-size:9px;">120px</p></div>
          </div>
        </div>
        <div class="demo-card">
          <h4>Source Types</h4>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
            <div style="display:flex;align-items:center;gap:10px;"><ui-avatar src="https://i.pravatar.cc/150?img=6" size="m"></ui-avatar><div><strong style="font-size:12px;">Image</strong><p style="font-size:10px;margin:0;opacity:0.5;">Remote URL</p></div></div>
            <div style="display:flex;align-items:center;gap:10px;"><ui-avatar name="Steve Rogers" size="m" auto-color="true"></ui-avatar><div><strong style="font-size:12px;">Initials</strong><p style="font-size:10px;margin:0;opacity:0.5;">Auto-Generated</p></div></div>
            <div style="display:flex;align-items:center;gap:10px;"><ui-avatar icon="bell" icon-library="lucide" bg-color="#10b981" size="m"></ui-avatar><div><strong style="font-size:12px;">Icon</strong><p style="font-size:10px;margin:0;opacity:0.5;">Lucide Library</p></div></div>
            <div style="display:flex;align-items:center;gap:10px;"><ui-avatar loading="true" size="m"></ui-avatar><div><strong style="font-size:12px;">Loading</strong><p style="font-size:10px;margin:0;opacity:0.5;">Spinner state</p></div></div>
          </div>
        </div>
      </div>
    `,
  },
  {
    title: 'Presence &amp; Status',
    description: 'Online/away/busy status indicators with pulse and position control',
    html: `
      <div class="demo-card">
        <h4>Semantic Presence Indicators</h4>
        <div style="display:flex;gap:24px;align-items:center;flex-wrap:wrap;">
          <div style="text-align:center;"><ui-avatar src="https://i.pravatar.cc/150?img=11" size="l" show-status="true" status="online" tooltip-text="Online"></ui-avatar><p style="font-size:10px;margin-top:6px;opacity:0.5;">ONLINE</p></div>
          <div style="text-align:center;"><ui-avatar src="https://i.pravatar.cc/150?img=12" size="l" show-status="true" status="away" tooltip-text="Away"></ui-avatar><p style="font-size:10px;margin-top:6px;opacity:0.5;">AWAY</p></div>
          <div style="text-align:center;"><ui-avatar src="https://i.pravatar.cc/150?img=13" size="l" show-status="true" status="busy" tooltip-text="Busy"></ui-avatar><p style="font-size:10px;margin-top:6px;opacity:0.5;">BUSY</p></div>
          <div style="text-align:center;"><ui-avatar src="https://i.pravatar.cc/150?img=14" size="l" show-status="true" status="dnd"></ui-avatar><p style="font-size:10px;margin-top:6px;opacity:0.5;">DND</p></div>
          <div style="text-align:center;"><ui-avatar src="https://i.pravatar.cc/150?img=15" size="l" show-status="true" status="offline"></ui-avatar><p style="font-size:10px;margin-top:6px;opacity:0.5;">OFFLINE</p></div>
        </div>
      </div>
      <div class="demo-card" style="margin-top:24px;">
        <h4>Positioning Logic (TR / TL / BL / BR)</h4>
        <div style="display:flex;gap:24px;">
          <ui-avatar src="https://i.pravatar.cc/150?img=20" size="l" show-status="true" status="online" status-position="top-right"></ui-avatar>
          <ui-avatar src="https://i.pravatar.cc/150?img=20" size="l" show-status="true" status="online" status-position="top-left"></ui-avatar>
          <ui-avatar src="https://i.pravatar.cc/150?img=20" size="l" show-status="true" status="online" status-position="bottom-left"></ui-avatar>
          <ui-avatar src="https://i.pravatar.cc/150?img=20" size="l" show-status="true" status="online" status-position="bottom-right"></ui-avatar>
        </div>
      </div>
    `,
  },
  {
    title: 'Social &amp; Premium Effects',
    description: 'Story rings, verified badges, glass, reflection, 3D, and gradients',
    html: `
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(360px,1fr));gap:32px;">
        <div class="demo-card">
          <h4>Instagram Story Rings</h4>
          <div style="display:flex;gap:32px;align-items:center;flex-wrap:wrap;">
            <div style="text-align:center;"><ui-avatar src="https://i.pravatar.cc/150?img=21" size="xl" story="true"></ui-avatar><p style="font-size:10px;margin-top:8px;opacity:0.5;">NEW STORY</p></div>
            <div style="text-align:center;"><ui-avatar src="https://i.pravatar.cc/150?img=22" size="xl" story="true" story-seen="true"></ui-avatar><p style="font-size:10px;margin-top:8px;opacity:0.5;">SEEN</p></div>
          </div>
        </div>
        <div class="demo-card">
          <h4>Premium Effects Suite</h4>
          <div style="display:flex;gap:24px;flex-wrap:wrap;align-items:center;">
            <div style="display:flex;align-items:center;gap:10px;"><ui-avatar src="https://i.pravatar.cc/150?img=24" size="m" verified="true"></ui-avatar><span style="font-size:11px;opacity:0.7;">VERIFIED</span></div>
            <div style="display:flex;align-items:center;gap:10px;"><ui-avatar src="https://i.pravatar.cc/150?img=25" size="m" reflection="true"></ui-avatar><span style="font-size:11px;opacity:0.7;">REFLECTION</span></div>
            <div style="display:flex;align-items:center;gap:10px;"><ui-avatar src="https://i.pravatar.cc/150?img=26" size="m" glass="true"></ui-avatar><span style="font-size:11px;opacity:0.7;">GLASS</span></div>
            <div style="display:flex;align-items:center;gap:10px;"><ui-avatar src="https://i.pravatar.cc/150?img=27" size="m" three-d="true"></ui-avatar><span style="font-size:11px;opacity:0.7;">3D HOVER</span></div>
          </div>
        </div>
        <div class="demo-card" style="background:#0f172a;border:none;">
          <h4 style="color:rgba(255,255,255,0.9);">Dark Theme Animations</h4>
          <div style="display:flex;gap:32px;align-items:center;">
            <ui-avatar gradient="true" gradient-colors="#f43f5e,#fb923c" shape="squircle" size="xl" content="★"></ui-avatar>
            <ui-avatar animation="glow" ring-color="#10b981" src="https://i.pravatar.cc/150?img=30" size="xl"></ui-avatar>
            <ui-avatar animation="ring" ring-color="#ec4899" src="https://i.pravatar.cc/150?img=31" size="xl"></ui-avatar>
          </div>
        </div>
      </div>
    `,
  },
  {
    title: 'Avatar Groups',
    description: 'Managed stacking with overflow count and responsive grid',
    html: `
      <div class="demo-card">
        <h4>Managed Stacking (Hover to shift)</h4>
        <p style="opacity:0.5;font-size:13px;margin-bottom:16px;">Excess avatars collapse into a +N overflow counter.</p>
        <ui-avatar group="true" size="xl" max-visible="4" animated="true">
          <ui-avatar name="Alice Miller" src="https://i.pravatar.cc/150?img=31"></ui-avatar>
          <ui-avatar name="Bob Smith" src="https://i.pravatar.cc/150?img=32" status="online" show-status="true"></ui-avatar>
          <ui-avatar name="Charlie Brown" src="https://i.pravatar.cc/150?img=33"></ui-avatar>
          <ui-avatar name="David Grey" src="https://i.pravatar.cc/150?img=34"></ui-avatar>
          <ui-avatar name="Eve Wilson" src="https://i.pravatar.cc/150?img=35"></ui-avatar>
          <ui-avatar name="Frank Castle" src="https://i.pravatar.cc/150?img=36"></ui-avatar>
        </ui-avatar>
      </div>
      <div class="demo-card" style="margin-top:24px;">
        <h4>Squircle Bordered Group</h4>
        <ui-avatar group="true" size="l" shape="squircle" group-border-color="#10b981" group-border-width="3">
          <ui-avatar name="User A"></ui-avatar>
          <ui-avatar name="User B" auto-color="true"></ui-avatar>
          <ui-avatar name="User C"></ui-avatar>
          <ui-avatar name="User D" auto-color="true"></ui-avatar>
          <ui-avatar name="User E"></ui-avatar>
        </ui-avatar>
      </div>
    `,
  },
];

export default function AvatarPage() {
  return (
    <ComponentPlayground
      componentName="Avatar"
      tagName="ui-avatar"
      description="A full-featured user avatar with 33 props: images, initials, status indicators, badges, story rings, animations, glass/3D effects, and group mode."
      props={propConfigs}
      renderPreview={renderPreview}
      buildCode={buildCode}
      docs={docs}
      examples={examples}
      demoSections={demoSections}
    />
  );
}
