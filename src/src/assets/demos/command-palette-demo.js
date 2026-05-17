const DEMO_COMMANDS = [
  { id: 'new-file', label: 'New File', description: 'Create a new file', icon: '📄', shortcut: '⌘N', group: 'File' },
  { id: 'open-file', label: 'Open File', description: 'Open an existing file', icon: '📂', shortcut: '⌘O', group: 'File' },
  { id: 'save', label: 'Save', description: 'Save the current file', icon: '💾', shortcut: '⌘S', group: 'File' },
  { id: 'save-as', label: 'Save As…', description: 'Save with a new name', icon: '💾', shortcut: '⌘⇧S', group: 'File' },
  { id: 'close', label: 'Close Tab', description: 'Close the current tab', icon: '✕', shortcut: '⌘W', group: 'File' },
  { id: 'find', label: 'Find', description: 'Search in current file', icon: '🔍', shortcut: '⌘F', group: 'Edit' },
  { id: 'replace', label: 'Find & Replace', description: 'Search and replace text', icon: '🔄', shortcut: '⌘H', group: 'Edit' },
  { id: 'undo', label: 'Undo', description: 'Undo last action', icon: '↩', shortcut: '⌘Z', group: 'Edit' },
  { id: 'redo', label: 'Redo', description: 'Redo last action', icon: '↪', shortcut: '⌘⇧Z', group: 'Edit' },
  { id: 'format', label: 'Format Document', description: 'Auto-format the file', icon: '✨', shortcut: '⌥⌘F', group: 'Edit' },
  { id: 'theme-dark', label: 'Dark Theme', description: 'Switch to dark color scheme', icon: '🌙', group: 'View' },
  { id: 'theme-light', label: 'Light Theme', description: 'Switch to light color scheme', icon: '☀️', group: 'View' },
  { id: 'toggle-sidebar', label: 'Toggle Sidebar', description: 'Show or hide sidebar', icon: '⬛', shortcut: '⌘B', group: 'View' },
  { id: 'split-editor', label: 'Split Editor', description: 'Open side by side', icon: '⊞', group: 'View' },
  { id: 'git-commit', label: 'Git Commit', description: 'Commit staged changes', icon: '✔', shortcut: '⌘⏎', group: 'Git' },
  { id: 'git-push', label: 'Git Push', description: 'Push commits to remote', icon: '⬆', group: 'Git' },
  { id: 'git-pull', label: 'Git Pull', description: 'Pull from remote', icon: '⬇', group: 'Git' },
];

export function initCommandPaletteDemo() {
  const container = document.getElementById('command-palette');
  if (!container) return;
  const commandsJson = JSON.stringify(DEMO_COMMANDS);

  container.innerHTML = `
    <div class="demo-wrapper">
      <div class="demo-header-section" style="margin-bottom: 24px;">
        <h2 class="demo-section-title">Command Palette</h2>
        <p class="demo-section-subtitle">Fuzzy-search enabled control center for complex applications.</p>
      </div>

      <div class="demo-block" style="text-align: center; padding: 60px 40px;">
        <div style="max-width: 600px; margin: 0 auto;">
          <p style="font-size: 16px; color: var(--text-secondary); margin-bottom: 32px;">
            Press <kbd style="background: var(--bg-secondary); border: 1px solid var(--border-default); border-radius: 6px; padding: 4px 10px; font-size: 14px; font-family: inherit; font-weight: 700; color: var(--text-primary);">Ctrl/⌘ + K</kbd>
            to activate the command palette globally.
          </p>

          <ui-button id="cp-open-btn" variant="outline" color="primary" label="Open Palette (⌘K)" size="large" style="min-width: 240px;"></ui-button>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-top: 24px;">
        <div class="demo-block" style="margin-bottom: 0;">
          <h4 style="margin: 0 0 16px 0; font-size: 14px; color: var(--text-tertiary); text-transform: uppercase; letter-spacing: 0.5px;">Premium Features</h4>
          <ul style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 12px;">
            ${['🔍 Fuzzy search algorithm', '⌨ Advanced keyboard logic', '📁 Category grouping', '⚡ Shortcut visualization', '🕐 Execution history', '🔲 Focus management'].map(f => `
              <li style="display: flex; align-items: center; gap: 10px; font-size: 14px; color: var(--text-secondary);">
                <span style="color: var(--success-color); font-size: 18px;">•</span> ${f}
              </li>
            `).join('')}
          </ul>
        </div>

        <div class="demo-block" style="margin-bottom: 0;">
          <h4 style="margin: 0 0 16px 0; font-size: 14px; color: var(--text-tertiary); text-transform: uppercase; letter-spacing: 0.5px;">Activity Stream</h4>
          <div id="cp-log" style="font-family: inherit; font-size: 13px; color: var(--text-secondary); max-height: 200px; overflow-y: auto;">
            <div style="color: var(--text-tertiary); font-style: italic;">No commands executed yet...</div>
          </div>
        </div>
      </div>
    </div>

    <ui-command-palette id="demo-palette" commands='${commandsJson.replace(/'/g, '&#39;')}'></ui-command-palette>

    <style>
      .demo-block {
        background: var(--bg-primary);
        padding: 32px;
        border-radius: 20px;
        border: 1px solid var(--border-default);
        box-shadow: var(--shadow-sm);
        margin-bottom: 24px;
      }
      .demo-section-title { font-size: 1.75rem; font-weight: 800; color: var(--text-primary); margin: 0; }
      .demo-section-subtitle { font-size: 1rem; color: var(--text-secondary); margin-top: 4px; }
    </style>
  `;

  const palette = container.querySelector('#demo-palette');
  const openBtn = container.querySelector('#cp-open-btn');
  const log = container.querySelector('#cp-log');

  if (openBtn && palette) {
    openBtn.addEventListener('click', () => palette.show());
  }

  if (palette && log) {
    palette.addEventListener('commandSelect', e => {
      const cmd = e.detail;
      const entry = document.createElement('div');
      entry.style.cssText = 'padding: 8px 12px; margin-bottom: 8px; background: var(--bg-secondary); border-radius: 8px; border-left: 3px solid var(--primary-color); display: flex; align-items: center; gap: 8px;';
      entry.innerHTML = `
        <span style="font-size: 16px;">${cmd.icon || '▶'}</span>
        <span style="font-weight: 600; color: var(--text-primary);">${cmd.label}</span>
        ${cmd.group ? `<span style="color: var(--text-tertiary); font-size: 11px; margin-left: auto;">${cmd.group}</span>` : ''}
      `;
      
      const emptyMsg = log.querySelector('div[style*="italic"]');
      if (emptyMsg) emptyMsg.remove();
      log.prepend(entry);
    });
  }
}
