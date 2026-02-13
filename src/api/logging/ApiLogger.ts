import type { HttpMethod } from '../HttpMethod';

export interface ApiLogger {
    logRequest(
        method: HttpMethod,
        url: string,
        payload?: unknown
    ): void;

    logResponse(
        status: number,
        body: unknown
    ): void;
}