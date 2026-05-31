import { getDemosForComponent, getEventsForComponent, getMethodsForComponent, getSlotsForComponent, getPartsForComponent } from '../../utils/componentMetadata';
import ComponentPlayground from '../../components/playground/ComponentPlayground';
import type { PropConfig, ExampleConfig, DocSection } from '../../components/playground/ComponentPlayground';

const propConfigs: PropConfig[] = [
  // Content
  { name: 'name', type: 'string', label: 'Name', defaultValue: 'radio-group', description: 'Form input name for the radio group' },
  { name: 'value', type: 'string', label: 'Value', defaultValue: 'option1', description: 'Value of the radio button' },
  { name: 'label', type: 'string', label: 'Label', defaultValue: 'Radio Option', description: 'Text label' },
  { name: 'description', type: 'string', label: 'Description', defaultValue: '', description: 'Secondary descriptive text' },
  // Appearance
  { name: 'color', type: 'select', label: 'Color', defaultValue: 'primary', options: ['primary', 'secondary', 'success', 'warning', 'danger', 'info'], description: 'Accent color' },
  { name: 'size', type: 'select', label: 'Size', defaultValue: 'md', options: ['sm', 'md', 'lg'], description: 'Size of the radio button' },
  { name: 'variant', type: 'select', label: 'Variant', defaultValue: 'default', options: ['default', 'outline', 'filled', 'card'], description: 'Visual style' },
  // States
  { name: 'checked', type: 'boolean', label: 'Checked', defaultValue: false, description: 'Whether the radio is selected' },
  { name: 'disabled', type: 'boolean', label: 'Disabled', defaultValue: false, description: 'Disables the radio button' },
  { name: 'readonly', type: 'boolean', label: 'Readonly', defaultValue: false, description: 'Makes the radio button read-only' },
  { name: 'required', type: 'boolean', label: 'Required', defaultValue: false, description: 'Marks the input as required' },
  { name: 'error', type: 'boolean', label: 'Error', defaultValue: false, description: 'Shows error state' },
];

const buildCode = (p: Record<string, any>) => {
  const attrs: string[] = [];
  if (p.name) attrs.push(`name="${p.name}"`);
  if (p.value) attrs.push(`value="${p.value}"`);
  if (p.color !== 'primary') attrs.push(`color="${p.color}"`);
  if (p.size !== 'md') attrs.push(`size="${p.size}"`);
  if (p.variant !== 'default') attrs.push(`variant="${p.variant}"`);
  if (p.checked) attrs.push('checked');
  if (p.disabled) attrs.push('disabled');
  if (p.readonly) attrs.push('readonly');
  if (p.required) attrs.push('required');
  if (p.error) attrs.push('error');
  if (p.description) attrs.push(`description="${p.description}"`);
  
  return `<ui-radio ${attrs.join(' ')}>\n  ${p.label}\n</ui-radio>`;
};

const renderPreview = (p: Record<string, any>) => (
  <ui-radio
    key={JSON.stringify(p)}
    name={p.name}
    value={p.value}
    color={p.color}
    size={p.size}
    variant={p.variant}
    checked={p.checked || undefined}
    disabled={p.disabled || undefined}
    readonly={p.readonly || undefined}
    required={p.required || undefined}
    error={p.error || undefined}
    description={p.description || undefined}
  >
    {p.label}
  </ui-radio>
);

const docs: DocSection[] = [
  {
    title: 'Overview',
    content: `
      <p>The <code>ui-radio</code> component allows users to select a single option from a mutually exclusive group. It should be used in conjunction with <code>ui-radio-group</code> for proper accessibility and keyboard navigation.</p>
    `,
  },
];

const examples: ExampleConfig[] = [
  {
    title: 'Colors',
    description: 'Radio buttons in different accent colors',
    code: `<ui-radio color="primary" checked>Primary</ui-radio>
<ui-radio color="success" checked>Success</ui-radio>
<ui-radio color="danger" checked>Danger</ui-radio>`,
    render: () => (
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <ui-radio color="primary" checked>Primary</ui-radio>
        <ui-radio color="success" checked>Success</ui-radio>
        <ui-radio color="danger" checked>Danger</ui-radio>
      </div>
    ),
  },
];

export default function RadioPage() {
  return (
    <ComponentPlayground
      componentName="Radio"
      tagName="ui-radio"
      description="A mutually exclusive selection control."
      props={propConfigs}
      renderPreview={renderPreview}
      buildCode={buildCode}
      docs={docs}
      examples={examples}
      demoSections={getDemosForComponent('radio')}
      events={getEventsForComponent('ui-radio')}
      methods={getMethodsForComponent('ui-radio')}
      slots={getSlotsForComponent('ui-radio')}
      parts={getPartsForComponent('ui-radio')}
    />
  );
}
