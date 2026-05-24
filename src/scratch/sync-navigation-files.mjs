// Sync navigation bar chunk files from local build to public assets
import { copyFileSync } from 'fs';
import { join } from 'path';

const srcDir = join(process.cwd(), 'node_modules', 'atomicuilibrary', 'dist', 'esm');
const destDir = join(process.cwd(), 'public', 'assets');

const files = [
  'ui-navigation-item.entry.js',
  'nav-bar.entry.js',
  // Add any other navigation-related chunks if needed
];

for (const file of files) {
  try {
    copyFileSync(join(srcDir, file), join(destDir, file));
    console.log('Copied', file);
  } catch (e) {
    console.error('Failed to copy', file, e.message);
  }
}
