import { readFileSync, writeFileSync } from 'fs';

const DEMOS_PATH = './src/demos.json';
const demos = JSON.parse(readFileSync(DEMOS_PATH, 'utf8'));

// 1. Fix transfer-list demo 0 (Interactive Playground)
const transferListDemo0 = {
  title: 'Interactive Playground',
  description: 'Toggle props and see the Transfer List in action.',
  html: `<div class="demo-block">
  <h3>Interactive Playground</h3>
  <p style="color: #6b7280; margin-bottom: 20px;">Toggle props and see the Transfer List in action.</p>
  
  <div class="playground-settings" style="background: var(--bg-secondary); border: 1px solid var(--border-default); padding: 20px; border-radius: 8px; margin-bottom: 20px;">
    <div class="settings-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px;">
      <div class="setting-item" style="display: flex; flex-direction: column; gap: 5px;">
        <label style="color: var(--text-primary); font-size: 13px; font-weight: 600;">Mode</label>
        <ui-dropdown id="pg-mode" value="list" options='[{"label":"List","value":"list"},{"label":"Tree","value":"tree"},{"label":"Table","value":"table"}]'></ui-dropdown>
      </div>
      <div class="setting-item" style="display: flex; flex-direction: column; gap: 5px;">
        <label style="color: var(--text-primary); font-size: 13px; font-weight: 600;">Search Placeholder</label>
        <ui-input id="pg-searchPlaceholder" value="Search items..."></ui-input>
      </div>
      <div class="setting-item" style="display: flex; flex-direction: column; gap: 5px;">
        <label style="color: var(--text-primary); font-size: 13px; font-weight: 600;">Max Selected Items</label>
        <ui-number-input id="pg-max" value="10" min="1"></ui-number-input>
      </div>
      <div class="setting-item" style="display: flex; flex-direction: column; gap: 5px;">
         <label style="color: var(--text-primary); font-size: 13px; font-weight: 600;">List Height</label>
         <ui-input id="pg-height" value="300px"></ui-input>
      </div>
    </div>
    
    <div style="display: flex; flex-wrap: wrap; gap: 20px; margin-top: 20px; padding-top: 15px; border-top: 1px solid var(--border-default);">
      <ui-checkbox id="pg-searchable" label="Searchable" checked="true"></ui-checkbox>
      <ui-checkbox id="pg-enableDrag" label="Enable Drag" checked="true"></ui-checkbox>
      <ui-checkbox id="pg-sortable" label="Sortable"></ui-checkbox>
      <ui-checkbox id="pg-allowReorder" label="Allow Reorder" checked="true"></ui-checkbox>
      <ui-checkbox id="pg-oneWay" label="One Way"></ui-checkbox>
      <ui-checkbox id="pg-pagination" label="Pagination"></ui-checkbox>
      <ui-checkbox id="pg-loading" label="Loading"></ui-checkbox>
    </div>
  </div>

  <div id="playgroundPreview" style="background: white; padding: 20px; border: 1px dashed #d1d5db; border-radius: 8px;">
    <ui-transfer-list id="playground-component" icon-library="lucide"></ui-transfer-list>
  </div>
  
  <div id="pg-events" style="margin-top: 20px; padding: 15px; background: #f8fafc; border-radius: 6px; font-family: monospace; font-size: 12px; max-height: 150px; overflow: auto; border: 1px solid #e2e8f0;">
    <div style="color: #64748b; margin-bottom: 5px;">Events Log:</div>
    <div id="pg-log-content"></div>
  </div>

  <div style="margin-top: 20px; background: #1e293b; padding: 16px; border-radius: 8px; position: relative;">
    <ui-button id="copyTransferBtn" variant="outline" color="secondary" label="Copy" size="md" style="position: absolute; top: 10px; right: 10px; background: rgba(255,255,255,0.1); color: white;"></ui-button>
    <code id="transferCodeBlock" style="color: #e2e8f0; font-family: monospace; font-size: 13px; display: block; overflow-x: auto; padding-right: 50px; white-space: pre-wrap;">&lt;ui-transfer-list ...&gt;&lt;/ui-transfer-list&gt;</code>
  </div>
</div>

<script>
(function() {
  const el = document.getElementById('playground-component');
  if (!el) return;

  window.copyTransferCode = () => {
    const code = document.getElementById('transferCodeBlock').innerText;
    const btn = document.getElementById('copyTransferBtn');

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

  window.updateTransferCode = () => {
    const el = document.getElementById('playground-component');
    const codeBlock = document.getElementById('transferCodeBlock');
    if (!el || !codeBlock) return;

    let props = '';
    if (el.mode && el.mode !== 'list') props += ' mode="' + el.mode + '"';
    if (el.searchable) props += ' searchable';
    if (el.enableDrag) props += ' enable-drag';
    if (el.sortable) props += ' sortable';
    if (el.allowReorder) props += ' allow-reorder';
    if (el.oneWay) props += ' one-way';
    if (el.pagination) props += ' pagination';
    if (el.loading) props += ' loading';
    if (el.searchPlaceholder && el.searchPlaceholder !== 'Search...') props += ' search-placeholder="' + el.searchPlaceholder + '"';
    if (el.max && el.max !== 999) props += ' max="' + el.max + '"';
    if (el.height && el.height !== '300px') props += ' height="' + el.height + '"';

    let scriptStr = '';
    if (el.mode === 'tree' || el.mode === 'table') {
      scriptStr += '\\n  // Data Setup for ' + el.mode + ' mode\\n  transferList.sourceItems = items;';
      if (el.mode === 'table') scriptStr += '\\n  transferList.columns = columns;';
    } else {
      scriptStr += '\\n  // Items setup\\n  transferList.sourceItems = items;';
    }

    codeBlock.innerText = '<ui-transfer-list icon-library="lucide"' + props + '></ui-transfer-list>\\n<' + 'script>' + scriptStr + '\\n<' + '/script>';
  };

  window.updatePlayground = () => {
    const el = document.getElementById('playground-component');
    if (!el) return;

    const mode = document.getElementById('pg-mode').value;
    const searchable = document.getElementById('pg-searchable').checked;
    const enableDrag = document.getElementById('pg-enableDrag').checked;
    const sortable = document.getElementById('pg-sortable').checked;
    const allowReorder = document.getElementById('pg-allowReorder').checked;
    const oneWay = document.getElementById('pg-oneWay').checked;
    const pagination = document.getElementById('pg-pagination').checked;
    const loading = document.getElementById('pg-loading').checked;
    const searchPlaceholder = document.getElementById('pg-searchPlaceholder').value;
    const max = parseInt(document.getElementById('pg-max').value) || 999;
    const height = document.getElementById('pg-height').value || '300px';

    // Set Props
    el.mode = mode;
    el.searchable = searchable;
    el.enableDrag = enableDrag;
    el.sortable = sortable;
    el.allowReorder = allowReorder;
    el.oneWay = oneWay;
    el.pagination = pagination;
    el.loading = loading;
    el.searchPlaceholder = searchPlaceholder;
    el.max = max;
    el.height = height;

    // Update Sample Data based on mode
    if (mode === 'tree') {
      el.sourceItems = window.treeItems || [];
      el.targetItems = [];
    } else if (mode === 'table') {
      el.columns = window.tableColumns || [];
      el.sourceItems = window.sourceItems || [];
      el.targetItems = [];
    } else {
      el.sourceItems = pagination
        ? Array.from({ length: 30 }, (_, i) => ({
            key: i,
            label: 'Item ' + (i + 1),
            description: 'Pageable item ' + (i + 1),
          }))
        : (window.sourceItems || []);
      el.targetItems = [];
    }
    window.updateTransferCode();
  };

  const setupListeners = () => {
    const modeDrop = document.getElementById('pg-mode');
    const searchInput = document.getElementById('pg-searchPlaceholder');
    const maxInput = document.getElementById('pg-max');
    const heightInput = document.getElementById('pg-height');

    const searchableCheck = document.getElementById('pg-searchable');
    const drugCheck = document.getElementById('pg-enableDrag');
    const sortCheck = document.getElementById('pg-sortable');
    const reorderCheck = document.getElementById('pg-allowReorder');
    const onewayCheck = document.getElementById('pg-oneWay');
    const paginationCheck = document.getElementById('pg-pagination');
    const loadingCheck = document.getElementById('pg-loading');

    if (modeDrop) modeDrop.addEventListener('dropdownChange', window.updatePlayground);
    if (searchInput) searchInput.addEventListener('inputChange', window.updatePlayground);
    if (maxInput) maxInput.addEventListener('inputChange', window.updatePlayground);
    if (heightInput) heightInput.addEventListener('inputChange', window.updatePlayground);

    if (searchableCheck) searchableCheck.addEventListener('checkboxChange', window.updatePlayground);
    if (drugCheck) drugCheck.addEventListener('checkboxChange', window.updatePlayground);
    if (sortCheck) sortCheck.addEventListener('checkboxChange', window.updatePlayground);
    if (reorderCheck) reorderCheck.addEventListener('checkboxChange', window.updatePlayground);
    if (onewayCheck) onewayCheck.addEventListener('checkboxChange', window.updatePlayground);
    if (paginationCheck) paginationCheck.addEventListener('checkboxChange', window.updatePlayground);
    if (loadingCheck) loadingCheck.addEventListener('checkboxChange', window.updatePlayground);
  };

  setTimeout(setupListeners, 100);

  el.addEventListener('transferChange', e => {
    const log = document.getElementById('pg-log-content');
    if (log) {
      const div = document.createElement('div');
      div.textContent = '[TransferChange] Selected: ' + e.detail.target.length;
      log.prepend(div);
    }
  });

  document.getElementById('copyTransferBtn').addEventListener('click', window.copyTransferCode);
  window.updatePlayground();
})();
</script>`
};

// 2. Fix transfer-list demo 6 (Pagination & Performance)
const transferListDemo6 = {
  title: 'Pagination & Performance',
  description: 'Pagination logic for large datasets (50 items).',
  html: `<div class="demo-block">
  <h3>Pagination & Performance</h3>
  <p style="color: #6b7280; margin-bottom: 12px;">Pagination logic for large datasets (50 items).</p>
  <ui-transfer-list pagination="true" page-size="5" id="pagination-demo-list" icon-library="lucide"></ui-transfer-list>
</div>
<script>
(function() {
  setTimeout(() => {
    const el = document.getElementById('pagination-demo-list');
    if (el) {
      el.sourceItems = Array.from({ length: 50 }, (_, i) => ({
        key: i,
        label: 'Item ' + (i + 1),
        description: 'Description for item ' + (i + 1),
      }));
    }
  }, 50);
})();
</script>`
};

demos['transfer-list'][0] = transferListDemo0;
demos['transfer-list'][6] = transferListDemo6;

// 3. Inject full callout-banner demos from callout-banner-demo.js
demos['callout-banner'] = [
  {
    title: 'Visual Color Variants',
    description: 'Vibrant, high-depth semantic color styles for warnings, processes, readiness, and alerts.',
    html: `<div class="demo-block">
  <h3>Visual Color Variants</h3>
  <p style="color:#6b7280; margin-bottom:16px;">Vibrant, high-depth semantic color styles for warnings, processes, readiness, and alerts.</p>
  <div style="display:flex; flex-direction:column; gap:16px; width:100%;">
    <ui-callout-banner variant="info" heading="System Readiness" message="All primary subsystems are nominal. Execution environment ready."></ui-callout-banner>
    <ui-callout-banner variant="success" heading="Process Optimized" message="Refactoring complete. Latency reduced by 14.2ms across all nodes."></ui-callout-banner>
    <ui-callout-banner variant="warning" heading="Kernel Exception" message="Detected unusual memory allocation patterns in Sector 4."></ui-callout-banner>
    <ui-callout-banner variant="danger" heading="IO_TIMEOUT_ERROR" message="Connectivity lost with Database Cluster C. Retrying..."></ui-callout-banner>
    <ui-callout-banner variant="neutral" heading="Internal Notice" message="Workspace maintenance scheduled for Wednesday at 03:00."></ui-callout-banner>
  </div>
</div>`
  },
  {
    title: 'Visual Sizing Scales',
    description: 'Banners support multiple sizes: sm, md (default), and lg sizes to fit into sidebars, tables, or splash headers.',
    html: `<div class="demo-block">
  <h3>Visual Sizing Scales</h3>
  <p style="color:#6b7280; margin-bottom:16px;">Banners support multiple sizes to fit into sidebars, tables, or splash headers.</p>
  <div style="display:flex; flex-direction:column; gap:16px; width:100%;">
    <ui-callout-banner size="sm" variant="info" heading="Small Scale" message="Optimized for compact sidebar widgets and high density layouts."></ui-callout-banner>
    <ui-callout-banner size="md" variant="info" heading="Medium Scale (Default)" message="Standard industrial UI spacing and comfortable read."></ui-callout-banner>
    <ui-callout-banner size="lg" variant="info" heading="Large Scale" message="High visibility hero notification for dashboard splash views."></ui-callout-banner>
  </div>
</div>`
  },
  {
    title: 'Compact Density Mode',
    description: 'Compact modifier strips away padding for maximum density context.',
    html: `<div class="demo-block">
  <h3>Compact Density Mode</h3>
  <p style="color:#6b7280; margin-bottom:16px;">Compact modifier strips away padding for maximum density context.</p>
  <div style="display:flex; flex-direction:column; gap:12px; width:100%;">
    <ui-callout-banner compact variant="info" heading="Compact Node" message="v4.2.1 active"></ui-callout-banner>
    <ui-callout-banner compact variant="success" heading="Synced" message="14,204 records updated."></ui-callout-banner>
    <ui-callout-banner compact outlined variant="danger" heading="Locked" message="Account suspended."></ui-callout-banner>
  </div>
</div>`
  },
  {
    title: 'Site-wide Banner Mode',
    description: 'Stretches the callout banner full-width to display notices at the top/bottom of screen bounds with slot action triggers.',
    html: `<div class="demo-block">
  <h3>Site-wide Banner Mode</h3>
  <p style="color:#6b7280; margin-bottom:16px;">Stretches the callout banner full-width to display notices with action buttons.</p>
  <div style="display:flex; flex-direction:column; gap:16px; width:100%;">
    <ui-callout-banner banner variant="info" heading="Site-Wide Maintenance" message="Facility systems will be offline for 2 hours for security patches.">
      <ui-button slot="actions" variant="outline" color="primary" label="View Schedule" size="md"></ui-button>
    </ui-callout-banner>
    <ui-callout-banner banner variant="success" heading="Enterprise Mode Active" message="Dedicated cloud environment initialized. All security protocols enforced." closable="false"></ui-callout-banner>
  </div>
</div>`
  },
  {
    title: 'Premium Modifiers & Animations',
    description: 'Toggle pulse glows, active loading state widgets, and solid backgrounds.',
    html: `<div class="demo-block">
  <h3>Premium Modifiers & Animations</h3>
  <p style="color:#6b7280; margin-bottom:16px;">Toggle pulse glows, active loading state widgets, and solid backgrounds.</p>
  <div style="display:flex; flex-direction:column; gap:16px; width:100%;">
    <ui-callout-banner loading variant="info" heading="Initializing Resources" message="Provisioning remote compute containers..."></ui-callout-banner>
    <ui-callout-banner pulse variant="danger" heading="ALARM: BREACH" message="Atmospheric seal compromise in Deck 4. Evacuate immediately."></ui-callout-banner>
    <ui-callout-banner solid variant="info" heading="Solid Primary Background" message="High-contrast solid treatment optimized for industrial telemetry dashboards."></ui-callout-banner>
    <ui-callout-banner accent-bar variant="warning" heading="Accent Bar Style" message="Visual alignment with modern IDE environments and developer tools."></ui-callout-banner>
  </div>
</div>`
  },
  {
    title: '📍 Coordinate-Aware Map Annotations',
    description: 'Banners function beautifully as pointer-anchored overlay tags on interactive visual canvas boards.',
    html: `<div class="demo-block">
  <h3>📍 Coordinate-Aware Map Annotations</h3>
  <p style="color:#6b7280; margin-bottom:16px;">Banners function beautifully as pointer-anchored overlay tags on interactive visual canvas boards.</p>
  <div style="width:100%; height:350px; background:#0f172a; border-radius:12px; position:relative; overflow:hidden; border:1px solid rgba(255,255,255,0.05);">
    <div style="width: 10px; height: 10px; border-radius: 50%; position: absolute; top: 20%; left: 30%; background: #ef4444; box-shadow: 0 0 10px #ef4444; animation: pt-pulse 1.5s infinite;"></div>
    <ui-callout-banner variant="danger" placement="bottom" heading="PUMP_FAIL" pulse="true" size="md" style="position: absolute; top: 25%; left: 30%; transform: translateX(-50%); width: 180px;">Check valve 7.</ui-callout-banner>

    <div style="width: 10px; height: 10px; border-radius: 50%; position: absolute; top: 70%; left: 75%; background: #22c55e; box-shadow: 0 0 10px #22c55e;"></div>
    <ui-callout-banner variant="success" placement="top" heading="BOILER_OK" size="md" style="position: absolute; top: 62%; left: 75%; transform: translateX(-50%); width: 140px;">Efficiency: 98%.</ui-callout-banner>

    <div style="width: 10px; height: 10px; border-radius: 50%; position: absolute; top: 50%; left: 10%; background: #10b981; box-shadow: 0 0 10px #10b981;"></div>
    <ui-callout-banner variant="info" placement="right" heading="SENSOR_HUB" size="md" style="position: absolute; top: 50%; left: 14%; transform: translateY(-50%); width: 160px;">Link active.</ui-callout-banner>
  </div>
</div>`
  },
  {
    title: '📈 Real-time Marquee Stock Tickers',
    description: 'Announce high-speed data feeds with custom scroll speed and automatic pause-on-hover logic.',
    html: `<div class="demo-block">
  <h3>📈 Real-time Marquee Stock Tickers</h3>
  <p style="color:#6b7280; margin-bottom:16px;">Announce high-speed data feeds with custom scroll speed and automatic pause-on-hover logic.</p>
  
  <div style="display:flex; flex-direction:column; gap:16px; width:100%;">
    <ui-callout-banner banner="true" marquee="true" marquee-speed="15" variant="neutral" no-icon="true" size="md" pause-on-hover="true" style="background:#000; color:#fff; font-family:monospace; border-bottom:1px solid #333;">
      AAPL <span style="color:#22c55e">▲ 184.22 (+1.4%)</span> &bull; 
      MSFT <span style="color:#ef4444">▼ 328.79 (-0.8%)</span> &bull; 
      GOOGL <span style="color:#22c55e">▲ 138.21 (+0.5%)</span> &bull; 
      TSLA <span style="color:#ef4444">▼ 214.50 (-3.2%)</span> &bull; 
      NVDA <span style="color:#22c55e">▲ 485.42 (+4.1%)</span> &bull; 
      AMZN <span style="color:#22c55e">▲ 145.22 (+1.1%)</span> &bull;
      META <span style="color:#ef4444">▼ 312.44 (-0.2%)</span> &bull;
    </ui-callout-banner>

    <ui-callout-banner marquee="true" marquee-speed="12" variant="info" no-icon="true" size="md">
      EUR/USD 1.0854 &plusmn;0.0002 &bull; GBP/USD 1.2642 +0.0014 &bull; USD/JPY 149.22 -0.15 &bull; AUD/USD 0.6542 -0.0022 &bull; USD/CAD 1.3482 +0.0011 &bull;
    </ui-callout-banner>
  </div>
</div>`
  },
  {
    title: '💾 Persistent Local Dismissal',
    description: 'Banners store their dismissal state inside localStorage so they remember to stay closed even after page refresh.',
    html: `<div class="demo-block">
  <h3>💾 Persistent Local Dismissal</h3>
  <p style="color:#6b7280; margin-bottom:16px;">Banners store their dismissal state inside localStorage so they remember to stay closed even after page refresh.</p>
  
  <div style="display:flex; flex-direction:column; gap:16px; width:100%;">
    <ui-callout-banner persist-key="demo-banner-1" variant="info" heading="Terms Update" message="We've updated our service protocols. Dismiss this to never see it again on this device."></ui-callout-banner>
    <ui-callout-banner persist-key="demo-banner-2" variant="success" heading="Tip: Key Shortcuts" message="Press [CTRL+K] to open the global command palette."></ui-callout-banner>

    <div style="margin-top:20px; padding:15px; background:var(--bg-secondary); border:1px solid var(--border-default); border-radius:8px;">
      <h4 style="margin:0 0 8px 0; font-size:14px; color:var(--text-primary);">Developer Debug</h4>
      <ui-button id="btnClearPersistence" variant="outline" color="danger" label="Clear Storage & Reload" size="md"></ui-button>
      <p style="margin:8px 0 0 0; font-size:11px; color:var(--text-secondary); opacity:0.8;">Clearing storage will reset the dismissal state for all banners in this demo.</p>
    </div>
  </div>
</div>
<script>
(function() {
  const btn = document.getElementById('btnClearPersistence');
  if (btn) {
    btn.addEventListener('click', () => {
      localStorage.clear();
      window.location.reload();
    });
  }
})();
</script>`
  }
];

// Write back updated demos.json
writeFileSync(DEMOS_PATH, JSON.stringify(demos, null, 2), 'utf8');
console.log('Successfully patched demos.json with clean transfer-list and rich callout-banner demos!');
