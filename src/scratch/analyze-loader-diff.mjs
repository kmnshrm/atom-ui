import { readFileSync, copyFileSync, existsSync } from 'fs';
import { join } from 'path';

const SRC = 'c:/Praveen/Personal-repo/kmn/atomicUILibrary/library/dist/esm';
const DST1 = './public/assets';
const DST2 = './public/exploration-project-tailwind';

const srcLoader = readFileSync(join(SRC, 'loader.js'), 'utf8');
const pubLoader = readFileSync(join(DST1, 'loader.js'), 'utf8');

// Find the chunk name containing ui-loader in source loader.js
const jsonStart = srcLoader.indexOf('JSON.parse("') + 'JSON.parse("'.length;
const loaderTagIdx = srcLoader.indexOf('ui-loader', jsonStart);
// Walk backwards from ui-loader to find the opening [" of the chunk  
const before = srcLoader.substring(jsonStart, loaderTagIdx);
// Last occurrence of [[ followed by " is the chunk name start
const chunkStart = before.lastIndexOf('[[');
const nameStart = chunkStart + 3; // skip [["
const nameEnd = srcLoader.indexOf('\\\"', nameStart);
const chunkName = srcLoader.substring(nameStart, nameEnd);
console.log('Chunk containing ui-loader:', chunkName);
console.log('Expected entry file:', chunkName + '.entry.js');

// List all entry files in source
const { readdirSync } = await import('fs');
const srcFiles = readdirSync(SRC);
const srcEntries = srcFiles.filter(f => f.endsWith('.entry.js') || f === 'loader.js' || f === 'index.js');
const pubFiles = readdirSync(DST1);

console.log('\nFiles in source but NOT in public/assets:');
for (const f of srcEntries) {
  if (!pubFiles.includes(f)) {
    console.log(' MISSING:', f);
  }
}

console.log('\nFiles in public/assets that differ from source:');
for (const f of srcEntries) {
  const srcPath = join(SRC, f);
  const dstPath = join(DST1, f);
  if (existsSync(dstPath)) {
    const srcSize = readFileSync(srcPath).length;
    const dstSize = readFileSync(dstPath).length;
    if (srcSize !== dstSize) {
      console.log(' CHANGED:', f, `(src: ${srcSize}, dst: ${dstSize})`);
    }
  }
}
