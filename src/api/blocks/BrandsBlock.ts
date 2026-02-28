import {ApiBlock} from "./ApiBlock";
import {Endpoints} from '../endpoints';
import type {RequestClient} from '../RequestClient';
import type {ApiCallBuilder} from './ApiBlock';
import type {HttpMethod} from '../HttpMethod';

export class BrandsBlock extends ApiBlock {
    constructor(client: RequestClient) {
        super(client);
    }

    /**
     * Builds a 'brands list' API call
     */
    brandsList(method: HttpMethod): ApiCallBuilder {
        return this.call(Endpoints.Brands.BrandsList, method);
    }
}
