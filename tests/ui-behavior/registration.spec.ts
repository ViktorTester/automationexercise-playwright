import {test} from 'tests/fixtures/pages';
import {TestUsers} from "../../src/testdata/users/testUsers";
import {Title} from "@app-types/SignupTypes/Title";

test.describe("Test Case 1: Register User", () => {
    test.beforeEach(async ({home}) => {
        await home.open();
        await home.assertLoaded();
        await home.openLogin();
    });

    test("@smoke Register and delete the user", async ({signup, home}) => {

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

        // Delete the account
        await home.deleteAccount();
        await home.expectAccountDeleted();

        // Return to home page
        await home.clickContinue();

    });

    test("@smoke Login and Logout", async ({signup, config, home}) => {

        // Entering email + password on the login form and moving on
        await signup.startLogin(
            config.credentials.email,
            config.credentials.password
        );
        await home.assertSectionsPresent();

        // Logout
        await home.logout();

    })

    test('@smoke Login with incorrect credentials', async ({signup}) => {

        // Entering incorrect email + password on the login form and moving on
        await signup.startLogin(
            TestUsers.anotherUser.email,
            TestUsers.anotherUser.password
        );

        await signup.assertInvalidCreds();

    })

})
