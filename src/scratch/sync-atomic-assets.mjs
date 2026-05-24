import { copyFileSync, existsSync, mkdirSync, readdirSync, readFileSync, statSync } from 'fs';
import { join } from 'path';

const sourceDir = join(process.cwd(), 'node_modules', 'atomicuilibrary', 'dist', 'esm');
const targets = [
  join(process.cwd(), 'public', 'assets'),
  join(process.cwd(), 'public', 'exploration-project-tailwind'),
];

const shouldCopy = (file) => file.endsWith('.js') || file.endsWith('.css');

const ensureRuntimeAlias = () => {
  const loaderPath = join(sourceDir, 'loader.js');
  const loader = readFileSync(loaderPath, 'utf8');
  const runtimeMatch = loader.match(/from '\.\/(index-[^']+\.js)'/);
  const runtimeFile = runtimeMatch?.[1];
  if (!runtimeFile) return;

  const runtimePath = join(sourceDir, runtimeFile);
  if (existsSync(runtimePath)) return;

  const fallbackRuntime = readdirSync(sourceDir).find(file => /^index-[\w-]+\.js$/.test(file) && file !== 'index.js');
  if (!fallbackRuntime) {
    throw new Error(`Missing Stencil runtime ${runtimeFile} and no fallback index-*.js file was found.`);
  }

  copyFileSync(join(sourceDir, fallbackRuntime), runtimePath);
  console.log(`Created missing Stencil runtime alias ${runtimeFile} from ${fallbackRuntime}`);
};

ensureRuntimeAlias();

for (const targetDir of targets) {
  mkdirSync(targetDir, { recursive: true });

  let copied = 0;
  for (const file of readdirSync(sourceDir)) {
    const sourcePath = join(sourceDir, file);
    if (!statSync(sourcePath).isFile() || !shouldCopy(file)) continue;

    copyFileSync(sourcePath, join(targetDir, file));
    copied += 1;
  }

  console.log(`Synced ${copied} atomic UI asset files to ${targetDir}`);
}
