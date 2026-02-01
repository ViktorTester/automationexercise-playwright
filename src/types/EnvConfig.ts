export type AllowedEnv = 'dev' | 'staging';
export type AllowedBrand = 'brand1' | 'brand2';

/**
 * Environment configuration contract for tests.
 */
export interface EnvConfig {
  brand: AllowedBrand;
  env: AllowedEnv;

  /**
   * Base URL for UI navigation:
   * used by page.goto('/path') and relative URLs.
   */
  baseUrl: string;

  /**
   * API base URL for API tests
   */
  apiBaseUrl?: string;

  /**
   * Optional credentials reference.
   * Prefer storing secrets in CI secrets, not in repo JSON.
   * This structure allows referencing env var keys, not raw secrets.
   */
  credentialEnv?: {
    username?: string; // env var name that contains username
    password?: string; // env var name that contains password
  };
}
