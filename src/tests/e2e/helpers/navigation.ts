import { type Page, expect } from '@playwright/test';

/**
 * Navigate to the app root and wait for the navigation bar to be ready.
 */
export async function gotoApp(page: Page): Promise<void> {
  await page.goto('/');
  // Wait for the custom nav element to be attached
  await page.waitForSelector('ui-navigation-bar', { state: 'attached', timeout: 15_000 });
  // Short pause for Stencil components to hydrate
  await page.waitForTimeout(400);
}

/**
 * Navigate to a component page by dispatching the navItemClick event that
 * the React app listens to on the ui-navigation-bar element.
 */
export async function navigateToComponent(page: Page, componentId: string): Promise<void> {
  await page.evaluate((id) => {
    const nav = document.querySelector('ui-navigation-bar');
    if (!nav) throw new Error('ui-navigation-bar not found in DOM');
    nav.dispatchEvent(
      new CustomEvent('navItemClick', {
        bubbles: true,
        composed: true,
        detail: { id },
      }),
    );
  }, componentId);
  // Allow lazy-loaded page component and web components to mount
  await page.waitForTimeout(200);
}

/**
 * Wait for a web component tag to be visible inside the preview stage.
 * Targets only the preview panel, not the playground's own UI elements.
 */
export async function waitForPreviewComponent(
  page: Page,
  tagName: string,
): Promise<void> {
  await page.waitForSelector(`.cp-preview-content ${tagName}`, {
    state: 'attached',
    timeout: 10_000,
  });
}

/**
 * Read an attribute value off a web-component host element inside the preview.
 */
export async function getPreviewAttr(
  page: Page,
  tagName: string,
  attr: string,
): Promise<string | null> {
  return page.evaluate(
    ([tag, a]) => document.querySelector(`.cp-preview-content ${tag}`)?.getAttribute(a) ?? null,
    [tagName, attr] as [string, string],
  );
}

/**
 * Set an attribute on the first matching web-component in the preview area.
 */
export async function setPreviewAttr(
  page: Page,
  tagName: string,
  attr: string,
  value: string | null,
): Promise<void> {
  await page.evaluate(
    ([tag, a, v]) => {
      const el = document.querySelector(`.cp-preview-content ${tag}`);
      if (!el) throw new Error(`${tag} not found in preview`);
      if (v === null) el.removeAttribute(a);
      else el.setAttribute(a, v);
    },
    [tagName, attr, value] as [string, string, string | null],
  );
}

/**
 * Dispatch a click through JS on the host element (bypasses Playwright's
 * default pointer restrictions on disabled elements if needed for assertions).
 */
export async function jsClick(page: Page, selector: string): Promise<void> {
  await page.evaluate((sel) => {
    (document.querySelector(sel) as HTMLElement)?.click();
  }, selector);
}

/**
 * Listen for a specific custom event on a web component, click it, and return
 * whether the event fired within the timeout.
 */
export async function expectCustomEvent(
  page: Page,
  hostSelector: string,
  eventName: string,
  triggerFn: () => Promise<void>,
): Promise<boolean> {
  const eventFired = page.evaluate(
    ([sel, ev]) =>
      new Promise<boolean>((resolve) => {
        const el = document.querySelector(sel);
        if (!el) { resolve(false); return; }
        const handler = () => { resolve(true); };
        el.addEventListener(ev, handler, { once: true });
        setTimeout(() => resolve(false), 4_000);
      }),
    [hostSelector, eventName] as [string, string],
  );
  await triggerFn();
  return eventFired;
}
