import type {APIRequestContext} from '@playwright/test';
import {RequestClient} from './RequestClient';
import {AccountBlock} from './blocks/AccountBlock';
import {ProductsBlock} from "./blocks/ProductsBlock";
import {BrandsBlock} from "./blocks/BrandsBlock";


/**
 * Lazily creates domain API blocks over a shared transport client.
 */
export class ApiContainer {
    private readonly client: RequestClient;

    private _account?: AccountBlock;
    private _products?: ProductsBlock;
    private _brands?: BrandsBlock;

    /**
     * @param apiBaseUrl Base API URL from env config, e.g., https://host/api
     */
    constructor(request: APIRequestContext, apiBaseUrl: string) {
        this.client = new RequestClient(request, apiBaseUrl);
    }

    /**
     * Returns Account API block singleton for the current test context.
     */
    account(): AccountBlock {
        return (this._account ??= new AccountBlock(this.client));
    }

    /**
     * Returns Products API block singleton for the current test context.
     */
    products(): ProductsBlock {
        return (this._products ??= new ProductsBlock(this.client));
    }

    /**
     * Returns Brands API block singleton for the current test context.
     */
    brands(): BrandsBlock {
        return (this._brands ??= new BrandsBlock(this.client));
    }

}
