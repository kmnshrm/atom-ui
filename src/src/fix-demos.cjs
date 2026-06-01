const fs = require('fs');
const path = 'c:/Naveen/PersonalRepo/atom-ui/src/src/demos.json';
let data = JSON.parse(fs.readFileSync(path, 'utf8'));

let html = data['workspace-manager'][0].html;

const regex = /<strong style=\"display: block; font-size: 14px;([^>]+)>([^<]+)<\/strong>[\r\n\s]*<span style=\"font-size: 11px;([^>]+)>([^<]+)<\/span>/g;

html = html.replace(regex, `<div style="display: flex; flex-direction: column; align-items: flex-start; gap: 4px;">
              <strong style="display: block; font-size: 14px;$1>$2</strong>
              <span style="font-size: 11px;$3>$4</span>
            </div>`);

data['workspace-manager'][0].html = html;
fs.writeFileSync(path, JSON.stringify(data, null, 2));
console.log('Fixed workspace-manager html');
