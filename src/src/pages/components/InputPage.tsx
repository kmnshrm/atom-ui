import { getDemosForComponent, getPropsForComponent } from '../../utils/componentMetadata';
import ComponentPlayground from '../../components/playground/ComponentPlayground';
import type { PropConfig, ExampleConfig, DocSection } from '../../components/playground/ComponentPlayground';

const propConfigs: PropConfig[] = [
  { name: 'placeholder', type: 'string', label: 'Placeholder', defaultValue: 'Enter text...', description: 'Placeholder hint text' },
  { name: 'label', type: 'string', label: 'Label', defaultValue: 'Email Address', description: 'Label above the input' },
  { name: 'value', type: 'string', label: 'Value', defaultValue: '', description: 'Current value of the input' },
  { name: 'type', type: 'select', label: 'Type', defaultValue: 'text', options: ['text', 'email', 'password', 'number', 'search', 'tel', 'url'], description: 'HTML input type' },
  { name: 'size', type: 'select', label: 'Size', defaultValue: 'md', options: ['sm', 'md', 'lg'], description: 'Size variant' },
  { name: 'variant', type: 'select', label: 'Variant', defaultValue: 'default', options: ['default', 'filled', 'underlined'], description: 'Visual variant' },
  { name: 'disabled', type: 'boolean', label: 'Disabled', defaultValue: false, description: 'Disables the input' },
  { name: 'readonly', type: 'boolean', label: 'Read Only', defaultValue: false, description: 'Makes the input read-only' },
  { name: 'required', type: 'boolean', label: 'Required', defaultValue: false, description: 'Marks the field as required' },
  { name: 'error', type: 'string', label: 'Error Message', defaultValue: '', description: 'Validation error message' },
  { name: 'helper-text', type: 'string', label: 'Helper Text', defaultValue: '', description: 'Hint text below the input' },
  { name: 'prefix-icon', type: 'string', label: 'Prefix Icon', defaultValue: 'mail', description: 'Lucide icon in the prefix slot' },
  { name: 'clearable', type: 'boolean', label: 'Clearable', defaultValue: false, description: 'Shows a clear button when input has a value' },
];

const buildCode = (p: Record<string, any>) => {
  const attrs: string[] = [
    `type="${p.type}"`,
    `label="${p.label}"`,
    `placeholder="${p.placeholder}"`,
    `size="${p.size}"`,
    `variant="${p.variant}"`,
  ];
  if (p.value) attrs.push(`value="${p.value}"`);
  if (p.disabled) attrs.push('disabled');
  if (p.readonly) attrs.push('readonly');
  if (p.required) attrs.push('required');
  if (p.error) attrs.push(`error="${p.error}"`);
  if (p['helper-text']) attrs.push(`helper-text="${p['helper-text']}"`);
  if (p['prefix-icon']) attrs.push(`prefix-icon="${p['prefix-icon']}"`);
  if (p.clearable) attrs.push('clearable');
  return `<ui-input\n  ${attrs.join('\n  ')}\n></ui-input>`;
};

const renderPreview = (p: Record<string, any>) => (
  <div style={{ width: '320px' }}>
    <ui-input
      key={JSON.stringify(p)}
      type={p.type}
      label={p.label}
      placeholder={p.placeholder}
      value={p.value || undefined}
      size={p.size}
      variant={p.variant}
      disabled={p.disabled || undefined}
      readonly={p.readonly || undefined}
      required={p.required || undefined}
      error={p.error || undefined}
      helper-text={p['helper-text'] || undefined}
      prefix-icon={p['prefix-icon'] || undefined}
      clearable={p.clearable || undefined}
    />
  </div>
);

const docs: DocSection[] = [
  {
    title: 'Overview',
    content: `
      <p>The <code>ui-input</code> component is a fully-featured text field with support for labels, validation, icon slots, and multiple visual variants.</p>
      <h3>Variants</h3>
      <ul>
        <li><code>default</code> — Bordered input with a background</li>
        <li><code>filled</code> — No border, uses a filled background</li>
        <li><code>underlined</code> — Only a bottom border for a minimal look</li>
      </ul>
      <h3>Slots</h3>
      <ul>
        <li><code>prefix</code> — Content placed before the input text</li>
        <li><code>suffix</code> — Content placed after the input text</li>
      </ul>
      <h3>Events</h3>
      <ul>
        <li><code>uiInput</code> — Fires on every keystroke with <code>detail.value</code></li>
        <li><code>uiChange</code> — Fires on blur with <code>detail.value</code></li>
        <li><code>uiClear</code> — Fires when the clear button is clicked</li>
      </ul>
    `,
  },
];

const examples: ExampleConfig[] = [
  {
    title: 'Basic Form Fields',
    description: 'Common input types for form building',
    code: `<ui-input type="text" label="Full Name" placeholder="John Doe" prefix-icon="user"></ui-input>
<ui-input type="email" label="Email" placeholder="you@example.com" prefix-icon="mail"></ui-input>
<ui-input type="password" label="Password" placeholder="••••••••" prefix-icon="lock"></ui-input>`,
    render: () => (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '320px' }}>
        <ui-input type="text" label="Full Name" placeholder="John Doe" prefix-icon="user" />
        <ui-input type="email" label="Email" placeholder="you@example.com" prefix-icon="mail" />
        <ui-input type="password" label="Password" placeholder="••••••••" prefix-icon="lock" />
      </div>
    ),
  },
  {
    title: 'Validation States',
    description: 'Error state with validation message',
    code: `<ui-input label="Email" value="notvalid" error="Please enter a valid email address" prefix-icon="mail"></ui-input>
<ui-input label="Username" value="john_doe" helper-text="Username is available ✓" prefix-icon="user"></ui-input>`,
    render: () => (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '320px' }}>
        <ui-input label="Email" value="notvalid" error="Please enter a valid email address" prefix-icon="mail" />
        <ui-input label="Username" value="john_doe" helper-text="Username is available ✓" prefix-icon="user" />
      </div>
    ),
  },
  {
    title: 'All Variants',
    description: 'Default, filled, and underlined visual styles',
    code: `<ui-input variant="default" label="Default" placeholder="Default"></ui-input>
<ui-input variant="filled" label="Filled" placeholder="Filled"></ui-input>
<ui-input variant="underlined" label="Underlined" placeholder="Underlined"></ui-input>`,
    render: () => (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '320px' }}>
        <ui-input variant="default" label="Default" placeholder="Default" />
        <ui-input variant="filled" label="Filled" placeholder="Filled" />
        <ui-input variant="underlined" label="Underlined" placeholder="Underlined" />
      </div>
    ),
  },
  {
    title: 'Search Input',
    description: 'Clearable search field',
    code: `<ui-input type="search" placeholder="Search components..." prefix-icon="search" clearable></ui-input>`,
    render: () => (
      <div style={{ width: '320px' }}>
        <ui-input type="search" placeholder="Search components..." prefix-icon="search" clearable />
      </div>
    ),
  },
];

export default function InputPage() {
  const dynamicProps = getPropsForComponent('ui-input');
  const mergedProps = dynamicProps.length > 0 ? dynamicProps.map(dp => {
    const local = propConfigs.find(lp => lp.name === dp.name);
    if (local) return { ...dp, defaultValue: local.defaultValue !== undefined ? local.defaultValue : dp.defaultValue, options: local.options || dp.options, type: local.type || dp.type };
    return dp;
  }) : propConfigs;
  return (
    <ComponentPlayground
      componentName="Input"
      tagName="ui-input"
      description="A versatile text field with labels, validation, icon slots, and multiple visual variants."
      props={mergedProps}
      renderPreview={renderPreview}
      buildCode={buildCode}
      docs={docs}
      examples={examples}
      demoSections={getDemosForComponent('input')}
    />
  );
}
