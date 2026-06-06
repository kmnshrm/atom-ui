import { loadLayoutConfigs, applyLayoutConfig } from '../utils/layout-loader.js';

/**
 * Workspace Manager Demo (Zenith Layout Experience)
 * Showcases advanced layout management, persistence, and dynamic panel operations.
 */
export async function initWorkspaceManagerDemo() {
  const container = document.getElementById('workspace-manager');
  if (!container) return;

  container.innerHTML = `
    <div class="zenith-playground-header" style="margin-bottom: 24px; padding: 20px; background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); border-radius: 12px; color: white;">
      <h2 style="margin: 0; display: flex; align-items: center; gap: 12px;">
        <span style="font-size: 28px;">🏗️</span> Zenith Workspace Manager
        <span style="font-size: 12px; background: #10b981; padding: 4px 8px; border-radius: 20px; font-weight: normal; margin-left: 10px;">Enterprise Edition</span>
      </h2>
      <p style="margin: 10px 0 0; opacity: 0.8; font-size: 15px;">Advanced multi-region layout engine with dynamic split-testing, persistence, and component-based docking.</p>
    </div>

    <div class="playground-grid" style="display: grid; grid-template-columns: 280px 1fr; gap: 24px; min-height: 800px;">
      <!-- Sidebar Controls -->
      <div class="controls-column" style="display: flex; flex-direction: column; gap: 20px;">
        
        <!-- Templates Section -->
        <div class="control-card" style="background: var(--bg-primary); border-radius: 12px; padding: 20px; border: 1px solid var(--border-default); box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);">
          <h4 style="margin: 0 0 16px; font-size: 14px; text-transform: uppercase; color: var(--text-muted); letter-spacing: 0.05em; display: flex; align-items: center; gap: 8px;">
            <span style="color: #10b981;">📐</span> Layout Templates
          </h4>
          <div style="display: flex; flex-direction: column; gap: 10px;">
            <ui-button class="template-btn" data-layout="copilot" variant="outline" color="secondary" style="--btn-width: 100%; text-align: left; display: block; border: 1.5px solid var(--border-default); padding: 12px;">
              <strong style="display: block; font-size: 14px; color: var(--text-primary);">GitHub Copilot</strong>
              <span style="font-size: 11px; color: var(--text-secondary);">Editor + AI Assistant (70:30)</span>
            </ui-button>
            <ui-button class="template-btn" data-layout="ide" variant="outline" color="secondary" style="--btn-width: 100%; text-align: left; display: block; border: 1.5px solid var(--border-default); padding: 12px;">
              <strong style="display: block; font-size: 14px; color: var(--text-primary);">IDE Layout</strong>
              <span style="font-size: 11px; color: var(--text-secondary);">Explorer + Editor + Console</span>
            </ui-button>
            <ui-button class="template-btn" data-layout="dashboard" variant="outline" color="secondary" style="--btn-width: 100%; text-align: left; display: block; border: 1.5px solid var(--border-default); padding: 12px;">
              <strong style="display: block; font-size: 14px; color: var(--text-primary);">Grid Dashboard</strong>
              <span style="font-size: 11px; color: var(--text-secondary);">Multi-widget visual layout</span>
            </ui-button>
            <ui-button class="template-btn" data-layout="data-center" variant="outline" color="warning" style="--btn-width: 100%; text-align: left; display: block; border: 1.5px solid #ffedd5; padding: 12px;">
              <strong style="display: block; font-size: 14px; color: #9a3412;">📊 Data Center</strong>
              <span style="font-size: 11px; color: #c2410c;">Rich tables & metrics demo</span>
            </ui-button>
            <ui-button class="template-btn" data-layout="containers" variant="outline" color="secondary" style="--btn-width: 100%; text-align: left; display: block; border: 1.5px solid var(--border-default); padding: 12px;">
              <strong style="display: block; font-size: 14px; color: var(--text-primary);">Container Types</strong>
              <span style="font-size: 11px; color: var(--text-secondary);">Content, Nav, and Header-only</span>
            </ui-button>
          </div>
        </div>

        <!-- Component Actions -->
        <div class="control-card" style="background: var(--bg-primary); border-radius: 12px; padding: 20px; border: 1px solid var(--border-default); box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);">
          <h4 style="margin: 0 0 16px; font-size: 14px; text-transform: uppercase; color: var(--text-muted); letter-spacing: 0.05em; display: flex; align-items: center; gap: 8px;">
            <span style="color: #10b981;">⚡</span> Quick Actions
          </h4>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
            <ui-button id="wm-add-panel-btn" variant="outline" color="primary" label="+ Panel"></ui-button>
            <ui-button id="wm-add-region-btn" variant="outline" color="success" label="+ Region"></ui-button>
            <ui-button id="wm-split-h-btn" variant="outline" color="secondary" label="Split H" style="background-color: #8b5cf6;"></ui-button>
            <ui-button id="wm-split-v-btn" variant="outline" color="secondary" label="Split V" style="background-color: #8b5cf6;"></ui-button>
            <ui-button id="wm-merge-btn" variant="outline" color="warning" label="Merge Regions"></ui-button>
            <ui-button id="wm-export-btn" variant="outline" color="secondary" label="Export JSON"></ui-button>
            <ui-button id="wm-reset-btn" variant="outline" color="danger" label="Reset All" style="grid-column: span 2;"></ui-button>
          </div>
        </div>

        <!-- Status & Stats -->
        <div class="control-card" style="background: var(--bg-secondary); border-radius: 12px; padding: 20px; border: 1px solid var(--border-default);">
          <h4 style="margin: 0 0 12px; font-size: 12px; text-transform: uppercase; color: var(--text-muted); letter-spacing: 0.05em;">Workspace Status</h4>
          <div style="display: flex; flex-direction: column; gap: 12px;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <span style="font-size: 13px; color: var(--text-secondary);">Active Regions</span>
              <span id="stat-regions" style="font-weight: 700; color: var(--text-primary); background: var(--bg-primary); padding: 2px 8px; border-radius: 4px; border: 1px solid var(--border-default);">0</span>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <span style="font-size: 13px; color: var(--text-secondary);">Total Panels</span>
              <span id="stat-panels" style="font-weight: 700; color: var(--text-primary); background: var(--bg-primary); padding: 2px 8px; border-radius: 4px; border: 1px solid var(--border-default);">0</span>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <span style="font-size: 13px; color: var(--text-secondary);">Persistence</span>
              <span style="font-size: 11px; background: var(--color-success-subtle); color: var(--color-success); padding: 2px 6px; border-radius: 4px; font-weight: bold;">Enabled</span>
            </div>
          </div>
        </div>

        <div style="padding: 16px; background: var(--bg-selected); border-radius: 10px; border-left: 4px solid var(--color-primary);">
          <p style="margin: 0; font-size: 12px; color: var(--color-primary); line-height: 1.5;">
            <strong>Pro Tip:</strong> Layouts are persisted to localStorage using the <code>state-key</code> property. Splitters are bidirectionally resizable.
          </p>
        </div>
      </div>

      <!-- Main Canvas Area -->
      <div class="canvas-column" style="display: flex; flex-direction: column; gap: 20px;">
        <div style="background: var(--bg-primary); border-radius: 16px; border: 1px solid var(--border-default); overflow: hidden; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1); height: 750px; position: relative;">
          <ui-workspace-manager 
            id="zenith-wm-playground" 
            save-state="true" 
            state-key="zenith-playground-v1" 
            direction="horizontal"
          ></ui-workspace-manager>
        </div>

        <!-- Data Output -->
        <div id="wm-json-output" style="display: none;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
            <h4 style="margin: 0; font-size: 14px; color: var(--text-muted); text-transform: uppercase;">Exported Layout JSON</h4>
            <ui-button onclick="this.closest('#wm-json-output').style.display='none'" variant="ghost" color="danger" label="Close ×"></ui-button>
          </div>
          <pre id="wm-json-display" style="background: var(--bg-secondary); color: var(--text-primary); padding: 20px; border-radius: 12px; font-family: 'Fira Code', monospace; font-size: 12px; overflow-x: auto; max-height: 400px; box-shadow: inset 0 2px 10px rgba(0,0,0,0.5);"></pre>
        </div>
      </div>
    </div>
  `;

  const wm = document.getElementById('zenith-wm-playground');
  const configs = await loadLayoutConfigs('/build/assets/layout-configs.json');

  // Handle template selection
  const templateBtns = container.querySelectorAll('.template-btn');
  templateBtns.forEach(btn => {
    btn.onclick = async () => {
      const layoutKey = btn.getAttribute('data-layout');
      if (configs && configs[layoutKey]) {
        // Visual feedback
        templateBtns.forEach(b => {
          b.style.borderColor = 'var(--border-default)';
          b.style.background = 'transparent';
        });
        btn.style.borderColor = 'var(--color-primary)';
        btn.style.background = 'var(--bg-selected)';

        await applyLayoutConfig('zenith-wm-playground', configs[layoutKey]);
        updateStats();
      }
    };
  });

  // Action Buttons
  document.getElementById('wm-add-panel-btn').onclick = () => {
    const regions = wm.regions || [];
    if (regions.length === 0) {
      alert('Please add a region first or load a template.');
      return;
    }
    const targetRegion = regions[Math.floor(Math.random() * regions.length)].id;
    const panelId = `panel-${Date.now()}`;
    wm.addPanel({
      regionId: targetRegion,
      id: panelId,
      title: `Dynamic Panel`,
      icon: 'box',
      iconLibrary: 'lucide',
      html: `<div style="padding: 20px; text-align: center;"><h4>Custom Content</h4><p>Added to region: ${targetRegion}</p></div>`,
      closable: true,
    });
    updateStats();
  };

  document.getElementById('wm-add-region-btn').onclick = () => {
    const id = `region-${Date.now().toString().slice(-4)}`;
    wm.addRegion({
      id,
      title: `Region ${id.split('-')[1]}`,
      size: 25,
      collapsible: true,
    });
    updateStats();
  };

  document.getElementById('wm-split-h-btn').onclick = () => {
    const regions = wm.regions || [];
    if (regions.length === 0) return;
    const targetId = regions[0].id; // For demo, split first region
    wm.splitRegion(targetId, 'horizontal');
    updateStats();
  };

  document.getElementById('wm-split-v-btn').onclick = () => {
    const regions = wm.regions || [];
    if (regions.length === 0) return;
    const targetId = regions[0].id;
    wm.splitRegion(targetId, 'vertical');
    updateStats();
  };

  document.getElementById('wm-merge-btn').onclick = () => {
    const regions = wm.regions || [];
    if (regions.length < 2) {
      alert('Need at least 2 regions to merge.');
      return;
    }
    const targetId = regions[0].id;
    const sourceId = regions[1].id;
    wm.mergeRegion(targetId, sourceId);
    updateStats();
  };

  document.getElementById('wm-reset-btn').onclick = () => {
    if (confirm('Are you sure you want to clear the entire workspace?')) {
      wm.clearAllRegions();
      localStorage.removeItem('zenith-playground-v1');
      updateStats();
    }
  };

  document.getElementById('wm-export-btn').onclick = async () => {
    const state = await wm.getLayoutState();
    const output = document.getElementById('wm-json-output');
    const display = document.getElementById('wm-json-display');
    output.style.display = 'block';
    display.textContent = JSON.stringify(state, null, 2);
    output.scrollIntoView({ behavior: 'smooth' });
  };

  // Stats Update
  function updateStats() {
    setTimeout(() => {
      const regionCount = wm.regions ? wm.regions.length : 0;
      let panelCount = 0;
      // Note: This assumes wm exposes regions with their panels for counting,
      // or we can count via the DOM if needed. For now, we'll try to estimate or get from state.
      document.getElementById('stat-regions').textContent = regionCount;
      wm.getLayoutState().then(state => {
        let count = 0;
        if (state.regions) {
          state.regions.forEach(r => (count += r.panels ? r.panels.length : 0));
        }
        document.getElementById('stat-panels').textContent = count;
      });
    }, 200);
  }

  // Initial Load - Try to restore or load default
  setTimeout(() => {
    const saved = localStorage.getItem('zenith-playground-v1');
    if (!saved && configs && configs.copilot) {
      applyLayoutConfig('zenith-wm-playground', configs.copilot);
    }
    updateStats();
  }, 500);
}
