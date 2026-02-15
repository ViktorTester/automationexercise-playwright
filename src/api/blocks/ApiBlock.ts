import type { HttpMethod } from '../HttpMethod';
import type { ApiCallResponse } from '../RequestClient';
import { RequestClient } from '../RequestClient';

type Primitive = string | number | boolean;

export class ApiCallBuilder {
    private query: Record<string, Primitive> = {};
    private form: Record<string, Primitive> = {};
    private shouldLog = false;

    constructor(
        private readonly client: RequestClient,
        private readonly method: HttpMethod,
        private readonly path: string
    ) {}

    /**
     * Adds query parameter to the request URL.
     */
    setQuery(key: string, value: Primitive): this {
        this.query[key] = value;
        return this;
    }

    /**
     * Adds a form field to the ` application / x-www-form-urlencoded ` payload.
     */
    setForm(key: string, value: Primitive): this {
        this.form[key] = value;
        return this;
    }

    /**
     * Enables request/response console logs for this call only.
     */
    withLogs(): this {
        this.shouldLog = true;
        return this;
    }

    /**
     * returns full response.
     */
    async send(): Promise<ApiCallResponse> {
        return this.client.send(this.method, this.path, {
            ...(Object.keys(this.query).length ? { query: this.query } : {}),
            ...(Object.keys(this.form).length ? { form: this.form } : {}),
            ...(this.shouldLog ? { log: true } : {}),
        });
    }
}

export abstract class ApiBlock {
    protected constructor(protected readonly client: RequestClient) {}

    /**
     * Starts a fluent API call for a concrete endpoint and HTTP method.
     */
    call(path: string, method: HttpMethod): ApiCallBuilder {
        return new ApiCallBuilder(this.client, method, path);
    }
}
