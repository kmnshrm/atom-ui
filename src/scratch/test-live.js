import { chromium } from '@playwright/test';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('BROWSER CONSOLE:', msg.text()));
  page.on('pageerror', err => console.error('BROWSER ERROR:', err.message));
  
  console.log('Navigating to live site...');
  await page.goto('https://kmnshrm.github.io/atom/');
  
  // Wait a bit for hydration
  await page.waitForTimeout(2000);
  
  const navBarHTML = await page.evaluate(() => {
    const nav = document.querySelector('ui-navigation-bar');
    if (!nav) return 'NOT FOUND';
    return {
      tagName: nav.tagName,
      className: nav.className,
      hydrated: nav.classList.contains('hydrated'),
      innerHTML: nav.innerHTML,
      shadowRoot: nav.shadowRoot ? 'HAS SHADOW ROOT' : 'NO SHADOW ROOT',
      shadowRootHTML: nav.shadowRoot ? nav.shadowRoot.innerHTML : ''
    };
  });
  
  console.log('ui-navigation-bar info:', JSON.stringify(navBarHTML, null, 2));
  
  await browser.close();
})();
