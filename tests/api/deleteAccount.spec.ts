import {test} from 'tests/fixtures/pages'
import {verifyApiResponse} from "@asserts/ApiAsserts";
import {customResponseMessages as custom} from "@constants/customResponseMessages";
import {commonResponses as common} from "@constants/commonResponses";
import {accountRegistration} from "../helpers/accountRegistration";
import {TestUsers, TestUsers as user} from "../../src/testdata/users/testUsers";
import {Title} from "@app-types/SignupTypes/Title";

test.describe('Delete account tests', () => {

    test.beforeEach(async ({api}) => {
        await accountRegistration(api, {...TestUsers.deletedUser, title: Title.Mr})
    })

    test('@smoke @regression Delete an account', async ({api}) => {

        const response = await api
            .account()
            .deleteAccount(
                user.deletedUser.email,
                user.deletedUser.password
            );

        verifyApiResponse(response, 200, [
            {path: 'responseCode', expected: common.OK.code},
            {path: 'message', expected: custom.USER_DELETED.message}

        ])

    })
})
