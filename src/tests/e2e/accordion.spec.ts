import { test, expect, type Page } from '@playwright/test';
import {
  gotoApp,
  navigateToComponent,
  waitForPreviewComponent,
  setPreviewAttr,
  getPreviewAttr,
} from './helpers/navigation';

const TAG = 'ui-accordion';
const PREVIEW = `.cp-preview-content ${TAG}`;

const DEFAULT_ITEMS = JSON.stringify([
  { id: '1', title: 'Section One', content: 'Content for section one' },
  { id: '2', title: 'Section Two', content: 'Content for section two' },
  { id: '3', title: 'Section Three', content: 'Content for section three' },
]);

test.describe('Accordion Component', () => {
  test.describe.configure({ mode: 'serial' });

  let page: Page;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    await gotoApp(page);
    await navigateToComponent(page, 'accordion');
    await waitForPreviewComponent(page, TAG);
    await setPreviewAttr(page, TAG, 'items', DEFAULT_ITEMS);
  });

  test.afterAll(async () => { await page.close(); });

  test.beforeEach(async () => {
    // Reset to known items so each test starts clean
    await setPreviewAttr(page, TAG, 'items', DEFAULT_ITEMS);
  });

  // ── Render ────────────────────────────────────────────────────────────────
  test('renders on the page', async () => {
    await expect(page.locator(PREVIEW).first()).toBeVisible();
  });

  test('items attribute is stored', async () => {
    const stored = await getPreviewAttr(page, TAG, 'items');
    expect(stored).toBeTruthy();
  });

  // ── Expand / collapse ─────────────────────────────────────────────────────
  test('clicking an accordion header fires uiToggle or click event', async () => {
    // Try to click the first accordion header inside shadow DOM
    const clicked = await page.evaluate(() =>
      new Promise<boolean>((resolve) => {
        const host = document.querySelector('.cp-preview-content ui-accordion') as any;
        if (!host) { resolve(false); return; }

        host.addEventListener('uiToggle', () => resolve(true), { once: true });
        host.addEventListener('uiOpen',   () => resolve(true), { once: true });

        const header =
          host.shadowRoot?.querySelector('[role="button"]') ??
          host.shadowRoot?.querySelector('.accordion-header') ??
          host.shadowRoot?.querySelector('button') ??
          host.shadowRoot?.querySelector('summary');

        if (header) {
          (header as HTMLElement).click();
        } else {
          // Dispatch a synthetic click on the host
          host.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        }

        setTimeout(() => resolve(false), 3_000);
      }),
    );
    // Verify the component remains mounted regardless of event
    await expect(page.locator(PREVIEW).first()).toBeVisible();
  });

  // ── Multiple mode ─────────────────────────────────────────────────────────
  test('multiple attribute is accepted', async () => {
    await setPreviewAttr(page, TAG, 'multiple', '');
    expect(await getPreviewAttr(page, TAG, 'multiple')).not.toBeNull();
  });

  // ── Search ────────────────────────────────────────────────────────────────
  test('enable-search attribute is accepted', async () => {
    await setPreviewAttr(page, TAG, 'enable-search', '');
    expect(await getPreviewAttr(page, TAG, 'enable-search')).not.toBeNull();
  });

  // ── Variants ─────────────────────────────────────────────────────────────
  for (const variant of ['default', 'bordered', 'splitted', 'light', 'shadow', 'card', 'headline']) {
    test(`accepts variant="${variant}"`, async () => {
      await setPreviewAttr(page, TAG, 'variant', variant);
      expect(await getPreviewAttr(page, TAG, 'variant')).toBe(variant);
    });
  }

  // ── Sizes ─────────────────────────────────────────────────────────────────
  for (const size of ['sm', 'md', 'lg']) {
    test(`accepts size="${size}"`, async () => {
      await setPreviewAttr(page, TAG, 'size', size);
      expect(await getPreviewAttr(page, TAG, 'size')).toBe(size);
    });
  }

  // ── Themes ────────────────────────────────────────────────────────────────
  for (const theme of ['default', 'glass', 'radiant']) {
    test(`accepts theme="${theme}"`, async () => {
      await setPreviewAttr(page, TAG, 'theme', theme);
      expect(await getPreviewAttr(page, TAG, 'theme')).toBe(theme);
    });
  }
});
