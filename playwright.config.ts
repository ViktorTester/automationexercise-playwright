import { defineConfig, devices } from '@playwright/test';
import { loadEnvConfig } from 'src/utils/envLoader';
import { validateConfig } from 'src/utils/configValidator';

/**
 * Environment-driven configuration (2-dimensional):
 * - BRAND: brand1 | brand2
 * - ENV:   dev | staging
 *
 * Resolution:
 * - If BASE_URL is provided, it overrides config files.
 * - Otherwise config is loaded from: config/<brand>/<env>.json
 *
 * Examples:
 *   BRAND=brand1 ENV=dev npm test
 *   BRAND=brand2 ENV=staging npm test
 *   BASE_URL=https://custom.example.com BRAND=brand1 ENV=dev npm test
 */

const envConfig = loadEnvConfig();
validateConfig(envConfig);

export default defineConfig({
  // Where tests live
  testDir: './tests',

  // Global timeouts
  timeout: 30_000,
  expect: { timeout: 5_000 },

  // CI safety net: fail if test.only is present
  forbidOnly: !!process["env"].CI,

  // Basic flakiness control: retry on CI only
  retries: process["env"].CI ? 2 : 0,

  /**
   * Parallelism control:
   * - Prefer controlling workers from CI without code changes.
   * - If PW_WORKERS is not set, Playwright decides based on CPU.
   */
  workers: process["env"].PW_WORKERS ? Number(process["env"].PW_WORKERS) : undefined,

  /**
   * Artifacts:
   * Keep all outputs under artifacts/ so CI can upload a single directory.
   */
  outputDir: 'artifacts/test-output',

  /**
   * Reporters:
   * - HTML: human-friendly (CI artifact)
   * - JUnit: CI integration
   * - JSON: analytics / custom tooling
   */
  reporter: [
    ['html', { open: 'never', outputFolder: 'artifacts/playwright-report' }],
    ['junit', { outputFile: 'artifacts/junit.xml' }],
    ['json', { outputFile: 'artifacts/results.json' }]
  ],

  /**
   * Shared settings for all tests/projects.
   * baseURL is resolved from:
   * - BASE_URL (override) OR
   * - config/<brand>/<env>.json
   */
  use: {
    baseURL: envConfig.baseUrl,

    // Headless in CI is typical; locally you can override via PW_HEADLESS=0 if needed
    headless: process["env"].PW_HEADLESS ? process["env"].PW_HEADLESS !== '0' : true,

    // Making a screenshot only on failure
    screenshot: 'only-on-failure',
    // Recording the video, but saving only on failure
    video: 'retain-on-failure',
    trace: 'on-first-retry',

    // Wait for element
    actionTimeout: 10_000,

    // Navigation custom timeout
    navigationTimeout: 30_000,
    testIdAttribute: 'data-test-custom',

  },

  /**
   * Browsers:
   * - Always run Chromium.
   * - Enable cross-browser only when CROSS_BROWSER=1 (keeps PR pipeline fast).
   */
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    ...(process["env"].CROSS_BROWSER === '1'
      ? [
          { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
          { name: 'webkit', use: { ...devices['Desktop Safari'] } },
        ]
      : []),
  ],
});
