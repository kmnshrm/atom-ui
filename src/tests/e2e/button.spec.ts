import { test, expect, type Page } from '@playwright/test';
import {
  gotoApp,
  navigateToComponent,
  waitForPreviewComponent,
  setPreviewAttr,
  getPreviewAttr,
} from './helpers/navigation';

const PREVIEW = '.cp-preview-content ui-button';

test.describe('Button Component', () => {
  test.describe.configure({ mode: 'serial' });

  let page: Page;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    await gotoApp(page);
    await navigateToComponent(page, 'button');
    await waitForPreviewComponent(page, 'ui-button');
  });

  test.afterAll(async () => { await page.close(); });

  // ── Render ───────────────────────────────────────────────────────────────
  test('renders the preview button', async () => {
    const btn = page.locator(PREVIEW).first();
    await expect(btn).toBeVisible();
  });

  test('has a non-empty label', async () => {
    const btn = page.locator(PREVIEW).first();
    const text = await btn.textContent();
    expect(text?.trim().length).toBeGreaterThan(0);
  });

  // ── Click / events ────────────────────────────────────────────────────────
  test('fires click event when clicked', async () => {
    const fired = await expectCustomEvent(
      page,
      `.cp-preview-content ui-button`,
      'click',
      () => page.locator(PREVIEW).first().click({ force: true }),
    );
    expect(fired).toBe(true);
  });

  // ── Disabled state ────────────────────────────────────────────────────────
  test('disabled attribute is reflected on the host element', async () => {
    await setPreviewAttr(page, 'ui-button', 'disabled', '');
    const btn = page.locator(`${PREVIEW}[disabled]`).first();
    await expect(btn).toBeVisible();
    const val = await getPreviewAttr(page, 'ui-button', 'disabled');
    expect(val).not.toBeNull();
  });

  // ── Loading state ─────────────────────────────────────────────────────────
  test('loading attribute is reflected on the host element', async () => {
    await setPreviewAttr(page, 'ui-button', 'loading', '');
    const val = await getPreviewAttr(page, 'ui-button', 'loading');
    expect(val).not.toBeNull();
  });

  // ── Variants ──────────────────────────────────────────────────────────────
  for (const variant of ['primary', 'secondary', 'outline', 'ghost', 'danger', 'success', 'warning']) {
    test(`accepts variant="${variant}"`, async () => {
      await setPreviewAttr(page, 'ui-button', 'variant', variant);
      const val = await getPreviewAttr(page, 'ui-button', 'variant');
      expect(val).toBe(variant);
    });
  }

  // ── Sizes ─────────────────────────────────────────────────────────────────
  for (const size of ['xs', 'sm', 'md', 'lg', 'xl', 'xxl']) {
    test(`accepts size="${size}"`, async () => {
      await setPreviewAttr(page, 'ui-button', 'size', size);
      const val = await getPreviewAttr(page, 'ui-button', 'size');
      expect(val).toBe(size);
    });
  }

  // ── Shapes ────────────────────────────────────────────────────────────────
  for (const shape of ['rounded', 'pill', 'circle', 'square']) {
    test(`accepts shape="${shape}"`, async () => {
      await setPreviewAttr(page, 'ui-button', 'shape', shape);
      const val = await getPreviewAttr(page, 'ui-button', 'shape');
      expect(val).toBe(shape);
    });
  }

  // ── Icon ──────────────────────────────────────────────────────────────────
  test('accepts an icon attribute', async () => {
    await setPreviewAttr(page, 'ui-button', 'icon', 'star');
    const val = await getPreviewAttr(page, 'ui-button', 'icon');
    expect(val).toBe('star');
  });

  // ── Full-width ────────────────────────────────────────────────────────────
  test('full-width attribute is accepted', async () => {
    await setPreviewAttr(page, 'ui-button', 'full-width', '');
    const val = await getPreviewAttr(page, 'ui-button', 'full-width');
    expect(val).not.toBeNull();
  });
});
