const fs = require('fs');
const file = 'c:/Praveen/Personal-repo/kmn/atom-ui/src/src/demos.json';
let c = fs.readFileSync(file, 'utf8');
const data = JSON.parse(c);
fs.writeFileSync('c:/Praveen/Personal-repo/kmn/atom-ui/src/src/label_demo.json', JSON.stringify(data.label[0], null, 2));
