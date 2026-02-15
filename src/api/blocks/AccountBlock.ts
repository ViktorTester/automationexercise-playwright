import {ApiBlock} from "./ApiBlock";
import {Endpoints} from '../endpoints';
import type {RequestClient} from '../RequestClient';
import type {ApiCallBuilder} from './ApiBlock';

export class AccountBlock extends ApiBlock {
    constructor(client: RequestClient) {
        super(client);
    }

    /**
     * Builds a delete-account API call with credentials.
     */
    deleteAccount(email: string, password: string): ApiCallBuilder {
        return this.call(Endpoints.Account.DeleteAccount, 'DELETE')
            .setForm('email', email)
            .setForm('password', password);
    }
}
