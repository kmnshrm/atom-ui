export function initCarouselDemo() {
  const section = document.getElementById('carousel');
  if (!section) return;

  const assetPath = '/build/assets/images/';

  const images = [
    'nature_forest_1.png',
    'nature_lake_2.png',
    'nature_desert_3.png',
    'nature_ocean_4.png',
    'slide1.png',
    'slide2.png',
    'slide3.png',
    'nature_lake_2.png',
    'nature_forest_1.png',
    'nature_desert_3.png',
  ];

  section.innerHTML = `
    <div class="demo-wrapper">
      <div class="demo-header-section" style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 24px;">
        <h2 class="demo-section-title" style="display: flex; align-items: center; gap: 12px; font-weight: 800; font-size: 1.75rem; color: var(--text-primary);">
          Carousel 
          <span style="font-size: 0.4em; vertical-align: middle; background: linear-gradient(135deg, #f59e0b, #ef4444); color: white; padding: 4px 12px; border-radius: 20px; font-weight: 800; letter-spacing: 0.05em; box-shadow: 0 4px 10px rgba(245, 158, 11, 0.25);">APEX SUPREME</span>
        </h2>
      </div>

      <nav id="carouselNavPills" style="margin-bottom: 24px; display: flex; gap: 8px; flex-wrap: wrap; background: var(--bg-secondary); padding: 10px; border-radius: 12px; border: 1px solid var(--border-default);">
        <ui-button variant="outline" color="warning" label="Core & Scroll" data-tab="core" size="md"ui-button>
        <ui-button variant="outline" color="warning" label="Motion Engine" data-tab="motion" size="md"ui-button>
        <ui-button variant="outline" color="warning" label="Social Engine" data-tab="social" size="md"ui-button>
        <ui-button variant="outline" color="warning" label="Variable Width" data-tab="variable" size="md"ui-button>
        <ui-button variant="outline" color="warning" label="Infinity Lab" data-tab="infinity" size="md"ui-button>
        <ui-button variant="outline" color="warning" label="Legendary lab" data-tab="legendary" size="md"ui-button>
        <ui-button variant="outline" color="warning" label="Ticker Lab (Auto-Moving)" data-tab="ticker" size="md"ui-button>
        <ui-button variant="outline" color="warning" label="Lazy Lab (SEO/Perf)" data-tab="lazy" size="md"ui-button>
        <ui-button variant="outline" color="warning" label="Cinematic Lab (Premium)" data-tab="cinematic" size="md"ui-button>
      </nav>

      <div id="carouselDemoContainer" style="min-height: 500px;"></div>
    </div>

    <style>
      /* Legendary Stagger logic */
      [data-active="true"] .slide-badge,
      [data-active="true"] .slide-title,
      [data-active="true"] .slide-desc,
      [data-active="true"] .slide-btn {
         animation: apexSlideUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards !important;
         opacity: 0;
      }
      [data-active="true"] .slide-badge { animation-delay: 0.1s; }
      [data-active="true"] .slide-title { animation-delay: 0.25s; }
      [data-active="true"] .slide-desc { animation-delay: 0.4s; }
      [data-active="true"] .slide-btn { animation-delay: 0.55s; }

      @keyframes apexSlideUp {
        from { transform: translateY(40px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
      }

      .stagger-slide { height: 100%; width: 100%; position: relative; overflow: hidden; display: flex; flex-direction: column; justify-content: flex-end; padding: 60px; color: white; }
      .stagger-bg { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; z-index: 0; }
      .stagger-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.9), transparent 80%); z-index: 1; }
      .slide-badge { background: #f59e0b; padding: 4px 12px; border-radius: 20px; font-size: 11px; font-weight: 800; width: fit-content; margin-bottom: 12px; position: relative; z-index: 2; }
      .slide-title { font-size: 2.5rem; font-weight: 800; margin: 0 0 10px; position: relative; z-index: 2; line-height: 1.1; }
      
      .social-preview { background: #000; padding: 50px; border-radius: 40px; display: flex; justify-content: center; }
      .phone-wrap { width: 330px; height: 600px; border: 12px solid #282828; border-radius: 56px; overflow: hidden; position: relative; box-shadow: 0 30px 60px rgba(0,0,0,0.5); }
      .card-item { background: var(--bg-primary); border-radius: 12px; border: 1px solid var(--border-default); display: flex; align-items: center; justify-content: center; font-weight: 800; box-shadow: var(--shadow-sm); flex-shrink:0; }
      .ticker-card { padding: 20px; border-radius: 12px; background: var(--bg-primary); border: 1px solid var(--border-default); display: flex; align-items: center; gap: 15px; min-width: 200px; box-shadow: var(--shadow-sm); }
    </style>
  `;

  const container = document.getElementById('carouselDemoContainer');
  const nav = document.getElementById('carouselNavPills');

  const demoMap = {
    core: () => {
      container.innerHTML = `
        <div class="demo-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 32px;">
           <div class="demo-block">
              <h3 class="demo-section-title" style="font-size: 18px; margin-bottom: 16px;">Horizontal Context</h3>
              <ui-carousel height="250px" indicators="true" arrows-position="sides">
                 ${images
                   .slice(0, 4)
                   .map(img => `<div style="height:100%"><img src="${assetPath}${img}" style="width:100%; height:100%; object-fit:cover; border-radius:12px;" /></div>`)
                   .join('')}
              </ui-carousel>
           </div>
           <div class="demo-block">
              <h3 class="demo-section-title" style="font-size: 18px; margin-bottom: 16px;">Vertical Feed Context</h3>
              <ui-carousel vertical="true" height="250px" autoplay="true" infinite="true">
                 ${images
                   .slice(4, 8)
                   .map(img => `<div style="height:100%"><img src="${assetPath}${img}" style="width:100%; height:100%; object-fit:cover; border-radius:12px;" /></div>`)
                   .join('')}
              </ui-carousel>
           </div>
           <div class="demo-block" style="grid-column: span 2; background: var(--bg-secondary); padding:32px; border-radius:24px; border: 1px solid var(--border-default);">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px;">
                 <h3 style="margin:0; font-size: 18px;">3-Card Grouped Scroll</h3>
                 <ui-pill size="md"riant="outline" color="secondary" label='slides-to-show="3"'></ui-pill>
              </div>
              <ui-carousel slides-to-show="3" slides-to-scroll="3" arrows="true" height="280px" infinite="true">
                 ${Array.from({ length: 9 })
                   .map(
                     (_, i) =>
                       `<div style="padding:10px; height:100%;"><div class="card-item" style="width:100%; height:100%; color: var(--text-primary);">PRODUCT ${i + 1}</div></div>`,
                   )
                   .join('')}
              </ui-carousel>
           </div>
        </div>
      `;
    },
    motion: () => {
      container.innerHTML = `
        <div class="demo-grid" style="display: grid; grid-template-columns: 1fr; gap: 48px;">
           <div class="demo-block">
              <h3 class="demo-section-title" style="font-size: 18px; margin-bottom: 16px;">3D Coverflow (Centered Stack)</h3>
              <ui-carousel effect="coverflow" height="400px" autoplay="true" slides-to-show="3" center-mode="true">
                 ${images
                   .slice(0, 6)
                   .map(img => `<div style="height:100%"><img src="${assetPath}${img}" style="width:100%; height:100%; object-fit:cover; border-radius:16px;" /></div>`)
                   .join('')}
              </ui-carousel>
           </div>
           <div class="demo-block">
              <h3 class="demo-section-title" style="font-size: 18px; margin-bottom: 16px;">3D Cube View</h3>
              <ui-carousel effect="cube" height="400px" indicators-type="pie">
                 ${images
                   .slice(4, 8)
                   .map(img => `<div style="height:100%"><img src="${assetPath}${img}" style="width:100%; height:100%; object-fit:cover; border-radius:16px;" /></div>`)
                   .join('')}
              </ui-carousel>
           </div>
           <div class="demo-block">
              <h3 class="demo-section-title" style="font-size: 18px; margin-bottom: 16px;">Perspective Depth Focus</h3>
              <ui-carousel effect="depth" height="400px" arrows="true" slides-to-show="3" center-mode="true">
                 ${images
                   .slice(0, 6)
                   .map(img => `<div style="height:100%"><img src="${assetPath}${img}" style="width:100%; height:100%; object-fit:cover; border-radius:16px;" /></div>`)
                   .join('')}
              </ui-carousel>
           </div>
           <div class="demo-block">
              <h3 class="demo-section-title" style="font-size: 18px; margin-bottom: 16px;">3D Vertical Wheel</h3>
              <ui-carousel effect="wheel" height="400px" autoplay="true" arrows="true">
                 ${images
                   .slice(1, 6)
                   .map(img => `<div style="height:100%"><img src="${assetPath}${img}" style="width:100%; height:100%; object-fit:cover; border-radius:16px;" /></div>`)
                   .join('')}
              </ui-carousel>
           </div>
           <div class="demo-block">
              <h3 class="demo-section-title" style="font-size: 18px; margin-bottom: 16px;">Full Perspective Flip</h3>
              <ui-carousel effect="flip" height="400px" arrows="true">
                 ${images
                   .slice(0, 4)
                   .map(img => `<div style="height:100%"><img src="${assetPath}${img}" style="width:100%; height:100%; object-fit:cover; border-radius:16px;" /></div>`)
                   .join('')}
              </ui-carousel>
           </div>
        </div>
      `;
    },
    social: () => {
      container.innerHTML = `
        <div class="demo-block" style="display:flex; flex-direction:column; align-items:center;">
           <h3 style="margin-bottom:24px; font-weight:800; color: var(--text-primary);">Mobile Social Story Feed</h3>
           <div class="social-preview">
              <div class="phone-wrap">
                 <ui-carousel indicators="true" indicators-type="segments" autoplay="true" height="100%" effect="fade" infinite="true" autoplay-interval="4000">
                    ${images
                      .slice(0, 6)
                      .map(
                        (img, i) => `
                       <div style="height:100%; position:relative;">
                          <img src="${assetPath}${img}" style="width:100%; height:100%; object-fit:cover;" />
                          <div style="position:absolute; bottom:50px; left:25px; color:white; font-family:system-ui;">
                             <span style="font-weight:900; font-size:1.5rem; letter-spacing:-1px;">STORY ${i + 1}</span>
                             <p style="opacity:0.8; margin-top:4px;">Experience the cinematic fade engine.</p>
                          </div>
                       </div>
                    `,
                      )
                      .join('')}
                 </ui-carousel>
              </div>
           </div>
        </div>
      `;
    },
    variable: () => {
      container.innerHTML = `
        <div class="demo-block">
           <h3 class="demo-section-title" style="font-size: 18px; margin-bottom: 16px;">Variable Width Gallery (10 Cards)</h3>
           <ui-carousel variable-width="true" height="200px" indicators="true" arrows="true" infinite="false">
              <div class="card-item" style="width: 300px; height:100%; margin:0 10px; color: var(--text-primary);">MARKET A (300px)</div>
              <div class="card-item" style="width: 140px; height:100%; margin:0 10px; color: var(--text-primary); background: var(--bg-secondary);">MINI</div>
              <div class="card-item" style="width: 480px; height:100%; margin:0 10px; background:#1e293b; color:white; border: none;">WIDE BANNER AD</div>
              <div class="card-item" style="width: 220px; height:100%; margin:0 10px; background:#f59e0b; color:white; border: none;">HIGHLIGHT</div>
              <div class="card-item" style="width: 110px; height:100%; margin:0 10px; color: var(--text-primary);">110px</div>
              <div class="card-item" style="width: 340px; height:100%; margin:0 10px; color: var(--text-primary);">CARD #6</div>
              <div class="card-item" style="width: 260px; height:100%; margin:0 10px; background:#1e293b; color:white; border: none;">CARD #7</div>
              <div class="card-item" style="width: 190px; height:100%; margin:0 10px; background:#ef4444; color:white; border: none;">CARD #8</div>
              <div class="card-item" style="width: 410px; height:100%; margin:0 10px; background:#334155; color:white; border: none;">CARD #9 (WIDE)</div>
              <div class="card-item" style="width: 130px; height:100%; margin:0 10px; color: var(--text-primary);">CARD #10</div>
           </ui-carousel>
        </div>
      `;
    },
    infinity: () => {
      container.innerHTML = `
        <div class="demo-grid" style="display:grid; grid-template-columns: 1fr 1fr; gap:32px;">
           <div class="demo-block">
              <h3 class="demo-section-title" style="font-size: 18px; margin-bottom: 16px;">Infinite Loop</h3>
              <ui-carousel infinite="true" indicators="true" height="250px" autoplay="true">
                 ${Array.from({ length: 4 }, (_, i) => `<div class="card-item" style="width:100%; height:100%; background:#1e293b; color:white;">LOOP CARD ${i + 1}</div>`).join('')}
              </ui-carousel>
           </div>
           <div class="demo-block">
              <h3 class="demo-section-title" style="font-size: 18px; margin-bottom: 16px;">Boundary Stop (No Empty)</h3>
              <ui-carousel infinite="false" indicators="true" height="250px" arrows="true">
                 ${Array.from({ length: 4 }, (_, i) => `<div class="card-item" style="width:100%; height:100%; background:#10b981; color:white;">STOP AT #${i + 1}</div>`).join('')}
              </ui-carousel>
           </div>
        </div>
      `;
    },
    legendary: () => {
      container.innerHTML = `
        <div class="demo-block">
          <ui-carousel indicators-type="pie" animate-content="true" autoplay="true" height="550px" effect="fade">
             ${images
               .slice(0, 4)
               .map(
                 (img, i) => `
                <div class="stagger-slide">
                   <img src="${assetPath}${img}" class="stagger-bg" />
                   <div class="stagger-overlay"></div>
                   <div class="slide-badge">MASTERCLASS EDITION</div>
                   <h2 class="slide-title">Motion Art Mark #${i + 1}</h2>
                   <ui-button class="slide-btn" label="EXPLORE ARCHIVE" variant="glass" color="primary" size="large" shape="pill" style="margin-top:24px;"></ui-button>
                </div>
             `,
               )
               .join('')}
          </ui-carousel>
        </div>
      `;
    },
    ticker: () => {
      container.innerHTML = `
        <div class="demo-grid" style="display:grid; grid-template-columns: 1fr; gap:32px;">
           <div class="demo-block">
              <h3 class="demo-section-title" style="font-size: 18px; margin-bottom: 16px;">Seamless Continuous Ticker</h3>
              <p style="margin-bottom:20px; opacity:0.7; color: var(--text-secondary);">Ticker mode enabled with custom speed. The track moves continuously at a pixel-perfect rate.</p>
              <ui-carousel ticker="true" ticker-speed="1" height="120px" arrows="false" indicators="false" slides-to-show="4" infinite="true">
                 ${Array.from(
                   { length: 8 },
                   (_, i) => `
                  <div style="padding:10px;">
                    <div class="ticker-card">
                      <div style="width:12px; height:12px; border-radius:50%; background:#10b981;"></div>
                      <div>
                        <div style="font-size:14px; font-weight:700; color: var(--text-primary);">NODE_${i + 1}</div>
                        <div style="font-size:11px; opacity:0.6; color: var(--text-secondary);">LATENCY: ${Math.floor(Math.random() * 20)}ms</div>
                      </div>
                    </div>
                  </div>
                 `,
                 ).join('')}
              </ui-carousel>
           </div>

           <div class="demo-block" style="background:#0f172a; padding:32px; border-radius:24px; color:white; border: 1px solid rgba(255,255,255,0.1);">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px;">
                 <h3 style="margin:0; color:white; font-size: 18px;">Industrial High-Speed Banner</h3>
                 <ui-pill size="md"riant="outline" color="danger" label='ticker-speed="3"'></ui-pill>
              </div>
              <ui-carousel ticker="true" ticker-speed="3" height="150px" arrows="false" indicators="false" infinite="true">
                  <div style="padding:15px; height:100%;"><div class="card-item" style="width:100%; height:100%; background:#1e293b; border-color:#334155; color:white; font-size:1.5rem; white-space:nowrap;">FLASH SALE EVENT STARTING NOW - 40% OFF - TCODE: APEX</div></div>
                  <div style="padding:15px; height:100%;"><div class="card-item" style="width:100%; height:100%; background:#f59e0b; border-color:#f59e0b; color:white; font-size:1.5rem; white-space:nowrap;">NEW MOTION ENGINE RELEASED V1.0 - EXPERIENCE FLUIDITY</div></div>
              </ui-carousel>
           </div>
        </div>
      `;
    },
    lazy: () => {
      container.innerHTML = `
        <div class="demo-block">
           <h3 class="demo-section-title" style="font-size: 18px; margin-bottom: 16px;">Intersection Observer Lazy Loading</h3>
           <p style="margin-bottom:20px; opacity:0.7; color: var(--text-secondary);">Images only load when they are about to enter the viewport (200px threshold). Open network tab to verify.</p>
           <ui-carousel lazy-load="true" height="400px" arrows="true">
              ${images
                .slice(0, 6)
                .map(
                  img => `
                <div style="height:100%">
                  <img data-src="${assetPath}${img}" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=" style="width:100%; height:100%; object-fit:cover; border-radius:12px; background:var(--bg-secondary);" />
                </div>
              `,
                )
                .join('')}
           </ui-carousel>
        </div>
      `;
    },
    cinematic: () => {
      container.innerHTML = `
        <div class="demo-block">
           <h3 class="demo-section-title" style="font-size: 18px; margin-bottom: 16px;">Cinematic Ken-Burns Panning</h3>
           <p style="margin-bottom:20px; opacity:0.7; color: var(--text-secondary);">Enhanced Ken-Burns effect with subtle panning and smoother scaling for high-end photography.</p>
           <ui-carousel effect="ken-burns" autoplay="true" infinite="true" height="500px">
              ${images
                .slice(0, 4)
                .map(
                  img => `
                <div style="height:100%">
                  <img src="${assetPath}${img}" style="width:100%; height:100%; object-fit:cover; border-radius:12px;" />
                </div>
              `,
                )
                .join('')}
           </ui-carousel>
        </div>
      `;
    },
  };

  const showTab = tab => {
    if (demoMap[tab]) {
      demoMap[tab]();

      // // Update nav button styles
      // if (nav) {
      //   nav.querySelectorAll('ui-button').forEach(btn => {
      //     const isMatch = btn.getAttribute('data-tab') === tab;
      //     btn.variant = isMatch ? 'solid' : 'soft';
      //   });
      // }
    }
  };

  // Wire up navigation
  if (nav) {
    nav.querySelectorAll('ui-button').forEach(btn => {
      btn.addEventListener('click', () => {
        const tab = btn.getAttribute('data-tab');
        showTab(tab);
      });
    });
  }

  // Initial tab
  showTab('core');
}
