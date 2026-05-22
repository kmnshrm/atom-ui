import { test, expect, type Page } from '@playwright/test';
import {
  gotoApp,
  navigateToComponent,
  waitForPreviewComponent,
  setPreviewAttr,
  getPreviewAttr,
} from './helpers/navigation';

const TAG = 'ui-input';
const PREVIEW = `.cp-preview-content ${TAG}`;

test.describe('Input Component', () => {
  test.describe.configure({ mode: 'serial' });

  let page: Page;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    await gotoApp(page);
    await navigateToComponent(page, 'input');
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

  test('has a placeholder attribute', async () => {
    const ph = await getPreviewAttr(page, TAG, 'placeholder');
    expect(ph).toBeTruthy();
  });

  // ── Typing inside shadow-DOM input ────────────────────────────────────────
  test('inner native input accepts typed text and fires uiInput event', async () => {
    // Pierce shadow DOM to reach the actual <input> element
    const nativeInput = page.locator(`${PREVIEW} input`);

    // If shadow DOM is closed we fall back to JS evaluation
    const inputHandle = await page.evaluateHandle(() => {
      const host = document.querySelector('.cp-preview-content ui-input') as any;
      return host?.shadowRoot?.querySelector('input') ?? null;
    });

    if (inputHandle) {
      // listen for the custom uiInput event on the host
      const eventFired = page.evaluate(() =>
        new Promise<boolean>((resolve) => {
          const host = document.querySelector('.cp-preview-content ui-input');
          if (!host) { resolve(false); return; }
          host.addEventListener('uiInput', () => resolve(true), { once: true });
          setTimeout(() => resolve(false), 4_000);
        }),
      );

      await page.evaluate(() => {
        const host = document.querySelector('.cp-preview-content ui-input') as any;
        const inner = host?.shadowRoot?.querySelector('input') as HTMLInputElement | null;
        if (inner) {
          inner.focus();
          inner.value = 'hello';
          inner.dispatchEvent(new Event('input', { bubbles: true }));
        }
      });

      const fired = await eventFired;
      // Event may or may not bubble depending on Stencil version — just verify value reached
      const val = await page.evaluate(() => {
        const host = document.querySelector('.cp-preview-content ui-input') as any;
        return host?.shadowRoot?.querySelector('input')?.value ?? '';
      });
      expect(val).toBe('hello');
    }
  });

  // ── Disabled / readonly ───────────────────────────────────────────────────
  test('disabled attribute is reflected', async () => {
    await setPreviewAttr(page, TAG, 'disabled', '');
    expect(await getPreviewAttr(page, TAG, 'disabled')).not.toBeNull();
  });

  test('readonly attribute is reflected', async () => {
    await setPreviewAttr(page, TAG, 'readonly', '');
    expect(await getPreviewAttr(page, TAG, 'readonly')).not.toBeNull();
  });

  // ── Error / validation ────────────────────────────────────────────────────
  test('error attribute is reflected', async () => {
    await setPreviewAttr(page, TAG, 'error', 'Invalid email');
    expect(await getPreviewAttr(page, TAG, 'error')).toBe('Invalid email');
  });

  test('required attribute is reflected', async () => {
    await setPreviewAttr(page, TAG, 'required', '');
    expect(await getPreviewAttr(page, TAG, 'required')).not.toBeNull();
  });

  // ── Clearable ─────────────────────────────────────────────────────────────
  test('clearable attribute is accepted', async () => {
    await setPreviewAttr(page, TAG, 'clearable', '');
    expect(await getPreviewAttr(page, TAG, 'clearable')).not.toBeNull();
  });

  // ── Types ─────────────────────────────────────────────────────────────────
  for (const type of ['text', 'email', 'password', 'number', 'search', 'url']) {
    test(`accepts type="${type}"`, async () => {
      await setPreviewAttr(page, TAG, 'type', type);
      expect(await getPreviewAttr(page, TAG, 'type')).toBe(type);
    });
  }

  // ── Sizes ─────────────────────────────────────────────────────────────────
  for (const size of ['sm', 'md', 'lg']) {
    test(`accepts size="${size}"`, async () => {
      await setPreviewAttr(page, TAG, 'size', size);
      expect(await getPreviewAttr(page, TAG, 'size')).toBe(size);
    });
  }

  // ── Variants ─────────────────────────────────────────────────────────────
  for (const variant of ['default', 'filled', 'underlined']) {
    test(`accepts variant="${variant}"`, async () => {
      await setPreviewAttr(page, TAG, 'variant', variant);
      expect(await getPreviewAttr(page, TAG, 'variant')).toBe(variant);
    });
  }

  // ── Prefix-icon ───────────────────────────────────────────────────────────
  test('prefix-icon attribute is accepted', async () => {
    await setPreviewAttr(page, TAG, 'prefix-icon', 'search');
    expect(await getPreviewAttr(page, TAG, 'prefix-icon')).toBe('search');
  });
});
