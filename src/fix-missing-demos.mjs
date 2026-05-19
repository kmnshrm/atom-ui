/**
 * fix-missing-demos.mjs
 * Extracts demo HTML from source demo files and adds missing entries
 * to demos.json for: code-preview, color-picker, command-palette, icon,
 * number-input, workspace-manager, carousel, animate-on-scroll
 */

import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DEMOS_PATH = join(__dirname, 'src', 'demos.json');
const DEMO_FILES_DIR = join(__dirname, 'src', 'assets', 'demos');

const demos = JSON.parse(readFileSync(DEMOS_PATH, 'utf8'));

/**
 * Extracts the HTML string from a demo file's `section.innerHTML = \`...\`` block,
 * then splits it into demo-block sections.
 */
function extractFromFile(filename, splitByDemoBlock = true) {
  const content = readFileSync(join(DEMO_FILES_DIR, filename), 'utf8');

  // Find the backtick template literal assigned to section.innerHTML
  const startMarker = 'section.innerHTML = `';
  const startIdx = content.indexOf(startMarker);
  if (startIdx === -1) return [];

  const literalStart = startIdx + startMarker.length;
  // Walk to find the closing backtick (not escaped)
  let i = literalStart;
  let inString = null;
  while (i < content.length) {
    const ch = content[i];
    if (ch === '\\') { i += 2; continue; }
    if (ch === '`' && inString === null) break;
    if ((ch === '"' || ch === "'") && inString === null) inString = ch;
    else if (ch === inString) inString = null;
    i++;
  }
  const html = content.slice(literalStart, i).trim();

  if (!splitByDemoBlock) {
    // Return as single demo using the first h2/h3 as title
    const titleMatch = html.match(/<h[23][^>]*>([\s\S]*?)<\/h[23]>/i);
    const title = titleMatch
      ? titleMatch[1].replace(/<[^>]*>/g, '').trim()
      : filename.replace('-demo.js', '');
    const descMatch = html.match(/<p[^>]*class="[^"]*subtitle[^"]*"[^>]*>([\s\S]*?)<\/p>/i)
      || html.match(/<p[^>]*style="[^"]*max-width[^"]*"[^>]*>([\s\S]*?)<\/p>/i)
      || html.match(/<p[^>]*>([\s\S]*?)<\/p>/i);
    const description = descMatch ? descMatch[1].replace(/<[^>]*>/g, '').trim() : '';
    return [{ title, description, html: `<div class="demo-block">\n${html}\n</div>` }];
  }

  // Split by demo-block divs
  const sections = [];
  const blockRegex = /<div[^>]+class="[^"]*demo-block[^"]*"[^>]*>([\s\S]*?)(?=<div[^>]+class="[^"]*demo-block[^"]*"|$)/g;
  let match;

  while ((match = blockRegex.exec(html)) !== null) {
    const blockHtml = match[0].trimEnd().replace(/<div[^>]+class="[^"]*demo-block[^"]*"[^>]*>[\s\S]*$/, s => s) || match[0];
    const fullBlock = extractBlock(html, match.index);
    if (!fullBlock) continue;

    const titleMatch = fullBlock.match(/<h[23][^>]*>([\s\S]*?)<\/h[23]>/i);
    const title = titleMatch
      ? titleMatch[1].replace(/<[^>]*>/g, '').trim()
      : `Demo ${sections.length + 1}`;

    const descMatch = fullBlock.match(/<p[^>]*>([\s\S]*?)<\/p>/i);
    const description = descMatch ? descMatch[1].replace(/<[^>]*>/g, '').trim().slice(0, 200) : '';

    sections.push({ title, description, html: fullBlock });
  }

  // Fallback: if no demo-block divs found, treat whole thing as one section
  if (sections.length === 0) {
    const titleMatch = html.match(/<h[23][^>]*>([\s\S]*?)<\/h[23]>/i);
    const title = titleMatch
      ? titleMatch[1].replace(/<[^>]*>/g, '').trim()
      : filename.replace('-demo.js', '');
    sections.push({ title, description: '', html });
  }

  return sections;
}

/** Extract a single balanced div block starting at index idx in html string */
function extractBlock(html, idx) {
  let depth = 0;
  let i = idx;
  const start = idx;
  while (i < html.length) {
    if (html[i] === '<') {
      const closeMatch = html.slice(i).match(/^<\/(\w+)/);
      const openMatch = html.slice(i).match(/^<(\w+)[^>]*>/);
      if (closeMatch) {
        depth--;
        if (depth === 0) {
          i += closeMatch[0].length;
          return html.slice(start, i);
        }
        i++;
      } else if (openMatch && !html.slice(i).match(/^<[^>]+\/>/)) {
        depth++;
        i += openMatch[0].length;
      } else {
        i++;
      }
    } else {
      i++;
    }
  }
  return html.slice(start);
}

/**
 * Better extractor: splits on h3/h4 sections within a demo-wrapper
 */
function extractSectionsByHeading(filename) {
  const content = readFileSync(join(DEMO_FILES_DIR, filename), 'utf8');
  // Support both section.innerHTML and container.innerHTML patterns
  const startMarkers = [
    'section.innerHTML = `',
    'container.innerHTML = `',
    'section.innerHTML=`',
    'container.innerHTML=`',
  ];
  let startIdx = -1;
  let startMarker = '';
  for (const m of startMarkers) {
    const idx = content.indexOf(m);
    if (idx !== -1 && (startIdx === -1 || idx < startIdx)) {
      startIdx = idx;
      startMarker = m;
    }
  }
  if (startIdx === -1) return [];

  const literalStart = startIdx + startMarker.length;
  let i = literalStart;
  while (i < content.length) {
    const ch = content[i];
    if (ch === '\\') { i += 2; continue; }
    if (ch === '`') break;
    i++;
  }
  const html = content.slice(literalStart, i).trim();

  // Try splitting by demo-block first
  const demoBlocks = [...html.matchAll(/<div[^>]+class="[^"]*demo-block[^"]*"/g)];
  if (demoBlocks.length > 0) {
    return splitByDemoBlockDivs(html);
  }

  // Otherwise split by demo-card or demo-section divs
  const demoCards = [...html.matchAll(/<div[^>]+class="[^"]*(?:demo-card|demo-section|demo-item)[^"]*"/g)];
  if (demoCards.length > 1) {
    return splitIntoChunks(html, filename);
  }

  // Single big section
  const titleMatch = html.match(/<h[12][^>]*>([\s\S]*?)<\/h[12]>/i);
  const title = titleMatch ? titleMatch[1].replace(/<[^>]*>/g, '').trim() : filename.replace('-demo.js', '');
  return [{ title, description: '', html }];
}

function splitByDemoBlockDivs(html) {
  const sections = [];
  // Use a regex to find all top-level demo-block divs
  let searchFrom = 0;
  while (searchFrom < html.length) {
    const blockStart = html.indexOf('<div class="demo-block">', searchFrom);
    if (blockStart === -1) break;

    // Find matching closing </div>
    let depth = 0;
    let i = blockStart;
    let blockEnd = -1;
    while (i < html.length) {
      if (html.slice(i).startsWith('<div')) depth++;
      else if (html.slice(i).startsWith('</div>')) {
        depth--;
        if (depth === 0) { blockEnd = i + 6; break; }
      }
      i++;
    }

    if (blockEnd === -1) break;
    const blockHtml = html.slice(blockStart, blockEnd);

    const titleMatch = blockHtml.match(/<h[234][^>]*>([\s\S]*?)<\/h[234]>/i);
    const title = titleMatch ? titleMatch[1].replace(/<[^>]*>/g, '').trim() : `Demo ${sections.length + 1}`;
    const descMatch = blockHtml.match(/<p[^>]*>([\s\S]*?)<\/p>/i);
    const description = descMatch ? descMatch[1].replace(/<[^>]*>/g, '').trim().slice(0, 200) : '';

    sections.push({ title, description, html: blockHtml });
    searchFrom = blockEnd;
  }
  return sections.length > 0 ? sections : [{ title: 'Demo', description: '', html }];
}

function splitIntoChunks(html, filename) {
  const title = filename.replace('-demo.js', '').replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  return [{ title, description: '', html }];
}

// ─── EXTRACT & ADD MISSING DEMOS ─────────────────────────────────────────────

const toProcess = [
  { key: 'code-preview', file: 'code-preview-demo.js' },
  { key: 'color-picker', file: 'color-picker-demo.js' },
  { key: 'command-palette', file: 'command-palette-demo.js' },
  { key: 'icon', file: 'icon-demo.js' },
  { key: 'number-input', file: 'number-input-demo.js' },
  { key: 'workspace-manager', file: 'workspace-manager-demo.js' },
  { key: 'carousel', file: 'carousel-demo.js' },
  { key: 'animate-on-scroll', file: 'animate-on-scroll-demo.js' },
];

let added = 0;
let skipped = 0;

for (const { key, file } of toProcess) {
  if (demos[key] && demos[key].length > 0) {
    console.log(`  SKIP  ${key} (already has ${demos[key].length} demos)`);
    skipped++;
    continue;
  }

  try {
    const sections = extractSectionsByHeading(file);
    if (sections.length === 0) {
      console.log(`  WARN  ${key}: no sections found`);
      continue;
    }
    demos[key] = sections;
    console.log(`  ADD   ${key}: ${sections.length} demo section(s) — "${sections[0].title}"`);
    added++;
  } catch (err) {
    console.log(`  ERR   ${key}: ${err.message}`);
  }
}

writeFileSync(DEMOS_PATH, JSON.stringify(demos, null, 2), 'utf8');
console.log(`\nDone. Added: ${added}, Skipped: ${skipped}`);
