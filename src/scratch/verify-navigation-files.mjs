// Verify navigation bar chunk files exist in public/assets
import { existsSync } from 'fs';
import { join } from 'path';

const destDir = join(process.cwd(), 'public', 'assets');
const files = [
  'ui-navigation-item.entry.js',
  'nav-bar.entry.js',
];

for (const file of files) {
  const exists = existsSync(join(destDir, file));
  console.log(file, exists ? 'OK' : 'MISSING');
}
