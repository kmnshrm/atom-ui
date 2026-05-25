import { readFileSync } from 'fs';

const demosFile = readFileSync('./src/demos.json', 'utf8');
const demosData = JSON.parse(demosFile);

console.log('Validating all script tags in demos.json...');

for (const [componentKey, demos] of Object.entries(demosData)) {
  if (!Array.isArray(demos)) continue;

  demos.forEach((demo, index) => {
    const html = demo.html || '';
    
    // Simple regex to find all script contents
    const scriptRegex = /<script[^>]*>([\s\S]*?)<\/script>/gi;
    let match;
    
    while ((match = scriptRegex.exec(html)) !== null) {
      const scriptContent = match[1];
      
      try {
        // Compile the script content to check for syntax errors
        new Function(scriptContent);
      } catch (e) {
        if (e instanceof SyntaxError) {
          console.log(`\n❌ BROKEN SCRIPT FOUND!`);
          console.log(`Component: ${componentKey}`);
          console.log(`Demo [${index}]: ${demo.title}`);
          console.log(`Error: ${e.message}`);
          console.log(`Script content snippet:`);
          console.log(scriptContent.substring(0, 300) + (scriptContent.length > 300 ? '...' : ''));
        }
      }
    }
  });
}
