import type { APIRequestContext } from '@playwright/test';
import { RequestClient } from '../api/RequestClient';
import { AccountBlock } from '../api/blocks/AccountBlock';


/**
 * Lazily creates domain API blocks over a shared transport client.
 */
export class ApiContainer {
    private readonly client: RequestClient;

    private _account?: AccountBlock;

    /**
     * @param apiBaseUrl Base API URL from env config, e.g. https://host/api
     */
    constructor(request: APIRequestContext, apiBaseUrl: string) {
        this.client = new RequestClient(request, apiBaseUrl);
    }

    /**
     * Returns Account API block singleton for current test context.
     */
    account(): AccountBlock {
        return (this._account ??= new AccountBlock(this.client));
    }

}
