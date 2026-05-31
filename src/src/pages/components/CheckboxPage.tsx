import ComponentPlayground from '../../components/playground/ComponentPlayground';
import type { PropConfig, ExampleConfig, DocSection, DemoSection } from '../../components/playground/ComponentPlayground';
import { getEventsForComponent, getMethodsForComponent, getSlotsForComponent, getPartsForComponent } from '../../utils/componentMetadata';

const propConfigs: PropConfig[] = [
  // State
  { name: 'checked', type: 'boolean', label: 'Checked', defaultValue: false, description: 'Whether the checkbox is checked' },
  { name: 'indeterminate', type: 'boolean', label: 'Indeterminate', defaultValue: false, description: 'Mixed state (e.g. for "select all")' },
  { name: 'disabled', type: 'boolean', label: 'Disabled', defaultValue: false, description: 'Prevents interaction' },
  { name: 'readonly', type: 'boolean', label: 'Read Only', defaultValue: false, description: 'Visible but not editable' },
  { name: 'required', type: 'boolean', label: 'Required', defaultValue: false, description: 'Shows a required indicator (*)' },
  { name: 'invalid', type: 'boolean', label: 'Invalid', defaultValue: false, description: 'Shows error state + errorMessage' },
  // Content
  { name: 'label', type: 'string', label: 'Label', defaultValue: 'Accept Terms', description: 'Checkbox label text' },
  { name: 'description', type: 'string', label: 'Description', defaultValue: '', description: 'Secondary description text below the label' },
  { name: 'description-position', type: 'select', label: 'Description Position', defaultValue: 'below', options: ['below', 'above', 'left', 'right'], description: 'Where the description appears' },
  { name: 'helper-text', type: 'string', label: 'Helper Text', defaultValue: '', description: 'Helper text below the checkbox' },
  { name: 'error-message', type: 'string', label: 'Error Message', defaultValue: 'This field is required', description: 'Error shown when invalid=true' },
  { name: 'tooltip', type: 'string', label: 'Tooltip', defaultValue: '', description: 'Tooltip text on hover' },
  // Appearance
  { name: 'size', type: 'select', label: 'Size', defaultValue: 'md', options: ['xs', 'sm', 'md', 'lg', 'xl'], description: 'Checkbox size' },
  { name: 'color', type: 'select', label: 'Color', defaultValue: 'primary', options: ['primary', 'success', 'warning', 'danger', 'info'], description: 'Accent color when checked' },
  { name: 'variant', type: 'select', label: 'Variant', defaultValue: 'default', options: ['default', 'filled', 'outlined', 'minimal'], description: 'Visual variant' },
  { name: 'label-position', type: 'select', label: 'Label Position', defaultValue: 'right', options: ['left', 'right', 'top', 'bottom'], description: 'Label placement relative to checkbox' },
  // Custom Icons
  { name: 'custom-check-icon', type: 'string', label: 'Custom Check Icon', defaultValue: '', description: 'Lucide icon name to use instead of the default checkmark' },
  { name: 'custom-indeterminate-icon', type: 'string', label: 'Custom Indeterminate Icon', defaultValue: '', description: 'Lucide icon for the indeterminate state' },
  // Effects
  { name: 'enable-animation', type: 'boolean', label: 'Enable Animation', defaultValue: true, description: 'Enables check animation' },
  { name: 'ripple-effect', type: 'boolean', label: 'Ripple Effect', defaultValue: true, description: 'Ripple on click' },
  { name: 'glow', type: 'boolean', label: 'Glow Effect', defaultValue: false, description: 'Glowing ring when checked' },
  { name: 'confetti', type: 'boolean', label: 'Confetti', defaultValue: false, description: 'Triggers confetti particles on check' },
  { name: 'reveal', type: 'select', label: 'Reveal Animation', defaultValue: 'none', options: ['none', 'fade-in', 'slide-up', 'zoom'], description: 'Entrance animation' },
  // Interaction
  { name: 'label-clickable', type: 'boolean', label: 'Label Clickable', defaultValue: true, description: 'Clicking the label toggles the checkbox' },
  { name: 'is-button', type: 'boolean', label: 'Button Style', defaultValue: false, description: 'Renders as a clickable button card' },
  { name: 'skeleton', type: 'boolean', label: 'Skeleton', defaultValue: false, description: 'Loading skeleton state' },
  { name: 'rtl', type: 'boolean', label: 'RTL', defaultValue: false, description: 'Right-to-left layout' },
];

const buildCode = (p: Record<string, any>) => {
  const attrs: string[] = [`label="${p.label}"`, `color="${p.color}"`, `size="${p.size}"`];
  if (p.checked) attrs.push('checked');
  if (p.indeterminate) attrs.push('indeterminate');
  if (p.disabled) attrs.push('disabled');
  if (p.readonly) attrs.push('readonly');
  if (p.required) attrs.push('required');
  if (p.invalid) attrs.push('invalid');
  if (p.description) attrs.push(`description="${p.description}"`);
  if (p['description-position'] !== 'below') attrs.push(`description-position="${p['description-position']}"`);
  if (p['helper-text']) attrs.push(`helper-text="${p['helper-text']}"`);
  if (p.invalid && p['error-message']) attrs.push(`error-message="${p['error-message']}"`);
  if (p.tooltip) attrs.push(`tooltip="${p.tooltip}"`);
  if (p.variant !== 'default') attrs.push(`variant="${p.variant}"`);
  if (p['label-position'] !== 'right') attrs.push(`label-position="${p['label-position']}"`);
  if (p['custom-check-icon']) attrs.push(`custom-check-icon="${p['custom-check-icon']}"`);
  if (p['custom-indeterminate-icon']) attrs.push(`custom-indeterminate-icon="${p['custom-indeterminate-icon']}"`);
  if (!p['enable-animation']) attrs.push('enable-animation="false"');
  if (!p['ripple-effect']) attrs.push('ripple-effect="false"');
  if (p.glow) attrs.push('glow');
  if (p.confetti) attrs.push('confetti');
  if (p.reveal !== 'none') attrs.push(`reveal="${p.reveal}"`);
  if (!p['label-clickable']) attrs.push('label-clickable="false"');
  if (p['is-button']) attrs.push('is-button');
  if (p.skeleton) attrs.push('skeleton');
  if (p.rtl) attrs.push('rtl');
  return `<ui-checkbox\n  ${attrs.join('\n  ')}\n></ui-checkbox>`;
};

const renderPreview = (p: Record<string, any>) => (
  <ui-checkbox
    key={JSON.stringify(p)}
    label={p.label}
    checked={p.checked || undefined}
    indeterminate={p.indeterminate || undefined}
    disabled={p.disabled || undefined}
    readonly={p.readonly || undefined}
    required={p.required || undefined}
    invalid={p.invalid || undefined}
    description={p.description || undefined}
    description-position={p['description-position']}
    helper-text={p['helper-text'] || undefined}
    error-message={p['error-message'] || undefined}
    tooltip={p.tooltip || undefined}
    size={p.size}
    color={p.color}
    variant={p.variant}
    label-position={p['label-position']}
    custom-check-icon={p['custom-check-icon'] || undefined}
    custom-indeterminate-icon={p['custom-indeterminate-icon'] || undefined}
    enable-animation={p['enable-animation'] || undefined}
    ripple-effect={p['ripple-effect'] || undefined}
    glow={p.glow || undefined}
    confetti={p.confetti || undefined}
    reveal={p.reveal !== 'none' ? p.reveal : undefined}
    label-clickable={p['label-clickable'] || undefined}
    is-button={p['is-button'] || undefined}
    skeleton={p.skeleton || undefined}
    rtl={p.rtl || undefined}
  />
);

const docs: DocSection[] = [
  {
    title: 'Overview',
    content: `
      <p>The <code>ui-checkbox</code> component is a fully accessible, animated checkbox with support for labels, helper text, validation, indeterminate state, and premium effects.</p>
      <h3>Events</h3>
      <ul>
        <li><code>checkboxChange</code> — Fires with <code>detail: { checked, value, indeterminate }</code></li>
        <li><code>checkboxFocus</code> — Fires when the checkbox gains focus</li>
        <li><code>checkboxBlur</code> — Fires when the checkbox loses focus</li>
      </ul>
      <h3>Form Integration</h3>
      <p>The component is <code>formAssociated</code> and works natively inside HTML forms. It resets automatically on form reset.</p>
    `,
  },
  {
    title: 'Premium Effects',
    content: `
      <h3>Confetti</h3>
      <p>Enable <code>confetti</code> to trigger a burst of colored particles when the checkbox is checked. Great for gamified UIs.</p>
      <h3>Glow</h3>
      <p>Enable <code>glow</code> to show a glowing ring around the checkbox while it is checked.</p>
      <h3>Ripple</h3>
      <p>The ripple effect (enabled by default) adds a material-style ripple animation on each interaction.</p>
    `,
  },
];

const examples: ExampleConfig[] = [
  {
    title: 'Basic Checkbox Group',
    description: 'Standard option list',
    code: `<ui-checkbox label="Option A" checked color="success"></ui-checkbox>
<ui-checkbox label="Option B" color="success"></ui-checkbox>
<ui-checkbox label="Option C" disabled color="success"></ui-checkbox>`,
    render: () => (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <ui-checkbox label="Option A" checked color="success" />
        <ui-checkbox label="Option B" color="success" />
        <ui-checkbox label="Option C" disabled color="success" />
      </div>
    ),
  },
  {
    title: 'Indeterminate State',
    description: '"Select All" parent pattern',
    code: `<ui-checkbox label="Select All" indeterminate color="primary"></ui-checkbox>
<ui-checkbox label="Item 1" checked color="primary"></ui-checkbox>
<ui-checkbox label="Item 2" color="primary"></ui-checkbox>`,
    render: () => (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <ui-checkbox label="Select All" indeterminate color="primary" />
        <ui-checkbox label="Item 1" checked color="primary" />
        <ui-checkbox label="Item 2" color="primary" />
      </div>
    ),
  },
  {
    title: 'With Descriptions & Helper Text',
    description: 'Rich content checkboxes',
    code: `<ui-checkbox label="Enable Notifications" description="We will send you weekly updates" helper-text="Can be changed in account settings" color="success" checked></ui-checkbox>`,
    render: () => (
      <ui-checkbox label="Enable Notifications" description="We will send you weekly updates" helper-text="Can be changed in account settings" color="success" checked />
    ),
  },
  {
    title: 'Custom Check Icons',
    description: 'Using Lucide icons instead of the default checkmark',
    code: `<ui-checkbox label="Starred" custom-check-icon="star" checked color="warning"></ui-checkbox>
<ui-checkbox label="Verified" custom-check-icon="shield-check" checked color="success"></ui-checkbox>
<ui-checkbox label="Pinned" custom-check-icon="pin" checked color="primary"></ui-checkbox>`,
    render: () => (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <ui-checkbox label="Starred" custom-check-icon="star" checked color="warning" />
        <ui-checkbox label="Verified" custom-check-icon="shield-check" checked color="success" />
        <ui-checkbox label="Pinned" custom-check-icon="pin" checked color="primary" />
      </div>
    ),
  },
  {
    title: 'All Label Positions',
    description: 'Label on all four sides of the checkbox',
    code: `<ui-checkbox label="Right (default)" label-position="right" checked color="primary"></ui-checkbox>
<ui-checkbox label="Left" label-position="left" checked color="primary"></ui-checkbox>
<ui-checkbox label="Top" label-position="top" checked color="primary"></ui-checkbox>
<ui-checkbox label="Bottom" label-position="bottom" checked color="primary"></ui-checkbox>`,
    render: () => (
      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        {['right', 'left', 'top', 'bottom'].map(pos => (
          <ui-checkbox key={pos} label={pos.charAt(0).toUpperCase() + pos.slice(1)} label-position={pos} checked color="primary" />
        ))}
      </div>
    ),
  },
  {
    title: 'Validation State',
    description: 'Error state with a custom error message',
    code: `<ui-checkbox label="I agree to the terms" invalid error-message="You must accept the terms to continue" color="primary"></ui-checkbox>`,
    render: () => (
      <ui-checkbox label="I agree to the terms" invalid error-message="You must accept the terms to continue" color="primary" />
    ),
  },
  {
    title: 'Glow + Confetti',
    description: 'Premium effects — try checking this box!',
    code: `<ui-checkbox label="Check me for confetti! 🎉" glow confetti color="success"></ui-checkbox>`,
    render: () => (
      <ui-checkbox label="Check me for confetti! 🎉" glow confetti color="success" />
    ),
  },
];


const demoSections: DemoSection[] = [
  {
    title: 'Basic Checkboxes',
    description: 'Standard checkboxes with labels, sizes, and colors',
    html: `
      <div class="demo-block">
        <h3>Colors &amp; Sizes</h3>
        <div style="display:flex;flex-wrap:wrap;gap:24px;">
          <div style="display:flex;flex-direction:column;gap:12px;">
            <h4>Colors</h4>
            <ui-checkbox label="Primary" checked color="primary"></ui-checkbox>
            <ui-checkbox label="Success" checked color="success"></ui-checkbox>
            <ui-checkbox label="Warning" checked color="warning"></ui-checkbox>
            <ui-checkbox label="Danger" checked color="danger"></ui-checkbox>
            <ui-checkbox label="Info" checked color="info"></ui-checkbox>
          </div>
          <div style="display:flex;flex-direction:column;gap:12px;">
            <h4>Sizes</h4>
            <ui-checkbox label="Extra Small (xs)" checked size="xs" color="primary"></ui-checkbox>
            <ui-checkbox label="Small (sm)" checked size="sm" color="primary"></ui-checkbox>
            <ui-checkbox label="Medium (md)" checked size="md" color="primary"></ui-checkbox>
            <ui-checkbox label="Large (lg)" checked size="lg" color="primary"></ui-checkbox>
            <ui-checkbox label="Extra Large (xl)" checked size="xl" color="primary"></ui-checkbox>
          </div>
          <div style="display:flex;flex-direction:column;gap:12px;">
            <h4>States</h4>
            <ui-checkbox label="Checked" checked color="success"></ui-checkbox>
            <ui-checkbox label="Unchecked" color="primary"></ui-checkbox>
            <ui-checkbox label="Indeterminate" indeterminate color="primary"></ui-checkbox>
            <ui-checkbox label="Disabled (checked)" checked disabled color="primary"></ui-checkbox>
            <ui-checkbox label="Disabled (unchecked)" disabled color="primary"></ui-checkbox>
          </div>
        </div>
      </div>
      <div class="demo-block">
        <h3>Label Positions</h3>
        <div style="display:flex;gap:2rem;flex-wrap:wrap;align-items:flex-start;">
          <ui-checkbox label="Right (default)" label-position="right" checked color="primary"></ui-checkbox>
          <ui-checkbox label="Left" label-position="left" checked color="primary"></ui-checkbox>
          <ui-checkbox label="Top" label-position="top" checked color="primary"></ui-checkbox>
          <ui-checkbox label="Bottom" label-position="bottom" checked color="primary"></ui-checkbox>
        </div>
      </div>
    `,
  },
  {
    title: 'Rich Descriptions &amp; Validation',
    description: 'Checkboxes with descriptions, helper text, and error messages',
    html: `
      <div class="demo-block">
        <h3>With Description &amp; Helper Text</h3>
        <div style="display:flex;flex-direction:column;gap:16px;max-width:480px;">
          <ui-checkbox label="Enable Notifications" description="We'll send you weekly product updates" helper-text="Can be changed in account settings" color="success" checked></ui-checkbox>
          <ui-checkbox label="Two-Factor Authentication" description="Secure your account with OTP verification" helper-text="Required for enterprise access" color="primary"></ui-checkbox>
        </div>
      </div>
      <div class="demo-block">
        <h3>Validation &amp; Error State</h3>
        <div style="display:flex;flex-direction:column;gap:16px;max-width:480px;">
          <ui-checkbox label="Required Field" required color="primary"></ui-checkbox>
          <ui-checkbox label="I agree to Terms" invalid error-message="You must accept the terms to continue" color="primary"></ui-checkbox>
          <ui-checkbox label="Read-Only Checked" readonly checked color="primary"></ui-checkbox>
        </div>
      </div>
    `,
  },
  {
    title: 'Custom Icons',
    description: 'Custom Lucide icons instead of the default checkmark',
    html: `
      <div class="demo-block">
        <h3>Custom Check Icons</h3>
        <div style="display:flex;flex-direction:column;gap:12px;max-width:320px;">
          <ui-checkbox label="Starred" custom-check-icon="star" checked color="warning"></ui-checkbox>
          <ui-checkbox label="Verified" custom-check-icon="shield-check" checked color="success"></ui-checkbox>
          <ui-checkbox label="Pinned" custom-check-icon="pin" checked color="primary"></ui-checkbox>
          <ui-checkbox label="Bookmarked" custom-check-icon="bookmark" checked color="info"></ui-checkbox>
          <ui-checkbox label="Heart" custom-check-icon="heart" checked color="danger"></ui-checkbox>
          <ui-checkbox label="Lightning" custom-check-icon="zap" checked color="warning"></ui-checkbox>
        </div>
      </div>
    `,
  },
  {
    title: 'Premium Effects',
    description: 'Glow, ripple, confetti — interactive checkbox effects',
    html: `
      <div class="demo-block">
        <h3>Glow Effect</h3>
        <div style="display:flex;flex-direction:column;gap:12px;max-width:320px;">
          <ui-checkbox label="Glow Primary" glow checked color="primary"></ui-checkbox>
          <ui-checkbox label="Glow Success" glow checked color="success"></ui-checkbox>
          <ui-checkbox label="Glow Warning" glow checked color="warning"></ui-checkbox>
        </div>
      </div>
      <div class="demo-block">
        <h3>Confetti Burst 🎉</h3>
        <p>Click the checkbox below to trigger the confetti burst!</p>
        <ui-checkbox label="Achievement Unlocked" description="Integrated particle physics engine" confetti haptic color="success"></ui-checkbox>
      </div>
      <div class="demo-block">
        <h3>Button-Style Variant</h3>
        <div style="display:flex;gap:12px;flex-wrap:wrap;">
          <ui-checkbox label="Analytics" variant="button" color="primary"></ui-checkbox>
          <ui-checkbox label="Security" variant="button" color="warning"></ui-checkbox>
          <ui-checkbox label="Caching" variant="button" color="success"></ui-checkbox>
          <ui-checkbox label="Logs" variant="button" color="info"></ui-checkbox>
          <ui-checkbox label="Backup" variant="button" checked color="primary"></ui-checkbox>
        </div>
      </div>
    `,
  },
  {
    title: 'Form Integration',
    description: 'Native form association with FormData extraction',
    html: `
      <div class="demo-block">
        <h3>Native Form Integration</h3>
        <div style="max-width:480px;padding:24px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:16px;">
          <form id="demoCheckboxForm" style="display:flex;flex-direction:column;gap:16px;">
            <ui-checkbox name="tos" value="accepted" label="Accept Terms of Service" required checked haptic></ui-checkbox>
            <ui-checkbox name="newsletter" value="yes" label="Subscribe to newsletter" color="primary"></ui-checkbox>
            <ui-checkbox name="analytics" value="yes" label="Allow analytics tracking" color="warning"></ui-checkbox>
            <div style="display:flex;gap:12px;margin-top:8px;">
              <ui-button type="submit" label="Submit" variant="primary"></ui-button>
              <ui-button type="reset" label="Reset" variant="ghost"></ui-button>
            </div>
          </form>
        </div>
      </div>
    `,
  },
];

export default function CheckboxPage() {
  return (
    <ComponentPlayground
      componentName="Checkbox"
      tagName="ui-checkbox"
      description="A fully accessible, animated checkbox with 27 props covering validation, custom icons, animations, confetti effects, and rich label layouts."
      props={propConfigs}
      renderPreview={renderPreview}
      buildCode={buildCode}
      docs={docs}
      examples={examples}
      demoSections={demoSections}
      events={getEventsForComponent('ui-checkbox')}
      methods={getMethodsForComponent('ui-checkbox')}
      slots={getSlotsForComponent('ui-checkbox')}
      parts={getPartsForComponent('ui-checkbox')}
    />
  );
}
