import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright configuration for Atom UI component portal tests.
 * Runs the dev server automatically, tests all components, and produces
 * an HTML report highlighting any failures.
 */
export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: false,          // run sequentially so dev server isn't hammered
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 1,
  workers: 1,
  timeout: 30_000,               // per-test timeout

  reporter: [
    ['list'],
    [
      'html',
      {
        outputFolder: 'playwright-report',
        open: 'never',            // open manually with: npx playwright show-report
      },
    ],
    ['json', { outputFile: 'playwright-report/results.json' }],
  ],

  use: {
    baseURL: 'http://localhost:5173/atom/',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    // Give web components time to define & render
    actionTimeout: 15_000,
    navigationTimeout: 30_000,
  },

  /* Start the Vite dev server before running tests */
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5173/atom/',
    reuseExistingServer: true,   // re-use if already running
    timeout: 120_000,
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
