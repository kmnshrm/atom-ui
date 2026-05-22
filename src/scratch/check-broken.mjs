import { readFileSync } from 'fs';
const d = JSON.parse(readFileSync('./src/demos.json', 'utf8'));

// Check all targeted components
const keys = ['breadcrumb','context-menu','scroll-top','tree','stepper','masonry','dock'];
keys.forEach(k => {
  const demos = d[k]||[];
  const bad = demos.filter(demo => demo.html.includes('${') || demo.html.includes('error.message') || demo.html.includes('Invalid JSON'));
  if(bad.length > 0) {
    console.log('=== ' + k + ' BROKEN DEMOS ===');
    bad.forEach((b,i) => {
      console.log('  [' + i + '] Title:', b.title);
      console.log('  HTML (first 600):', b.html.substring(0,600));
      console.log();
    });
  }
});
