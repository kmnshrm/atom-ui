import { getPropsForComponent, getDemosForComponent } from '../../utils/componentMetadata';
import ComponentPlayground from '../../components/playground/ComponentPlayground';
import type { PropConfig, ExampleConfig, DocSection } from '../../components/playground/ComponentPlayground';

const propConfigs: PropConfig[] = [
  // JSON Config
  { name: 'items', type: 'json', label: 'Items JSON', defaultValue: [{ id: '1', title: 'Item 1', content: 'Content for item 1' }, { id: '2', title: 'Item 2', content: 'Content for item 2' }], description: 'Array of accordion items' },
  // Appearance
  { name: 'variant', type: 'select', label: 'Variant', defaultValue: 'default', options: ['default', 'bordered', 'splitted', 'light', 'shadow', 'card', 'headline'], description: 'Visual style' },
  { name: 'size', type: 'select', label: 'Size', defaultValue: 'md', options: ['sm', 'md', 'lg'], description: 'Size of the accordion' },
  { name: 'theme', type: 'select', label: 'Theme', defaultValue: 'default', options: ['default', 'glass', 'radiant'], description: 'Premium theme options' },
  // Behavior
  { name: 'multiple', type: 'boolean', label: 'Multiple', defaultValue: false, description: 'Allow multiple items open simultaneously' },
  { name: 'enableSearch', type: 'boolean', label: 'Enable Search', defaultValue: false, description: 'Show search bar to filter items' },
];

const buildCode = (p: Record<string, any>) => {
  const attrs: string[] = [];
  if (p.variant !== 'default') attrs.push(`variant="${p.variant}"`);
  if (p.size !== 'md') attrs.push(`size="${p.size}"`);
  if (p.theme !== 'default') attrs.push(`theme="${p.theme}"`);
  if (p.multiple) attrs.push('multiple');
  if (p.enableSearch) attrs.push('enable-search');
  
  const itemsStr = JSON.stringify(p.items || []).replace(/"/g, '&quot;');
  attrs.push(`items="${itemsStr}"`);
  
  return `<ui-accordion ${attrs.join(' ')}></ui-accordion>`;
};

const renderPreview = (p: Record<string, any>) => (
  <ui-accordion
    key={JSON.stringify(p)}
    items={JSON.stringify(p.items || [])}
    variant={p.variant}
    size={p.size}
    theme={p.theme}
    multiple={p.multiple || undefined}
    enable-search={p.enableSearch || undefined}
  />
);

const docs: DocSection[] = [
  {
    title: 'Overview',
    content: `
      <p>The <code>ui-accordion</code> component allows users to toggle the display of sections of content. It supports single or multiple open items, rich themes, search filtering, and named slots for complex React component rendering.</p>
    `,
  },
];

const examples: ExampleConfig[] = [];

export default function AccordionPage() {
  const dynamicProps = getPropsForComponent('ui-accordion');
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
      componentName="Accordion"
      tagName="ui-accordion"
      description="A vertically stacked set of interactive headings that each reveal an associated section of content."
      props={mergedProps}
      renderPreview={renderPreview}
      buildCode={buildCode}
      docs={docs}
      examples={examples}
      demoSections={getDemosForComponent('accordion')}
    />
  );
}
