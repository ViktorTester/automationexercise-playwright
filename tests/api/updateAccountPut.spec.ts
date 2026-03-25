import {test} from '@fixtures/pages'
import {verifyApiResponse} from "@asserts/ApiAsserts";
import {customResponseMessages as custom} from "@constants/customResponseMessages";
import {commonResponses as common} from "@constants/commonResponses";
import {accountRegistration} from "@helpers/accountRegistration";
import {testUsers, testUsers as user} from "@testdata/users/testUsers";
import {accountDeletion} from "@helpers/accountDeletion";

test.describe('Update account tests', () => {

    test.beforeAll(async ({api}) => {
        await accountRegistration(api, {...testUsers.deletedUser});
    })

    test.afterAll(async ({api}) => {
        await accountDeletion(api, user.updatedUser.email, user.updatedUser.password);
    })

    test('@smoke @regression Update an account', async ({api}) => {

        const response = await api
            .account()
            .updateAccount({...testUsers.updatedUser});

        verifyApiResponse(response, 200, [
            {path: 'responseCode', expected: common.OK.code},
            {path: 'message', expected: custom.USER_UPDATED.message}

        ])

    })
})
