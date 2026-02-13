import {test} from 'tests/fixtures/pages';
import {TestUsers} from "../../src/testdata/users/testUsers";
import {Title} from "@app-types/SignupTypes/Title";
import {Endpoints} from '../../src/api/endpoints';
import {verifyApiResponse} from "../../src/api/asserts/ApiAsserts";
test.describe("Test Case 1: Register User", () => {
    test.beforeEach(async ({home}) => {
        await home.open();
        await home.openLogin();
    });

    test("@smoke Register and delete the user", async ({signup}) => {

        // Entering name + email on the signup form and moving on + header checks + prefilled
        await signup.startSignup(TestUsers.validUser);

        // Fills out the main part of the form and clicks Create Account
        await signup.registerUser({...TestUsers.validUser, title: Title.Mr});

        // Validate 'account created' page titles
        await signup.expectAccountCreated();

        // Exit the flow
        await signup.clickContinue();

        // TODO - delete user through the ui

    });

    test('@smoke DELETE /deleteAccount - Should delete a user', async ({api}) => {

        const response = await api.account()
            .call(Endpoints.Account.DeleteAccount, 'DELETE')
            .setForm("email", TestUsers.validUser.email)
            .setForm("password", TestUsers.validUser.password)
            .send();

        verifyApiResponse(response, 200,
            [{path: 'message', expected: 'Account deleted!'}]);


    });

})
