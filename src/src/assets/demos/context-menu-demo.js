// Component Demo Functions
import {
  basicMenuItems,
  nestedMenuItems,
  iconMenuItems,
  fourLevelMenuItems,
  editorMenuItems,
  fileMenuItems,
  actionMenuItems,
  homeContextMenuItems,
  interactiveDefaultItems,
  disabledItemsMenu,
} from './context-menu-data.js';

export function initContextMenuDemo() {
  const section = document.getElementById('context-menu');
  if (!section) return;

  section.innerHTML = `
    
    <p>Right-click context menus with customizable actions.</p>

    <div class="demo-controls" style="margin: 20px 0; display: flex; gap: 8px; flex-wrap: wrap;">
      <ui-button id="btnBasicMenu" label="Basic" size="md"riant="outline"></ui-button>
      <ui-button id="btnIconMenu" label="With Icons" size="md"riant="outline"></ui-button>
      <ui-button id="btnDisabledItems" label="Disabled Items" size="md"riant="outline"></ui-button>
      <ui-button id="btnFourLevelMenu" label="4-Level Submenu" size="md"riant="outline"></ui-button>
      <ui-button id="btnPremiumMenu" label="✨ Premium Features" size="md"riant="outline"></ui-button>
      <ui-button id="btnSlotVirtualMenu" label="Slot + Virtual Menu" size="md"riant="outline"></ui-button>
      <ui-button id="btnInteractiveMenu" label="🎮 Interactive Playground" size="md"riant="outline"></ui-button>
      <ui-button id="btnValidationMenu" label="Validation" size="md"riant="outline"></ui-button>
    </div>

    <div id="contextMenuDemoContainer" style="margin-top: 20px;"></div>
  `;

  setTimeout(() => {
    const btnMap = {
      btnBasicMenu: window.showBasicContextMenu,
      btnIconMenu: window.showIconContextMenu,
      btnDisabledItems: window.showDisabledItems,
      btnFourLevelMenu: window.showFourLevelContextMenu,
      btnPremiumMenu: window.showPremiumContextMenu,
      btnSlotVirtualMenu: window.showSlotVirtualContextMenu,
      btnInteractiveMenu: window.showInteractiveContextMenu,
      btnValidationMenu: window.showMissingFeaturesValidation,
    };

    Object.entries(btnMap).forEach(([id, func]) => {
      document.getElementById(id)?.addEventListener('click', () => func());
    });

    // Context Menu Demo Functions
    window.showBasicContextMenu = function () {
      const container = document.getElementById('contextMenuDemoContainer');
      if (!container) return;
      container.innerHTML = `
      <div style="max-width: 600px; margin: 0 auto;">
        <h4>Basic Context Menu</h4>
        <p style="color: #6b7280; font-size: 13px;">Right-click on the area below</p>
        <div id="basicTarget" style="min-height: 200px; border: 2px dashed #cbd5e1; border-radius: 8px; display: flex; align-items: center; justify-content: center; background: #f9fafb; cursor: context-menu; margin: 20px 0;">
          <div style="text-align: center;">
            <div style="margin-bottom: 10px;">
              <ui-icon name="mouse-pointer-2" library="lucide" size="48px" style="color: #64748b;"></ui-icon>
            </div>
            <div style="color: #6b7280; font-size: 14px;">Right-click here to open menu</div>
          </div>
        </div>
        <div id="menuLog" style="margin-top: 20px; padding: 12px; background: #f0f9ff; border-radius: 6px; font-size: 13px;">
          <strong>Event Log:</strong>
          <div style="margin-top: 8px; color: #6b7280;">Right-click to trigger menu...</div>
        </div>
      </div>
      <ui-context-menu id="basicMenu" icon-library="lucide"></ui-context-menu>
    `;
      setTimeout(() => {
        const menu = document.getElementById('basicMenu');
        console.log('Basic menu element:', menu);
        if (menu) {
          function logAction(action) {
            const log = document.querySelector('#menuLog div');
            if (log) {
              log.innerHTML = `<div style="color: #1e40af;"><strong>${action}</strong> clicked at ${new Date().toLocaleTimeString()}</div>`;
            }
          }
          // Add event listener for menu item clicks
          menu.addEventListener('menuItemClick', e => {
            console.log('Menu item clicked:', e.detail);
            if (e.detail && e.detail.label) {
              logAction(e.detail.label);
            }
          });
          menu.setAttribute('items', JSON.stringify(basicMenuItems));
          menu.setAttribute('target', '#basicTarget');
          // Force re-attach if target is replaced
          setTimeout(() => {
            menu.setAttribute('target', '#basicTarget');
          }, 0);
          console.log('Menu items set:', menu.getAttribute('items'));
        }
      }, 100);
    };

    window.showNestedContextMenu = function () {
      const container = document.getElementById('contextMenuDemoContainer');
      if (!container) return;
      container.innerHTML = `
      <div style="max-width: 600px; margin: 0 auto;">
        <h4>Nested Submenus</h4>
        <p style="color: #6b7280; font-size: 13px;">Multi-level cascading menu</p>
        <div id="nestedTarget" style="min-height: 200px; border: 2px dashed #cbd5e1; border-radius: 8px; display: flex; align-items: center; justify-content: center; background: #f9fafb; cursor: context-menu; margin: 20px 0;">
          <div style="text-align: center;">
            <div style="margin-bottom: 10px;">
              <ui-icon name="folder" library="lucide" size="48px" style="color: #64748b;"></ui-icon>
            </div>
            <div style="color: #6b7280; font-size: 14px;">Right-click for file operations</div>
          </div>
        </div>
      </div>
      <ui-context-menu id="nestedMenu" icon-library="lucide"></ui-context-menu>
    `;
      setTimeout(() => {
        const menu = document.getElementById('nestedMenu');
        if (menu) {
          menu.addEventListener('menuItemClick', e => {
            console.log('Nested menu clicked:', e.detail);
          });
          menu.items = JSON.stringify(nestedMenuItems);
          menu.setAttribute('target', '#nestedTarget');
          setTimeout(() => {
            menu.setAttribute('target', '#nestedTarget');
          }, 0);
        }
      }, 100);
    };

    window.showIconContextMenu = function () {
      const container = document.getElementById('contextMenuDemoContainer');
      if (!container) return;
      container.innerHTML = `
      <div style="max-width: 600px; margin: 0 auto;">
        <h4>Context Menu with Rich Icons</h4>
        <p style="color: #6b7280; font-size: 13px;">Emoji icons with visual hierarchy</p>
        <div id="iconTarget" style="min-height: 200px; border: 2px dashed #cbd5e1; border-radius: 8px; display: flex; align-items: center; justify-content: center; background: #f9fafb; cursor: context-menu; margin: 20px 0;">
          <div style="text-align: center;">
            <div style="margin-bottom: 10px;">
              <ui-icon name="palette" library="lucide" size="48px" style="color: #64748b;"></ui-icon>
            </div>
            <div style="color: #6b7280; font-size: 14px;">Right-click for formatting options</div>
          </div>
        </div>
      </div>
      <ui-context-menu id="iconMenu" icon-library="lucide"></ui-context-menu>
    `;
      setTimeout(() => {
        const menu = document.getElementById('iconMenu');
        if (menu) {
          menu.addEventListener('menuItemClick', e => {
            console.log('Icon menu clicked:', e.detail);
          });
          menu.items = JSON.stringify(iconMenuItems);
          menu.setAttribute('target', '#iconTarget');
          setTimeout(() => {
            menu.setAttribute('target', '#iconTarget');
          }, 0);
        }
      }, 100);
    };

    window.showFourLevelContextMenu = function () {
      const container = document.getElementById('contextMenuDemoContainer');
      if (!container) return;
      container.innerHTML = `
      <div style="max-width: 700px; margin: 0 auto;">
        <h4>4-Level Submenu Example</h4>
        <p style="color: #6b7280; font-size: 13px;">Demonstrates a deep submenu structure with 4 levels</p>
        <div id="fourLevelTarget" style="min-height: 220px; border: 2px dashed #cbd5e1; border-radius: 8px; display: flex; align-items: center; justify-content: center; background: #f9fafb; cursor: context-menu; margin: 20px 0;">
          <div style="text-align: center;">
            <div style="margin-bottom: 10px;">
              <ui-icon name="compass" library="lucide" size="48px" style="color: #64748b;"></ui-icon>
            </div>
            <div style="color: #6b7280; font-size: 14px;">Right-click to explore submenus</div>
          </div>
        </div>
      </div>
      <ui-context-menu id="fourLevelMenu" icon-library="lucide"></ui-context-menu>
    `;
      setTimeout(() => {
        const menu = document.getElementById('fourLevelMenu');
        if (menu) {
          menu.addEventListener('menuItemClick', e => {
            console.log('4-Level menu clicked:', e.detail);
          });
          // 4-level nested structure
          menu.items = JSON.stringify(fourLevelMenuItems);
          menu.setAttribute('target', '#fourLevelTarget');
          setTimeout(() => {
            menu.setAttribute('target', '#fourLevelTarget');
          }, 0);
        }
      }, 100);
    };

    window.showEditorContextMenu = function () {
      const container = document.getElementById('contextMenuDemoContainer');
      if (!container) return;
      container.innerHTML = `
      <div style="max-width: 700px; margin: 0 auto;">
        <h4>Rich Text Editor Menu</h4>
        <p style="color: #6b7280; font-size: 13px;">Complete editor context menu with nested options</p>
        <div id="editorTarget" style="min-height: 250px; border: 2px solid #cbd5e1; border-radius: 8px; padding: 20px; background: white; cursor: text; margin: 20px 0; font-family: monospace; font-size: 14px;">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. 
          <br><br>
          <strong>Right-click anywhere</strong> in this text area to access formatting and editing options.
        </div>
      </div>
      <ui-context-menu id="editorMenu" icon-library="lucide"></ui-context-menu>
    `;
      setTimeout(() => {
        const menu = document.getElementById('editorMenu');
        if (menu) {
          menu.addEventListener('menuItemClick', e => {
            console.log('Editor menu clicked:', e.detail);
          });
          menu.items = JSON.stringify(editorMenuItems);
          menu.setAttribute('target', '#editorTarget');
          setTimeout(() => {
            menu.setAttribute('target', '#editorTarget');
          }, 0);
        }
      }, 100);
    };

    window.showFileContextMenu = function () {
      const container = document.getElementById('contextMenuDemoContainer');
      if (!container) return;
      container.innerHTML = `
      <div style="max-width: 600px; margin: 0 auto;">
        <h4>File Explorer Context Menu</h4>
        <p style="color: #6b7280; font-size: 13px;">File system operations with nested actions</p>
        <div id="fileTarget" style="min-height: 200px; border: 2px dashed #cbd5e1; border-radius: 8px; display: flex; align-items: center; justify-content: center; background: #f9fafb; cursor: context-menu; margin: 20px 0;">
          <div style="text-align: center;">
            <div style="margin-bottom: 10px;">
              <ui-icon name="folder-open" library="lucide" size="48px" style="color: #64748b;"></ui-icon>
            </div>
            <div style="color: #6b7280; font-size: 14px; font-weight: 600;">Project Files</div>
            <div style="color: #9ca3af; font-size: 12px; margin-top: 4px;">Right-click for file operations</div>
          </div>
        </div>
      </div>
      <ui-context-menu id="fileMenu" icon-library="lucide"></ui-context-menu>
    `;
      setTimeout(() => {
        const menu = document.getElementById('fileMenu');
        if (menu) {
          menu.addEventListener('menuItemClick', e => {
            console.log('File menu clicked:', e.detail);
          });
          menu.items = JSON.stringify(fileMenuItems);
          menu.setAttribute('target', '#fileTarget');
          setTimeout(() => {
            menu.setAttribute('target', '#fileTarget');
          }, 0);
        }
      }, 100);
    };

    window.showContextMenuActions = function () {
      const container = document.getElementById('contextMenuDemoContainer');
      if (!container) return;
      container.innerHTML = `
      <div style="max-width: 600px; margin: 0 auto;">
        <h4>Context Menu with Actions</h4>
        <p style="color: #6b7280; font-size: 13px;">Interactive menu with live action feedback</p>
        <div id="actionTarget" style="min-height: 150px; border: 2px dashed #cbd5e1; border-radius: 8px; display: flex; align-items: center; justify-content: center; background: #f9fafb; cursor: context-menu; margin: 20px 0;">
          <div style="text-align: center;">
            <div style="margin-bottom: 10px;">
              <ui-icon name="zap" library="lucide" size="48px" style="color: #64748b;"></ui-icon>
            </div>
            <div style="color: #6b7280; font-size: 14px;">Right-click to execute actions</div>
          </div>
        </div>
        <div id="actionLog" style="margin-top: 20px; padding: 16px; background: #f0f9ff; border-radius: 8px; border: 1px solid #bae6fd;">
          <h5 style="margin: 0 0 12px 0; color: #1e3a8a; font-size: 14px;">Action Log:</h5>
          <div id="actionLogContent" style="font-size: 13px; color: #6b7280; min-height: 60px; font-family: monospace;">
            No actions performed yet...
          </div>
          <ui-button id="btnClearActionLog" variant="outline" color="success" label="Clear Log" size="md"yle="margin-top: 12px;"></ui-button>
        </div>
      </div>
      <ui-context-menu id="actionMenu" icon-library="lucide"></ui-context-menu>
    `;

      window.clearActionLog = function () {
        const log = document.getElementById('actionLogContent');
        if (log) log.innerHTML = 'No actions performed yet...';
      };

      setTimeout(() => {
        document.getElementById('btnClearActionLog')?.addEventListener('click', () => window.clearActionLog());

        const menu = document.getElementById('actionMenu');
        const logContent = document.getElementById('actionLogContent');
        function addLog(message, type = 'info') {
          if (!logContent) return;
          const time = new Date().toLocaleTimeString();
          const colors = {
            info: '#1e40af',
            success: '#059669',
            warning: '#d97706',
            error: '#dc2626',
          };
          const color = colors[type] || colors.info;
          if (logContent.textContent === 'No actions performed yet...') {
            logContent.innerHTML = '';
          }
          const entry = document.createElement('div');
          entry.style.cssText = `margin-bottom: 6px; color: ${color};`;
          entry.innerHTML = `<strong>[${time}]</strong> ${message}`;
          logContent.insertBefore(entry, logContent.firstChild);
          if (logContent.children.length > 10) {
            logContent.removeChild(logContent.lastChild);
          }
        }
        if (menu) {
          menu.addEventListener('menuItemClick', e => {
            if (e.detail && e.detail.label) {
              addLog(`${e.detail.label} action executed`, 'success');
            }
          });
          menu.items = JSON.stringify(actionMenuItems);
          menu.setAttribute('target', '#actionTarget');
          setTimeout(() => {
            menu.setAttribute('target', '#actionTarget');
          }, 0);
        }
      }, 100);
    };

    window.showDisabledItems = function () {
      const container = document.getElementById('contextMenuDemoContainer');
      if (!container) return;
      container.innerHTML = `
      <div style="max-width: 600px; margin: 0 auto;">
        <h4>Context Menu with Disabled Items</h4>
        <p style="color: #6b7280; font-size: 13px;">Some menu items are disabled and cannot be clicked</p>
        <div id="disabledTarget" style="min-height: 150px; border: 2px dashed #cbd5e1; border-radius: 8px; display: flex; align-items: center; justify-content: center; background: #f9fafb; cursor: context-menu; margin: 20px 0;">
          <div style="text-align: center;">
           <div style="margin-bottom: 10px;">
              <ui-icon name="ban" library="lucide" size="48px" style="color: #64748b;"></ui-icon>
            </div>
            <div style="color: #6b7280; font-size: 14px;">Right-click to see disabled items</div>
          </div>
        </div>
      </div>
      <ui-context-menu id="disabledMenu" icon-library="lucide"></ui-context-menu>
    `;
      setTimeout(() => {
        const menu = document.getElementById('disabledMenu');
        if (menu) {
          menu.addEventListener('menuItemClick', e => {
            console.log('Disabled menu clicked:', e.detail);
          });
          menu.items = JSON.stringify(disabledItemsMenu);
          menu.setAttribute('target', '#disabledTarget');
          setTimeout(() => {
            menu.setAttribute('target', '#disabledTarget');
          }, 0);
        }
      }, 100);
    };

    // Initialize home context menu
    window.initHomeContextMenu = function () {
      const menu = document.getElementById('homeContextMenu');
      if (!menu) return;

      setTimeout(() => {
        menu.items = JSON.stringify(homeContextMenuItems);
        setTimeout(() => {
          menu.setAttribute('target', '#homeContextMenuTarget');
        }, 0);
      }, 200);
    };

    window.showPremiumContextMenu = function () {
      const container = document.getElementById('contextMenuDemoContainer');
      if (!container) return;

      const premiumItems = [
        { type: 'header', label: 'View Options' },
        { label: 'Show Sidebar', type: 'checkbox', checked: true, description: 'Toggle left navigation panel' },
        { label: 'Show Activity Bar', type: 'checkbox', checked: false, description: 'Display activity indicators' },
        { type: 'separator' },
        { type: 'header', label: 'Account Actions' },
        { label: 'Profile Settings', icon: 'user', description: 'Manage your personal info' },
        {
          label: 'Billing',
          icon: 'credit-card',
          children: [{ label: 'Invoices' }, { label: 'Payment Methods' }],
        },
        { type: 'separator' },
        { label: 'Log Out', icon: 'log-out', description: 'End your current session' },
        { label: 'Delete Account', icon: 'trash-2', variant: 'danger', description: 'Permanently remove your data' },
      ];

      container.innerHTML = `
      <div style="max-width: 600px; margin: 0 auto;">
        <h4>Premium Context Menu Features</h4>
        <p style="color: #6b7280; font-size: 13px;">Headers, Descriptions, Checkboxes & Danger Actions</p>
        <div id="premiumTarget" style="min-height: 250px; border: 2px dashed #f43f5e; border-radius: 8px; display: flex; align-items: center; justify-content: center; background: #fff1f2; cursor: context-menu; margin: 20px 0;">
          <div style="text-align: center;">
            <div style="margin-bottom: 10px;">
              <ui-icon name="sparkles" library="lucide" size="48px" style="color: #be123c;"></ui-icon>
            </div>
            <div style="color: #be123c; font-size: 14px; font-weight: 600;">Right-click for Premium Experience</div>
            <div style="color: #fb7185; font-size: 12px; margin-top: 4px;">Experience the new menu types</div>
          </div>
        </div>
      </div>
      <ui-context-menu id="premiumMenu" icon-library="lucide"></ui-context-menu>
    `;
      setTimeout(() => {
        const menu = document.getElementById('premiumMenu');
        if (menu) {
          menu.addEventListener('menuItemClick', e => {
            console.log('Premium menu clicked:', e.detail);
          });
          menu.items = JSON.stringify(premiumItems);
          menu.setAttribute('target', '#premiumTarget');
          // Force re-attach
          setTimeout(() => {
            menu.setAttribute('target', '#premiumTarget');
          }, 0);
        }
      }, 100);
    };

    window.showSlotVirtualContextMenu = function () {
      const container = document.getElementById('contextMenuDemoContainer');
      if (!container) return;

      container.innerHTML = `
    <div class="demo-block" style="margin: 0 auto; max-width: 900px; display:flex; gap:24px; flex-wrap:wrap; align-items:flex-start;">
      <div style="flex:1; min-width:280px;">
        <h4 style="margin-top:0;">Slot + Virtual Menu</h4>
        <p style="color:#6b7280; font-size:13px;">Custom item templates, lazy loading, virtualization, and beforeClose hooks combine for high-velocity actions.</p>
        <div id="slotVirtualLog" style="margin-top:12px; padding:12px; border-radius:8px; background:#f4f5ff; border:1px solid #c7d2fe; font-family:monospace; font-size:12px; height:180px; overflow-y:auto;">
          <div style="color:#4338ca;">Log ready...</div>
        </div>
      </div>
      <div style="flex:1; min-width:260px;">
        <div id="slotVirtualTarget" style="min-height:220px; border:2px dashed #cbd5e1; border-radius:12px; background:#fff; display:flex; align-items:center; justify-content:center; font-size:14px; color:#475569; cursor:context-menu; box-shadow:0 4px 20px rgba(15,23,42,0.08);">
          Right-click or long-press here
        </div>
      </div>
    </div>
    <ui-context-menu id="slotVirtualMenu" icon-library="lucide" close-on-select="false" visible-count="5" item-height="44">
      <template slot="item" let-item let-index let-level let-active>
        <div class="slot-template" part="slot-item">
          <div>
            <span class="slot-index">{index + 1}</span>
            <strong class="slot-label">{item.label}</strong>
          </div>
          <small class="slot-description">{item.description || 'Quick action'}</small>
          <div class="slot-meta">
            Level {level + 1}
            <span class="slot-state">{item.checked ? ' · Selected' : ''}</span>
          </div>
          <ui-icon name="sparkles" library="ionicons" size="16px"></ui-icon>
        </div>
      </template>
    </ui-context-menu>
    <style>
      .slot-template {
        display:flex;
        flex-direction:column;
        gap:2px;
        padding:6px 12px;
        border-radius:8px;
        background:#f8fafc;
        border:1px solid transparent;
      }
      .slot-template:hover {
        border-color:#a5b4fc;
        background:#eef2ff;
      }
      .slot-label {
        font-size:14px;
        color:#111827;
      }
      .slot-description {
        color:#475569;
        font-size:11px;
      }
      .slot-meta {
        color:#2563eb;
        font-size:11px;
        display:flex;
        justify-content:space-between;
        align-items:center;
      }
      .slot-index {
        font-size:10px;
        color:#8b5cf6;
        margin-right:6px;
      }
      .slot-state {
        font-style:italic;
        color:#10b981;
      }
    </style>
  `;

      const logArea = document.getElementById('slotVirtualLog');
      const appendLog = message => {
        if (!logArea) return;
        const entry = document.createElement('div');
        entry.style.marginBottom = '6px';
        entry.style.color = '#312e81';
        entry.textContent = `${new Date().toLocaleTimeString()} — ${message}`;
        logArea.prepend(entry);
        if (logArea.childElementCount > 10) {
          logArea.removeChild(logArea.lastElementChild);
        }
      };

      const menu = document.getElementById('slotVirtualMenu');
      if (!menu) return;
      menu.setAttribute('target', '#slotVirtualTarget');
      menu.visibleCount = 5;
      menu.itemHeight = 44;

      const totalActions = 40;
      menu.loadItems = async (offset, limit) => {
        appendLog(`Loading actions ${offset + 1}-${Math.min(totalActions, offset + limit)}`);
        return new Promise(resolve => {
          setTimeout(() => {
            const chunk = Math.max(0, Math.min(totalActions - offset, limit));
            if (chunk <= 0) {
              resolve([]);
              return;
            }
            const items = Array.from({ length: chunk }, (_, idx) => ({
              label: `Action ${offset + idx + 1}`,
              description: `Lazy-loaded task ${offset + idx + 1}`,
              icon: idx % 3 ? 'sparkles' : 'zap',
              checked: idx % 5 === 0,
            }));
            resolve(items);
          }, 420);
        });
      };

      menu.beforeClose = () =>
        new Promise(resolve => {
          appendLog('Saving preferences before closing…');
          setTimeout(() => {
            appendLog('Preferences saved, closing menu.');
            resolve(true);
          }, 700);
        });

      menu.beforeOpen = () => {
        appendLog('Preparing virtual menu…');
        return true;
      };

      menu.addEventListener('menuItemClick', event => {
        appendLog(`Action selected: ${event.detail.item?.label}`);
      });

      let lastScrollIndex = 0;
      const attachScrollListener = () => {
        const scrollEl = menu.shadowRoot?.querySelector('.ctx-virtual-scroll');
        if (!scrollEl) return;
        scrollEl.addEventListener('scroll', () => {
          const index = Math.floor(scrollEl.scrollTop / Number(menu.itemHeight || 44));
          if (index !== lastScrollIndex) {
            lastScrollIndex = index;
            appendLog(`Virtual window offset: ${index + 1}`);
          }
        });
      };

      setTimeout(attachScrollListener, 50);
      menu.addEventListener('menuToggle', event => {
        if (event.detail) {
          setTimeout(attachScrollListener, 100);
        }
      });
    };

    showBasicContextMenu();
  }, 100);
}

// Interactive Playground Functions
window.showInteractiveContextMenu = function () {
  const container = document.getElementById('contextMenuDemoContainer');
  if (!container) return;

  container.innerHTML = `
    <div style="background-color: white; border-radius: 8px; padding: 20px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);">
      <div style="display: flex; gap: 30px; flex-wrap: wrap;">
        <div style="flex: 1; min-width: 250px;">
          <h3 style="margin-top: 0;">🎮 Interactive Playground</h3>
          <div style="display: flex; flex-direction: column; gap: 15px; margin-top: 20px;">
            <div>
              <label style="display: block; margin-bottom: 5px; font-weight: 500;">Menu Items (JSON):</label>
              <ui-input id="contextMenuItems" multiline="true" rows="15" 
                style="font-family: monospace; font-size: 12px;"></ui-input>
            </div>
            <div style="display:flex; gap:8px; flex-wrap:wrap;">
              <ui-button id="addNewButton" variant="outline" color="success" label="➕ Add 'New' Button" size="md"ui-button>
              <ui-button id="resetItems" variant="outline" color="secondary" label="Reset" size="md"ui-button>
            </div>
            
            <div style="padding: 10px; background: #f0f9ff; border-radius: 4px; font-size: 12px;">
              <strong>💡 Tip:</strong> Right-click the preview area to open the menu
            </div>
          </div>
        </div>
        
        <div style="flex: 1; min-width: 300px; background-color: #f9fafb; padding: 20px; border-radius: 8px; border: 1px solid #e5e7eb;">
          <h4 style="margin-top: 0;">Preview:</h4>
          <div id="interactiveContextMenuTarget" style="margin-top: 20px; min-height: 300px; border: 2px dashed #cbd5e1; border-radius: 8px; display: flex; align-items: center; justify-content: center; background: white; cursor: context-menu;">
            <div style="text-align: center;">
              <div style="margin-bottom: 10px;">
                <ui-icon name="mouse-pointer-2" library="lucide" size="48px" style="color: #64748b;"></ui-icon>
              </div>
              <div style="color: #6b7280; font-size: 14px;">Right-click here</div>
            </div>
          </div>
          <div id="contextMenuOutput" style="margin-top: 20px; padding: 10px; background-color: white; border-radius: 4px; font-family: monospace; font-size: 12px; display: none;"></div>
          
          <div style="margin-top: 20px; background: #1e293b; padding: 16px; border-radius: 8px; position: relative;">
            <ui-button id="copyContextMenuBtn" variant="outline" color="secondary" label="Copy" size="md"yle="position: absolute; top: 10px; right: 10px;"></ui-button>
            <code id="contextMenuCodeBlock" style="color: #e2e8f0; font-family: monospace; font-size: 13px; display: block; overflow-x: auto; padding-right: 50px; white-space: pre-wrap;">
              &lt;ui-context-menu ... icon-library="lucide"&gt;&lt;/ui-context-menu&gt;
            </code>
          </div>
        </div>
      </div>
    </div>
    <ui-context-menu id="interactiveContextMenuComponent" icon-library="lucide"></ui-context-menu>
  `;

  // Set initial textarea value
  const textarea = document.getElementById('contextMenuItems');
  if (textarea) {
    textarea.value = JSON.stringify(interactiveDefaultItems, null, 2);
  }

  updateInteractiveContextMenu();

  setTimeout(() => {
    document.getElementById('copyContextMenuBtn')?.addEventListener('click', () => window.copyContextMenuCode());
    document.getElementById('addNewButton')?.addEventListener('click', () => {
      try {
        const data = JSON.parse(textarea.value);
        const hasNew = Array.isArray(data) && data.some(it => it && it.id === 'new');
        if (!hasNew) {
          data.unshift({
            id: 'new',
            label: 'New',
            icon: 'plus',
            children: [
              { id: 'new-file', label: 'File', icon: 'file' },
              { id: 'new-folder', label: 'Folder', icon: 'folder' },
            ],
          });
          textarea.value = JSON.stringify(data, null, 2);
          window.updateInteractiveContextMenu();
        }
      } catch {}
    });
    document.getElementById('resetItems')?.addEventListener('click', () => {
      textarea.value = JSON.stringify(interactiveDefaultItems, null, 2);
      window.updateInteractiveContextMenu();
    });
    textarea?.addEventListener('inputChange', () => window.updateInteractiveContextMenu());
  }, 100);
};

window.updateInteractiveContextMenu = function () {
  const itemsText = document.getElementById('contextMenuItems').value;
  const menu = document.getElementById('interactiveContextMenuComponent');
  const outputDiv = document.getElementById('contextMenuOutput');

  if (!menu) return;

  try {
    const items = JSON.parse(itemsText);
    menu.items = JSON.stringify(items);
    menu.setAttribute('target', '#interactiveContextMenuTarget');

    // Update Code Block
    const codeBlock = document.getElementById('contextMenuCodeBlock');
    if (codeBlock) {
      codeBlock.innerText = `<ui-context-menu target="#target-element" icon-library="lucide"></ui-context-menu>\n<script>\n  const menu = document.querySelector('ui-context-menu');\n  menu.items = ${JSON.stringify(items, null, 2)};\n</script>`;
    }

    // Remove old listener and add new one
    const newMenu = menu.cloneNode(true);
    menu.parentNode.replaceChild(newMenu, menu);

    setTimeout(() => {
      const updatedMenu = document.getElementById('interactiveContextMenuComponent');
      if (updatedMenu) {
        updatedMenu.items = JSON.stringify(items);
        updatedMenu.setAttribute('target', '#interactiveContextMenuTarget');

        updatedMenu.addEventListener('menuItemClick', event => {
          if (outputDiv) {
            outputDiv.style.display = 'block';
            outputDiv.textContent = `Menu item clicked: ${JSON.stringify(event.detail)}`;
          }
        });
      }
    }, 50);
  } catch (error) {
    if (outputDiv) {
      outputDiv.style.display = 'block';
      outputDiv.style.color = '#ef4444';
      outputDiv.textContent = `Invalid JSON: ${error.message}`;
    }
  }
};

window.copyContextMenuCode = () => {
  const code = document.getElementById('contextMenuCodeBlock').innerText;
  const btn = document.getElementById('copyContextMenuBtn');
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

window.showMissingFeaturesValidation = () => {
  const container = document.getElementById('contextMenuDemoContainer');
  if (!container) return;
  container.innerHTML = `
      <div class="demo-block">
        <h3>Context Menu Validation & Missing Features</h3>
        <p style="color: #6b7280; margin-bottom: 20px;">Use this area to validate gaps identified in the analysis.</p>

        <div style="max-width: 600px; margin: 0 auto;">
          <div id="validationTarget" style="min-height: 200px; border: 2px dashed #f59e0b; border-radius: 8px; display: flex; align-items: center; justify-content: center; background: #fffbeb; cursor: context-menu;">
            <div style="text-align: center;">
              <div style="margin-bottom: 10px;">
                <ui-icon name="flask-conical" library="lucide" size="48px" style="color: #92400e;"></ui-icon>
              </div>
              <div style="color: #92400e; font-size: 14px; font-weight: 600;">Right-Click for Test Menu</div>
              <div style="color: #b45309; font-size: 12px; margin-top: 4px;">Test checkboxes & mobile trigger</div>
            </div>
          </div>
          
        <div style="margin-top: 24px; padding: 16px; background: #fff1f2; border: 1px solid #fecdd3; border-radius: 8px;">
            <h5 style="margin:0 0 12px 0; color: #be123c;">Missing Features Test Plan:</h5>
            <ul style="margin:0; padding-left: 20px; color: #9f1239; font-size: 13px; line-height: 1.6;">
              <li>
                <strong>Unmanaged Checkboxes/Radios:</strong>
                <br>Click "View Sidebar" or "Theme Options" in the menu.
                <br><em>Expected:</em> Items should toggle state visually.
                <br><em>Actual:</em> State does not change (Component is stateless/controlled only).
              </li>
              <li style="margin-top:8px">
                <strong>Mobile Trigger:</strong>
                <br>Touch and hold (Long Press) on the test area above (simulation).
                <br><em>Expected:</em> Menu should open.
                <br><em>Actual:</em> Likely native context menu or nothing (Needs <code>longpress</code> handling).
              </li>
              <li style="margin-top:8px">
                <strong>Icon rendering:</strong>
                <br>Icons are currently string-only (innerHTML). Unable to pass component slots for icons.
              </li>
            </ul>
          </div>
        </div>
        <div id="contextMenuLog" style="margin-top: 12px; padding: 12px; border-radius: 8px; background: #f8fafc; border: 1px solid #e5e7eb; font-size: 13px; max-height: 160px; overflow-y: auto;"></div>
        <ui-context-menu id="validationMenu" icon-library="lucide" persist-state="true" long-press-duration="600"></ui-context-menu>
    `;

  setTimeout(() => {
    const menu = document.getElementById('validationMenu');
    const logArea = document.getElementById('contextMenuLog');
    const appendLog = msg => {
      if (!logArea) return;
      const entry = document.createElement('div');
      entry.style.marginBottom = '4px';
      entry.style.color = '#92400e';
      entry.textContent = msg;
      logArea.prepend(entry);
    };
    if (menu) {
      menu.items = JSON.stringify([
        { type: 'header', label: 'State Test' },
        { label: 'View Sidebar', type: 'checkbox', checked: false, id: 'view-sidebar', iconTemplate: '<span style="font-size:14px; line-height:1;">📚</span>' },
        { label: 'View Activity', type: 'checkbox', checked: true, id: 'view-activity', iconTemplate: '<span style="font-size:14px; line-height:1;">📊</span>' },
        { type: 'separator' },
        { type: 'header', label: 'Radio Test (Theme)' },
        { label: 'Light', type: 'radio', checked: true, id: 'theme-light', iconTemplate: '<span style="font-size:14px; line-height:1;">🌝</span>' },
        { label: 'Dark', type: 'radio', checked: false, id: 'theme-dark', iconTemplate: '<span style="font-size:14px; line-height:1;">🌚</span>' },
        { label: 'Auto', type: 'radio', checked: false, id: 'theme-auto', iconTemplate: '<span style="font-size:14px; line-height:1;">⚙️</span>' },
      ]);
      menu.setAttribute('target', '#validationTarget');
      menu.addEventListener('itemSelect', event => {
        const { item } = event.detail;
        if (item.type === 'checkbox' || item.type === 'radio') {
          appendLog(`State saved: ${item.label} is now ${item.checked ? 'on' : 'off'}`);
        } else {
          appendLog(`Selected: ${item.label}`);
        }
      });
      menu.addEventListener('longPress', () => {
        appendLog('Long press detected; mobile trigger working!');
      });
      setTimeout(() => {
        menu.setAttribute('target', '#validationTarget');
      }, 0);
    }
  }, 100);
};
