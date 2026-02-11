export type AllowedEnv = 'dev' | 'staging';
export type AllowedBrand = 'brand1' | 'brand2';

/**
 * Environment configuration contract for tests.
 */
export type EnvConfig = {
  brand: AllowedBrand;
  env: AllowedEnv;

  /**
   * Base URL for UI navigation:
   * used by page.goto('/path') and relative URLs.
   */
  baseUrl: string;

  /**
   * Base URL for API:
   * used by page.goto('/path') and relative URLs.
   */
  apiBaseUrl: string;

  /**
   * Optional test credentials stored directly in repo JSON.
   * (for test only)
   */
  credentials: {
    username: string; // env var name that contains username
    email: string; // env var name that contains email
  };
}
