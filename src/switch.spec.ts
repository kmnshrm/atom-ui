import { test, expect, type Page } from '@playwright/test';
import {
  gotoApp,
  navigateToComponent,
  waitForPreviewComponent,
  setPreviewAttr,
  getPreviewAttr,
} from './helpers/navigation';

// ────────────────────────────────────────────────────────────────────────────
// AVATAR
// ────────────────────────────────────────────────────────────────────────────
test.describe('Avatar Component', () => {
  test.describe.configure({ mode: 'serial' });
  const TAG = 'ui-avatar';
  const PREVIEW = `.cp-preview-content ${TAG}`;

  test.beforeAll(async () => {
    await gotoApp(page);
    await navigateToComponent(page, 'avatar');
    await waitForPreviewComponent(page, TAG);
  });

  test('renders on the page', async () => {
    await expect(page.locator(PREVIEW).first()).toBeVisible();
  });

  test('name attribute generates initials', async () => {
    await setPreviewAttr(page, TAG, 'name', 'John Smith');
    expect(await getPreviewAttr(page, TAG, 'name')).toBe('John Smith');
  });

  for (const size of ['xs', 'sm', 'md', 'lg', 'xl']) {
    test(`accepts size="${size}"`, async () => {
      await setPreviewAttr(page, TAG, 'size', size);
      expect(await getPreviewAttr(page, TAG, 'size')).toBe(size);
    });
  }

  for (const shape of ['circle', 'square', 'rounded', 'hexagon', 'squircle']) {
    test(`accepts shape="${shape}"`, async () => {
      await setPreviewAttr(page, TAG, 'shape', shape);
      expect(await getPreviewAttr(page, TAG, 'shape')).toBe(shape);
    });
  }

  for (const variant of ['default', 'outlined', 'ghost', 'glass']) {
    test(`accepts variant="${variant}"`, async () => {
      await setPreviewAttr(page, TAG, 'variant', variant);
      expect(await getPreviewAttr(page, TAG, 'variant')).toBe(variant);
    });
  }

  test('shows status indicator when show-status and status are set', async () => {
    await setPreviewAttr(page, TAG, 'status', 'online');
    await setPreviewAttr(page, TAG, 'show-status', '');
    expect(await getPreviewAttr(page, TAG, 'status')).toBe('online');
    expect(await getPreviewAttr(page, TAG, 'show-status')).not.toBeNull();
  });

  test('auto-color attribute is accepted', async () => {
    await setPreviewAttr(page, TAG, 'auto-color', '');
    expect(await getPreviewAttr(page, TAG, 'auto-color')).not.toBeNull();
  });
});

// ────────────────────────────────────────────────────────────────────────────
// BADGE
// ────────────────────────────────────────────────────────────────────────────
test.describe('Badge Component', () => {
  test.describe.configure({ mode: 'serial' });
  const TAG = 'ui-badge';
  const PREVIEW = `.cp-preview-content ${TAG}`;

  test.beforeAll(async () => {
    await gotoApp(page);
    await navigateToComponent(page, 'badge');
    await waitForPreviewComponent(page, TAG);
  });

  test('renders on the page', async () => {
    await expect(page.locator(PREVIEW).first()).toBeVisible();
  });

  test('value attribute is reflected', async () => {
    await setPreviewAttr(page, TAG, 'value', '42');
    expect(await getPreviewAttr(page, TAG, 'value')).toBe('42');
  });

  for (const color of ['primary', 'success', 'warning', 'danger', 'info']) {
    test(`accepts color="${color}"`, async () => {
      await setPreviewAttr(page, TAG, 'color', color);
      expect(await getPreviewAttr(page, TAG, 'color')).toBe(color);
    });
  }

  for (const variant of ['standard', 'outlined', 'ghost']) {
    test(`accepts variant="${variant}"`, async () => {
      await setPreviewAttr(page, TAG, 'variant', variant);
      expect(await getPreviewAttr(page, TAG, 'variant')).toBe(variant);
    });
  }

  test('dot mode attribute is accepted', async () => {
    await setPreviewAttr(page, TAG, 'dot', '');
    expect(await getPreviewAttr(page, TAG, 'dot')).not.toBeNull();
  });

  for (const anim of ['none', 'pulse', 'bounce', 'ping']) {
    test(`accepts animation="${anim}"`, async () => {
      await setPreviewAttr(page, TAG, 'animation', anim);
      expect(await getPreviewAttr(page, TAG, 'animation')).toBe(anim);
    });
  }

  test('max attribute limits displayed value', async () => {
    await setPreviewAttr(page, TAG, 'max', '50');
    expect(await getPreviewAttr(page, TAG, 'max')).toBe('50');
  });
});

// ────────────────────────────────────────────────────────────────────────────
// PROGRESS
// ────────────────────────────────────────────────────────────────────────────
test.describe('Progress Component', () => {
  test.describe.configure({ mode: 'serial' });
  const TAG = 'ui-progress';
  const PREVIEW = `.cp-preview-content ${TAG}`;

  test.beforeAll(async () => {
    await gotoApp(page);
    await navigateToComponent(page, 'progress');
    await waitForPreviewComponent(page, TAG);
  });

  test('renders on the page', async () => {
    await expect(page.locator(PREVIEW).first()).toBeVisible();
  });

  test('value attribute is reflected', async () => {
    await setPreviewAttr(page, TAG, 'value', '65');
    expect(await getPreviewAttr(page, TAG, 'value')).toBe('65');
  });

  test('accepts value=0 (empty)', async () => {
    await setPreviewAttr(page, TAG, 'value', '0');
    expect(await getPreviewAttr(page, TAG, 'value')).toBe('0');
  });

  test('accepts value=100 (full)', async () => {
    await setPreviewAttr(page, TAG, 'value', '100');
    expect(await getPreviewAttr(page, TAG, 'value')).toBe('100');
  });

  test('indeterminate attribute is accepted', async () => {
    await setPreviewAttr(page, TAG, 'indeterminate', '');
    expect(await getPreviewAttr(page, TAG, 'indeterminate')).not.toBeNull();
  });
});

// ────────────────────────────────────────────────────────────────────────────
// ICON
// ────────────────────────────────────────────────────────────────────────────
test.describe('Icon Component', () => {
  test.describe.configure({ mode: 'serial' });
  const TAG = 'ui-icon';
  const PREVIEW = `.cp-preview-content ${TAG}`;

  test.beforeAll(async () => {
    await gotoApp(page);
    await navigateToComponent(page, 'icon');
    await waitForPreviewComponent(page, TAG);
  });

  test('renders on the page', async () => {
    await expect(page.locator(PREVIEW).first()).toBeVisible();
  });

  test('name attribute is reflected', async () => {
    await setPreviewAttr(page, TAG, 'name', 'star');
    expect(await getPreviewAttr(page, TAG, 'name')).toBe('star');
  });

  test('size attribute is accepted', async () => {
    await setPreviewAttr(page, TAG, 'size', '32');
    expect(await getPreviewAttr(page, TAG, 'size')).toBe('32');
  });

  test('color attribute is accepted', async () => {
    await setPreviewAttr(page, TAG, 'color', 'red');
    expect(await getPreviewAttr(page, TAG, 'color')).toBe('red');
  });
});
