import {APIRequestContext} from '@playwright/test';
import type {HttpMethod} from './HttpMethod';

type Primitive = string | number | boolean;

export type SendOptions = {
    query?: Record<string, Primitive>;
    form?: Record<string, Primitive>;
    json?: unknown;
    headers?: Record<string, string>;
};

export type ApiCallResponse = {
    method: HttpMethod;
    url: string;
    payload?: unknown;
    status: number;
    body: unknown;
};

/**
 * Transport layer.
 * Always returns full evidence.
 */
export class RequestClient {
    constructor(
        private readonly request: APIRequestContext,
        private readonly baseUrl: string
    ) {
    }

    async send(
        method: HttpMethod,
        path: string,
        opts: SendOptions = {}
    ): Promise<ApiCallResponse> {
        /**
         * URL join is normalized to avoid dropping "/api" when base URL has no trailing slash.
         * Example: base "https://host/api" + path "deleteAccount" -> "https://host/api/deleteAccount"
         */
        const normalizedBaseUrl = this.baseUrl.endsWith('/')
            ? this.baseUrl
            : `${this.baseUrl}/`;
        const normalizedPath = path.replace(/^\/+/, '');
        const urlObj = new URL(normalizedPath, normalizedBaseUrl);

        if (opts.query) {
            for (const [k, v] of Object.entries(opts.query)) {
                urlObj.searchParams.set(k, String(v));
            }
        }

        const url = urlObj.toString();
        const payload = opts.form ?? opts.json;

        const resp = await this.request.fetch(url, {
            method,
            ...(opts.form ? { form: opts.form } : {}),
            ...(opts.headers ? { headers: opts.headers } : {}),
            ...(opts.json !== undefined ? { data: opts.json } : {}),
        });

        const rawText = await resp.text();

        let body: unknown = rawText;
        try {
            body = rawText ? JSON.parse(rawText) : null;
        } catch {
            body = rawText;
        }

        return {
            method,
            url,
            payload,
            status: resp.status(),
            body,
        };
    }
}
