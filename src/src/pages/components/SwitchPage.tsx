import { getPropsForComponent, getDemosForComponent, getEventsForComponent, getMethodsForComponent, getSlotsForComponent, getPartsForComponent } from '../../utils/componentMetadata';
import ComponentPlayground from '../../components/playground/ComponentPlayground';
import type { PropConfig, ExampleConfig, DocSection } from '../../components/playground/ComponentPlayground';

const propConfigs: PropConfig[] = [
  { name: 'checked', type: 'boolean', label: 'Checked', defaultValue: false, description: 'Toggle on/off state' },
  { name: 'label', type: 'string', label: 'Label', defaultValue: 'Enable feature', description: 'Switch label' },
  { name: 'size', type: 'select', label: 'Size', defaultValue: 'md', options: ['sm', 'md', 'lg'], description: 'Switch size' },
  { name: 'color', type: 'select', label: 'Color', defaultValue: 'success', options: ['primary', 'success', 'warning', 'danger'], description: 'Accent color when checked' },
  { name: 'disabled', type: 'boolean', label: 'Disabled', defaultValue: false, description: 'Prevents interaction' },
  { name: 'helper-text', type: 'string', label: 'Helper Text', defaultValue: '', description: 'Additional context text' },
  { name: 'label-position', type: 'select', label: 'Label Position', defaultValue: 'right', options: ['left', 'right'], description: 'Where the label appears' },
];

const buildCode = (p: Record<string, any>) => {
  const attrs: string[] = [`label="${p.label}"`, `color="${p.color}"`, `size="${p.size}"`, `label-position="${p['label-position']}"`];
  if (p.checked) attrs.push('checked');
  if (p.disabled) attrs.push('disabled');
  if (p['helper-text']) attrs.push(`helper-text="${p['helper-text']}"`);
  return `<ui-switch ${attrs.join(' ')}></ui-switch>`;
};

const renderPreview = (p: Record<string, any>) => (
  <ui-switch
    key={JSON.stringify(p)}
    label={p.label}
    checked={p.checked || undefined}
    size={p.size}
    color={p.color}
    disabled={p.disabled || undefined}
    helper-text={p['helper-text'] || undefined}
    label-position={p['label-position']}
  />
);

const docs: DocSection[] = [
  {
    title: 'Overview',
    content: `
      <p>The <code>ui-switch</code> component is a toggle control for binary options. It is semantically equivalent to a checkbox but optimized for settings UIs.</p>
      <h3>Events</h3>
      <ul>
        <li><code>uiChange</code> — Fires when the state changes with <code>detail.checked</code></li>
      </ul>
    `,
  },
];

const examples: ExampleConfig[] = [
  {
    title: 'Settings Panel',
    description: 'Typical use in a settings form',
    code: `<ui-switch label="Dark Mode" checked color="primary"></ui-switch>
<ui-switch label="Notifications" checked color="success"></ui-switch>
<ui-switch label="Analytics" color="success"></ui-switch>
<ui-switch label="Beta Features" color="warning"></ui-switch>`,
    render: () => (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <ui-switch label="Dark Mode" checked color="primary" />
        <ui-switch label="Notifications" checked color="success" />
        <ui-switch label="Analytics" color="success" />
        <ui-switch label="Beta Features" color="warning" />
      </div>
    ),
  },
  {
    title: 'All Sizes',
    description: 'Small, medium, and large sizes',
    code: `<ui-switch label="Small" size="sm" checked color="success"></ui-switch>
<ui-switch label="Medium" size="md" checked color="success"></ui-switch>
<ui-switch label="Large" size="lg" checked color="success"></ui-switch>`,
    render: () => (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {['sm', 'md', 'lg'].map(s => (
          <ui-switch key={s} label={s.toUpperCase()} size={s} checked color="success" />
        ))}
      </div>
    ),
  },
];

export default function SwitchPage() {
  const dynamicProps = getPropsForComponent('ui-switch');
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
      componentName="Switch"
      tagName="ui-switch"
      description="A binary toggle control ideal for settings and feature flags."
      props={mergedProps}
      renderPreview={renderPreview}
      buildCode={buildCode}
      docs={docs}
      examples={examples}
      demoSections={getDemosForComponent('switch')}
      events={getEventsForComponent('ui-switch')}
      methods={getMethodsForComponent('ui-switch')}
      slots={getSlotsForComponent('ui-switch')}
      parts={getPartsForComponent('ui-switch')}
    />
  );
}
