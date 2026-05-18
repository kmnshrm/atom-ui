import { getDemosForComponent } from '../../utils/componentMetadata';
import ComponentPlayground from '../../components/playground/ComponentPlayground';
import type { PropConfig, ExampleConfig, DocSection } from '../../components/playground/ComponentPlayground';

const propConfigs: PropConfig[] = [
  { name: 'value', type: 'number', label: 'Value', defaultValue: 65, description: 'Current progress value (0-100)' },
  { name: 'max', type: 'number', label: 'Max', defaultValue: 100, description: 'Maximum value' },
  { name: 'variant', type: 'select', label: 'Variant', defaultValue: 'linear', options: ['linear', 'circular'], description: 'Progress style' },
  { name: 'color', type: 'select', label: 'Color', defaultValue: 'primary', options: ['primary', 'success', 'warning', 'danger', 'info'], description: 'Color theme' },
  { name: 'size', type: 'select', label: 'Size', defaultValue: 'md', options: ['xs', 'sm', 'md', 'lg', 'xl'], description: 'Size of the progress bar/circle' },
  { name: 'show-label', type: 'boolean', label: 'Show Label', defaultValue: true, description: 'Shows the percentage label' },
  { name: 'animated', type: 'boolean', label: 'Animated', defaultValue: false, description: 'Animated striped pattern' },
  { name: 'label', type: 'string', label: 'Custom Label', defaultValue: '', description: 'Override the default percentage label' },
  { name: 'indeterminate', type: 'boolean', label: 'Indeterminate', defaultValue: false, description: 'Loading/indeterminate state' },
];

const buildCode = (p: Record<string, any>) => {
  const attrs: string[] = [
    `value="${p.value}"`,
    `max="${p.max}"`,
    `variant="${p.variant}"`,
    `color="${p.color}"`,
    `size="${p.size}"`,
  ];
  if (p['show-label']) attrs.push('show-label');
  if (p.animated) attrs.push('animated');
  if (p.label) attrs.push(`label="${p.label}"`);
  if (p.indeterminate) attrs.push('indeterminate');
  return `<ui-progress ${attrs.join('\n  ')}></ui-progress>`;
};

const renderPreview = (p: Record<string, any>) => (
  <div style={{ width: p.variant === 'circular' ? 'auto' : '320px' }}>
    <ui-progress
      key={JSON.stringify(p)}
      value={String(p.value)}
      max={String(p.max)}
      variant={p.variant}
      color={p.color}
      size={p.size}
      show-label={p['show-label'] || undefined}
      animated={p.animated || undefined}
      label={p.label || undefined}
      indeterminate={p.indeterminate || undefined}
    />
  </div>
);

const docs: DocSection[] = [
  {
    title: 'Overview',
    content: `
      <p>The <code>ui-progress</code> component visualizes the completion of a task or value within a range. It supports both linear bar and circular variants.</p>
      <h3>Variants</h3>
      <ul>
        <li><code>linear</code> — A horizontal progress bar</li>
        <li><code>circular</code> — A circular ring indicator (great for dashboards)</li>
      </ul>
      <h3>States</h3>
      <ul>
        <li><code>indeterminate</code> — An animated loading state when progress is unknown</li>
        <li><code>animated</code> — Adds a striped animation to the filled portion</li>
      </ul>
    `,
  },
];

const examples: ExampleConfig[] = [
  {
    title: 'Linear Progress Bars',
    description: 'All colors at various completion levels',
    code: `<ui-progress value="90" color="success" show-label></ui-progress>
<ui-progress value="65" color="primary" show-label></ui-progress>
<ui-progress value="40" color="warning" show-label></ui-progress>
<ui-progress value="20" color="danger" show-label></ui-progress>`,
    render: () => (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '320px' }}>
        <ui-progress value="90" color="success" show-label />
        <ui-progress value="65" color="primary" show-label />
        <ui-progress value="40" color="warning" show-label />
        <ui-progress value="20" color="danger" show-label />
      </div>
    ),
  },
  {
    title: 'Circular Progress',
    description: 'Ring indicators for dashboard metrics',
    code: `<ui-progress variant="circular" value="75" color="success" size="xl" show-label></ui-progress>
<ui-progress variant="circular" value="42" color="warning" size="xl" show-label></ui-progress>
<ui-progress variant="circular" value="88" color="primary" size="xl" show-label></ui-progress>`,
    render: () => (
      <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center' }}>
        <ui-progress variant="circular" value="75" color="success" size="xl" show-label />
        <ui-progress variant="circular" value="42" color="warning" size="xl" show-label />
        <ui-progress variant="circular" value="88" color="primary" size="xl" show-label />
      </div>
    ),
  },
  {
    title: 'Indeterminate Loading',
    description: 'For when progress duration is unknown',
    code: `<ui-progress indeterminate color="primary" size="md"></ui-progress>`,
    render: () => (
      <div style={{ width: '320px' }}>
        <ui-progress indeterminate color="primary" size="md" />
      </div>
    ),
  },
  {
    title: 'Custom Labels',
    description: 'Progress bars with custom text labels',
    code: `<ui-progress value="80" label="4 of 5 tasks done" color="success"></ui-progress>
<ui-progress value="50" label="2.5 GB / 5 GB" color="primary"></ui-progress>`,
    render: () => (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '320px' }}>
        <ui-progress value="80" label="4 of 5 tasks done" color="success" />
        <ui-progress value="50" label="2.5 GB / 5 GB" color="primary" />
      </div>
    ),
  },
];

export default function ProgressPage() {
  return (
    <ComponentPlayground
      componentName="Progress"
      tagName="ui-progress"
      description="Linear and circular progress indicators for tasks, metrics, and loading states."
      props={propConfigs}
      renderPreview={renderPreview}
      buildCode={buildCode}
      docs={docs}
      examples={examples}
      demoSections={getDemosForComponent('progress')}
    />
  );
}
