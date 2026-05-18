const fs = require('fs');
const content = fs.readFileSync('node_modules/atomicuilibrary/dist/esm/ui-accordion_10.entry.js', 'utf8');
const pos = 128852;
console.log(content.substring(pos - 1000, pos + 100));
