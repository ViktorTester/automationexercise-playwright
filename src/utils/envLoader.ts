import * as fs from 'fs';
import * as path from 'path';
import { AllowedBrand, AllowedEnv, EnvConfig } from '../types/EnvConfig';

type RawEnvConfigFile = {
    baseUrl?: unknown;
    apiBaseUrl?: unknown;
    credentials?: RawCredentials;
};

type RawCredentials = {
    username?: unknown;
    email?: unknown;
};

function asObject(value: unknown): Record<string, unknown> {
    if (!value || typeof value !== 'object') return {};
    return value as Record<string, unknown>;
}

function asRawEnvConfigFile(value: unknown): RawEnvConfigFile {
    const obj = asObject(value);
    const credentialsObj = obj.credentials !== undefined ? asObject(obj.credentials) : undefined;

    return {
        ...(obj.baseUrl !== undefined ? { baseUrl: obj.baseUrl } : {}),
        ...(obj.apiBaseUrl !== undefined ? { apiBaseUrl: obj.apiBaseUrl } : {}),
        ...(credentialsObj !== undefined ? { credentials: credentialsObj as RawCredentials } : {}),
    };
}

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
    const envRaw = normalizeLower(process.env.ENV) ?? 'dev';
    const brandRaw = normalizeLower(process.env.BRAND) ?? 'brand1';

    const env = requireAllowed<AllowedEnv>('ENV', envRaw, ALLOWED_ENVS);
    const brand = requireAllowed<AllowedBrand>('BRAND', brandRaw, ALLOWED_BRANDS);

    const configPath = path.resolve(`config/${brand}/${env}.json`);

    if (!fs.existsSync(configPath)) {
        throw new Error(
            `Environment config file not found: ${configPath}. ` +
            `Expected at: config/<brand>/<env>.json (brand=${brand}, env=${env}).`,
        );
    }

    let parsed: unknown;
    try {
        parsed = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
    } catch (e: unknown) {
        const msg = e instanceof Error ? e.message : String(e);
        throw new Error(`Failed to parse JSON config: ${configPath}. ${msg}`);
    }

    const baseUrlOverride = process.env.BASE_URL?.trim();

    const fileConfig = asRawEnvConfigFile(parsed);
    const baseUrlFromFile = typeof fileConfig.baseUrl === 'string' ? fileConfig.baseUrl : undefined;
    const apiBaseUrlFromFile = typeof fileConfig.apiBaseUrl === 'string' ? fileConfig.apiBaseUrl : undefined;

    const usernameFromFile =
        typeof fileConfig.credentials?.username === 'string' ? fileConfig.credentials.username : undefined;
    const emailFromFile = typeof fileConfig.credentials?.email === 'string' ? fileConfig.credentials.email : undefined;

    const credentialsFromFile =
        usernameFromFile && emailFromFile
            ? { username: usernameFromFile, email: emailFromFile }
            : undefined;

    return {
        brand,
        env,
        baseUrl: baseUrlOverride || baseUrlFromFile || '',
        ...(apiBaseUrlFromFile ? { apiBaseUrl: apiBaseUrlFromFile } : {}),
        ...(credentialsFromFile ? { credentials: credentialsFromFile } : {}),
    };
}
