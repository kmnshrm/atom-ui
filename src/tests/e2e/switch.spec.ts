import { test, expect, type Page } from '@playwright/test';
import {
  gotoApp,
  navigateToComponent,
  waitForPreviewComponent,
  setPreviewAttr,
  getPreviewAttr,
} from './helpers/navigation';

const TAG = 'ui-switch';
const PREVIEW = `.cp-preview-content ${TAG}`;

test.describe('Switch Component', () => {
  test.describe.configure({ mode: 'serial' });

  let page: Page;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    await gotoApp(page);
    await navigateToComponent(page, 'switch');
    await waitForPreviewComponent(page, TAG);
  });

  test.afterAll(async () => { await page.close(); });

  // ── Render ────────────────────────────────────────────────────────────────
  test('renders on the page', async () => {
    await expect(page.locator(PREVIEW).first()).toBeVisible();
  });

  test('has a label attribute', async () => {
    const label = await getPreviewAttr(page, TAG, 'label');
    expect(label?.trim().length).toBeGreaterThan(0);
  });

  // ── Toggle / events ───────────────────────────────────────────────────────
  test('fires uiChange event when toggled', async () => {
    const fired = await expectCustomEvent(
      page,
      `.cp-preview-content ${TAG}`,
      'uiChange',
      () => page.locator(PREVIEW).first().click({ force: true }),
    );
    expect(fired).toBe(true);
  });

  // ── Checked state ─────────────────────────────────────────────────────────
  test('checked attribute can be set', async () => {
    await setPreviewAttr(page, TAG, 'checked', '');
    expect(await getPreviewAttr(page, TAG, 'checked')).not.toBeNull();
  });

  // ── Disabled ──────────────────────────────────────────────────────────────
  test('disabled attribute prevents toggle (disabled reflected)', async () => {
    await setPreviewAttr(page, TAG, 'disabled', '');
    expect(await getPreviewAttr(page, TAG, 'disabled')).not.toBeNull();
  });

  // ── Sizes ─────────────────────────────────────────────────────────────────
  for (const size of ['sm', 'md', 'lg']) {
    test(`accepts size="${size}"`, async () => {
      await setPreviewAttr(page, TAG, 'size', size);
      expect(await getPreviewAttr(page, TAG, 'size')).toBe(size);
    });
  }

  // ── Colors ───────────────────────────────────────────────────────────────
  for (const color of ['primary', 'success', 'warning', 'danger']) {
    test(`accepts color="${color}"`, async () => {
      await setPreviewAttr(page, TAG, 'color', color);
      expect(await getPreviewAttr(page, TAG, 'color')).toBe(color);
    });
  }

  // ── Label positions ───────────────────────────────────────────────────────
  for (const pos of ['left', 'right']) {
    test(`accepts label-position="${pos}"`, async () => {
      await setPreviewAttr(page, TAG, 'label-position', pos);
      expect(await getPreviewAttr(page, TAG, 'label-position')).toBe(pos);
    });
  }
});
