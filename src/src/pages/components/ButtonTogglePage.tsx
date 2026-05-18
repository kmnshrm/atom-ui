import { getDemosForComponent } from '../../utils/componentMetadata';
import ComponentPlayground from '../../components/playground/ComponentPlayground';
import type { PropConfig, ExampleConfig, DocSection } from '../../components/playground/ComponentPlayground';

const propConfigs: PropConfig[] = [
  { name: 'label', type: 'string', label: 'Label', defaultValue: 'Toggle Button', description: 'Toggle label text' },
  { name: 'value', type: 'string', label: 'Value', defaultValue: 'toggle-value', description: 'Underlying toggle value' },
  { name: 'icon', type: 'string', label: 'Icon', defaultValue: 'star', description: 'Lucide icon name' },
  { name: 'iconPosition', type: 'select', label: 'Icon Position', defaultValue: 'left', options: ['left', 'right', 'top'], description: 'Icon position relative to label' },
  { name: 'variant', type: 'select', label: 'Variant', defaultValue: 'soft', options: ['classic', 'filled', 'outlined', 'soft', 'solid', 'surface', 'text'], description: 'Visual variant style' },
  { name: 'color', type: 'select', label: 'Color', defaultValue: 'primary', options: ['primary', 'secondary', 'success', 'warning', 'danger', 'info'], description: 'Accent color' },
  { name: 'size', type: 'select', label: 'Size', defaultValue: 'medium', options: ['small', 'medium', 'large'], description: 'Toggle button size' },
  { name: 'shape', type: 'select', label: 'Shape', defaultValue: 'rectangle', options: ['circle', 'pill', 'rectangle', 'round', 'square'], description: 'Corner shape style' },
  { name: 'selected', type: 'boolean', label: 'Selected', defaultValue: false, description: 'Selected/active state' },
  { name: 'disabled', type: 'boolean', label: 'Disabled', defaultValue: false, description: 'Disables the toggle button' },
];

const buildCode = (p: Record<string, any>) => {
  const attrs: string[] = [];
  if (p.value) attrs.push(`value="${p.value}"`);
  if (p.icon) attrs.push(`icon="${p.icon}"`);
  if (p.iconPosition !== 'left') attrs.push(`icon-position="${p.iconPosition}"`);
  if (p.variant !== 'soft') attrs.push(`variant="${p.variant}"`);
  if (p.color !== 'primary') attrs.push(`color="${p.color}"`);
  if (p.size !== 'medium') attrs.push(`size="${p.size}"`);
  if (p.shape !== 'rectangle') attrs.push(`shape="${p.shape}"`);
  if (p.selected) attrs.push('selected');
  if (p.disabled) attrs.push('disabled');
  
  return `<ui-button-toggle ${attrs.join(' ')}>\n  ${p.label}\n</ui-button-toggle>`;
};

const renderPreview = (p: Record<string, any>) => (
  <ui-button-toggle
    key={JSON.stringify(p)}
    value={p.value}
    icon={p.icon}
    icon-position={p.iconPosition}
    variant={p.variant}
    color={p.color}
    size={p.size}
    shape={p.shape}
    selected={p.selected || undefined}
    disabled={p.disabled || undefined}
  >
    {p.label}
  </ui-button-toggle>
);

const docs: DocSection[] = [
  {
    title: 'Overview',
    content: `
      <p>The <code>ui-button-toggle</code> component behaves similarly to a radio button or checkbox styled as a rich button. Toggle buttons can be grouped together using <code>ui-button-toggle-group</code> to construct premium segmented controls, tab-like configurations, or filter groups.</p>
    `,
  },
];

const examples: ExampleConfig[] = [];

export default function ButtonTogglePage() {
  return (
    <ComponentPlayground
      componentName="Button Toggle"
      tagName="ui-button-toggle"
      description="An interactive toggle control styled as a button."
      props={propConfigs}
      renderPreview={renderPreview}
      buildCode={buildCode}
      docs={docs}
      examples={examples}
      demoSections={getDemosForComponent('button-toggle')}
    />
  );
}
