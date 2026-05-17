/**
 * Switch & Toggle Group Component Demo Script
 * Handles interactive demos for ui-switch and ui-toggle-group
 */

export function initSwitchDemo() {
  const section = document.getElementById('switch');
  if (!section) return;

  section.innerHTML = `
    <div class="demo-header" style="margin-bottom: 32px;">
      <p style="margin-top: 0; opacity: 0.7; font-size: 14px;">Master-tier switch system with liquid spring animations, atmospheric tracking glows, and premium material archetypes.</p>
    </div>
    
    <div class="demo-controls" style="margin: 20px 0; display: flex; gap: 12px; flex-wrap: wrap;">
      <ui-button onclick="showInteractiveSwitch()" variant="outline">🎮 Playground</ui-button>
      <ui-button onclick="showEliteSwitchSpecimens()" variant="outline">✨ Elite Specimens</ui-button>
      <ui-button onclick="showSwitchVariants()" variant="outline">🎨 Variants</ui-button>
      <ui-button onclick="showSwitchShapes()" variant="outline">📐 Shapes</ui-button>
      <ui-button onclick="showSwitchStates()" variant="outline">🚥 Lifecycle & Enterprise</ui-button>
      <ui-button onclick="showIconImageDemos()" variant="outline">🖼️ Icons</ui-button>
      <ui-button onclick="showPhysicsGallery()" variant="outline">🧬 Physics</ui-button>
      <ui-button onclick="showToggleGroup()" variant="outline">📦 Groups</ui-button>
    </div>

    <div id="switchDemoContainer" style="margin-top: 20px;"></div>
  `;

  // --- High-Fidelity Interaction Handlers ---
  window.handleAsyncSwitch = event => {
    const sw = event.target;
    console.log('Async switch triggered:', event.detail.checked);
    // Simulate network latency (2 seconds)
    setTimeout(() => {
      sw.checked = event.detail.checked;
      sw.stopAsyncLoading();
    }, 2000);
  };

  window.handleVetoSwitch = event => {
    const sw = event.target;
    console.log('Veto switch rejection triggered');
    sw.shake();
    // Internal state remains 'checked' because it was never toggled (async mode)
  };

  window.showInteractiveSwitch = function () {
    const container = document.getElementById('switchDemoContainer');
    if (!container) return;

    container.innerHTML = `
      <div class="demo-block reveal-fade-in">
        <h3 class="specimen-title">🎮 Interactive Playground</h3>
        <div class="playground-settings" style="background: rgba(var(--primary-rgb, 139, 92, 246), 0.03); padding: 24px; border-radius: 16px; border: 1px solid rgba(0,0,0,0.05); margin-bottom: 24px;">
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 20px;">
            <div class="form-group">
               <ui-input label="Label Text" id="playSwitchLabel" value="Unified Switch" variant="outlined" size="md"></ui-input>
            </div>
            <div class="form-group">
               <ui-input label="Checked Icon (Lucide)" id="playSwitchCheckedIcon" value="check" variant="outlined" size="md"></ui-input>
            </div>
            <div class="form-group">
               <ui-input label="Unchecked Icon (Lucide)" id="playSwitchUncheckedIcon" value="x" variant="outlined" size="md"></ui-input>
            </div>
            <div class="form-group">
               <ui-input label="Checked Image (URL)" id="playSwitchCheckedImg" value="" placeholder="https://..." variant="outlined" size="md"></ui-input>
            </div>
            <div class="form-group">
               <ui-input label="Unchecked Image (URL)" id="playSwitchUncheckedImg" value="" placeholder="https://..." variant="outlined" size="md"></ui-input>
            </div>
            <div class="form-group">
               <ui-input label="Description" id="playSwitchDesc" value="Authorize system override" variant="outlined" size="md"></ui-input>
            </div>
            <div class="form-group">
               <ui-input label="Track Width (e.g. 100px)" id="playSwitchWidth" value="" placeholder="Default" variant="outlined" size="md"></ui-input>
            </div>
            <div class="form-group">
               <ui-input label="Checked Text" id="playSwitchCheckedText" value="ON" variant="outlined" size="md"></ui-input>
            </div>
            <div class="form-group">
               <ui-input label="Unchecked Text" id="playSwitchUncheckedText" value="OFF" variant="outlined" size="md"></ui-input>
            </div>
            <div class="form-group">
               <ui-dropdown id="playSwitchSize" label="Size" value="md" size="md" options='[{"label":"XXX Small","value":"xxxs"},{"label":"XX Small","value":"xxs"},{"label":"Extra Small","value":"xs"},{"label":"Small","value":"small"},{"label":"md","value":"md"},{"label":"Large","value":"large"},{"label":"Extra Large","value":"xl"},{"label":"Extra Extra Large","value":"xxl"},{"label":"XXX Large","value":"xxxl"}]'></ui-dropdown>
            </div>
            <div class="form-group">
               <ui-dropdown id="playSwitchColor" label="Color Theme" value="primary" size="md" options='[{"label":"Primary (Blue)","value":"primary"},{"label":"Success (Green)","value":"success"},{"label":"Danger (Red)","value":"danger"},{"label":"Warning (Gold)","value":"warning"},{"label":"Info (Sky)","value":"info"},{"label":"Secondary (Slate)","value":"secondary"}]'></ui-dropdown>
            </div>
            <div class="form-group">
               <ui-dropdown id="playSwitchVariant" label="Material Archetype" value="solid" size="md" options='[{"label":"Solid (Default)","value":"solid"},{"label":"Glassmorphism","value":"glass"},{"label":"Raised Relief","value":"raised"},{"label":"Outlined","value":"outlined"}]'></ui-dropdown>
            </div>
            <div class="form-group">
               <ui-dropdown id="playSwitchDescPos" label="Description Position" value="bottom" size="md" options='[{"label":"Bottom","value":"bottom"},{"label":"Side (Dense)","value":"side"}]'></ui-dropdown>
            </div>
            <div class="form-group">
               <ui-dropdown id="playSwitchLibrary" label="Icon Library" value="lucide" size="md" options='[{"label":"Lucide (Modern)","value":"lucide"},{"label":"Google Material","value":"google"},{"label":"IonIcons","value":"ionicons"},{"label":"Font Awesome","value":"font-awesome"},{"label":"Bootstrap","value":"bootstrap"}]'></ui-dropdown>
            </div>

            <div class="form-group" style="grid-column: span 1;">
               <ui-dropdown id="playSwitchPhysics" label="Animation Personality" value="liquid" size="md" options='[{"label":"Liquid (Default)","value":"liquid"},{"label":"Stiff (Rapid)","value":"stiff"},{"label":"Bouncy (Elastic)","value":"bouncy"},{"label":"Linear (Industrial)","value":"linear"}]'></ui-dropdown>
            </div>
            <div class="form-group" style="display: flex; gap: 16px; align-items: flex-end; padding-bottom: 8px; grid-column: span 1;">
               <ui-checkbox id="playSwitchGlow" label="🕯️ Glow" checked size="md"></ui-checkbox>
               <ui-checkbox id="playSwitchHaptic" label="🧠 Haptic" checked size="md"></ui-checkbox>
               <ui-checkbox id="playSwitchGradient" label="🎨 Gradient" size="md"></ui-checkbox>
               <ui-checkbox id="playSwitchLoading" label="Loading" size="md"></ui-checkbox>
               <ui-checkbox id="playSwitchRTL" label="RTL Support" size="md"></ui-checkbox>
               <ui-checkbox id="playSwitchIndeterminate" label="Indeterminate" size="md"></ui-checkbox>
               <ui-checkbox id="playSwitchShowText" label="Show Track Text" size="md"></ui-checkbox>
            </div>
          </div>
        </div>

        <div class="playground-preview" style="padding: 60px; background: white; border: 1px dashed #e2e8f0; border-radius: 24px; display: flex; justify-content: center; min-height: 200px; position: relative; overflow: hidden;">
          <ui-switch id="playgroundSwitch" label="Unified Switch" checked description="Authorize system override" size="md"></ui-switch>
        </div>

        <div style="margin-top: 24px;">
          <ui-code-preview id="switchCodePreview" label="Implementation Code" expanded="false"></ui-code-preview>
        </div>
      </div>
    `;
    setTimeout(() => initializeSwitchBehaviors(), 50);
  };

  window.showEliteSwitchSpecimens = function () {
    const container = document.getElementById('switchDemoContainer');
    container.innerHTML = `
      <div class="demo-block reveal-slide-up">
        <h3 class="specimen-title">✨ Elite Material Specimens</h3>
        <p class="specimen-description">High-fidelity switch archetypes for premium state management.</p>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 32px;">
           <div style="padding: 32px; background: #0f172a; border-radius: 20px; color: white;">
              <h4 style="margin: 0 0 20px 0; font-size: 14px; opacity: 0.6; text-transform: uppercase;">Glassmorphism</h4>
              <ui-switch 
                label="Orbital Transmission" 
                description="Sub-pixel refractive track substrate"
                variant="glass" 
                color="info" 
                glow 
                checked
                size="md">
              </ui-switch>
              <div style="margin-top: 16px; padding: 12px; background: rgba(255,255,255,0.05); border-radius: 8px; font-size: 12px;">
                 Atmospheric glow effects transition smoothly between states.
              </div>
           </div>

           <div style="padding: 32px; background: #f8fafc; border-radius: 20px; border: 1px solid #e2e8f0;">
              <h4 style="margin: 0 0 20px 0; font-size: 14px; opacity: 0.6; text-transform: uppercase;">Raised Relief</h4>
              <ui-switch 
                label="Thermal Regulation" 
                description="Haptic feedback on activation"
                variant="raised" 
                color="danger" 
                haptic 
                checked
                size="md">
              </ui-switch>
              <div style="margin-top: 16px; padding: 12px; background: white; border: 1px solid #e2e8f0; border-radius: 8px; font-size: 12px;">
                 Tactile sensation reinforced by liquid spring physics.
              </div>
           </div>

           <div style="padding: 32px; background: white; border: 1px solid #f1f5f9; border-radius: 20px;">
              <h4 style="margin: 0 0 20px 0; font-size: 14px; opacity: 0.6; text-transform: uppercase;">Side-Aligned Metadata</h4>
              <div style="display: flex; flex-direction: column; gap: 20px;">
                <ui-switch label="Network" description="v2.4 stable" description-position="side" checked color="success" glow haptic size="md"></ui-switch>
                <ui-switch label="Encryption" description="AES-256 active" description-position="side" checked color="primary" glow haptic size="md"></ui-switch>
                <ui-switch label="Firewall" description="Cluster shield" description-position="side" color="danger" haptic size="md"></ui-switch>
              </div>
           </div>

           <div style="padding: 32px; background: #fffbeb; border: 1px solid #fde68a; border-radius: 20px; grid-column: span 2;">
              <h4 style="margin: 0 0 20px 0; font-size: 14px; opacity: 0.6; text-transform: uppercase;">Icon & Image Substrates</h4>
              <div style="display: flex; gap: 40px; flex-wrap: wrap; align-items: center;">
                 <div style="text-align: center;">
                    <p style="font-size: 11px; margin-bottom: 12px; opacity: 0.5;">Localization (UK/US)</p>
                    <ui-switch 
                      size="large" 
                      checked 
                      checked-image="https://www.countryflags.com/wp-content/uploads/united-kingdom-flag-png-large.png" 
                      unchecked-image="https://www.countryflags.com/wp-content/uploads/united-states-of-america-flag-png-large.png">
                    </ui-switch>
                 </div>
                 <div style="text-align: center;">
                    <p style="font-size: 11px; margin-bottom: 12px; opacity: 0.5;">Material Theme (Light/Dark)</p>
                    <ui-switch 
                      size="xl" 
                      checked 
                      variant="glass"
                      icon-on="sun"
                      icon-off="moon"
                      color="warning"
                      glow>
                    </ui-switch>
                 </div>
                 <div style="text-align: center;">
                    <p style="font-size: 11px; margin-bottom: 12px; opacity: 0.5;">Tactical Comms (Audio)</p>
                    <ui-switch 
                      size="xxl" 
                      checked 
                      variant="raised"
                      icon-on="volume-high"
                      icon-off="volume-mute"
                      color="primary"
                      glow>
                    </ui-switch>
                  </div>
                  <div style="text-align: center;">
                    <p style="font-size: 11px; margin-bottom: 12px; opacity: 0.5;">Status Indicators (Full Text)</p>
                    <ui-switch 
                      size="large" 
                      width="150px"
                      checked 
                      show-track-text="true"
                      checked-text="AUTHORIZED"
                      unchecked-text="RESTRICTED"
                      color="success"
                      glow>
                    </ui-switch>
                  </div>

                  <div style="text-align: center;">
                    <p style="font-size: 11px; margin-bottom: 12px; opacity: 0.5;">Hybrid Synthesis (Icon + Text)</p>
                    <ui-switch 
                      size="xl" 
                      checked 
                      show-track-text="true"
                      checked-text="LIVE"
                      unchecked-text="OFF"
                      icon-on="pulse"
                      icon-off="infinite"
                      color="danger"
                      glow>
                    </ui-switch>
                  </div>
               </div>
            </div>
         </div>
      </div>
    `;
  };

  window.showSwitchVariants = function () {
    const container = document.getElementById('switchDemoContainer');
    container.innerHTML = `
      <div class="demo-block reveal-slide-up">
        <h3 class="specimen-title">🎨 Material Archetypes & Colors</h3>
        <p class="specimen-description">High-fidelity material shaders with hardware-accelerated color matrices.</p>
        
        <div style="display: flex; flex-direction: column; gap: 48px;">
           <div>
              <h4 style="margin: 0 0 16px 0; font-size: 13px; color: #64748b; text-transform: uppercase;">Material Synthesis</h4>
              <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 24px;">
                 <div style="padding: 24px; background: white; border-radius: 16px; border: 1px solid #f1f5f9;">
                    <ui-switch label="Default Solid" variant="outline" color="primary" checked size="md"></ui-switch>
                 </div>
                 <div style="padding: 24px; background: #0f172a; border-radius: 16px; color: white;">
                    <ui-switch label="Glassmorphism" variant="glass" checked color="info" glow size="md"></ui-switch>
                 </div>
                 <div style="padding: 24px; background: #f8fafc; border-radius: 16px; border: 1px solid #e2e8f0;">
                    <ui-switch label="Raised Relief" variant="raised" checked color="success" glow size="md"></ui-switch>
                 </div>
                 <div style="padding: 24px; background: white; border-radius: 16px; border: 1px solid #e2e8f0;">
                    <ui-switch label="Outlined Matrix" variant="outlined" checked color="danger" size="md"></ui-switch>
                 </div>
              </div>
           </div>

           <div>
              <h4 style="margin: 0 0 16px 0; font-size: 13px; color: #64748b; text-transform: uppercase;">Semantic Tones</h4>
              <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 24px;">
                <ui-switch label="Primary Core" color="primary" checked glow size="md"></ui-switch>
                <ui-switch label="Success Green" color="success" checked glow size="md"></ui-switch>
                <ui-switch label="Danger Red" color="danger" checked glow size="md"></ui-switch>
                <ui-switch label="Warning Gold" color="warning" checked glow size="md"></ui-switch>
                <ui-switch label="Info Sky" color="info" checked glow size="md"></ui-switch>
                <ui-switch label="Secondary Slate" color="secondary" checked size="md"></ui-switch>
              </div>
           </div>
        </div>
      </div>
    `;
  };

  window.showSwitchShapes = function () {
    const container = document.getElementById('switchDemoContainer');
    container.innerHTML = `
       <div class="demo-block reveal-slide-up">
         <h3 class="specimen-title">📐 Geometry & Corner Archetypes</h3>
         <p class="specimen-description">Structural variants for different UI surfaces and container systems.</p>
         
         <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 32px;">
            <div style="padding: 32px; background: white; border-radius: 20px; border: 1px solid #f1f5f9; display: flex; flex-direction: column; align-items: center; gap: 20px;">
               <p style="font-size: 11px; color: #94a3b8; font-weight: 800; text-transform: uppercase;">Shape: Pill (Flagship)</p>
               <ui-switch shape="pill" size="xl" checked color="primary" glow></ui-switch>
               <p style="font-size: 12px; opacity: 0.6; text-align: center;">Curvature-continuous pill shape for standard navigation.</p>
            </div>
            <div style="padding: 32px; background: white; border-radius: 20px; border: 1px solid #f1f5f9; display: flex; flex-direction: column; align-items: center; gap: 20px;">
               <p style="font-size: 11px; color: #94a3b8; font-weight: 800; text-transform: uppercase;">Shape: Rounded (Soft)</p>
               <ui-switch shape="rounded" size="xl" checked color="success" glow></ui-switch>
               <p style="font-size: 12px; opacity: 0.6; text-align: center;">Subtle 6px corner radius for dashboard tiles.</p>
            </div>
            <div style="padding: 32px; background: white; border-radius: 20px; border: 1px solid #f1f5f9; display: flex; flex-direction: column; align-items: center; gap: 20px;">
               <p style="font-size: 11px; color: #94a3b8; font-weight: 800; text-transform: uppercase;">Shape: Square (Industrial)</p>
               <ui-switch shape="square" size="xl" checked color="info" glow></ui-switch>
               <p style="font-size: 12px; opacity: 0.6; text-align: center;">Zero-radius architecture for professional grid systems.</p>
            </div>
         </div>
       </div>
     `;
  };

  window.showSwitchStates = function () {
    const container = document.getElementById('switchDemoContainer');
    container.innerHTML = `
        <h3 class="specimen-title">🚥 Enterprise Lifecycle & Localization</h3>
        <p class="specimen-description">High-fidelity handling of complex operational states and global mirror support.</p>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 32px;">
            <div style="background: white; padding: 32px; border-radius: 20px; border: 1px solid #f1f5f9;">
               <h4 style="margin: 0 0 20px 0; font-size: 12px; color: #6366f1; text-transform: uppercase; font-weight: 800;">Hardware Accelerated RTL</h4>
               <div style="display: flex; flex-direction: column; gap: 20px;">
                  <ui-switch label="تبديل النظام" rtl="true" color="primary" checked></ui-switch>
                  <ui-switch label="حالة الشبكة" rtl="true" color="success"></ui-switch>
                  <p style="font-size: 11px; color: #64748b; margin-top: 10px;">Sub-pixel mirrored layout for Global/ME region deployments.</p>
               </div>
            </div>

            <div style="background: white; padding: 32px; border-radius: 20px; border: 1px solid #f1f5f9;">
               <h4 style="margin: 0 0 20px 0; font-size: 12px; color: #10b981; text-transform: uppercase; font-weight: 800;">Async Scanning (Shimmer)</h4>
               <div style="display: flex; flex-direction: column; gap: 20px;">
                  <ui-switch label="Resolving Promises" loading="true" checked></ui-switch>
                  <ui-switch label="Establishing Link" loading="true" color="info"></ui-switch>
                  <p style="font-size: 11px; color: #64748b; margin-top: 10px;">Digital scanning grid visualizes the "Pending" state during async cycles.</p>
               </div>
            </div>

            <div style="background: white; padding: 32px; border-radius: 20px; border: 1px solid #f1f5f9;">
               <h4 style="margin: 0 0 20px 0; font-size: 12px; color: #f59e0b; text-transform: uppercase; font-weight: 800;">Mixed Selection Support</h4>
               <div style="display: flex; flex-direction: column; gap: 20px;">
                  <ui-switch label="Mixed Sub-states" indeterminate="true" color="warning"></ui-switch>
                  <p style="font-size: 11px; color: #64748b; margin-top: 10px;">Visual archetype for "Partial Selection" in hierarchical dashboard systems.</p>
               </div>
            </div>

            <div style="background: white; padding: 32px; border-radius: 20px; border: 1px solid #f1f5f9;">
               <h4 style="margin: 0 0 20px 0; font-size: 12px; color: #64748b; text-transform: uppercase; font-weight: 800;">Operational Restrictions</h4>
               <div style="display: flex; flex-direction: column; gap: 16px;">
                  <ui-switch label="Read-Only Mode" checked readonly color="success"></ui-switch>
                  <ui-switch label="Disabled Matrix" disabled checked></ui-switch>
                  <ui-switch label="Required (Asterisk)" required></ui-switch>
               </div>
            </div>

            <div style="background: white; padding: 32px; border-radius: 20px; border: 1px solid #f1f5f9;">
               <h4 style="margin: 0 0 20px 0; font-size: 12px; color: #ef4444; text-transform: uppercase; font-weight: 800;">Validation Substrate</h4>
               <div style="display: flex; flex-direction: column; gap: 16px;">
                  <ui-switch label="Security Violation" invalid error-message="Token validation failed" checked color="danger"></ui-switch>
                  <ui-switch label="Operational Hint" helper-text="Secondary auth required" color="info"></ui-switch>
               </div>
            </div>

            <div style="background: #0f172a; padding: 32px; border-radius: 24px; color: white; display: flex; flex-direction: column; gap: 32px; box-shadow: 0 20px 40px -10px rgba(0,0,0,0.3);">
               <h4 style="margin: 0; font-size: 12px; color: rgba(255,255,255,0.4); text-transform: uppercase; letter-spacing: 1px; font-weight: 800;">Apex Life-cycle & Veto</h4>
               <div style="display: flex; flex-direction: column; gap: 24px;">
                  <div style="background: rgba(255,255,255,0.03); padding: 20px; border-radius: 16px; border: 1px solid rgba(255,255,255,0.1);">
                     <ui-switch 
                        label="Async Promise Flow" 
                        async="true" 
                        onSwitchChange="handleAsyncSwitch(event)" 
                        color="success" 
                        glow>
                     </ui-switch>
                     <p style="font-size: 10px; opacity: 0.5; margin-top: 10px;">Enters 'Pending' state until server-side ACK (2s latency simulated).</p>
                  </div>
                  <div style="background: rgba(255,255,255,0.03); padding: 20px; border-radius: 16px; border: 1px solid rgba(255,255,255,0.1);">
                     <ui-switch 
                        label="Security Veto (Shake)" 
                        async="true" 
                        checked="true"
                        onSwitchChange="handleVetoSwitch(event)" 
                        color="danger" 
                        glow 
                        haptic="true">
                     </ui-switch>
                     <p style="font-size: 10px; opacity: 0.5; margin-top: 10px;">Rejects toggle with visual shake and tactical vibration pattern.</p>
                  </div>
               </div>
            </div>

            <div style="background: white; padding: 32px; border-radius: 20px; border: 1px solid #f1f5f9;">
               <h4 style="margin: 0 0 20px 0; font-size: 12px; color: #6366f1; text-transform: uppercase; font-weight: 800;">Interaction Tier (A11y)</h4>
               <div style="display: flex; flex-direction: column; gap: 20px;">
                  <ui-switch label="Focus Mastery" description="Tab here for color-synced ring"></ui-switch>
                  <ui-switch label="Tactile Press" description="Hold for scale-down effect" color="warning"></ui-switch>
                  <ui-switch label="Surface Lift" description="Hover for illumination" color="info"></ui-switch>
               </div>
            </div>
         </div>
     `;
  };

  window.showIconImageDemos = function () {
    const container = document.getElementById('switchDemoContainer');
    if (!container) return;

    container.innerHTML = `
      <div class="demo-block reveal-slide-up">
        <h3 class="specimen-title">🖼️ High-Fidelity Substrates</h3>
        <p class="specimen-description">Expressive state-based feedback using premium vector glyphs and raster mapping.</p>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 40px; background: linear-gradient(135deg, rgba(var(--primary-rgb), 0.05) 0%, rgba(var(--info-rgb), 0.05) 100%); padding: 60px; border-radius: 32px; position: relative; overflow: hidden;">
           <!-- Decorative glow -->
           <div style="position: absolute; top: -100px; right: -100px; width: 300px; height: 300px; background: radial-gradient(circle, rgba(var(--primary-rgb), 0.1) 0%, transparent 70%); filter: blur(50px);"></div>
           
           <!-- Icon Examples -->
           <div class="demo-specimen" style="background: rgba(255,255,255,0.7); backdrop-filter: blur(20px); padding: 32px; border-radius: 24px; border: 1px solid rgba(255,255,255,0.5); display: flex; flex-direction: column; gap: 32px; box-shadow: 0 10px 30px -10px rgba(0,0,0,0.05);">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                 <h4 style="margin: 0; font-size: 13px; color: #6366f1; text-transform: uppercase; letter-spacing: 1px; font-weight: 800;">Dynamic Symbol Systems</h4>
                 <div style="padding: 4px 10px; background: rgba(99, 102, 241, 0.1); border-radius: 8px; color: #6366f1; font-size: 10px; font-weight: 700;">VECTOR GLYPHS</div>
              </div>
              <p style="font-size: 12px; color: #64748b; margin: -16px 0 0 0; line-height: 1.5;">Expressive symbols to enhance cognitive state recognition and accessibility.</p>
              
              <div style="display: flex; flex-direction: column; gap: 24px;">
                  <div style="background: white; padding: 20px; border-radius: 20px; border: 1px solid #f1f5f9; position: relative;">
                    <ui-switch label="Audio Matrix" checked icon-on="volume-high" icon-off="volume-mute" size="large" glow color="primary"></ui-switch>
                    <div style="position: absolute; right: 20px; top: 50%; transform: translateY(-50%); font-size: 10px; opacity: 0.3; font-weight: 700;">70% GAIN</div>
                 </div>
                 <div style="background: white; padding: 20px; border-radius: 20px; border: 1px solid #f1f5f9; position: relative;">
                    <ui-switch label="Emergency Protocol" icon-on="nuclear" icon-off="lock-open" size="large" glow color="danger"></ui-switch>
                    <div style="position: absolute; right: 20px; top: 50%; transform: translateY(-50%); font-size: 10px; opacity: 0.3; font-weight: 700;">STANDBY</div>
                 </div>
                 <div style="background: white; padding: 20px; border-radius: 20px; border: 1px solid #f1f5f9;">
                    <ui-switch label="Wide Status Matrix" width="160px" checked show-track-text="true" checked-text="OPERATIONAL" unchecked-text="STANDBY" icon-on="pulse" icon-off="infinite" size="large" glow color="success"></ui-switch>
                 </div>
              </div>
           </div>

           <!-- Image Examples -->
           <div class="demo-specimen" style="background: rgba(255,255,255,0.7); backdrop-filter: blur(20px); padding: 32px; border-radius: 24px; border: 1px solid rgba(255,255,255,0.5); display: flex; flex-direction: column; gap: 32px; box-shadow: 0 10px 30px -10px rgba(0,0,0,0.05);">
              <h4 style="margin: 0; font-size: 13px; color: #64748b; text-transform: uppercase; letter-spacing: 1px; font-weight: 800;">Raster Texture Mapping</h4>
              <div style="display: flex; flex-direction: column; gap: 24px;">
                 <div style="background: white; padding: 16px; border-radius: 16px; border: 1px solid #f1f5f9;">
                    <ui-switch 
                      label="Regional Cluster" 
                      checked 
                      size="xl" 
                      checked-image="https://www.countryflags.com/wp-content/uploads/united-kingdom-flag-png-large.png" 
                      unchecked-image="https://www.countryflags.com/wp-content/uploads/united-states-of-america-flag-png-large.png"
                    ></ui-switch>
                 </div>
                 <div style="background: white; padding: 16px; border-radius: 16px; border: 1px solid #f1f5f9;">
                    <ui-switch 
                      label="Identity Matrix" 
                      size="xl" 
                      checked-image="https://ui-avatars.com/api/?name=User&background=6366f1&color=fff" 
                      unchecked-image="https://ui-avatars.com/api/?name=Guest&background=94a3b8&color=fff"
                    ></ui-switch>
                 </div>
              </div>
           </div>

           <!-- Multi-State Fusion -->
           <div class="demo-specimen" style="background: #0f172a; padding: 32px; border-radius: 24px; color: white; display: flex; flex-direction: column; gap: 32px; box-shadow: 0 20px 40px -10px rgba(0,0,0,0.3); grid-column: span 1;">
              <h4 style="margin: 0; font-size: 13px; color: rgba(255,255,255,0.4); text-transform: uppercase; letter-spacing: 1px; font-weight: 800;">Atmospheric Fusion</h4>
              <div style="display: flex; align-items: center; justify-content: center; padding: 20px; background: rgba(255,255,255,0.03); border-radius: 16px; border: 1px solid rgba(255,255,255,0.1);">
                 <ui-switch 
                   label="Orbital Mode" 
                   checked 
                   size="xxl" 
                   variant="glass" 
                   icon-on="sun" 
                   icon-off="moon" 
                   color="warning" 
                   glow
                 ></ui-switch>
              </div>
              <p style="font-size: 12px; opacity: 0.6; line-height: 1.6; text-align: center;">Advanced chromatic sampling dynamically illuminates the track substrate based on the active icon archetype.</p>
           </div>
        </div>
      </div>
    `;
  };

  window.showSwitchSizes = function () {
    const container = document.getElementById('switchDemoContainer');
    container.innerHTML = `
      <div class="demo-block reveal-slide-up">
        <h3 class="specimen-title">Precision Scaling</h3>
        <div style="display: flex; flex-direction: column; gap: 32px; background: white; padding: 24px; border-radius: 12px;">
          <ui-switch label="XXX Small" size="xxxs" icon-on="check" icon-off="x" checked></ui-switch>
          <ui-switch label="XX Small" size="xxs" icon-on="check" icon-off="x" checked></ui-switch>
          <ui-switch label="X Small" size="xs" icon-on="check" icon-off="x" checked></ui-switch>
          <ui-switch label="Small" size="small" icon-on="check" icon-off="x" checked></ui-switch>
          <ui-switch label="md" size="md" icon-on="check" icon-off="x" checked></ui-switch>
          <ui-switch label="Large" size="large" icon-on="check" icon-off="x" checked></ui-switch>
          <ui-switch label="X Large" size="xl" icon-on="check" icon-off="x" checked></ui-switch>
          <ui-switch label="XX Large" size="xxl" icon-on="check" icon-off="x" checked></ui-switch>
          <ui-switch label="XXX Large" size="xxxl" icon-on="check" icon-off="x" checked></ui-switch>
        </div>
      </div>
    `;
  };

  window.showPhysicsGallery = function () {
    const container = document.getElementById('switchDemoContainer');
    if (!container) return;

    container.innerHTML = `
      <div class="demo-block reveal-slide-up">
        <h3 class="specimen-title">🧬 Precision Mechanical Engines</h3>
        <p class="specimen-description">High-fidelity kinematic archetypes for tactical state management.</p>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 32px; background: #0f172a; padding: 60px; border-radius: 40px; position: relative; overflow: hidden;">
           <!-- Scanning grid effect -->
           <div style="position: absolute; inset: 0; background-image: radial-gradient(rgba(var(--primary-rgb), 0.1) 1px, transparent 1px); background-size: 32px 32px; opacity: 0.5;"></div>
           
           <div class="demo-specimen" style="background: rgba(30, 41, 59, 0.7); backdrop-filter: blur(12px); padding: 32px; border-radius: 24px; border: 1px solid rgba(255,255,255,0.1); color: white; transition: all 0.3s transform;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
                <h4 style="margin: 0; font-size: 12px; color: #10b981; text-transform: uppercase; letter-spacing: 1px; font-weight: 800;">Kinetic Engine: Liquid</h4>
                <ui-icon name="water" library="ionicons" size="18px"></ui-icon>
              </div>
              <div style="background: rgba(255,255,255,0.03); padding: 24px; border-radius: 16px; border: 1px solid rgba(255,255,255,0.05); margin-bottom: 20px;">
                <ui-switch label="Fluid Interaction" physics="liquid" checked glow color="info" size="large" icon-on="sparkles" icon-off="zap"></ui-switch>
              </div>
              <p style="font-size: 11px; opacity: 0.5; line-height: 1.6;">Optimal viscosity. 400ms balanced response time suitable for standard utility toggles.</p>
           </div>

           <div class="demo-specimen" style="background: rgba(30, 41, 59, 0.7); backdrop-filter: blur(12px); padding: 32px; border-radius: 24px; border: 1px solid rgba(255,255,255,0.1); color: white;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
                <h4 style="margin: 0; font-size: 12px; color: #f43f5e; text-transform: uppercase; letter-spacing: 1px; font-weight: 800;">Kinetic Engine: Stiff</h4>
                <ui-icon name="flash" library="ionicons" size="18px"></ui-icon>
              </div>
              <div style="background: rgba(255,255,255,0.03); padding: 24px; border-radius: 16px; border: 1px solid rgba(255,255,255,0.05); margin-bottom: 20px;">
                <ui-switch label="Rapid Engagement" physics="stiff" checked glow color="danger" size="large" icon-on="lock-closed" icon-off="lock-open"></ui-switch>
              </div>
              <p style="font-size: 11px; opacity: 0.5; line-height: 1.6;">High-tension spring. 200ms instantaneous response for pro-tools and rapid state changes.</p>
           </div>

           <div class="demo-specimen" style="background: rgba(30, 41, 59, 0.7); backdrop-filter: blur(12px); padding: 32px; border-radius: 24px; border: 1px solid rgba(255,255,255,0.1); color: white;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
                <h4 style="margin: 0; font-size: 12px; color: #f59e0b; text-transform: uppercase; letter-spacing: 1px; font-weight: 800;">Kinetic Engine: Bouncy</h4>
                <ui-icon name="notifications" library="ionicons" size="18px"></ui-icon>
              </div>
              <div style="background: rgba(255,255,255,0.03); padding: 24px; border-radius: 16px; border: 1px solid rgba(255,255,255,0.05); margin-bottom: 20px;">
                <ui-switch label="Elastic Feedback" physics="bouncy" checked glow color="warning" size="large" icon-on="notifications" icon-off="notifications-off"></ui-switch>
              </div>
              <p style="font-size: 11px; opacity: 0.5; line-height: 1.6;">Undamped physics. 500ms overshoot with settling oscillation for playful interactions.</p>
           </div>

           <div class="demo-specimen" style="background: rgba(30, 41, 59, 0.7); backdrop-filter: blur(12px); padding: 32px; border-radius: 24px; border: 1px solid rgba(255,255,255,0.1); color: white;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
                <h4 style="margin: 0; font-size: 12px; color: #94a3b8; text-transform: uppercase; letter-spacing: 1px; font-weight: 800;">Kinetic Engine: Linear</h4>
                <ui-icon name="settings" library="ionicons" size="18px"></ui-icon>
              </div>
              <div style="background: rgba(255,255,255,0.03); padding: 24px; border-radius: 16px; border: 1px solid rgba(255,255,255,0.05); margin-bottom: 20px;">
                <ui-switch label="Mechanical Steady" physics="linear" checked color="secondary" glow size="large" icon-on="checkmark" icon-off="close"></ui-switch>
              </div>
              <p style="font-size: 11px; opacity: 0.5; line-height: 1.6;">Zero-acceleration. Industrial constant-velocity movement for strictly mechanical feeling.</p>
           </div>
        </div>
      </div>
    `;
  };

  window.showToggleGroup = function () {
    const container = document.getElementById('switchDemoContainer');
    if (!container) return;

    container.innerHTML = `
      <div class="demo-block reveal-fade-in">
        <h3 class="specimen-title">📦 Collective Toggle Groups</h3>
        <p class="specimen-description">High-performance orchestration of multiple switch states with semantic grouping and advanced layout engines.</p>
        
        <div style="display: flex; flex-direction: column; gap: 50px;">
          
          <!-- Layout Orchestration -->
          <div style="background: white; padding: 32px; border-radius: 20px; border: 1px solid #f1f5f9; box-shadow: 0 4px 20px rgba(0,0,0,0.02);">
            <h4 style="margin: 0 0 24px 0; font-size: 13px; color: #64748b; text-transform: uppercase; letter-spacing: 1px;">Layout Orchestration</h4>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 40px;">
              <div>
                <p style="font-size: 11px; margin-bottom: 12px; color: #94a3b8; font-weight: 600;">HORIZONTAL (DEFAULT)</p>
                <ui-toggle-group 
                  value="prod"
                  variant="primary"
                  options='[
                    {"label": "Production", "value": "prod"},
                    {"label": "Staging", "value": "stage"},
                    {"label": "Development", "value": "dev", "disabled": true}
                  ]'
                ></ui-toggle-group>
              </div>

              <!-- Segmented Morphing Substrate (Apex Tier) -->
              <div>
                <p style="font-size: 11px; margin-bottom: 12px; color: #6366f1; font-weight: 800;">SEGMENTED KINETIC SYSTEM</p>
                <ui-toggle-group 
                  value="weekly"
                  variant="segmented"
                  color="primary"
                  options='[
                    {"label": "DAILY", "value": "daily"},
                    {"label": "WEEKLY", "value": "weekly"},
                    {"label": "MONTHLY", "value": "monthly"}
                  ]'
                ></ui-toggle-group>
                <p style="font-size: 10px; opacity: 0.5; margin-top: 10px;">Sliding background indicator with morphological kinematic transition.</p>
              </div>

              <div>
                <p style="font-size: 11px; margin-bottom: 12px; color: #94a3b8; font-weight: 600;">VERTICAL (PERMISSION MATRIX)</p>
                <ui-toggle-group 
                  layout="vertical"
                  selection-mode="multiple"
                  variant="info"
                  value='["read"]'
                  options='[
                    {"label": "Read Access", "value": "read"},
                    {"label": "Write Access", "value": "write"},
                    {"label": "Admin Privileges", "value": "admin"}
                  ]'
                ></ui-toggle-group>
              </div>
              <div style="grid-column: span 1;">
                <p style="font-size: 11px; margin-bottom: 12px; color: #94a3b8; font-weight: 600;">GRID (3 COLUMNS)</p>
                <ui-toggle-group 
                  layout="grid"
                  columns="3"
                  selection-mode="multiple"
                  variant="success"
                  options='[
                    {"label": "Alpha", "value": "a"},
                    {"label": "Beta", "value": "b"},
                    {"label": "Gamma", "value": "g"},
                    {"label": "Delta", "value": "d"},
                    {"label": "Epsilon", "value": "e"},
                    {"label": "Zeta", "value": "z"}
                  ]'
                ></ui-toggle-group>
              </div>
            </div>
          </div>

          <!-- Interactive Features -->
          <div style="background: #f8fafc; padding: 32px; border-radius: 20px; border: 1px solid #e2e8f0;">
            <h4 style="margin: 0 0 24px 0; font-size: 13px; color: #64748b; text-transform: uppercase; letter-spacing: 1px;">Advanced Capabilities</h4>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 40px;">
              <div style="background: white; padding: 24px; border-radius: 16px; border: 1px solid #e2e8f0;">
                <p style="font-size: 11px; margin-bottom: 16px; color: #94a3b8; font-weight: 600;">SEARCHABLE & MULTI-SELECT</p>
                <ui-toggle-group 
                  label="Fleet Management"
                  searchable="true"
                  show-select-all="true"
                  selection-mode="multiple"
                  color="primary"
                  variant="outline"
                  options='[
                    {"label": "Starship Alpha", "value": "alpha"},
                    {"label": "Starship Beta", "value": "beta"},
                    {"label": "Cruiser Gamma", "value": "gamma"},
                    {"label": "Fighter Delta", "value": "delta"},
                    {"label": "Fighter Epsilon", "value": "epsilon"}
                  ]'
                ></ui-toggle-group>
              </div>
              <div style="background: white; padding: 24px; border-radius: 16px; border: 1px solid #e2e8f0;">
                <p style="font-size: 11px; margin-bottom: 16px; color: #94a3b8; font-weight: 600;">COLLAPSIBLE & DRAGGABLE</p>
                <ui-toggle-group 
                  label="System Modules"
                  collapsible="true"
                  is-draggable="true"
                  color="secondary"
                  variant="glass"
                  options='[
                    {"label": "Core Engine", "value": "core"},
                    {"label": "Shield Gen", "value": "shield"},
                    {"label": "Life Support", "// turbo": "life"},
                    {"label": "Telemetry", "value": "tel"}
                  ]'
                ></ui-toggle-group>
              </div>
            </div>
          </div>

          <!-- Semantic States -->
          <div style="background: white; padding: 32px; border-radius: 20px; border: 1px solid #f1f5f9;">
            <h4 style="margin: 0 0 24px 0; font-size: 13px; color: #64748b; text-transform: uppercase; letter-spacing: 1px;">Visual Archetypes</h4>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 32px;">
              <div>
                <p style="font-size: 11px; margin-bottom: 12px; color: #94a3b8; font-weight: 600;">SHAPE: PILL (FLAGSHIP)</p>
                <ui-toggle-group 
                  shape="pill"
                  color="primary"
                  variant="outline"
                  options='[
                    {"label": "Alpha", "value": "a"},
                    {"label": "Beta", "value": "b"}
                  ]'
                ></ui-toggle-group>
              </div>
              <div>
                <p style="font-size: 11px; margin-bottom: 12px; color: #94a3b8; font-weight: 600;">SHAPE: ROUNDED (SOFT)</p>
                <ui-toggle-group 
                  shape="rounded"
                  color="success"
                  variant="raised"
                  options='[
                    {"label": "Standard", "value": "s"},
                    {"label": "Custom", "value": "c"}
                  ]'
                ></ui-toggle-group>
              </div>
              <div>
                <p style="font-size: 11px; margin-bottom: 12px; color: #94a3b8; font-weight: 600;">SHAPE: SQUARE (INDUSTRIAL)</p>
                <ui-toggle-group 
                  shape="square"
                  color="info"
                  variant="outlined"
                  options='[
                    {"label": "Linear", "value": "l"},
                    {"label": "Modular", "value": "m"}
                  ]'
                ></ui-toggle-group>
              </div>
              <div>
                <p style="font-size: 11px; margin-bottom: 12px; color: #94a3b8; font-weight: 600;">SKELETON LOADING</p>
                <ui-toggle-group 
                  show-skeleton="true"
                  skeleton-count="2"
                ></ui-toggle-group>
              </div>
            </div>
          </div>

        </div>
      </div>
    `;
  };

  showInteractiveSwitch();
}

function initializeSwitchBehaviors() {
  const playgroundSwitch = document.getElementById('playgroundSwitch');
  if (!playgroundSwitch) return;

  const inputs = [
    'playSwitchLabel',
    'playSwitchCheckedIcon',
    'playSwitchUncheckedIcon',
    'playSwitchCheckedImg',
    'playSwitchUncheckedImg',
    'playSwitchDesc',
    'playSwitchWidth',
    'playSwitchCheckedText',
    'playSwitchUncheckedText',
  ];
  const dropdowns = ['playSwitchSize', 'playSwitchColor', 'playSwitchVariant', 'playSwitchDescPos', 'playSwitchLibrary', 'playSwitchPhysics'];
  const checkboxes = ['playSwitchGlow', 'playSwitchHaptic', 'playSwitchGradient', 'playSwitchLoading', 'playSwitchRTL', 'playSwitchIndeterminate', 'playSwitchShowText'];

  inputs.forEach(id => {
    document.getElementById(id)?.addEventListener('inputChange', () => window.updatePlaygroundSwitch());
  });
  dropdowns.forEach(id => {
    document.getElementById(id)?.addEventListener('dropdownChange', () => window.updatePlaygroundSwitch());
  });
  checkboxes.forEach(id => {
    document.getElementById(id)?.addEventListener('checkboxChange', () => window.updatePlaygroundSwitch());
  });

  window.updatePlaygroundSwitch = function () {
    const label = document.getElementById('playSwitchLabel').value;
    const checkedIcon = document.getElementById('playSwitchCheckedIcon').value;
    const uncheckedIcon = document.getElementById('playSwitchUncheckedIcon').value;
    const checkedImg = document.getElementById('playSwitchCheckedImg').value;
    const uncheckedImg = document.getElementById('playSwitchUncheckedImg').value;
    const desc = document.getElementById('playSwitchDesc').value;
    const size = document.getElementById('playSwitchSize').value;
    const color = document.getElementById('playSwitchColor').value;
    const variant = document.getElementById('playSwitchVariant').value;
    const descPos = document.getElementById('playSwitchDescPos').value;
    const glow = document.getElementById('playSwitchGlow').checked;
    const haptic = document.getElementById('playSwitchHaptic').checked;
    const gradient = document.getElementById('playSwitchGradient').checked;
    const loading = document.getElementById('playSwitchLoading').checked;
    const rtl = document.getElementById('playSwitchRTL').checked;
    const indeterminate = document.getElementById('playSwitchIndeterminate').checked;

    const library = document.getElementById('playSwitchLibrary').value;
    const physics = document.getElementById('playSwitchPhysics').value;

    playgroundSwitch.label = label;
    playgroundSwitch.iconOn = checkedIcon;
    playgroundSwitch.iconOff = uncheckedIcon;
    playgroundSwitch.iconLibrary = library;
    playgroundSwitch.physics = physics;
    playgroundSwitch.checkedImage = checkedImg;
    playgroundSwitch.uncheckedImage = uncheckedImg;
    playgroundSwitch.description = desc;
    playgroundSwitch.size = size;
    playgroundSwitch.color = color;
    playgroundSwitch.variant = variant;
    playgroundSwitch.descriptionPosition = descPos;
    playgroundSwitch.glow = glow;
    playgroundSwitch.haptic = haptic;
    playgroundSwitch.gradient = gradient;
    playgroundSwitch.loading = loading;
    playgroundSwitch.rtl = rtl;
    playgroundSwitch.indeterminate = indeterminate;
    playgroundSwitch.showTrackText = document.getElementById('playSwitchShowText').checked;
    playgroundSwitch.checkedText = document.getElementById('playSwitchCheckedText').value;
    playgroundSwitch.uncheckedText = document.getElementById('playSwitchUncheckedText').value;
    playgroundSwitch.width = document.getElementById('playSwitchWidth').value;

    window.updateSwitchCode();
  };

  window.updateSwitchCode = () => {
    const sw = playgroundSwitch;
    const codePreview = document.getElementById('switchCodePreview');
    if (!sw || !codePreview) return;

    let code = `<ui-switch\n  label="${sw.label}"\n  description="${sw.description}"\n  size="${sw.size}"\n  color="${sw.color}"\n  variant="${sw.variant}"`;
    if (sw.iconOn && sw.iconOn !== 'check') code += `\n  icon-on="${sw.iconOn}"`;
    if (sw.iconOff && sw.iconOff !== 'x') code += `\n  icon-off="${sw.iconOff}"`;
    if (sw.iconLibrary !== 'lucide') code += `\n  icon-library="${sw.iconLibrary}"`;
    if (sw.physics !== 'liquid') code += `\n  physics="${sw.physics}"`;
    if (sw.checkedImage) code += `\n  checked-image="${sw.checkedImage}"`;
    if (sw.uncheckedImage) code += `\n  unchecked-image="${sw.uncheckedImage}"`;
    if (sw.descriptionPosition !== 'bottom') code += `\n  description-position="${sw.descriptionPosition}"`;
    if (sw.glow) code += `\n  glow`;
    if (sw.haptic) code += `\n  haptic`;
    if (sw.gradient) code += `\n  gradient`;
    if (sw.loading) code += `\n  loading`;
    if (sw.showTrackText) code += `\n  show-track-text`;
    if (sw.checkedText && sw.checkedText !== 'ON') code += `\n  checked-text="${sw.checkedText}"`;
    if (sw.uncheckedText && sw.uncheckedText !== 'OFF') code += `\n  unchecked-text="${sw.uncheckedText}"`;
    if (sw.width) code += `\n  width="${sw.width}"`;
    code += `\n></ui-switch>`;

    codePreview.setAttribute('html-code', code);
  };

  playgroundSwitch.addEventListener('switchChange', () => window.updateSwitchCode());
  window.updateSwitchCode();
}
