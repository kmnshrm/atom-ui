import { readFileSync } from 'fs';

const f = readFileSync('c:/Praveen/Personal-repo/kmn/atomicUILibrary/library/dist/esm/loader.js', 'utf8');
const i = f.indexOf('ui-loader');

// Search backward for [[\" pattern (chunk start) in the raw file
// In the source file, JSON.parse("...") contains \" for quotes
// So a chunk boundary looks like: [["chunkName", which in raw file is [[\\"chunkName\\"
// meaning the bytes are: [ [ \ " c h u n k N a m e \ "

let j = i;
while (j > 0) {
  j--;
  // Look for [[ followed by \" (which is \\ + " as two chars, or as the literal pair \ and ")
  if (f[j] === '[' && j + 1 < f.length && f[j+1] === '[') {
    // Check if followed by \" (backslash + quote)
    if (j + 2 < f.length && f[j+2] === '\\' && j + 3 < f.length && f[j+3] === '"') {
      const nameEnd = f.indexOf('\\"', j + 4);
      const name = f.substring(j + 4, nameEnd);
      console.log('Chunk at offset', j - i, 'from ui-loader, name:', JSON.stringify(name));
      break;
    }
  }
}
// Also show 20 chars before/after the pattern
const ctx = f.substring(Math.max(0, j - 10), j + 50);
console.log('Context:', JSON.stringify(ctx));
