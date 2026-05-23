export function initProgressDemo() {
  const section = document.getElementById('progress');
  if (!section) return;

  section.innerHTML = `
    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 24px;">
      <h2>Progress Indicators</h2>
      <div style="display: flex; gap: 8px;">
         <span style="padding: 4px 8px; background: #e0f2fe; color: #075985; border-radius: 4px; font-size: 11px; font-weight: 600;">NEW</span>
         <span style="padding: 4px 8px; background: #dcfce7; color: #166534; border-radius: 4px; font-size: 11px; font-weight: 600;">PREMIUM</span>
      </div>
    </div>

    <p style="color: #64748b; font-size: 15px; margin-bottom: 30px; line-height: 1.6;">
      Dynamic progress indicators including line, circle, and dashboard types with support for steppers, multi-segmented bars, and premium animations.
    </p>

    <div class="demo-controls" style="margin: 20px 0; display: flex; gap: 10px; flex-wrap: wrap;">
      <ui-button onclick="showProgressPlayground()" data-demo="playground" variant="outline">🎮 Playground</ui-button>
      <ui-button onclick="showProgressLifecycles()" data-demo="lifecycles" variant="outline">🔄 Lifecycle Statuses</ui-button>
      <ui-button onclick="showProgressScanning()" data-demo="scanning" variant="outline">🔍 Device Scanner</ui-button>
      <ui-button onclick="showProgressBasics()" data-demo="basics" variant="outline">Line Progress</ui-button>
      <ui-button onclick="showProgressCircular()" data-demo="circular" variant="outline">Circular & Dashboard</ui-button>
      <ui-button onclick="showProgressPremium()" data-demo="premium" variant="outline">✨ Premium Effects</ui-button>
      <ui-button onclick="showProgressAdvanced()" data-demo="advanced" variant="outline">Advanced Features</ui-button>
      <ui-button onclick="showProgressIndustrial()" data-demo="industrial" variant="outline">🛡️ Industrial Monitoring</ui-button>
      <ui-button onclick="showProgressInteractive()" data-demo="interactive" variant="outline">🕹️ Control Suite</ui-button>
      <ui-button onclick="showProgressVertical()" data-demo="vertical" variant="outline">↕️ Vertical Racks</ui-button>
    </div>

    <div id="progressDemoContainer" style="margin-top: 40px; min-height: 400px; padding: 24px; background: #f8fafc; border-radius: 12px; border: 1px solid #e2e8f0;"></div>
  `;

  const updateProgressActiveBtn = demoName => {
    section.querySelectorAll('.demo-controls ui-button').forEach(btn => {
      btn.selected = btn.getAttribute('data-demo') === demoName;
    });
  };

  window.showProgressPlayground = function () {
    updateProgressActiveBtn('playground');
    const container = document.getElementById('progressDemoContainer');
    container.innerHTML = `
      <div class="demo-block">
        <h3 style="margin-bottom: 20px;">🎮 Progress Playground</h3>
        <div style="display: grid; grid-template-columns: 320px 1fr; gap: 30px;">
          <!-- Controls -->
          <div style="background: white; padding: 24px; border-radius: 12px; border: 1px solid #e2e8f0; display: flex; flex-direction: column; gap: 16px;">
            <label style="display: flex; flex-direction: column; gap: 4px;">
              <span style="font-size: 12px; font-weight: 600; color: #64748b;">Percent (0-100)</span>
              <ui-input type="range" id="progPercent" min="0" max="100" value="45" oninput="updateProgressPlayground()">
            </label>
            
            <label style="display: flex; flex-direction: column; gap: 4px;">
              <span style="font-size: 12px; font-weight: 600; color: #64748b;">Type</span>
              <ui-dropdown id="progType" onchange="updateProgressPlayground()" style="padding: 8px; border-radius: 6px; border: 1px solid #cbd5e1;">
                <option value="line">Line (Default)</option>
                <option value="circle">Circle</option>
                <option value="dashboard">Dashboard</option>
                <option value="industrial">Industrial Segments</option>
              </ui-dropdown>
            </label>

            <label style="display: flex; flex-direction: column; gap: 4px;">
              <span style="font-size: 12px; font-weight: 600; color: #64748b;">Status</span>
              <ui-dropdown id="progStatus" onchange="updateProgressPlayground()" style="padding: 8px; border-radius: 6px; border: 1px solid #cbd5e1;">
                <option value="default">Default</option>
                <option value="active">Active (Wavy)</option>
                <option value="success">Success (Green)</option>
                <option value="exception">Exception (Red)</option>
                <option value="warning">Warning (Yellow)</option>
                <option value="danger">Danger (Vibrating)</option>
                <option value="empty">Empty</option>
                <option value="running">Running (Spinner)</option>
                <option value="completed">Completed (Check)</option>
                <option value="interrupted">Interrupted (Alert)</option>
              </ui-dropdown>
            </label>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
              <label style="display: flex; flex-direction: column; gap: 4px;">
                <span style="font-size: 12px; font-weight: 600; color: #64748b;">Stroke Width</span>
                <ui-input type="number" id="progStrokeWidth" value="10" oninput="updateProgressPlayground()" style="padding: 8px; border-radius: 6px; border: 1px solid #cbd5e1;">
              </label>
              <label style="display: flex; flex-direction: column; gap: 4px;">
                <span style="font-size: 12px; font-weight: 600; color: #64748b;">Decimal</span>
                <ui-input type="number" id="progDecimal" value="0" min="0" max="2" oninput="updateProgressPlayground()" style="padding: 8px; border-radius: 6px; border: 1px solid #cbd5e1;">
              </label>
            </div>

            <div style="display: flex; flex-wrap: wrap; gap: 10px;">
              <ui-checkbox id="progIndeterminate" label="Indet." onCheckboxChange="updateProgressPlayground()"></ui-checkbox>
              <ui-checkbox id="progVitality" label="Vitality" onCheckboxChange="updateProgressPlayground()"></ui-checkbox>
              <ui-checkbox id="progGlow" label="Glow" onCheckboxChange="updateProgressPlayground()"></ui-checkbox>
              <ui-checkbox id="progLiquid" label="Liquid" onCheckboxChange="updateProgressPlayground()"></ui-checkbox>
            </div>

            <label style="display: flex; flex-direction: column; gap: 4px;">
              <span style="font-size: 12px; font-weight: 600; color: #64748b;">Custom Data Label</span>
              <ui-input type="text" id="progDataLabels" placeholder="e.g. 5.2 GB" onInputChange="updateProgressPlayground()"></ui-input>
            </label>
          </div>

          <!-- Preview -->
          <div style="display: flex; flex-direction: column; gap: 20px;">
            <div id="progPreviewContainer" style="flex: 1; background: white; border-radius: 12px; border: 1px solid #e2e8f0; display: flex; align-items: center; justify-content: center; min-height: 250px;">
              <ui-progress percent="45"></ui-progress>
            </div>
            <div style="background: #1e293b; color: #e2e8f0; padding: 16px; border-radius: 8px; font-family: monospace; font-size: 13px; line-height: 1.5; white-space: pre-wrap;">
<code id="progCodeBlock">&lt;ui-progress percent="45"&gt;&lt;/ui-progress&gt;</code>
            </div>
          </div>
        </div>
      </div>
    `;
    updateProgressPlayground();
  };

  window.updateProgressPlayground = function () {
    const percent = document.getElementById('progPercent').value;
    const type = document.getElementById('progType').value;
    const status = document.getElementById('progStatus').value;
    const strokeWidth = document.getElementById('progStrokeWidth').value;
    const decimal = document.getElementById('progDecimal').value;
    const indeterminate = document.getElementById('progIndeterminate').checked;
    const vitality = document.getElementById('progVitality').checked;
    const glow = document.getElementById('progGlow').checked;
    const liquid = document.getElementById('progLiquid').checked;
    const dataLabels = document.getElementById('progDataLabels').value;

    const preview = document.getElementById('progPreviewContainer');
    const code = document.getElementById('progCodeBlock');

    let props = `percent="${percent}"`;
    if (type !== 'line') props += ` type="${type}"`;
    if (status !== 'default') props += ` status="${status}"`;
    if (strokeWidth != 10) props += ` stroke-width="${strokeWidth}"`;
    if (decimal > 0) props += ` decimal-precision="${decimal}"`;
    if (indeterminate) props += ` indeterminate="true"`;
    if (glow) props += ` glow="true"`;
    if (vitality) props += ` vitality="true"`;
    if (liquid) props += ` liquid="true"`;
    if (dataLabels) props += ` data-labels="${dataLabels}"`;

    preview.innerHTML = `<ui-progress ${props}></ui-progress>`;
    code.innerText = `<ui-progress ${props}></ui-progress>`;
  };

  window.showProgressLifecycles = function () {
    updateProgressActiveBtn('lifecycles');
    const container = document.getElementById('progressDemoContainer');
    container.innerHTML = `
      <div class="demo-block">
        <h3 style="margin-bottom: 8px;">🔄 Lifecycle Status Monitoring</h3>
        <p style="font-size: 14px; color: #64748b; margin-bottom: 24px;">
          Track system processes end-to-end using native status lifecycles: <code>empty</code>, <code>running</code>, <code>completed</code>, and <code>interrupted</code>.
        </p>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 20px; margin-bottom: 40px;">
          
          <!-- Empty State -->
          <div style="background: white; border-radius: 12px; border: 1px solid #e2e8f0; padding: 20px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.02);">
            <h4 style="margin: 0 0 16px; font-size: 13px; color: #64748b; display: flex; align-items: center; justify-content: space-between;">
              <span>Empty State</span>
              <span style="font-size: 10px; font-weight: bold; background: #f1f5f9; color: #64748b; padding: 2px 8px; border-radius: 10px; text-transform: uppercase;">Awaiting</span>
            </h4>
            <ui-progress percent="0" status="empty" stroke-width="12"></ui-progress>
            <p style="font-size: 12px; color: #94a3b8; margin-top: 12px; margin-bottom: 0;">Task queued, awaiting resource allocation.</p>
          </div>

          <!-- Running State -->
          <div style="background: white; border-radius: 12px; border: 1px solid #e2e8f0; padding: 20px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.02);">
            <h4 style="margin: 0 0 16px; font-size: 13px; color: #1890ff; display: flex; align-items: center; justify-content: space-between;">
              <span>Running State</span>
              <span style="font-size: 10px; font-weight: bold; background: #e0f2fe; color: #0369a1; padding: 2px 8px; border-radius: 10px; text-transform: uppercase;">Active</span>
            </h4>
            <ui-progress percent="45" status="running" stroke-width="12"></ui-progress>
            <p style="font-size: 12px; color: #94a3b8; margin-top: 12px; margin-bottom: 0;">Actively processing records. Wave pulse enabled.</p>
          </div>

          <!-- Completed State -->
          <div style="background: white; border-radius: 12px; border: 1px solid #e2e8f0; padding: 20px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.02);">
            <h4 style="margin: 0 0 16px; font-size: 13px; color: #52c41a; display: flex; align-items: center; justify-content: space-between;">
              <span>Completed State</span>
              <span style="font-size: 10px; font-weight: bold; background: #dcfce7; color: #15803d; padding: 2px 8px; border-radius: 10px; text-transform: uppercase;">Success</span>
            </h4>
            <ui-progress percent="100" status="completed" stroke-width="12"></ui-progress>
            <p style="font-size: 12px; color: #94a3b8; margin-top: 12px; margin-bottom: 0;">Operation finished successfully. Output generated.</p>
          </div>

          <!-- Interrupted State -->
          <div style="background: white; border-radius: 12px; border: 1px solid #e2e8f0; padding: 20px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.02);">
            <h4 style="margin: 0 0 16px; font-size: 13px; color: #ff4d4f; display: flex; align-items: center; justify-content: space-between;">
              <span>Interrupted State</span>
              <span style="font-size: 10px; font-weight: bold; background: #fef2f2; color: #b91c1c; padding: 2px 8px; border-radius: 10px; text-transform: uppercase;">Halted</span>
            </h4>
            <ui-progress percent="70" status="interrupted" stroke-width="12"></ui-progress>
            <p style="font-size: 12px; color: #94a3b8; margin-top: 12px; margin-bottom: 0;">Network loss detected. Thread execution suspended.</p>
          </div>

        </div>

        <!-- Dynamic Process Lifecycle Simulator -->
        <div style="background: #1e293b; color: white; border-radius: 16px; padding: 32px; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.3);">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
            <h4 style="margin: 0; font-size: 16px; font-weight: 600; letter-spacing: 0.02em;">⚡ Operation Lifecycle Simulator</h4>
            <span id="lifecycleStateText" style="font-size: 11px; font-weight: bold; background: #475569; color: #f8fafc; padding: 6px 14px; border-radius: 20px; letter-spacing: 0.05em; text-transform: uppercase;">QUEUED</span>
          </div>

          <div style="background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 24px; margin-bottom: 24px;">
            <ui-progress id="lifecycleProgress" percent="0" status="empty" stroke-width="16" decimal-precision="1"></ui-progress>
          </div>

          <div style="display: flex; gap: 12px; flex-wrap: wrap;">
            <ui-button id="btnLifecycleInit" onclick="handleLifecycleAction('init')" variant="outline" style="--ui-button-border-color: #475569; --ui-button-color: #f8fafc;">🔌 Queue (Empty)</ui-button>
            <ui-button id="btnLifecycleStart" onclick="handleLifecycleAction('start')" variant="outline" style="--ui-button-border-color: #475569; --ui-button-color: #f8fafc;">🚀 Start (Running)</ui-button>
            <ui-button id="btnLifecycleInterrupt" onclick="handleLifecycleAction('interrupt')" variant="outline" style="--ui-button-border-color: #475569; --ui-button-color: #f8fafc;">🚫 Halt (Interrupt)</ui-button>
            <ui-button id="btnLifecycleComplete" onclick="handleLifecycleAction('complete')" variant="outline" style="--ui-button-border-color: #475569; --ui-button-color: #f8fafc;">✨ Force Complete</ui-button>
          </div>
        </div>
      </div>
    `;

    let simInterval = null;

    window.handleLifecycleAction = function (action) {
      const pBar = document.getElementById('lifecycleProgress');
      const stateText = document.getElementById('lifecycleStateText');
      if (!pBar || !stateText) return;

      if (window.lifecycleInterval) {
        clearInterval(window.lifecycleInterval);
        window.lifecycleInterval = null;
      }

      if (action === 'init') {
        pBar.percent = 0;
        pBar.status = 'empty';
        stateText.innerText = 'QUEUED';
        stateText.style.background = '#475569';
      } else if (action === 'start') {
        pBar.status = 'running';
        stateText.innerText = 'RUNNING';
        stateText.style.background = '#1d4ed8';
        
        let current = parseFloat(pBar.percent) || 0;
        if (current >= 100) {
          current = 0;
        }

        window.lifecycleInterval = setInterval(() => {
          current += 1.2;
          if (current < 100) {
            pBar.percent = current.toFixed(1);
          } else {
            clearInterval(window.lifecycleInterval);
            window.lifecycleInterval = null;
            pBar.percent = 100;
            pBar.status = 'completed';
            stateText.innerText = 'COMPLETED';
            stateText.style.background = '#15803d';
          }
        }, 100);
      } else if (action === 'interrupt') {
        pBar.status = 'interrupted';
        stateText.innerText = 'INTERRUPTED';
        stateText.style.background = '#b91c1c';
      } else if (action === 'complete') {
        pBar.percent = 100;
        pBar.status = 'completed';
        stateText.innerText = 'COMPLETED';
        stateText.style.background = '#15803d';
      }
    };
  };

  window.showProgressBasics = function () {
    updateProgressActiveBtn('basics');
    const container = document.getElementById('progressDemoContainer');
    container.innerHTML = `
      <div class="demo-block">
        <h3>Standard Progress Matrix</h3>
        <p style="font-size: 14px; color: #64748b; margin-bottom: 30px;">Every state. Every percent. Pure clarity.</p>
        <div style="display: flex; flex-direction: column; gap: 32px;">
           <div class="demo-card" style="background: white; padding: 24px; border-radius: 12px; border: 1px solid #e2e8f0;">
              <h4 style="margin: 0 0 16px; font-size: 13px; color: #94a3b8;">Status Hierarchy</h4>
              <div style="display: flex; flex-direction: column; gap: 20px;">
                 <ui-progress percent="30" data-labels="Initialization (30%)"></ui-progress>
                 <ui-progress percent="50" status="active" data-labels="Processing Data (50%)"></ui-progress>
                 <ui-progress percent="75" status="warning" data-labels="Thermal Threshold (75%)"></ui-progress>
                 <ui-progress percent="90" status="danger" data-labels="Critical Pressure (90%)"></ui-progress>
                 <ui-progress percent="100" status="success" data-labels="Sync Complete (100%)"></ui-progress>
              </div>
           </div>

           <div class="demo-card" style="background: white; padding: 24px; border-radius: 12px; border: 1px solid #e2e8f0;">
              <h4 style="margin: 0 0 16px; font-size: 13px; color: #94a3b8;">Stroke Variants</h4>
              <div style="display: flex; flex-direction: column; gap: 24px;">
                 <ui-progress percent="60" stroke-width="4" stroke-linecap="square"></ui-progress>
                 <ui-progress percent="60" stroke-width="12" stroke-linecap="round"></ui-progress>
                  <ui-progress percent="60" stroke-width="24" stroke-linecap="round" type="industrial"></ui-progress>
              </div>
           </div>
        </div>
      </div>
    `;
  };

  window.showProgressCircular = function () {
    updateProgressActiveBtn('circular');
    const container = document.getElementById('progressDemoContainer');
    container.innerHTML = `
      <div class="demo-block">
        <h3 style="margin-bottom: 24px;">Circular & Dashboard Telemetry</h3>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 32px;">
           <!-- 1. Gap Configurations -->
           <div style="background: white; border-radius: 16px; border: 1px solid #e2e8f0; padding: 32px;">
              <h4 style="margin: 0 0 24px; font-size: 13px; color: #94a3b8;">Polar Gap Positioning</h4>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 32px; justify-items: center;">
                 <ui-progress type="dashboard" percent="75" gap-position="top" width="100" data-labels="TOP"></ui-progress>
                 <ui-progress type="dashboard" percent="75" gap-position="bottom" width="100" data-labels="BOT"></ui-progress>
                 <ui-progress type="dashboard" percent="75" gap-position="left" width="100" data-labels="LEFT"></ui-progress>
                 <ui-progress type="dashboard" percent="75" gap-position="right" width="100" data-labels="RIGHT"></ui-progress>
              </div>
           </div>

           <!-- 2. Circular Dynamics -->
           <div style="background: white; border-radius: 16px; border: 1px solid #e2e8f0; padding: 32px;">
              <h4 style="margin: 0 0 24px; font-size: 13px; color: #94a3b8;">Density & Precision</h4>
              <div style="display: flex; flex-direction: column; gap: 40px; align-items: center;">
                 <div style="display: flex; gap: 40px; align-items: center;">
                    <ui-progress type="circle" percent="45" width="80" size="md"roke-width="12"></ui-progress>
                    <ui-progress type="circle" percent="100" status="success" width="120" stroke-width="16"></ui-progress>
                 </div>
                 <ui-progress type="circle" percent="12.55" decimal-precision="2" width="150" glow="true" stroke-color="#8b5cf6"></ui-progress>
              </div>
           </div>
        </div>
      </div>
    `;
  };

  window.showProgressPremium = function () {
    updateProgressActiveBtn('premium');
    const container = document.getElementById('progressDemoContainer');
    container.innerHTML = `
      <div class="demo-block">
        <h3 style="margin-bottom: 24px;">✨ Visual Masterclass: Premium Synthesis</h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 32px;">
           <div style="background: white; border-radius: 16px; border: 1px solid #e2e8f0; padding: 32px;">
              <h4 style="margin: 0 0 20px; font-size: 13px; color: #94a3b8;">Liquid Wave Telemetry</h4>
              <ui-progress percent="65" liquid="true" stroke-color="#10b981" stroke-width="20" data-labels="COOLANT LEVEL"></ui-progress>
           </div>

           <div style="background: #1e293b; border-radius: 16px; padding: 32px;">
              <h4 style="margin: 0 0 20px; font-size: 13px; color: #475569;">Glassmorphic System</h4>
              <ui-progress percent="50" glass="true" stroke-color="#10b981" trail-color="rgba(255,255,255,0.05)" stroke-width="20"></ui-progress>
           </div>

           <div style="background: white; border-radius: 16px; border: 1px solid #e2e8f0; padding: 32px;">
              <h4 style="margin: 0 0 20px; font-size: 13px; color: #94a3b8;">High-Energy Glow</h4>
              <div style="display: flex; flex-direction: column; gap: 24px;">
                 <ui-progress percent="80" glow="true" stroke-color="#f43f5e" status="danger"></ui-progress>
                 <ui-progress percent="40" glow="true" stroke-color="#a855f7" vitality="true"></ui-progress>
              </div>
           </div>

           <div style="background: white; border-radius: 16px; border: 1px solid #e2e8f0; padding: 32px;">
              <h4 style="margin: 0 0 20px; font-size: 13px; color: #94a3b8;">Indeterminate Cycles</h4>
              <div style="display: flex; gap: 40px; justify-content: center;">
                 <ui-progress type="circle" indeterminate="true" width="80"></ui-progress>
                 <ui-progress type="dashboard" indeterminate="true" width="80" stroke-color="#f59e0b"></ui-progress>
              </div>
           </div>
        </div>
      </div>
    `;
  };

  window.showProgressAdvanced = function () {
    updateProgressActiveBtn('advanced');
    const container = document.getElementById('progressDemoContainer');
    container.innerHTML = `
      <div class="demo-block">
        <h3 style="margin-bottom: 24px;">Advanced Forensic Logic</h3>
        <div style="display: flex; flex-direction: column; gap: 32px;">
           <div style="background: white; border-radius: 16px; border: 1px solid #e2e8f0; padding: 32px;">
              <h4 style="margin: 0 0 20px; font-size: 13px; color: #94a3b8;">Scale Ticks & Numeric Precision</h4>
              <div style="display: flex; flex-direction: column; gap: 32px;">
                 <ui-progress percent="45" ticks="10" stroke-width="16" data-labels="SENSOR_01: NOMINAL"></ui-progress>
                 <ui-progress percent="82" ticks="5" stroke-width="16" stroke-color="#f59e0b" data-labels="THERMAL_READOUT: 82.0°C"></ui-progress>
              </div>
           </div>
           
           <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 32px;">
              <div style="background: white; border-radius: 16px; border: 1px solid #e2e8f0; padding: 32px;">
                 <h4 style="margin: 0 0 20px; font-size: 13px; color: #94a3b8;">Milestone Lifecycles</h4>
                 <ui-progress 
                   percent="65" 
                   stroke-width="16"
                   milestones='[{"percent": 25, "label": "Dev"}, {"percent": 50, "label": "Test"}, {"percent": 75, "label": "Deploy"}]'
                 ></ui-progress>
              </div>
              <div style="background: white; border-radius: 16px; border: 1px solid #e2e8f0; padding: 32px;">
                 <h4 style="margin: 0 0 20px; font-size: 13px; color: #94a3b8;">Buffer & Success Ratios</h4>
                 <ui-progress percent="85" show-buffer="true" buffer="95" success='{"percent": 40}' stroke-width="24" stroke-linecap="square"></ui-progress>
              </div>
           </div>

           <div style="background: white; border-radius: 16px; border: 1px solid #e2e8f0; padding: 32px;">
              <h4 style="margin: 0 0 20px; font-size: 13px; color: #94a3b8;">High-Fidelity Gradients</h4>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 32px;">
                 <div style="display: flex; flex-direction: column; gap: 20px;">
                    <ui-progress percent="90" stroke-color='{"from": "#10b981", "to": "#8b5cf6"}' stroke-width="12" data-labels="Ocean Gradient"></ui-progress>
                    <ui-progress percent="75" stroke-color='{"from": "#10b981", "to": "#10b981"}' stroke-width="12" data-labels="Forest Stream"></ui-progress>
                    <ui-progress percent="60" stroke-color='{"from": "#f59e0b", "to": "#ef4444"}' stroke-width="12" data-labels="Sunset Fire"></ui-progress>
                 </div>
                 <div style="display: flex; gap: 24px; justify-content: center; align-items: center;">
                    <ui-progress type="circle" percent="85" width="100" stroke-color='{"from": "#6366f1", "to": "#ec4899"}' stroke-width="12" data-labels="Neon"></ui-progress>
                    <ui-progress type="dashboard" percent="65" width="100" stroke-color='{"from": "#06b6d4", "to": "#8b5cf6"}' stroke-width="12" data-labels="Cosmic"></ui-progress>
                 </div>
              </div>
           </div>
        </div>
      </div>
    `;
  };

  window.showProgressIndustrial = function () {
    updateProgressActiveBtn('industrial');
    const container = document.getElementById('progressDemoContainer');
    container.innerHTML = `
      <div class="demo-block">
        <h3 style="margin-bottom: 24px;">🛡️ Industrial Telemetry & Mission Control</h3>
        <p style="font-size: 14px; color: #64748b; margin-bottom: 30px;">
          High-fidelity segmented monitoring with autonomous status evolution and forensic tracking.
        </p>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 40px;">
           <!-- 1. Real-time Rack Monitor -->
           <div style="background: white; border-radius: 16px; border: 1px solid #e2e8f0; padding: 24px; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
              <h4 style="margin: 0 0 16px; font-size: 13px; text-transform: uppercase; letter-spacing: 0.1em; color: #94a3b8;">Rack #04 Status</h4>
              <ui-progress 
                 id="industrialRack"
                 type="industrial" 
                 percent="45" 
                 stroke-width="20"
                 vitality="true"
                 data-labels="4.5 / 10.0 kW"
                 thresholds='[{"percent": 80, "status": "danger"}, {"percent": 60, "status": "warning"}]'
              ></ui-progress>
              <div style="margin-top: 16px; display: flex; justify-content: space-between;">
                 <ui-button onclick="updateIndPercent(-5)" style="background: #f1f5f9; border: 1px solid #cbd5e1; border-radius: 4px; padding: 4px 12px; font-size: 11px; cursor: pointer;">Decrease Load</ui-button>
                 <ui-button onclick="updateIndPercent(5)" style="background: #1e293b; color: white; border: none; border-radius: 4px; padding: 4px 12px; font-size: 11px; cursor: pointer;">Increase Load</ui-button>
              </div>
           </div>

           <!-- 2. Memory Forensics -->
           <div style="background: white; border-radius: 16px; border: 1px solid #e2e8f0; padding: 24px; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
              <h4 style="margin: 0 0 16px; font-size: 13px; text-transform: uppercase; letter-spacing: 0.1em; color: #94a3b8;">Memory Peak Tracker</h4>
              <ui-progress 
                id="memoryForensics"
                type="line"
                percent="30"
                stroke-width="8"
                stroke-color="#10b981"
                data-labels="6.4 GB / 32 GB"
              ></ui-progress>
              <p style="font-size: 11px; color: #94a3b8; margin-top: 12px;">The blue marker tracks the maximum load reached this session.</p>
           </div>
        </div>

        <!-- 3. Stress Test Center -->
        <div style="margin-top: 40px; background: #0f172a; border-radius: 16px; padding: 32px; color: white;">
           <h4 style="margin: 0 0 20px; font-size: 15px; display: flex; align-items: center; gap: 8px;">
             ⚡ Thermal Stress Simulator
             <span id="stressStatus" style="font-size: 11px; background: #334155; padding: 4px 10px; border-radius: 20px;">NOMINAL</span>
           </h4>
           <ui-progress 
             id="stressTest"
             type="industrial"
             percent="20"
             stroke-width="32"
             glow="true"
             vitality="true"
             thresholds='[{"percent": 85, "status": "danger"}, {"percent": 70, "status": "warning"}]'
           ></ui-progress>
           <ui-button onclick="startStressTest()" style="margin-top: 24px; width: 100%; padding: 12px; background: #ef4444; border: none; border-radius: 8px; font-weight: 700; color: white; cursor: pointer;">START THERMAL RAMP</ui-button>
        </div>
      </div>
    `;

    window.updateIndPercent = delta => {
      const el = document.getElementById('industrialRack');
      if (el) {
        const newVal = Math.max(0, Math.min(100, (parseInt(el.percent) || 0) + delta));
        el.percent = newVal;
        el.dataLabels = `${(newVal / 10).toFixed(1)} / 10.0 kW`;
      }
    };

    window.startStressTest = () => {
      const el = document.getElementById('stressTest');
      const status = document.getElementById('stressStatus');
      let current = 20;
      const interval = setInterval(() => {
        current += 1.5;
        el.percent = current;
        if (current >= 70 && current < 85) {
          status.innerText = 'WARNING';
          status.style.background = '#854d0e';
        }
        if (current >= 85) {
          status.innerText = 'CRITICAL THERMAL PRESSURE';
          status.style.background = '#991b1b';
        }
        if (current >= 100) {
          clearInterval(interval);
        }
      }, 50);
    };

    // Auto-update memory forensics to show peak mark
    const memInterval = setInterval(() => {
      const el = document.getElementById('memoryForensics');
      if (el && el.isConnected) {
        const rand = Math.floor(Math.random() * 80);
        el.percent = rand;
      } else {
        clearInterval(memInterval);
      }
    }, 2000);
  };

  window.showProgressInteractive = function () {
    updateProgressActiveBtn('interactive');
    const container = document.getElementById('progressDemoContainer');
    container.innerHTML = `
      <div class="demo-block">
        <h3 style="margin-bottom: 24px;">🕹️ Control Suite: Reactive Scripting</h3>
        <p style="font-size: 14px; color: #64748b; margin-bottom: 30px;">
          Dynamic progress bars converted into primary system configuration controls via the <code>interactive</code> prop.
        </p>

        <div style="background: white; border-radius: 16px; padding: 40px; border: 1px solid #e2e8f0; display: flex; flex-direction: column; gap: 40px;">
           <div>
              <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                 <label style="font-weight: 600; font-size: 13px;">Manual Fan Speed Configuration</label>
                 <span id="fanVal" style="font-family: monospace; color: #10b981; font-weight: 700;">45%</span>
              </div>
              <ui-progress 
                id="fanControl"
                percent="45" 
                interactive="true" 
                stroke-width="16" 
                stroke-color="#10b981"
                ticks="10"
              ></ui-progress>
           </div>

           <div>
              <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                 <label style="font-weight: 600; font-size: 13px;">Audio Gain Modulation</label>
                 <span id="audioVal" style="font-family: monospace; color: #10b981; font-weight: 700;">65.2 dB</span>
              </div>
              <ui-progress 
                id="audioControl"
                percent="65" 
                interactive="true" 
                stroke-width="16" 
                stroke-color="#10b981"
                liquid="true"
                decimal-precision="1"
              ></ui-progress>
           </div>
        </div>
      </div>
    `;

    const fan = document.getElementById('fanControl');
    const audio = document.getElementById('audioControl');

    if (fan)
      fan.addEventListener('progressChange', e => {
        document.getElementById('fanVal').innerText = e.detail.value + '%';
      });
    if (audio)
      audio.addEventListener('progressChange', e => {
        document.getElementById('audioVal').innerText = (e.detail.value * 1.2).toFixed(1) + ' dB';
      });
  };

  window.showProgressVertical = function () {
    updateProgressActiveBtn('vertical');
    const container = document.getElementById('progressDemoContainer');
    container.innerHTML = `
      <div class="demo-block">
        <h3 style="margin-bottom: 24px;">↕️ High-Density Vertical Racks</h3>
        <div style="display: flex; gap: 40px; justify-content: center; height: 350px; padding: 40px; background: white; border-radius: 16px; border: 1px solid #e2e8f0;">
           <ui-progress orientation="vertical" percent="80" height="100%" stroke-width="24" stroke-color="#f43f5e" vitality="true" glow="true" data-labels="THERMAL"></ui-progress>
           <ui-progress orientation="vertical" percent="60" height="100%" stroke-width="24" stroke-color="#10b981" ticks="20" data-labels="NETWORK"></ui-progress>
            <ui-progress orientation="vertical" percent="40" height="100%" stroke-width="24" stroke-color="#10b981" type="industrial" data-labels="POWER"></ui-progress>
            <ui-progress orientation="vertical" percent="90" height="100%" stroke-width="24" stroke-color="#a855f7" data-labels="PEAK"></ui-progress>
        </div>
      </div>
    `;
  };

  window.showProgressScanning = function () {
    updateProgressActiveBtn('scanning');
    const container = document.getElementById('progressDemoContainer');
    container.innerHTML = `
      <div class="demo-block" style="font-family: inherit;">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 24px;">
          <div>
            <h3 style="margin: 0; font-size: 20px; font-weight: 700; color: #0f172a;">🔍 Cybernetic Device Scanner</h3>
            <p style="margin: 4px 0 0; font-size: 14px; color: #64748b;">Automated sector, memory, and threat scanning telemetry.</p>
          </div>
          <span id="scanStatusBadge" style="font-size: 11px; font-weight: 700; background: #f1f5f9; color: #64748b; padding: 4px 12px; border-radius: 20px; text-transform: uppercase; letter-spacing: 0.05em;">AWAITING COMMAND</span>
        </div>

        <div style="display: grid; grid-template-columns: 280px 1fr; gap: 32px; margin-bottom: 32px;">
          <!-- Left Panel: Dial & Actions -->
          <div style="background: white; border: 1px solid #e2e8f0; border-radius: 16px; padding: 24px; display: flex; flex-direction: column; align-items: center; gap: 20px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.02);">
            <div style="position: relative; width: 160px; height: 160px; display: flex; align-items: center; justify-content: center;">
              <ui-progress 
                id="scanCircularProgress" 
                type="dashboard" 
                percent="0" 
                stroke-width="12" 
                stroke-color='{"from": "#3b82f6", "to": "#10b981"}'
                gap-position="bottom"
                width="160"
                glow="true"
                liquid="true"
                status="empty"
              ></ui-progress>
            </div>

            <!-- Scanning Controls -->
            <div style="display: flex; flex-direction: column; width: 100%; gap: 10px; margin-top: 10px;">
              <ui-button id="btnStartScan" onclick="handleScanAction('start')" variant="primary" style="width: 100%;">⚡ Start Full Scan</ui-button>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
                <ui-button id="btnPauseScan" onclick="handleScanAction('pause')" variant="outline" style="font-size: 12px;">⏸️ Pause</ui-button>
                <ui-button id="btnHaltScan" onclick="handleScanAction('halt')" variant="outline" style="font-size: 12px; --ui-button-color: #ef4444; --ui-button-border-color: #fecaca;">🚫 Abort</ui-button>
              </div>
              <ui-button id="btnResetScan" onclick="handleScanAction('reset')" variant="ghost" style="width: 100%; font-size: 12px;">🔄 Reset Console</ui-button>
            </div>
          </div>

          <!-- Right Panel: Live Logs & Telemetry -->
          <div style="display: flex; flex-direction: column; gap: 20px;">
            <!-- Telemetry Cards -->
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;">
              <div style="background: white; border: 1px solid #e2e8f0; padding: 16px; border-radius: 12px; text-align: center;">
                <span style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; color: #64748b; font-weight: 600;">Sectors Checked</span>
                <h4 id="sectorsCount" style="margin: 8px 0 0; font-size: 24px; font-weight: 800; color: #0f172a;">0</h4>
              </div>
              <div style="background: white; border: 1px solid #e2e8f0; padding: 16px; border-radius: 12px; text-align: center;">
                <span style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; color: #64748b; font-weight: 600;">Threats Detected</span>
                <h4 id="threatsCount" style="margin: 8px 0 0; font-size: 24px; font-weight: 800; color: #0f172a;">0</h4>
              </div>
              <div style="background: white; border: 1px solid #e2e8f0; padding: 16px; border-radius: 12px; text-align: center;">
                <span style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; color: #64748b; font-weight: 600;">Scan Time</span>
                <h4 id="elapsedScanTime" style="margin: 8px 0 0; font-size: 24px; font-weight: 800; color: #0f172a;">0.0s</h4>
              </div>
            </div>

            <!-- Terminal Console Logs -->
            <div style="background: #0f172a; color: #38bdf8; border-radius: 16px; padding: 20px; font-family: 'Courier New', Courier, monospace; font-size: 12px; height: 180px; overflow-y: auto; border: 1px solid #1e293b; box-shadow: inset 0 2px 8px rgba(0,0,0,0.5);" id="scanTerminalConsole">
              <div style="color: #64748b;">[SCAN ENGINE v4.2.1] INITIALIZED...</div>
              <div style="color: #64748b;">[CONSOLE] READY FOR HARDWARE RAMP...</div>
            </div>
          </div>
        </div>

        <!-- Linear Sub-System Feed -->
        <div style="background: white; border: 1px solid #e2e8f0; border-radius: 16px; padding: 24px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.02);">
          <h4 style="margin: 0 0 16px; font-size: 13px; text-transform: uppercase; color: #64748b; font-weight: 700; letter-spacing: 0.05em;">Memory Buffer Allocation Check</h4>
          <ui-progress id="scanLinearBuffer" percent="0" status="empty" stroke-width="16" vitality="true"></ui-progress>
        </div>
      </div>
    `;

    // Active scan memory variables
    if (window.scanInterval) {
      clearInterval(window.scanInterval);
      window.scanInterval = null;
    }
    window.scanTimeElapsed = 0;
    window.scanSectors = 0;
    window.scanThreats = 0;

    const mockSectors = [
      '/dev/disk0s1/System/Library/Kernels/kernel',
      '/dev/disk0s1/System/Library/Extensions/AppleACPIPlatform.kext',
      '/dev/disk0s1/System/Library/Extensions/AppleSMBIOS.kext',
      '/dev/disk0s1/System/Library/Fonts/SF-Pro.ttf',
      '/dev/disk0s1/usr/sbin/cron',
      '/dev/disk0s1/usr/bin/security',
      '/dev/disk0s1/private/var/log/system.log',
      '/dev/disk0s1/Applications/CyberneticScanner.app',
      '/Memory/Alloc/RAM_BLOCK_0x00FF34D',
      '/Memory/Alloc/RAM_BLOCK_0x01AA87D',
      '/Ports/TCP/Port-80-Listener',
      '/Ports/TCP/Port-443-SecureGateway',
      '/Ports/TCP/Port-8080-AltServer',
    ];

    window.handleScanAction = function (action) {
      const circ = document.getElementById('scanCircularProgress');
      const line = document.getElementById('scanLinearBuffer');
      const statusBadge = document.getElementById('scanStatusBadge');
      const term = document.getElementById('scanTerminalConsole');
      const secCount = document.getElementById('sectorsCount');
      const thCount = document.getElementById('threatsCount');
      const timeCount = document.getElementById('elapsedScanTime');

      if (!circ || !line || !statusBadge || !term) return;

      const log = (msg, color = '#38bdf8') => {
        const div = document.createElement('div');
        div.style.color = color;
        div.innerText = `[${new Date().toLocaleTimeString()}] ${msg}`;
        term.appendChild(div);
        term.scrollTop = term.scrollHeight;
      };

      if (action === 'start') {
        if (window.scanInterval) return;

        circ.status = 'running';
        line.status = 'running';
        statusBadge.innerText = 'RUNNING';
        statusBadge.style.background = '#e0f2fe';
        statusBadge.style.color = '#0369a1';
        log('INITIATING FULL HARDWARE DEVICE SCAN...', '#10b981');

        window.scanTimeStart = Date.now() - window.scanTimeElapsed;

        window.scanInterval = setInterval(() => {
          let current = parseFloat(circ.percent) || 0;
          if (current < 100) {
            current += 1.6;
            if (current > 100) current = 100;
            
            circ.percent = current.toFixed(1);
            line.percent = current.toFixed(1);

            // Update timer
            window.scanTimeElapsed = Date.now() - window.scanTimeStart;
            timeCount.innerText = (window.scanTimeElapsed / 1000).toFixed(1) + 's';

            // Check mock sector files
            window.scanSectors += Math.floor(Math.random() * 8) + 3;
            secCount.innerText = window.scanSectors;

            const randomFile = mockSectors[Math.floor(Math.random() * mockSectors.length)];
            log(`CHECKING: ${randomFile}`);

            // Mock threats detection at 40% and 80%
            if (current >= 40 && window.scanThreats === 0) {
              window.scanThreats = 1;
              thCount.innerText = '1';
              thCount.style.color = '#f59e0b';
              circ.status = 'warning';
              line.status = 'warning';
              statusBadge.innerText = 'WARNING';
              statusBadge.style.background = '#fef3c7';
              statusBadge.style.color = '#b45309';
              log('⚠️ SYSTEM WARNING: UNVERIFIED BUFFER DETECTED AT SECTOR 4!', '#f59e0b');
            }

            if (current >= 80 && window.scanThreats === 1) {
              window.scanThreats = 2;
              thCount.innerText = '2';
              thCount.style.color = '#ef4444';
              circ.status = 'interrupted';
              line.status = 'interrupted';
              statusBadge.innerText = 'SUSPECTED THREAT';
              statusBadge.style.background = '#fef2f2';
              statusBadge.style.color = '#b91c1c';
              log('🚨 CRITICAL ALERT: CORRUPTED MALICIOUS THREAD IN RAM BLOCK!', '#ef4444');
            }

          } else {
            clearInterval(window.scanInterval);
            window.scanInterval = null;
            circ.percent = 100;
            line.percent = 100;
            
            if (window.scanThreats > 0) {
              circ.status = 'interrupted';
              line.status = 'interrupted';
              statusBadge.innerText = 'THREAT FOUND';
              statusBadge.style.background = '#fef2f2';
              statusBadge.style.color = '#b91c1c';
              log('❌ SCAN COMPLETE: 2 CRITICAL THREATS SECURED. IMMEDIATE ACTION REQUIRED.', '#ef4444');
            } else {
              circ.status = 'completed';
              line.status = 'completed';
              statusBadge.innerText = 'COMPLETED';
              statusBadge.style.background = '#dcfce7';
              statusBadge.style.color = '#15803d';
              log('✨ SCAN COMPLETE: DEVICE SECURE. ZERO THREATS DETECTED.', '#10b981');
            }
          }
        }, 120);
      } else if (action === 'pause') {
        if (!window.scanInterval) return;
        clearInterval(window.scanInterval);
        window.scanInterval = null;
        
        statusBadge.innerText = 'PAUSED';
        statusBadge.style.background = '#f1f5f9';
        statusBadge.style.color = '#475569';
        log('SCAN SUSPENDED BY OPERATOR.', '#faad14');
      } else if (action === 'halt') {
        if (window.scanInterval) {
          clearInterval(window.scanInterval);
          window.scanInterval = null;
        }
        circ.status = 'interrupted';
        line.status = 'interrupted';
        statusBadge.innerText = 'ABORTED';
        statusBadge.style.background = '#fef2f2';
        statusBadge.style.color = '#b91c1c';
        log('❌ CRITICAL: HARDWARE SCAN ABORTED IMMEDIATELY!', '#ef4444');
      } else if (action === 'reset') {
        if (window.scanInterval) {
          clearInterval(window.scanInterval);
          window.scanInterval = null;
        }
        circ.percent = 0;
        circ.status = 'empty';
        line.percent = 0;
        line.status = 'empty';
        window.scanTimeElapsed = 0;
        window.scanSectors = 0;
        window.scanThreats = 0;

        secCount.innerText = '0';
        thCount.innerText = '0';
        thCount.style.color = '';
        timeCount.innerText = '0.0s';
        statusBadge.innerText = 'AWAITING COMMAND';
        statusBadge.style.background = '';
        statusBadge.style.color = '';
        
        term.innerHTML = `
          <div style="color: #64748b;">[SCAN ENGINE v4.2.1] INITIALIZED...</div>
          <div style="color: #64748b;">[CONSOLE] READY FOR HARDWARE RAMP...</div>
        `;
        log('SCAN TELEMETRY CLEARED AND RESET.', '#64748b');
      }
    };
  };

  showProgressPlayground();
}
