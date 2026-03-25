import {test} from '@fixtures/pages'
import {testUsers} from "@testdata/users/testUsers";
// import {Title} from "@app-types/SignupTypes/Title";
import {verifyApiResponse} from "@asserts/ApiAsserts";
import {customResponseMessages as custom} from "@constants/customResponseMessages";
import {commonResponses as common} from "@constants/commonResponses";
import {randomEmail} from "@utils/randomData";

test.describe('Create account tests', () => {
    test('@smoke @regression Create an account', async ({api}) => {
        const response = await api
            .account()
            .createAccount({
                ...testUsers.validUser,
                email: randomEmail()}
            );

        verifyApiResponse(response, 200, [
            {path: 'responseCode', expected: common.CREATED.code},
            {path: 'message', expected: custom.USER_CREATED.message},
        ])

    })
})
