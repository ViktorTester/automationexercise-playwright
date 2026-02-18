import {ApiBlock} from "./ApiBlock";
import {Endpoints} from '../endpoints';
import type {RequestClient} from '../RequestClient';
import type {ApiCallBuilder} from './ApiBlock';
import type {HttpMethod} from '../HttpMethod';

export class ProductsBlock extends ApiBlock {
    constructor(client: RequestClient) {
        super(client);
    }

    /**
     * Builds a products list API call
     */
    productsList(method: HttpMethod): ApiCallBuilder {
        return this.call(Endpoints.Products.ProductsList, method);
    }

    /**
     * Builds a product search API call with a product category.
     */
    searchProducts(method: HttpMethod): ApiCallBuilder {
        return this.call(Endpoints.Products.SerchProduct, method)
            .setForm('search_product', 'top');
    }

}
