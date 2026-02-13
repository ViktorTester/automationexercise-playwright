import {test} from 'tests/fixtures/pages';
import {TestUsers} from "../../src/testdata/users/testUsers";
import {Title} from "@app-types/SignupTypes/Title";
import {verifyApiResponse} from "../../src/api/asserts/ApiAsserts";

test.describe("Test Case 1: Register User", () => {
    test.beforeEach(async ({home}) => {
        await home.open();
        await home.assertLoaded();
        await home.openLogin();
    });

    test("@smoke Register and delete the user", async ({signup}) => {
        await signup.assertSignupLoaded();

        // Entering name + email on the signup form and moving on
        await signup.startSignup(TestUsers.validUser);
        await signup.assertAccountInfoLoaded();
        await signup.assertSignupPrefilled(TestUsers.validUser);

        // Fills out the main part of the form and clicks Create Account
        await signup.registerUser({...TestUsers.validUser, title: Title.Mr});

        // Validate 'account created' page titles
        await signup.expectAccountCreated();

        // Exit the flow
        await signup.clickContinue();

        // TODO - delete user through the ui

    });

    test('@smoke DELETE /deleteAccount - Should delete a user', async ({api}) => {

        const response = await api.account().deleteAccount(
            TestUsers.validUser.email,
            TestUsers.validUser.password
        ).withLogs().send();

        verifyApiResponse(response, 200,
            [
                {path: 'message', expected: 'Account deleted!'},
                {path: 'responseCode', expected: 200}
            ]
        );

    });

})
