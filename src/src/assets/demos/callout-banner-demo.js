export function initCalloutBannerDemo() {
  const section = document.getElementById('callout-banner');
  if (!section) return;

  section.innerHTML = `
    <div class="demo-wrapper">
      <div class="demo-header-section" style="margin-bottom: 12px;">
        <h2 class="demo-section-title">Callout & Annotation Master System</h2>
        <p class="demo-section-subtitle" style="opacity: 0.7; font-size: 13px;">Unified industrial messaging with dismissible banners, auto-close timers, slot overrides, and coordinate-aware annotations.</p>
      </div>

      <nav id="cbNavPills" style="display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 24px; background: var(--bg-secondary); padding: 10px; border-radius: 12px; border: 1px solid var(--border-default);">
        <ui-button variant="outline" data-tab="variants">Variants</ui-button>
        <ui-button variant="outline" data-tab="size">Size</ui-button>
        <ui-button variant="outline" data-tab="compact">Compact</ui-button>
        <ui-button variant="outline" data-tab="banner">Banner Mode</ui-button>
        <ui-button variant="outline" data-tab="slots">Slots</ui-button>
        <ui-button variant="outline" data-tab="autoclose">Auto-Close</ui-button>
        <ui-button variant="outline" data-tab="stack">Stack</ui-button>
        <ui-button variant="outline" data-tab="newfeatures">Industrial Props</ui-button>
        <ui-button variant="outline" data-tab="annotations">📍 Annotations</ui-button>
        <ui-button variant="outline" data-tab="extras">Sticky / Truncate</ui-button>
        <ui-button variant="outline" data-tab="tickers">📈 Stock Tickers</ui-button>
        <ui-button variant="outline" data-tab="link">Link</ui-button>
        <ui-button variant="outline" data-tab="persistence">💾 Persistence</ui-button>
        <ui-button variant="outline" data-tab="delayclose">Delayed Close</ui-button>
        <ui-button variant="outline" data-tab="update">API Methods</ui-button>
        <ui-button variant="outline" data-tab="access">Accessibility</ui-button>
        <ui-button variant="outline" data-tab="dark">Dark Context</ui-button>
        <ui-button variant="outline" data-tab="advanced">Advanced</ui-button>
        <ui-button variant="outline" data-tab="playground">Playground</ui-button>
      </nav>

      <div id="cbDemoContainer"></div>
    </div>

    <style>
      .cb-tab-active { background: var(--bg-active); }
      .cb-section-label { font-size: 10px; font-weight: 700; color: var(--text-tertiary); text-transform: uppercase; margin-bottom: 8px; display: block; letter-spacing: 0.05em; }
      .cb-grid { display: grid; gap: 16px; width: 100%; }
      .cb-panel { background: var(--bg-secondary); border: 1px solid var(--border-default); border-radius: 12px; padding: 20px; }
      .demo-map-sim { width: 100%; height: 350px; background: #0f172a; border-radius: 12px; position: relative; overflow: hidden; border: 1px solid rgba(255,255,255,0.05); }
      .map-point { width: 10px; height: 10px; border-radius: 50%; position: absolute; background: currentColor; box-shadow: 0 0 10px currentColor; }
      .map-point.pulsed { animation: pt-pulse 1.5s infinite; }
      @keyframes pt-pulse { 0% { transform: scale(1); opacity: 1; } 70% { transform: scale(1.1); opacity: 0.6; } 100% { transform: scale(1); opacity: 1; } }
      .demo-card-lite { background: var(--bg-primary); border: 1px solid var(--border-default); border-radius: 10px; padding: 16px; box-shadow: var(--shadow-sm); }
    </style>
  `;

  const container = document.getElementById('cbDemoContainer');
  const nav = document.getElementById('cbNavPills');

  const pgUpdate = () => {
    const v = document.getElementById('pg-v')?.value || 'info';
    const p = document.getElementById('pg-p')?.value || 'none';
    const l = document.getElementById('pg-l')?.checked || false;
    const pu = document.getElementById('pg-pu')?.checked || false;
    const m = document.getElementById('pg-m')?.checked || false;
    const s = document.getElementById('pg-s')?.checked || false;
    const target = document.getElementById('pg-p-target');
    if (target) {
      target.innerHTML = `
        <ui-callout-banner style="width:100%; max-width:400px;" 
            variant="${v}" 
            placement="${p}" 
            loading="${l}" 
            pulse="${pu}" 
            marquee="${m}" 
            solid="${s}" 
            heading="Sandbox Result" 
            message="Testing industrial properties in a unified component context.">
        </ui-callout-banner>
      `;
    }
  };

  const demoMap = {
    variants: () => {
      container.innerHTML = `
        <div class="cb-grid">
          <ui-callout-banner variant="info" heading="System Readiness" message="All primary subsystems are nominal. Execution environment ready."></ui-callout-banner>
          <ui-callout-banner variant="success" heading="Process Optimized" message="Refactoring complete. Latency reduced by 14.2ms across all nodes."></ui-callout-banner>
          <ui-callout-banner variant="warning" heading="Kernel Exception" message="Detected unusual memory allocation patterns in Sector 4."></ui-callout-banner>
          <ui-callout-banner variant="danger" heading="IO_TIMEOUT_ERROR" message="Connectivity lost with Database Cluster C. Retrying..."></ui-callout-banner>
          <ui-callout-banner variant="neutral" heading="Internal Notice" message="Workspace maintenance scheduled for Wednesday at 03:00."></ui-callout-banner>
        </div>
      `;
    },
    size: () => {
      container.innerHTML = `
        <div class="cb-grid">
          <ui-callout-banner size="md" variant="info" heading="Small Scale" message="Optimized for sidebar data."></ui-callout-banner>
          <ui-callout-banner size="md" variant="info" heading="md Scale (Default)" message="Standard industrial UI spacing."></ui-callout-banner>
          <ui-callout-banner size="lg" variant="info" heading="Large Scale" message="High visibility for critical dashboard views."></ui-callout-banner>
        </div>
      `;
    },
    compact: () => {
      container.innerHTML = `
        <div class="cb-grid">
          <ui-callout-banner compact variant="info" heading="Compact Node" message="v4.2.1 active"></ui-callout-banner>
          <ui-callout-banner compact variant="success" heading="Synced" message="14,204 records updated."></ui-callout-banner>
          <ui-callout-banner compact outlined variant="danger" heading="Locked" message="Account suspended."></ui-callout-banner>
        </div>
      `;
    },
    banner: () => {
      container.innerHTML = `
        <div class="cb-grid" style="margin: -20px; padding: 20px;">
          <ui-callout-banner banner variant="info" heading="Site-Wide Maintenance" message="Facility systems will be offline for 2 hours for security patches.">
            <ui-button slot="actions" variant="outline" color="primary" label="View Schedule" size="md"ui-button>
          </ui-callout-banner>
          <ui-callout-banner banner variant="success" heading="Enterprise Mode Active" message="Dedicated cloud environment initialized. All security protocols enforced." closable="false"></ui-callout-banner>
        </div>
      `;
    },
    slots: () => {
      container.innerHTML = `
        <div class="cb-grid">
          <ui-callout-banner variant="info">
            <div slot="icon" style="background:var(--bg-secondary); padding:8px; border-radius:8px; border:1px solid var(--border-default);"><ui-icon name="sparkles" library="lucide" size="20px"></ui-icon></div>
            <div slot="title" style="display:flex; align-items:center; gap:8px;"><strong>Premium Feature</strong> <ui-pill color="primary" variant="outline" label="NEW" size="md"ui-pill></div>
            <p style="margin:0; font-size:13px; color: var(--text-secondary);">Experience the new advanced data streaming engine with real-time analytics.</p>
            <div slot="actions" style="margin-top:8px;"><ui-button variant="outline" color="secondary" label="Launch Engine" size="md"ui-button></div>
          </ui-callout-banner>
        </div>
      `;
    },
    autoclose: () => {
      container.innerHTML = `
        <div class="cb-grid">
          <span class="cb-section-label">Auto-close with persistent progress tracker</span>
          <ui-callout-banner auto-close="5000" variant="success" heading="Changes Saved" message="This message will dismiss in 5 seconds."></ui-callout-banner>
          <ui-callout-banner auto-close="10000" variant="info" heading="Sync in Progress" message="Dismisses in 10 seconds. Pointer-logic and auto-close synced."></ui-callout-banner>
        </div>
      `;
    },
    stack: () => {
      container.innerHTML = `
        <div class="cb-grid">
          <ui-callout-banner variant="info" heading="Update 1" message="Core system patch available."></ui-callout-banner>
          <ui-callout-banner variant="success" heading="Update 2" message="Database backup successful."></ui-callout-banner>
          <ui-callout-banner variant="warning" heading="Update 3" message="API rate limit approaching."></ui-callout-banner>
        </div>
      `;
    },
    newfeatures: () => {
      container.innerHTML = `
        <div class="cb-grid">
          <span class="cb-section-label">Industrial Modifiers</span>
          <ui-callout-banner loading variant="info" heading="Initializing" message="Provisioning remote compute resources..."></ui-callout-banner>
          <ui-callout-banner pulse variant="danger" heading="ALARM: BREACH" message="Atmospheric seal compromise in Deck 4. Evacuate immediately."></ui-callout-banner>
          <ui-callout-banner solid variant="info" heading="Solid Accent" message="High-depth visual treatment for industrial dashboards."></ui-callout-banner>
          <ui-callout-banner accent-bar variant="warning" heading="Accent Bar Mode" message="Visual alignment with modern IDE environments."></ui-callout-banner>
          <ui-callout-banner no-icon variant="neutral" heading="Text-Only Mode" message="Clean minimalist interface for high-density data tables."></ui-callout-banner>
        </div>
      `;
    },
    annotations: () => {
      container.innerHTML = `
        <div class="demo-card-lite">
          <span class="cb-section-label">Industrial Map Simulator (Pointer Logics)</span>
          <div class="demo-map-sim">
             <div class="map-point pulsed" style="top: 20%; left: 30%; color: #ef4444;"></div>
             <ui-callout-banner variant="danger" placement="bottom" heading="PUMP_FAIL" pulse="true" size="md" style="position: absolute; top: 25%; left: 30%; transform: translateX(-50%); width: 180px;">Check valve 7.</ui-callout-banner>

             <div class="map-point" style="top: 70%; left: 75%; color: #22c55e;"></div>
             <ui-callout-banner variant="success" placement="top" heading="BOILER_OK" size="md" style="position: absolute; top: 62%; left: 75%; transform: translateX(-50%); width: 140px;">Efficiency: 98%.</ui-callout-banner>

             <div class="map-point" style="top: 50%; left: 10%; color: #10b981;"></div>
             <ui-callout-banner variant="info" placement="right" heading="SENSOR_HUB" size="md" style="position: absolute; top: 50%; left: 14%; transform: translateY(-50%); width: 160px;">Link active.</ui-callout-banner>
          </div>
        </div>
      `;
    },
    extras: () => {
      container.innerHTML = `
        <div class="cb-grid">
          <span class="cb-section-label">Truncate Logic with Show-More toggle</span>
          <ui-callout-banner truncate="2" variant="info" heading="Detailed Report" message="This is a very long log entry that contains massive amounts of diagnostic information, including stack traces, memory dumps, and environment variables that are usually hidden unless the user explicitly requests more detail."></ui-callout-banner>
          
          <span class="cb-section-label">Sticky Positioning</span>
          <div style="height:150px; overflow-y:auto; border:1px solid var(--border-default); border-radius:8px;">
             <ui-callout-banner sticky variant="warning" heading="FROZEN LOGS" message="Displaying cached data from 12:00. Scroll to see more."></ui-callout-banner>
             <div style="padding:10px;">${Array.from({ length: 10 }, (_, i) => `<p>Line ${i + 1}: Background telemetry data streaming...</p>`).join('')}</div>
          </div>
        </div>
      `;
    },
    tickers: () => {
      container.innerHTML = `
        <div class="cb-grid">
          <span class="cb-section-label">Industrial Market Ticker (Nasdaq style — Hover to Pause)</span>
          <ui-callout-banner banner="true" marquee="true" marquee-speed="15" variant="neutral" no-icon="true" size="md" pause-on-hover="true" style="background:#000; color:#fff; font-family:monospace; border-bottom:1px solid #333;">
            AAPL <span style="color:#22c55e">▲ 184.22 (+1.4%)</span> &bull; 
            MSFT <span style="color:#ef4444">▼ 328.79 (-0.8%)</span> &bull; 
            GOOGL <span style="color:#22c55e">▲ 138.21 (+0.5%)</span> &bull; 
            TSLA <span style="color:#ef4444">▼ 214.50 (-3.2%)</span> &bull; 
            NVDA <span style="color:#22c55e">▲ 485.42 (+4.1%)</span> &bull; 
            AMZN <span style="color:#22c55e">▲ 145.22 (+1.1%)</span> &bull;
            META <span style="color:#ef4444">▼ 312.44 (-0.2%)</span> &bull;
          </ui-callout-banner>

          <span class="cb-section-label">Global Forex Stream (Standard variant colors)</span>
          <ui-callout-banner marquee="true" marquee-speed="12" variant="info" no-icon="true" size="md">
            EUR/USD 1.0854 &plusmn;0.0002 &bull; GBP/USD 1.2642 +0.0014 &bull; USD/JPY 149.22 -0.15 &bull; AUD/USD 0.6542 -0.0022 &bull; USD/CAD 1.3482 +0.0011 &bull;
          </ui-callout-banner>

          <span class="cb-section-label">Mission Control (High Speed Alert Ticker)</span>
          <ui-callout-banner marquee="true" marquee-speed="6" variant="danger" solid="true">
            CORE MELTDOWN IN PROGRESS &bull; DECOMPRESSION DETECTED IN SECTOR 7 &bull; POWER GRID FAILURE %88 &bull; EMERGENCY EVACUATION MANDATORY &bull;
          </ui-callout-banner>
        </div>
      `;
    },
    persistence: () => {
      container.innerHTML = `
        <div class="cb-grid">
          <span class="cb-section-label">Persistent Dismissal (Uses localStorage)</span>
          <p style="font-size:13px; color:var(--text-secondary); margin-bottom:12px;">These banners will remember if you've dismissed them even after you refresh the page.</p>
          
          <ui-callout-banner persist-key="demo-banner-1" variant="info" heading="Terms Update" message="We've updated our service protocols. Dismiss this to never see it again on this device."></ui-callout-banner>
          <ui-callout-banner persist-key="demo-banner-2" variant="success" heading="Tip: Key Shortcuts" message="Press [CTRL+K] to open the global command palette."></ui-callout-banner>

          <div style="margin-top:20px; padding:15px; background:var(--bg-secondary); border:1px solid var(--border-default); border-radius:8px;">
            <h4 style="margin:0 0 8px 0; font-size:14px; color:var(--text-primary);">Developer Debug</h4>
            <ui-button id="btnClearPersistence" variant="outline" color="danger" label="Clear Storage & Reload" size="md"ui-button>
            <p style="margin:8px 0 0 0; font-size:11px; color:var(--text-secondary); opacity:0.8;">Clearing storage will reset the dismissal state for all banners in this demo.</p>
          </div>
        </div>
      `;
      document.getElementById('btnClearPersistence')?.addEventListener('click', () => {
        localStorage.clear();
        window.location.reload();
      });
    },
    link: () => {
      container.innerHTML = `
        <div class="cb-grid">
          <ui-callout-banner href="https://google.com" target="_blank" variant="info" heading="External Documentation" message="Open technical specs in a new tab."></ui-callout-banner>
        </div>
      `;
    },
    delayclose: () => {
      container.innerHTML = `
        <div class="cb-grid">
           <ui-callout-banner closable-after="5000" variant="warning" heading="Forced Visibility" message="Close button will appear after 5 seconds of active exposure."></ui-callout-banner>
        </div>
      `;
    },
    update: () => {
      container.innerHTML = `
        <div class="cb-grid">
          <ui-callout-banner id="apiDemo" variant="info" heading="API Controller" message="Observe the property changes."></ui-callout-banner>
          <ui-button id="btnRunUpdate" variant="outline" color="primary" label="Run update()" size="md"yle="width:fit-content;"></ui-button>
        </div>
      `;
      document.getElementById('btnRunUpdate')?.addEventListener('click', () => {
        const banner = document.getElementById('apiDemo');
        if (banner && typeof banner.update === 'function') {
          banner.update({ variant: 'success', heading: 'Success!', solid: true });
        }
      });
    },
    access: () => {
      container.innerHTML = `
        <div class="cb-grid">
          <ui-callout-banner aria-role="alert" variant="danger" heading="Urgent Notification" message="This banner uses role='alert' for immediate consumption by assistive technology."></ui-callout-banner>
          <p style="font-size:12px; color:var(--text-tertiary);">Includes full Keyboard, Focus, and Screen Reader support.</p>
        </div>
      `;
    },
    dark: () => {
      container.innerHTML = `
        <div style="background:#0f172a; padding:40px; border-radius:12px;" class="dark">
          <div class="cb-grid">
            <ui-callout-banner variant="info" heading="Dark Mode Active" message="High-contrast colors optimized for dark UI context."></ui-callout-banner>
            <ui-callout-banner variant="success" heading="Success" message="Subtle shadows and vibrant accents."></ui-callout-banner>
          </div>
        </div>
      `;
    },
    advanced: () => {
      container.innerHTML = `
        <div class="cb-grid">
          <ui-callout-banner test-id="banner-001" variant="info" heading="Test Attribute" message="Includes data-testid for automated selenium/cypress discovery."></ui-callout-banner>
          <ui-callout-banner pause-on-hover auto-close="10000" variant="warning" heading="Pause Logic" message="Countdown pauses when the mouse is over the component."></ui-callout-banner>
        </div>
      `;
    },
    playground: () => {
      container.innerHTML = `
        <div class="cb-panel">
          <div style="display:grid; grid-template-columns: 280px 1fr; gap: 30px;">
            <div class="cb-grid">
              <ui-dropdown id="pg-v" label="VARIANT" value="info">
                <option value="info">info</option>
                <option value="success">success</option>
                <option value="warning">warning</option>
                <option value="danger">danger</option>
                <option value="neutral">neutral</option>
              </ui-dropdown>
              
              <ui-dropdown id="pg-p" label="PLACEMENT (TAIL)" value="none">
                <option value="none">none</option>
                <option value="top">top</option>
                <option value="bottom">bottom</option>
                <option value="left">left</option>
                <option value="right">right</option>
              </ui-dropdown>
              
              <div style="display:flex; flex-direction:column; gap:8px;">
                 <ui-checkbox id="pg-l" label="loading"></ui-checkbox>
                 <ui-checkbox id="pg-pu" label="pulse"></ui-checkbox>
                 <ui-checkbox id="pg-m" label="marquee"></ui-checkbox>
                 <ui-checkbox id="pg-s" label="solid"></ui-checkbox>
              </div>
            </div>
            <div id="pg-p-target" style="background:var(--bg-primary); border-radius:12px; border:2px dashed var(--border-default); display:flex; align-items:center; justify-content:center; padding:20px;"></div>
          </div>
        </div>
      `;

      const controls = [
        { id: 'pg-v', event: 'dropdownChange' },
        { id: 'pg-p', event: 'dropdownChange' },
        { id: 'pg-l', event: 'checkboxChange' },
        { id: 'pg-pu', event: 'checkboxChange' },
        { id: 'pg-m', event: 'checkboxChange' },
        { id: 'pg-s', event: 'checkboxChange' },
      ];
      controls.forEach(c => {
        document.getElementById(c.id)?.addEventListener(c.event, pgUpdate);
      });
      pgUpdate();
    },
  };

  const showTab = tab => {
    if (demoMap[tab]) {
      demoMap[tab]();

      // Update nav button styles
      // if (nav) {
      //   nav.querySelectorAll('ui-button').forEach(btn => {
      //     const isMatch = btn.getAttribute('data-tab') === tab;
      //     btn.variant = isMatch ? 'solid' : 'soft';
      //     btn.color = isMatch ? (tab === 'playground' ? 'primary' : 'secondary') : 'secondary';
      //   });
      // }
    }
  };

  // Wire up navigation
  if (nav) {
    nav.querySelectorAll('ui-button').forEach(btn => {
      btn.addEventListener('click', () => {
        const tab = btn.getAttribute('data-tab');
        showTab(tab);
      });
    });
  }

  // Initial tab
  showTab('variants');
}
