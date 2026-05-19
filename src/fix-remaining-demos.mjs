import { readFileSync, writeFileSync } from 'fs';

const DEMOS_PATH = './src/demos.json';
const demos = JSON.parse(readFileSync(DEMOS_PATH, 'utf8'));

// 1. Fix aside demo 2 (Non-Full Layouts / Floating)
demos['aside'][2] = {
  title: 'Non-Full Layouts (Floating)',
  description: 'Floating panels that don\'t span the full height or width. Perfect for feedback widgets or quick toolbars.',
  html: `<div class="demo-block">
  <h3 style="display: flex; align-items: center; gap: 8px;">Non-Full Layouts (Floating)</h3>
  <p style="opacity: 0.7; margin-bottom: 24px;">Floating panels that don't span the full height or width. Perfect for feedback widgets or quick toolbars.</p>
  
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px; margin-bottom: 32px;">
    <div style="background: var(--bg-secondary); border: 1px solid var(--border-default); padding: 24px; border-radius: 16px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);">
      <h4 style="margin-top:0; color: var(--text-primary);">Feedback Widget</h4>
      <p style="font-size:13px; color: var(--text-secondary);">Bottom-aligned floating panel matching industrial survey layouts.</p>
      <ui-button id="btnOpenFeedback" variant="outline" color="success" label="Open Feedback Panel" style="width: 100%"></ui-button>
    </div>
    <div style="background: var(--bg-secondary); border: 1px solid var(--border-default); padding: 24px; border-radius: 16px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);">
      <h4 style="margin-top:0; color: var(--text-primary);">Centered Flyout</h4>
      <p style="font-size:13px; color: var(--text-secondary);">Vertically centered panel on the screen edge.</p>
      <ui-button id="btnOpenCentered" variant="outline" color="success" label="Open Centered Flyout" style="width: 100%"></ui-button>
    </div>
  </div>

  <ui-aside-panel 
    id="feedbackPanel" 
    direction="right" 
    variant="floating" 
    floating-align="end" 
    floating-offset="30px"
    size="450px" 
    secondary-size="650px"
  >
    <div slot="header">
       <div style="display: flex; align-items: center; gap: 10px;">
          <img src="https://www.se.com/favicon.ico" style="width: 24px; height: 24px;">
          <h3 style="margin:0;">Schneider Electric Feedback</h3>
       </div>
    </div>
    <div slot="content">
       <p style="font-weight: bold; margin-bottom: 12px;">How satisfied are you today? *</p>
       <div style="display: flex; justify-content: space-between; gap: 4px; margin-bottom: 24px;">
          <ui-button variant="outline" color="secondary" label="0" size="md" style="flex: 1"></ui-button>
          <ui-button variant="outline" color="secondary" label="1" size="md" style="flex: 1"></ui-button>
          <ui-button variant="outline" color="secondary" label="2" size="md" style="flex: 1"></ui-button>
          <ui-button variant="outline" color="secondary" label="3" size="md" style="flex: 1"></ui-button>
          <ui-button variant="outline" color="secondary" label="4" size="md" style="flex: 1"></ui-button>
          <ui-button variant="outline" color="secondary" label="5" size="md" style="flex: 1"></ui-button>
          <ui-button variant="outline" color="secondary" label="6" size="md" style="flex: 1"></ui-button>
          <ui-button variant="outline" color="secondary" label="7" size="md" style="flex: 1"></ui-button>
          <ui-button variant="outline" color="secondary" label="8" size="md" style="flex: 1"></ui-button>
          <ui-button variant="outline" color="secondary" label="9" size="md" style="flex: 1"></ui-button>
          <ui-button variant="outline" color="secondary" label="10" size="md" style="flex: 1"></ui-button>
       </div>
       
       <div style="display: grid; gap: 16px; margin-bottom: 24px;">
           <ui-input multiline="true" rows="3" label="Could you please describe your recent experience with us?" placeholder="Your thoughts..."></ui-input>
           <ui-input multiline="true" rows="3" label="What suggestions would you recommend?" placeholder="Enhancements..."></ui-input>
       </div>
     
     <div style="display: flex; gap: 10px;">
        <ui-button id="btnCloseFeedback" variant="outline" color="secondary" label="Close" style="flex: 1"></ui-button>
        <ui-button id="btnSubmitFeedback" variant="outline" color="success" label="Submit" style="flex: 1"></ui-button>
     </div>
     
     <p style="text-align: center; font-size: 11px; color: #94a3b8; margin-top: 24px;">Powered by <b>Medallia</b></p>
    </div>
  </ui-aside-panel>

  <ui-aside-panel 
    id="centerFloatPanel" 
    direction="right" 
    variant="floating" 
    floating-align="center" 
    floating-offset="20px"
    size="350px" 
    secondary-size="400px"
    backdrop-blur="4px"
  >
    <div slot="header">
       <div style="display: flex; align-items: center; gap: 8px;">
          <ui-icon name="target" library="lucide" size="18px"></ui-icon>
          <h3 style="margin:0;">Centered Flyout</h3>
       </div>
    </div>
    <div slot="content">
       <p style="color: #64748b; font-size: 14px; line-height: 1.6;">This panel is vertically centered on the screen edge using <code>floating-align="center"</code>.</p>
       <div style="margin-top: 20px; padding: 16px; background: #f1f5f9; border-radius: 12px; font-size: 13px;">
          Perfect for quick tool selections or contextual utilities.
       </div>
    </div>
  </ui-aside-panel>
</div>

<script>
(function() {
  setTimeout(() => {
    document.getElementById('btnOpenFeedback')?.addEventListener('click', () => document.getElementById('feedbackPanel')?.show());
    document.getElementById('btnCloseFeedback')?.addEventListener('click', () => document.getElementById('feedbackPanel')?.hide());
    document.getElementById('btnSubmitFeedback')?.addEventListener('click', () => {
      alert('Feedback Submitted!');
      document.getElementById('feedbackPanel')?.hide();
    });
    document.getElementById('btnOpenCentered')?.addEventListener('click', () => document.getElementById('centerFloatPanel')?.show());
  }, 100);
})();
</script>`
};

// 2. Fix dialog demo 12 (Nested Dialogs)
demos['dialog'][12] = {
  title: 'Nested Dialogs Stack',
  description: 'Nesting dialogs stacked perfectly above each other with appropriate backing overlay constraints.',
  html: `<div class="demo-block">
  <h3>Nested Dialogs Stack</h3>
  <p style="color: #6b7280; margin-bottom: 16px;">Open a dialog that contains a button to open another nested dialog on top.</p>
  <ui-button id="btnOpenParentDialog" variant="filled" color="primary" label="Open Parent Dialog"></ui-button>
  
  <ui-dialog id="parentDialog" title="Parent Dialog (Level 1)" width="500px" icon-library="lucide">
    <div style="padding: 16px;">
      <p style="margin-bottom: 20px;">This is the first level dialog. Click below to open a second dialog on top of this one.</p>
      <div style="display: flex; gap: 12px;">
        <ui-button id="btnOpenChildDialog" variant="filled" color="success" label="Open Child Dialog"></ui-button>
        <ui-button id="btnCloseParentDialog" variant="outline" color="secondary" label="Cancel"></ui-button>
      </div>
    </div>
  </ui-dialog>

  <ui-dialog id="childDialog" title="Child Dialog (Level 2)" width="380px" icon-library="lucide" is-nested="true">
    <div style="padding: 16px;">
      <p style="margin-bottom: 20px;">This is a nested dialog (Level 2) that stacks perfectly above the first dialog.</p>
      <ui-button id="btnCloseChildDialog" variant="filled" color="primary" label="Got It"></ui-button>
    </div>
  </ui-dialog>
</div>

<script>
(function() {
  setTimeout(() => {
    const parentDialog = document.getElementById('parentDialog');
    const childDialog = document.getElementById('childDialog');
    
    document.getElementById('btnOpenParentDialog')?.addEventListener('click', () => parentDialog?.show());
    document.getElementById('btnCloseParentDialog')?.addEventListener('click', () => parentDialog?.hide());
    
    document.getElementById('btnOpenChildDialog')?.addEventListener('click', () => childDialog?.show());
    document.getElementById('btnCloseChildDialog')?.addEventListener('click', () => childDialog?.hide());
  }, 100);
})();
</script>`
};

// 3. Fix divider demo 2 (Stray brace)
let dividerDemo2 = demos['divider'][2].html;
dividerDemo2 = dividerDemo2.replace('updateDividerPlayground();\r\n    }, 100);\r\n    updateDividerPlayground();\r\n  }', 'updateDividerPlayground();\r\n    }, 100);\r\n    updateDividerPlayground();');
dividerDemo2 = dividerDemo2.replace('updateDividerPlayground();\n    }, 100);\n    updateDividerPlayground();\n  }', 'updateDividerPlayground();\n    }, 100);\n    updateDividerPlayground();');
demos['divider'][2].html = dividerDemo2;

// 4. Fix skeleton demo 11 (Interactive Playground)
demos['skeleton'][11] = {
  title: 'Interactive Playground',
  description: 'Configure and generate custom skeleton components in real time.',
  html: `<div class="demo-block">
  <h3>Interactive Playground</h3>
  <p style="color: #6b7280; margin-bottom: 20px;">Toggle props and see the Skeleton in action.</p>
  
  <div style="background: var(--bg-secondary); border: 1px solid var(--border-default); padding: 20px; border-radius: 8px; margin-bottom: 20px; display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 15px;">
    <div style="display:flex; flex-direction:column; gap:5px;">
      <label style="font-weight:600; font-size:12px;">Shape</label>
      <ui-dropdown id="sk-shape" value="rectangle" options='[{"label":"Rectangle","value":"rectangle"},{"label":"Circle","value":"circle"},{"label":"Text Rows","value":"text"}]'></ui-dropdown>
    </div>
    <div style="display:flex; flex-direction:column; gap:5px;">
      <label style="font-weight:600; font-size:12px;">Animation</label>
      <ui-dropdown id="sk-anim" value="pulse" options='[{"label":"Pulse","value":"pulse"},{"label":"Shimmer","value":"shimmer"},{"label":"None","value":"none"}]'></ui-dropdown>
    </div>
    <div style="display:flex; flex-direction:column; gap:5px;">
      <label style="font-weight:600; font-size:12px;">Rows (Text mode)</label>
      <ui-number-input id="sk-rows" value="3" min="1"></ui-number-input>
    </div>
    <div style="display:flex; align-items:center; gap:8px; margin-top:20px;">
      <ui-checkbox id="sk-animated" label="Animated" checked="true"></ui-checkbox>
    </div>
  </div>

  <div id="skeletonPlaygroundPreview" style="background: white; padding: 30px; border: 1px dashed #d1d5db; border-radius: 8px; min-height: 120px; display: flex; align-items: center; justify-content: center;">
    <ui-skeleton id="playground-skeleton" shape="rectangle" width="100%" height="80px" animation-type="pulse" animated="true"></ui-skeleton>
  </div>
</div>

<script>
(function() {
  const el = document.getElementById('playground-skeleton');
  if (!el) return;

  window.updateSkeletonPlayground = () => {
    const shape = document.getElementById('sk-shape').value;
    const anim = document.getElementById('sk-anim').value;
    const rows = parseInt(document.getElementById('sk-rows').value) || 3;
    const animated = document.getElementById('sk-animated').checked;

    el.shape = shape;
    el.animationType = anim;
    el.rows = rows;
    el.animated = animated;

    if (shape === 'circle') {
      el.width = '80px';
      el.height = '80px';
    } else if (shape === 'text') {
      el.width = '100%';
      el.height = 'auto';
    } else {
      el.width = '100%';
      el.height = '80px';
    }
  };

  setTimeout(() => {
    document.getElementById('sk-shape')?.addEventListener('dropdownChange', window.updateSkeletonPlayground);
    document.getElementById('sk-anim')?.addEventListener('dropdownChange', window.updateSkeletonPlayground);
    document.getElementById('sk-rows')?.addEventListener('inputChange', window.updateSkeletonPlayground);
    document.getElementById('sk-animated')?.addEventListener('checkboxChange', window.updateSkeletonPlayground);
    window.updateSkeletonPlayground();
  }, 100);
})();
</script>`
};

// Write back updated demos.json
writeFileSync(DEMOS_PATH, JSON.stringify(demos, null, 2), 'utf8');
console.log('Successfully fixed remaining dynamic component syntax errors!');
