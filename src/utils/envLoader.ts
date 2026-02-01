import fs from 'fs';
import path from 'path';
import { EnvConfig, AllowedBrand, AllowedEnv } from '../types/EnvConfig';

/**
 * Allowed values are intentionally strict (fail-fast).
 * Wrong ENV/BRAND values must stop the run early to avoid misleading results.
 */
const ALLOWED_ENVS: AllowedEnv[] = ['dev', 'staging'];
const ALLOWED_BRANDS: AllowedBrand[] = ['brand1', 'brand2'];

function normalizeLower(value: string | undefined): string | undefined {
  return value?.trim().toLowerCase();
}

function requireAllowed<T extends string>(name: string, value: string, allowed: readonly T[]): T {
  if (!allowed.includes(value as T)) {
    throw new Error(`Unsupported ${name}="${value}". Allowed: ${allowed.join(', ')}`);
  }
  return value as T;
}

/**
 * Loads environment config from:
 *   config/<brand>/<env>.json
 *
 * Override rule:
 * - If BASE_URL is provided, it overrides baseUrl from file (useful for ad-hoc runs).
 */
export function loadEnvConfig(): EnvConfig {
  const envRaw = normalizeLower(process["env"].ENV) ?? 'dev';
  const brandRaw = normalizeLower(process["env"].BRAND) ?? 'brand1';

  const env = requireAllowed<AllowedEnv>('ENV', envRaw, ALLOWED_ENVS);
  const brand = requireAllowed<AllowedBrand>('BRAND', brandRaw, ALLOWED_BRANDS);

  const configPath = path.resolve(`config/${brand}/${env}.json`);

  if (!fs.existsSync(configPath)) {
    throw new Error(
      `Environment config file not found: ${configPath}. ` +
      `Expected at: config/<brand>/<env>.json (brand=${brand}, env=${env}).`
    );
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
  } catch (e: unknown) {
    throw new Error(`Failed to parse JSON config: ${configPath}. ${e?.message ?? e}`);
  }

  const baseUrlOverride = process["env"].BASE_URL?.trim();

  const envConfig: EnvConfig = {
    brand,
    env,
    baseUrl: baseUrlOverride || parsed.baseUrl,
    apiBaseUrl: parsed.apiBaseUrl,
    credentialEnv: parsed.credentialEnv,
  };

  return envConfig;
}
