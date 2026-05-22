import { test, expect, type Page } from '@playwright/test';
import {
  gotoApp,
  navigateToComponent,
  waitForPreviewComponent,
  setPreviewAttr,
  getPreviewAttr,
} from './helpers/navigation';

const TAG = 'ui-radio';
const PREVIEW = `.cp-preview-content ${TAG}`;

test.describe('Radio Component', () => {
  test.describe.configure({ mode: 'serial' });

  let page: Page;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    await gotoApp(page);
    await navigateToComponent(page, 'radio');
    await waitForPreviewComponent(page, TAG);
  });

  test.afterAll(async () => { await page.close(); });

  // ── Render ────────────────────────────────────────────────────────────────
  test('renders on the page', async () => {
    await expect(page.locator(PREVIEW).first()).toBeVisible();
  });

  // ── Click / event ─────────────────────────────────────────────────────────
  test('fires uiChange event when clicked', async () => {
    const fired = await expectCustomEvent(
      page,
      `.cp-preview-content ${TAG}`,
      'uiChange',
      () => page.locator(PREVIEW).first().click({ force: true }),
    );
    expect(fired).toBe(true);
  });

  // ── States ────────────────────────────────────────────────────────────────
  test('checked attribute is accepted', async () => {
    await setPreviewAttr(page, TAG, 'checked', '');
    expect(await getPreviewAttr(page, TAG, 'checked')).not.toBeNull();
  });

  test('disabled attribute is reflected', async () => {
    await setPreviewAttr(page, TAG, 'disabled', '');
    expect(await getPreviewAttr(page, TAG, 'disabled')).not.toBeNull();
  });

  test('readonly attribute is accepted', async () => {
    await setPreviewAttr(page, TAG, 'readonly', '');
    expect(await getPreviewAttr(page, TAG, 'readonly')).not.toBeNull();
  });

  test('required attribute is accepted', async () => {
    await setPreviewAttr(page, TAG, 'required', '');
    expect(await getPreviewAttr(page, TAG, 'required')).not.toBeNull();
  });

  test('error attribute is accepted', async () => {
    await setPreviewAttr(page, TAG, 'error', '');
    expect(await getPreviewAttr(page, TAG, 'error')).not.toBeNull();
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

  // ── Variants ─────────────────────────────────────────────────────────────
  for (const variant of ['default', 'outline', 'filled', 'card']) {
    test(`accepts variant="${variant}"`, async () => {
      await setPreviewAttr(page, TAG, 'variant', variant);
      expect(await getPreviewAttr(page, TAG, 'variant')).toBe(variant);
    });
  }

  // ── Name / value ──────────────────────────────────────────────────────────
  test('name and value attributes are reflected', async () => {
    await setPreviewAttr(page, TAG, 'name', 'my-group');
    await setPreviewAttr(page, TAG, 'value', 'my-val');
    expect(await getPreviewAttr(page, TAG, 'name')).toBe('my-group');
    expect(await getPreviewAttr(page, TAG, 'value')).toBe('my-val');
  });
});
