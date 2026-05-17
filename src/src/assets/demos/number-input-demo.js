/**
 * Number Input Component Demo
 */
export function initNumberInputDemo() {
  const container = document.getElementById('number-input');
  if (!container) return;

  container.innerHTML = `
    <div class="demo-section-header">
      <h2 class="demo-section-title">Number Input</h2>
      <p class="demo-section-subtitle">Precision numerical input with stepper controls, affixes, and validation.</p>
    </div>

    <div class="demo-grid">
      <!-- Basic Usage -->
      <div class="demo-card">
        <h3 class="demo-card-title">Basic Usage</h3>
        <div class="demo-card-content">
          <ui-number-input 
            label="Age" 
            value="25" 
            min="0" 
            max="120" 
            helper-text="Enter your age (0-120)">
          </ui-number-input>
          
          <ui-number-input 
            label="Quantity" 
            value="1" 
            step="5" 
            min="0"
            helper-text="Steps of 5">
          </ui-number-input>
        </div>
      </div>

      <!-- Stepper Layouts -->
      <div class="demo-card">
        <h3 class="demo-card-title">Stepper Layouts</h3>
        <div class="demo-card-content" style="display: flex; flex-direction: column; gap: 20px;">
          <ui-number-input 
            label="Sides Layout (Default)" 
            value="10" 
            stepper-layout="sides">
          </ui-number-input>
          
          <ui-number-input 
            label="Right Stacked Layout" 
            value="10" 
            stepper-layout="right">
          </ui-number-input>

          <ui-number-input 
            label="No Steppers" 
            value="10" 
            stepper-layout="none">
          </ui-number-input>
        </div>
      </div>

      <!-- Precision & Affixes -->
      <div class="demo-card">
        <h3 class="demo-card-title">Precision & Affixes</h3>
        <div class="demo-card-content">
          <ui-number-input 
            label="Currency (USD)" 
            value="99.99" 
            precision="2" 
            step="0.01" 
            prefix-text="$">
          </ui-number-input>
          
          <ui-number-input 
            label="Weight" 
            value="75" 
            suffix-text="kg" 
            step="0.5">
          </ui-number-input>

          <ui-number-input 
            label="Percentage" 
            value="50" 
            suffix-text="%" 
            min="0" 
            max="100">
          </ui-number-input>
        </div>
      </div>

      <!-- Sizes & States -->
      <div class="demo-card">
        <h3 class="demo-card-title">Sizes & States</h3>
          <ui-number-input label="Small" size="sm" value="10"></ui-number-input>
          <ui-number-input label="Medium" size="md" value="10"></ui-number-input>
          <ui-number-input label="Large" size="lg" value="10"></ui-number-input>
          <ui-number-input label="Disabled" value="10" disabled="true" size="md"></ui-number-input>
          <ui-number-input label="Invalid State" value="-5" error-text="Value cannot be negative" size="md"></ui-number-input>
        </div>
      </div>

      <!-- Variants -->
      <div class="demo-card">
        <h3 class="demo-card-title">Variants</h3>
        <div class="demo-card-content" style="display: flex; flex-direction: column; gap: 20px;">
          <ui-number-input 
            label="Default Variant" 
            value="100" 
            suffix-text="Units"
            size="md">
          </ui-number-input>
          
          <ui-number-input 
            label="Plain Variant" 
            variant="plain" 
            value="100" 
            helper-text="Automatically hides steppers and suffices"
            size="md">
          </ui-number-input>
          
          <div style="padding: 12px; background: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0;">
             <p style="font-size: 12px; color: #64748b; margin: 0;">The <strong>plain</strong> variant is designed for dense UIs like pagination, where a borderless, icon-free appearance is preferred.</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Full Width & Global -->
    <div class="demo-card" style="margin-top: 24px;">
      <h3 class="demo-card-title">Full Width & Scroll Wheel</h3>
      <div class="demo-card-content">
        <ui-number-input 
          label="Full Width Amount" 
          value="1000" 
          full-width="true" 
          prefix-text="€" 
          step="50"
          helper-text="Try using your mouse scroll wheel while focused!"
          size="md">
        </ui-number-input>
      </div>
    </div>

    <!-- Playground -->
    <div class="demo-playground" style="margin-top: 40px;">
      <h3 class="demo-card-title">Interactive Playground</h3>
      <div class="playground-layout">
        <div class="playground-preview">
          <ui-number-input id="playgroundNumberInput" label="Interactive Control" value="0" size="md"></ui-number-input>
          <div id="numberValueDisplay" style="margin-top: 10px; font-size: 14px; font-weight: 600; color: #6366f1;">
            Current Value: 0
          </div>
        </div>
        <div class="playground-controls" style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; width: 100%;">
          <div class="control-group">
            <label>Variant</label>
            <ui-dropdown onchange="updateNumberProp('variant', this.value)" size="md" style="width: 100%; padding: 8px; border-radius: 6px; border: 1px solid #e2e8f0;">
              <option value="default" selected>Default</option>
              <option value="plain">Plain</option>
            </ui-dropdown>
          </div>
          <div class="control-group">
            <label>Size</label>
            <ui-dropdown onchange="updateNumberProp('size', this.value)" size="md" style="width: 100%; padding: 8px; border-radius: 6px; border: 1px solid #e2e8f0;">
              <option value="sm">Small</option>
              <option value="md" selected>Medium</option>
              <option value="lg">Large</option>
            </ui-dropdown>
          </div>
          <div class="control-group">
            <label>Layout</label>
            <ui-dropdown onchange="updateNumberProp('stepper-layout', this.value)" size="md" style="width: 100%; padding: 8px; border-radius: 6px; border: 1px solid #e2e8f0;">
              <option value="sides" selected>Sides</option>
              <option value="right">Right Stacked</option>
              <option value="none">None</option>
            </ui-dropdown>
          </div>
          <div class="control-group">
            <label>Color</label>
            <ui-dropdown onchange="updateNumberProp('color', this.value)" size="md" style="width: 100%; padding: 8px; border-radius: 6px; border: 1px solid #e2e8f0;">
              <option value="primary" selected>Primary</option>
              <option value="success">Success</option>
              <option value="danger">Danger</option>
              <option value="warning">Warning</option>
              <option value="info">Info</option>
            </ui-dropdown>
          </div>
          <div class="control-group">
            <label>Min</label>
            <ui-input type="number" value="0" oninput="updateNumberProp('min', this.value)" size="md" style="width: 100%; padding: 8px; border-radius: 6px; border: 1px solid #e2e8f0;">
          </div>
          <div class="control-group">
            <label>Max</label>
            <ui-input type="number" value="100" oninput="updateNumberProp('max', this.value)" size="md" style="width: 100%; padding: 8px; border-radius: 6px; border: 1px solid #e2e8f0;">
          </div>
          <div class="control-group">
            <label>Step</label>
            <ui-input type="number" value="1" oninput="updateNumberProp('step', this.value)" size="md" style="width: 100%; padding: 8px; border-radius: 6px; border: 1px solid #e2e8f0;">
          </div>
          <div class="control-group">
            <label>Precision</label>
            <ui-input type="number" value="-1" oninput="updateNumberProp('precision', this.value)" size="md" style="width: 100%; padding: 8px; border-radius: 6px; border: 1px solid #e2e8f0;">
          </div>
          <div class="control-group">
            <label>Prefix</label>
            <ui-input type="text" placeholder="e.g. $" oninput="updateNumberProp('prefix-text', this.value)" size="md" style="width: 100%; padding: 8px; border-radius: 6px; border: 1px solid #e2e8f0;">
          </div>
          <div class="control-group">
             <label>Suffix</label>
             <ui-input type="text" placeholder="e.g. kg" oninput="updateNumberProp('suffix-text', this.value)" size="md" style="width: 100%; padding: 8px; border-radius: 6px; border: 1px solid #e2e8f0;">
          </div>
          <div class="control-group" style="grid-column: span 2; display: flex; gap: 16px; margin-top: 10px; flex-wrap: wrap;">
            <ui-checkbox checked label="Default Icon" onCheckboxChange="updateNumberProp('show-type-icon', event.detail.checked)" size="md"></ui-checkbox>
            <ui-checkbox label="Disabled" onCheckboxChange="updateNumberProp('disabled', event.detail.checked)" size="md"></ui-checkbox>
            <ui-checkbox label="Readonly" onCheckboxChange="updateNumberProp('readonly', event.detail.checked)" size="md"></ui-checkbox>
            <ui-checkbox label="Full Width" onCheckboxChange="updateNumberProp('full-width', event.detail.checked)" size="md"></ui-checkbox>
            <ui-checkbox label="Floating Label" onCheckboxChange="updateNumberProp('floating-label', event.detail.checked)" size="md"></ui-checkbox>
          </div>
        </div>
      </div>
    </div>
  `;

  // Global functions for playground
  window.updateNumberProp = (prop, value) => {
    const el = document.getElementById('playgroundNumberInput');
    if (el) {
      if (typeof value === 'boolean') {
        el[prop] = value;
      } else {
        el.setAttribute(prop, value);
      }
    }
  };

  const playgroundEl = document.getElementById('playgroundNumberInput');
  const displayEl = document.getElementById('numberValueDisplay');
  if (playgroundEl && displayEl) {
    playgroundEl.addEventListener('numberChange', e => {
      displayEl.innerText = `Current Value: ${e.detail}`;
    });
  }
}
