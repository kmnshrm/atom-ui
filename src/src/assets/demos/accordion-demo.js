// Accordion Demo - Enhanced with 15+ New Features
export function initAccordionDemo() {
  const section = document.getElementById('accordion');
  if (!section) return;

  section.innerHTML = `
    <p style="margin-top: 0; opacity: 0.7; font-size: 14px; margin-bottom: 24px;">Collapsible content sections with 15+ powerful features including search, drag & drop, nested items, and more.</p>

    <div class="demo-controls-wrapper" style="max-height: 250px; overflow-y: auto; padding: 20px; border-radius: 16px; background: rgba(var(--bg-primary-rgb, 255, 255, 255), 0.5); border: 1px solid rgba(128, 128, 128, 0.1);">
      <div class="demo-grid-wrapper">
        <ui-button id="btnInteractive" label="🎮 Interactive" size="xs" variant="outline"></ui-button>
        <ui-button id="btnBasic" label="Basic" size="xs" variant="outline"></ui-button>
        <ui-button id="btnSubtitle" label="📝 Subtitles" size="xs" variant="outline"></ui-button>
        <ui-button id="btnParagraphs" label="📄 Paragraphs" size="xs" variant="outline"></ui-button>
        <ui-button id="btnSearch" label="🔍 Search" size="xs" variant="outline"></ui-button>
        <ui-button id="btnActions" label="⚡ Actions" size="xs" variant="outline"></ui-button>
        <ui-button id="btnNested" label="🌳 Nested" size="xs" variant="outline"></ui-button>
        <ui-button id="btnDragDrop" label="🎯 Drag & Drop" size="xs" variant="outline"></ui-button>
        <ui-button id="btnPersistence" label="💾 Persistence" size="xs" variant="outline"></ui-button>
        <ui-button id="btnLoading" label="⏳ Loading" size="xs" variant="outline"></ui-button>
        <ui-button id="btnRTL" label="🌍 RTL" size="xs" variant="outline"></ui-button>
        <ui-button id="btnDense" label="📦 Dense" size="xs" variant="outline"></ui-button>
        <ui-button id="btnEvents" label="📡 Events" size="xs" variant="outline"></ui-button>
        <ui-button id="btnControlled" label="🎮 Controlled" size="xs" variant="outline"></ui-button>
        <ui-button id="btnAsync" label="⏳ Async" size="xs" variant="outline"></ui-button>
        <ui-button id="btnSlot" label="🧩 Slots" size="xs" variant="outline"></ui-button>
        <ui-button id="btnEmoji" label="😊 Emojis" size="xs" variant="outline"></ui-button>
        <ui-button id="btnCardList" label="📇 Card List" size="xs" variant="outline"></ui-button>
        <ui-button id="btnDropdown" label="🔽 Dropdown" size="xs" variant="outline"></ui-button>
        <ui-button id="btnAutoScroll" label="📜 Auto Scroll" size="xs" variant="outline"></ui-button>
        <ui-button id="btnPhysics" label="🧬 Physics" size="xs" variant="outline"></ui-button>
        <ui-button id="btnHeadline" label="💡 Headlines" size="xs" variant="outline"></ui-button>
        <ui-button id="btnCollabAI" label="🤖 AI & Collab" size="xs" variant="outline"></ui-button>
        <ui-button id="btnSuccess" label="✨ Success" size="xs" variant="outline"></ui-button>
        <ui-button id="btnSelection" label="📍 Selection" size="xs" variant="outline"></ui-button>
        <ui-button id="btnGodTier" label="⚡ God-Tier" size="xs" variant="outline"></ui-button>
        <ui-button id="btnZenith" label="🛠️ Zenith" size="xs" variant="outline"></ui-button>
        <ui-button id="btnVeto" label="🚥 Veto" size="xs" variant="outline"></ui-button>
      </div>
    </div>

    <div id="accordionDemoContainer" style="margin-top: 32px; padding: 32px; background: linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%); border-radius: 24px; border: 1px solid #dcfce7; box-shadow: 0 10px 25px -5px rgba(16, 185, 129, 0.05);"></div>
  `;

  // Map of buttons to functions
  const demoMap = {
    btnInteractive: showInteractiveAccordion,
    btnBasic: showBasicAccordion,
    btnSubtitle: showSubtitleAccordion,
    btnParagraphs: showParagraphAccordion,
    btnSearch: showSearchAccordion,
    btnActions: showActionsAccordion,
    btnNested: showNestedAccordion,
    btnDragDrop: showDragDropAccordion,
    btnPersistence: showPersistenceAccordion,
    btnLoading: showLoadingAccordion,
    btnRTL: showRTLAccordion,
    btnDense: showDenseAccordion,
    btnEvents: showEventsAccordion,
    btnControlled: showControlledAccordion,
    btnAsync: showAsyncAccordion,
    btnSlot: showSlotAccordion,
    btnEmoji: showEmojiAccordion,
    btnCardList: showCardListAccordion,
    btnDropdown: showDropdownInAccordion,
    btnAutoScroll: showAutoScrollAccordion,
    btnPhysics: showPhysicsAccordion,
    btnHeadline: showHeadlineDemo,
    btnCollabAI: showCollabAIDemo,
    btnSuccess: showSuccessAccordion,
    btnSelection: showSelectionDemo,
    btnGodTier: showGodTierDemo,
    btnZenith: showZenithControls,
    btnVeto: showVetoAccordion,
  };

  const updateActiveDemoButton = selectedId => {
    Object.keys(demoMap).forEach(id => {
      const btn = document.getElementById(id);
      if (btn) {
        btn.selected = id === selectedId;
      }
    });
  };

  setTimeout(() => {
    // Attach event listeners to all buttons
    Object.keys(demoMap).forEach(id => {
      const btn = document.getElementById(id);
      if (btn) {
        btn.addEventListener('click', () => {
          const func = demoMap[id];
          if (func) {
            func();
            updateActiveDemoButton(id);
          }
        });
      }
    });

    // Default view
    updateActiveDemoButton('btnBasic');
    showBasicAccordion();
  }, 100);

  // ── Demo Functions ──────────────────────────────────────────────────────────

  function showBasicAccordion() {
    const container = document.getElementById('accordionDemoContainer');
    if (!container) return;

    container.innerHTML = `
      <div class="demo-block">
        <h3>Basic Accordion</h3>
        <ui-accordion id="basicAccordion" icon-library="lucide"></ui-accordion>
      </div>
    `;

    setTimeout(() => {
      const accordion = document.getElementById('basicAccordion');
      if (accordion) {
        accordion.items = [
          {
            id: 'item1',
            title: 'What is Stencil?',
            content: 'Stencil is a toolchain for building reusable, scalable Design Systems. It generates Web Components that can be used in any framework or no framework at all.',
            icon: 'info',
          },
          {
            id: 'item2',
            title: 'Why use Web Components?',
            content: '<ul style="margin:0;"><li>Web Components standard</li><li>TypeScript support</li><li>Framework agnostic</li><li>Lazy loading</li><li>Pre-rendering</li></ul>',
            icon: 'zap',
          },
          {
            id: 'item3',
            title: 'Getting Started',
            content: 'Install Stencil CLI with <code>npm init stencil</code> and choose a starter template. Then run <code>npm start</code> to begin development.',
            icon: 'rocket',
          },
        ];
        accordion.defaultOpen = ['item1'];
      }
    }, 50);
  }

  // Subtitle Accordion
  function showSubtitleAccordion() {
    const container = document.getElementById('accordionDemoContainer');
    if (!container) return;

    container.innerHTML = `
      <div class="demo-block">
        <h3>📝 Accordion with Subtitles</h3>
        <p style="color: #6b7280; margin-bottom: 16px;">Each item can have a subtitle for additional context.</p>
        <ui-accordion id="subtitleAccordion" icon-library="lucide"></ui-accordion>
      </div>
    `;

    setTimeout(() => {
      const accordion = document.getElementById('subtitleAccordion');
      if (accordion) {
        accordion.items = [
          {
            id: 'profile',
            title: 'User Profile',
            subtitle: 'Manage your personal information',
            content: 'Update your name, email, avatar, and other profile details here.',
            icon: 'user',
          },
          {
            id: 'security',
            title: 'Security Settings',
            subtitle: 'Password, 2FA, and login history',
            content: 'Configure two-factor authentication, change your password, and review recent login activity.',
            icon: 'lock',
          },
          {
            id: 'notifications',
            title: 'Notifications',
            subtitle: 'Email and push notification preferences',
            content: 'Choose which notifications you want to receive and how you want to be notified.',
            icon: 'bell',
            badge: 3,
          },
        ];
      }
    }, 50);
  }

  // Search Accordion
  function showSearchAccordion() {
    const container = document.getElementById('accordionDemoContainer');
    if (!container) return;

    container.innerHTML = `
      <div class="demo-block">
        <h3>🔍 Accordion with Search</h3>
        <p style="color: #6b7280; margin-bottom: 16px;">Filter items in real-time with search highlighting.</p>
        <ui-accordion id="searchAccordion" enable-search="true" multiple="true" icon-library="lucide"></ui-accordion>
      </div>
    `;

    setTimeout(() => {
      const accordion = document.getElementById('searchAccordion');
      if (accordion) {
        accordion.items = JSON.stringify([
          {
            id: 'react',
            title: 'React',
            subtitle: 'A JavaScript library for building user interfaces',
            content: 'React makes it painless to create interactive UIs. Design simple views for each state in your application.',
            icon: 'layers',
          },
          {
            id: 'vue',
            title: 'Vue.js',
            subtitle: 'The Progressive JavaScript Framework',
            content: 'Vue is a progressive framework for building user interfaces. It is designed to be incrementally adoptable.',
            icon: 'heart',
          },
          {
            id: 'angular',
            title: 'Angular',
            subtitle: 'Platform for building mobile and desktop web applications',
            content: 'Angular is a platform and framework for building single-page client applications using HTML and TypeScript.',
            icon: 'triangle',
          },
          {
            id: 'svelte',
            title: 'Svelte',
            subtitle: 'Cybernetically enhanced web apps',
            content: 'Svelte is a radical new approach to building user interfaces. It shifts work into a compile step.',
            icon: 'flame',
          },
        ]);
      }
    }, 50);
  }

  // Actions Accordion
  function showActionsAccordion() {
    const container = document.getElementById('accordionDemoContainer');
    if (!container) return;

    container.innerHTML = `
      <div class="demo-block">
        <h3>⚡ Accordion with Action Buttons</h3>
        <p style="color: #6b7280; margin-bottom: 16px;">Add interactive buttons to accordion headers.</p>
        <ui-accordion id="actionsAccordion" icon-library="lucide"></ui-accordion>
        <div id="actionLog" style="margin-top: 16px; padding: 12px; background: #f3f4f6; border-radius: 6px; font-size: 13px; max-height: 150px; overflow-y: auto;"></div>
      </div>
    `;

    setTimeout(() => {
      const accordion = document.getElementById('actionsAccordion');
      const actionLog = document.getElementById('actionLog');

      if (accordion) {
        accordion.items = JSON.stringify([
          {
            id: 'doc1',
            title: 'Project Proposal.docx',
            subtitle: 'Last modified: 2 hours ago',
            content: 'This is the main project proposal document containing all requirements and specifications.',
            icon: 'file',
            actions: [
              { id: 'edit', label: 'Edit', icon: 'pencil' },
              { id: 'share', label: 'Share', icon: 'link' },
              { id: 'delete', label: 'Delete', icon: 'trash-2' },
            ],
          },
          {
            id: 'doc2',
            title: 'Budget Report.xlsx',
            subtitle: 'Last modified: 1 day ago',
            content: 'Financial budget report for Q1 2024 with detailed breakdowns.',
            icon: 'bar-chart-2',
            actions: [
              { id: 'download', label: 'Download', icon: 'download' },
              { id: 'print', label: 'Print', icon: 'printer' },
            ],
          },
        ]);

        // Listen to action events
        accordion.addEventListener('accordionAction', e => {
          const { itemId, actionId, action } = e.detail;
          const logEntry = document.createElement('div');
          logEntry.style.marginBottom = '4px';
          logEntry.innerHTML = `<strong>${new Date().toLocaleTimeString()}</strong>: Action "${action.label}" (${actionId}) clicked on item "${itemId}"`;
          actionLog.prepend(logEntry);
        });
      }
    }, 50);
  }

  // Nested Accordion
  function showNestedAccordion() {
    const container = document.getElementById('accordionDemoContainer');
    if (!container) return;

    container.innerHTML = `
      <div class="demo-block">
        <h3>🌳 Nested Accordion with Visual Guides</h3>
        <p style="color: #6b7280; margin-bottom: 16px;">Create hierarchical structures with Apex-tier visual nesting guides (vertical connecting lines).</p>
        <ui-accordion id="nestedAccordion" enable-nested="true" multiple="true" icon-library="lucide"></ui-accordion>
      </div>
    `;

    setTimeout(() => {
      const accordion = document.getElementById('nestedAccordion');
      if (accordion) {
        accordion.items = JSON.stringify([
          {
            id: 'frontend',
            title: 'Frontend Development',
            subtitle: '3 subcategories',
            content: 'All frontend-related topics and resources.',
            icon: 'palette',
            children: [
              {
                id: 'html',
                title: 'HTML',
                content: 'HyperText Markup Language - the standard markup language for Web pages.',
                icon: 'file-text',
              },
              {
                id: 'css',
                title: 'CSS',
                content: 'Cascading Style Sheets - describes how HTML elements are to be displayed.',
                icon: 'palette',
              },
              {
                id: 'js',
                title: 'JavaScript',
                content: 'Programming language that enables interactive web pages.',
                icon: 'zap',
              },
            ],
          },
          {
            id: 'backend',
            title: 'Backend Development',
            subtitle: '2 subcategories',
            content: 'Server-side development topics.',
            icon: 'settings',
            children: [
              {
                id: 'nodejs',
                title: 'Node.js',
                content: "JavaScript runtime built on Chrome's V8 JavaScript engine.",
                icon: 'heart',
              },
              {
                id: 'databases',
                title: 'Databases',
                content: 'SQL and NoSQL database systems.',
                icon: 'database',
              },
            ],
          },
        ]);
      }
    }, 50);
  }

  // Drag & Drop Accordion
  function showDragDropAccordion() {
    const container = document.getElementById('accordionDemoContainer');
    if (!container) return;

    container.innerHTML = `
      <div class="demo-block">
        <h3>🎯 Drag & Drop Reordering</h3>
        <p style="color: #6b7280; margin-bottom: 16px;">Drag items to reorder them.</p>
        <ui-accordion id="dragDropAccordion" enable-drag-drop="true" icon-library="lucide"></ui-accordion>
        <div id="reorderLog" style="margin-top: 16px; padding: 12px; background: #f3f4f6; border-radius: 6px; font-size: 13px;"></div>
      </div>
    `;

    setTimeout(() => {
      const accordion = document.getElementById('dragDropAccordion');
      const reorderLog = document.getElementById('reorderLog');

      if (accordion) {
        accordion.items = JSON.stringify([
          { id: 'task1', title: '1. First Task', content: 'Complete project setup', icon: 'clipboard-list' },
          { id: 'task2', title: '2. Second Task', content: 'Design UI mockups', icon: 'palette' },
          { id: 'task3', title: '3. Third Task', content: 'Implement features', icon: 'settings' },
          { id: 'task4', title: '4. Fourth Task', content: 'Testing and QA', icon: 'check-circle' },
        ]);

        accordion.addEventListener('accordionReorder', e => {
          const { itemId, oldIndex, newIndex } = e.detail;
          reorderLog.innerHTML = `<strong>Reordered:</strong> Item "${itemId}" moved from position ${oldIndex + 1} to ${newIndex + 1}`;
        });
      }
    }, 50);
  }

  // Persistence Accordion
  function showPersistenceAccordion() {
    const container = document.getElementById('accordionDemoContainer');
    if (!container) return;

    container.innerHTML = `
      <div class="demo-block">
        <h3>💾 Accordion with Persistence</h3>
        <p style="color: #6b7280; margin-bottom: 16px;">Your open/closed state is saved to localStorage. Try refreshing the page!</p>
        <ui-accordion id="persistenceAccordion" enable-persistence="true" persistence-key="demo-accordion-state" multiple="true" icon-library="lucide"></ui-accordion>
      </div>
    `;

    setTimeout(() => {
      const accordion = document.getElementById('persistenceAccordion');
      if (accordion) {
        accordion.items = JSON.stringify([
          { id: 'p1', title: 'Persistent Item 1', content: 'This state is saved!', icon: 'save' },
          { id: 'p2', title: 'Persistent Item 2', content: 'Try opening/closing and refreshing.', icon: 'refresh-cw' },
          { id: 'p3', title: 'Persistent Item 3', content: 'Your preferences are remembered.', icon: 'star' },
        ]);
      }
    }, 50);
  }

  // Loading Accordion
  function showLoadingAccordion() {
    const container = document.getElementById('accordionDemoContainer');
    if (!container) return;

    container.innerHTML = `
      <div class="demo-block">
        <h3>⏳ Accordion with Loading States</h3>
        <p style="color: #6b7280; margin-bottom: 16px;">Show loading indicators for async operations.</p>
        <ui-accordion id="loadingAccordion" icon-library="lucide"></ui-accordion>
      </div>
    `;

    setTimeout(() => {
      const accordion = document.getElementById('loadingAccordion');
      if (accordion) {
        accordion.items = JSON.stringify([
          { id: 'load1', title: 'Loaded Item', content: 'This item is fully loaded.', icon: 'check-circle' },
          { id: 'load2', title: 'Loading Item', content: 'This item is loading...', icon: 'loader', loading: true },
          { id: 'load3', title: 'Another Item', content: 'Normal item.', icon: 'file' },
        ]);
      }
    }, 50);
  }

  // RTL Accordion
  function showRTLAccordion() {
    const container = document.getElementById('accordionDemoContainer');
    if (!container) return;

    container.innerHTML = `
      <div class="demo-block">
        <h3>🌍 Right-to-Left (RTL) Support</h3>
        <p style="color: #6b7280; margin-bottom: 16px;">Full support for RTL languages like Arabic and Hebrew.</p>
        <ui-accordion id="rtlAccordion" rtl="true" icon-library="lucide"></ui-accordion>
      </div>
    `;

    setTimeout(() => {
      const accordion = document.getElementById('rtlAccordion');
      if (accordion) {
        accordion.items = JSON.stringify([
          { id: 'rtl1', title: 'مرحبا بك (Welcome)', content: 'This is RTL mode with Arabic text support.', icon: 'globe' },
          { id: 'rtl2', title: 'שלום (Hello)', content: 'Hebrew text is also supported in RTL mode.', icon: 'book' },
          { id: 'rtl3', title: 'RTL Layout', content: 'All elements are properly aligned for right-to-left reading.', icon: 'arrow-right' },
        ]);
      }
    }, 50);
  }

  // Dense Accordion
  function showDenseAccordion() {
    const container = document.getElementById('accordionDemoContainer');
    if (!container) return;

    container.innerHTML = `
      <div class="demo-block">
        <h3>📦 Dense/Compact Mode</h3>
        <p style="color: #6b7280; margin-bottom: 16px;">Reduced spacing for data-heavy interfaces.</p>
        <ui-accordion id="denseAccordion" dense="true" multiple="true" icon-library="lucide"></ui-accordion>
      </div>
    `;

    setTimeout(() => {
      const accordion = document.getElementById('denseAccordion');
      if (accordion) {
        accordion.items = JSON.stringify([
          { id: 'd1', title: 'Compact Item 1', subtitle: 'Less padding', content: 'Dense mode uses less spacing.', icon: 'package' },
          { id: 'd2', title: 'Compact Item 2', subtitle: 'Smaller fonts', content: 'Perfect for dashboards.', icon: 'bar-chart-2' },
          { id: 'd3', title: 'Compact Item 3', subtitle: 'More content', content: 'Fit more on screen.', icon: 'trending-up' },
          { id: 'd4', title: 'Compact Item 4', subtitle: 'Efficient layout', content: 'Optimized spacing.', icon: 'zap' },
        ]);
      }
    }, 50);
  }

  // Events Accordion
  function showEventsAccordion() {
    const container = document.getElementById('accordionDemoContainer');
    if (!container) return;

    container.innerHTML = `
      <div class="demo-block">
        <h3>📡 Animation Lifecycle Events</h3>
        <p style="color: #6b7280; margin-bottom: 16px;">Listen to beforeOpen, afterOpen, beforeClose, afterClose events.</p>
        <ui-accordion id="eventsAccordion" icon-library="lucide"></ui-accordion>
        <div id="eventLog" style="margin-top: 16px; padding: 12px; background: #f3f4f6; border-radius: 6px; font-size: 13px; max-height: 200px; overflow-y: auto;"></div>
      </div>
    `;

    setTimeout(() => {
      const accordion = document.getElementById('eventsAccordion');
      const eventLog = document.getElementById('eventLog');

      if (accordion) {
        accordion.items = JSON.stringify([
          { id: 'e1', title: 'Event Item 1', content: 'Click to trigger events.', icon: 'rss' },
          { id: 'e2', title: 'Event Item 2', content: 'Watch the log below.', icon: 'eye' },
          { id: 'e3', title: 'Event Item 3', content: 'All events are captured.', icon: 'sparkles' },
        ]);

        const logEvent = (eventName, detail) => {
          const entry = document.createElement('div');
          entry.style.marginBottom = '4px';
          entry.innerHTML = `<strong>${new Date().toLocaleTimeString()}</strong>: <span style="color: #10b981;">${eventName}</span> - Item: ${detail.itemId}`;
          eventLog.prepend(entry);
        };

        accordion.addEventListener('beforeOpen', e => logEvent('beforeOpen', e.detail));
        accordion.addEventListener('afterOpen', e => logEvent('afterOpen', e.detail));
        accordion.addEventListener('beforeClose', e => logEvent('beforeClose', e.detail));
        accordion.addEventListener('afterClose', e => logEvent('afterClose', e.detail));
      }
    }, 50);
  }

  // Controlled Accordion
  function showControlledAccordion() {
    const container = document.getElementById('accordionDemoContainer');
    if (!container) return;

    container.innerHTML = `
      <div class="demo-block">
        <h3>🎮 Controlled Mode</h3>
        <p style="color: #6b7280; margin-bottom: 16px;">Control the state of the accordion from outside (Parent controls children).</p>
        
        <div style="margin-bottom: 20px; display: flex; gap: 12px; flex-wrap: wrap;">
          <ui-button id="ctrlOpen1" variant="outline" color="primary" label="Open Item 1" size="md"></ui-button>
          <ui-button id="ctrlOpen2" variant="outline" color="primary" label="Open Item 2" size="md"></ui-button>
          <ui-button id="ctrlOpen13" variant="outline" color="primary" label="Open 1 & 3" size="md"></ui-button>
          <ui-button id="ctrlCloseAll" variant="ghost" color="secondary" label="Close All" size="md"></ui-button>
        </div>

        <ui-accordion id="controlledAccordion" multiple="true" icon-library="lucide"></ui-accordion>
        <div id="controlledLog" style="margin-top: 10px; font-size: 13px; color: #6b7280; padding: 10px; background: #f9fafb; border-radius: 6px;">Current External State: []</div>
      </div>
    `;

    // Global helper for the buttons above
    window.setAccordionState = ids => {
      const accordion = document.getElementById('controlledAccordion');
      if (accordion) {
        accordion.expandedItems = ids;
        document.getElementById('controlledLog').textContent = `Current External State: [${ids.join(', ')}]`;
      }
    };

    setTimeout(() => {
      const b1 = document.getElementById('ctrlOpen1');
      const b2 = document.getElementById('ctrlOpen2');
      const b13 = document.getElementById('ctrlOpen13');
      const bAll = document.getElementById('ctrlCloseAll');

      if (b1) b1.addEventListener('click', () => window.setAccordionState(['c1']));
      if (b2) b2.addEventListener('click', () => window.setAccordionState(['c2']));
      if (b13) b13.addEventListener('click', () => window.setAccordionState(['c1', 'c3']));
      if (bAll) bAll.addEventListener('click', () => window.setAccordionState([]));
    }, 50);

    setTimeout(() => {
      const accordion = document.getElementById('controlledAccordion');
      if (accordion) {
        accordion.items = JSON.stringify([
          { id: 'c1', title: 'Controlled Item 1', content: 'I am controlled by buttons above.', icon: 'gamepad' },
          { id: 'c2', title: 'Controlled Item 2', content: 'Me too!', icon: 'gamepad-2' },
          { id: 'c3', title: 'Controlled Item 3', content: 'We can be opened together.', icon: 'dices' },
        ]);

        accordion.addEventListener('accordionChange', e => {
          const log = document.getElementById('controlledLog');
          if (log) log.textContent = `Internal Change Event: ${e.detail.itemId} is now ${e.detail.isOpen ? 'Open' : 'Closed'}`;
        });
      }
    }, 50);
  }

  // Async & Lazy Accordion
  function showAsyncAccordion() {
    const container = document.getElementById('accordionDemoContainer');
    if (!container) return;

    container.innerHTML = `
      <div class="demo-block">
        <h3>⏳ Async Data & Lazy Rendering</h3>
        <p style="color: #6b7280; margin-bottom: 16px;">Simulated API call with Skeleton loading state and Lazy rendered content.</p>
        
        <ui-button id="btnReloadAsync" variant="outline" color="primary" label="↻ Reload Data" size="md" style="margin-bottom: 16px;"></ui-button>

        <ui-accordion id="asyncAccordion" lazy="true" icon-library="lucide"></ui-accordion>
      </div>
    `;

    window.reloadAsyncData = () => {
      const accordion = document.getElementById('asyncAccordion');
      if (!accordion) return;

      accordion.loading = true; // Show skeleton
      accordion.items = '[]'; // Clear items

      setTimeout(() => {
        accordion.items = JSON.stringify([
          { id: 'a1', title: 'Fetched Data 1', content: 'This content was "fetched" from an API.', icon: 'cloud' },
          { id: 'a2', title: 'Fetched Data 2', content: 'Lazy prop means this DOM was not created until you opened me.', icon: 'zap' },
          { id: 'a3', title: 'Fetched Data 3', content: 'Heavy content is good for lazy rendering.', icon: 'package' },
        ]);
        accordion.loading = false; // Hide skeleton
      }, 2000);
    };

    // Trigger initial load
    setTimeout(() => {
      const btn = document.getElementById('btnReloadAsync');
      if (btn) btn.addEventListener('click', () => window.reloadAsyncData());
      window.reloadAsyncData();
    }, 100);
  }

  // Slot Content Accordion
  function showSlotAccordion() {
    const container = document.getElementById('accordionDemoContainer');
    if (!container) return;

    container.innerHTML = `
      <div class="demo-block">
        <h3>🧩 Accordion with Slotted Content</h3>
        <p style="color: #6b7280; margin-bottom: 16px;">Use slots to inject complex HTML content into accordion items. If the <code>content</code> property is omitted in the item data, the accordion will automatically look for a slot named <code>content-{id}</code>.</p>
        
        <ui-accordion id="slotAccordion" icon-library="lucide" multiple="true">
          <!-- Custom Content for Item 1 -->
          <div slot="content-slot1" style="padding: 16px; background: #f0f9ff; border: 1px solid #bae6fd; border-radius: 8px;">
            <div style="display: flex; gap: 16px; align-items: flex-start;">
              <div style="width: 48px; height: 48px; background: #0ea5e9; border-radius: 12px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; color: white;">🌟</div>
              <div>
                <h4 style="margin: 0 0 8px 0; color: #0369a1;">Rich HTML Content</h4>
                <p style="margin: 0 0 12px 0; font-size: 0.9em; color: #334155; line-height: 1.5;">
                  This entire block is passed via a named slot. You can include buttons, images, or even other components here.
                </p>
                <div style="display: flex; gap: 8px;">
                  <ui-button variant="outline" color="primary" label="Primary Action" size="xs"></ui-button>
                  <ui-button variant="outline" color="secondary" label="Secondary" size="xs"></ui-button>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Custom Content for Item 2 -->
          <div slot="content-slot2" style="background: #f8fafc; border-radius: 8px; overflow: hidden; border: 1px solid #e2e8f0;">
             <div style="padding: 12px; background: #f1f5f9; border-bottom: 1px solid #e2e8f0; font-weight: 600; font-size: 0.9em;">
               User Details
             </div>
             <table style="width: 100%; border-collapse: collapse; font-size: 0.9em;">
               <tr style="border-bottom: 1px solid #f1f5f9;"><td style="padding: 8px 12px; color: #64748b;">Name</td><td style="padding: 8px 12px; font-weight: 500;">John Doe</td></tr>
               <tr style="border-bottom: 1px solid #f1f5f9;"><td style="padding: 8px 12px; color: #64748b;">Email</td><td style="padding: 8px 12px; font-weight: 500;">john@example.com</td></tr>
               <tr><td style="padding: 8px 12px; color: #64748b;">Status</td><td style="padding: 8px 12px;"><span style="padding: 2px 8px; background: #dcfce7; color: #166534; border-radius: 12px; font-size: 0.8em;">Active</span></td></tr>
             </table>
          </div>
        </ui-accordion>
      </div>
    `;

    setTimeout(() => {
      const accordion = document.getElementById('slotAccordion');
      if (accordion) {
        accordion.items = JSON.stringify([
          {
            id: 'slot1',
            title: 'Rich Content Item',
            subtitle: 'This item uses slot="content-slot1"',
            icon: 'layout',
            // No content property -> uses slot
          },
          {
            id: 'slot2',
            title: 'Table Layout Item',
            subtitle: 'This item uses slot="content-slot2"',
            icon: 'table',
            // No content property -> uses slot
          },
          {
            id: 'normal',
            title: 'Standard Item',
            subtitle: 'This just uses the content property',
            content: 'I am a standard string content. I am boring compared to my siblings.',
            icon: 'file-text',
          },
        ]);
        accordion.defaultOpen = JSON.stringify(['slot1', 'normal']);
      }
    }, 50);
  }

  // Emoji Icons Accordion
  function showEmojiAccordion() {
    const container = document.getElementById('accordionDemoContainer');
    if (!container) return;

    container.innerHTML = `
      <div class="demo-block">
        <h3>😊 Emoji Icons</h3>
        <p style="color: #6b7280; margin-bottom: 16px;">Use any Unicode emoji as an accordion item icon via <code>iconLibrary: 'emoji'</code>. Emoji render in full colour using the platform's native emoji font.</p>
        <ui-accordion id="emojiAccordion" icon-library="emoji" multiple="true"></ui-accordion>
      </div>
    `;

    setTimeout(() => {
      const accordion = document.getElementById('emojiAccordion');
      if (accordion) {
        accordion.items = JSON.stringify([
          {
            id: 'emoji1',
            title: 'Rocket Launch',
            subtitle: 'High-priority feature',
            content: 'Emoji icons render natively using the platform emoji font — no icon library CDN needed.',
            icon: '🚀',
            iconLibrary: 'emoji',
            badge: 2,
          },
          {
            id: 'emoji2',
            title: 'Fire Alert',
            subtitle: 'Critical bug',
            content: "Each item can specify its own emoji independently via the <code>iconLibrary</code> field, or inherit from the accordion's <code>icon-library</code> prop.",
            icon: '🔥',
            iconLibrary: 'emoji',
          },
          {
            id: 'emoji3',
            title: 'Celebration',
            subtitle: 'Release milestone',
            content: "Emojis scale perfectly because they are text — set <code>size</code> on the accordion items or rely on the accordion's font-size cascade.",
            icon: '🎉',
            iconLibrary: 'emoji',
            badge: 1,
          },
          {
            id: 'emoji4',
            title: 'Idea / Research',
            subtitle: 'New proposal',
            content: 'Mix emoji with any other icon library: set <code>icon-library="emoji"</code> globally and override individual items as needed.',
            icon: '💡',
            iconLibrary: 'emoji',
          },
          {
            id: 'emoji5',
            title: 'Security & Access',
            subtitle: 'Permissions review',
            content:
              'The <code>color</code> prop on <code>ui-icon</code> is automatically set to <code>unset</code> when <code>library="emoji"</code> so the native emoji palette is always preserved.',
            icon: '🔐',
            iconLibrary: 'emoji',
          },
        ]);
        accordion.defaultOpen = JSON.stringify(['emoji1']);
      }
    }, 50);
  }

  // Card List Accordion (Navigation Style)
  function showCardListAccordion() {
    const container = document.getElementById('accordionDemoContainer');
    if (!container) return;

    container.innerHTML = `
      <div class="demo-block">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 24px;">
          <div>
            <h3 style="margin: 0; font-size: 1.5rem; font-weight: 800; color: #111827;">📇 Card List Variant</h3>
            <p style="color: #6b7280; margin-top: 4px;">Premium navigation-style accordion with tinted icon pills and separated cards.</p>
          </div>
          <div style="display: flex; gap: 8px;">
            <ui-button id="swatchGreen" icon-only shape="circle" size="xxs" style="background: #10b981; --color-solid: #10b981;"></ui-button>
            <ui-button id="swatchBlue" icon-only shape="circle" size="xxs" style="background: #6366f1; --color-solid: #6366f1;"></ui-button>
            <ui-button id="swatchRed" icon-only shape="circle" size="xxs" style="background: #f43f5e; --color-solid: #f43f5e;"></ui-button>
          </div>
        </div>

        <ui-accordion id="cardListAccordion" variant="card-list" selected-header-color="#10b981" multiple="false"></ui-accordion>
      </div>
    `;

    window.changeCardListColor = function (color) {
      const acc = document.getElementById('cardListAccordion');
      if (acc) acc.selectedHeaderColor = color;
    };

    setTimeout(() => {
      const sg = document.getElementById('swatchGreen');
      const sb = document.getElementById('swatchBlue');
      const sr = document.getElementById('swatchRed');
      if (sg) sg.addEventListener('click', () => window.changeCardListColor('#10b981'));
      if (sb) sb.addEventListener('click', () => window.changeCardListColor('#6366f1'));
      if (sr) sr.addEventListener('click', () => window.changeCardListColor('#f43f5e'));
    }, 50);

    setTimeout(() => {
      const accordion = document.getElementById('cardListAccordion');
      if (accordion) {
        accordion.items = JSON.stringify([
          {
            id: 'guide1',
            title: 'Getting Started',
            subtitle: 'Design philosophy and core concepts',
            content:
              'Learn how to integrate our Stencil-based components into your workflow. We support React, Angular, Vue, and Vanilla JS out of the box with zero configuration required.',
            icon: 'rocket',
            iconLibrary: 'lucide',
          },
          {
            id: 'guide2',
            title: 'Installation',
            subtitle: 'Step-by-step setup and dependencies',
            content:
              'Install via NPM or use our CDN for quick prototyping. This component library is highly optimized for bundles with dead-code elimination and efficient lazy loading.',
            icon: 'download',
            iconLibrary: 'lucide',
          },
          {
            id: 'guide3',
            title: 'Usage Guide',
            subtitle: 'Principles for implementing components',
            content:
              'Our API is consistent and intuitive. Every component follows standard accessibility rules (ARIA), supports RTS/LTR, and comes with comprehensive TypeScript definitions.',
            icon: 'terminal',
            iconLibrary: 'lucide',
          },
          {
            id: 'guide4',
            title: 'Advanced Tips',
            subtitle: 'Performance tuning and custom theming',
            content: 'Dive deep into CSS variables, design tokens, and shadow DOM strategies to build complex, high-performance web applications.',
            icon: 'zap',
            iconLibrary: 'lucide',
          },
        ]);
        accordion.defaultOpen = JSON.stringify(['guide1']);
      }
    }, 50);
  }

  // Dropdown Integration Accordion
  function showDropdownInAccordion() {
    const container = document.getElementById('accordionDemoContainer');
    if (!container) return;

    container.innerHTML = `
      <div class="demo-block">
        <h3>🔽 Dropdown Integration</h3>
        <p style="color: #6b7280; margin-bottom: 24px;">Seamlessly integrate form controls within accordion panels. Demonstrates how portaling bypasses overflow constraints.</p>
        
        <ui-accordion id="dropdownAccordion" variant="card-list" selected-header-color="#8b5cf6" multiple="true">
          <div slot="content-filters" style="padding: 24px; display: flex; flex-direction: column; gap: 20px;">
            <div>
              <label style="display: block; font-size: 13px; font-weight: 600; color: #4b5563; margin-bottom: 8px;">Select Department</label>
              <ui-dropdown id="accDeptDropdown" placeholder="All Departments" icon-library="lucide"></ui-dropdown>
            </div>
            <div>
              <label style="display: block; font-size: 13px; font-weight: 600; color: #4b5563; margin-bottom: 8px;">Filter by Role</label>
              <ui-dropdown id="accRoleDropdown" multi-select placeholder="Select roles..." icon-library="lucide"></ui-dropdown>
            </div>
          </div>
          
          <div slot="content-settings" style="padding: 24px;">
            <label style="display: block; font-size: 13px; font-weight: 600; color: #4b5563; margin-bottom: 8px;">Region Selection</label>
            <ui-dropdown id="accRegionDropdown" cascading placeholder="Select region..." icon-library="lucide"></ui-dropdown>
          </div>
        </ui-accordion>
      </div>
    `;

    setTimeout(() => {
      const accordion = document.getElementById('dropdownAccordion');
      if (accordion) {
        accordion.items = [
          {
            id: 'filters',
            title: 'Reporting Filters',
            subtitle: 'Single and Multi-select dropdowns',
            icon: 'filter',
            iconLibrary: 'lucide',
          },
          {
            id: 'settings',
            title: 'Global Settings',
            subtitle: 'Cascading hierarchy dropdown',
            icon: 'globe',
            iconLibrary: 'lucide',
          },
        ];
        accordion.defaultOpen = ['filters'];
      }

      const dept = document.getElementById('accDeptDropdown');
      if (dept) {
        dept.options = [
          { value: 'hr', label: 'Human Resources', icon: 'users' },
          { value: 'it', label: 'Information Technology', icon: 'monitor' },
          { value: 'fin', label: 'Finance', icon: 'credit-card' },
        ];
      }

      const role = document.getElementById('accRoleDropdown');
      if (role) {
        role.options = [
          { value: 'eng', label: 'Engineer' },
          { value: 'mgr', label: 'Manager' },
          { value: 'dir', label: 'Director' },
          { value: 'vp', label: 'Vice President' },
        ];
      }

      const region = document.getElementById('accRegionDropdown');
      if (region) {
        region.options = [
          {
            value: 'na',
            label: 'North America',
            children: [
              { value: 'usa', label: 'United States' },
              { value: 'can', label: 'Canada' },
            ],
          },
          {
            value: 'eu',
            label: 'Europe',
            children: [
              { value: 'uk', label: 'United Kingdom' },
              { value: 'ger', label: 'Germany' },
            ],
          },
        ];
      }
    }, 50);
  }

  // Interactive Playground
  function showInteractiveAccordion() {
    const container = document.getElementById('accordionDemoContainer');
    if (!container) return;

    container.innerHTML = `
      <div class="demo-block">
        <h3>🎮 Interactive Playground</h3>
        <p style="opacity: 0.7; margin-bottom: 24px;">Try all features and see changes in real-time!</p>
        
        <div class="playground-settings">
          <div style="background: #f8fafc; padding: 24px; border-radius: 12px; margin-bottom: 32px; border: 1px solid #e2e8f0;">
            <h4 style="margin: 0 0 16px 0; color: #1e293b; font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em;">🏗️ Layout & Core</h4>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px;">
              <ui-checkbox id="accordionMultiple" label="Multiple Open"></ui-checkbox>
              <ui-checkbox id="accordionShowNumbers" label="Show Numbers"></ui-checkbox>
              <ui-checkbox id="accordionRTL" label="RTL Mode"></ui-checkbox>
              <ui-checkbox id="accordionDense" label="Dense Mode"></ui-checkbox>
              <ui-checkbox id="accordionDisabled" label="Disable All"></ui-checkbox>
              <ui-checkbox id="accordionAutoScroll" label="Auto Scroll" checked="true"></ui-checkbox>
              <ui-checkbox id="accordionSticky" label="Sticky Headers"></ui-checkbox>
              <ui-checkbox id="accordionLazy" label="Lazy Render"></ui-checkbox>
            </div>

            <h4 style="margin: 24px 0 16px 0; color: #1e293b; font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em;">🎨 Visuals & Sensory</h4>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px;">
              <ui-checkbox id="accordionParallax" label="🌌 3D Parallax"></ui-checkbox>
              <ui-checkbox id="accordionHaptics" label="🔊 Audio Haptics"></ui-checkbox>
              <ui-checkbox id="accordionHolographic" label="🔳 3D Depth"></ui-checkbox>
              <ui-checkbox id="accordionSparklines" label="📉 Sparklines"></ui-checkbox>
              <div style="display: flex; align-items: center; gap: 8px;">
                <label style="font-size: 13px; color: #4b5563;">Header Color</label>
                <ui-color-picker id="accordionColor" value="#10b981"></ui-color-picker>
              </div>
              <div style="display: flex; align-items: center; gap: 8px;">
                <label style="font-size: 13px; color: #4b5563;">Background</label>
                <ui-color-picker id="accordionBgColor" value="#ffffff"></ui-color-picker>
              </div>
            </div>

            <h4 style="margin: 24px 0 16px 0; color: #1e293b; font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em;">🏛️ Industrial Sovereign</h4>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px;">
              <ui-checkbox id="accordionSearch" label="🔍 Search" checked="true"></ui-checkbox>
              <ui-checkbox id="accordionHeatmap" label="🗺️ Heatmap"></ui-checkbox>
              <ui-checkbox id="accordionLocking" label="🔐 Pattern Lock"></ui-checkbox>
              <ui-checkbox id="accordionQuick" label="🛸 Quick Actions"></ui-checkbox>
              <ui-checkbox id="accordionVoice" label="🎙️ Voice Control"></ui-checkbox>
              <ui-checkbox id="accordionStream" label="📟 Streaming"></ui-checkbox>
              <ui-checkbox id="accordionBreadcrumbs" label="📂 Breadcrumbs"></ui-checkbox>
              <ui-checkbox id="accordionPresence" label="👥 Presence"></ui-checkbox>
              <ui-checkbox id="accordionAI" label="🤖 AI Briefing"></ui-checkbox>
            </div>

            <h4 style="margin: 24px 0 16px 0; color: #1e293b; font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em;">⚙️ Configuration</h4>
            <div style="display: flex; gap: 20px; flex-wrap: wrap; align-items: flex-end;">
               <div style="width: 150px;">
                 <label style="display:block; font-size:12px; margin-bottom:4px;">Variant</label>
                 <ui-dropdown id="accordionVariant" value="default" options='[
                   {"label": "Default", "value": "default"},
                   {"label": "Splitted", "value": "splitted"},
                   {"label": "Bordered", "value": "bordered"},
                   {"label": "Card", "value": "card"},
                   {"label": "Card List", "value": "card-list"},
                   {"label": "Headline", "value": "headline"}
                 ]'></ui-dropdown>
               </div>
               <div style="width: 120px;">
                 <label style="display:block; font-size:12px; margin-bottom:4px;">Size</label>
                 <ui-dropdown id="accordionSize" value="md" options='[
                   {"label": "Small", "value": "sm"},
                   {"label": "Medium", "value": "md"},
                   {"label": "Large", "value": "lg"}
                 ]'></ui-dropdown>
               </div>
               <div style="width: 120px;">
                 <label style="display:block; font-size:12px; margin-bottom:4px;">Theme</label>
                 <ui-dropdown id="accordionTheme" value="default" options='[
                   {"label": "Default", "value": "default"},
                   {"label": "Glass", "value": "glass"},
                   {"label": "Radiant", "value": "radiant"}
                 ]'></ui-dropdown>
               </div>
               <div style="width: 120px;">
                 <label style="display:block; font-size:12px; margin-bottom:4px;">Icon Pos</label>
                 <ui-dropdown id="accordionIconPos" value="end" options='[
                   {"label": "End", "value": "end"},
                   {"label": "Start", "value": "start"}
                 ]'></ui-dropdown>
               </div>
               <div style="width: 120px;">
                 <label style="display:block; font-size:12px; margin-bottom:4px;">Physics</label>
                 <ui-dropdown id="accordionPhysics" value="stiff" options='[
                   {"label": "Stiff", "value": "stiff"},
                   {"label": "Bouncy", "value": "bouncy"},
                   {"label": "Liquid", "value": "liquid"}
                 ]'></ui-dropdown>
               </div>
               <div style="width: 100px;">
                 <label style="display:block; font-size:12px; margin-bottom:4px;">Columns</label>
                 <ui-number-input id="accordionCols" value="1" min="1" max="4"></ui-number-input>
               </div>
            </div>
          </div>
          <ui-button id="syncZenithBtn" variant="outline" color="primary" full-width label="🔮 SYNC ZENITH ENGINE" size="large"></ui-button>
        </div>
        
        <div class="playground-preview" style="margin-top: 24px;">
          <ui-accordion id="interactiveAccordion" style="width: 100%;" icon-library="lucide"></ui-accordion>
        </div>
        
        <div style="margin-top: 20px; background: #1e293b; padding: 16px; border-radius: 8px; position: relative;">
           <ui-button id="copyAccordionBtn" style="position: absolute; top: 10px; right: 10px;" variant="outline" size="xxs" label="Copy"></ui-button>
           <code id="accordionCodeBlock" style="color: #e2e8f0; font-family: monospace; font-size: 13px; display: block; overflow-x: auto; padding-right: 50px; white-space: pre-wrap;">
             &lt;ui-accordion ...&gt;&lt;/ui-accordion&gt;
           </code>
        </div>
      </div>
    `;

    setTimeout(() => {
      const accordion = document.getElementById('interactiveAccordion');
      if (accordion) {
        accordion.items = JSON.stringify([
          {
            id: 'item1',
            title: 'Feature-Rich Item',
            subtitle: 'With subtitle and actions',
            content: 'This item demonstrates subtitle, badge, and action buttons.',
            icon: 'palette',
            badge: 3,
            actions: [
              { id: 'edit', label: 'Edit', icon: 'pencil' },
              { id: 'delete', label: 'Delete', icon: 'trash-2' },
            ],
          },
          {
            id: 'item2',
            title: 'Nested Content',
            subtitle: 'Enable nested mode to see children',
            content: 'This item has nested children (enable nested mode).',
            icon: 'tree-pine',
            children: [
              { id: 'child1', title: 'Child Item 1', content: 'Nested content 1', icon: 'file' },
              { id: 'child2', title: 'Child Item 2', content: 'Nested content 2', icon: 'file' },
            ],
          },
          {
            id: 'item3',
            title: 'Searchable Item',
            subtitle: 'Try searching for keywords',
            content: 'This item contains searchable text with keywords like JavaScript, React, and TypeScript.',
            icon: 'search',
            badge: 5,
          },
          {
            id: 'item4',
            title: 'Disabled Item',
            subtitle: 'This item is disabled',
            content: 'This section is disabled and cannot be toggled.',
            icon: 'lock',
            disabled: true,
          },
        ]);
        accordion.defaultOpen = JSON.stringify(['item1']);
      }
    }, 50);

    setTimeout(() => {
      const ctrls = container.querySelectorAll('ui-checkbox, ui-dropdown, ui-number-input, ui-color-picker');
      ctrls.forEach(ctrl => {
        const eventName =
          ctrl.tagName === 'UI-CHECKBOX'
            ? 'checkboxChange'
            : ctrl.tagName === 'UI-DROPDOWN'
              ? 'dropdownChange'
              : ctrl.tagName === 'UI-COLOR-PICKER'
                ? 'colorChange'
                : 'inputChange';
        ctrl.addEventListener(eventName, () => updateInteractiveAccordion());
      });

      const syncBtn = document.getElementById('syncZenithBtn');
      if (syncBtn) {
        syncBtn.addEventListener('click', () => updateInteractiveAccordion());
      }

      const copyBtn = document.getElementById('copyAccordionBtn');
      if (copyBtn) {
        copyBtn.addEventListener('click', () => copyAccordionCode());
      }

      updateInteractiveAccordion();
    }, 100);
  }

  function updateInteractiveAccordion() {
    const accordion = document.getElementById('interactiveAccordion');
    if (!accordion) return;

    // Helper to get value
    const val = id => {
      const el = document.getElementById(id);
      if (!el) return null;
      if (el.tagName === 'UI-CHECKBOX') return el.checked;
      return el.value;
    };

    accordion.multiple = val('accordionMultiple');
    accordion.showNumbers = val('accordionShowNumbers');
    accordion.rtl = val('accordionRTL');
    accordion.dense = val('accordionDense');
    accordion.disabled = val('accordionDisabled');
    accordion.autoScroll = val('accordionAutoScroll');
    accordion.stickyHeaders = val('accordionSticky');
    accordion.lazyRender = val('accordionLazy');

    accordion.enableParallax = val('accordionParallax');
    accordion.enableHaptics = val('accordionHaptics');
    accordion.enableHolographic = val('accordionHolographic');
    accordion.enableSparklines = val('accordionSparklines');
    accordion.selectedHeaderColor = val('accordionColor');
    accordion.backgroundColor = val('accordionBgColor');

    accordion.enableSearch = val('accordionSearch');
    accordion.enableSearchHeatmap = val('accordionHeatmap');
    accordion.enableLocking = val('accordionLocking');
    accordion.enableQuickActions = val('accordionQuick');
    accordion.enableVoiceControl = val('accordionVoice');
    accordion.enableStreaming = val('accordionStream');
    accordion.showBreadcrumbs = val('accordionBreadcrumbs');
    accordion.enableCollaborators = val('accordionPresence');
    accordion.enableAISummaries = val('accordionAI');

    accordion.variant = val('accordionVariant') || 'default';
    accordion.theme = val('accordionTheme') || 'default';
    accordion.physics = val('accordionPhysics') || 'stiff';
    accordion.size = val('accordionSize') || 'md';
    accordion.iconPosition = val('accordionIconPos') || 'end';
    accordion.columns = parseInt(val('accordionCols') || 1);

    accordion.enableNested = true; // Always on for playground
    accordion.iconLibrary = 'lucide';

    // Update Code Block
    const codeBlock = document.getElementById('accordionCodeBlock');
    if (codeBlock) {
      const isMultiple = val('accordionMultiple');
      const showNumbers = val('accordionShowNumbers');
      const enableSearch = val('accordionSearch');
      const rtl = val('accordionRTL');
      const dense = val('accordionDense');
      const isDisabled = val('accordionDisabled');
      const autoScroll = val('accordionAutoScroll');

      let props = '';
      if (isMultiple) props += ' multiple';
      if (showNumbers) props += ' show-numbers';
      if (enableSearch) props += ' enable-search';
      if (rtl) props += ' rtl';
      if (dense) props += ' dense';
      if (isDisabled) props += ' disabled';
      if (autoScroll) props += ' auto-scroll';

      const variant = val('accordionVariant') || 'default';
      const size = val('accordionSize') || 'md';
      const iconPos = val('accordionIconPos') || 'end';
      const physics = val('accordionPhysics') || 'stiff';

      if (variant !== 'default') props += ` variant="${variant}"`;
      if (size !== 'md') props += ` size="${size}"`;
      if (iconPos !== 'end') props += ` icon-position="${iconPos}"`;
      if (physics !== 'stiff') props += ` physics="${physics}"`;
      if (val('accordionColor') !== '#10b981') props += ` selected-header-color="${val('accordionColor')}"`;
      if (val('accordionBgColor') !== '#ffffff') props += ` background-color="${val('accordionBgColor')}"`;

      codeBlock.innerText = `<ui-accordion icon-library="lucide"${props}></ui-accordion>\n<script>\n  const accordion = document.querySelector('ui-accordion');\n  accordion.items = JSON.stringify([...]);\n</script>`;
    }
  }

  /**
   * Show Auto Scroll Demo with long list
   */
  function showAutoScrollAccordion() {
    const container = document.getElementById('accordionDemoContainer');
    if (!container) return;

    container.innerHTML = `
      <div class="demo-block">
        <h3>📜 Auto Scroll Demo</h3>
        <p style="color: #6b7280; margin-bottom: 16px;">
          Enable <b>autoScroll</b> to automatically scroll the page when an item is expanded off-screen.
          Perfect for long lists or when content is very tall.
        </p>
        <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 24px; border: 1px solid #e2e8f0;">
          <p style="margin-top: 0;">Try opening items at the <b>bottom</b> of this list:</p>
          <ui-accordion id="autoScrollAccordion" auto-scroll="true" icon-library="lucide" variant="bordered"></ui-accordion>
        </div>
      </div>
    `;

    setTimeout(() => {
      const accordion = document.getElementById('autoScrollAccordion');
      if (accordion) {
        const longItems = [];
        for (let i = 1; i <= 20; i++) {
          longItems.push({
            id: `item-${i}`,
            title: `Accordion Item #${i}`,
            subtitle: `Supporting text for item ${i}`,
            content: `
              <div style="padding: 10px 0;">
                <p>Detailed content for section ${i}. This is a demonstration of the auto-scroll capabilities.</p>
                <div style="height: 150px; background: #eaeff2; border-radius: 4px; display: flex; align-items: center; justify-content: center; color: #94a3b8; font-style: italic;">
                  Tall content box (200px)
                </div>
                <p style="margin-top: 15px;">When auto-scroll is on, opening this will ensure it's fully visible in your browser window.</p>
              </div>
            `,
            icon: 'list',
          });
        }
        accordion.items = JSON.stringify(longItems);
      }
    }, 50);
  }

  const copyAccordionCode = () => {
    const code = document.getElementById('accordionCodeBlock').innerText;
    const btn = document.getElementById('copyAccordionBtn');
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

  // Initialize with playground
  setTimeout(() => {
    if (window.showInteractiveAccordion) {
      window.showInteractiveAccordion();
    }
  }, 100);

  // Kinetic Physics Accordion
  function showPhysicsAccordion() {
    const container = document.getElementById('accordionDemoContainer');
    if (!container) return;

    container.innerHTML = `
      <div class="demo-block">
        <h3 style="text-align: center; font-weight: 800; letter-spacing: 0.1em; color: #111827; margin-bottom: 8px;">🧬 SEGMENTED KINETIC SYSTEM</h3>
        <p style="text-align: center; color: #6b7280; margin-bottom: 32px; font-size: 14px;">Apex Tier expansion physics including Bouncy (Spring-like) and Liquid (High viscosity).</p>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 32px; max-width: 900px; margin: 0 auto;">
          <div style="background: white; padding: 20px; border-radius: 16px; border: 1px solid #f3f4f6; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
            <h4 style="margin-bottom: 16px; color: #f43f5e; display: flex; align-items: center; gap: 8px;">
              <span style="width: 8px; height: 8px; border-radius: 50%; background: #f43f5e;"></span>
              Bouncy Physics (Stiff Spring)
            </h4>
            <p style="font-size: 11px; color: #94a3b8; margin-top: -8px; margin-bottom: 16px;">Uses 1.05x elastic vertical stretch on expansion.</p>
            <ui-accordion id="bouncyAcc" physics="bouncy" selected-header-color="#f43f5e" multiple="true" icon-library="lucide"></ui-accordion>
          </div>
          <div style="background: white; padding: 20px; border-radius: 16px; border: 1px solid #f3f4f6; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
            <h4 style="margin-bottom: 16px; color: #0ea5e9; display: flex; align-items: center; gap: 8px;">
              <span style="width: 8px; height: 8px; border-radius: 50%; background: #0ea5e9;"></span>
              Liquid Physics (High Viscosity)
            </h4>
            <p style="font-size: 11px; color: #94a3b8; margin-top: -8px; margin-bottom: 16px;">Uses viscous 0.8x-to-1.02x stretch with skew distortion.</p>
            <ui-accordion id="liquidAcc" physics="liquid" selected-header-color="#0ea5e9" animation-duration="600" multiple="true" icon-library="lucide"></ui-accordion>
          </div>
        </div>
      </div>
    `;

    setTimeout(() => {
      const bouncy = document.getElementById('bouncyAcc');
      const liquid = document.getElementById('liquidAcc');
      const items = [
        { id: 'p1', title: 'Expand Me', content: 'Notice the spring over-travel on expansion.', icon: 'zap' },
        { id: 'p2', title: 'Mechanical Feel', content: 'High-fidelity motion curves for premium look.', icon: 'cog' },
      ];
      if (bouncy) bouncy.items = JSON.stringify(items);
      if (liquid) liquid.items = JSON.stringify(items);
    }, 50);
  }

  function showVetoAccordion() {
    const container = document.getElementById('accordionDemoContainer');
    if (!container) return;
    container.innerHTML = `
      <div class="demo-block">
        <h3>🚥 Veto Rejection & Kinetic Shake</h3>
        <p style="color: #6b7280; margin-bottom: 16px;">Prevent expansion based on logic and provide kinetic "shake" feedback.</p>
        <ui-accordion id="vetoAcc" variant="card-list" icon-library="lucide"></ui-accordion>
        <div id="vetoStatus" style="margin-top: 12px; height: 20px; color: #ef4444; font-weight: 600; font-size: 14px; text-align: center;"></div>
      </div>
    `;
    setTimeout(() => {
      const acc = document.getElementById('vetoAcc');
      if (acc) {
        acc.items = JSON.stringify([
          { id: 'u', title: 'Unlocked Content (Click me)', content: 'Universal access permitted.', icon: 'unlock' },
          { id: 'l', title: 'Locked Content (Vetoed)', subtitle: 'Restricted access', content: '', icon: 'lock', actions: [{ id: 'req', label: 'Request Access', icon: 'key' }] },
        ]);
        acc.addEventListener('beforeOpen', e => {
          if (e.detail.itemId === 'l') {
            e.preventDefault();
            acc.shake('l');
            const s = document.getElementById('vetoStatus');
            if (s) {
              s.textContent = '⛔ ACCESS DENIED: VETO REJECTION';
              setTimeout(() => {
                s.textContent = '';
              }, 2000);
            }
          }
        });
        acc.addEventListener('accordionAction', e => {
          alert(`Access request sent for item ${e.detail.itemId}`);
        });
      }
    }, 50);
  }

  // Success Radiant Pulse Demo
  function showSuccessAccordion() {
    const container = document.getElementById('accordionDemoContainer');
    if (!container) return;

    container.innerHTML = `
      <div class="demo-block">
        <h3 style="color: #10b981;">✨ Success Radiant Pulse</h3>
        <p style="color: #6b7280; margin-bottom: 24px;">Trigger a premium "radiant pulse" to confirm successful operations within an accordion.</p>
        <div style="margin-bottom: 20px; display: flex; gap: 12px;">
           <ui-button id="btnPulse1" variant="outline" color="success" label="Pulse Step 1" size="md"></ui-button>
           <ui-button id="btnPulse2" variant="outline" color="success" label="Pulse Step 2" size="md"></ui-button>
        </div>
        <ui-accordion id="successAcc" multiple="true" variant="card-list" icon-library="lucide"></ui-accordion>
      </div>
    `;

    const triggerAccSuccess = id => {
      const acc = document.getElementById('successAcc');
      if (acc) acc.success(id);
    };

    setTimeout(() => {
      const b1 = document.getElementById('btnPulse1');
      const b2 = document.getElementById('btnPulse2');
      if (b1) b1.addEventListener('click', () => triggerAccSuccess('step1'));
      if (b2) b2.addEventListener('click', () => triggerAccSuccess('step2'));
    }, 50);

    setTimeout(() => {
      const acc = document.getElementById('successAcc');
      if (acc) {
        acc.items = JSON.stringify([
          { id: 'step1', title: 'Workflow Step 1', subtitle: 'Data Validation Completed', content: 'Step 1 has been validated automatically.', icon: 'check-circle' },
          { id: 'step2', title: 'Workflow Step 2', subtitle: 'Compliance Review', content: 'Compliance tokens generated successfully.', icon: 'shield-check' },
        ]);
        acc.defaultOpen = ['step1'];
      }
    }, 50);
  }

  // Headline Demo
  function showHeadlineDemo() {
    const container = document.getElementById('accordionDemoContainer');
    if (!container) return;

    const headlineItems = [
      {
        id: '1',
        title: 'Solutions by Partner and Services',
        subtitle: 'Understanding how digitalisation and electrification trends create strategic opportunities for your business across every vertical.',
        content: 'Detailed strategy documentation for global partners, covering go-to-market approaches and co-sell incentives.',
        badge: 1,
      },
      {
        id: '2',
        title: 'Explore All Services',
        subtitle: 'Browse the full catalogue of modern industrial solutions built for scale and reliability.',
        content: 'Comprehensive catalogue of industrial, cloud and professional services with pricing, SLAs, and onboarding guides.',
      },
      {
        id: '3',
        title: 'Solutions by Industry',
        subtitle: 'Cloud-based data centre infrastructure management purpose-built for energy, finance, healthcare, and manufacturing.',
        content: 'Industry roadmaps for critical sectors with regulatory frameworks and reference architectures.',
      },
    ];

    container.innerHTML = `
      <div style="background:#fff; padding: 40px 0;">

        <!-- Header tag picker -->
        <div style="display:flex; align-items:center; gap:12px; margin-bottom:40px; flex-wrap:wrap;">
          <span style="font-size:12px; font-weight:600; color:#6b7280; text-transform:uppercase; letter-spacing:.08em;">Header Tag</span>
          <div style="display: flex; gap: 4px;">
            <ui-button-toggle-group 
              id="hl-tag-group" 
              value="3" 
              options='[
                {"label": "H1", "value": "1"},
                {"label": "H2", "value": "2"},
                {"label": "H3", "value": "3"},
                {"label": "H4", "value": "4"},
                {"label": "H5", "value": "5"},
                {"label": "H6", "value": "6"}
              ]'
            ></ui-button-toggle-group>
          </div>
          <span id="hl-size-label" style="font-size:12px; color:#9ca3af; margin-left:4px;">48px title · 24px subtitle</span>
        </div>

        <!-- Live accordion -->
        <ui-accordion
          id="headlineLiveAcc"
          variant="headline"
          header-level="3"
          selection-position="none"
          default-open='["3"]'
        ></ui-accordion>
      </div>
    `;

    const sizeMeta = [
      { title: '48px', subtitle: '24px', padding: '48px' },
      { title: '36px', subtitle: '20px', padding: '40px' },
      { title: '28px', subtitle: '17px', padding: '32px' },
      { title: '22px', subtitle: '14px', padding: '24px' },
      { title: '18px', subtitle: '13px', padding: '18px' },
      { title: '15px', subtitle: '12px', padding: '14px' },
    ];

    const applyHeadlineLevel = function (level) {
      const acc = document.getElementById('headlineLiveAcc');
      if (!acc) return;
      acc.setAttribute('header-level', String(level));
      // Update active button
      ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].forEach((tag, i) => {
        const btn = document.getElementById(`hl-tag-${tag}`);
        if (!btn) return;
        const active = i + 1 === level;
        btn.style.background = active ? '#111827' : '#f8fafc';
        btn.style.color = active ? '#fff' : '#374151';
        btn.style.borderColor = active ? '#111827' : '#d1d5db';
      });
      // Update label
      const meta = sizeMeta[level - 1];
      const label = document.getElementById('hl-size-label');
      if (label) label.textContent = `${meta.title} title · ${meta.subtitle} subtitle · ${meta.padding} padding`;
    };

    setTimeout(() => {
      const acc = document.getElementById('headlineLiveAcc');
      const group = document.getElementById('hl-tag-group');
      if (acc) {
        acc.items = JSON.stringify(headlineItems);
        acc.defaultOpen = ['3'];
      }
      if (group) {
        group.addEventListener('uiChange', e => applyHeadlineLevel(parseInt(e.detail.value)));
      }
    }, 50);
  }

  // Zenith Controls Demo
  function showZenithControls() {
    const container = document.getElementById('accordionDemoContainer');
    if (!container) return;

    container.innerHTML = `
      <div class="demo-block">
        <h3>🛠️ Zenith Mastery Controls</h3>
        <p style="color: #6b7280; margin-bottom: 24px;">Test the absolute latest "Zenith Tier" features independently.</p>
        
        <div style="background: var(--bg-secondary, #f8fafc); padding: 24px; border-radius: 12px; margin-bottom: 32px; display: flex; gap: 24px; flex-wrap: wrap; border: 1px solid var(--border-default, #e2e8f0);">
           <ui-checkbox id="zenithHaptics" label="Audio Haptics"></ui-checkbox>
           <ui-checkbox id="zenithParallax" label="3D Parallax"></ui-checkbox>
           <ui-checkbox id="zenithSticky" label="Sticky Headers"></ui-checkbox>
           <ui-checkbox id="zenithLazy" label="Lazy Render"></ui-checkbox>
           <ui-checkbox id="zenithQuick" label="Quick Actions"></ui-checkbox>
           <ui-checkbox id="zenithHeatmap" label="Search Heatmap"></ui-checkbox>
           <div style="display: flex; align-items: center; gap: 8px;">
             <span style="font-size: 14px; color: var(--text-secondary);">Focus ms:</span>
             <ui-input id="zenithFocusTimeout" type="number" value="0" style="width: 100px;"></ui-input>
           </div>
           <ui-checkbox id="zenithSearch" label="🔍 Search" checked></ui-checkbox>
           <ui-checkbox id="zenithLocking" label="🔐 Pattern Lock"></ui-checkbox>
           <ui-checkbox id="zenithSparklines" label="📉 Sparklines"></ui-checkbox>
           <ui-checkbox id="zenithRanking" label="📊 Ranking"></ui-checkbox>
           <ui-checkbox id="zenithBreadcrumbs" label="📂 Breadcrumbs"></ui-checkbox>
           <ui-checkbox id="zenithPrint" label="🖨️ Print Power"></ui-checkbox>
           <ui-checkbox id="zenithPortal" label="🔳 Focus Portal"></ui-checkbox>
           <ui-checkbox id="zenithPresence" label="👥 Presence"></ui-checkbox>
           <ui-checkbox id="zenithAI" label="🤖 AI Briefing"></ui-checkbox>
           <div style="margin-left: auto; display: flex; gap: 8px;">
             <ui-button id="btnSaveSnapshot" variant="outline" color="success" size="md" label="💾 Save"></ui-button>
             <ui-button id="btnLoadSnapshot" variant="outline" color="primary" size="md" label="📂 Load"></ui-button>
           </div>
        </div>

        <div style="display: flex; gap: 8px; padding: 12px; background: rgba(0,0,0,0.02); border-radius: 8px; margin: 16px 0; border: 1px dashed rgba(0,0,0,0.05);">
           <ui-checkbox id="zenithVoice" label="🎙️ Voice Control"></ui-checkbox>
           <ui-checkbox id="zenithStream" label="📟 Streaming"></ui-checkbox>
           <ui-checkbox id="zenithHolographic" label="🌌 3D Holographic"></ui-checkbox>
           <ui-checkbox id="zenithTeleport" label="🔗 Teleportation"></ui-checkbox>
        </div>

        <ui-accordion id="zenithControlAcc" variant="card-list" selected-header-color="#8b5cf6" 
          enable-search="true" enable-nested="true" enable-quick-actions="true"></ui-accordion>
      </div>
    `;

    const toggleZenithFeature = (prop, val) => {
      const acc = document.getElementById('zenithControlAcc');
      if (acc) acc[prop] = val;
    };

    setTimeout(() => {
      const mapping = {
        zenithHaptics: 'enableHaptics',
        zenithParallax: 'enableParallax',
        zenithSticky: 'stickyHeaders',
        zenithLazy: 'lazyRender',
        zenithQuick: 'enableQuickActions',
        zenithHeatmap: 'enableSearchHeatmap',
        zenithSearch: 'enableSearch',
        zenithLocking: 'enableLocking',
        zenithSparklines: 'enableSparklines',
        zenithRanking: 'enableRanking',
        zenithBreadcrumbs: 'showBreadcrumbs',
        zenithPrint: 'printExpandAll',
        zenithPortal: 'enablePortalReader',
        zenithPresence: 'enableCollaborators',
        zenithAI: 'enableAISummaries',
        zenithVoice: 'enableVoiceControl',
        zenithStream: 'enableStreaming',
        zenithHolographic: 'enableHolographic',
        zenithTeleport: 'enableTeleportation',
      };

      Object.entries(mapping).forEach(([id, prop]) => {
        const el = document.getElementById(id);
        if (el) el.addEventListener('checkboxChange', e => toggleZenithFeature(prop, e.detail.checked));
      });

      const timeoutInp = document.getElementById('zenithFocusTimeout');
      if (timeoutInp) timeoutInp.addEventListener('inputChange', e => toggleZenithFeature('focusTimeout', parseInt(e.detail.value)));

      const saveBtn = document.getElementById('btnSaveSnapshot');
      const loadBtn = document.getElementById('btnLoadSnapshot');
      if (saveBtn) saveBtn.addEventListener('click', () => {}); // saveTestSnapshot missing
      if (loadBtn) loadBtn.addEventListener('click', () => {}); // loadTestSnapshot missing
    }, 100);

    setTimeout(() => {
      const acc = document.getElementById('zenithControlAcc');
      if (acc) {
        const items = [
          {
            id: 'node-stream',
            title: 'Sovereign Telemetry',
            subtitle: 'Live Cluster A',
            icon: 'zap',
            streamData: [
              'Initialize Cluster Node 001...',
              'AUTH: 256-bit encryption handshake: OK',
              'SYNC: Regional shards connected: 12/12',
              'LOAD: CPU @ 42.1%, MEM @ 68.4GB',
              'ALERT: Minor latency in Node 04...',
              'RESOLVED: Rerouted via Node 09',
            ],
            content: 'Telemetry stream is operating within normal industrial thresholds.',
            teleportTo: 'node-sec',
          },
          {
            id: 'node-sec',
            title: 'Security Perimeter',
            subtitle: 'Zone Alpha',
            lockCode: '123',
            content: 'Authenticated! All perimeter nodes are active and secure.',
            status: 'completed',
            icon: 'shield',
            actions: [{ id: 'lock', icon: 'lock' }],
            collaborators: [
              { id: '1', name: 'Alice', color: '#ec4899' },
              { id: '2', name: 'Bob', color: '#10b981' },
            ],
            summaryList: ['Firewall: Status Nominal', 'IPS: 0 Intrusions detected', 'Nodes: 42/42 Active'],
          },
          ...Array.from({ length: 15 }, (_, i) => ({
            id: `node-${i}`,
            title: `Data Log ${i + 1}`,
            subtitle: `Server Instance #${100 + i}`,
            content: `Technical logs for instance ${i + 1}. No critical errors recorded.`,
            sparkline: Array.from({ length: 10 }, () => Math.random() * 100),
            status: 'none',
            icon: 'server',
            actions: [{ id: 'pin', icon: 'pin' }],
          })),
        ];
        acc.items = JSON.stringify(items);
        acc.defaultOpen = ['node-stream'];
      }
    }, 50);
  }

  // Selection Demo
  function showSelectionDemo() {
    const container = document.getElementById('accordionDemoContainer');
    if (!container) return;

    container.innerHTML = `
      <div class="demo-block">
        <h3>📍 Selection Indicator Positions</h3>
        <p style="color: #6b7280; margin-bottom: 24px;">Configure where the active selection indicator appears: Left (Standard) or Top (Tab-style).</p>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 32px;">
          <div>
            <h4 style="margin-bottom: 12px; color: #4b5563;">Selection: Left (Default)</h4>
            <ui-accordion selection-position="left" selected-header-color="#10b981" id="leftSelectionAcc"></ui-accordion>
          </div>
          <div>
            <h4 style="margin-bottom: 12px; color: #4b5563;">Selection: Top (Premium)</h4>
            <ui-accordion selection-position="top" selected-header-color="#8b5cf6" id="topSelectionAcc"></ui-accordion>
          </div>
        </div>
      </div>
    `;

    setTimeout(() => {
      const items = [
        { id: '1', title: 'Interactive Selection', content: 'The border indicates state.', icon: 'mouse-pointer' },
        { id: '2', title: 'Configurable Color', content: 'You can set any hex color for the indicator.', icon: 'palette' },
      ];
      const left = document.getElementById('leftSelectionAcc');
      const top = document.getElementById('topSelectionAcc');
      if (left) {
        left.items = JSON.stringify(items);
        left.defaultOpen = ['1'];
      }
      if (top) {
        top.items = JSON.stringify(items);
        top.defaultOpen = ['1'];
      }
    }, 50);
  }

  // God-Tier Demo
  function showGodTierDemo() {
    const container = document.getElementById('accordionDemoContainer');
    if (!container) return;

    container.innerHTML = `
      <div style="background: #0f172a; padding: 60px; border-radius: 24px; color: white; min-height: 800px;">
        <div style="max-width: 1000px; margin: 0 auto;">
          <header style="margin-bottom: 60px; text-align: center;">
             <h2 style="font-size: 3rem; font-weight: 800; background: linear-gradient(135deg, #38bdf8, #818cf8); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin-bottom: 12px;">The Apex God-Tier</h2>
             <p style="color: #94a3b8; font-size: 1.1rem;">Wizard Mode • Persistence • Glassmorphism • Multi-Column Grid • Lazy Rendering</p>
          </header>

          <section style="display: grid; grid-template-columns: 1fr 1fr; gap: 40px;">
            <div>
               <h4 style="margin-bottom: 20px; color: #38bdf8;">Primary Control Plate</h4>
               <ui-accordion 
                id="godTierAcc" 
                variant="card-list" 
                theme="radiant" 
                lazy-render="true"
                enable-parallax="true"
                enable-haptics="true"
                sticky-headers="true"
                sync-group="dashboard-alpha"
                selected-header-color="#38bdf8"
              ></ui-accordion>
            </div>

            <div>
               <h4 style="margin-bottom: 20px; color: #818cf8;">Mirror Secondary Plate</h4>
               <ui-accordion 
                id="godTierAccMirror" 
                variant="card-list" 
                theme="glass" 
                lazy-render="true"
                enable-parallax="true"
                enable-haptics="true"
                sync-group="dashboard-alpha"
                selected-header-color="#818cf8"
              ></ui-accordion>
            </div>
          </section>

          <footer style="margin-top: 60px; border-top: 1px solid #1e293b; padding-top: 30px; display: flex; justify-content: space-between; align-items: center;">
             <div style="color: #64748b; font-size: 0.9rem;">State automatically saved to localStorage</div>
             <ui-button id="btnResetGod" variant="ghost" color="secondary" label="Reset state"></ui-button>
          </footer>
        </div>
      </div>
    `;

    setTimeout(() => {
      const items = [
        {
          id: 'step1',
          title: 'Infrastructure Setup',
          subtitle: 'Cloud resource provisioning status',
          peek: '✅ Clusters initialized in 2.4s. All nodes online.',
          content:
            '<div style="background: rgba(16, 185, 129, 0.05); border: 1px solid #10b981; padding: 16px; border-radius: 12px; color: #10b981;">✅ All production clusters were initialized in 2.4s. DNS propagation complete.</div>',
          status: 'completed',
          progress: 100,
          badge: 12,
          icon: 'server',
        },
        {
          id: 'step2',
          title: 'Security Sync',
          subtitle: 'Identity and Access Management',
          peek: '❌ Token rotation failed for regional subgroup B.',
          content:
            '<div style="background: rgba(239, 68, 68, 0.05); border: 1px solid #ef4444; padding: 16px; border-radius: 12px; color: #ef4444;">❌ Token rotation failed for regional subgroup B. Permission denied by root-authority.</div>',
          status: 'error',
          progress: 12,
          icon: 'lock',
        },
        {
          id: 'step3',
          title: 'Data Ingestion Pipeline',
          subtitle: 'Real-time telemetry streams',
          peek: '📊 Processing: 2.4 TB/min | Throughput: 98.2%',
          content:
            '<div style="display: flex; gap: 12px; flex-direction: column;"><div>Currently processing: <strong>2.4 TB/min</strong></div> <div style="height: 4px; background: #334155; border-radius: 2px;"><div style="width: 70%; height: 100%; background: #38bdf8; border-radius: 2px;"></div></div></div>',
          status: 'current',
          progress: 70,
          icon: 'activity',
        },
        {
          id: 'step4',
          title: 'Optimization Engine',
          subtitle: 'AI-driven cost reduction',
          content: 'Engine is analyzing traffic patterns. Estimated cost savings: $4.2k/month.',
          status: 'warning',
          icon: 'zap',
        },
        {
          id: 'step5',
          title: 'Deployment Manifest',
          subtitle: 'Version 4.2.0 stable rollout',
          content: 'Ready to finalize. All hooks are verified.',
          status: 'none',
          icon: 'package',
        },
        {
          id: 'step6',
          title: 'Resource Monitoring',
          subtitle: 'Active node health checks',
          content: 'Nodes: 42 Active, 0 Drained, 0 Failing.',
          status: 'none',
          icon: 'bar-chart',
        },
      ];
      const acc = document.getElementById('godTierAcc');
      const mirror = document.getElementById('godTierAccMirror');
      if (acc) {
        acc.items = JSON.stringify(items);
        if (!localStorage.getItem('god-tier-demo-v1')) {
          acc.defaultOpen = ['step3'];
        }
      }
      if (mirror) {
        mirror.items = JSON.stringify(items);
        if (!localStorage.getItem('god-tier-demo-v1')) {
          mirror.defaultOpen = ['step3'];
        }
      }
      const resetBtn = document.getElementById('btnResetGod');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          localStorage.removeItem('god-tier-demo-v1');
          location.reload();
        });
      }
    }, 50);
  }

  // AI & Collaboration Demo
  function showCollabAIDemo() {
    const container = document.getElementById('accordionDemoContainer');
    if (!container) return;

    container.innerHTML = `
      <div class="demo-block">
        <h3>🤖 Industrial Sovereignty: AI & Real-time Collaboration</h3>
        <p style="color: #6b7280; margin-bottom: 24px;">Features: Self-generating AI briefings on hover and cross-tab presence indicators via BroadcastChannel.</p>
        
        <div style="margin-bottom: 20px; padding: 12px; background: #f0f9ff; border: 1px dashed #10b981; border-radius: 8px;">
           <p style="margin: 0; font-size: 13px; color: #1e40af;">
             <strong>💡 Verification Steps:</strong>
             <br/>1. <strong>AI Briefings:</strong> Hover over the titles like "System Architecture" — notice the AI-generated bullet points.
             <br/>2. <strong>Collaboration:</strong> Open this page in <strong>two different tabs</strong>. Open/Close items in one tab and watch the presence avatars update in the other.
           </p>
        </div>

        <ui-accordion id="collabAIAccordion" 
          enable-ai-summaries="true" 
          enable-collaborators="true" 
          variant="card" 
          multiple="true"
          persistence-key="collab-demo">
        </ui-accordion>
      </div>
    `;

    setTimeout(() => {
      const accordion = document.getElementById('collabAIAccordion');
      if (accordion) {
        accordion.items = [
          {
            id: 'arch',
            title: 'System Architecture',
            content:
              'The system utilizes a distributed microservices pattern with a Stencil-based design system at the core. It leverages Web Components for framework agnostic deployment and high performance shadow DOM rendering.',
            icon: 'layout',
            collaborators: [{ id: 'u1', name: 'Dev Lead', color: '#10b981' }],
          },
          {
            id: 'security',
            title: 'Encryption Standards',
            content:
              'End-to-end encryption using AES-256 for data at rest and TLS 1.3 for data in transit. Identity is managed via OIDC/OAuth2 with hardware security module (HSM) support for key rotation.',
            icon: 'lock',
            collaborators: [{ id: 'u2', name: 'Security Auditor', color: '#ef4444' }],
          },
          {
            id: 'performance',
            title: 'Optimization Hooks',
            content:
              'Critical path analysis identifies bottleneck components. We utilize IntersectionObserver for lazy loading and BroadcastChannel for cross-context state synchronization across browser threads.',
            icon: 'zap',
          },
        ];
      }
    }, 50);
  }

  // Paragraphs Accordion
  function showParagraphAccordion() {
    const container = document.getElementById('accordionDemoContainer');
    if (!container) return;

    container.innerHTML = `
      <div class="demo-block">
        <h3>📄 Accordion with Multi-Paragraph Content</h3>
        <p style="color: #6b7280; margin-bottom: 16px;">Accordion items can contain multiple paragraphs of text with proper spacing.</p>
        <ui-accordion id="paragraphAccordion" icon-library="lucide"></ui-accordion>
      </div>
    `;

    setTimeout(() => {
      const accordion = document.getElementById('paragraphAccordion');
      if (accordion) {
        accordion.items = [
          {
            id: 'item1',
            title: 'Terms of Service',
            content: `
              <p style="margin-bottom: 12px;">Welcome to our Terms of Service. Please read these terms carefully before using our services.</p>
              <p style="margin-bottom: 12px;">By accessing or using the Service, you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the Service.</p>
              <p>Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms.</p>
            `,
            icon: 'file-text',
          },
          {
            id: 'item2',
            title: 'Privacy Policy',
            content: `
              <p style="margin-bottom: 12px;">We value your privacy and are committed to protecting your personal data.</p>
              <p style="margin-bottom: 12px;">This Privacy Policy will inform you as to how we look after your personal data when you visit our website (regardless of where you visit it from) and tell you about your privacy rights and how the law protects you.</p>
              <p>Please use the Glossary to understand the meaning of some of the terms used in this Privacy Policy.</p>
            `,
            icon: 'shield',
          },
        ];
        accordion.defaultOpen = ['item1'];
      }
    }, 50);
  }
}
