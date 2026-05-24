// Fix loader demos 0, 1, 2 — replace template-literal HTML with expanded static HTML
import { readFileSync, writeFileSync } from 'fs';

const demos = JSON.parse(readFileSync('./src/demos.json', 'utf8'));

const TYPES = [
  'spinner','dots','bar','pulse','ring','bounce','grid','wave',
  'dual-ring','heartbeat','clock','raining-letters','ripple','infinite',
  'wifi','rainbow','square-shuffle','dna-helix','atom-sphere','staircase',
  'radar','liquid-drop','neon-path','neuro-pulse','vortex-ring','cube-fold',
  'breathing','glitch-text','plc-module','m580-signal','circuit-board',
  'callout-rotate','infinite-roller','image',
];

const SIZES = ['3xs', 'xs', 'small', 'md', 'large', 'xl', '3xl', 'jumbo'];

const COLORS = [
  'primary', 'secondary', 'success', 'danger', 'info',
  '#ff00ff',
  'linear-gradient(90deg, #4facfe 0%, #00f2fe 100%)',
];

// ── Demo 0: Animation Types ───────────────────────────────────────────────────
const typeCards = TYPES.map(type => `
          <div style="padding: 25px; border: 1px solid #e2e8f0; border-radius: 12px; background: white; transition: transform 0.2s, box-shadow 0.2s; cursor: default;" onmouseover="this.style.transform='translateY(-4px)';this.style.boxShadow='0 10px 15px -3px rgba(0,0,0,0.1)';" onmouseout="this.style.transform='translateY(0)';this.style.boxShadow='none';">
            <ui-loader type="${type}" color="primary" size="xl"></ui-loader>
            <p style="margin-top: 15px; font-size: 11px; font-weight: 800; text-transform: uppercase; color: #1e293b; letter-spacing: 0.05em;">${type.replace(/-/g, ' ')}</p>
          </div>`).join('');

demos.loader[0].html = `<div class="demo-block">
        <h3>Animation Types</h3>
        <p style="font-size: 13px; color: #64748b; margin-bottom: 24px;">Explore our library of 34 high-fidelity, high-performance animation patterns.</p>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 20px; text-align: center; padding: 20px;">${typeCards}
        </div>
      </div>`;

// ── Demo 1: Size Variants ─────────────────────────────────────────────────────
const sizeCards = SIZES.map(size => `
          <div style="text-align: center;">
            <ui-loader size="${size}" color="primary" type="spinner"></ui-loader>
            <p style="margin-top: 10px; font-size: 10px; font-weight: bold; opacity: 0.6; text-transform: uppercase;">${size}</p>
          </div>`).join('');

demos.loader[1].html = `<div class="demo-block">
        <h3>Size Variants</h3>
        <p style="font-size: 13px; color: #64748b; margin-bottom: 24px;">From micro-indicators (3XS) to massive full-screen attention grabbers (Jumbo).</p>
        <div style="display: flex; gap: 30px; align-items: center; justify-content: center; flex-wrap: wrap; padding: 40px; background: white; border-radius: 12px; border: 1px solid #e2e8f0;">${sizeCards}
        </div>
      </div>`;

// ── Demo 2: Color Palette ─────────────────────────────────────────────────────
const colorCards = COLORS.map(color => {
  const t1 = color.includes('gradient') ? 'dots' : 'spinner';
  const t2 = color.includes('gradient') ? 'bar'  : 'dots';
  return `
          <div style="padding: 24px; background: white; border-radius: 12px; border: 1px solid #e2e8f0; display: flex; flex-direction: column; align-items: center; gap: 12px;">
            <div style="display: flex; gap: 16px;">
              <ui-loader color="${color}" size="md" type="${t1}"></ui-loader>
              <ui-loader color="${color}" size="md" type="${t2}"></ui-loader>
            </div>
            <p style="font-family: monospace; font-size: 11px; color: #64748b; margin: 0;">${color}</p>
          </div>`;
}).join('');

demos.loader[2].html = `<div class="demo-block">
        <h3>Color Palette Showcase</h3>
        <p style="font-size: 13px; color: #64748b; margin-bottom: 24px;">Built-in variants and any custom HEX / Gradients.</p>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; padding: 20px;">${colorCards}
        </div>
      </div>`;

writeFileSync('./src/demos.json', JSON.stringify(demos, null, 2), 'utf8');

// Verify
const check = [0, 1, 2].map(i => demos.loader[i].html.includes('${'));
console.log('Template literals remaining in demos 0,1,2:', check);
console.log('Done — demos.json updated.');
