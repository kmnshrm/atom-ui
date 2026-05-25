import { chromium } from '@playwright/test';

(async () => {
  console.log('Launching browser...');
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('BROWSER CONSOLE:', msg.text()));
  page.on('pageerror', err => console.error('BROWSER ERROR:', err.message));
  
  console.log('Navigating to http://localhost:5173/atom/...');
  await page.goto('http://localhost:5173/atom/');
  
  // Wait for hydration
  await page.waitForTimeout(3000);
  
  const navBarHTML = await page.evaluate(() => {
    const nav = document.querySelector('ui-navigation-bar');
    if (!nav) return 'NOT FOUND';
    return {
      tagName: nav.tagName,
      className: nav.className,
      hydrated: nav.classList.contains('hydrated'),
      innerHTML: nav.innerHTML,
      shadowRoot: nav.shadowRoot ? 'HAS SHADOW ROOT' : 'NO SHADOW ROOT',
      shadowRootHTML: nav.shadowRoot ? nav.shadowRoot.innerHTML : '',
      activeIdProp: nav.activeId,
      itemsLength: nav.items ? nav.items.length : 0,
      categoriesLength: nav.categories ? nav.categories.length : 0
    };
  });
  
  console.log('ui-navigation-bar info:', JSON.stringify(navBarHTML, null, 2));
  
  await browser.close();
})();
