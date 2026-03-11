import {test} from 'tests/fixtures/pages';
import {TestUsers} from "../../src/testdata/users/testUsers";
import {Title} from "@app-types/SignupTypes/Title";

test.describe("Account Lifecycle Tests", () => {

    test.beforeEach(async ({home, signup}) => {
        await home.open();
        await home.assertLoaded();
        await home.openSignup();
        await signup.assertSignupLoaded();
    });

    test("@smoke @regression Register and delete the user", async ({signup, home}) => {

        // Entering name + email on the signup form and moving on
        await signup.startSignup(
            TestUsers.validUser.firstName,
            TestUsers.validUser.email
        );
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

    test("@regression Login and Logout", async ({signup, config, home}) => {

        // Entering email + password on the login form and moving on
        await signup.startLogin(
            config.credentials.email,
            config.credentials.password
        );
        await home.assertSectionsPresent();

        // Logout
        await home.logout();

    })

    test('@regression Login with incorrect credentials', async ({signup}) => {

        // Entering incorrect email + password on the login form
        await signup.startLogin(
            TestUsers.anotherUser.email,
            TestUsers.anotherUser.password
        );

        await signup.assertInvalidCreds();

    })

    test('@regression Register with existing email', async ({signup, config}) => {

        // Entering name + existing email on the signup form
        await signup.startSignup(
            TestUsers.validUser.firstName,
            config.credentials.email
        );

        // Check validation message
        await signup.assertExistingEmail();

    })

})
