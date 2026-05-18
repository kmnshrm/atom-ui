const fs = require('fs');
const content = fs.readFileSync('node_modules/atomicuilibrary/dist/esm/ui-accordion_10.entry.js', 'utf8');
const pos = 192139;
console.log(content.substring(pos - 3500, pos - 1000));
