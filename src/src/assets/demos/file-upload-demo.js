export function initFileUploadDemo() {
  const container = document.getElementById('file-upload');
  if (!container) return;
  container.innerHTML = `
    <div style="max-width: 1000px; margin: 0 auto; display: flex; flex-direction: column; gap: 40px;">
      
      <!-- Section 1: Introduction -->
      <div class="demo-section-header">
        <h2 style="font-size: 24px; font-weight: 800; color: #111827; margin-bottom: 8px;">Managed File Upload</h2>
        <p style="color: #6b7280; font-size: 14px;">Enterprise-grade asset management with manual orchestration, automatic validation, and completion triggers.</p>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); gap: 32px;">
        
        <!-- Manual Orchestration -->
        <div class="demo-card" style="background: white; padding: 24px; border-radius: 20px; border: 1px solid #e5e7eb; box-shadow: 0 4px 12px rgba(0,0,0,0.03);">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px;">
            <h3 style="font-size: 16px; font-weight: 700; color: #111827; margin: 0;">Manual Orchestration</h3>
            <span style="background: #eff6ff; color: #3b82f6; font-size: 11px; font-weight: 700; padding: 4px 10px; border-radius: 20px;">API DRIVEN</span>
          </div>
          <p style="color: #6b7280; font-size: 13px; margin-bottom: 24px;">Uses manual controls for a multi-stage workflow. Users must validate before uploading.</p>
          
          <ui-file-upload
            id="fu-manual"
            label="Security Documents"
            accept=".pdf,.doc,.docx"
            multiple="true"
            auto-upload="false"
            show-validate-button="true"
            show-upload-button="true"
            helper-text="Upload your identification papers (PDF/Word)"
          ></ui-file-upload>
        </div>

        <!-- Auto-Close Lifecycle -->
        <div class="demo-card" style="background: white; padding: 24px; border-radius: 20px; border: 1px solid #e5e7eb; box-shadow: 0 4px 12px rgba(0,0,0,0.03);">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px;">
            <h3 style="font-size: 16px; font-weight: 700; color: #111827; margin: 0;">Auto-Completion Flow</h3>
            <span style="background: #ecfdf5; color: #10b981; font-size: 11px; font-weight: 700; padding: 4px 10px; border-radius: 20px;">SMART</span>
          </div>
          <p style="color: #6b7280; font-size: 13px; margin-bottom: 24px;">Automatically clears the list and signals completion once all files succeed. Perfect for modals.</p>
          
          <ui-file-upload
            id="fu-autoclose"
            variant="button"
            label="Attach Profile CSV"
            accept=".csv"
            auto-close-on-success="true"
            show-upload-button="true"
            auto-upload="false"
          ></ui-file-upload>
          <div id="autoclose-feedback" style="margin-top: 12px; font-size: 12px; color: #10b981; font-weight: 600; min-height: 18px;"></div>
        </div>

      </div>

      <!-- Section 2: Firmware Sideload -->
      <div class="demo-section-header">
        <h2 style="font-size: 20px; font-weight: 700; color: #111827; margin-bottom: 8px;">Firmware Sideload Dashboard</h2>
        <p style="color: #6b7280; font-size: 13px;">Specialized 'sideload' variant with duplicate detection and error cleanup actions.</p>
      </div>

      <div style="background: #f3f4f6; padding: 40px; border-radius: 32px;">
         <ui-file-upload
            variant="sideload"
            header-title="Sideload Firmware"
            accept=".ldx,.dat,.sedp"
            multiple="true"
            auto-upload="false"
         ></ui-file-upload>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 32px;">
        
        <!-- Dropzone Variants -->
        <div class="demo-card" style="background: white; padding: 24px; border-radius: 20px; border: 1px solid #e5e7eb;">
          <h3 style="font-size: 15px; font-weight: 700; margin-bottom: 16px;">Standard Dropzone</h3>
          <ui-file-upload
            label="Gallery Assets"
            accept="image/*"
            multiple="true"
            max-files="4"
            upload-icon="🖼️"
            show-preview="true"
          ></ui-file-upload>
        </div>

        <!-- Variants -->
        <div class="demo-card" style="background: white; padding: 24px; border-radius: 20px; border: 1px solid #e5e7eb;">
          <h3 style="font-size: 15px; font-weight: 700; margin-bottom: 16px;">Triggers</h3>
          <div style="display: flex; flex-direction: column; gap: 24px;">
             <div>
               <div style="font-size: 11px; text-transform: uppercase; color: #9ca3af; font-weight: 700; margin-bottom: 8px;">Compact Picker</div>
               <ui-file-upload variant="compact" label="Quick add" multiple="true"></ui-file-upload>
             </div>
             <div>
               <div style="font-size: 11px; text-transform: uppercase; color: #9ca3af; font-weight: 700; margin-bottom: 8px;">Action Button</div>
               <ui-file-upload variant="button" label="New Upload" upload-icon="📤"></ui-file-upload>
             </div>
          </div>
        </div>

        <!-- Event Logger -->
        <div class="demo-card" style="background: #1e293b; padding: 24px; border-radius: 20px; color: white;">
          <h3 style="font-size: 15px; font-weight: 700; margin-bottom: 16px; color: #94a3b8;">System Events</h3>
          <ui-file-upload 
            id="fu-events" 
            label="Trigger Events" 
            variant="compact"
            multiple="true"
            auto-upload="true"
            style="--text-secondary: #94a3b8; --border-default: #334155; --bg-primary: #1e293b;"
          ></ui-file-upload>
          
          <div id="fu-log" style="margin-top:20px; padding:16px; background: rgba(0,0,0,0.2); border-radius:12px; font-family: 'JetBrains Mono', monospace; font-size:12px; height: 180px; overflow-y:auto; border: 1px solid rgba(255,255,255,0.05);">
            <div style="color: #64748b; font-style: italic;">Listening for signals...</div>
          </div>
        </div>

      </div>
    </div>
  `;

  const evtUploader = document.getElementById('fu-events');
  const log = document.getElementById('fu-log');
  const autoCloseUploader = document.getElementById('fu-autoclose');
  const autoCloseFeedback = document.getElementById('autoclose-feedback');

  // Event logging
  if (evtUploader && log) {
    const addLog = (msg, type = 'info') => {
      const entry = document.createElement('div');
      entry.style.padding = '4px 0';
      entry.style.borderBottom = '1px solid rgba(255,255,255,0.03)';
      
      const colors = {
        info: '#94a3b8',
        success: '#10b981',
        error: '#f43f5e',
        process: '#3b82f6'
      };

      entry.innerHTML = `<span style="color: ${colors[type]}; font-weight: 700;">[${type.toUpperCase()}]</span> ${msg}`;
      log.prepend(entry);
    };

    evtUploader.addEventListener('fileSelect', (e) => {
      addLog(`Selected ${e.detail.length} file(s)`, 'info');
    });

    evtUploader.addEventListener('uploadSuccess', (e) => {
      addLog(`Completed: ${e.detail.name}`, 'success');
    });

    evtUploader.addEventListener('fileRemove', (e) => {
      addLog(`Discarded: ${e.detail}`, 'error');
    });
  }

  // The sideload demo is already rendered via innerHTML at top in this version

  // Auto-close feedback
  if (autoCloseUploader && autoCloseFeedback) {
    autoCloseUploader.addEventListener('allUploadsComplete', () => {
      autoCloseFeedback.textContent = '✓ Process Successful - List Auto-Resetting...';
      setTimeout(() => {
        autoCloseFeedback.textContent = '';
      }, 2500);
    });
  }
}
