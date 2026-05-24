import { readFileSync } from 'fs';

const content = readFileSync('c:/Praveen/Personal-repo/kmn/atomicUILibrary/library/dist/esm/loader.js', 'utf8');
const start = content.indexOf('JSON.parse("') + 'JSON.parse("'.length;
// Find the full escaped JSON string - it ends with '")'  but we need the right closing quote
let i = start;
let depth = 0;
let inStr = false;
let escaped2 = false;
while (i < content.length) {
  const ch = content[i];
  if (escaped2) { escaped2 = false; i++; continue; }
  if (ch === '\\') { escaped2 = true; i++; continue; }
  if (ch === '"' && !inStr) { inStr = true; i++; continue; }
  if (ch === '"' && inStr) break;
  i++;
}
const escaped = content.substring(start, i);
// Decode the escaped string
const jsonStr = JSON.parse('"' + escaped + '"');
const parsed = JSON.parse(jsonStr);

for (const chunk of parsed) {
  const chunkName = chunk[0];
  const components = chunk[1];
  for (const comp of components) {
    if (comp[1] === 'ui-loader' || comp[1] === 'ui-skeleton') {
      console.log('Chunk:', chunkName, '| Tag:', comp[1]);
    }
  }
}
console.log('Total chunks:', parsed.length);
