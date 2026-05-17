export function initAvatarDemo(targetId = 'avatar') {
  const section = document.getElementById(targetId);
  if (!section) return;

  section.innerHTML = `
    <div class="demo-header" style="margin-bottom: 32px;">
      <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
        <ui-pill color="danger" variant="outline" label="ZENITH TIER" size="md"ui-pill>
        <ui-pill color="secondary" variant="outline" label="V4.0" size="md"ui-pill>
      </div>
      <h2>Avatar & Social Suite</h2>
      <p style="color: #64748b; font-size: 1.1rem; max-width: 800px;">The industry's most advanced avatar component. Support for 4 custom shapes, status management, social story rings, 3D interactions, and enterprise-grade group stacking.</p>
    </div>

    <div id="avatarNavPills_${targetId}" class="demo-nav-pills" style="margin: 24px 0; display: flex; gap: 10px; flex-wrap: wrap;">
      <ui-button label="🎮 Playground" data-demo="playground" selected="true"></ui-button>
      <ui-button label="✨ Visual Styles" data-demo="styles"></ui-button>
      <ui-button label="🟢 Presence & Status" data-demo="presence"></ui-button>
      <ui-button label="📸 Social & Effects" data-demo="social"></ui-button>
      <ui-button label="👥 Managed Groups" data-demo="groups"></ui-button>
    </div>

    <div id="avatarDemoContainer_${targetId}" class="avatar-demo-content-area" style="min-height: 500px; padding: 40px; background: white; border-radius: 20px; border: 1px solid #e2e8f0; box-shadow: 0 10px 40px rgba(0,0,0,0.03);"></div>
  `;

  const containerId = `avatarDemoContainer_${targetId}`;
  const container = section.querySelector(`#${containerId}`);

  const updateActiveBtn = name => {
    const nav = section.querySelector(`#avatarNavPills_${targetId}`);
    if (!nav) return;
    nav.querySelectorAll('ui-button').forEach(btn => {
      btn.selected = btn.getAttribute('data-demo') === name;
    });
  };

  // --- Demo Sections ---

  const showVisualStyles = () => {
    updateActiveBtn('styles');
    container.innerHTML = `
      <div class="demo-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); gap: 40px;">
        <div class="demo-card">
          <h4 style="margin-bottom: 24px; color: #1e293b; border-bottom: 1px solid #f1f5f9; padding-bottom: 12px;">Geometric Shapes</h4>
          <div style="display: flex; gap: 24px; align-items: center;">
            <div style="text-align: center;"><ui-avatar src="https://i.pravatar.cc/150?img=1" shape="circle" size="l"></ui-avatar><p style="font-size: 11px; margin-top: 8px;">CIRCLE</p></div>
            <div style="text-align: center;"><ui-avatar src="https://i.pravatar.cc/150?img=2" shape="squircle" size="l"></ui-avatar><p style="font-size: 11px; margin-top: 8px;">SQUIRCLE</p></div>
            <div style="text-align: center;"><ui-avatar src="https://i.pravatar.cc/150?img=3" shape="hexagon" size="l"></ui-avatar><p style="font-size: 11px; margin-top: 8px;">HEXAGON</p></div>
            <div style="text-align: center;"><ui-avatar src="https://i.pravatar.cc/150?img=4" shape="square" size="l"></ui-avatar><p style="font-size: 11px; margin-top: 8px;">SQUARE</p></div>
          </div>
        </div>

        <div class="demo-card">
          <h4 style="margin-bottom: 24px; color: #1e293b; border-bottom: 1px solid #f1f5f9; padding-bottom: 12px;">Sizing Scale</h4>
          <div style="display: flex; gap: 16px; align-items: flex-end;">
            <div style="text-align: center;"><ui-avatar src="https://i.pravatar.cc/150?img=5" size="xs"></ui-avatar><p style="font-size: 9px;">XS</p></div>
            <div style="text-align: center;"><ui-avatar src="https://i.pravatar.cc/150?img=5" size="s"></ui-avatar><p style="font-size: 9px;">S</p></div>
            <div style="text-align: center;"><ui-avatar src="https://i.pravatar.cc/150?img=5" size="m"></ui-avatar><p style="font-size: 9px;">M</p></div>
            <div style="text-align: center;"><ui-avatar src="https://i.pravatar.cc/150?img=5" size="l"></ui-avatar><p style="font-size: 9px;">L</p></div>
            <div style="text-align: center;"><ui-avatar src="https://i.pravatar.cc/150?img=5" size="xl"></ui-avatar><p style="font-size: 9px;">XL</p></div>
            <div style="text-align: center;"><ui-avatar src="https://i.pravatar.cc/150?img=5" size="120"></ui-avatar><p style="font-size: 9px;">120px</p></div>
          </div>
        </div>

        <div class="demo-card">
          <h4 style="margin-bottom: 24px; color: #1e293b; border-bottom: 1px solid #f1f5f9; padding-bottom: 12px;">Source Types</h4>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
            <div style="display: flex; align-items: center; gap: 12px; background: #f8fafc; padding: 12px; border-radius: 12px;">
              <ui-avatar src="https://i.pravatar.cc/150?img=6" size="m"></ui-avatar>
              <div><strong style="font-size: 13px;">Image</strong><p style="font-size: 11px; margin: 0; opacity: 0.7;">Remote URL</p></div>
            </div>
            <div style="display: flex; align-items: center; gap: 12px; background: #f8fafc; padding: 12px; border-radius: 12px;">
              <ui-avatar name="Steve Rogers" size="m" auto-color="true"></ui-avatar>
              <div><strong style="font-size: 13px;">Initials</strong><p style="font-size: 11px; margin: 0; opacity: 0.7;">Auto-Generated</p></div>
            </div>
            <div style="display: flex; align-items: center; gap: 12px; background: #f8fafc; padding: 12px; border-radius: 12px;">
              <ui-avatar icon="bell" icon-library="lucide" bg-color="#10b981" size="m"></ui-avatar>
              <div><strong style="font-size: 13px;">Icon</strong><p style="font-size: 11px; margin: 0; opacity: 0.7;">Lucide Library</p></div>
            </div>
            <div style="display: flex; align-items: center; gap: 12px; background: #f8fafc; padding: 12px; border-radius: 12px;">
              <ui-avatar name="Broken Link" src="https://invalid-url.com" size="m"></ui-avatar>
              <div><strong style="font-size: 13px;">Fallback</strong><p style="font-size: 11px; margin: 0; opacity: 0.7;">Auto-Recovery</p></div>
            </div>
          </div>
        </div>

        <div class="demo-card">
          <h4 style="margin-bottom: 24px; color: #1e293b; border-bottom: 1px solid #f1f5f9; padding-bottom: 12px;">System States</h4>
          <div style="display: flex; gap: 32px; align-items: center;">
            <div style="text-align: center;"><ui-avatar loading="true" size="l"></ui-avatar><p style="font-size: 10px; margin-top: 8px;">LOADING</p></div>
            <div style="text-align: center;"><ui-avatar skeleton="true" size="l"></ui-avatar><p style="font-size: 10px; margin-top: 8px;">SKELETON</p></div>
            <div style="text-align: center;"><ui-avatar editable="true" src="https://i.pravatar.cc/150?img=10" size="l"></ui-avatar><p style="font-size: 10px; margin-top: 8px;">UPLOADABLE</p></div>
          </div>
        </div>
      </div>
    `;
  };

  const showStatusAndPresence = () => {
    updateActiveBtn('presence');
    container.innerHTML = `
      <div class="demo-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); gap: 40px;">
        <div class="demo-card">
          <h4 style="margin-bottom: 24px; color: #1e293b; border-bottom: 1px solid #f1f5f9; padding-bottom: 12px;">Semantic Presence Indicators</h4>
          <div style="display: flex; gap: 24px; align-items: center;">
            <ui-avatar src="https://i.pravatar.cc/150?img=11" size="l" show-status="true" status="online" tooltip-text="Online"></ui-avatar>
            <ui-avatar src="https://i.pravatar.cc/150?img=12" size="l" show-status="true" status="away" tooltip-text="Away"></ui-avatar>
            <ui-avatar src="https://i.pravatar.cc/150?img=13" size="l" show-status="true" status="busy" tooltip-text="Busy (In Call)"></ui-avatar>
            <ui-avatar src="https://i.pravatar.cc/150?img=14" size="l" show-status="true" status="dnd" tooltip-text="Do Not Disturb"></ui-avatar>
            <ui-avatar src="https://i.pravatar.cc/150?img=15" size="l" show-status="true" status="offline" tooltip-text="Offline"></ui-avatar>
          </div>
        </div>

        <div class="demo-card">
          <h4 style="margin-bottom: 24px; color: #1e293b; border-bottom: 1px solid #f1f5f9; padding-bottom: 12px;">Presence Motion (Attention-Grabbing)</h4>
          <div style="display: flex; gap: 32px; align-items: center;">
            <div style="text-align: center;">
                 <ui-avatar src="https://i.pravatar.cc/150?img=16" size="l" show-status="true" status="online" status-pulse="true"></ui-avatar>
                 <p style="font-size: 10px; margin-top: 8px;">STATUS PULSE</p>
            </div>
            <div style="text-align: center;">
                 <ui-avatar src="https://i.pravatar.cc/150?img=17" size="l" active-speaker="true"></ui-avatar>
                 <p style="font-size: 10px; margin-top: 8px;">ACTIVE SPEAKER RING</p>
            </div>
            <div style="text-align: center;">
                 <ui-avatar src="https://i.pravatar.cc/150?img=18" size="l" animation="pulse"></ui-avatar>
                 <p style="font-size: 10px; margin-top: 8px;">AVATAR PULSE</p>
            </div>
          </div>
        </div>

        <div class="demo-card">
          <h4 style="margin-bottom: 24px; color: #1e293b; border-bottom: 1px solid #f1f5f9; padding-bottom: 12px;">Positioning Logic</h4>
          <div style="display: flex; gap: 24px;">
            <ui-avatar src="https://i.pravatar.cc/150?img=20" size="l" show-status="true" status="online" status-position="top-right"></ui-avatar>
            <ui-avatar src="https://i.pravatar.cc/150?img=20" size="l" show-status="true" status="online" status-position="top-left"></ui-avatar>
            <ui-avatar src="https://i.pravatar.cc/150?img=20" size="l" show-status="true" status="online" status-position="bottom-left"></ui-avatar>
            <ui-avatar src="https://i.pravatar.cc/150?img=20" size="l" show-status="true" status="online" status-position="bottom-right"></ui-avatar>
          </div>
          <p style="font-size: 11px; opacity: 0.6; margin-top: 12px;">TR, TL, BL, BR Anchor points for status indicators</p>
        </div>
      </div>
    `;
  };

  const showSocialFeatures = () => {
    updateActiveBtn('social');
    container.innerHTML = `
      <div class="demo-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); gap: 40px;">
        <div class="demo-card">
          <h4 style="margin-bottom: 24px; color: #1e293b; border-bottom: 1px solid #f1f5f9; padding-bottom: 12px;">Instagram Style "Stories"</h4>
          <div style="display: flex; gap: 32px; align-items: center;">
            <div style="text-align: center;">
                 <ui-avatar src="https://i.pravatar.cc/150?img=21" size="xl" story="true"></ui-avatar>
                 <p style="font-size: 9px; margin-top: 8px; color: #ec4899; font-weight: bold;">NEW STORY</p>
            </div>
            <div style="text-align: center;">
                 <ui-avatar src="https://i.pravatar.cc/150?img=22" size="xl" story="true" story-seen="true"></ui-avatar>
                 <p style="font-size: 9px; margin-top: 8px; opacity: 0.5;">SEEN STORY</p>
            </div>
            <div style="text-align: center;">
                 <ui-avatar src="https://i.pravatar.cc/150?img=23" size="xl" story="true" segments="6"></ui-avatar>
                 <p style="font-size: 9px; margin-top: 8px; color: #10b981; font-weight: bold;">6 SEGMENTS</p>
            </div>
          </div>
        </div>

        <div class="demo-card">
          <h4 style="margin-bottom: 24px; color: #1e293b; border-bottom: 1px solid #f1f5f9; padding-bottom: 12px;">Premium Effects Suite</h4>
          <div style="display: flex; gap: 32px; align-items: center; flex-wrap: wrap;">
             <div style="display: flex; flex-direction: column; gap: 20px;">
                <div style="display: flex; align-items: center; gap: 12px;">
                    <ui-avatar src="https://i.pravatar.cc/150?img=24" size="m" verified="true"></ui-avatar>
                    <span style="font-size: 12px; font-weight: 500;">VERIFIED BADGE</span>
                </div>
                <div style="display: flex; align-items: center; gap: 12px;">
                    <ui-avatar src="https://i.pravatar.cc/150?img=25" size="m" reflection="true"></ui-avatar>
                    <span style="font-size: 12px; font-weight: 500;">PREMIUM REFLECTION</span>
                </div>
             </div>
             <div style="display: flex; flex-direction: column; gap: 20px;">
                <div style="display: flex; align-items: center; gap: 12px;">
                    <ui-avatar src="https://i.pravatar.cc/150?img=26" size="m" glass="true" variant="glass"></ui-avatar>
                    <span style="font-size: 12px; font-weight: 500;">GLASSMORPHISM</span>
                </div>
                <div style="display: flex; align-items: center; gap: 12px;">
                    <ui-avatar src="https://i.pravatar.cc/150?img=27" size="m" three-d="true"></ui-avatar>
                    <span style="font-size: 12px; font-weight: 500;">3D HOVER FIELD</span>
                </div>
             </div>
          </div>
        </div>

        <div class="demo-card" style="grid-column: span 1; background: #0f172a; color: white; border: none;">
          <h4 style="margin-bottom: 24px; color: rgba(255,255,255,0.9); border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 12px;">Dark Theme High-Lights</h4>
          <div style="display: flex; gap: 32px; align-items: center;">
            <ui-avatar gradient="true" gradient-colors="#f43f5e, #fb923c" shape="squircle" size="xl" content="★"></ui-avatar>
            <ui-avatar animation="glow" ring-color="#10b981" src="https://i.pravatar.cc/150?img=30" size="xl"></ui-avatar>
            <ui-avatar animation="ring" ring-color="#ec4899" src="https://i.pravatar.cc/150?img=31" size="xl"></ui-avatar>
          </div>
          <p style="font-size: 11px; opacity: 0.5; margin-top: 16px;">Vibrant gradients and glowing rings for dark mode UIs</p>
        </div>
      </div>
    `;
  };

  const showAvatarGroups = () => {
    updateActiveBtn('groups');
    container.innerHTML = `
      <div class="demo-grid" style="display: grid; grid-template-columns: 1fr; gap: 40px;">
        <div class="demo-card">
          <h4 style="margin-bottom: 24px; color: #1e293b; border-bottom: 1px solid #f1f5f9; padding-bottom: 12px;">Managed Stacking (Hover Shift)</h4>
          <p style="color: #64748b; font-size: 13px; margin-bottom: 24px;">Automatically stacks children with 3D shifting effect on hover. Excess avatars are grouped into a roster (+X).</p>
          
          <div style="display: flex; flex-direction: column; gap: 40px;">
             <div>
                <p style="font-size: 11px; font-weight: 600; color: #94a3b8; margin-bottom: 12px;">SIZE: XL | MAX: 4</p>
                <ui-avatar group="true" size="xl" max-visible="4" animated="true">
                  <ui-avatar name="Alice Miller" src="https://i.pravatar.cc/150?img=31"></ui-avatar>
                  <ui-avatar name="Bob Smith" src="https://i.pravatar.cc/150?img=32" status="online" show-status="true"></ui-avatar>
                  <ui-avatar name="Charlie Brown" src="https://i.pravatar.cc/150?img=33"></ui-avatar>
                  <ui-avatar name="David Grey" src="https://i.pravatar.cc/150?img=34"></ui-avatar>
                  <ui-avatar name="Eve Wilson" src="https://i.pravatar.cc/150?img=35"></ui-avatar>
                  <ui-avatar name="Frank Castle" src="https://i.pravatar.cc/150?img=36"></ui-avatar>
                </ui-avatar>
             </div>

             <div>
                <p style="font-size: 11px; font-weight: 600; color: #94a3b8; margin-bottom: 12px;">SHAPE: SQUIRCLE | BORDERED</p>
                <ui-avatar group="true" size="l" shape="squircle" group-border-color="#10b981" group-border-width="3">
                  <ui-avatar name="User A"></ui-avatar>
                  <ui-avatar name="User B" auto-color="true"></ui-avatar>
                  <ui-avatar name="User C"></ui-avatar>
                  <ui-avatar name="User D" auto-color="true"></ui-avatar>
                  <ui-avatar name="User E"></ui-avatar>
                </ui-avatar>
             </div>
          </div>
        </div>

        <div class="demo-card">
          <h4 style="margin-bottom: 24px; color: #1e293b; border-bottom: 1px solid #f1f5f9; padding-bottom: 12px;">Responsive Grid Layout</h4>
          <p style="color: #64748b; font-size: 13px; margin-bottom: 24px;">For displaying a large number of participants in a compact space.</p>
          <ui-avatar group="true" layout="grid" spacing="8" size="m" shape="squircle">
            <ui-avatar name="Participant 1" src="https://i.pravatar.cc/150?img=40"></ui-avatar>
            <ui-avatar name="Participant 2" src="https://i.pravatar.cc/150?img=41"></ui-avatar>
            <ui-avatar name="Participant 3" src="https://i.pravatar.cc/150?img=42"></ui-avatar>
            <ui-avatar name="Participant 4" src="https://i.pravatar.cc/150?img=43"></ui-avatar>
            <ui-avatar name="Participant 5" src="https://i.pravatar.cc/150?img=44"></ui-avatar>
            <ui-avatar name="Participant 6" src="https://i.pravatar.cc/150?img=45"></ui-avatar>
            <ui-avatar name="Participant 7" src="https://i.pravatar.cc/150?img=46"></ui-avatar>
            <ui-avatar name="Participant 8" src="https://i.pravatar.cc/150?img=47"></ui-avatar>
            <ui-avatar name="Participant 9" src="https://i.pravatar.cc/150?img=48"></ui-avatar>
            <ui-avatar name="Participant 10" src="https://i.pravatar.cc/150?img=49"></ui-avatar>
            <ui-avatar name="Participant 11" src="https://i.pravatar.cc/150?img=50"></ui-avatar>
            <ui-avatar name="Participant 12" src="https://i.pravatar.cc/150?img=51"></ui-avatar>
          </ui-avatar>
        </div>
      </div>
    `;
  };

  const updateAvatarPlayground = () => {
    const val = section.querySelector('#playValue').value;
    const shape = section.querySelector('#playShape').value;
    const size = section.querySelector('#playSize').value;
    const library = section.querySelector('#playLibrary').value;
    const status = section.querySelector('#playStatus').value;
    const statusPos = section.querySelector('#playStatusPos').value;
    const anim = section.querySelector('#playAnim').value;

    const showStatus = section.querySelector('#playShowStatus')?.checked || section.querySelector('#playShowStatus')?.getAttribute('checked') === 'true';
    const pulse = section.querySelector('#playPulse')?.checked || section.querySelector('#playPulse')?.getAttribute('checked') === 'true';
    const speaker = section.querySelector('#playSpeaker')?.checked || section.querySelector('#playSpeaker')?.getAttribute('checked') === 'true';
    const story = section.querySelector('#playStory')?.checked || section.querySelector('#playStory')?.getAttribute('checked') === 'true';
    const verified = section.querySelector('#playVerified')?.checked || section.querySelector('#playVerified')?.getAttribute('checked') === 'true';
    const glass = section.querySelector('#playGlass')?.checked || section.querySelector('#playGlass')?.getAttribute('checked') === 'true';
    const threeD = section.querySelector('#play3D')?.checked || section.querySelector('#play3D')?.getAttribute('checked') === 'true';
    const reflection = section.querySelector('#playReflection')?.checked || section.querySelector('#playReflection')?.getAttribute('checked') === 'true';

    const props = [];
    if (val.includes('://') || val.startsWith('/') || val.startsWith('data:')) {
      props.push(`src="${val}"`);
    } else if (val.length > 0 && val.length <= 3) {
      props.push(`content="${val}"`);
    } else if (val.length > 0) {
      props.push(`icon="${val}"`);
      if (library !== 'default') props.push(`icon-library="${library}"`);
    }

    props.push(`shape="${shape}"`);
    props.push(`size="${size}"`);

    const statusCheckbox = section.querySelector('#playShowStatus');
    if (status && statusCheckbox && !statusCheckbox.checked) {
      statusCheckbox.checked = true;
    }

    if (showStatus || (statusCheckbox && statusCheckbox.checked)) props.push(`show-status`);
    if (status) props.push(`status="${status}"`);
    if ((showStatus || status) && statusPos !== 'bottom-right') props.push(`status-position="${statusPos}"`);
    if (pulse) props.push(`status-pulse`);

    if (anim !== 'none') props.push(`animation="${anim}"`);
    if (speaker) props.push(`active-speaker`);
    if (story) props.push(`story`);
    if (verified) props.push(`verified`);
    if (glass) props.push(`glass`);
    if (threeD) props.push(`three-d`);
    if (reflection) props.push(`reflection`);

    const output = section.querySelector('#playOutput');
    const code = section.querySelector('#playCode');

    const html = `<ui-avatar ${props.join(' ')}></ui-avatar>`;
    if (output) output.innerHTML = html;
    if (code) code.innerText = `<ui-avatar\n  ${props.join('\n  ')}\n></ui-avatar>`;
  };

  const copyAvatarPlaygroundCode = btn => {
    const codeEl = section.querySelector('#playCode');
    if (!codeEl) return;

    const code = codeEl.innerText;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(code).then(() => {
        const originalLabel = btn.label;
        btn.label = 'COPIED!';
        btn.color = 'success';
        setTimeout(() => {
          btn.label = originalLabel;
          btn.color = 'secondary';
        }, 2000);
      });
    }
  };

  const showInteractiveAvatar = () => {
    updateActiveBtn('playground');
    container.innerHTML = `
      <div style="display: grid; grid-template-columns: 350px 1fr; gap: 40px;">
        <!-- Controls -->
        <div style="background: #f8fafc; padding: 24px; border-radius: 16px; border: 1px solid #e2e8f0; display: flex; flex-direction: column; gap: 20px;">
          <h5 style="margin: 0; font-weight: 800; text-transform: uppercase; font-size: 11px; letter-spacing: 0.1em; color: #64748b;">Visual Configuration</h5>
          
          <ui-input id="playValue" label="Source Value" value="https://i.pravatar.cc/150?img=68" placeholder="URL, Initials or Icon name"></ui-input>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
            <ui-dropdown id="playShape" label="Shape" value="circle">
              <optgroup label="Geometric Shapes">
                <option value="circle">Circle</option>
                <option value="squircle">Squircle</option>
                <option value="hexagon">Hexagon</option>
                <option value="square">Square</option>
              </optgroup>
            </ui-dropdown>
            <ui-dropdown id="playSize" label="Size" value="m">
              <optgroup label="Sizing Scale">
                <option value="xs">XS (24px)</option>
                <option value="s">S (32px)</option>
                <option value="m">M (40px)</option>
                <option value="l">L (48px)</option>
                <option value="xl">XL (64px)</option>
                <option value="120">120px</option>
              </optgroup>
            </ui-dropdown>
          </div>
          
          <ui-dropdown id="playLibrary" label="Icon Library" value="lucide">
            <option value="default">Default</option>
            <option value="lucide">Lucide</option>
            <option value="fontawesome">FontAwesome</option>
            <option value="icons8">Icons8</option>
            <option value="iconoir">Iconoir</option>
            <option value="ionicons">Ionicons</option>
            <option value="bootstrap">Bootstrap</option>
            <option value="se">SE Icons</option>
          </ui-dropdown>

          <h5 style="margin: 20px 0 0; font-weight: 800; text-transform: uppercase; font-size: 11px; letter-spacing: 0.1em; color: #64748b;">Presence & Status</h5>
          
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
            <ui-dropdown id="playStatus" label="Status" value="">
              <option value="">None</option>
              <option value="online">Online</option>
              <option value="away">Away</option>
              <option value="busy">Busy</option>
              <option value="dnd">DND</option>
            </ui-dropdown>
            <ui-dropdown id="playStatusPos" label="Position" value="bottom-right">
              <option value="bottom-right">Bottom-Right</option>
              <option value="bottom-left">Bottom-Left</option>
              <option value="top-right">Top-Right</option>
              <option value="top-left">Top-Left</option>
            </ui-dropdown>
          </div>

          <ui-dropdown id="playAnim" label="Animation" value="none">
            <option value="none">None</option>
            <option value="pulse">Pulse</option>
            <option value="ring">Ring</option>
            <option value="glow">Glow</option>
          </ui-dropdown>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
             <ui-checkbox id="playShowStatus" label="Show Status"></ui-checkbox>
             <ui-checkbox id="playPulse" label="Status Pulse"></ui-checkbox>
             <ui-checkbox id="playSpeaker" label="Active Speaker"></ui-checkbox>
             <ui-checkbox id="playStory" label="Story Ring"></ui-checkbox>
          </div>

          <h5 style="margin: 20px 0 0; font-weight: 800; text-transform: uppercase; font-size: 11px; letter-spacing: 0.1em; color: #64748b;">Advanced Effects</h5>
          
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
             <ui-checkbox id="playVerified" label="Verified"></ui-checkbox>
             <ui-checkbox id="playGlass" label="Glassmorphism"></ui-checkbox>
             <ui-checkbox id="play3D" label="3D Interaction"></ui-checkbox>
             <ui-checkbox id="playReflection" label="Reflection"></ui-checkbox>
          </div>
        </div>

        <!-- Preview -->
        <div style="display: flex; flex-direction: column; gap: 24px;">
           <div style="flex: 1; min-height: 300px; background: #f1f5f9; border-radius: 16px; display: flex; align-items: center; justify-content: center; position: relative; overflow: hidden;">
              <!-- Background pattern -->
              <div style="position: absolute; inset: 0; opacity: 0.05; background-image: radial-gradient(#000 1px, transparent 1px); background-size: 20px 20px;"></div>
              
              <div id="playOutput" style="transform: scale(2.5);">
                 <ui-avatar src="https://i.pravatar.cc/150?img=68" size="m"></ui-avatar>
              </div>
           </div>

           <div style="background: #1e293b; padding: 24px; border-radius: 16px; color: #e2e8f0; font-family: 'JetBrains Mono', monospace; font-size: 13px; position: relative;">
              <ui-button id="copyCodeBtn" variant="outline" color="secondary" label="COPY CODE" size="md"yle="position: absolute; top: 12px; right: 12px;"></ui-button>
              <pre id="playCode" style="margin: 0; overflow-x: auto;">&lt;ui-avatar ...&gt;&lt;/ui-avatar&gt;</pre>
           </div>
        </div>
      </div>

      <style>
        .control-label { display: flex; flex-direction: column; gap: 6px; font-size: 12px; font-weight: 600; color: #475569; }
        .control-input, .control-select { padding: 8px 12px; border: 1px solid #cbd5e1; border-radius: 8px; font-size: 13px; color: #1e293b; transition: border-color 0.2s; }
        .control-input:focus, .control-select:focus { border-color: #10b981; outline: none; box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1); }
        .demo-card { padding: 24px; background: white; border: 1px solid #f1f5f9; border-radius: 16px; transition: transform 0.3s ease; }
        .demo-card:hover { transform: translateY(-4px); border-color: #e2e8f0; box-shadow: 0 10px 30px rgba(0,0,0,0.02); }
      </style>
    `;

    const playgroundControls = [
      { id: 'playValue', event: 'inputChange' },
      { id: 'playShape', event: 'dropdownChange' },
      { id: 'playSize', event: 'dropdownChange' },
      { id: 'playLibrary', event: 'dropdownChange' },
      { id: 'playStatus', event: 'dropdownChange' },
      { id: 'playStatusPos', event: 'dropdownChange' },
      { id: 'playAnim', event: 'dropdownChange' },
      { id: 'playShowStatus', event: 'checkboxChange' },
      { id: 'playPulse', event: 'checkboxChange' },
      { id: 'playSpeaker', event: 'checkboxChange' },
      { id: 'playStory', event: 'checkboxChange' },
      { id: 'playVerified', event: 'checkboxChange' },
      { id: 'playGlass', event: 'checkboxChange' },
      { id: 'play3D', event: 'checkboxChange' },
      { id: 'playReflection', event: 'checkboxChange' },
    ];

    playgroundControls.forEach(control => {
      const el = container.querySelector(`#${control.id}`);
      if (el) {
        el.addEventListener(control.event, updateAvatarPlayground);
      }
    });

    const copyBtn = container.querySelector('#copyCodeBtn');
    if (copyBtn) {
      copyBtn.addEventListener('click', () => copyAvatarPlaygroundCode(copyBtn));
    }

    setTimeout(updateAvatarPlayground, 20);
  };

  const demoMap = {
    playground: showInteractiveAvatar,
    styles: showVisualStyles,
    presence: showStatusAndPresence,
    social: showSocialFeatures,
    groups: showAvatarGroups,
  };

  // --- Initialization ---

  const nav = section.querySelector(`#avatarNavPills_${targetId}`);
  if (nav) {
    nav.querySelectorAll('ui-button').forEach(btn => {
      btn.addEventListener('click', () => {
        const demo = btn.getAttribute('data-demo');
        if (demoMap[demo]) demoMap[demo]();
      });
    });
  }

  // Default View
  showInteractiveAvatar();
}

export function initAvatarGroupDemo() {
  initAvatarDemo('avatar-group');
}
