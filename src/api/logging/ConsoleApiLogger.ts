import type { ApiLogger } from './ApiLogger';
import type { HttpMethod } from '../HttpMethod';

/**
 * Simple console-based logger.
 * Responsible ONLY for formatting and output.
 */
export class ConsoleApiLogger implements ApiLogger {
    constructor(private readonly enabled: boolean) {}

    logRequest(method: HttpMethod, url: string, payload?: unknown): void {
        if (!this.enabled) return;

        console.log('\n -> -> -> -> -> -> -> REQUEST');
        console.log(method, url);

        if (payload !== undefined) {
            console.log('Payload:', JSON.stringify(payload, null, 2));
        }
    }

    logResponse(status: number, body: unknown): void {
        if (!this.enabled) return;

        console.log('\nRESPONSE <- <- <- <- <- <- <-');
        console.log('Status:', status);
        console.log('Body:', JSON.stringify(body, null, 2));
    }
}
