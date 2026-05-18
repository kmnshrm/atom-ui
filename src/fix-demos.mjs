/**
 * fix-demos.mjs
 * Patches the demos.json file to fix broken entries for:
 *   - meter-group (values variable missing from scripts)
 *   - timeline (unevaluated template literals)
 *   - pagination (setupPaginationEvents undefined)
 *   - list (font-awesome icons, template literals)
 * Adds new clean demos for transfer-list (supplements existing) and tree-list
 * Run: node fix-demos.mjs
 */
import { readFileSync, writeFileSync } from 'fs';

const DEMOS_PATH = './src/demos.json';
const demos = JSON.parse(readFileSync(DEMOS_PATH, 'utf8'));

// ─────────────────────────────────────────────
// METER-GROUP — rewrite with inline values
// ─────────────────────────────────────────────
demos['meter-group'] = [
  {
    title: 'Storage Usage',
    description: 'Basic horizontal meter showing used vs free storage.',
    html: `<div style="padding: 20px; max-width: 600px;">
  <h4 style="margin-top:0;">Storage Usage</h4>
  <ui-meter-group id="mgBasic" show-legend="true"></ui-meter-group>
</div>
<script>
(function() {
  setTimeout(function() {
    var el = document.getElementById('mgBasic');
    if (el) el.values = [
      { label: 'Used', value: 65, color: '#ef4444' },
      { label: 'Free', value: 35, color: '#10b981' }
    ];
  }, 50);
})();
</script>`
  },
  {
    title: 'Vertical Orientation',
    description: 'System resources displayed as a vertical meter.',
    html: `<div style="padding: 20px; display: flex; gap: 30px; align-items: flex-start;">
  <div>
    <h4 style="margin-top:0;">System Resources</h4>
    <ui-meter-group id="mgVertical" orientation="vertical" show-legend="true" size="lg"></ui-meter-group>
  </div>
</div>
<script>
(function() {
  setTimeout(function() {
    var el = document.getElementById('mgVertical');
    if (el) el.values = [
      { label: 'CPU', value: 45, color: '#10b981' },
      { label: 'Memory', value: 30, color: '#3b82f6' },
      { label: 'Disk', value: 25, color: '#f59e0b' }
    ];
  }, 50);
})();
</script>`
  },
  {
    title: 'Circle Shape',
    description: 'Circular/donut meter for project progress and usage stats.',
    html: `<div style="padding: 20px; display: flex; gap: 40px; align-items: flex-start; flex-wrap: wrap;">
  <div style="text-align: center;">
    <h4 style="margin-top:0;">Storage</h4>
    <ui-meter-group id="mgCircle1" shape="circle" show-legend="true"></ui-meter-group>
  </div>
  <div style="text-align: center;">
    <h4 style="margin-top:0;">Project Progress</h4>
    <ui-meter-group id="mgCircle2" shape="circle" show-legend="true" size="lg"></ui-meter-group>
  </div>
</div>
<script>
(function() {
  setTimeout(function() {
    var el1 = document.getElementById('mgCircle1');
    var el2 = document.getElementById('mgCircle2');
    if (el1) el1.values = [
      { label: 'Used', value: 65, color: '#ef4444' },
      { label: 'Cache', value: 20, color: '#f59e0b' },
      { label: 'Free', value: 15, color: '#10b981' }
    ];
    if (el2) el2.values = [
      { label: 'Completed', value: 75, color: '#10b981' },
      { label: 'In Progress', value: 15, color: '#f59e0b' },
      { label: 'Pending', value: 10, color: '#6b7280' }
    ];
  }, 50);
})();
</script>`
  },
  {
    title: 'Sizes',
    description: 'Meter group in sm, md, and lg sizes.',
    html: `<div style="padding: 20px; display: flex; flex-direction: column; gap: 20px; max-width: 600px;">
  <div>
    <h4 style="margin:0 0 8px;">Small (sm)</h4>
    <ui-meter-group id="mgSm" size="sm"></ui-meter-group>
  </div>
  <div>
    <h4 style="margin:0 0 8px;">Medium (md)</h4>
    <ui-meter-group id="mgMd" size="md"></ui-meter-group>
  </div>
  <div>
    <h4 style="margin:0 0 8px;">Large (lg)</h4>
    <ui-meter-group id="mgLg" size="lg"></ui-meter-group>
  </div>
</div>
<script>
(function() {
  var values = [
    { label: 'Used', value: 70, color: '#10b981' },
    { label: 'Free', value: 30, color: '#e5e7eb' }
  ];
  setTimeout(function() {
    ['mgSm','mgMd','mgLg'].forEach(function(id) {
      var el = document.getElementById(id);
      if (el) el.values = values;
    });
  }, 50);
})();
</script>`
  },
  {
    title: 'With Legend',
    description: 'Disk usage breakdown with full legend.',
    html: `<div style="padding: 20px; max-width: 600px;">
  <h4 style="margin-top:0;">Disk Usage Breakdown</h4>
  <ui-meter-group id="mgLegend" show-legend="true" show-values="true"></ui-meter-group>
</div>
<script>
(function() {
  setTimeout(function() {
    var el = document.getElementById('mgLegend');
    if (el) el.values = [
      { label: 'Images', value: 35, color: '#8b5cf6' },
      { label: 'Videos', value: 28, color: '#10b981' },
      { label: 'Documents', value: 22, color: '#3b82f6' },
      { label: 'Other', value: 15, color: '#f59e0b' }
    ];
  }, 50);
})();
</script>`
  },
  {
    title: 'Multi-Value with Labels',
    description: 'Server load distribution across multiple regions.',
    html: `<div style="padding: 20px; max-width: 600px;">
  <h4 style="margin-top:0;">Server Load Distribution</h4>
  <ui-meter-group id="mgMulti" show-labels="true" show-values="true" show-legend="true"></ui-meter-group>
</div>
<script>
(function() {
  setTimeout(function() {
    var el = document.getElementById('mgMulti');
    if (el) el.values = [
      { label: 'US East', value: 38, color: '#3b82f6' },
      { label: 'US West', value: 24, color: '#10b981' },
      { label: 'EU', value: 22, color: '#8b5cf6' },
      { label: 'APAC', value: 16, color: '#f59e0b' }
    ];
  }, 50);
})();
</script>`
  },
  {
    title: 'Interactive',
    description: 'Meter group with interactive hover tooltips.',
    html: `<div style="padding: 20px; max-width: 600px;">
  <h4 style="margin-top:0;">Budget Allocation (hover for details)</h4>
  <ui-meter-group id="mgInteractive" interactive="true" show-legend="true" show-values="true"></ui-meter-group>
</div>
<script>
(function() {
  setTimeout(function() {
    var el = document.getElementById('mgInteractive');
    if (el) el.values = [
      { label: 'Engineering', value: 45, color: '#3b82f6' },
      { label: 'Marketing', value: 25, color: '#ec4899' },
      { label: 'Operations', value: 20, color: '#10b981' },
      { label: 'HR', value: 10, color: '#f59e0b' }
    ];
  }, 50);
})();
</script>`
  },
  {
    title: 'Animated on Mount',
    description: 'Meter fills with animation when inserted into the DOM.',
    html: `<div style="padding: 20px; max-width: 600px;">
  <h4 style="margin-top:0;">Monthly Sales Target</h4>
  <ui-meter-group id="mgAnim" animated="true" show-legend="true"></ui-meter-group>
  <div style="margin-top:16px;">
    <ui-button id="replayBtn" variant="outline" size="sm">Replay Animation</ui-button>
  </div>
</div>
<script>
(function() {
  var values = [
    { label: 'Achieved', value: 72, color: '#10b981' },
    { label: 'Remaining', value: 28, color: '#e5e7eb' }
  ];
  function load() {
    var el = document.getElementById('mgAnim');
    if (!el) return;
    el.values = [];
    setTimeout(function() { el.values = values; }, 50);
  }
  setTimeout(load, 50);
  var btn = document.getElementById('replayBtn');
  if (btn) btn.addEventListener('click', load);
})();
</script>`
  }
];

// ─────────────────────────────────────────────
// TIMELINE — rewrite with resolved JSON (no template literals)
// ─────────────────────────────────────────────
const tlBasicEvents = JSON.stringify([
  { label: 'Project Kickoff', timestamp: '2024-01-01', description: 'Initial meeting with stakeholders', status: 'success' },
  { label: 'Design Phase', timestamp: '2024-02-15', description: 'UI/UX mockups & prototyping', status: 'success' },
  { label: 'Development Start', timestamp: '2024-03-20', description: 'Setting up repository and pipeline', status: 'active' },
  { label: 'Beta Launch', timestamp: '2024-06-10', description: 'Internal testing & feedback', status: 'pending' }
]);
const tlPanelEvents = JSON.stringify([
  { label: 'Step 1: Planning', description: 'Define scope and requirements.', timestamp: '10:00 AM', status: 'success' },
  { label: 'Step 2: Design', description: 'Create wireframes and mockups.', timestamp: '11:00 AM', status: 'success' },
  { label: 'Step 3: Build', description: 'Develop and integrate features.', timestamp: '12:00 PM', status: 'active' },
  { label: 'Step 4: Test', description: 'QA and user acceptance testing.', timestamp: '02:00 PM', status: 'pending' }
]);
const tlNumberEvents = JSON.stringify([
  { label: 'First Step', description: 'Project initiated successfully.', status: 'success' },
  { label: 'Profile Update', description: 'User onboarding completed.', image: 'https://i.pravatar.cc/150?img=12', status: 'active' },
  { label: 'Third Step', description: 'Integration phase started.', status: 'pending' },
  { label: 'Rocket Launch', description: 'Public release deployed.', icon: '🚀', status: 'wait' }
]);
const tlHorizEvents = JSON.stringify([
  { label: 'Q1', description: 'Foundation', status: 'success' },
  { label: 'Q2', description: 'Growth', status: 'success' },
  { label: 'Q3', description: 'Scale', status: 'active' },
  { label: 'Q4', description: 'Optimize', status: 'pending' }
]);
const tlAlternateEvents = JSON.stringify([
  { label: 'Idea', timestamp: 'Jan', description: 'Concept born', status: 'success' },
  { label: 'Research', timestamp: 'Feb', description: 'Market analysis', status: 'success' },
  { label: 'Prototype', timestamp: 'Mar', description: 'MVP built', status: 'active' },
  { label: 'Launch', timestamp: 'Apr', description: 'Public release', status: 'pending' },
  { label: 'Growth', timestamp: 'May', description: 'User acquisition', status: 'pending' }
]);
const tlMinimalEvents = JSON.stringify([
  { label: 'Committed', timestamp: '09:00', status: 'success' },
  { label: 'Building', timestamp: '09:15', status: 'success' },
  { label: 'Testing', timestamp: '09:42', status: 'active' },
  { label: 'Deploying', timestamp: '10:00', status: 'pending' }
]);
const tlFilterEvents = JSON.stringify([
  { label: 'Bug Fix', timestamp: '2024-01-10', description: 'Fixed login issue', status: 'success', category: 'fix' },
  { label: 'New Feature', timestamp: '2024-01-15', description: 'Added dark mode', status: 'success', category: 'feature' },
  { label: 'Security Patch', timestamp: '2024-01-20', description: 'XSS vulnerability patched', status: 'success', category: 'fix' },
  { label: 'API v2', timestamp: '2024-02-01', description: 'REST API redesign', status: 'active', category: 'feature' }
]);

demos['timeline'] = [
  {
    title: 'Default Vertical Timeline',
    description: 'A clean left-aligned vertical timeline with status dots.',
    html: `<div class="demo-block" style="padding: 20px;">
  <h3>Default Vertical Timeline</h3>
  <ui-timeline align="left" variant="default" events='${tlBasicEvents}'></ui-timeline>
</div>`
  },
  {
    title: 'Alternate Alignment',
    description: 'Events alternate left and right for a balanced visual layout.',
    html: `<div class="demo-block" style="padding: 20px;">
  <h3>Alternate Alignment</h3>
  <ui-timeline align="alternate" variant="default" events='${tlAlternateEvents}'></ui-timeline>
</div>`
  },
  {
    title: 'Panel Variant',
    description: 'Card-like panel styling with shadow hover effects.',
    html: `<div class="demo-block" style="padding: 20px;">
  <h3>Panel Variant</h3>
  <p style="opacity: 0.7; margin-bottom: 20px;">Use <code>variant="panel"</code> for card-like styling.</p>
  <ui-timeline align="alternate" variant="panel" events='${tlPanelEvents}'></ui-timeline>
</div>`
  },
  {
    title: 'Horizontal Timeline',
    description: 'Horizontal layout ideal for showing quarter or phase breakdowns.',
    html: `<div class="demo-block" style="padding: 20px;">
  <h3>Horizontal Timeline</h3>
  <ui-timeline mode="horizontal" align="top" events='${tlHorizEvents}'></ui-timeline>
</div>`
  },
  {
    title: 'Markers: Numbers, Images & Icons',
    description: 'Auto-numbered steps, avatar images, and icon markers.',
    html: `<div class="demo-block" style="padding: 20px;">
  <h3>Markers: Numbers, Images & Icons</h3>
  <ui-timeline align="left" marker="number" events='${tlNumberEvents}'></ui-timeline>
</div>`
  },
  {
    title: 'Minimal Variant',
    description: 'Compact minimal style for tight spaces like CI/CD pipelines.',
    html: `<div class="demo-block" style="padding: 20px;">
  <h3>Minimal Variant — CI/CD Pipeline</h3>
  <ui-timeline align="left" variant="minimal" events='${tlMinimalEvents}'></ui-timeline>
</div>`
  },
  {
    title: 'Filled Variant',
    description: 'Filled background cards for strong visual separation.',
    html: `<div class="demo-block" style="padding: 20px;">
  <h3>Filled Variant</h3>
  <ui-timeline align="left" variant="filled" events='${tlBasicEvents}'></ui-timeline>
</div>`
  },
  {
    title: 'Searchable Timeline',
    description: 'Filter events using the built-in search bar.',
    html: `<div class="demo-block" style="padding: 20px;">
  <h3>Searchable Timeline</h3>
  <p style="opacity:0.7; margin-bottom:16px;">Try searching "fix" or "feature".</p>
  <ui-timeline align="left" searchable="true" events='${tlFilterEvents}'></ui-timeline>
</div>`
  }
];

// ─────────────────────────────────────────────
// PAGINATION — rewrite as standalone self-contained demos
// ─────────────────────────────────────────────
demos['pagination'] = [
  {
    title: 'Basic Pagination',
    description: 'Standard numbered pagination with first/last and prev/next controls.',
    html: `<div class="demo-block" style="padding: 20px;">
  <h3>Basic Pagination</h3>
  <div style="display: flex; justify-content: center;">
    <ui-pagination id="pgBasic" total-items="100" items-per-page="10" current-page="1"></ui-pagination>
  </div>
  <div id="pgBasicLog" style="margin-top:12px;text-align:center;font-size:13px;color:#6b7280;">Page: 1 of 10</div>
</div>
<script>
(function() {
  setTimeout(function() {
    var el = document.getElementById('pgBasic');
    var log = document.getElementById('pgBasicLog');
    if (el) el.addEventListener('pageChange', function(e) {
      if (log) log.textContent = 'Page: ' + e.detail.currentPage + ' of ' + Math.ceil(100 / 10);
    });
  }, 100);
})();
</script>`
  },
  {
    title: 'Compact Style',
    description: 'Minimal compact pagination for space-constrained layouts.',
    html: `<div class="demo-block" style="padding: 20px;">
  <h3>Compact Style</h3>
  <div style="display: flex; justify-content: center;">
    <ui-pagination type="compact" total-items="50" items-per-page="5" current-page="3"></ui-pagination>
  </div>
</div>`
  },
  {
    title: 'Detailed Pagination',
    description: 'Full-featured with page size selector, total count, and jump-to-page.',
    html: `<div class="demo-block" style="padding: 20px;">
  <h3>Detailed Pagination</h3>
  <h4 style="margin-top:24px; margin-bottom:12px;">With Page Size &amp; Total</h4>
  <div style="display: flex; justify-content: center; margin-bottom: 24px;">
    <ui-pagination type="detailed" total-items="200" items-per-page="20" show-page-size="true" show-total="true" current-page="3"></ui-pagination>
  </div>
  <h4 style="margin-top:24px; margin-bottom:12px;">With Jump To Page</h4>
  <div style="display: flex; justify-content: center;">
    <ui-pagination type="detailed" total-items="500" items-per-page="25" show-jump-to="true" show-total="true" current-page="5"></ui-pagination>
  </div>
</div>`
  },
  {
    title: 'Input Pagination',
    description: 'Direct page number input for fast navigation.',
    html: `<div class="demo-block" style="padding: 20px;">
  <h3>Input Pagination</h3>
  <div style="display: flex; justify-content: center;">
    <ui-pagination type="input" total-items="300" items-per-page="15" current-page="5" show-total="true"></ui-pagination>
  </div>
</div>`
  },
  {
    title: 'Dropdown Pagination',
    description: 'Select current page via a dropdown menu.',
    html: `<div class="demo-block" style="padding: 20px;">
  <h3>Dropdown Pagination</h3>
  <div style="display: flex; justify-content: center;">
    <ui-pagination type="dropdown" total-items="100" items-per-page="10" current-page="2"></ui-pagination>
  </div>
</div>`
  },
  {
    title: 'Different Sizes',
    description: 'Small, medium, and large pagination controls.',
    html: `<div class="demo-block" style="padding: 20px;">
  <h3>Different Sizes</h3>
  <div style="display: flex; flex-direction: column; gap: 20px; align-items: center;">
    <div style="width:100%;text-align:center;"><strong style="font-size:12px;text-transform:uppercase;color:#6b7280;">Small</strong><br><ui-pagination size="sm" total-items="100" items-per-page="10" current-page="3"></ui-pagination></div>
    <div style="width:100%;text-align:center;"><strong style="font-size:12px;text-transform:uppercase;color:#6b7280;">Medium</strong><br><ui-pagination size="md" total-items="100" items-per-page="10" current-page="3"></ui-pagination></div>
    <div style="width:100%;text-align:center;"><strong style="font-size:12px;text-transform:uppercase;color:#6b7280;">Large</strong><br><ui-pagination size="lg" total-items="100" items-per-page="10" current-page="3"></ui-pagination></div>
  </div>
</div>`
  },
  {
    title: 'Button Shapes',
    description: 'Default, rounded, circle, pill, and square button shapes.',
    html: `<div class="demo-block" style="padding: 20px;">
  <h3>Button Shapes</h3>
  <div style="display: flex; flex-direction: column; gap: 20px; align-items: center;">
    <div><small style="color:#6b7280;">Default</small><br><ui-pagination shape="default" total-items="80" items-per-page="8" current-page="3"></ui-pagination></div>
    <div><small style="color:#6b7280;">Rounded</small><br><ui-pagination shape="rounded" total-items="80" items-per-page="8" current-page="3"></ui-pagination></div>
    <div><small style="color:#6b7280;">Circle</small><br><ui-pagination shape="circle" total-items="80" items-per-page="8" current-page="3"></ui-pagination></div>
    <div><small style="color:#6b7280;">Pill</small><br><ui-pagination shape="pill" total-items="80" items-per-page="8" current-page="3"></ui-pagination></div>
  </div>
</div>`
  },
  {
    title: 'Color Themes',
    description: 'Pagination styled with different color themes.',
    html: `<div class="demo-block" style="padding: 20px;">
  <h3>Color Themes</h3>
  <div style="display: flex; flex-direction: column; gap: 20px; align-items: center;">
    <div><small style="color:#6b7280;">Primary</small><br><ui-pagination theme="primary" total-items="60" items-per-page="6" current-page="4"></ui-pagination></div>
    <div><small style="color:#6b7280;">Success</small><br><ui-pagination theme="success" total-items="60" items-per-page="6" current-page="4"></ui-pagination></div>
    <div><small style="color:#6b7280;">Warning</small><br><ui-pagination theme="warning" total-items="60" items-per-page="6" current-page="4"></ui-pagination></div>
    <div><small style="color:#6b7280;">Danger</small><br><ui-pagination theme="danger" total-items="60" items-per-page="6" current-page="4"></ui-pagination></div>
  </div>
</div>`
  },
  {
    title: 'Visual Variants',
    description: 'Soft, filled, outlined, glass, modern, and premium variants.',
    html: `<div class="demo-block" style="padding: 20px;">
  <h3>Visual Variants</h3>
  <div style="display: flex; flex-direction: column; gap: 20px; align-items: center;">
    <div><small style="color:#6b7280;">Default</small><br><ui-pagination variant="default" total-items="60" items-per-page="6" current-page="3"></ui-pagination></div>
    <div><small style="color:#6b7280;">Soft</small><br><ui-pagination variant="soft" total-items="60" items-per-page="6" current-page="3"></ui-pagination></div>
    <div><small style="color:#6b7280;">Filled</small><br><ui-pagination variant="filled" total-items="60" items-per-page="6" current-page="3"></ui-pagination></div>
    <div><small style="color:#6b7280;">Outlined</small><br><ui-pagination variant="outlined" total-items="60" items-per-page="6" current-page="3"></ui-pagination></div>
    <div><small style="color:#6b7280;">Modern</small><br><ui-pagination variant="modern" total-items="60" items-per-page="6" current-page="3"></ui-pagination></div>
    <div><small style="color:#6b7280;">Premium</small><br><ui-pagination variant="premium" total-items="60" items-per-page="6" current-page="3"></ui-pagination></div>
  </div>
</div>`
  },
  {
    title: 'With Progress Indicator',
    description: 'Shows a progress bar reflecting the current page position.',
    html: `<div class="demo-block" style="padding: 20px;">
  <h3>With Progress Bar</h3>
  <div style="display: flex; justify-content: center;">
    <ui-pagination show-progress="true" total-items="100" items-per-page="10" current-page="4"></ui-pagination>
  </div>
</div>`
  },
  {
    title: 'Quick Jump Buttons',
    description: 'Jump forward/back N pages at a time.',
    html: `<div class="demo-block" style="padding: 20px;">
  <h3>Quick Jump (+5 pages)</h3>
  <div style="display: flex; justify-content: center;">
    <ui-pagination quick-jump="true" quick-jump-step="5" total-items="200" items-per-page="10" current-page="10"></ui-pagination>
  </div>
</div>`
  },
  {
    title: 'Indicator Type',
    description: 'Visual page indicator bar instead of numbered buttons.',
    html: `<div class="demo-block" style="padding: 20px;">
  <h3>Indicator Pagination</h3>
  <div style="display: flex; justify-content: center;">
    <ui-pagination type="indicator" total-items="50" items-per-page="5" current-page="2"></ui-pagination>
  </div>
</div>`
  }
];

// ─────────────────────────────────────────────
// LIST — rewrite broken demos; keep good ones intact
// ─────────────────────────────────────────────
demos['list'] = [
  {
    title: 'Simple List',
    description: 'Basic list with programmatic items using lucide icons.',
    html: `<div style="padding: 20px; max-width: 400px;">
  <h3 style="margin-top:0;">Simple List</h3>
  <ui-list id="listBasic"></ui-list>
</div>
<script>
(function() {
  setTimeout(function() {
    var el = document.getElementById('listBasic');
    if (el) el.items = [
      { value: 'home', label: 'Home', icon: 'home' },
      { value: 'profile', label: 'Profile', icon: 'user' },
      { value: 'settings', label: 'Settings', icon: 'settings' },
      { value: 'notifications', label: 'Notifications', icon: 'bell', badge: '3', badgeColor: 'danger' },
      { value: 'logout', label: 'Logout', icon: 'log-out' }
    ];
  }, 50);
})();
</script>`
  },
  {
    title: 'Variants',
    description: 'Text, outlined, filled, and soft visual variants.',
    html: `<div style="padding: 20px; display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 20px;">
  <div>
    <h4 style="margin-top:0;">Text (default)</h4>
    <ui-list id="listV1" variant="text"></ui-list>
  </div>
  <div>
    <h4 style="margin-top:0;">Outlined</h4>
    <ui-list id="listV2" variant="outlined"></ui-list>
  </div>
  <div>
    <h4 style="margin-top:0;">Soft</h4>
    <ui-list id="listV3" variant="soft"></ui-list>
  </div>
</div>
<script>
(function() {
  var items = [
    { value: '1', label: 'Item Alpha', icon: 'circle' },
    { value: '2', label: 'Item Beta', icon: 'circle' },
    { value: '3', label: 'Item Gamma', icon: 'circle' }
  ];
  setTimeout(function() {
    ['listV1','listV2','listV3'].forEach(function(id) {
      var el = document.getElementById(id);
      if (el) el.items = items;
    });
  }, 50);
})();
</script>`
  },
  {
    title: 'Icons & Badges',
    description: 'List items with icons, badge counts, and descriptions.',
    html: `<div style="padding: 20px; max-width: 420px;">
  <h3 style="margin-top:0;">Notifications</h3>
  <ui-list id="listBadges" dividers="true"></ui-list>
</div>
<script>
(function() {
  setTimeout(function() {
    var el = document.getElementById('listBadges');
    if (el) el.items = [
      { value: 'inbox', label: 'Inbox', description: '12 unread messages', icon: 'inbox', counter: 12 },
      { value: 'sent', label: 'Sent', description: 'Last sent 2h ago', icon: 'send' },
      { value: 'drafts', label: 'Drafts', description: '3 drafts saved', icon: 'file-text', counter: 3 },
      { value: 'spam', label: 'Spam', description: 'Move to trash', icon: 'alert-triangle', badge: 'New', badgeColor: 'danger' },
      { value: 'trash', label: 'Trash', description: 'Items older than 30d', icon: 'trash-2', disabled: true }
    ];
  }, 50);
})();
</script>`
  },
  {
    title: 'Searchable List',
    description: 'Filter list items in real-time with a built-in search bar.',
    html: `<div style="padding: 20px; max-width: 420px;">
  <h3 style="margin-top:0;">Searchable Country List</h3>
  <ui-list id="listSearch" searchable="true" search-placeholder="Search countries..."></ui-list>
</div>
<script>
(function() {
  setTimeout(function() {
    var el = document.getElementById('listSearch');
    if (el) el.items = [
      { value: 'us', label: 'United States', description: 'North America', icon: 'map-pin' },
      { value: 'gb', label: 'United Kingdom', description: 'Europe', icon: 'map-pin' },
      { value: 'de', label: 'Germany', description: 'Europe', icon: 'map-pin' },
      { value: 'fr', label: 'France', description: 'Europe', icon: 'map-pin' },
      { value: 'jp', label: 'Japan', description: 'Asia', icon: 'map-pin' },
      { value: 'au', label: 'Australia', description: 'Oceania', icon: 'map-pin' },
      { value: 'ca', label: 'Canada', description: 'North America', icon: 'map-pin' },
      { value: 'br', label: 'Brazil', description: 'South America', icon: 'map-pin' }
    ];
  }, 50);
})();
</script>`
  },
  {
    title: 'Multi-Select',
    description: 'Select multiple items; selected values logged below.',
    html: `<div style="padding: 20px; max-width: 420px;">
  <h3 style="margin-top:0;">Choose Technologies</h3>
  <ui-list id="listMulti" multi-select="true"></ui-list>
  <div id="multiOut" style="margin-top:12px;padding:8px;background:#f3f4f6;border-radius:6px;font-size:13px;">Selected: none</div>
</div>
<script>
(function() {
  setTimeout(function() {
    var el = document.getElementById('listMulti');
    var out = document.getElementById('multiOut');
    if (el) {
      el.items = [
        { value: 'js', label: 'JavaScript' },
        { value: 'ts', label: 'TypeScript' },
        { value: 'react', label: 'React' },
        { value: 'vue', label: 'Vue.js' },
        { value: 'angular', label: 'Angular' }
      ];
      el.addEventListener('listSelectionChange', function(e) {
        if (out) out.textContent = 'Selected: ' + (e.detail.selectedValues || []).join(', ') || 'none';
      });
    }
  }, 50);
})();
</script>`
  },
  {
    title: 'Grouped with Subheaders',
    description: 'Organize items into named groups with subheader dividers.',
    html: `<div style="padding: 20px; max-width: 420px;">
  <h3 style="margin-top:0;">File Explorer</h3>
  <ui-list id="listGrouped"></ui-list>
</div>
<script>
(function() {
  setTimeout(function() {
    var el = document.getElementById('listGrouped');
    if (el) el.items = [
      { value: 'g1', label: 'Documents', type: 'group' },
      { value: 'doc1', label: 'Project Plan.docx', description: 'Modified 2h ago', icon: 'file-text', group: 'g1' },
      { value: 'doc2', label: 'Budget.xlsx', description: 'Modified 1d ago', icon: 'file-text', group: 'g1' },
      { value: 'g2', label: 'Images', type: 'group' },
      { value: 'img1', label: 'Banner.png', description: '2.4 MB', icon: 'image', group: 'g2' },
      { value: 'img2', label: 'Logo.svg', description: '14 KB', icon: 'image', group: 'g2' },
      { value: 'g3', label: 'Videos', type: 'group' },
      { value: 'vid1', label: 'Demo.mp4', description: '120 MB', icon: 'video', group: 'g3' }
    ];
  }, 50);
})();
</script>`
  },
  {
    title: 'Drag to Reorder',
    description: 'Drag list items to change their order.',
    html: `<div style="padding: 20px; max-width: 420px;">
  <h3 style="margin-top:0;">Priority Tasks (drag to reorder)</h3>
  <ui-list id="listDrag" is-draggable="true"></ui-list>
  <div id="dragLog" style="margin-top:10px;font-size:13px;color:#6b7280;"></div>
</div>
<script>
(function() {
  setTimeout(function() {
    var el = document.getElementById('listDrag');
    var log = document.getElementById('dragLog');
    if (el) {
      el.items = [
        { value: 't1', label: '1. Fix critical bug', icon: 'alert-circle' },
        { value: 't2', label: '2. Write unit tests', icon: 'check-square' },
        { value: 't3', label: '3. Code review', icon: 'git-branch' },
        { value: 't4', label: '4. Update docs', icon: 'book-open' },
        { value: 't5', label: '5. Deploy to staging', icon: 'upload-cloud' }
      ];
      el.addEventListener('listReorder', function(e) {
        if (log) log.textContent = 'Reordered: item moved to position ' + (e.detail.newIndex + 1);
      });
    }
  }, 50);
})();
</script>`
  },
  {
    title: 'Paginated List',
    description: 'Large datasets split across pages with built-in pagination.',
    html: `<div style="padding: 20px; max-width: 420px;">
  <h3 style="margin-top:0;">Paginated Items (5 per page)</h3>
  <ui-list id="listPaged" paginated="true" items-per-page="5"></ui-list>
</div>
<script>
(function() {
  setTimeout(function() {
    var el = document.getElementById('listPaged');
    if (el) {
      var items = [];
      for (var i = 1; i <= 25; i++) {
        items.push({ value: 'item' + i, label: 'Item ' + i, description: 'Entry number ' + i, icon: 'list' });
      }
      el.items = items;
    }
  }, 50);
})();
</script>`
  },
  {
    title: 'Virtual Scroll',
    description: '10,000 items rendered efficiently with virtual scrolling.',
    html: `<div style="padding: 20px; max-width: 420px;">
  <h3 style="margin-top:0;">Virtual Scroll — 10,000 Items</h3>
  <ui-list id="listVirtual" virtual="true" max-height="350px" item-height="48"></ui-list>
</div>
<script>
(function() {
  setTimeout(function() {
    var el = document.getElementById('listVirtual');
    if (el) {
      var items = [];
      for (var i = 1; i <= 10000; i++) {
        items.push({ value: 'v' + i, label: 'Virtual Item ' + i, description: 'Row #' + i });
      }
      el.items = items;
    }
  }, 50);
})();
</script>`
  },
  {
    title: 'Selection & Colors',
    description: 'Selectable list with highlighted active item.',
    html: `<div style="padding: 20px; max-width: 420px;">
  <h3 style="margin-top:0;">Team Members</h3>
  <ui-list id="listSelect" selectable="true" selection-header-color="primary"></ui-list>
  <div id="selectLog" style="margin-top:10px;font-size:13px;color:#6b7280;">Click an item to select</div>
</div>
<script>
(function() {
  setTimeout(function() {
    var el = document.getElementById('listSelect');
    var log = document.getElementById('selectLog');
    if (el) {
      el.items = [
        { value: 'alice', label: 'Alice Johnson', description: 'Frontend Lead', icon: 'user' },
        { value: 'bob', label: 'Bob Chen', description: 'Backend Engineer', icon: 'user' },
        { value: 'carol', label: 'Carol Davis', description: 'UX Designer', icon: 'user' },
        { value: 'dan', label: 'Dan Martinez', description: 'DevOps', icon: 'user' }
      ];
      el.addEventListener('listSelectionChange', function(e) {
        var sel = e.detail.selectedItem;
        if (log && sel) log.textContent = 'Selected: ' + sel.label;
      });
    }
  }, 50);
})();
</script>`
  },
  {
    title: 'Loading State',
    description: 'Skeleton placeholder while data is being fetched.',
    html: `<div style="padding: 20px; max-width: 420px;">
  <h3 style="margin-top:0;">Loading State</h3>
  <ui-list id="listLoading" loading="true">
  </ui-list>
  <div style="margin-top:12px;">
    <ui-button id="loadBtn" size="sm" variant="outline">Load Data</ui-button>
  </div>
</div>
<script>
(function() {
  setTimeout(function() {
    var list = document.getElementById('listLoading');
    var btn = document.getElementById('loadBtn');
    if (btn && list) {
      btn.addEventListener('click', function() {
        list.loading = true;
        setTimeout(function() {
          list.items = [
            { value: '1', label: 'Loaded Item 1', icon: 'check' },
            { value: '2', label: 'Loaded Item 2', icon: 'check' },
            { value: '3', label: 'Loaded Item 3', icon: 'check' }
          ];
          list.loading = false;
        }, 1200);
      });
    }
  }, 100);
})();
</script>`
  }
];

writeFileSync(DEMOS_PATH, JSON.stringify(demos, null, 2), 'utf8');
console.log('demos.json patched successfully.');
