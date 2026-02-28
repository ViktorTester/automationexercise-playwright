import type {APIRequestContext} from '@playwright/test';
import {RequestClient} from './RequestClient';
import {VerifyLoginBlock} from './blocks/VerifyLoginBlock';
import {ProductsBlock} from "./blocks/ProductsBlock";
import {BrandsBlock} from "./blocks/BrandsBlock";
import {SearchProductBlock} from "./blocks/SearchProductBlock";
import {EnvConfig} from "@app-types/EnvConfig";


/**
 * Lazily creates domain API blocks over a shared transport client.
 */
export class ApiContainer {
    private readonly client: RequestClient;
    private readonly config: EnvConfig;

    private _products?: ProductsBlock;
    private _brands?: BrandsBlock;
    private _searchProduct?: SearchProductBlock;
    private _verifyLogin?: VerifyLoginBlock;

    /**
     * @param apiBaseUrl Base API URL from env config, e.g., https://host/api
     */
    // constructor(request: APIRequestContext, apiBaseUrl: string) {
    //     this.client = new RequestClient(request, apiBaseUrl);
    // }
    constructor(request: APIRequestContext, config: EnvConfig) {
        this.client = new RequestClient(request, config.apiBaseUrl);
        this.config = config;
    }

    /**
     * Returns 'Products' API block singleton for the current test context.
     */
    products(): ProductsBlock {
        return (this._products ??= new ProductsBlock(this.client));
    }

    /**
     * Returns 'Brands' API block singleton for the current test context.
     */
    brands(): BrandsBlock {
        return (this._brands ??= new BrandsBlock(this.client));
    }

    /**
     * Returns 'Search product' API block singleton for the current test context.
     */
    searchProduct() : SearchProductBlock {
        return (this._searchProduct ??= new SearchProductBlock(this.client))
    }

    /**
     * Returns 'Verifu login' API block singleton for the current test context.
     */
    verifyLogin(): VerifyLoginBlock {
        return (this._verifyLogin ??= new VerifyLoginBlock(this.client, this.config));
    }
}
