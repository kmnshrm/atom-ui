/**
 * fix-demos-v2.mjs
 * Patches demos.json:
 *  - Adds tooltip demos
 *  - Rewrites snackbar demos (adds ui-snackbar element)
 *  - Adds resizable-panel demos
 *  - Removes broken popover demos [8,9]
 *  - Removes broken dialog demos [1,11,13,16,18,22,40]
 *  - Removes broken aside demos [7,8]
 */

import { readFileSync, writeFileSync } from 'fs';

const DEMOS_PATH = new URL('./src/demos.json', import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1');
const ORIG_PATH = new URL('./demos-original.json', import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1');

const demos = JSON.parse(readFileSync(DEMOS_PATH, 'utf8'));
// Load original for reference (dialog, aside, popover that had broken entries)
const orig = JSON.parse(readFileSync(ORIG_PATH, 'utf8'));

// ─── TOOLTIP ─────────────────────────────────────────────────────────────────

const tooltipDemos = [
  {
    title: 'Basic Tooltips',
    html: `<div class="demo-block">
  <h3>Basic Tooltips</h3>
  <p style="color:#6b7280;margin-bottom:16px;">Hover over each button to trigger a tooltip from any direction.</p>
  <div style="display:flex;gap:16px;flex-wrap:wrap;padding:8px 0;">
    <ui-tooltip content="Tooltip on top" position="top">
      <ui-button slot="target" variant="outline" color="primary">Top</ui-button>
    </ui-tooltip>
    <ui-tooltip content="Tooltip on the bottom" position="bottom">
      <ui-button slot="target" variant="outline" color="secondary">Bottom</ui-button>
    </ui-tooltip>
    <ui-tooltip content="Tooltip on the left" position="left">
      <ui-button slot="target" variant="outline" color="success">Left</ui-button>
    </ui-tooltip>
    <ui-tooltip content="Tooltip on the right" position="right">
      <ui-button slot="target" variant="outline" color="warning">Right</ui-button>
    </ui-tooltip>
  </div>
</div>`
  },
  {
    title: 'Tooltip Variants',
    html: `<div class="demo-block">
  <h3>Tooltip Variants</h3>
  <p style="color:#6b7280;margin-bottom:16px;">Each tooltip uses a different visual color theme.</p>
  <div style="display:flex;gap:12px;flex-wrap:wrap;padding:8px 0;">
    <ui-tooltip content="Dark tooltip" variant="dark" position="top">
      <ui-button slot="target" variant="filled" color="primary">Dark</ui-button>
    </ui-tooltip>
    <ui-tooltip content="Success tooltip" variant="success" position="top">
      <ui-button slot="target" variant="filled" color="success">Success</ui-button>
    </ui-tooltip>
    <ui-tooltip content="Warning tooltip" variant="warning" position="top">
      <ui-button slot="target" variant="filled" color="warning">Warning</ui-button>
    </ui-tooltip>
    <ui-tooltip content="Danger tooltip" variant="danger" position="top">
      <ui-button slot="target" variant="filled" color="danger">Danger</ui-button>
    </ui-tooltip>
    <ui-tooltip content="Info tooltip" variant="info" position="top">
      <ui-button slot="target" variant="filled" color="info">Info</ui-button>
    </ui-tooltip>
    <ui-tooltip content="Glass tooltip" variant="glass" position="top">
      <ui-button slot="target" variant="outline" color="primary">Glass</ui-button>
    </ui-tooltip>
  </div>
</div>`
  },
  {
    title: 'Trigger Modes',
    html: `<div class="demo-block">
  <h3>Trigger Modes</h3>
  <p style="color:#6b7280;margin-bottom:16px;">Tooltips can be triggered by hover, click, or focus.</p>
  <div style="display:flex;gap:12px;flex-wrap:wrap;padding:8px 0;">
    <ui-tooltip content="Hover to show" trigger="hover" position="top">
      <ui-button slot="target" variant="outline" color="primary">Hover</ui-button>
    </ui-tooltip>
    <ui-tooltip content="Click to toggle" trigger="click" position="top">
      <ui-button slot="target" variant="outline" color="secondary">Click</ui-button>
    </ui-tooltip>
    <ui-tooltip content="Focus the input to show" trigger="focus" position="bottom">
      <input slot="target" type="text" placeholder="Focus me" style="padding:8px 12px;border:1px solid #374151;border-radius:6px;background:#1e293b;color:#f8fafc;" />
    </ui-tooltip>
  </div>
</div>`
  },
  {
    title: 'Tooltip Sizes',
    html: `<div class="demo-block">
  <h3>Tooltip Sizes</h3>
  <p style="color:#6b7280;margin-bottom:16px;">Tooltips support sm, md, and lg size variants.</p>
  <div style="display:flex;gap:12px;flex-wrap:wrap;padding:8px 0;">
    <ui-tooltip content="Small tooltip" size="sm" position="top">
      <ui-button slot="target" variant="outline" color="info" size="sm">Small</ui-button>
    </ui-tooltip>
    <ui-tooltip content="Medium tooltip — the default size" size="md" position="top">
      <ui-button slot="target" variant="outline" color="primary" size="md">Medium</ui-button>
    </ui-tooltip>
    <ui-tooltip content="Large tooltip with more padding and text" size="lg" position="top">
      <ui-button slot="target" variant="outline" color="secondary" size="lg">Large</ui-button>
    </ui-tooltip>
  </div>
</div>`
  },
  {
    title: 'Shape Variations',
    html: `<div class="demo-block">
  <h3>Shape Variations</h3>
  <p style="color:#6b7280;margin-bottom:16px;">Control corner rounding with the shape prop.</p>
  <div style="display:flex;gap:12px;flex-wrap:wrap;padding:8px 0;">
    <ui-tooltip content="Rounded corners" shape="rounded" position="top">
      <ui-button slot="target" variant="filled" color="primary">Rounded</ui-button>
    </ui-tooltip>
    <ui-tooltip content="Pill shaped tooltip" shape="pill" position="top">
      <ui-button slot="target" variant="filled" color="secondary">Pill</ui-button>
    </ui-tooltip>
    <ui-tooltip content="Square corners" shape="square" position="top">
      <ui-button slot="target" variant="filled" color="success">Square</ui-button>
    </ui-tooltip>
  </div>
</div>`
  },
  {
    title: 'Arrow Toggle',
    html: `<div class="demo-block">
  <h3>Arrow Toggle</h3>
  <p style="color:#6b7280;margin-bottom:16px;">Tooltips can show or hide the directional arrow pointer.</p>
  <div style="display:flex;gap:12px;flex-wrap:wrap;padding:8px 0;">
    <ui-tooltip content="Tooltip with arrow (default)" arrow="true" position="top">
      <ui-button slot="target" variant="outline" color="primary">With Arrow</ui-button>
    </ui-tooltip>
    <ui-tooltip content="Tooltip without arrow" arrow="false" position="top">
      <ui-button slot="target" variant="outline" color="secondary">No Arrow</ui-button>
    </ui-tooltip>
  </div>
</div>`
  },
  {
    title: 'Tooltip on Various Elements',
    html: `<div class="demo-block">
  <h3>Tooltip on Various Elements</h3>
  <p style="color:#6b7280;margin-bottom:16px;">Tooltips can be attached to any element using slot="target".</p>
  <div style="display:flex;gap:20px;align-items:center;flex-wrap:wrap;padding:8px 0;">
    <ui-tooltip content="Hover over this icon" position="top">
      <ui-icon slot="target" name="info" library="lucide" style="cursor:pointer;color:#60A5FA;font-size:24px;"></ui-icon>
    </ui-tooltip>
    <ui-tooltip content="This badge has a tooltip" position="right">
      <ui-badge slot="target" label="New" color="success"></ui-badge>
    </ui-tooltip>
    <ui-tooltip content="Custom styled text" variant="glass" position="top">
      <span slot="target" style="text-decoration:underline dotted;cursor:help;color:#a78bfa;">Hover over text</span>
    </ui-tooltip>
    <ui-tooltip content="Action button tooltip" variant="info" position="bottom">
      <ui-button slot="target" variant="filled" color="info" size="sm">Action</ui-button>
    </ui-tooltip>
  </div>
</div>`
  },
  {
    title: 'Entrance Animations',
    html: `<div class="demo-block">
  <h3>Entrance Animations</h3>
  <p style="color:#6b7280;margin-bottom:16px;">Choose how the tooltip animates into view.</p>
  <div style="display:flex;gap:12px;flex-wrap:wrap;padding:8px 0;">
    <ui-tooltip content="Fade in" animation="fade-in" position="top">
      <ui-button slot="target" variant="outline" color="primary">Fade In</ui-button>
    </ui-tooltip>
    <ui-tooltip content="Scale pop" animation="scale" position="top">
      <ui-button slot="target" variant="outline" color="success">Scale</ui-button>
    </ui-tooltip>
    <ui-tooltip content="Slide in" animation="slide" position="bottom">
      <ui-button slot="target" variant="outline" color="warning">Slide</ui-button>
    </ui-tooltip>
    <ui-tooltip content="No animation" animation="none" position="top">
      <ui-button slot="target" variant="outline" color="secondary">None</ui-button>
    </ui-tooltip>
  </div>
</div>`
  }
];

demos.tooltip = tooltipDemos;
console.log(`✅ tooltip: added ${tooltipDemos.length} demos`);

// ─── SNACKBAR ─────────────────────────────────────────────────────────────────

const snackbarDemos = [
  {
    title: '🔔 Basic Notifications',
    html: `<div class="demo-block">
  <h3>Basic Notifications</h3>
  <p style="color:#6b7280;margin-bottom:16px;">Click each button to trigger different notification types.</p>
  <ui-snackbar id="snackbar-basic" duration="4000"></ui-snackbar>
  <div style="display:flex;gap:12px;flex-wrap:wrap;">
    <ui-button variant="filled" color="success" id="btn-success-basic">Success</ui-button>
    <ui-button variant="filled" color="danger" id="btn-error-basic">Error</ui-button>
    <ui-button variant="filled" color="warning" id="btn-warning-basic">Warning</ui-button>
    <ui-button variant="filled" color="info" id="btn-info-basic">Info</ui-button>
  </div>
  <script>
    (function() {
      var el = document.getElementById('snackbar-basic');
      document.getElementById('btn-success-basic').addEventListener('click', function() {
        el.add({ message: 'Operation completed successfully!', type: 'success' });
      });
      document.getElementById('btn-error-basic').addEventListener('click', function() {
        el.add({ message: 'An error occurred. Please try again.', type: 'error' });
      });
      document.getElementById('btn-warning-basic').addEventListener('click', function() {
        el.add({ message: 'Please review your settings before proceeding.', type: 'warning' });
      });
      document.getElementById('btn-info-basic').addEventListener('click', function() {
        el.add({ message: 'New updates are available.', type: 'info' });
      });
    })();
  </script>
</div>`
  },
  {
    title: 'With Titles',
    html: `<div class="demo-block">
  <h3>Notifications with Titles</h3>
  <p style="color:#6b7280;margin-bottom:16px;">Add a title for richer notification context.</p>
  <ui-snackbar id="snackbar-titled" duration="5000"></ui-snackbar>
  <div style="display:flex;gap:12px;flex-wrap:wrap;">
    <ui-button variant="filled" color="success" id="btn-titled-success">Deploy Done</ui-button>
    <ui-button variant="filled" color="danger" id="btn-titled-error">Build Failed</ui-button>
    <ui-button variant="filled" color="info" id="btn-titled-info">New Version</ui-button>
  </div>
  <script>
    (function() {
      var el = document.getElementById('snackbar-titled');
      document.getElementById('btn-titled-success').addEventListener('click', function() {
        el.add({ title: 'Deployment Success', message: 'v2.4.1 deployed to production.', type: 'success' });
      });
      document.getElementById('btn-titled-error').addEventListener('click', function() {
        el.add({ title: 'Build Failed', message: 'TypeScript errors found in module auth.ts', type: 'error' });
      });
      document.getElementById('btn-titled-info').addEventListener('click', function() {
        el.add({ title: 'Update Available', message: 'Atom UI v3.0.0 is ready to install.', type: 'info' });
      });
    })();
  </script>
</div>`
  },
  {
    title: 'Custom Duration',
    html: `<div class="demo-block">
  <h3>Custom Duration</h3>
  <p style="color:#6b7280;margin-bottom:16px;">Control how long each toast remains visible.</p>
  <ui-snackbar id="snackbar-duration" duration="3000"></ui-snackbar>
  <div style="display:flex;gap:12px;flex-wrap:wrap;">
    <ui-button variant="outline" color="info" id="btn-dur-2s">2 Seconds</ui-button>
    <ui-button variant="outline" color="primary" id="btn-dur-5s">5 Seconds</ui-button>
    <ui-button variant="outline" color="warning" id="btn-dur-10s">10 Seconds</ui-button>
    <ui-button variant="outline" color="success" id="btn-dur-persist">Persistent</ui-button>
  </div>
  <script>
    (function() {
      var el = document.getElementById('snackbar-duration');
      document.getElementById('btn-dur-2s').addEventListener('click', function() {
        el.add({ message: 'Dismisses in 2 seconds.', type: 'info', duration: 2000 });
      });
      document.getElementById('btn-dur-5s').addEventListener('click', function() {
        el.add({ message: 'Dismisses in 5 seconds.', type: 'info', duration: 5000 });
      });
      document.getElementById('btn-dur-10s').addEventListener('click', function() {
        el.add({ message: 'Dismisses in 10 seconds.', type: 'warning', duration: 10000 });
      });
      document.getElementById('btn-dur-persist').addEventListener('click', function() {
        el.add({ message: 'This notification persists until manually closed.', type: 'success', duration: 0 });
      });
    })();
  </script>
</div>`
  },
  {
    title: 'Open Modes (Entrance Animations)',
    html: `<div class="demo-block">
  <h3>Open Modes — Entrance Animations</h3>
  <p style="color:#6b7280;margin-bottom:16px;">Each toast can enter with a different animation.</p>
  <ui-snackbar id="snackbar-modes" duration="4000" open-mode="slide-down"></ui-snackbar>
  <div style="display:flex;gap:10px;flex-wrap:wrap;">
    <ui-button variant="outline" color="primary" id="btn-mode-slide-down">Slide Down</ui-button>
    <ui-button variant="outline" color="secondary" id="btn-mode-slide-up">Slide Up</ui-button>
    <ui-button variant="outline" color="success" id="btn-mode-fade">Fade</ui-button>
    <ui-button variant="outline" color="warning" id="btn-mode-scale">Scale</ui-button>
    <ui-button variant="outline" color="info" id="btn-mode-bounce">Bounce</ui-button>
  </div>
  <script>
    (function() {
      var el = document.getElementById('snackbar-modes');
      var modes = {
        'btn-mode-slide-down': 'slide-down',
        'btn-mode-slide-up': 'slide-up',
        'btn-mode-fade': 'fade',
        'btn-mode-scale': 'scale',
        'btn-mode-bounce': 'bounce'
      };
      Object.keys(modes).forEach(function(id) {
        document.getElementById(id).addEventListener('click', function() {
          el.openMode = modes[id];
          el.add({ message: 'Animation: ' + modes[id], type: 'info', duration: 3000 });
        });
      });
    })();
  </script>
</div>`
  },
  {
    title: 'Max Visible & Stacking',
    html: `<div class="demo-block">
  <h3>Max Visible &amp; Stacking</h3>
  <p style="color:#6b7280;margin-bottom:16px;">Control how many toasts appear simultaneously.</p>
  <ui-snackbar id="snackbar-stack" max-visible="3" duration="6000"></ui-snackbar>
  <div style="display:flex;gap:10px;flex-wrap:wrap;">
    <ui-button variant="filled" color="primary" id="btn-stack-spam">Spam 5 Toasts</ui-button>
    <ui-button variant="outline" color="secondary" id="btn-stack-clear">Clear All</ui-button>
  </div>
  <script>
    (function() {
      var el = document.getElementById('snackbar-stack');
      var types = ['success', 'error', 'warning', 'info', 'success'];
      var msgs = [
        'Task 1 queued', 'Task 2 started', 'Task 3 pending', 'Task 4 running', 'All tasks done!'
      ];
      document.getElementById('btn-stack-spam').addEventListener('click', function() {
        msgs.forEach(function(msg, i) {
          setTimeout(function() {
            el.add({ message: msg, type: types[i], duration: 6000 });
          }, i * 300);
        });
      });
      document.getElementById('btn-stack-clear').addEventListener('click', function() {
        if (el.clearAll) el.clearAll();
      });
    })();
  </script>
</div>`
  },
  {
    title: 'Particles Effect',
    html: `<div class="demo-block">
  <h3>Particles Effect</h3>
  <p style="color:#6b7280;margin-bottom:16px;">Success notifications can emit celebratory particle effects.</p>
  <ui-snackbar id="snackbar-particles" particles="true" duration="5000"></ui-snackbar>
  <div style="display:flex;gap:12px;flex-wrap:wrap;">
    <ui-button variant="filled" color="success" id="btn-p-on">With Particles</ui-button>
    <ui-button variant="outline" color="success" id="btn-p-off">Without Particles</ui-button>
  </div>
  <script>
    (function() {
      var el = document.getElementById('snackbar-particles');
      document.getElementById('btn-p-on').addEventListener('click', function() {
        el.particles = true;
        el.add({ message: 'Woohoo! Deployment complete 🎉', type: 'success' });
      });
      document.getElementById('btn-p-off').addEventListener('click', function() {
        el.particles = false;
        el.add({ message: 'Done. No particles this time.', type: 'success' });
      });
    })();
  </script>
</div>`
  },
  {
    title: 'Card Stack Mode',
    html: `<div class="demo-block">
  <h3>Card Stack Mode</h3>
  <p style="color:#6b7280;margin-bottom:16px;">Card stack mode layers toasts in a deck — only the topmost is fully visible.</p>
  <ui-snackbar id="snackbar-cardstack" card-stack="true" max-visible="4" duration="8000"></ui-snackbar>
  <div style="display:flex;gap:12px;flex-wrap:wrap;">
    <ui-button variant="filled" color="primary" id="btn-cs-send">Add to Stack</ui-button>
  </div>
  <script>
    (function() {
      var el = document.getElementById('snackbar-cardstack');
      var count = 0;
      var types = ['success', 'info', 'warning', 'error'];
      document.getElementById('btn-cs-send').addEventListener('click', function() {
        count++;
        el.add({ title: 'Notification ' + count, message: 'This is card #' + count + ' in the stack.', type: types[count % 4] });
      });
    })();
  </script>
</div>`
  },
  {
    title: 'Pause on Hover',
    html: `<div class="demo-block">
  <h3>Pause on Hover</h3>
  <p style="color:#6b7280;margin-bottom:16px;">When enabled, the auto-dismiss timer pauses while you hover over the toast.</p>
  <ui-snackbar id="snackbar-hover" pause-on-hover="true" duration="4000"></ui-snackbar>
  <div style="display:flex;gap:12px;flex-wrap:wrap;">
    <ui-button variant="filled" color="warning" id="btn-hover-pause">Start Toast — Hover to Pause</ui-button>
  </div>
  <script>
    (function() {
      document.getElementById('btn-hover-pause').addEventListener('click', function() {
        document.getElementById('snackbar-hover').add({
          title: 'Hover to Pause Timer',
          message: 'This toast will disappear in 4s unless you hover over it.',
          type: 'warning'
        });
      });
    })();
  </script>
</div>`
  },
  {
    title: 'Multiple Snackbar Instances',
    html: `<div class="demo-block">
  <h3>Multiple Snackbar Instances</h3>
  <p style="color:#6b7280;margin-bottom:16px;">You can mount multiple snackbar elements on the same page with different configurations.</p>
  <ui-snackbar id="snackbar-top" open-mode="slide-down" duration="4000" style="--snackbar-position:top-right;"></ui-snackbar>
  <ui-snackbar id="snackbar-bottom" open-mode="slide-up" duration="4000" style="--snackbar-position:bottom-left;"></ui-snackbar>
  <div style="display:flex;gap:12px;flex-wrap:wrap;">
    <ui-button variant="outline" color="success" id="btn-top-right">Top-Right</ui-button>
    <ui-button variant="outline" color="primary" id="btn-bottom-left">Bottom-Left</ui-button>
  </div>
  <script>
    (function() {
      document.getElementById('btn-top-right').addEventListener('click', function() {
        document.getElementById('snackbar-top').add({ message: 'Notification from top-right!', type: 'success' });
      });
      document.getElementById('btn-bottom-left').addEventListener('click', function() {
        document.getElementById('snackbar-bottom').add({ message: 'Notification from bottom-left!', type: 'info' });
      });
    })();
  </script>
</div>`
  },
  {
    title: '🎮 Interactive Playground',
    html: `<div class="demo-block">
  <h3>🎮 Interactive Playground</h3>
  <p style="color:#6b7280;margin-bottom:16px;">Configure the snackbar and fire custom notifications.</p>
  <ui-snackbar id="snackbar-playground" duration="5000" open-mode="slide-down"></ui-snackbar>
  <div style="background:#1e293b;border-radius:10px;padding:20px;margin-bottom:16px;">
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:16px;">
      <label style="display:flex;flex-direction:column;gap:6px;color:#94a3b8;font-size:13px;">
        Message
        <input id="pg-message" type="text" value="Hello from Atom UI!" style="padding:8px;border:1px solid #374151;border-radius:6px;background:#0f172a;color:#f1f5f9;font-size:13px;" />
      </label>
      <label style="display:flex;flex-direction:column;gap:6px;color:#94a3b8;font-size:13px;">
        Title (optional)
        <input id="pg-title" type="text" placeholder="Optional title" style="padding:8px;border:1px solid #374151;border-radius:6px;background:#0f172a;color:#f1f5f9;font-size:13px;" />
      </label>
      <label style="display:flex;flex-direction:column;gap:6px;color:#94a3b8;font-size:13px;">
        Type
        <select id="pg-type" style="padding:8px;border:1px solid #374151;border-radius:6px;background:#0f172a;color:#f1f5f9;font-size:13px;">
          <option value="success">success</option>
          <option value="error">error</option>
          <option value="warning">warning</option>
          <option value="info">info</option>
        </select>
      </label>
      <label style="display:flex;flex-direction:column;gap:6px;color:#94a3b8;font-size:13px;">
        Duration (ms)
        <input id="pg-duration" type="number" value="4000" min="0" step="500" style="padding:8px;border:1px solid #374151;border-radius:6px;background:#0f172a;color:#f1f5f9;font-size:13px;" />
      </label>
    </div>
  </div>
  <ui-button variant="filled" color="primary" id="btn-pg-fire">Fire Notification</ui-button>
  <script>
    (function() {
      var el = document.getElementById('snackbar-playground');
      document.getElementById('btn-pg-fire').addEventListener('click', function() {
        var msg = document.getElementById('pg-message').value || 'Hello!';
        var title = document.getElementById('pg-title').value;
        var type = document.getElementById('pg-type').value;
        var dur = parseInt(document.getElementById('pg-duration').value) || 4000;
        var payload = { message: msg, type: type, duration: dur };
        if (title) payload.title = title;
        el.add(payload);
      });
    })();
  </script>
</div>`
  }
];

demos.snackbar = snackbarDemos;
console.log(`✅ snackbar: rewrote ${snackbarDemos.length} demos`);

// ─── RESIZABLE PANEL ─────────────────────────────────────────────────────────

const resizablePanelDemos = [
  {
    title: 'Basic Horizontal Split',
    html: `<div class="demo-block">
  <h3>Basic Horizontal Split</h3>
  <p style="color:#6b7280;margin-bottom:16px;">Drag the handle to resize panels side by side.</p>
  <ui-resizable-panel direction="horizontal" style="height:200px;display:block;">
    <div slot="panel-1" style="height:100%;display:flex;align-items:center;justify-content:center;background:#1e293b;color:#10B981;font-weight:600;font-size:1.1rem;">
      Panel 1
    </div>
    <div slot="panel-2" style="height:100%;display:flex;align-items:center;justify-content:center;background:#0f172a;color:#60A5FA;font-weight:600;font-size:1.1rem;">
      Panel 2
    </div>
  </ui-resizable-panel>
</div>`
  },
  {
    title: 'Vertical Split',
    html: `<div class="demo-block">
  <h3>Vertical Split</h3>
  <p style="color:#6b7280;margin-bottom:16px;">Panels stacked top-to-bottom with a draggable horizontal handle.</p>
  <ui-resizable-panel direction="vertical" style="height:280px;display:block;">
    <div slot="panel-1" style="height:100%;display:flex;align-items:center;justify-content:center;background:#1e293b;color:#a78bfa;font-weight:600;font-size:1.1rem;">
      Top Panel
    </div>
    <div slot="panel-2" style="height:100%;display:flex;align-items:center;justify-content:center;background:#0f172a;color:#f472b6;font-weight:600;font-size:1.1rem;">
      Bottom Panel
    </div>
  </ui-resizable-panel>
</div>`
  },
  {
    title: 'Min & Max Size Constraints',
    html: `<div class="demo-block">
  <h3>Min &amp; Max Size Constraints</h3>
  <p style="color:#6b7280;margin-bottom:16px;">Set minimum and maximum panel sizes to prevent over-resizing.</p>
  <ui-resizable-panel direction="horizontal" min-panel-size="20" max-panel-size="80" style="height:200px;display:block;">
    <div slot="panel-1" style="height:100%;display:flex;align-items:center;justify-content:center;background:#1e293b;color:#fbbf24;font-weight:600;font-size:1rem;padding:16px;text-align:center;">
      Min 20% / Max 80%<br/>
      <span style="font-size:0.75rem;color:#6b7280;">Can't shrink below 20%</span>
    </div>
    <div slot="panel-2" style="height:100%;display:flex;align-items:center;justify-content:center;background:#0f172a;color:#34d399;font-weight:600;font-size:1rem;padding:16px;text-align:center;">
      Constrained Partner
    </div>
  </ui-resizable-panel>
</div>`
  },
  {
    title: 'Themed Handles',
    html: `<div class="demo-block">
  <h3>Themed Handles</h3>
  <p style="color:#6b7280;margin-bottom:16px;">Customize handle colors and enable the grip icon indicator.</p>
  <ui-resizable-panel
    direction="horizontal"
    handle-color="#374151"
    handle-hover-color="#8B5CF6"
    handle-size="8"
    show-handle-icon="true"
    style="height:200px;display:block;">
    <div slot="panel-1" style="height:100%;display:flex;align-items:center;justify-content:center;background:#1e293b;color:#8B5CF6;font-weight:600;font-size:1.1rem;">
      Violet Handle Theme
    </div>
    <div slot="panel-2" style="height:100%;display:flex;align-items:center;justify-content:center;background:#0f172a;color:#c4b5fd;font-weight:600;font-size:1.1rem;">
      Drag the handle!
    </div>
  </ui-resizable-panel>
</div>`
  },
  {
    title: 'IDE Layout Example',
    html: `<div class="demo-block">
  <h3>IDE Layout Example</h3>
  <p style="color:#6b7280;margin-bottom:16px;">A realistic code-editor style layout with file tree, editor, and output panels.</p>
  <ui-resizable-panel direction="horizontal" style="height:300px;display:block;">
    <div slot="panel-1" style="height:100%;background:#0f172a;padding:12px;overflow:auto;">
      <p style="color:#64748b;font-size:11px;text-transform:uppercase;letter-spacing:1px;margin:0 0 8px;">Explorer</p>
      <div style="color:#94a3b8;font-size:13px;line-height:1.8;">
        <div>📁 src</div>
        <div style="padding-left:16px;">📄 App.tsx</div>
        <div style="padding-left:16px;">📄 main.tsx</div>
        <div>📁 components</div>
        <div style="padding-left:16px;">📄 Button.tsx</div>
      </div>
    </div>
    <div slot="panel-2" style="height:100%;background:#1e293b;padding:16px;font-family:monospace;font-size:13px;color:#e2e8f0;overflow:auto;">
      <span style="color:#7dd3fc;">import</span> <span style="color:#f8fafc;">React</span> <span style="color:#7dd3fc;">from</span> <span style="color:#86efac;">'react'</span>;<br/>
      <span style="color:#7dd3fc;">export default function</span> <span style="color:#fde68a;">App</span>() {<br/>
      &nbsp;&nbsp;<span style="color:#7dd3fc;">return</span> &lt;<span style="color:#f87171;">div</span>&gt;Hello World&lt;/<span style="color:#f87171;">div</span>&gt;;<br/>
      }
    </div>
  </ui-resizable-panel>
</div>`
  }
];

demos['resizable-panel'] = resizablePanelDemos;
console.log(`✅ resizable-panel: added ${resizablePanelDemos.length} demos`);

// ─── POPOVER — restore from original then remove broken demos by title ──────

const popoverBrokenTitles = new Set(['update Interactive Popover', 'log Evt']);
const popoverBefore = orig.popover.length;
demos.popover = orig.popover.filter(x => !popoverBrokenTitles.has(x.title));
console.log(`✅ popover: removed ${popoverBefore - demos.popover.length} broken demos (was ${popoverBefore}, now ${demos.popover.length})`);

// ─── DIALOG — restore from original then remove broken demos by title ────────

const dialogBrokenTitles = new Set([
  'log Event', 'spawn Widget', 'onclick', 'open Level',
  'update Interactive Dialog', 'System Reward', '${title} Window'
]);
const dialogBefore = orig.dialog.length;
demos.dialog = orig.dialog.filter(x => !dialogBrokenTitles.has(x.title));
console.log(`✅ dialog: removed ${dialogBefore - demos.dialog.length} broken demos (was ${dialogBefore}, now ${demos.dialog.length})`);

// ─── ASIDE — restore from original then remove template literal demos ────────

const asideBefore = orig.aside.length;
// Filter by substring match to handle encoding differences in emoji titles
demos.aside = orig.aside.filter(x =>
  !x.title.includes('${type.toUpperCase()}') && !x.title.includes('${speed}')
);
console.log(`✅ aside: removed ${asideBefore - demos.aside.length} broken demos (was ${asideBefore}, now ${demos.aside.length})`);

// ─── WRITE ────────────────────────────────────────────────────────────────────

writeFileSync(DEMOS_PATH, JSON.stringify(demos, null, 2), 'utf8');
console.log('\n✅ demos.json written successfully.');
