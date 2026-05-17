// Popover Component Demo — Full Feature Coverage
export function initPopoverDemo() {
  const section = document.getElementById('popover');
  if (!section) return;

  section.innerHTML = `
    <p>Display rich content in floating popover overlays with smart auto-positioning, semantic variants, and full keyboard support.</p>

    <div id="popoverDemoControls" class="demo-controls" style="margin: 20px 0; display: flex; gap: 10px; flex-wrap: wrap;">
      <ui-button id="btnPlayground" label="🎮 Playground"  style="--ui-button-bg: linear-gradient(135deg,#8b5cf6,#6366f1); border: none;" variant="outline"></ui-button>
      <ui-button id="btnBasic" label="Basic" variant="outline"></ui-button>
      <ui-button id="btnTriggers" label="Triggers" variant="outline"></ui-button>
      <ui-button id="btnVariants" label="Variants" variant="outline"></ui-button>
      <ui-button id="btnRich" label="🧩 Rich Content" variant="outline"></ui-button>
      <ui-button id="btnIcon" label="Icon Toolbar" variant="outline"></ui-button>
      <ui-button id="btnPremium" label="✨ Premium"  style="--ui-button-bg: #ec4899; --ui-button-border: none;" variant="outline"></ui-button>
      <ui-button id="btnEdge" label="Edge Detection"  style="--ui-button-bg: #64748b; --ui-button-border: none;" variant="outline"></ui-button>
    </div>

    <div id="popoverDemoContainer" style="margin-top: 20px;"></div>
  `;

  setTimeout(() => {
    const navMap = {
      btnPlayground: showInteractivePopover,
      btnBasic: showBasicPopover,
      btnTriggers: showTriggersDemo,
      btnVariants: showVariantsDemo,
      btnRich: showAdvancedSlotted,
      btnIcon: showIconPopover,
      btnPremium: showPremiumPopover,
      btnEdge: showEdgeCases,
    };

    Object.entries(navMap).forEach(([id, fn]) => {
      document.getElementById(id)?.addEventListener('click', fn);
    });

    showInteractivePopover();
  }, 100);
}

// ── Helper ───────────────────────────────────────────────────
function btn(text, bg = '#10b981', extra = '') {
  let color = 'success';
  if (bg.includes('#f59e0b')) color = 'warning';
  else if (bg.includes('#8b5cf6')) color = 'secondary';
  else if (bg.includes('#6366f1')) color = 'primary';
  else if (bg.includes('#ec4899')) color = 'error';
  else if (bg.includes('#2563eb')) color = 'info';
  else if (bg.includes('#374151')) color = 'secondary';

  return `<ui-button label="${text}" color="${color}" variant="outline" style="${extra}"></ui-button>`;
}

// ── Basic ────────────────────────────────────────────────────
function showBasicPopover() {
  const container = document.getElementById('popoverDemoContainer');
  if (!container) return;
  container.innerHTML = `
    <div class="demo-block">
      <h3>Basic Popovers</h3>
      <p>Click triggers with arrows, headings, and rich HTML content.</p>

      <h4 style="margin-top:32px;">Click trigger (default)</h4>
      <div style="display:flex;gap:20px;flex-wrap:wrap;margin-top:16px;">
        <ui-popover trigger="click" placement="top" heading="Information" content="<p>This is a <strong>popover</strong> with HTML content. Click outside to close.</p>">
          ${btn('Top')}
        </ui-popover>
        <ui-popover trigger="click" placement="bottom" heading="Notes" content="<p>Bottom placement — flips to top when near edge.</p>">
          ${btn('Bottom', '#10b981')}
        </ui-popover>
        <ui-popover trigger="click" placement="left" content="<p>Left placement</p>">
          ${btn('Left', '#f59e0b')}
        </ui-popover>
        <ui-popover trigger="click" placement="right" content="<p>Right placement</p>">
          ${btn('Right', '#8b5cf6')}
        </ui-popover>
      </div>

      <h4 style="margin-top:40px;">No arrow / No heading</h4>
      <div style="display:flex;gap:20px;flex-wrap:wrap;margin-top:16px;">
        <ui-popover trigger="click" placement="bottom" show-arrow="false" content="<p>Arrow-free popover — great for menus and dropdowns.</p>">
          ${btn('No Arrow', '#6366f1')}
        </ui-popover>
        <ui-popover trigger="click" placement="bottom" content="<p>No heading, just body content.</p>">
          ${btn('No Heading', '#ec4899')}
        </ui-popover>
      </div>

      <h4 style="margin-top:40px;">maxHeight — scrollable body</h4>
      <p style="color:#6b7280;font-size:13px;">Set <code>max-height</code> to enable internal scrolling for long content.</p>
      <ui-popover trigger="click" placement="bottom" heading="Long List" max-height="200px"
        content="<ul style='margin:0;padding-left:18px;line-height:2;'><li>Item 1</li><li>Item 2</li><li>Item 3</li><li>Item 4</li><li>Item 5</li><li>Item 6</li><li>Item 7</li><li>Item 8</li><li>Item 9</li><li>Item 10</li></ul>">
        ${btn('Scrollable Content', '#0891b2')}
      </ui-popover>
    </div>
  `;
}

// ── Triggers ─────────────────────────────────────────────────
function showTriggersDemo() {
  const container = document.getElementById('popoverDemoContainer');
  if (!container) return;
  container.innerHTML = `
    <div class="demo-block">
      <h3>Trigger Modes</h3>

      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:24px;margin-top:24px;">

        <div style="background:#f9fafb;padding:20px;border-radius:12px;border:1px solid #e5e7eb;">
          <h4 style="margin:0 0 8px;">click</h4>
          <p style="font-size:13px;color:#6b7280;margin-bottom:16px;">Toggle on click, close on outside click or Esc.</p>
          <ui-popover trigger="click" placement="bottom" heading="Click Trigger" content="<p>Opened by clicking the button.</p>">
            ${btn('Click Me', '#10b981')}
          </ui-popover>
        </div>

        <div style="background:#f0fdf4;padding:20px;border-radius:12px;border:1px solid #bbf7d0;">
          <h4 style="margin:0 0 8px;">hover</h4>
          <p style="font-size:13px;color:#6b7280;margin-bottom:16px;">Opens on mouse enter, closes after <code>hide-delay</code> ms. Move cursor into popover body — it stays open (<code>interactive</code>).</p>
          <ui-popover trigger="hover" placement="bottom" show-delay="200" hide-delay="400" heading="Hover Trigger" content="<p>Hover into this area — it stays open!</p>">
            ${btn('Hover Me', '#10b981')}
          </ui-popover>
        </div>

        <div style="background:#eff6ff;padding:20px;border-radius:12px;border:1px solid #bfdbfe;">
          <h4 style="margin:0 0 8px;">focus</h4>
          <p style="font-size:13px;color:#6b7280;margin-bottom:16px;">Opens when trigger receives keyboard focus. Great for form field hints.</p>
          <ui-popover trigger="focus" placement="bottom" content="<p>Tab to focus this input to see the hint.</p>">
            <ui-input placeholder="Focus me..." style="padding:10px 14px;border:2px solid #93c5fd;border-radius:8px;outline:none;font-size:14px;width:100%;box-sizing:border-box;">
          </ui-popover>
        </div>

        <div style="background:#fdf4ff;padding:20px;border-radius:12px;border:1px solid #e9d5ff;">
          <h4 style="margin:0 0 8px;">manual</h4>
          <p style="font-size:13px;color:#6b7280;margin-bottom:16px;">No automatic trigger — control via <code>show()</code> / <code>hide()</code> methods.</p>
          <div style="display:flex;gap:8px;margin-bottom:16px;">
            <ui-button label="Show" variant="outline" color="primary" onclick="document.getElementById('manualPop').show()" style="flex:1;"></ui-button>
            <ui-button label="Hide" variant="outline" color="secondary" onclick="document.getElementById('manualPop').hide()" style="flex:1;"></ui-button>
            <ui-button label="Toggle" variant="outline" color="primary" onclick="document.getElementById('manualPop').toggle()" style="flex:1;"></ui-button>
          </div>
          <ui-popover id="manualPop" trigger="manual" placement="bottom" heading="Manual Mode" content="<p>I'm fully controlled programmatically.</p>">
            <div style="padding:12px;background:#ede9fe;border-radius:8px;text-align:center;font-size:13px;color:#6d28d9;border:2px dashed #c4b5fd;">Target Element</div>
          </ui-popover>
        </div>

        <div style="background:#fff7ed;padding:20px;border-radius:12px;border:1px solid #fed7aa;">
          <h4 style="margin:0 0 8px;">interactive: false</h4>
          <p style="font-size:13px;color:#6b7280;margin-bottom:16px;">In hover mode with <code>interactive="false"</code> — popover closes immediately when cursor leaves trigger (pure tooltip).</p>
          <ui-popover trigger="hover" interactive="false" placement="bottom" hide-delay="0" content="<p>I close instantly when you leave me.</p>">
            ${btn('Hover (non-interactive)', '#ea580c')}
          </ui-popover>
        </div>

        <div style="background:#f0fdf4;padding:20px;border-radius:12px;border:1px solid #bbf7d0;">
          <h4 style="margin:0 0 8px;">closeOnScroll</h4>
          <p style="font-size:13px;color:#6b7280;margin-bottom:16px;">Popover closes automatically when the page is scrolled — ideal for popovers inside scrollable lists.</p>
          <ui-popover trigger="click" close-on-scroll="true" placement="bottom" content="<p>Scroll the page — I'll close automatically.</p>">
            ${btn('Open + Scroll closes', '#16a34a')}
          </ui-popover>
        </div>

      </div>
    </div>
  `;
}

// ── Variants ─────────────────────────────────────────────────
function showVariantsDemo() {
  const container = document.getElementById('popoverDemoContainer');
  if (!container) return;
  container.innerHTML = `
    <div class="demo-block">
      <h3>Semantic Variants</h3>
      <p>6 colour variants to communicate intent without custom CSS.</p>

      <div style="display:flex;gap:20px;flex-wrap:wrap;margin-top:28px;">
        <ui-popover trigger="click" variant="light" placement="bottom" heading="Light (default)"
          content="<p>Default clean white popover.</p>">
          ${btn('Light', '#374151')}
        </ui-popover>

        <ui-popover trigger="click" variant="dark" placement="bottom" heading="Dark Mode"
          content="<p>Sleek dark variant for dark-theme UIs.</p>">
          ${btn('Dark', '#1f2937')}
        </ui-popover>

        <ui-popover trigger="click" variant="success" placement="bottom" heading="All systems go"
          content="<p>Deployment completed successfully in 2.3s.</p>">
          ${btn('Success', '#16a34a')}
        </ui-popover>

        <ui-popover trigger="click" variant="warning" placement="bottom" heading="Heads up"
          content="<p>Your API quota is at 85%. Consider upgrading.</p>">
          ${btn('Warning', '#d97706')}
        </ui-popover>

        <ui-popover trigger="click" variant="error" placement="bottom" heading="Action failed"
          content="<p>Could not save changes. Please try again.</p>" show-close-button="true">
          ${btn('Error', '#dc2626')}
        </ui-popover>

        <ui-popover trigger="click" variant="info" placement="bottom" heading="Did you know?"
          content="<p>You can use the <code>footer</code> slot for action buttons.</p>">
          ${btn('Info', '#2563eb')}
        </ui-popover>
      </div>

      <h4 style="margin-top:40px;">With Footer Slot</h4>
      <p style="color:#6b7280;font-size:13px;">Use <code>&lt;div slot="footer"&gt;</code> for sticky action buttons at the bottom.</p>

      <div style="display:flex;gap:20px;flex-wrap:wrap;margin-top:16px;">
        <ui-popover id="footerPop1" trigger="click" variant="error" placement="bottom" heading="Delete Project?" show-close-button="true">
          ${btn('Delete…', '#dc2626')}
          <div slot="content"><p>This action is permanent and cannot be undone. All project files, history, and collaborators will be removed.</p></div>
          <div slot="footer" style="display:flex;justify-content:flex-end;gap:8px;">
            <ui-button label="Cancel" variant="outline" color="secondary" size="md"click="document.getElementById('footerPop1').hide()"></ui-button>
            <ui-button label="Delete" variant="outline" color="error" size="md"click="document.getElementById('footerPop1').hide()"></ui-button>
          </div>
        </ui-popover>

        <ui-popover id="footerPop2" trigger="click" variant="info" placement="bottom" heading="Keyboard Shortcuts">
          ${btn('Shortcuts', '#2563eb')}
          <div slot="content" style="font-size:13px;">
            <div style="display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid #bfdbfe;"><span>Save</span><kbd style="background:#dbeafe;padding:2px 6px;border-radius:4px;">Ctrl+S</kbd></div>
            <div style="display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid #bfdbfe;"><span>Undo</span><kbd style="background:#dbeafe;padding:2px 6px;border-radius:4px;">Ctrl+Z</kbd></div>
            <div style="display:flex;justify-content:space-between;padding:6px 0;"><span>Search</span><kbd style="background:#dbeafe;padding:2px 6px;border-radius:4px;">Ctrl+K</kbd></div>
          </div>
          <div slot="footer" style="text-align:center;font-size:12px;color:#1e40af;">
            <a href="#" style="color:#2563eb;">View all shortcuts →</a>
          </div>
        </ui-popover>
      </div>
    </div>
  `;
}

// ── Rich Slotted Content ─────────────────────────────────────
function showAdvancedSlotted() {
  const container = document.getElementById('popoverDemoContainer');
  if (!container) return;

  container.innerHTML = `
    <div class="demo-block">
      <h3>Rich Slotted Content</h3>
      <p>Pass full DOM trees through the <code>content</code> slot. Fully interactive.</p>

      <div style="margin-top:30px;display:grid;grid-template-columns:1fr 1fr;gap:40px;">
        <div>
          <h4>User Profile Card</h4>
          <ui-popover trigger="click" placement="bottom-start" width="300px">
            ${btn('View Profile', '#8b5cf6')}
            <div slot="content" style="padding:4px;">
              <div style="display:flex;align-items:center;gap:12px;margin-bottom:12px;">
                <div style="width:48px;height:48px;border-radius:50%;background:linear-gradient(135deg,#667eea,#764ba2);display:flex;align-items:center;justify-content:center;color:white;font-weight:700;font-size:18px;">JD</div>
                <div>
                  <div style="font-weight:700;color:#1f2937;">Jane Doe</div>
                  <div style="font-size:12px;color:#6b7280;">Senior Engineer · San Francisco</div>
                </div>
              </div>
              <p style="font-size:13px;color:#4b5563;margin:0 0 12px;">Building resilient distributed systems at scale.</p>
              <div style="display:flex;gap:8px;">
                <ui-button label="Message" variant="outline" color="primary" size="md"yle="flex:1;"></ui-button>
                <ui-button label="View" variant="outline" color="secondary" size="md"yle="flex:1;"></ui-button>
              </div>
            </div>
          </ui-popover>
        </div>

        <div>
          <h4>Notifications Panel</h4>
          <ui-popover trigger="click" placement="bottom-end" width="320px" heading="Notifications" show-close-button="true" max-height="240px">
            <ui-button variant="outline" color="secondary" shape="circle" icon="bell" icon-library="lucide" style="position:relative;">
              <span style="position:absolute;top:-4px;right:-4px;width:18px;height:18px;background:#ef4444;border-radius:50%;color:white;font-size:10px;font-weight:700;display:flex;align-items:center;justify-content:center;z-index:10;">3</span>
            </ui-button>
            <div slot="content" style="padding:0;">
              ${['Sarah sent you a message', 'Deployment successful', 'Storage at 90%']
                .map(
                  (msg, i) => `
                <div style="display:flex;align-items:center;gap:12px;padding:12px 0;${i < 2 ? 'border-bottom:1px solid #f3f4f6;' : ''}">
                  <div style="width:36px;height:36px;border-radius:50%;background:${['#dbeafe', '#dcfce7', '#fef3c7'][i]};display:flex;align-items:center;justify-content:center;flex-shrink:0;">
                    <ui-icon name="${['message-circle', 'check-circle', 'alert-triangle'][i]}" library="lucide" size="16px" style="color:${['#10b981', '#16a34a', '#d97706'][i]};"></ui-icon>
                  </div>
                  <div style="flex:1;min-width:0;">
                    <div style="font-size:13px;font-weight:600;color:#1f2937;">${msg}</div>
                    <div style="font-size:11px;color:#9ca3af;">${['2m ago', '15m ago', '1h ago'][i]}</div>
                  </div>
                </div>
              `,
                )
                .join('')}
            </div>
            <div slot="footer" style="text-align:center;">
              <a href="#" style="font-size:13px;color:#10b981;text-decoration:none;font-weight:600;">View all notifications →</a>
            </div>
          </ui-popover>
        </div>
      </div>

      <div style="margin-top:40px;">
        <h4>Colour Picker</h4>
        <ui-popover trigger="click" placement="bottom" width="240px" heading="Pick a colour">
          ${btn('🎨 Choose Colour', '#ec4899')}
          <div slot="content">
            <div style="display:grid;grid-template-columns:repeat(6,1fr);gap:6px;padding:4px;">
              ${['#ef4444', '#f97316', '#eab308', '#22c55e', '#10b981', '#8b5cf6', '#ec4899', '#0ea5e9', '#14b8a6', '#6b7280', '#1f2937', '#ffffff']
                .map(
                  c =>
                    `<ui-button onclick="this.closest('ui-popover').hide()" style="width:28px;height:28px;background:${c};border:2px solid #e5e7eb;border-radius:6px;cursor:pointer;transition:transform 0.15s;" onmouseover="this.style.transform='scale(1.2)'" onmouseout="this.style.transform=''"></ui-button>`,
                )
                .join('')}
            </div>
          </div>
        </ui-popover>
      </div>
    </div>
  `;
}

// ── Icon Toolbar ─────────────────────────────────────────────
function showIconPopover() {
  const container = document.getElementById('popoverDemoContainer');
  if (!container) return;

  container.innerHTML = `
    <div class="demo-block">
      <h3>Icon Toolbar with Popovers</h3>

      <h4 style="margin-top:24px;">Action Icon Tooltips</h4>
      <div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:16px;">
        ${[
          { icon: 'plus', library: 'lucide', label: 'Add Item', color: '#10b981' },
          { icon: 'pencil', library: 'lucide', label: 'Edit', color: '#10b981' },
          { icon: 'trash-2', library: 'lucide', label: 'Delete', color: '#ef4444' },
          { icon: 'settings', library: 'lucide', label: 'Settings', color: '#6b7280' },
          { icon: 'share-2', library: 'lucide', label: 'Share', color: '#8b5cf6' },
          { icon: 'download', library: 'lucide', label: 'Download', color: '#f59e0b' },
        ]
          .map(
            ({ icon, library, label, color }) => `
          <ui-popover trigger="hover" placement="top" interactive="false" hide-delay="0"
            content="<p style='white-space:nowrap;'><strong>${label}</strong></p>">
            <ui-button icon="${icon}" icon-library="${library}" icon-only="true" style="width:40px;height:40px;background:${color};color:white;border:none;border-radius:8px;cursor:pointer;display:flex;align-items:center;justify-content:center;">
      
            </ui-button>
          </ui-popover>
        `,
          )
          .join('')}
      </div>

      <h4 style="margin-top:40px;">Rich Menu via Click</h4>
      <div style="display:flex;gap:16px;flex-wrap:wrap;margin-top:16px;">
        <ui-popover trigger="click" placement="bottom-end" width="200px" show-arrow="false" popover-role="menu">
          <ui-avatar content="JD" bg-color="#8b5cf6" size="44px" style="cursor:pointer;"></ui-avatar>
          <div slot="content" style="padding:4px 0;">
            ${[
              ['user', 'lucide', 'Profile'],
              ['settings', 'lucide', 'Settings'],
              ['credit-card', 'lucide', 'Billing'],
              ['circle-help', 'lucide', 'Help'],
            ]
              .map(
                ([ic, lib, lbl]) =>
                  `<ui-button href="#" variant="ghost" icon="${ic}" icon-library="${lib}" style="width:100%; justify-content:flex-start; padding:10px 14px; margin:2px 4px; font-size:14px; color:#374151;">${lbl}</ui-button>`,
              )
              .join('')}
            <div style="height:1px;background:#f3f4f6;margin:4px 0;"></div>
            <a href="#" style="display:flex;align-items:center;gap:10px;padding:10px 14px;text-decoration:none;color:#ef4444;font-size:14px;border-radius:6px;margin:2px 4px;" onmouseover="this.style.background='#fef2f2'" onmouseout="this.style.background=''">
              <ui-icon name="log-out" library="lucide" size="15px"></ui-icon>Sign out
            </a>
          </div>
        </ui-popover>

        <ui-popover trigger="click" placement="bottom" width="240px" show-arrow="false" animation="slide">
          <ui-button variant="outline" color="secondary" shape="circle" icon="bell" icon-library="lucide" style="position:relative;">
            <span style="position:absolute;top:-2px;right:-2px;width:14px;height:14px;background:#ef4444;border-radius:50%;border:2px solid white;z-index:10;"></span>
          </ui-button>
          <div slot="content" style="padding:4px 0;">
            <div style="padding:8px 12px;font-size:12px;font-weight:700;color:#9ca3af;text-transform:uppercase;letter-spacing:.05em;">Notifications</div>
            <div style="padding:10px 12px;font-size:13px;border-radius:6px;background:#eff6ff;margin:4px;">
              <div style="font-weight:600;color:#1e40af;">Build passed ✓</div>
              <div style="color:#10b981;font-size:12px;">pipeline #247 · 1m ago</div>
            </div>
          </div>
        </ui-popover>
      </div>

      <h4 style="margin-top:40px;">Compact Text Toolbar</h4>
      <div style="background:white;border:1px solid #e5e7eb;border-radius:8px;padding:6px;display:inline-flex;gap:2px;box-shadow:0 2px 8px rgba(0,0,0,0.07);margin-top:12px;">
        ${[
          { icon: 'bold', library: 'lucide', label: 'Bold (Ctrl+B)' },
          { icon: 'italic', library: 'lucide', label: 'Italic (Ctrl+I)' },
          { icon: 'underline', library: 'lucide', label: 'Underline (Ctrl+U)' },
          null,
          { icon: 'align-left', library: 'lucide', label: 'Align Left' },
          { icon: 'align-center', library: 'lucide', label: 'Align Center' },
          { icon: 'align-right', library: 'lucide', label: 'Align Right' },
          null,
          { icon: 'link', library: 'lucide', label: 'Insert Link' },
          { icon: 'image', library: 'lucide', label: 'Insert Image' },
        ]
          .map(item =>
            item === null
              ? `<div style="width:1px;background:#e5e7eb;margin:4px 2px;"></div>`
              : `<ui-popover trigger="hover" placement="bottom" interactive="false" hide-delay="0" content="<p style='white-space:nowrap;font-size:12px;'>${item.label}</p>">
              <ui-button-toggle variant="ghost" icon="${item.icon}" icon-library="${item.library}" icon-only="true" size="md"yle="width:30px;height:30px;--button-min-width:30px;color:#374151;"></ui-button>
            </ui-popover>`,
          )
          .join('')}
      </div>
    </div>
  `;
}

// ── Premium ──────────────────────────────────────────────────
function showPremiumPopover() {
  const container = document.getElementById('popoverDemoContainer');
  if (!container) return;
  container.innerHTML = `
    <div class="demo-block">
      <h3>Premium Features</h3>

      <h4 style="margin-top:24px;">Animations</h4>
      <div style="display:flex;gap:20px;flex-wrap:wrap;margin-top:16px;">
        <ui-popover trigger="hover" placement="top" animation="scale" content="<p>Scale animation (default).</p>">${btn('Scale', '#8b5cf6')}</ui-popover>
        <ui-popover trigger="hover" placement="top" animation="slide" content="<p>Slides in from below.</p>">${btn('Slide', '#6366f1')}</ui-popover>
        <ui-popover trigger="hover" placement="top" animation="fade"  content="<p>Simple opacity fade.</p>">${btn('Fade', '#ec4899')}</ui-popover>
        <ui-popover trigger="hover" placement="top" animation="none"  content="<p>No animation — instant show.</p>">${btn('None', '#374151')}</ui-popover>
      </div>

      <h4 style="margin-top:40px;">Backdrop (modal behaviour)</h4>
      <p style="color:#6b7280;font-size:13px;">Dims the background and traps focus inside the popover.</p>
      <ui-popover id="backdropPop" trigger="click" placement="bottom" backdrop="true" width="320px"
        heading="Important Action" show-close-button="true" variant="error"
        content="<p>This popover acts like a lightweight modal. Click the backdrop or press Esc to close.</p>">
        ${btn('Show with Backdrop', '#ef4444')}
        <div slot="footer" style="display:flex;justify-content:flex-end;gap:8px;">
          <ui-button label="Cancel" variant="outline" color="secondary" size="md"click="document.getElementById('backdropPop').hide()"></ui-button>
          <ui-button label="Confirm" variant="outline" color="error" size="md"click="document.getElementById('backdropPop').hide()"></ui-button>
        </div>
      </ui-popover>

      <h4 style="margin-top:40px;">Cancellable Events</h4>
      <p style="color:#6b7280;font-size:13px;">Listen to <code>uiBeforeOpen</code> / <code>uiBeforeClose</code> and call <code>event.preventDefault()</code> to cancel.</p>
      <div style="display:flex;gap:16px;flex-wrap:wrap;margin-top:12px;">
        <ui-popover id="cancelShowPop" trigger="click" placement="bottom" heading="Before-Show Gated" content="<p>You confirmed you want to open me!</p>">
          ${btn('Gated Open', '#059669')}
        </ui-popover>
        <div id="cancelEventLog" style="padding:8px 12px;background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;font-size:13px;color:#374151;min-width:220px;display:flex;align-items:center;">Waiting for events…</div>
      </div>

      <h4 style="margin-top:40px;">Disabled</h4>
      <ui-popover trigger="click" placement="bottom" disabled="true" content="<p>You won't see me.</p>">
        <ui-button label="Disabled Trigger" disabled="true" variant="outline" color="secondary"></ui-button>
      </ui-popover>
      <h4 style="margin-top:40px;">Skeleton Loading</h4>
      <ui-popover trigger="click" placement="bottom" skeleton="true" heading="Loading…" width="260px" content="">
        ${btn('Show Skeleton', '#6366f1')}
      </ui-popover>
    </div>
  `;
}

// ── Edge Cases ───────────────────────────────────────────────
function showEdgeCases() {
  const container = document.getElementById('popoverDemoContainer');
  if (!container) return;

  // Remove any previously injected fixed buttons
  document.querySelectorAll('.edge-demo-fixed').forEach(function (el) {
    el.remove();
  });

  container.innerHTML = `
    <div class="demo-block">
      <h3>Edge Detection &amp; Auto-Positioning</h3>
      <p>
        Four buttons are pinned to the <strong>actual viewport edges</strong> using
        <code>position:fixed</code>. Each prefers a placement that would clip off-screen
        — the engine automatically flips and clamps so the panel stays visible.
      </p>

      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:14px;margin-top:24px;">
        <div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:10px;padding:14px;">
          <div style="font-size:11px;font-weight:700;color:#1e40af;letter-spacing:.05em;margin-bottom:6px;">🔵 TOP EDGE</div>
          <p style="font-size:13px;color:#1e3a8a;margin:0;line-height:1.6;">
            Prefers <code>top</code>. Flips to <strong>bottom</strong> because there's no room above.
          </p>
        </div>
        <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:10px;padding:14px;">
          <div style="font-size:11px;font-weight:700;color:#14532d;letter-spacing:.05em;margin-bottom:6px;">🟢 BOTTOM EDGE</div>
          <p style="font-size:13px;color:#14532d;margin:0;line-height:1.6;">
            Prefers <code>bottom</code>. Flips to <strong>top</strong> because there's no room below.
          </p>
        </div>
        <div style="background:#fffbeb;border:1px solid #fde68a;border-radius:10px;padding:14px;">
          <div style="font-size:11px;font-weight:700;color:#78350f;letter-spacing:.05em;margin-bottom:6px;">🟡 LEFT EDGE</div>
          <p style="font-size:13px;color:#78350f;margin:0;line-height:1.6;">
            Prefers <code>left</code>. Flips to <strong>right</strong> because there's no room on the left.
          </p>
        </div>
        <div style="background:#fdf4ff;border:1px solid #e9d5ff;border-radius:10px;padding:14px;">
          <div style="font-size:11px;font-weight:700;color:#581c87;letter-spacing:.05em;margin-bottom:6px;">🟣 RIGHT EDGE</div>
          <p style="font-size:13px;color:#581c87;margin:0;line-height:1.6;">
            Prefers <code>right</code>. Flips to <strong>left</strong> because there's no room on the right.
          </p>
        </div>
      </div>

      <div style="margin-top:20px;padding:14px 18px;background:#fefce8;border:1px solid #fde68a;border-radius:10px;display:flex;align-items:center;gap:12px;">
        <span style="font-size:22px;">👆</span>
        <span style="font-size:13px;color:#78350f;">
          <strong>Four coloured buttons have been pinned to the edges of your browser window.</strong>
          Scroll up/down to reach the top and bottom buttons, then click each one to see the flip in action.
        </span>
      </div>

      <h4 style="margin-top:32px;">Horizontal Clamping (always visible)</h4>
      <p style="color:#6b7280;font-size:13px;margin-bottom:16px;">
        <code>bottom-end</code> from the far-right still stays within the viewport.
        <code>bottom-start</code> from the far-left stays clamped inside. Arrow tracks the trigger even after clamping.
      </p>
      <div style="display:flex;justify-content:space-between;align-items:center;background:#f1f5f9;border-radius:10px;padding:24px 20px;">
        <ui-popover trigger="click" placement="bottom-start" heading="Far Left (bottom-start)"
          content="<p>Panel is clamped away from the left edge. Arrow still points to the trigger.</p>">
          <ui-button label="\u25C0 Far Left" color="success" variant="outline" onclick=""></ui-button>
        </ui-popover>
        <ui-popover trigger="click" placement="bottom" heading="Centre (bottom)"
          content="<p>Plenty of space — no flip or clamping needed.</p>">
          <ui-button label="Centre" color="secondary" variant="outline" onclick=""></ui-button>
        </ui-popover>
        <ui-popover trigger="click" placement="bottom-end" heading="Far Right (bottom-end)"
          content="<p>Panel is clamped away from the right edge. Arrow still points to the trigger.</p>">
          <ui-button label="Far Right \u25B6" color="secondary" variant="outline" onclick=""></ui-button>
        </ui-popover>
      </div>

      <div style="margin-top:24px;background:#eff6ff;border-radius:10px;padding:20px;border:1px solid #bfdbfe;">
        <h4 style="margin:0 0 10px;color:#1e40af;">💡 Positioning engine features</h4>
        <ul style="margin:0;color:#1e40af;line-height:2;font-size:13px;">
          <li><strong>Top ↔ Bottom flip</strong> — triggered when vertical overflow is detected</li>
          <li><strong>Left ↔ Right flip</strong> — triggered when horizontal overflow is detected</li>
          <li><strong>Horizontal clamping</strong> — guarantees no pixel bleeds off-screen left or right</li>
          <li><strong>Vertical clamping</strong> — applied in both directions for tall content</li>
          <li><strong>First-render safe</strong> — falls back to prop width when layout isn't ready yet</li>
          <li><strong>Arrow compensation</strong> — arrow re-tracks the trigger after clamping</li>
        </ul>
      </div>
    </div>
  `;

  // ── Inject real fixed-position triggers at each viewport edge ──
  var edgeDefs = [
    {
      id: 'edgeFixedTop',
      cssText: 'position:fixed;top:0;left:50%;transform:translateX(-50%);z-index:50000;',
      placement: 'top',
      bg: '#10b981',
      label: '▼ TOP EDGE',
      heading: 'Top Edge — flipped to bottom',
      body: "I preferred to open <em>above</em> but there's no room. I flipped to <strong>below</strong>.",
    },
    {
      id: 'edgeFixedBottom',
      cssText: 'position:fixed;bottom:0;left:50%;transform:translateX(-50%);z-index:50000;',
      placement: 'bottom',
      bg: '#10b981',
      label: '▲ BOTTOM EDGE',
      heading: 'Bottom Edge — flipped to top',
      body: "I preferred to open <em>below</em> but there's no room. I flipped to <strong>above</strong>.",
    },
    {
      id: 'edgeFixedLeft',
      cssText: 'position:fixed;left:0;top:50%;transform:translateY(-50%);z-index:50000;',
      placement: 'left',
      bg: '#d97706',
      label: '▶ LEFT',
      heading: 'Left Edge — flipped to right',
      body: "I preferred to open to the <em>left</em> but there's no room. I flipped to <strong>right</strong>.",
    },
    {
      id: 'edgeFixedRight',
      cssText: 'position:fixed;right:0;top:50%;transform:translateY(-50%);z-index:50000;',
      placement: 'right',
      bg: '#8b5cf6',
      label: '◀ RIGHT',
      heading: 'Right Edge — flipped to left',
      body: "I preferred to open to the <em>right</em> but there's no room. I flipped to <strong>left</strong>.",
    },
  ];

  edgeDefs.forEach(function (def) {
    var wrap = document.createElement('div');
    wrap.className = 'edge-demo-fixed';
    wrap.style.cssText = def.cssText;
    wrap.innerHTML =
      '<ui-popover id="' +
      def.id +
      '" trigger="click" placement="' +
      def.placement +
      '" heading="' +
      def.heading +
      '" width="280px">' +
      '<ui-button slot="trigger" label="' +
      def.label +
      '" color="secondary" variant="outline" style="box-shadow:0 2px 10px rgba(0,0,0,0.25); background:' +
      def.bg +
      '"></ui-button>' +
      '<div slot="content"><p style="font-size:13px;margin:0;line-height:1.7;">' +
      def.body +
      '</p>' +
      '<p style="font-size:11px;color:#6b7280;margin:8px 0 0;">Preferred: <code>' +
      def.placement +
      '</code></p>' +
      '</div>' +
      '</ui-popover>';
    document.body.appendChild(wrap);
  });

  // Clean up when user navigates to another section
  function cleanup() {
    document.querySelectorAll('.edge-demo-fixed').forEach(function (el) {
      el.remove();
    });
  }
  document.querySelectorAll('#popover .demo-controls button').forEach(function (b) {
    b.addEventListener('click', cleanup, { once: true });
  });
}

// ── Interactive Playground ───────────────────────────────────
function showInteractivePopover() {
  const container = document.getElementById('popoverDemoContainer');
  if (!container) return;

  container.innerHTML = `
    <div style="background:white;border-radius:14px;padding:30px;box-shadow:0 4px 24px rgba(0,0,0,0.08);border:1px solid #f1f5f9;">
      <h3 style="margin-top:0;display:flex;align-items:center;gap:10px;">
        <span style="font-size:26px;">🎮</span> Interactive Playground
      </h3>
      <p style="color:#64748b;margin-bottom:28px;">Configure every property and see changes in real-time.</p>

      <div style="display:grid;grid-template-columns:360px 1fr;gap:28px;">

        <!-- Config panel -->
        <div style="background:#f8fafc;padding:24px;border-radius:10px;border:1px solid #e5e7eb;height:fit-content;display:flex;flex-direction:column;gap:18px;">
          <h4 style="margin:0 0 4px;color:#1e293b;font-size:13px;text-transform:uppercase;letter-spacing:.06em;">⚙️ Properties</h4>

          <ui-dropdown id="ppTrigger" label="Trigger" value="click" options='[
            {"label": "Click", "value": "click"},
            {"label": "Hover", "value": "hover"},
            {"label": "Focus", "value": "focus"},
            {"label": "Manual", "value": "manual"}
          ]'></ui-dropdown>

          <ui-dropdown id="ppPlacement" label="Placement" value="top" options='[
            {"label": "Top", "value": "top"}, {"label": "Bottom", "value": "bottom"},
            {"label": "Left", "value": "left"}, {"label": "Right", "value": "right"},
            {"label": "Top Start", "value": "top-start"}, {"label": "Top End", "value": "top-end"},
            {"label": "Bottom Start", "value": "bottom-start"}, {"label": "Bottom End", "value": "bottom-end"},
            {"label": "Left Start", "value": "left-start"}, {"label": "Left End", "value": "left-end"},
            {"label": "Right Start", "value": "right-start"}, {"label": "Right End", "value": "right-end"}
          ]'></ui-dropdown>

          <ui-dropdown id="ppVariant" label="Variant" value="light" options='[
            {"label": "Light", "value": "light"}, {"label": "Dark", "value": "dark"},
            {"label": "Success", "value": "success"}, {"label": "Warning", "value": "warning"},
            {"label": "Error", "value": "error"}, {"label": "Info", "value": "info"}
          ]'></ui-dropdown>

          <ui-dropdown id="ppAnimation" label="Animation" value="scale" options='[
            {"label": "Scale", "value": "scale"}, {"label": "Slide", "value": "slide"},
            {"label": "Fade", "value": "fade"}, {"label": "None", "value": "none"}
          ]'></ui-dropdown>

          <ui-dropdown id="ppRole" label="Role" value="dialog" options='[
            {"label": "Dialog", "value": "dialog"}, {"label": "Tooltip", "value": "tooltip"},
            {"label": "Menu", "value": "menu"}, {"label": "Listbox", "value": "listbox"}
          ]'></ui-dropdown>

          <ui-input id="ppWidth" label="Width" value="280px"></ui-input>
          <ui-input id="ppHeading" label="Heading" value="Information"></ui-input>
          <ui-input id="ppOffset" label="Offset (px)" type="number" value="12"></ui-input>
          <ui-input id="ppShowDelay" label="Show Delay (ms)" type="number" value="0"></ui-input>
          <ui-input id="ppHideDelay" label="Hide Delay (ms)" type="number" value="200"></ui-input>
          <ui-input id="ppMaxHeight" label="Max Height" value="none"></ui-input>

          <ui-input id="ppContent" label="Content (HTML)" multiline="true" rows="4" value="&lt;p&gt;Edit me to change the &lt;strong&gt;content&lt;/strong&gt;!&lt;/p&gt;"></ui-input>

          <div style="background:white;padding:12px;border-radius:8px;border:1px solid #e5e7eb;display:grid;grid-template-columns:1fr 1fr;gap:8px;">
            <ui-checkbox id="ppShowArrow" label="Show Arrow" checked></ui-checkbox>
            <ui-checkbox id="ppShowClose" label="Show Close Button"></ui-checkbox>
            <ui-checkbox id="ppBackdrop" label="Backdrop"></ui-checkbox>
            <ui-checkbox id="ppInteractive" label="Interactive (hover)" checked></ui-checkbox>
            <ui-checkbox id="ppCloseOnScroll" label="Close on Scroll"></ui-checkbox>
            <ui-checkbox id="ppCloseOnEsc" label="Close on Esc" checked></ui-checkbox>
            <ui-checkbox id="ppDisabled" label="Disabled"></ui-checkbox>
            <ui-checkbox id="ppLoading" label="Loading State"></ui-checkbox>
            <ui-checkbox id="ppSkeleton" label="Skeleton State"></ui-checkbox>
          </div>

          <!-- Manual trigger controls -->
          <div id="manualControls" style="display:none;gap:8px;">
            <ui-button label="Show" variant="filled" color="primary" onclick="document.getElementById('pgPopover')?.show()" style="flex:1;"></ui-button>
            <ui-button label="Hide" variant="filled" color="secondary" onclick="document.getElementById('pgPopover')?.hide()" style="flex:1;"></ui-button>
            <ui-button label="Toggle" variant="outline" color="primary" onclick="document.getElementById('pgPopover')?.toggle()" style="flex:1;"></ui-button>
          </div>
        </div>

        <!-- Preview panel -->
        <div style="display:flex;flex-direction:column;gap:16px;">
          <div style="background:#f8fafc;border-radius:10px;border:2px solid #e5e7eb;padding:40px;display:flex;justify-content:center;align-items:center;min-height:280px;position:relative;" id="pgPreview"></div>

          <div id="pgEventLog" style="background:#0f172a;border-radius:10px;padding:14px 18px;font-family:monospace;font-size:12px;color:#94a3b8;min-height:60px;">
            <div style="color:#475569;font-size:10px;text-transform:uppercase;letter-spacing:.1em;margin-bottom:6px;">Event Log</div>
            <div id="pgEventContent">Waiting for events…</div>
          </div>

          <!-- Code block -->
          <div style="background:#0f172a;border-radius:10px;padding:16px;position:relative;">
            <div style="color:#475569;font-size:10px;text-transform:uppercase;letter-spacing:.1em;margin-bottom:8px;">Usage</div>
            <ui-button label="Copy" onclick="copyPopoverCode()" id="copyPopoverBtn" style="position:absolute;top:8px;right:8px;" variant="outline" color="secondary" size="xs"></ui-button>
            <code id="popoverCodeBlock" style="color:#e2e8f0;font-size:12px;display:block;overflow-x:auto;white-space:pre-wrap;line-height:1.7;padding-right:50px;"></code>
          </div>
        </div>
      </div>
    </div>
  `;

  setTimeout(() => {
    const inputs = ['ppWidth', 'ppHeading', 'ppOffset', 'ppShowDelay', 'ppHideDelay', 'ppMaxHeight', 'ppContent'];
    const dropdowns = ['ppTrigger', 'ppPlacement', 'ppVariant', 'ppAnimation', 'ppRole'];
    const checkboxes = ['ppShowArrow', 'ppShowClose', 'ppBackdrop', 'ppInteractive', 'ppCloseOnScroll', 'ppCloseOnEsc', 'ppDisabled', 'ppLoading', 'ppSkeleton'];

    inputs.forEach(id => document.getElementById(id)?.addEventListener('inputChange', () => updateInteractivePopover()));
    dropdowns.forEach(id => document.getElementById(id)?.addEventListener('dropdownChange', () => updateInteractivePopover()));
    checkboxes.forEach(id => document.getElementById(id)?.addEventListener('checkboxChange', () => updateInteractivePopover()));

    updateInteractivePopover();
  }, 100);
}

function updateInteractivePopover() {
  const g = id => document.getElementById(id);
  const gv = id => g(id)?.value ?? '';
  const gc = id => g(id)?.checked ?? false;

  const trigger = gv('ppTrigger') || 'click';
  const placement = gv('ppPlacement') || 'top';
  const variant = gv('ppVariant') || 'light';
  const animation = gv('ppAnimation') || 'scale';
  const role = gv('ppRole') || 'dialog';
  const width = gv('ppWidth') || '280px';
  const heading = gv('ppHeading');
  const offset = gv('ppOffset') || '12';
  const showDelay = gv('ppShowDelay') || '0';
  const hideDelay = gv('ppHideDelay') || '200';
  const maxHeight = gv('ppMaxHeight') || 'none';
  const rawContent = gv('ppContent') || '<p>Content</p>';

  const showArrow = gc('ppShowArrow');
  const showClose = gc('ppShowClose');
  const backdrop = gc('ppBackdrop');
  const interactive = gc('ppInteractive');
  const closeOnScroll = gc('ppCloseOnScroll');
  const closeOnEsc = gc('ppCloseOnEsc');
  const disabled = gc('ppDisabled');
  const loading = gc('ppLoading');
  const skeleton = gc('ppSkeleton');

  // Show/hide manual controls
  const manualCtls = g('manualControls');
  if (manualCtls) manualCtls.style.display = trigger === 'manual' ? 'flex' : 'none';

  const preview = g('pgPreview');
  if (!preview) return;

  const triggerLabel = { click: 'Click Me', hover: 'Hover Me', focus: 'Focus Me', manual: 'Target Element' }[trigger] || 'Open';
  const triggerEl =
    trigger === 'manual'
      ? `<div style="padding:14px 20px;background:#ede9fe;border:2px dashed #a78bfa;border-radius:8px;color:#6d28d9;font-size:13px;cursor:default;">Target Element (use controls above)</div>`
      : `<ui-button >${triggerLabel}</ui-button>`;

  const escaped = rawContent.replace(/'/g, '&#39;').replace(/"/g, '&quot;');

  preview.innerHTML = `
    <ui-popover id="pgPopover"
      trigger="${trigger}"
      placement="${placement}"
      variant="${variant}"
      animation="${animation}"
      popover-role="${role}"
      width="${width}"
      ${heading ? `heading="${heading}"` : ''}
      offset="${offset}"
      show-delay="${showDelay}"
      hide-delay="${hideDelay}"
      max-height="${maxHeight}"
      show-arrow="${showArrow}"
      show-close-button="${showClose}"
      backdrop="${backdrop}"
      interactive="${interactive}"
      close-on-scroll="${closeOnScroll}"
      close-on-esc="${closeOnEsc}"
      disabled="${disabled}"
      loading="${loading}"
      skeleton="${skeleton}"
    >
      <div slot="trigger">${triggerEl}</div>
      <div slot="content">${rawContent}</div>
    </ui-popover>
  `;

  // Events
  setTimeout(() => {
    const pop = g('pgPopover');
    const log = g('pgEventContent');
    if (pop && log) {
      const logEvt = (name, color = '#10b981') => {
        log.innerHTML = `<span style="color:${color}">[${new Date().toLocaleTimeString()}] ${name}</span>`;
      };
      const p = document.getElementById('cancelShowPop');
      if (p) {
        p.addEventListener('uiBeforeOpen', e => {
          logEvt('uiBeforeOpen - cancelled!', '#ef4444');
          e.preventDefault(); // Prevents it from showing
        });
      }
      pop.addEventListener('uiBeforeOpen', () => logEvt('uiBeforeOpen', '#60a5fa'));
      pop.addEventListener('uiOpen', () => logEvt('uiOpen', '#10b981'));
      pop.addEventListener('uiBeforeClose', () => logEvt('uiBeforeClose', '#fbbf24'));
      pop.addEventListener('uiClose', () => logEvt('uiClose', '#f87171'));
    }
  }, 100);

  // Code gen
  const codeBlock = g('popoverCodeBlock');
  if (codeBlock) {
    const attrs = [
      trigger !== 'click' ? `trigger="${trigger}"` : '',
      placement !== 'top' ? `placement="${placement}"` : '',
      variant !== 'light' ? `variant="${variant}"` : '',
      animation !== 'scale' ? `animation="${animation}"` : '',
      role !== 'dialog' ? `popover-role="${role}"` : '',
      width !== '280px' ? `width="${width}"` : '',
      heading ? `heading="${heading.replace(/"/g, "'")}"` : '',
      offset !== '12' ? `offset="${offset}"` : '',
      parseInt(showDelay) > 0 ? `show-delay="${showDelay}"` : '',
      parseInt(hideDelay) !== 200 ? `hide-delay="${hideDelay}"` : '',
      maxHeight !== 'none' ? `max-height="${maxHeight}"` : '',
      !showArrow ? `show-arrow="false"` : '',
      showClose ? `show-close-button="true"` : '',
      backdrop ? `backdrop="true"` : '',
      !interactive ? `interactive="false"` : '',
      closeOnScroll ? `close-on-scroll="true"` : '',
      !closeOnEsc ? `close-on-esc="false"` : '',
      disabled ? `disabled="true"` : '',
      loading ? `loading="true"` : '',
      skeleton ? `skeleton="true"` : '',
    ]
      .filter(Boolean)
      .map(a => `  ${a}`)
      .join('\n');

    codeBlock.textContent = `<ui-popover\n${attrs}\n>\n  <!-- trigger slot -->\n  <ui-button slot="trigger">Open</ui-button>\n\n  <!-- content slot -->\n  <div slot="content">${rawContent.substring(0, 60)}${rawContent.length > 60 ? '…' : ''}</div>\n</ui-popover>`;
  }
}

window.copyPopoverCode = () => {
  const code = document.getElementById('popoverCodeBlock').textContent;
  const btn = document.getElementById('copyPopoverBtn');
  navigator.clipboard.writeText(code).then(() => {
    btn.textContent = 'Copied!';
    btn.style.background = '#10b981';
    setTimeout(() => {
      btn.textContent = 'Copy';
      btn.style.background = 'rgba(255,255,255,0.07)';
    }, 2000);
  });
};
