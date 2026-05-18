const fs = require('fs');
const content = fs.readFileSync('node_modules/atomicuilibrary/dist/esm/ui-accordion_10.entry.js', 'utf8');
const regex = /h\(([^"'\`\s),]+)/g;
let match;
while ((match = regex.exec(content)) !== null) {
  const arg = match[1];
  // Ignore Host and Fragment (e.g. Host, F)
  if (arg === 'Host' || arg === 'F') continue;
  console.log('Found dynamic tag call:', match[0]);
  console.log('Context:', content.substring(match.index - 100, match.index + 200));
  console.log('--------------------------------------------------');
}
