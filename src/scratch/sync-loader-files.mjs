// Sync the newer source library files to npm package and public asset folders
// This adds ui-loader (and other updated components) which are in the local source but not in the published npm package

import { readFileSync, writeFileSync, copyFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';

const SRC    = 'c:/Praveen/Personal-repo/kmn/atomicUILibrary/library/dist/esm';
const TARGETS = [
  './node_modules/atomicuilibrary/dist/esm',
  './public/exploration-project-tailwind',
  './public/assets',
];

// Files that need syncing (different or missing compared to public/assets)
const FILES_TO_SYNC = [
  'loader.js',
  'ui-accordion_11.entry.js',   // contains ui-loader - MISSING from current assets
  'ui-pagination_4.entry.js',   // MISSING from current assets
  'ui-advanced-data-table.entry.js',
  'ui-anchor.entry.js',
  'ui-aside-panel.entry.js',
  'ui-card.entry.js',
  'ui-checkbox.entry.js',
  'ui-list-group_2.entry.js',
  'ui-progress.entry.js',
];

for (const file of FILES_TO_SYNC) {
  const srcPath = join(SRC, file);
  if (!existsSync(srcPath)) {
    console.warn('SKIP (not in source):', file);
    continue;
  }
  const content = readFileSync(srcPath);
  let copied = 0;
  for (const target of TARGETS) {
    if (!existsSync(target)) {
      console.warn('Target dir missing, skipping:', target);
      continue;
    }
    const dstPath = join(target, file);
    writeFileSync(dstPath, content);
    copied++;
  }
  console.log(`Synced ${file} → ${copied} target(s)`);
}

// Verify ui-loader is now in the npm loader.js
const newLoader = readFileSync('./node_modules/atomicuilibrary/dist/esm/loader.js', 'utf8');
const hasLoader = newLoader.includes('ui-loader');
console.log('\nVerification:');
console.log('npm loader.js has ui-loader:', hasLoader);
const hasAccordion11 = existsSync('./public/exploration-project-tailwind/ui-accordion_11.entry.js');
console.log('exploration-project-tailwind/ui-accordion_11.entry.js exists:', hasAccordion11);
