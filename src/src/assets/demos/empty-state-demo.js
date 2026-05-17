/**
 * Empty State Component Demo
 */

export function initEmptyStateDemo() {
  const section = document.getElementById('empty-state');
  if (!section) return;

  section.innerHTML = `
    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 24px;">
      <h2>Empty State</h2>
      <div style="display: flex; gap: 8px;">
         <ui-tag label="NEW" color="info" size="md"ui-tag>
      </div>
    </div>

    <p style="color: #64748b; font-size: 15px; margin-bottom: 30px; line-height: 1.6;">
      Provide context and call-to-actions when content is missing, errors occur, or results are not found.
    </p>

    <div class="demo-pills" style="margin: 20px 0; display: flex; gap: 10px; flex-wrap: wrap; background: #f8fafc; padding: 12px; border-radius: 12px; border: 1px solid #f1f5f9;">
      <ui-button id="btnEmptyPlayground" variant="outline" color="secondary" label="🎮 Playground" size="md"ui-button>
      <ui-button id="btnEmptyCommon" variant="outline" color="primary" label="Common Types" size="md"ui-button>
      <ui-button id="btnEmptyMaster" variant="outline" color="success" label="✨ Master Patterns" size="md"ui-button>
      <ui-button id="btnEmptyAlignment" variant="outline" color="info" label="↔️ Alignment" size="md"ui-button>
      <ui-button id="btnEmptyImages" variant="outline" color="warning" label="🖼️ Images" size="md"ui-button>
      <ui-button id="btnEmptySpecial" variant="outline" color="secondary" label="⭐ Special" size="md"ui-button>
      <ui-button id="btnEmptyRecovery" variant="outline" color="success" label="🔄 Recovery & Search" size="md"ui-button>
      <ui-button id="btnEmptyErrors" variant="outline" color="danger" label="🚫 Errors" size="md"ui-button>
      <ui-button id="btnEmptyFullPage" variant="outline" color="neutral" label="📺 Full Page" size="md"ui-button>
    </div>

    <div id="emptyStateDemoContainer" style="margin-top: 40px;"></div>
  `;

  const showEmptyStateCommon = function () {
    const container = document.getElementById('emptyStateDemoContainer');
    if (!container) return;
    container.innerHTML = `
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px;">
        <div class="demo-block" style="background: white; padding: 20px; border-radius: 12px; border: 1px solid #eee;">
          <ui-empty-state type="no-data" compact="true" primary-action="Go to Dashboard"></ui-empty-state>
        </div>
        <div class="demo-block" style="background: white; padding: 20px; border-radius: 12px; border: 1px solid #eee;">
          <ui-empty-state type="no-results" compact="true" primary-action="Clear Search"></ui-empty-state>
        </div>
        <div class="demo-block" style="background: white; padding: 20px; border-radius: 12px; border: 1px solid #eee;">
          <ui-empty-state type="accomplishment" compact="true" primary-action="Good Job!"></ui-empty-state>
        </div>
        <div class="demo-block" style="background: white; padding: 20px; border-radius: 12px; border: 1px solid #eee;">
          <ui-empty-state type="coming-soon" compact="true" primary-action="Notify Me"></ui-empty-state>
        </div>
        <div class="demo-block" style="background: white; padding: 20px; border-radius: 12px; border: 1px solid #eee;">
          <ui-empty-state type="onboarding" compact="true" primary-action="Start Tour"></ui-empty-state>
        </div>
        <div class="demo-block" style="background: white; padding: 20px; border-radius: 12px; border: 1px solid #eee;">
          <ui-empty-state type="maintenance" compact="true" primary-action="Check Status"></ui-empty-state>
        </div>
      </div>
    `;
  };

  const showEmptyStateMaster = function () {
    const container = document.getElementById('emptyStateDemoContainer');
    if (!container) return;
    const items = JSON.stringify([
      { icon: 'fas fa-search', label: 'Try different keywords' },
      { icon: 'fas fa-filter', label: 'Clear applied filters' },
      { icon: 'fas fa-clock', label: 'Check back in an hour' },
    ]);

    container.innerHTML = `
      <div class="demo-block">
        <h3>✨ Apex Tier Patterns</h3>
        <p style="color: #64748b; margin-bottom: 30px;">Combining items, illustrations, and interactive recovery states.</p>
        
        <div style="display: flex; flex-direction: column; gap: 40px;">
           <div style="background: white; padding: 32px; border-radius: 20px; border: 1px solid #f1f5f9; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);">
             <h4 style="margin: 0 0 20px; color: #0ea5e9; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Smart Recovery State</h4>
             <ui-empty-state 
                type="no-results" 
                items-title="Suggested Actions:"
                items='${items}'
                primary-action="Global Search"
             ></ui-empty-state>
           </div>

           <div style="background: #f8fafc; padding: 32px; border-radius: 20px; border: 1px solid #e2e8f0;">
             <h4 style="margin: 0 0 20px; color: #ec4899; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Interactive Loading & Celebration</h4>
             <ui-empty-state 
                type="accomplishment" 
                id="celebrationDemo"
                heading="Mission Ready"
                message="Click 'Launch Project' to start with celebration animation."
                primary-action="Launch Project"
             ></ui-empty-state>
           </div>

           <div style="background: white; padding: 32px; border-radius: 20px; border: 1px solid #f1f5f9; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);">
             <h4 style="margin: 0 0 20px; color: #8b5cf6; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Premium Paywall Variant</h4>
             <ui-empty-state 
                type="paywall" 
                variant="filled"
                primary-action="Experience Pro"
                secondary-action="Compare Plans"
             ></ui-empty-state>
           </div>
        </div>
      </div>
    `;

    setTimeout(() => {
      const demo = document.getElementById('celebrationDemo');
      if (demo) {
        demo.addEventListener('actionClick', e => {
          if (e.detail.action === 'primary') {
            demo.loadingAction = 'primary';
            setTimeout(() => {
              demo.loadingAction = '';
              demo.confetti = true;
              setTimeout(() => {
                demo.confetti = false;
              }, 3000);
            }, 1500);
          }
        });
      }
    }, 100);
  };

  const showEmptyStateRecovery = function () {
    const container = document.getElementById('emptyStateDemoContainer');
    if (!container) return;
    container.innerHTML = `
      <div class="demo-block">
        <h3>🔄 Recovery & Search Patterns</h3>
        <p style="color: #64748b; margin-bottom: 30px;">Turning "no data" moments into interactive recovery paths.</p>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); gap: 32px;">
           <div style="background: white; padding: 32px; border-radius: 20px; border: 1px solid #f1f5f9; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);">
             <h4 style="margin: 0 0 20px; color: #10b981; font-size: 14px; text-transform: uppercase;">Inline Search Recovery</h4>
             <ui-empty-state 
                type="no-results" 
                show-search="true"
                search-placeholder="Search all records..."
                description="Tip: Try searching for broader terms or categories."
                primary-action="Advanced Filter"
             ></ui-empty-state>
           </div>

           <div style="background: white; padding: 32px; border-radius: 20px; border: 1px solid #f1f5f9; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);">
             <h4 style="margin: 0 0 20px; color: #f43f5e; font-size: 14px; text-transform: uppercase;">Automated Auto-Retry</h4>
             <ui-empty-state 
                type="offline" 
                retry-delay="10"
                description="Your connection was interrupted. We'll automatically try to reconnect for you."
                primary-action="Try Now"
             ></ui-empty-state>
           </div>
        </div>
      </div>
    `;
  };

  const showEmptyStateErrors = function () {
    const container = document.getElementById('emptyStateDemoContainer');
    if (!container) return;
    container.innerHTML = `
      <div class="demo-block">
        <h3>🌐 HTTP Error Suite (Routing Patterns)</h3>
        <p style="color: #64748b; margin-bottom: 30px;">Professional error pages with specific animations, status-coded colors, and recovery workflows.</p>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(360px, 1fr)); gap: 32px;">
           
           <!-- 401 Unauthorized -->
           <div style="background: white; padding: 24px; border-radius: 16px; border: 1px solid #f1f5f9; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);">
             <h4 style="margin: 0 0 16px; color: #8b5cf6; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Access Denied</h4>
             <ui-empty-state 
                type="401" 
                variant="default" 
                compact="true"
                primary-action="Login to Account"
                secondary-action="Request Access"
             ></ui-empty-state>
           </div>

           <!-- 403 Forbidden -->
           <div style="background: white; padding: 24px; border-radius: 16px; border: 1px solid #f1f5f9; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);">
             <h4 style="margin: 0 0 16px; color: #f43f5e; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Permissions Required</h4>
             <ui-empty-state 
                type="403" 
                variant="default" 
                compact="true"
                primary-action="Contact Admin"
                secondary-action="Switch Workspace"
             ></ui-empty-state>
           </div>

           <!-- 404 Not Found -->
           <div style="background: white; padding: 24px; border-radius: 16px; border: 1px solid #f1f5f9; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);">
             <h4 style="margin: 0 0 16px; color: #f59e0b; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Missing Resource</h4>
             <ui-empty-state 
                type="404" 
                variant="default" 
                compact="true"
                primary-action="Back to Dashboard"
                secondary-action="Search Documentation"
             ></ui-empty-state>
           </div>

           <!-- 500 Server Error -->
           <div style="background: #fef2f2; padding: 24px; border-radius: 16px; border: 1px solid #fee2e2;">
             <h4 style="margin: 0 0 16px; color: #ef4444; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">System Failure</h4>
             <ui-empty-state 
                type="500" 
                variant="default" 
                compact="true"
                primary-action="Reload Application"
                secondary-action="Report Bug"
             ></ui-empty-state>
           </div>

           <!-- 503 Service Unavailable -->
           <div style="background: white; padding: 24px; border-radius: 16px; border: 1px solid #f1f5f9; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);">
             <h4 style="margin: 0 0 16px; color: #7c3aed; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Under Maintenance</h4>
             <ui-empty-state 
                type="503" 
                variant="default" 
                compact="true"
                primary-action="View Status Page"
                secondary-action="Notify Me"
             ></ui-empty-state>
           </div>

           <!-- Offline -->
           <div style="background: #f8fafc; padding: 24px; border-radius: 16px; border: 1px solid #e2e8f0;">
             <h4 style="margin: 0 0 16px; color: #64748b; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Connection Lost</h4>
             <ui-empty-state 
                type="offline" 
                variant="default" 
                compact="true"
                primary-action="Try Connecting"
                secondary-action="Work Offline"
             ></ui-empty-state>
           </div>

        </div>
      </div>
    `;
  };

  const showEmptyStateFullPage = function () {
    const container = document.getElementById('emptyStateDemoContainer');
    if (!container) return;
    container.innerHTML = `
      <div class="demo-block" style="position: relative; height: 500px; border: 2px solid #e2e8f0; border-radius: 16px; overflow: hidden; background: #fdfdfd;">
        <div style="position: absolute; top: 12px; left: 12px; z-index: 10; font-size: 11px; background: rgba(0,0,0,0.05); padding: 4px 8px; border-radius: 4px;">Viewport Simulation (500px height)</div>
        <ui-empty-state 
           type="404" 
           full-height="true" 
           primary-action="Return Home"
           secondary-action="Contact Support"
        ></ui-empty-state>
      </div>
      <p style="margin-top: 12px; font-size: 13px; color: #64748b; text-align: center;">Using <code>full-height="true"</code> inside a container (or body) to center content vertically and horizontally.</p>
    `;
  };

  const showEmptyStateAlignment = function () {
    const container = document.getElementById('emptyStateDemoContainer');
    if (!container) return;
    container.innerHTML = `
      <div class="demo-block">
        <h3>↔️ Alignment Mastery</h3>
        <p style="color: #64748b; margin-bottom: 30px;">Adapt to any layout—sidebars, cards, or hero sections.</p>
        
        <div style="display: flex; flex-direction: column; gap: 40px;">
           <div style="background: white; padding: 24px; border-radius: 12px; border: 1px solid #e2e8f0;">
             <h5 style="color: #64748b; font-size: 11px; margin-bottom: 20px;">LEFT ALIGNED (Sidebar Pattern)</h5>
             <ui-empty-state 
                align="left" 
                type="no-data" 
                compact="true"
                primary-action="Add Data"
             ></ui-empty-state>
           </div>

           <div style="background: white; padding: 24px; border-radius: 12px; border: 1px solid #e2e8f0;">
             <h5 style="color: #64748b; font-size: 11px; margin-bottom: 20px;">CENTER ALIGNED (Default / Card Pattern)</h5>
             <ui-empty-state 
                align="center" 
                type="no-results" 
                primary-action="Clear Filters"
             ></ui-empty-state>
           </div>

           <div style="background: white; padding: 24px; border-radius: 12px; border: 1px solid #e2e8f0;">
             <h5 style="color: #64748b; font-size: 11px; margin-bottom: 20px;">RIGHT ALIGNED (RTL / Contextual Pattern)</h5>
             <ui-empty-state 
                align="right" 
                type="coming-soon" 
                compact="true"
                primary-action="Join Waitlist"
             ></ui-empty-state>
           </div>
        </div>
      </div>
    `;
  };

  const showEmptyStateImages = function () {
    const container = document.getElementById('emptyStateDemoContainer');
    if (!container) return;
    container.innerHTML = `
      <div class="demo-block">
        <h3>🖼️ With Custom Illustrations</h3>
        <p style="color: #64748b; margin-bottom: 30px;">Bring your own brand assets or use built-in illustrative patterns.</p>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(360px, 1fr)); gap: 32px;">
           <div style="background: #fafaf9; padding: 24px; border-radius: 16px; border: 1px solid #e7e5e4;">
             <h5 style="color: #78350f; font-size: 11px; margin-bottom: 20px;">KEYWORD: DATA-SYNC (BUILT-IN)</h5>
             <ui-empty-state 
                illustration="data-sync" 
                heading="Connecting..."
                message="Wait a moment while we fetch your remote data streams."
                variant="default"
             ></ui-empty-state>
           </div>

           <div style="background: #fdf2f8; padding: 24px; border-radius: 16px; border: 1px solid #fce7f3;">
             <h5 style="color: #9d174d; font-size: 11px; margin-bottom: 20px;">KEYWORD: EMPTY-BOX (BUILT-IN)</h5>
             <ui-empty-state 
                illustration="empty-box" 
                heading="No Items Here"
                message="Start populating your catalog with high-quality products."
                primary-action="Add First Item"
             ></ui-empty-state>
           </div>

           <div style="background: white; padding: 24px; border-radius: 16px; border: 1px solid #f1f5f9; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);">
             <h5 style="color: #64748b; font-size: 11px; margin-bottom: 20px;">EXTERNAL IMAGE URL</h5>
             <ui-empty-state 
                illustration="https://img.freepik.com/free-vector/no-data-concept-illustration_114360-536.jpg" 
                heading="Not Found"
                message="We checked everywhere, but that file is missing."
                primary-action="Search Files"
             ></ui-empty-state>
           </div>
        </div>
      </div>
    `;
  };

  const showEmptyStateSpecial = function () {
    const container = document.getElementById('emptyStateDemoContainer');
    if (!container) return;
    container.innerHTML = `
      <div class="demo-block">
        <h3>⭐ Premium Feature Showcase</h3>
        <p style="color: #64748b; margin-bottom: 30px;">Advanced modifiers for elevation, rounding, and sidebar compatibility.</p>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); gap: 32px;">
           <!-- Elevated & Rounded -->
           <div style="padding: 10px;">
             <ui-empty-state 
                heading="Elevated Experience" 
                message="This variant uses 'elevated' and 'rounded' properties for a modern floating look."
                type="success"
                elevated="true"
                rounded="true"
                primary-action="Explore More"
             ></ui-empty-state>
           </div>

           <!-- Sidebar Compact Mode -->
           <div style="width: 320px; background: #0f172a; padding: 20px; border-radius: 16px; height: 100%;">
             <h5 style="color: #94a3b8; font-size: 11px; margin-bottom: 20px;">SIDEBAR COMPACT MODE</h5>
             <ui-empty-state 
                variant="minimal"
                align="left"
                compact="true"
                type="no-history"
                heading="No Feed"
                message="Your activity feed is silent. Connect social accounts."
                primary-action="Connect"
                style="--empty-state-title-color: #f8fafc; --empty-state-message-color: #94a3b8;"
             ></ui-empty-state>
           </div>
        </div>
      </div>
    `;
  };

  const updateEmptyPlayground = function () {
    const val = id => {
      const el = document.getElementById(id);
      if (!el) return null;
      if (el.tagName === 'UI-CHECKBOX') return el.checked;
      return el.value;
    };

    const type = val('empType');
    const variant = val('empVariant');
    const align = val('empAlign');
    const size = val('empSize');
    const elevated = val('empElevated');
    const rounded = val('empRounded');
    const compact = val('empCompact');
    const animated = val('empAnimated');
    const desc = val('empDesc');
    const showSearch = val('empShowSearch');
    const retryDelay = val('empRetry');
    const useIconSlot = val('empSlotIcon');
    const useHeadingSlot = val('empSlotHeading');

    const preview = document.getElementById('emptyPreview');
    const code = document.getElementById('emptyCode');
    if (!preview || !code) return;

    let slotContent = '';
    if (useIconSlot) {
      slotContent += `\n  <div slot="icon" style="color: #ec4899;">\n    <ui-icon name="heart" library="fontawesome" size="64px"></ui-icon>\n  </div>`;
    }
    if (useHeadingSlot) {
      slotContent += `\n  <h2 slot="heading" style="color: #6366f1; border-bottom: 2px solid;">Overridden via Slot</h2>`;
    }

    const html = `<ui-empty-state
  type="${type}"
  variant="${variant}"
  align="${align}"
  size="${size}"
  ${desc ? `description="${desc}"` : ''}
  ${showSearch ? 'show-search="true"' : ''}
  ${retryDelay > 0 ? `retry-delay="${retryDelay}"` : ''}
  ${elevated ? 'elevated="true"' : ''}
  ${rounded ? 'rounded="true"' : ''}
  ${compact ? 'compact="true"' : ''}
  ${animated === false ? 'animated="false"' : ''}
>${slotContent}\n</ui-empty-state>`;

    preview.innerHTML = html;
    code.textContent = html;
  };

  const showEmptyStatePlayground = function () {
    const container = document.getElementById('emptyStateDemoContainer');
    if (!container) return;
    container.innerHTML = `
      <div class="demo-block">
        <h3>🎮 Empty State Playground</h3>
        <p style="font-size: 14px; color: #64748b; margin-bottom: 24px;">Configure the full state and test slot overrides.</p>
        
        <div style="display: grid; grid-template-columns: 320px 1fr; gap: 30px;">
          <div style="background: #f8fafc; padding: 20px; border-radius: 12px; border: 1px solid #e2e8f0;">
             <div style="display: grid; gap: 16px;">
                <div style="display: flex; flex-direction: column; gap: 4px;">
                  <label style="font-size: 12px; font-weight: 600;">Type (Presets):</label>
                  <ui-dropdown id="empType" value="no-data" options='[
                    {"label": "No Data", "value": "no-data"},
                    {"label": "No Results", "value": "no-results"},
                    {"label": "Onboarding", "value": "onboarding"},
                    {"label": "Accomplishment", "value": "accomplishment"},
                    {"label": "Paywall", "value": "paywall"},
                    {"label": "No Messages", "value": "no-messages"},
                    {"label": "No Notifications", "value": "no-notifications"},
                    {"label": "No Favorites", "value": "no-favorites"},
                    {"label": "No Tasks", "value": "no-tasks"},
                    {"label": "401 Unauthorized", "value": "401"},
                    {"label": "403 Forbidden", "value": "403"},
                    {"label": "404 Not Found", "value": "404"},
                    {"label": "500 Server Error", "value": "500"},
                    {"label": "503 Service Unavailable", "value": "503"},
                    {"label": "Offline", "value": "offline"},
                    {"label": "Coming Soon", "value": "coming-soon"},
                    {"label": "Maintenance", "value": "maintenance"},
                    {"label": "429 Rate Limited", "value": "429"},
                    {"label": "418 Teapot", "value": "418"}
                  ]'></ui-dropdown>
                </div>

                <div style="display: flex; flex-direction: column; gap: 4px;">
                  <label style="font-size: 12px; font-weight: 600;">Variant:</label>
                  <ui-dropdown id="empVariant" value="default" options='[
                    {"label": "Default", "value": "default"},
                    {"label": "Outlined", "value": "outlined"},
                    {"label": "Filled", "value": "filled"},
                    {"label": "Minimal", "value": "minimal"},
                    {"label": "Glass (Premium)", "value": "glass"}
                  ]'></ui-dropdown>
                </div>

                <div style="display: flex; flex-direction: column; gap: 4px;">
                  <label style="font-size: 12px; font-weight: 600;">Description:</label>
                  <ui-input id="empDesc" placeholder="Sub-tip text..."></ui-input>
                </div>

                <div style="display: flex; flex-direction: column; gap: 4px;">
                  <label style="font-size: 12px; font-weight: 600;">Alignment:</label>
                  <ui-dropdown id="empAlign" value="center" options='[
                    {"label": "Center (Default)", "value": "center"},
                    {"label": "Left", "value": "left"},
                    {"label": "Right", "value": "right"}
                  ]'></ui-dropdown>
                </div>

                <div style="display: flex; flex-direction: column; gap: 4px;">
                  <label style="font-size: 12px; font-weight: 600;">Size:</label>
                  <ui-dropdown id="empSize" value="md" options='[
                    {"label": "Small", "value": "small"},
                    {"label": "Medium", "value": "md"},
                    {"label": "Large", "value": "large"}
                  ]'></ui-dropdown>
                </div>

                <div style="display: flex; flex-direction: column; gap: 10px; margin-top: 10px; padding-top: 10px; border-top: 1px solid #e2e8f0;">
                   <span style="display: block; font-size: 11px; color: #64748b;">Visual Effects:</span>
                   <ui-checkbox id="empElevated" label="Elevated"></ui-checkbox>
                   <ui-checkbox id="empRounded" label="Rounded"></ui-checkbox>
                   <ui-checkbox id="empCompact" label="Compact (Sidebar mode)"></ui-checkbox>
                   <ui-checkbox id="empAnimated" label="Animated" checked="true"></ui-checkbox>
                   <ui-checkbox id="empShowSearch" label="Show Search"></ui-checkbox>
                   
                   <div style="display: flex; flex-direction: column; gap: 4px; font-size: 13px; margin-top: 8px;">
                     <label style="font-size: 12px; font-weight: 600;">Retry Delay (s):</label>
                     <ui-number-input id="empRetry" value="0" min="0"></ui-number-input>
                   </div>
                </div>

                <div style="margin-top: 10px; padding-top: 10px; border-top: 1px solid #e2e8f0;">
                   <span style="display: block; font-size: 11px; color: #64748b; margin-bottom: 8px;">SLOT OVERRIDES:</span>
                   <ui-checkbox id="empSlotIcon" label="Custom [icon] slot"></ui-checkbox>
                   <ui-checkbox id="empSlotHeading" label="Rich [heading] slot"></ui-checkbox>
                </div>
             </div>
          </div>

          <div style="display: flex; flex-direction: column; gap: 20px;">
             <div id="emptyPreview" style="min-height: 250px; display: flex; align-items: center; justify-content: center; background: white; border: 1px dashed #cbd5e1; border-radius: 12px; padding: 20px;"></div>
             <div style="background: #1e293b; color: #f8fafc; padding: 20px; border-radius: 12px; font-family: monospace; font-size: 12px; overflow-x: auto; white-space: pre;" id="emptyCode"></div>
          </div>
        </div>
      </div>
    `;

    setTimeout(() => {
      const ctrls = container.querySelectorAll('ui-checkbox, ui-dropdown, ui-input, ui-number-input');
      ctrls.forEach(ctrl => {
        const eventName =
          ctrl.tagName === 'UI-CHECKBOX' ? 'checkboxChange' : ctrl.tagName === 'UI-DROPDOWN' ? 'dropdownChange' : ctrl.tagName === 'UI-INPUT' ? 'inputChange' : 'inputChange';
        ctrl.addEventListener(eventName, () => updateEmptyPlayground());
      });
      updateEmptyPlayground();
    }, 100);
  };

  const demoMap = {
    btnEmptyPlayground: showEmptyStatePlayground,
    btnEmptyCommon: showEmptyStateCommon,
    btnEmptyMaster: showEmptyStateMaster,
    btnEmptyAlignment: showEmptyStateAlignment,
    btnEmptyImages: showEmptyStateImages,
    btnEmptySpecial: showEmptyStateSpecial,
    btnEmptyRecovery: showEmptyStateRecovery,
    btnEmptyErrors: showEmptyStateErrors,
    btnEmptyFullPage: showEmptyStateFullPage,
  };

  setTimeout(() => {
    Object.entries(demoMap).forEach(([id, func]) => {
      const btn = document.getElementById(id);
      if (btn) {
        btn.addEventListener('click', func);
      }
    });

    // Default view
    showEmptyStatePlayground();
  }, 100);
}
