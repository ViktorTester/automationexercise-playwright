import {test} from 'tests/fixtures/pages';

test.describe('"Products" page tests', () => {

    test.beforeEach(async ({home}) => {
        await home.open();
        await home.assertLoaded();
        await home.openProducts();
    })

    test('@smoke @regression Open the Products page and reach the PDP', async ({products}) => {

        await products.checkAllProductsSelected();
        await products.expectedSections();
        await products.productIsVisible();
        await products.allProductsPresent(34);
        await products.clickFirstProduct();
        await products.checkProductInfo();

    })
});