import { EnvConfig } from '../types/EnvConfig';

/**
 * Configuration validation (fail-fast).
 * This is a test-control measure: prevent running tests with incomplete or wrong configuration.
 *
 * ISTQB-aligned rationale:
 * - Reduces the risk of invalid test execution due to environment misconfiguration.
 * - Improves reliability of test results and simplifies defect triage.
 */
export function validateConfig(config: EnvConfig): void {
  if (!config) {
    throw new Error('Missing env config object.');
  }

  if (!config.baseUrl || typeof config.baseUrl !== 'string') {
    throw new Error('Missing or invalid baseUrl in env config.');
  }

  if (config.apiBaseUrl && typeof config.apiBaseUrl !== 'string') {
    throw new Error('Invalid apiBaseUrl in env config (must be a string).');
  }

  if (config.credentialEnv) {
    const { username, password } = config.credentialEnv;

    // If one is provided, require the other (prevents partial configuration).
    const oneProvided = Boolean(username) || Boolean(password);
    const bothProvided = Boolean(username) && Boolean(password);

    if (oneProvided && !bothProvided) {
      throw new Error('credentialEnv must contain both username and password (env var names) or be omitted.');
    }
  }
}
