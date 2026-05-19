import { readFileSync, writeFileSync } from 'fs';

const DEMOS_PATH = './src/demos.json';
let demosContent = readFileSync(DEMOS_PATH, 'utf8');

// 1. Repair popover buttons: Replace ${btn(...)} or ${btn(...)} patterns
const btnRegex = /\$\{btn\(\s*'([^']+)'\s*(?:,\s*'([^']+)'\s*)?(?:,\s*'([^']+)'\s*)?\)\}/g;

demosContent = demosContent.replace(btnRegex, (match, text, bg, extra) => {
  bg = bg || '';
  extra = extra || '';
  let color = 'success';
  if (bg.includes('#f59e0b') || bg.includes('#ea580c') || bg.includes('#d97706')) color = 'warning';
  else if (bg.includes('#8b5cf6') || bg.includes('#1f2937') || bg.includes('#374151')) color = 'secondary';
  else if (bg.includes('#6366f1') || bg.includes('#2563eb')) color = 'primary';
  else if (bg.includes('#ec4899') || bg.includes('#dc2626') || bg.includes('#ef4444')) color = 'error';
  else if (bg.includes('#0891b2') || bg.includes('#0ea5e9')) color = 'info';
  
  let styleAttr = extra ? ` style=\\"${extra}\\"` : '';
  return `<ui-button label=\\"${text}\\" color=\\"${color}\\" variant=\\"outline\\"${styleAttr}></ui-button>`;
});

// 2. Fix the corrupted encoding/unicode characters globally
const replacements = [
  // Emojis in titles/descriptions/HTML
  { search: /≡ƒææ/g, replace: '👑' },
  { search: /≡ƒÆÄ/g, replace: '💎' },
  { search: /≡ƒ¢╕/g, replace: '🎛️' },
  { search: /≡ƒôÜ/g, replace: '📚' },
  { search: /≡ƒôä/g, replace: '📄' },
  { search: /≡ƒîì/g, replace: '🌐' },
  { search: /≡ƒÜÇ/g, replace: '🚀' },
  { search: /≡ƒºè/g, replace: '🪟' },
  { search: /≡ƒÄ«/g, replace: '🎮' },
  { search: /≡ƒô£/g, replace: '📜' },
  { search: /≡ƒîî/g, replace: '🌌' },
  { search: /≡ƒÄ¡/g, replace: '🎭' },
  { search: /≡ƒÄ¿/g, replace: '🎨' },
  { search: /≡ƒôÉ/g, replace: '📐' },
  { search: /≡ƒÅå/g, replace: '🏆' },
  { search: /≡ƒöÉ/g, replace: '🔐' },
  { search: /≡ƒû▒/g, replace: '🖱️' },
  { search: /≡ƒûÑ∩╕Å/g, replace: '🖥️' },
  { search: /≡ƒñ¥/g, replace: '🤝' },
  { search: /≡ƒÆ¼/g, replace: '💬' },
  { search: /≡ƒùæ∩╕Å/g, replace: '⚠️' },
  { search: /≡ƒùé/g, replace: '📥' },
  { search: /≡ƒºá/g, replace: '🧠' },
  { search: /≡ƒÄ»/g, replace: '🎯' },

  // Newly identified emoji corruptions in dialog / aside
  { search: /≡ƒñû/g, replace: '🤖' },
  { search: /≡ƒñÅ/g, replace: '🤏' },
  { search: /≡ƒÄÖ/g, replace: '🎙️' },
  { search: /≡ƒÆ╛/g, replace: '💾' },
  { search: /ΓÅ│/g, replace: '⏳' },
  { search: /≡ƒ¢í/g, replace: '🛡️' },
  { search: /≡ƒÅá/g, replace: '🏠' },
  { search: /≡ƒôè/g, replace: '📊' },
  { search: /ΓÜÖ/g, replace: '⚙️' },
  { search: /≡ƒö▓/g, replace: '🔲' },
  { search: /≡ƒÜÑ/g, replace: '🚨' },
  { search: /≡ƒöè/g, replace: '🔊' },
  { search: /≡ƒöÆ/g, replace: '🔒' },
  { search: /Γåö/g, replace: '↔️' },
  { search: /≡ƒô▒/g, replace: '📱' },
  { search: /≡ƒ¢æ/g, replace: '🛑' },

  // Newly identified in dialog
  { search: /≡ƒöä/g, replace: '🔄' },
  { search: /≡ƒ¬ƒ/g, replace: '🪟' },
  { search: /≡ƒô¥/g, replace: '📝' },
  { search: /ΓÜá/g, replace: '⚠️' },
  { search: /≡ƒº▓/g, replace: '🧲' },
  { search: /≡ƒôü/g, replace: '📁' },
  { search: /≡ƒîÉ/g, replace: '🌐' },
  { search: /≡ƒº¢/g, replace: '🧙' },
  { search: /Γÿü/g, replace: '☁️' },
  { search: /≡ƒôƒ/g, replace: '📟' },
  { search: /≡ƒôê/g, replace: '📈' },
  { search: /≡ƒû╝/g, replace: '🖼️' },
  { search: /≡ƒò╡/g, replace: '🕵️' },
  { search: /≡ƒº⌐/g, replace: '🧩' },
  { search: /≡ƒÅ╖/g, replace: '🏷️' },
  { search: /≡ƒæñ/g, replace: '👥' },
  { search: /Γæá/g, replace: '①' },
  { search: /Γæí/g, replace: '②' },
  { search: /Γæó/g, replace: '③' },
  { search: /Γæú/g, replace: '④' },
  { search: /≡ƒôï/g, replace: '📋' },
  { search: /Γï»/g, replace: '⋯' },
  { search: /ΓåÆ/g, replace: '➡️' },
  { search: /≡ƒº¬/g, replace: '🧪' },
  { search: /Γ£à/g, replace: '✅' },
  { search: /Γ£ò/g, replace: '❌' },
  { search: /Γ£ô/g, replace: '✓' },
  { search: /≡ƒÜ¿/g, replace: '🚨' },
  { search: /≡ƒîÇ/g, replace: '🌀' },
  { search: /≡ƒæç/g, replace: '👇' },
  { search: /Γëí/g, replace: '≡' },
  { search: /≡ƒæ╗/g, replace: '👻' },
  { search: /≡ƒî│/g, replace: '🌲' },
  { search: /ΓÅ▒/g, replace: '⏱️' },

  // Newly identified in popover
  { search: /≡ƒö╡/g, replace: '🔵' },
  { search: /≡ƒƒó/g, replace: '🟢' },
  { search: /≡ƒƒí/g, replace: '🟡' },
  { search: /≡ƒƒú/g, replace: '🟣' },
  { search: /≡ƒæå/g, replace: '👆' },
  { search: /≡ƒÆí/g, replace: '💡' },
  { search: /ΓöÇ/g, replace: '─' },
  { search: /Γû▓/g, replace: '▲' },
  { search: /ΓùÇ/g, replace: '◀' },
  { search: /Γû╝/g, replace: '▼' },
  { search: /Γû╢/g, replace: '▶' },

  // RTL Hebrew texts
  { search: /╫ñ╫¬╫ù ╫ñ╫á╫£/g, replace: 'פתח פנל' },
  { search: /╫⌐╫ò╫¿╫¬ ╫¢╫ò╫¬╫¿╫¬/g, replace: 'שורת כותרת' },
  { search: /╫¬╫ò╫¢╫ƒ ╫ö╫ñ╫É╫á╫£ ╫₧╫ò╫ª╫Æ ╫₧╫Ö╫₧╫Ö╫ƒ ╫£╫⌐╫₧╫É╫£ ╫æ╫É╫ò╫ñ╫ƒ ╫É╫ò╫ÿ╫ò╫₧╫ÿ╫Ö/g, replace: 'תוכן הפאנل מוצג מימין לשמאל באופן אוטומטי.' },
  { search: /╫ñ╫¿╫Ö╫ÿ ╫¿╫É╫⌐╫ò╫ƒ/g, replace: 'פריט ראשون' },
  { search: /╫ñ╫¿╫Ö╫ÿ ╫⌐╫á╫Ö/g, replace: 'פריט שני' },
  { search: /╫₧╫ª╫æ ╫₧╫Ö╫₧╫Ö╫ƒ ╫£╫⌐╫₧╫É╫£/g, replace: 'Right-to-Left Layout (RTL)' },

  // Character symbols
  { search: /ΓÇö/g, replace: '—' },
  { search: /ΓÇÖ/g, replace: '\'' },
  { search: /ΓÇ£/g, replace: '"' },
  { search: /ΓÇ¥/g, replace: '"' },
  { search: /Γê₧/g, replace: '∞' },
  { search: /Γ£ì∩╕Å/g, replace: '✓' },
  { search: /Γ£ì/g, replace: '✓' },
  { search: /Γ£¿/g, replace: '✨' },
  { search: /Γï«/g, replace: '⋮' },
  { search: /ΓÜí/g, replace: '👑' },
  { search: /ΓÜû∩╕Å/g, replace: '⚖️' },
  { search: /ΓÜû/g, replace: '⚖️' },
  { search: /Γ₧ò/g, replace: '➡️' },
  { search: /ΓÇª/g, replace: '…' },
  { search: /∩╕Å/g, replace: '' },
  
  // Arrow symbols in labels
  { search: /Γ¼à/g, replace: '⬅️' },
  { search: /Γ₧í/g, replace: '➡️' },
  { search: /Γ¼å/g, replace: '⬆️' },
  { search: /Γ¼ç/g, replace: '⬇️' },

  // Typo: md"yle= or size="md"yle= to style=
  { search: /size="md"yle=/g, replace: 'size=\\"md\\" style=' },
  { search: /size="xs"yle=/g, replace: 'size=\\"xs\\" style=' },
  { search: /size="sm"yle=/g, replace: 'size=\\"sm\\" style=' },
  { search: /size="lg"yle=/g, replace: 'size=\\"lg\\" style=' },
  { search: /md"yle=/g, replace: 'md\\" style=' },
  { search: /xs"yle=/g, replace: 'xs\\" style=' },
  { search: /sm"yle=/g, replace: 'sm\\" style=' },
  { search: /lg"yle=/g, replace: 'lg\\" style=' }
];

replacements.forEach(({ search, replace }) => {
  demosContent = demosContent.replace(search, replace);
});

// 3. Prepend window mock data mapping inside Tree and Transfer List demo scripts
const demos = JSON.parse(demosContent);

if (demos['tree']) {
  demos['tree'].forEach(d => {
    if (d.html) {
      if (!d.html.includes('const TREE_DATA = window.TREE_DATA;')) {
        d.html = d.html.replace('<script>\\n(function() {', `<script>\\n(function() {\\n  const TREE_DATA = window.TREE_DATA;\\n  const COMPONENT_DATA = window.COMPONENT_DATA;\\n  const MODERN_GREEN_DATA = window.MODERN_GREEN_DATA;\\n  const ORG_CHART_DATA = window.ORG_CHART_DATA;\\n  const ELITE_DATA = window.ELITE_DATA;\\n  const GIT_GRAPH_DATA = window.GIT_GRAPH_DATA;\\n  const data = window.data;\\n  const largeData = window.largeData;\\n  const total = window.total;`);
        d.html = d.html.replace('<script>\\r\\n(function() {', `<script>\\r\\n(function() {\\r\\n  const TREE_DATA = window.TREE_DATA;\\r\\n  const COMPONENT_DATA = window.COMPONENT_DATA;\\r\\n  const MODERN_GREEN_DATA = window.MODERN_GREEN_DATA;\\r\\n  const ORG_CHART_DATA = window.ORG_CHART_DATA;\\r\\n  const ELITE_DATA = window.ELITE_DATA;\\r\\n  const GIT_GRAPH_DATA = window.GIT_GRAPH_DATA;\\r\\n  const data = window.data;\\n  const largeData = window.largeData;\\r\\n  const total = window.total;`);
      }
    }
  });
}

if (demos['transfer-list']) {
  demos['transfer-list'].forEach(d => {
    if (d.html) {
      if (!d.html.includes('const sourceItems = window.sourceItems;')) {
        d.html = d.html.replace('<script>\\n(function() {', `<script>\\n(function() {\\n  const sourceItems = window.sourceItems;\\n  const treeItems = window.treeItems;\\n  const tableColumns = window.tableColumns;\\n  const itemsWithDisabled = window.itemsWithDisabled;`);
        d.html = d.html.replace('<script>\\r\\n(function() {', `<script>\\r\\n(function() {\\r\\n  const sourceItems = window.sourceItems;\\r\\n  const treeItems = window.treeItems;\\r\\n  const tableColumns = window.tableColumns;\\r\\n  const itemsWithDisabled = window.itemsWithDisabled;`);
      }
    }
  });
}

// 4. Save cleaned demos back
writeFileSync(DEMOS_PATH, JSON.stringify(demos, null, 2), 'utf8');
console.log('Successfully completed full cleaning of demos.json! Repaired popovers, trees, and character encodings.');
