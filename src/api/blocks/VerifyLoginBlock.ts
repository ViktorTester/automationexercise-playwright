import {ApiBlock} from "./ApiBlock";
import {Endpoints} from '../endpoints';
import type {RequestClient} from '../RequestClient';
import type {ApiCallBuilder} from './ApiBlock';
import {HttpMethod} from "../HttpMethod";
import type {EnvConfig} from '../../types/EnvConfig';

export class VerifyLoginBlock extends ApiBlock {
    constructor(
        client: RequestClient,
        private readonly config: EnvConfig
    ) {
        super(client);
    }

    /**
     * Builds a 'verify login' API call with valid credentials.
     */
    validCreds(method: HttpMethod): ApiCallBuilder {
        return this.call(Endpoints.VerifyLogin.VerifyLogin, method)
            .setForm('email', this.config.credentials.email)
            .setForm('password', this.config.credentials.password);
    }

    /**
     * Builds a 'verify login' API call without an 'email' param.
     */
    withoutEmail(method: HttpMethod): ApiCallBuilder {
        return this.call(Endpoints.VerifyLogin.VerifyLogin, method)
            .setForm('password', this.config.credentials.password);
    }
}
