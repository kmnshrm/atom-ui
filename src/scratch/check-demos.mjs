import { readFileSync } from 'fs';
const d = JSON.parse(readFileSync('./src/demos.json', 'utf8'));
const keys = ['meter-group','pagination','timeline','tree','stepper','masonry','dock'];
keys.forEach(k => {
  const demos = d[k]||[];
  const bad = demos.filter(demo => demo.html.includes('${') || demo.html.includes('error.message') || demo.html.includes('Invalid JSON'));
  console.log(k + ':', bad.length > 0 ? bad.length + ' BROKEN demos' : 'ALL OK');
  if(bad.length > 0) bad.forEach(b => console.log(' BROKEN:', b.title, '|', b.html.substring(0,100)));
});
