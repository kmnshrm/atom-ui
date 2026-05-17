export function initDockHostDemo() {
  const container = document.getElementById('dock-host');
  if (!container) return;

  container.innerHTML = `
    <div class="demo-block" style="background: white; border-radius: 12px; padding: 30px; box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);">
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 25px;">
        <h2 style="margin: 0; display: flex; align-items: center; gap: 10px;">
          <span style="font-size: 24px;">⚓</span> Dock Host
        </h2>
        <div style="display: flex; gap: 10px;">
          <ui-button label="Left" variant="outline" color="success" size="md"click="toggleDockPosition('left')"></ui-button>
          <ui-button label="Right" variant="outline" color="success" size="md"click="toggleDockPosition('right')"></ui-button>
          <ui-button label="Bottom" variant="outline" color="success" size="md"click="toggleDockPosition('bottom')"></ui-button>
        </div>
      </div>
      
      <p style="color: #64748b; margin-bottom: 30px;">
        The <code>ui-dock-host</code> provides a persistent region for tools and panels. It supports <strong>relative positioning</strong> to stay within its parent container and a <strong>floating mode</strong> for multi-window experiences.
      </p>

      <div id="dock-host-playground" style="position: relative; height: 600px; border: 2px solid #e2e8f0; border-radius: 16px; background: #f8fafc; overflow: hidden;">
        <ui-dock-host id="demoDockHost" dock="left" width="280px" height="100%" relative="true">
          <div slot="header">Project Explorer</div>
          
          <!-- Main Content Slot -->
          <div slot="main" style="padding: 40px; height: 100%;">
            <div style="max-width: 900px; margin: 0 auto;">
              <header style="margin-bottom: 30px;">
                <h3 style="margin: 0; font-size: 24px; color: #1e293b;">Project Dashboard</h3>
                <p style="color: #64748b; margin: 5px 0 0;">Welcome back! Here is what is happening with your library.</p>
              </header>
              
              <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-bottom: 30px;">
                <div style="background: white; padding: 20px; border-radius: 12px; border: 1px solid #e2e8f0; box-shadow: 0 2px 4px rgba(0,0,0,0.02);">
                   <div style="color: #64748b; font-size: 12px; font-weight: 700; text-transform: uppercase; margin-bottom: 10px;">Total Components</div>
                   <div style="font-size: 28px; font-weight: 800; color: #6366f1;">42</div>
                   <div style="margin-top: 10px; font-size: 12px; color: #10b981;">↑ 12% from last month</div>
                </div>
                <div style="background: white; padding: 20px; border-radius: 12px; border: 1px solid #e2e8f0; box-shadow: 0 2px 4px rgba(0,0,0,0.02);">
                   <div style="color: #64748b; font-size: 12px; font-weight: 700; text-transform: uppercase; margin-bottom: 10px;">Weekly Downloads</div>
                   <div style="font-size: 28px; font-weight: 800; color: #8b5cf6;">1.2k</div>
                   <div style="margin-top: 10px; font-size: 12px; color: #10b981;">↑ 8% from last week</div>
                </div>
                <div style="background: white; padding: 20px; border-radius: 12px; border: 1px solid #e2e8f0; box-shadow: 0 2px 4px rgba(0,0,0,0.02);">
                   <div style="color: #64748b; font-size: 12px; font-weight: 700; text-transform: uppercase; margin-bottom: 10px;">Open Issues</div>
                   <div style="font-size: 28px; font-weight: 800; color: #f59e0b;">5</div>
                   <div style="margin-top: 10px; font-size: 12px; color: #ef4444;">↓ 2 from yesterday</div>
                </div>
              </div>

              <div style="background: white; padding: 30px; border-radius: 16px; border: 1px solid #e2e8f0; height: 300px; display: flex; flex-direction: column; justify-content: flex-end; gap: 10px;">
                <div style="flex: 1; display: flex; align-items: flex-end; gap: 15px; padding-bottom: 10px;">
                   <div style="flex: 1; height: 40%; background: #eef2ff; border-radius: 4px; transition: height 0.5s;"></div>
                   <div style="flex: 1; height: 65%; background: #eef2ff; border-radius: 4px; transition: height 0.5s;"></div>
                   <div style="flex: 1; height: 45%; background: #eef2ff; border-radius: 4px; transition: height 0.5s;"></div>
                   <div style="flex: 1; height: 85%; background: #6366f1; border-radius: 4px; transition: height 0.5s;"></div>
                   <div style="flex: 1; height: 60%; background: #eef2ff; border-radius: 4px; transition: height 0.5s;"></div>
                   <div style="flex: 1; height: 75%; background: #eef2ff; border-radius: 4px; transition: height 0.5s;"></div>
                   <div style="flex: 1; height: 50%; background: #eef2ff; border-radius: 4px; transition: height 0.5s;"></div>
                </div>
                <div style="display: flex; justify-content: space-between; color: #94a3b8; font-size: 12px; font-family: monospace;">
                   <span>MON</span><span>TUE</span><span>WED</span><span>THU</span><span>FRI</span><span>SAT</span><span>SUN</span>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Dock Content Slot (named content or just children) -->
          <div style="padding: 20px;">
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 20px; color: #1e293b;">
               <span style="font-size: 18px;">📁</span>
               <strong style="font-size: 1.1rem;">ui-ui-library</strong>
            </div>
            <ul style="list-style: none; padding: 0; font-family: monospace; font-size: 0.9rem; color: #475569; display: flex; flex-direction: column; gap: 10px;">
              <li style="display: flex; align-items: center; gap: 8px; padding: 6px 10px; border-radius: 6px; cursor: pointer;" onmouseover="this.style.background='rgba(99, 102, 241, 0.05)'" onmouseout="this.style.background='transparent'">
                <span style="color: #6366f1;">📄</span> index.html
              </li>
              <li style="display: flex; align-items: center; gap: 8px; padding: 6px 10px; border-radius: 6px; cursor: pointer; background: rgba(99, 102, 241, 0.08); font-weight: 600;" onmouseover="this.style.background='rgba(99, 102, 241, 0.12)'" onmouseout="this.style.background='rgba(99, 102, 241, 0.08)'">
                <span style="color: #6366f1;">📜</span> dock.css
              </li>
              <li style="display: flex; align-items: center; gap: 8px; padding: 6px 10px; border-radius: 6px; cursor: pointer;" onmouseover="this.style.background='rgba(99, 102, 241, 0.05)'" onmouseout="this.style.background='transparent'">
                <span style="color: #6366f1;">TS</span> main.ts
              </li>
            </ul>
            
            <div style="margin-top: 40px; border-top: 1px solid #e2e8f0; padding-top: 20px;">
              <span style="font-size: 12px; color: #94a3b8; font-weight: bold; text-transform: uppercase;">Features</span>
              <p style="margin-top: 10px; font-size: 0.85rem; color: #64748b; line-height: 1.5;">
                • Auto-Responsive Layout<br>
                • Flex Displacement<br>
                • Shared Main Context
              </p>
            </div>
          </div>
        </ui-dock-host>
      </div>
    </div>
  `;

  // Global helper for toggling positions in demo
  window.toggleDockPosition = pos => {
    const dock = document.getElementById('demoDockHost');
    if (dock) {
      dock.dock = pos;

      // Adjust dimensions for horizontal docking
      if (pos === 'bottom' || pos === 'top') {
        dock.height = '180px';
        dock.width = '100%';
      } else {
        dock.height = '100%';
        dock.width = '280px';
      }
    }
  };
}
