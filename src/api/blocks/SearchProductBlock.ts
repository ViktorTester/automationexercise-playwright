import {ApiBlock} from "./ApiBlock";
import {Endpoints} from '../endpoints';
import type {RequestClient} from '../RequestClient';
import type {ApiCallBuilder} from './ApiBlock';
import type {HttpMethod} from '../HttpMethod';

export class SearchProductBlock extends ApiBlock {
    constructor(client: RequestClient) {
        super(client);
    }

    /**
     * Builds a 'product search' API call with a product category.
     */
    searchProduct(method: HttpMethod): ApiCallBuilder {
        return this.call(Endpoints.SearchProduct.SearchForProduct, method)
            .setForm('search_product', 'top');
    }

    /**
     * Builds a 'product search' API call with an empty product category.
     */
    emptyParam(method: HttpMethod): ApiCallBuilder {
        return this.call(Endpoints.SearchProduct.SearchForProduct, method);
    }

}
