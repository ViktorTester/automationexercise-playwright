import {ApiBlock} from "./ApiBlock";
import {Endpoints} from '../endpoints';
import type {RequestClient} from '../RequestClient';
import type {ApiCallBuilder} from './ApiBlock';
import {SignupUser} from "@app-types/users/SignupUser";
import {randomEmail, randomNumberInRange} from "@utils/randomData";

export class AccountBlock extends ApiBlock {
    constructor(client: RequestClient) {
        super(client);
    }

    /**
     * Builds a 'delete-account' API call with credentials.
     */
    deleteAccount(email: string, password: string): ApiCallBuilder {
        return this.call(Endpoints.Account.DeleteAccount, 'DELETE')
            .setForm('email', email)
            .setForm('password', password);
    }

    /**
     * Builds an 'update-account' API call with credentials.
     */
    updateAccount(user: SignupUser): ApiCallBuilder {

        return this.call(Endpoints.Account.UpdateAccount, 'PUT')
            .setForm('name', user.firstName)
            .setForm('email', user.email)
            .setForm('password', user.password)
            .setForm('title', user.title)
            .setForm('birth_date', randomNumberInRange(1, 28))
            .setForm('birth_mounth', randomNumberInRange(1, 12))
            .setForm('birth_year', randomNumberInRange(1950, 2003))
            .setForm('firstname', user.firstName)
            .setForm('lastname', user.lastName)
            .setForm('company', user.company)
            .setForm('address1', user.address1)
            .setForm('address2', user.address2)
            .setForm('country', user.country)
            .setForm('zipcode', user.zipCode)
            .setForm('state', user.state)
            .setForm('city', user.city)
            .setForm('mobile_number', user.mobileNr)
    }

    /**
     * Builds a 'Create-account' API call with credentials.
     */
    createAccount(user: SignupUser): ApiCallBuilder {

        const email = user.email ?? randomEmail();

        return this.call(Endpoints.Account.CreateAccount, 'POST')
            .setForm('name', user.firstName)
            .setForm('email', email)
            .setForm('password', user.password)
            .setForm('title', user.title)
            .setForm('birth_date', randomNumberInRange(1, 28))
            .setForm('birth_mounth', randomNumberInRange(1, 12))
            .setForm('birth_year', randomNumberInRange(1950, 2003))
            .setForm('firstname', user.firstName)
            .setForm('lastname', user.lastName)
            .setForm('company', user.company)
            .setForm('address1', user.address1)
            .setForm('address2', user.address2)
            .setForm('country', user.country)
            .setForm('zipcode', user.zipCode)
            .setForm('state', user.state)
            .setForm('city', user.city)
            .setForm('mobile_number', user.mobileNr)
    }
}
