const fs = require('fs');
const content = fs.readFileSync('node_modules/atomicuilibrary/dist/esm/ui-accordion_10.entry.js', 'utf8');
let pos = 0;
while ((pos = content.indexOf('h(Tag', pos)) !== -1) {
  console.log('--- FOUND at', pos, '---');
  console.log(content.substring(pos - 150, pos + 500));
  pos += 5;
}
