import { test, expect, type Page } from '@playwright/test';
import {
  gotoApp,
  navigateToComponent,
  waitForPreviewComponent,
  setPreviewAttr,
  getPreviewAttr,
} from './helpers/navigation';

const TAG = 'ui-checkbox';
const PREVIEW = `.cp-preview-content ${TAG}`;

test.describe('Checkbox Component', () => {
  test.describe.configure({ mode: 'serial' });

  let page: Page;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    await gotoApp(page);
    await navigateToComponent(page, 'checkbox');
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
  test('fires uiChange event when clicked', async () => {
    const fired = await expectCustomEvent(
      page,
      `.cp-preview-content ${TAG}`,
      'uiChange',
      () => page.locator(PREVIEW).first().click({ force: true }),
    );
    expect(fired).toBe(true);
  });

  // ── Checked state ─────────────────────────────────────────────────────────
  test('checked attribute can be set programmatically', async () => {
    await setPreviewAttr(page, TAG, 'checked', '');
    const val = await getPreviewAttr(page, TAG, 'checked');
    expect(val).not.toBeNull();
  });

  // ── Indeterminate state ───────────────────────────────────────────────────
  test('indeterminate attribute is accepted', async () => {
    await setPreviewAttr(page, TAG, 'indeterminate', '');
    const val = await getPreviewAttr(page, TAG, 'indeterminate');
    expect(val).not.toBeNull();
  });

  // ── Disabled ──────────────────────────────────────────────────────────────
  test('disabled attribute is reflected', async () => {
    await setPreviewAttr(page, TAG, 'disabled', '');
    const val = await getPreviewAttr(page, TAG, 'disabled');
    expect(val).not.toBeNull();
  });

  // ── Sizes ─────────────────────────────────────────────────────────────────
  for (const size of ['xs', 'sm', 'md', 'lg', 'xl']) {
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

  // ── Required / invalid ────────────────────────────────────────────────────
  test('required attribute is accepted', async () => {
    await setPreviewAttr(page, TAG, 'required', '');
    expect(await getPreviewAttr(page, TAG, 'required')).not.toBeNull();
  });

  test('invalid attribute shows error-message', async () => {
    await setPreviewAttr(page, TAG, 'invalid', '');
    await setPreviewAttr(page, TAG, 'error-message', 'This field is required');
    expect(await getPreviewAttr(page, TAG, 'invalid')).not.toBeNull();
    expect(await getPreviewAttr(page, TAG, 'error-message')).toBe('This field is required');
  });

  // ── Variants ─────────────────────────────────────────────────────────────
  for (const variant of ['default', 'filled', 'outlined', 'minimal']) {
    test(`accepts variant="${variant}"`, async () => {
      await setPreviewAttr(page, TAG, 'variant', variant);
      expect(await getPreviewAttr(page, TAG, 'variant')).toBe(variant);
    });
  }
});
