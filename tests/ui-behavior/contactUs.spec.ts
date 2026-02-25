import {test} from 'tests/fixtures/pages';

test.describe('Contact Us Page Tests', () => {

    test.beforeEach(async ({home}) => {
        await home.open();
        await home.assertLoaded();
        await home.openContactUs();
    })

    test('@smoke @regression Submit the form with file uploading', async ({contact}) => {

        await contact.expectFormTitle();

    })

})