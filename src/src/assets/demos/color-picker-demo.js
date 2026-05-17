export function initColorPickerDemo() {
  const container = document.getElementById('color-picker');
  if (!container) return;

  container.innerHTML = `
    <div class="demo-wrapper">
      <div class="demo-header-section" style="margin-bottom: 24px;">
        <h2 class="demo-section-title">Color Picker</h2>
        <p class="demo-section-subtitle">Enterprise-grade color selection with alpha support, multi-format inputs, and validation.</p>
      </div>

      <div class="demo-sections-container" style="display: flex; flex-direction: column; gap: 32px;">
        <div class="demo-block">
          <h3 style="margin-bottom: 16px; color: var(--text-primary);">Basic Selection</h3>
          <div style="display: flex; gap: 24px; flex-wrap: wrap; align-items: flex-start;">
            <ui-color-picker label="Primary Color" value="#10b981"></ui-color-picker>
            <ui-color-picker label="Success Color" value="#22c55e"></ui-color-picker>
            <ui-color-picker label="Accent Color" value="#8b5cf6"></ui-color-picker>
          </div>
        </div>

        <div class="demo-block">
          <h3 style="margin-bottom: 16px; color: var(--text-primary);">Extended Features</h3>
          <div style="display: flex; gap: 24px; flex-wrap: wrap;">
            <ui-color-picker label="With Alpha Channel" value="#ef4444" show-alpha="true" format="rgba"></ui-color-picker>
            <ui-color-picker label="No Swatches" value="#06b6d4" show-swatches="false"></ui-color-picker>
            <ui-color-picker label="No Hex Input" value="#f59e0b" show-hex="false"></ui-color-picker>
          </div>
        </div>

        <div class="demo-block">
          <h3 style="margin-bottom: 8px; color: var(--text-primary);">Multi-Format Input Variant</h3>
          <p style="font-size: 14px; color: var(--text-secondary); margin-bottom: 20px;">
            The <code>variant="input"</code> Displays all format channels (HEX, RGB, HSL) in a single integrated panel.
          </p>
          <div style="display: flex; gap: 32px; flex-wrap: wrap; align-items: flex-start;">
            <ui-color-picker 
              label="Interactive Channels"
              variant="input"
              inline="true"
              show-hex="true"
              show-rgb="true"
              show-rgba="true"
              show-hsl="true"
              show-hsla="true"
              show-alpha="true"
              value="#10b981"
            ></ui-color-picker>
            
            <div style="flex: 1; min-width: 280px; padding: 24px; background: var(--bg-secondary); border-radius: 16px; border: 1px solid var(--border-default);">
              <h4 style="margin: 0 0 12px 0; font-size: 12px; color: var(--text-tertiary); text-transform: uppercase; letter-spacing: 0.5px;">Technical Details</h4>
              <ul style="font-size: 13px; color: var(--text-secondary); padding-left: 18px; margin: 0; line-height: 1.6;">
                <li>Individual channel validation with real-time feedback.</li>
                <li>Hashless HEX input for cleaner interaction.</li>
                <li>Direct attribute binding for all color spaces.</li>
                <li>Responsive layout handles multi-channel flow.</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="demo-block">
          <h3 style="margin-bottom: 16px; color: var(--text-primary);">Live Preview Engine</h3>
          <div style="display: flex; gap: 32px; flex-wrap: wrap; align-items: flex-start;">
            <div>
              <ui-color-picker id="cp-inline" inline="true" value="#10b981"></ui-color-picker>
            </div>
            <div style="width: 240px; padding: 24px; background: var(--bg-secondary); border-radius: 16px; border: 1px solid var(--border-default); display: flex; flex-direction: column; gap: 16px; align-items: center;">
              <div id="cp-preview-box" style="width: 100%; height: 100px; border-radius: 12px; background: #10b981; box-shadow: 0 8px 24px rgba(16, 185, 129, 0.25);"></div>
              <div style="font-family: monospace; font-size: 14px; font-weight: 700; color: var(--text-primary);" id="cp-preview-hex">#10B981</div>
              <div id="cp-preview-text" style="width: 100%; padding: 12px; border-radius: 8px; background: #10b981; color: white; font-weight: 800; text-align: center; font-size: 13px;">SAMPLE TEXT</div>
            </div>
          </div>
        </div>

        <div class="demo-block">
          <h3 style="margin-bottom: 16px; color: var(--text-primary);">States & Interaction</h3>
          <div style="display: flex; gap: 24px; flex-wrap: wrap;">
            <ui-color-picker label="Disabled State" value="#64748b" disabled="true"></ui-color-picker>
            <ui-color-picker label="Read Only (Value)" value="#3b82f6" disabled="true"></ui-color-picker>
          </div>
        </div>
      </div>
    </div>

    <style>
      .demo-block {
        background: var(--bg-primary);
        padding: 32px;
        border-radius: 24px;
        border: 1px solid var(--border-default);
        box-shadow: var(--shadow-sm);
      }
      .demo-section-title { font-size: 1.75rem; font-weight: 800; color: var(--text-primary); margin: 0; }
      .demo-section-subtitle { font-size: 1rem; color: var(--text-secondary); margin-top: 4px; }
    </style>
  `;

  const inlinePicker = container.querySelector('#cp-inline');
  const previewBox = container.querySelector('#cp-preview-box');
  const previewHex = container.querySelector('#cp-preview-hex');
  const previewText = container.querySelector('#cp-preview-text');

  if (inlinePicker) {
    inlinePicker.addEventListener('colorChange', e => {
      const color = e.detail;
      if (previewBox) {
        previewBox.style.background = color;
        previewBox.style.boxShadow = `0 8px 24px ${color}40`;
      }
      if (previewHex) previewHex.textContent = color.toUpperCase();
      if (previewText) {
        previewText.style.background = color;
      }
    });
  }
}
