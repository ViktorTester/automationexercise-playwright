import {test} from 'tests/fixtures/pages'

test.describe('Subsription tests', () => {
    test.beforeEach(async ({home}) => {
        await home.open();
        await home.assertLoaded();
    })

    test('@smoke Successfull subscription flow', async ({home, config}) => {
        await home.scrollToFooter();
        await home.verifySubsriptionVisible();
        await home.subscribe(config.credentials.email);
        await home.checkSubscriptionSuccessAlert();
    })
})