import { test, expect, type Page } from '@playwright/test';
import {
  gotoApp,
  navigateToComponent,
  waitForPreviewComponent,
  setPreviewAttr,
  getPreviewAttr,
} from './helpers/navigation';

const TAG = 'ui-button-toggle';
const PREVIEW = `.cp-preview-content ${TAG}`;

test.describe('ButtonToggle Component', () => {
  test.describe.configure({ mode: 'serial' });

  let page: Page;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    await gotoApp(page);
    await navigateToComponent(page, 'button-toggle');
    await waitForPreviewComponent(page, TAG);
  });

  test.afterAll(async () => { await page.close(); });

  // ── Render ────────────────────────────────────────────────────────────────
  test('renders on the page', async () => {
    await expect(page.locator(PREVIEW).first()).toBeVisible();
  });

  // ── Toggle / click ────────────────────────────────────────────────────────
  test('fires click event when clicked', async () => {
    const fired = await expectCustomEvent(
      page,
      `.cp-preview-content ${TAG}`,
      'click',
      () => page.locator(PREVIEW).first().click({ force: true }),
    );
    expect(fired).toBe(true);
  });

  // ── Selected state ────────────────────────────────────────────────────────
  test('selected attribute is reflected', async () => {
    await setPreviewAttr(page, TAG, 'selected', '');
    expect(await getPreviewAttr(page, TAG, 'selected')).not.toBeNull();
  });

  // ── Disabled ──────────────────────────────────────────────────────────────
  test('disabled attribute is reflected', async () => {
    await setPreviewAttr(page, TAG, 'disabled', '');
    expect(await getPreviewAttr(page, TAG, 'disabled')).not.toBeNull();
  });

  // ── Variant ──────────────────────────────────────────────────────────────
  for (const variant of ['classic', 'filled', 'outlined', 'soft', 'solid', 'surface', 'text']) {
    test(`accepts variant="${variant}"`, async () => {
      await setPreviewAttr(page, TAG, 'variant', variant);
      expect(await getPreviewAttr(page, TAG, 'variant')).toBe(variant);
    });
  }

  // ── Colors ───────────────────────────────────────────────────────────────
  for (const color of ['primary', 'secondary', 'success', 'warning', 'danger']) {
    test(`accepts color="${color}"`, async () => {
      await setPreviewAttr(page, TAG, 'color', color);
      expect(await getPreviewAttr(page, TAG, 'color')).toBe(color);
    });
  }

  // ── Sizes ─────────────────────────────────────────────────────────────────
  for (const size of ['small', 'medium', 'large']) {
    test(`accepts size="${size}"`, async () => {
      await setPreviewAttr(page, TAG, 'size', size);
      expect(await getPreviewAttr(page, TAG, 'size')).toBe(size);
    });
  }

  // ── Shapes ────────────────────────────────────────────────────────────────
  for (const shape of ['circle', 'pill', 'rectangle', 'round', 'square']) {
    test(`accepts shape="${shape}"`, async () => {
      await setPreviewAttr(page, TAG, 'shape', shape);
      expect(await getPreviewAttr(page, TAG, 'shape')).toBe(shape);
    });
  }

  // ── Icon ──────────────────────────────────────────────────────────────────
  test('icon attribute is accepted', async () => {
    await setPreviewAttr(page, TAG, 'icon', 'heart');
    expect(await getPreviewAttr(page, TAG, 'icon')).toBe('heart');
  });
});
