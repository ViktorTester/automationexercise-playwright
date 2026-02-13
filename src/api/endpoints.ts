/**
 * Central catalog of API paths.
 * baseUrl comes from config (env) and is injected into RequestClient.
 */
export const Endpoints = {
    Account: {
        // Keep endpoint paths relative (without leading "/") for safe URL resolution with apiBaseUrl.
        DeleteAccount: 'deleteAccount',
    }
} as const;
