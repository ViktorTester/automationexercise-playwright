import {test} from 'tests/fixtures/pages';
import {verifyApiResponse} from "@asserts/ApiAsserts";
import {commonResponses as common} from "@constants/commonResponses";
import {customResponseMessages as custom} from "@constants/customResponseMessages";

test.describe('POST/api/verifyLogin tests', () => {

    test('@smoke @regression [POST/api/verifyLogin] Login with valid credentials', async ({api}) => {

        const response = await api
            .verifyLogin().validCreds('POST');

        verifyApiResponse(response, 200,
            [
                {path: 'responseCode', expected: common.OK.code},
                {path: 'message', expected: custom.USER_EXISTS.message},
            ]);

    })

    test('@regression [POST/api/verifyLogin] Login without email', async ({api}) => {

        const response = await api
            .verifyLogin().withoutEmail('POST')
            .withLogs();

        verifyApiResponse(response, 200,
            [
                {path: 'responseCode', expected: common.BAD_REQUEST.code},
                {path: 'message', expected: custom.LOGIN_CREDENTIALS_MISSING.message},
            ]);

    })

})