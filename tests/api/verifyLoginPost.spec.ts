import {test} from '@fixtures/pages';
import {verifyApiResponse} from "@asserts/ApiAsserts";
import {commonResponses as common} from "@constants/commonResponses";
import {customResponseMessages as custom} from "@constants/customResponseMessages";

test.describe('POST/api/verifyLogin tests', () => {

    test('@smoke @regression [POST/api/verifyLogin] Login with valid credentials', async ({api}) => {

        const response = await api
            .login().validCreds('POST');

        verifyApiResponse(response, 200,
            [
                {path: 'responseCode', expected: common.OK.code},
                {path: 'message', expected: custom.USER_EXISTS.message},
            ]);

    })

    test('@regression [POST/api/verifyLogin] Login without email', async ({api}) => {

        const response = await api
            .login().withoutEmail('POST');

        verifyApiResponse(response, 200,
            [
                {path: 'responseCode', expected: common.BAD_REQUEST.code},
                {path: 'message', expected: custom.LOGIN_CREDENTIALS_MISSING.message},
            ]);

    })

    test('@regression [GET/api/verifyLogin] Should validate unsupported method', async ({api}) => {

        const response = await api
            .login().verifyLogin('DELETE');

        verifyApiResponse(response, 200, [
            {path: 'responseCode', expected: common.METHOD_NOT_SUPPORTED.code},
            {path: 'message', expected: common.METHOD_NOT_SUPPORTED.message}
        ]);

    })

    test('@regression [POST/api/verifyLogin] Login with invalid credentials', async ({api}) => {

        const response = await api
            .login().invalidCreds('POST');

        verifyApiResponse(response, 200, [
            {path: 'responseCode', expected: common.NOT_FOUND.code},
            {path: 'message', expected: custom.USER_NOT_FOUND.message},
        ])

    })

})
