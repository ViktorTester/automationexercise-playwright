import {EnvConfig} from '../types/EnvConfig';

/**
 * Configuration validation (fail-fast).
 * This is a test-control measure: prevent running tests with incomplete or wrong configuration.
 *
 */
export function validateConfig(config: EnvConfig): void {
    if (!config) {
        throw new Error('Missing env config object.');
    }

    if (!config.baseUrl || typeof config.baseUrl !== 'string') {
        throw new Error('Missing or invalid baseUrl in env config.');
    }

    if (!config.apiBaseUrl || typeof config.apiBaseUrl !== 'string') {
        throw new Error('Missing or invalid apiBaseUrl in env config.');
    }

    if (!config.apiBaseUrl.startsWith(config.baseUrl)) {
        throw new Error(`apiBaseUrl must start with baseUrl. Got apiBaseUrl="${config.apiBaseUrl}", baseUrl="${config.baseUrl}".`);
    }


    if (config.credentials) {
        const {username, email} = config.credentials;
        const oneProvided = Boolean(username) || Boolean(email);
        const bothProvided = Boolean(username) && Boolean(email);

        if (oneProvided && !bothProvided) {
            throw new Error('credentials must contain both username and email or be omitted.');
        }
    }
}
