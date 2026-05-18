import { getDemosForComponent, getPropsForComponent } from '../../utils/componentMetadata';
import ComponentPlayground from '../../components/playground/ComponentPlayground';
import type { PropConfig, ExampleConfig, DocSection } from '../../components/playground/ComponentPlayground';

const propConfigs: PropConfig[] = [
  { name: 'placeholder', type: 'string', label: 'Placeholder', defaultValue: 'Select an option', description: 'Placeholder text' },
  { name: 'appearance', type: 'select', label: 'Appearance', defaultValue: 'dropdown', options: ['dropdown', 'button'], description: 'Dropdown appearance style' },
  { name: 'size', type: 'select', label: 'Size', defaultValue: 'md', options: ['sm', 'md', 'lg'], description: 'Dropdown size variant' },
  { name: 'disabled', type: 'boolean', label: 'Disabled', defaultValue: false, description: 'Disables the dropdown' },
  { name: 'searchable', type: 'boolean', label: 'Searchable', defaultValue: false, description: 'Show search/filter input inside menu' },
  { name: 'multiSelect', type: 'boolean', label: 'Multi-Select', defaultValue: false, description: 'Allows selection of multiple options' },
  { name: 'clearable', type: 'boolean', label: 'Clearable', defaultValue: false, description: 'Show clear (✕) button when value is selected' },
  { name: 'options', type: 'json', label: 'Options JSON', defaultValue: [{ value: 'opt1', label: 'Standard Option 1' }, { value: 'opt2', label: 'Standard Option 2' }, { value: 'opt3', label: 'Standard Option 3' }], description: 'Dropdown options as JSON array' },
];

const buildCode = (p: Record<string, any>) => {
  const attrs: string[] = [];
  if (p.placeholder !== 'Select an option') attrs.push(`placeholder="${p.placeholder}"`);
  if (p.appearance !== 'dropdown') attrs.push(`appearance="${p.appearance}"`);
  if (p.size !== 'md') attrs.push(`size="${p.size}"`);
  if (p.disabled) attrs.push('disabled');
  if (p.searchable) attrs.push('searchable');
  if (p.multiSelect) attrs.push('multi-select');
  if (p.clearable) attrs.push('clearable');
  
  const optionsStr = JSON.stringify(p.options || []).replace(/"/g, '&quot;');
  attrs.push(`options="${optionsStr}"`);
  
  return `<ui-dropdown ${attrs.join(' ')}></ui-dropdown>`;
};

const renderPreview = (p: Record<string, any>) => (
  <div style={{ minHeight: '150px' }}>
    <ui-dropdown
      key={JSON.stringify(p)}
      placeholder={p.placeholder}
      appearance={p.appearance}
      size={p.size}
      disabled={p.disabled || undefined}
      searchable={p.searchable || undefined}
      multi-select={p.multiSelect || undefined}
      clearable={p.clearable || undefined}
      options={JSON.stringify(p.options || [])}
    />
  </div>
);

const docs: DocSection[] = [
  {
    title: 'Overview',
    content: `
      <p>The <code>ui-dropdown</code> component is a highly versatile dropdown selector. It supports single-select, multi-select, custom searchable filters, clear action, and is completely keyboard navigable.</p>
    `,
  },
];

const examples: ExampleConfig[] = [];

export default function DropdownPage() {
  const dynamicProps = getPropsForComponent('ui-dropdown');
  const mergedProps = dynamicProps.length > 0 ? dynamicProps.map(dp => {
    const local = propConfigs.find(lp => lp.name === dp.name);
    if (local) return { ...dp, defaultValue: local.defaultValue !== undefined ? local.defaultValue : dp.defaultValue, options: local.options || dp.options, type: local.type || dp.type };
    return dp;
  }) : propConfigs;
  return (
    <ComponentPlayground
      componentName="Dropdown"
      tagName="ui-dropdown"
      description="A clean, state-managed dropdown selector."
      props={mergedProps}
      renderPreview={renderPreview}
      buildCode={buildCode}
      docs={docs}
      examples={examples}
      demoSections={getDemosForComponent('dropdown')}
    />
  );
}
