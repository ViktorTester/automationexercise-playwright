import {test} from '@fixtures/pages';
import {testUsers as user, testUsers} from "@testdata/users/testUsers";
import {accountDeletion} from "@helpers/accountDeletion";

test.describe("Account Lifecycle Tests", () => {

    test.beforeEach(async ({home}) => {
        await home.open();
        await home.assertLoaded();
    });

    test.afterEach(async ({api}, testInfo) => {

        const hasCleanupTag = testInfo.tags.includes('@cleanup');

        if (!hasCleanupTag) return;

        await accountDeletion(api, user.anotherUser2.email, user.anotherUser2.password);
    })

    test.fixme("@smoke @regression Register and delete the user", async ({signup, home}) => {

        await home.openSignup();
        await signup.assertSignupLoaded();

        // Entering name + email on the signup form and moving on
        await signup.startSignup(
            testUsers.validUser.firstName,
            testUsers.validUser.email
        );
        await signup.assertAccountInfoLoaded();
        await signup.assertSignupPrefilled(testUsers.validUser);

        // Fills out the main part of the form and clicks 'Create Account'
        await signup.registerUser({...testUsers.validUser});

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

        await home.openSignup();
        await signup.assertSignupLoaded();

        // Entering email + password on the login form and moving on
        await signup.startLogin(
            config.credentials.email,
            config.credentials.password
        );
        await home.assertSectionsPresent();

        // Logout
        await home.logout();

    })

    test('@regression Login with incorrect credentials', async ({signup, home}) => {

        await home.openSignup();
        await signup.assertSignupLoaded();

        // Entering incorrect email + password on the login form
        await signup.startLogin(
            testUsers.anotherUser.email,
            testUsers.anotherUser.password
        );

        await signup.assertInvalidCreds();

    })

    test('@regression Register with existing email', async ({signup, config, home}) => {

        await home.openSignup();
        await signup.assertSignupLoaded();

        // Entering name + existing email on the signup form
        await signup.startSignup(
            testUsers.validUser.firstName,
            config.credentials.email
        );

        // Check validation message
        await signup.assertExistingEmail();

    })

    test('@regression Register while Checkout',
        {tag: '@cleanup'}, async ({page, products, home, checkout, signup, cart}) => {

        // Add product to the cart and proceed to checkout
        await products.clickFirstProduct();
        await products.addProductToCart();
        await home.clickViewCart();
        await cart.proceedToCheckout();
        await cart.beginRegistration();

        // Register the user
        await signup.startSignup(
            testUsers.anotherUser2.firstName,
            testUsers.anotherUser2.email
        );

        await signup.assertAccountInfoLoaded();
        await signup.assertSignupPrefilled(testUsers.anotherUser2);
        await signup.registerUser({...testUsers.anotherUser2});
        await signup.expectAccountCreated();

        // Proceed to the home page and open the cart
        await home.clickContinue();
        await home.checkLoggedUserName();

        // Open the cart and proceed to checkout
        await home.openCart();
        await cart.proceedToCheckout();
        await checkout.checkHeadings();

        // Enter the comment and place the order
        await checkout.enterComment('Test comment');
        await checkout.clickPlaceOrder();

        // Fill card details and confirm the order
        await checkout.enterPaymentDetails();
        await checkout.clickConfirmOrder();

        await page.pause();

    })

})
