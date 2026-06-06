const fs = require('fs');
const file = 'c:/Praveen/Personal-repo/kmn/atom-ui/src/src/demos.json';
let c = fs.readFileSync(file, 'utf8');

// Fix button closing tag
c = c.replace(/size="md"ui-button>/g, 'size="md"></ui-button>');

// Fix playground status background and color for dark mode support
c = c.replace(/background-color: #e0e7ff; border-radius: 6px; margin-bottom: 16px; font-size: 14px; color: #3730a3;/g, 'background-color: var(--bg-secondary, #e0e7ff); border-radius: 6px; margin-bottom: 16px; font-size: 14px; color: inherit;');

fs.writeFileSync(file, c);
console.log('Fixed demos.json');

const labelMatches = c.match(/<ui-label/g);
console.log('ui-label count:', labelMatches ? labelMatches.length : 0);

// Check if there is a "label" demo category
const data = JSON.parse(c);
if (data.label) {
  console.log('Found label demo category with', data.label.length, 'demos.');
} else {
  console.log('No label demo category found.');
}
