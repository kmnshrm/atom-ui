import { readFileSync } from 'fs';
const demos = JSON.parse(readFileSync('./src/demos.json', 'utf8'));
const pageKeys = ['home', 'about', 'overview', 'documentation', 'dashboard', 'my-profile'];
const componentKeys = Object.keys(demos).filter(k => !pageKeys.includes(k));
const nav = readFileSync('./src/navigation.data.ts', 'utf8');
const missing = componentKeys.filter(k => !nav.includes(`"${k}"`));
console.log('Demo components NOT in navigation:', missing.join(', '));
