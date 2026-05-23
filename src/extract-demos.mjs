import fs from 'fs';
import path from 'path';

const DEMOS_DIR = '../../atomicUILibrary/library/src/assets/js/demos';
const OUTPUT_FILE = './src/demos.json';

// Mapping from file names to navigation ids
const COMPONENT_ID_MAP = {
  'aside-panel': 'aside',
  'accordion': 'accordion',
  'advanced-data-table': 'advanced-data-table',
  'button': 'button',
  'button-toggle': 'button-toggle',
  'checkbox': 'checkbox',
  'dropdown': 'dropdown',
  'input': 'input',
  'otp-input': 'otp-input',
  'pattern-input': 'pattern-input',
  'picklist': 'picklist',
  'radio': 'radio',
  'range-slider': 'range-slider',
  'rating': 'rating',
  'switch': 'switch',
  'transfer-list': 'transfer-list',
  'knob': 'knob',
  'list': 'list',
  'meter-group': 'meter-group',
  'pagination': 'pagination',
  'progress': 'progress',
  'speedometer': 'speedometer',
  'timeline': 'timeline',
  'tree': 'tree',
  'layout-manager': 'layout-manager',
  'card': 'card',
  'divider': 'divider',
  'dock': 'dock',
  'masonry': 'masonry',
  'splitter': 'splitter',
  'stack': 'stack',
  'anchor': 'anchor',
  'breadcrumb': 'breadcrumb',
  'context-menu': 'context-menu',
  'scroll-top': 'scroll-top',
  'speed-dial': 'speed-dial',
  'tabs': 'tabs',
  'avatar': 'avatar',
  'badge': 'badge',
  'callout-banner': 'callout-banner',
  'empty-state': 'empty-state',
  'icon': 'icon',
  'loader': 'loader',
  'skeleton': 'skeleton',
  'tag': 'tag',
  'tooltip': 'tooltip',
  'carousel': 'carousel',
  'color-picker': 'color-picker',
  'dialog': 'dialog',
  'popover': 'popover',
  'snackbar': 'snackbar',
  'stepper': 'stepper',
  'timer': 'timer',
  'toolbar': 'toolbar'
};

function extractDemos() {
  const files = fs.readdirSync(DEMOS_DIR);
  const allDemos = {};

  for (const file of files) {
    if (!file.endsWith('-demo.js')) continue;

    const baseName = file.replace('-demo.js', '');
    const componentId = COMPONENT_ID_MAP[baseName] || baseName;

    const filePath = path.join(DEMOS_DIR, file);
    const content = fs.readFileSync(filePath, 'utf8');

    console.log(`Processing file: ${file} (Component: ${componentId})`);

    let sharedData = '';
    if (baseName === 'advanced-data-table') {
      const startIdx = content.indexOf('const sampleData = [');
      const endIdx = content.indexOf('function showMasterTier');
      if (startIdx !== -1 && endIdx !== -1) {
        sharedData = content.slice(startIdx, endIdx).trim();
      }
    }

    const sections = [];
    
    // Find all functions in this file sequentially using exec loop
    const funcRegex = /(?:export\s+)?(?:async\s+)?function\s+(\w+)\s*\([^)]*\)\s*\{|(?:window\.)?(\w+)\s*=\s*(?:async\s*)?(?:\([^)]*\)|[\w]+)\s*=>\s*\{|(?:window\.)?(\w+)\s*=\s*(?:async\s+)?function\s*\([^)]*\)\s*\{/g;
    let match;

    while ((match = funcRegex.exec(content)) !== null) {
      const funcName = match[1] || match[2] || match[3];
      if (!funcName) continue;

      // Skip helper functions that do not start with 'show'
      if (!funcName.startsWith('show')) continue;

      // Find matching closing brace for this function
      const bodyStartIndex = match.index + match[0].length - 1; // index of '{'
      let braceCount = 1;
      let bodyEndIndex = bodyStartIndex + 1;
      let inString = null; // '"', "'", "`"
      let inComment = null; // 'line', 'block'

      while (bodyEndIndex < content.length && braceCount > 0) {
        const char = content[bodyEndIndex];
        const nextChar = content[bodyEndIndex + 1];

        if (inComment === 'line') {
          if (char === '\n' || char === '\r') {
            inComment = null;
          }
        } else if (inComment === 'block') {
          if (char === '*' && nextChar === '/') {
            inComment = null;
            bodyEndIndex++;
          }
        } else if (inString) {
          if (char === '\\') {
            bodyEndIndex++; // Skip escaped char
          } else if (char === inString) {
            inString = null;
          }
        } else {
          if (char === '/' && nextChar === '/') {
            inComment = 'line';
            bodyEndIndex++;
          } else if (char === '/' && nextChar === '*') {
            inComment = 'block';
            bodyEndIndex++;
          } else if (char === "'" || char === '"' || char === '`') {
            inString = char;
          } else if (char === '{') {
            braceCount++;
          } else if (char === '}') {
            braceCount--;
          }
        }
        bodyEndIndex++;
      }

      const funcBody = content.slice(bodyStartIndex + 1, bodyEndIndex - 1);

      // Extract template literal backtick string inside this function body
      // We look for backtick starting after .innerHTML = or return
      const innerHtmlMatch = funcBody.match(/(?:\.innerHTML|return)\s*=\s*`([\s\S]*?)`/);
      if (innerHtmlMatch) {
        let html = innerHtmlMatch[1];
        
        // Extract rest of function body after the backtick string literal to see if there is JS/setTimeout logic
        const htmlEndIndex = funcBody.indexOf('`', funcBody.indexOf('`') + 1);
        let jsLogic = '';
        if (htmlEndIndex !== -1) {
          jsLogic = funcBody.slice(htmlEndIndex + 1).trim();
          // Remove trailing semi-colon if any
          if (jsLogic.startsWith(';')) jsLogic = jsLogic.slice(1).trim();
        }

        // Parse HTML to extract first h3/h4 tag for title
        let title = '';
        const titleMatch = html.match(/<h3[^>]*>([\s\S]*?)<\/h3>/i) || html.match(/<h4[^>]*>([\s\S]*?)<\/h4>/i);
        if (titleMatch) {
          title = titleMatch[1].replace(/<[^>]*>/g, '').trim();
        } else {
          // Fallback title from function name
          title = funcName
            .replace(/^show/, '')
            .replace(/([A-Z])/g, ' $1')
            .trim();
        }

        // Parse HTML to extract first descriptive paragraph <p> following the heading
        let description = '';
        const descMatch = html.match(/<p[^>]*>([\s\S]*?)<\/p>/i);
        if (descMatch) {
          description = descMatch[1].replace(/<[^>]*>/g, '').trim();
        }

        // If there's JS logic, wrap it in a <script> tag and append to HTML!
        if (jsLogic && jsLogic.length > 10) {
          let fullJsLogic = jsLogic;
          if (sharedData) {
            fullJsLogic = sharedData + '\n\n' + jsLogic;
          }
          // Wrap the script in an IIFE so variables don't bleed
          html += `\n<script>\n(function() {\n  ${fullJsLogic}\n})();\n</script>`;
        }

        // Avoid adding duplicate sections with the same title
        if (!sections.some(s => s.title === title)) {
          sections.push({
            title,
            description,
            html: html.trim()
          });
        }
      }
    }

    if (sections.length > 0) {
      allDemos[componentId] = sections;
    }
  }

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(allDemos, null, 2), 'utf8');
  console.log(`Successfully wrote ${Object.keys(allDemos).length} components' demos to ${OUTPUT_FILE}`);
}

extractDemos();
