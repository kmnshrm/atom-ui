// Pattern Input Demo
export function initPatternInputDemo() {
  const section = document.getElementById('pattern-input');
  if (!section) return;

  section.innerHTML = `
    
    <p>Advanced input with auto-formatting, masking, and validation patterns.</p>

    <div class="demo-controls" style="margin: 20px 0; display: flex; gap: 10px; flex-wrap: wrap;">
      <ui-button onclick="showInteractivePattern()" variant="outline">🎮 Playground</ui-button>
      <ui-button onclick="showRichFeatures()" variant="outline">✨ Rich Features</ui-button>
      <ui-button onclick="showContactPatterns()" variant="outline">Contact & IDs</ui-button>
      <ui-button onclick="showDatePatterns()" variant="outline">Date & Time</ui-button>
      <ui-button onclick="showTechPatterns()" variant="outline">Tech & Network</ui-button>
      <ui-button onclick="showBusinessPatterns()" variant="outline">Finance & SKU</ui-button>
    </div>

    <div id="patternDemoContainer" style="margin-top: 20px;"></div>
    <div id="patternEventLog" style="margin-top: 20px; padding: 12px; background: #f9fafb; border-radius: 6px; font-family: monospace; font-size: 12px; max-height: 150px; overflow-y: auto;"></div>
  `;

  const container = document.getElementById('patternDemoContainer');
  const eventLog = document.getElementById('patternEventLog');

  function logEvent(message) {
    if (!eventLog) return;
    const timestamp = new Date().toLocaleTimeString();
    eventLog.innerHTML += `[${timestamp}] ${message}\n`;
    eventLog.scrollTop = eventLog.scrollHeight;
  }

  window.showInteractivePattern = function () {
    container.innerHTML = `
      <div style="background-color: white; border-radius: 8px; padding: 20px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);">
        <h3>🎮 Interactive Playground</h3>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin-bottom: 20px;">
          <div>
            <label style="display: block; margin-bottom: 5px; font-weight: 500;">Pattern (# for digits):</label>
            <ui-input type="text" id="patString" value="(###) ###-####" onchange="updateInteractivePattern()" style="width: 100%; padding: 8px; border: 1px solid #d1d5db; border-radius: 4px; font-family: monospace;">
          </div>
          <div>
            <label style="display: block; margin-bottom: 5px; font-weight: 500;">Input Type:</label>
            <ui-dropdown id="patType" onchange="updateInteractivePattern()" style="width: 100%; padding: 8px; border: 1px solid #d1d5db; border-radius: 4px;">
              <option value="numeric">Numeric</option>
              <option value="alpha">Alpha</option>
              <option value="alphanumeric">Alphanumeric</option>
              <option value="text">Text (Any)</option>
            </ui-dropdown>
          </div>
          <div style="display: flex; flex-direction: column; gap: 4px; padding-top: 10px;">
            <ui-checkbox id="patAutoFormat" checked label="Auto Format" onCheckboxChange="updateInteractivePattern()"></ui-checkbox>
            <ui-checkbox id="patShowCounter" label="Show Counter" onCheckboxChange="updateInteractivePattern()"></ui-checkbox>
          </div>
        </div>

        <div style="padding: 40px; background-color: #f8fafc; border-radius: 8px; border: 1px dashed #cbd5e1; display: flex; flex-direction: column; align-items: center;">
          <div style="width: 100%; max-width: 350px;">
            <ui-pattern-input id="interactivePattern" label="Custom Pattern Input" placeholder="Type here..."></ui-pattern-input>
          </div>
        </div>

        <div style="margin-top: 20px; background: #1e293b; padding: 16px; border-radius: 8px; position: relative;">
          <ui-button onclick="copyPatternInputCode()" id="copyPatternInputBtn" style="position: absolute; top: 10px; right: 10px; background: rgba(255,255,255,0.1); color: white; border: none; padding: 4px 10px; border-radius: 4px; font-size: 11px; cursor: pointer; transition: all 0.2s;">Copy</ui-button>
          <code id="patternInputCodeBlock" style="color: #e2e8f0; font-family: monospace; font-size: 13px; display: block; overflow-x: auto; padding-right: 50px;">
            &lt;ui-pattern-input ...&gt;&lt;/ui-pattern-input&gt;
          </code>
        </div>
      </div>
    `;

    window.copyPatternInputCode = () => {
      const code = document.getElementById('patternInputCodeBlock').innerText;
      const btn = document.getElementById('copyPatternInputBtn');

      navigator.clipboard.writeText(code).then(() => {
        const originalText = btn.innerText;
        btn.innerText = 'Copied!';
        btn.style.background = '#10b981';

        setTimeout(() => {
          btn.innerText = originalText;
          btn.style.background = 'rgba(255,255,255,0.1)';
        }, 2000);
      });
    };

    window.updatePatternInputCode = () => {
      const el = document.getElementById('interactivePattern');
      const codeBlock = document.getElementById('patternInputCodeBlock');
      if (!el || !codeBlock) return;

      let props = '';
      if (el.label) props += ` label="${el.label}"`;
      if (el.placeholder) props += ` placeholder="${el.placeholder}"`;
      if (el.pattern) props += ` pattern="${el.pattern}"`;
      if (el.inputType && el.inputType !== 'numeric') props += ` input-type="${el.inputType}"`;
      if (el.autoFormat) props += ` auto-format`;
      if (el.showCounter) props += ` show-counter`;

      codeBlock.innerText = `<ui-pattern-input${props}></ui-pattern-input>`;
    };

    updateInteractivePattern();
  };

  window.updateInteractivePattern = function () {
    const el = document.getElementById('interactivePattern');
    if (!el) return;

    el.pattern = document.getElementById('patString').value;
    el.inputType = document.getElementById('patType').value;
    el.autoFormat = document.getElementById('patAutoFormat').checked;
    el.showCounter = document.getElementById('patShowCounter').checked;

    el.addEventListener('patternInputChange', e => {
      logEvent(`Value: ${e.detail.formatted} (Raw: ${e.detail.value})`);
    });
    window.updatePatternInputCode();
  };

  window.showRichFeatures = function () {
    container.innerHTML = `
      <div class="demo-block">
        <h3>✨ Rich Features & Slots</h3>
        <p style="font-size: 13px; color: #64748b; margin-bottom: 20px;">Use slots and clearable props for highly functional inputs.</p>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px;">
          
          <div class="demo-item">
            <h4 style="margin-bottom: 10px; font-size: 14px;">Clearable with Prefix Icon</h4>
            <ui-pattern-input 
              label="Search SKU" 
              pattern="AAA-####" 
              placeholder="SKU-1234"
              clearable="true"
            >
              <ui-icon slot="prefix" name="search" library="lucide" size="14px" style="margin-inline: 8px; color: #94a3b8;"></ui-icon>
            </ui-pattern-input>
          </div>

          <div class="demo-item">
            <h4 style="margin-bottom: 10px; font-size: 14px;">Suffix with Dynamic Unit</h4>
            <ui-pattern-input 
              label="Amount" 
              pattern="####.##" 
              placeholder="00.00"
            >
              <span slot="suffix" style="padding-inline: 12px; font-weight: 600; font-size: 12px; color: #64748b; background: #f1f5f9; height: 100%; display: flex; align-items: center; border-inline-start: 1px solid #e2e8f0;">USD</span>
            </ui-pattern-input>
          </div>

          <div class="demo-item">
            <h4 style="margin-bottom: 10px; font-size: 14px;">Interactive Action Suffix</h4>
            <ui-pattern-input 
              label="Discount Code" 
              pattern="AAAAA-####" 
              placeholder="SAVE-2024"
            >
              <ui-button slot="suffix" style="background: #10b981; color: white; border: none; padding: 0 12px; height: 100%; font-size: 11px; font-weight: 600; cursor: pointer; transition: background 0.2s;" onmouseover="this.style.background='#2563eb'" onmouseout="this.style.background='#10b981'">APPLY</ui-button>
            </ui-pattern-input>
          </div>

        </div>
      </div>
    `;
  };

  window.showContactPatterns = function () {
    container.innerHTML = `
      <div class="demo-block">
        <h3>Contact & Identity</h3>
        <p style="font-size: 13px; color: #64748b; margin-bottom: 20px;">Patterns for phone numbers and government IDs.</p>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px;">
          <ui-pattern-input label="US Phone" pattern="(###) ###-####" input-type="numeric" placeholder="(555) 123-4567"></ui-pattern-input>
          <ui-pattern-input label="Intl Phone (Format A)" pattern="+## ### ### ####" input-type="numeric" placeholder="+44 123 456 7890"></ui-pattern-input>
          <ui-pattern-input label="Social Security (SSN)" pattern="###-##-####" input-type="numeric" placeholder="000-00-0000"></ui-pattern-input>
          <ui-pattern-input label="Canadian Postal Code" pattern="A#A #A#" input-type="alphanumeric" placeholder="K1A 0B1"></ui-pattern-input>
          <ui-pattern-input label="Driver License (Example)" pattern="A-####-####-##" input-type="alphanumeric" placeholder="X-1234-5678-90"></ui-pattern-input>
          <ui-pattern-input label="Passport ID" pattern="AAAAAAAAA" input-type="alphanumeric" placeholder="A12345678"></ui-pattern-input>
        </div>
      </div>
    `;
  };

  window.showDatePatterns = function () {
    container.innerHTML = `
      <div class="demo-block">
        <h3>Date & Time Formats</h3>
        <p style="font-size: 13px; color: #64748b; margin-bottom: 20px;">Auto-formatting for temporal data input.</p>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px;">
          <ui-pattern-input label="Date (MM/DD/YYYY)" pattern="##/##/####" input-type="numeric" placeholder="12/31/2024"></ui-pattern-input>
          <ui-pattern-input label="Date (DD-MM-YYYY)" pattern="##-##-####" input-type="numeric" placeholder="31-12-2024"></ui-pattern-input>
          <ui-pattern-input label="Date (YYYY/MM/DD)" pattern="####/##/##" input-type="numeric" placeholder="2024/12/31"></ui-pattern-input>
          <ui-pattern-input label="Time (12h)" pattern="##:##" input-type="numeric" placeholder="12:30"></ui-pattern-input>
          <ui-pattern-input label="Time (24h with seconds)" pattern="##:##:##" input-type="numeric" placeholder="14:30:59"></ui-pattern-input>
          <ui-pattern-input label="Month/Year" pattern="##/####" input-type="numeric" placeholder="12/2025"></ui-pattern-input>
        </div>
      </div>
    `;
  };

  window.showTechPatterns = function () {
    container.innerHTML = `
      <div class="demo-block">
        <h3>Technology & Network</h3>
        <p style="font-size: 13px; color: #64748b; margin-bottom: 20px;">Patterns for IP addresses, MACs, and color keys.</p>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px;">
          <ui-pattern-input label="IPv4 Address" pattern="###.###.###.###" input-type="numeric" placeholder="192.168.001.001"></ui-pattern-input>
          <ui-pattern-input label="MAC Address" pattern="AA:AA:AA:AA:AA:AA" input-type="alphanumeric" placeholder="00:1A:2B:3C:4D:5E"></ui-pattern-input>
          <ui-pattern-input label="Hex Color" pattern="#AAAAAA" allowed-chars="^[0-9A-Fa-f]*$" input-type="custom" placeholder="#10b981"></ui-pattern-input>
          <ui-pattern-input label="UUID / GUID" pattern="AAAAAAAA-AAAA-AAAA-AAAA-AAAAAAAAAAAA" input-type="alphanumeric" placeholder="550e8400-e29b-..."></ui-pattern-input>
          <ui-pattern-input label="License Key" pattern="AAAA-AAAA-AAAA-AAAA" input-type="alphanumeric" placeholder="ABCD-EFGH-1234-5678"></ui-pattern-input>
          <ui-pattern-input label="Port Number" pattern="#####" input-type="numeric" placeholder="8080"></ui-pattern-input>
        </div>
      </div>
    `;
  };

  window.showBusinessPatterns = function () {
    container.innerHTML = `
      <div class="demo-block">
        <h3>Finance, Business & SKU</h3>
        <p style="font-size: 13px; color: #64748b; margin-bottom: 20px;">Standard business formats and product codes.</p>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px;">
          <ui-pattern-input label="Credit Card" pattern="#### #### #### ####" input-type="numeric" placeholder="4532 1234 5678 9123"></ui-pattern-input>
          <ui-pattern-input label="CVV / CVC" pattern="###" input-type="numeric" placeholder="123"></ui-pattern-input>
          <ui-pattern-input label="Bank Routing (US)" pattern="####-####-#" input-type="numeric" placeholder="1234-5678-9"></ui-pattern-input>
          <ui-pattern-input label="Short IBAN (Example)" pattern="AA## #### #### #### ####" input-type="alphanumeric" placeholder="DE89 3704 ..."></ui-pattern-input>
          <ui-pattern-input label="Product SKU" pattern="AAA-####-AA" input-type="alphanumeric" placeholder="PRD-2024-XL"></ui-pattern-input>
          <ui-pattern-input label="Order ID" pattern="#-######-###" input-type="numeric" placeholder="1-453920-888"></ui-pattern-input>
        </div>
      </div>
    `;
  };

  // Default view
  setTimeout(() => {
    showInteractivePattern();
  }, 100);
}
