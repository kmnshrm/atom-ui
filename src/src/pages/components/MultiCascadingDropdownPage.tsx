import { getDemosForComponent, getPropsForComponent, getEventsForComponent, getMethodsForComponent, getSlotsForComponent, getPartsForComponent } from '../../utils/componentMetadata';
import ComponentPlayground from '../../components/playground/ComponentPlayground';
import type { PropConfig, ExampleConfig, DocSection } from '../../components/playground/ComponentPlayground';

const propConfigs: PropConfig[] = [
  { name: 'placeholder', type: 'string', label: 'Placeholder', defaultValue: 'Select categories...', description: 'Placeholder text' },
  { name: 'disabled', type: 'boolean', label: 'Disabled', defaultValue: false, description: 'Disables the dropdown' },
  { name: 'options', type: 'json', label: 'Options JSON', defaultValue: [
    {
      label: 'Electronics',
      value: 'electronics',
      children: [
        {
          label: 'Computers',
          value: 'computers',
          children: [
            { label: 'Laptops', value: 'laptops' },
            { label: 'Desktops', value: 'desktops' }
          ]
        },
        {
          label: 'Phones',
          value: 'phones',
          children: [
            { label: 'Smartphones', value: 'smartphones' },
            { label: 'Feature Phones', value: 'feature-phones' }
          ]
        }
      ]
    },
    {
      label: 'Home & Kitchen',
      value: 'home',
      children: [
        { label: 'Furniture', value: 'furniture' },
        { label: 'Appliances', value: 'appliances' }
      ]
    }
  ], description: 'Hierarchical dropdown options as JSON array' },
];

const buildCode = (p: Record<string, any>) => {
  const attrs: string[] = [];
  if (p.placeholder !== 'Select categories...') attrs.push(`placeholder="${p.placeholder}"`);
  if (p.disabled) attrs.push('disabled');
  
  const optionsStr = JSON.stringify(p.options || []).replace(/"/g, '&quot;');
  attrs.push(`options="${optionsStr}"`);
  
  return `<ui-multi-cascading-dropdown ${attrs.join(' ')}></ui-multi-cascading-dropdown>`;
};

const renderPreview = (p: Record<string, any>) => (
  <div style={{ minHeight: '350px' }}>
    <ui-multi-cascading-dropdown
      key={JSON.stringify(p)}
      placeholder={p.placeholder}
      disabled={p.disabled || undefined}
      options={JSON.stringify(p.options || [])}
    />
  </div>
);

const docs: DocSection[] = [
  {
    title: 'Overview',
    content: `
      <p>The <code>ui-multi-cascading-dropdown</code> component is an advanced dropdown selector. It handles deeply nested hierarchical data, opening submenus dynamically as context menus. It also fully manages recursive multi-select checkbox states (including indeterminate modes) automatically.</p>
    `,
  },
];

const examples: ExampleConfig[] = [];

export default function MultiCascadingDropdownPage() {
  const dynamicProps = getPropsForComponent('ui-multi-cascading-dropdown');
  const mergedProps = dynamicProps.length > 0 ? dynamicProps.map(dp => {
    const local = propConfigs.find(lp => lp.name === dp.name);
    if (local) return { ...dp, defaultValue: local.defaultValue !== undefined ? local.defaultValue : dp.defaultValue, options: local.options || dp.options, type: local.type || dp.type };
    return dp;
  }) : propConfigs;
  return (
    <ComponentPlayground
      componentName="Multi-Cascading Dropdown"
      tagName="ui-multi-cascading-dropdown"
      description="A sophisticated multi-level cascading dropdown with recursive selection logic."
      props={mergedProps}
      renderPreview={renderPreview}
      buildCode={buildCode}
      docs={docs}
      examples={examples}
      demoSections={getDemosForComponent('multi-cascading-dropdown')}
      events={getEventsForComponent('ui-multi-cascading-dropdown')}
      methods={getMethodsForComponent('ui-multi-cascading-dropdown')}
      slots={getSlotsForComponent('ui-multi-cascading-dropdown')}
      parts={getPartsForComponent('ui-multi-cascading-dropdown')}
    />
  );
}
