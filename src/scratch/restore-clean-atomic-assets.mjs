import { copyFileSync, mkdirSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

const cleanEsmDir = join(process.cwd(), 'scratch', 'atomic-clean', 'package', 'dist', 'esm');
const targets = [
  join(process.cwd(), 'node_modules', 'atomicuilibrary', 'dist', 'esm'),
  join(process.cwd(), 'public', 'assets'),
  join(process.cwd(), 'public', 'exploration-project-tailwind'),
];

const shouldCopy = (file) => file.endsWith('.js') || file.endsWith('.css');

for (const targetDir of targets) {
  mkdirSync(targetDir, { recursive: true });

  let copied = 0;
  for (const file of readdirSync(cleanEsmDir)) {
    const sourcePath = join(cleanEsmDir, file);
    if (!statSync(sourcePath).isFile() || !shouldCopy(file)) continue;

    copyFileSync(sourcePath, join(targetDir, file));
    copied += 1;
  }

  console.log(`Restored ${copied} clean atomic UI ESM files to ${targetDir}`);
}
