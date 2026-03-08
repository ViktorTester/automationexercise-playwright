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

    test('@regression Search for a product', async ({products}) => {
        await products.checkAllProductsSelected();

        await products.searchForProduct('Winter Top');
        await products.searchedProductsTitlePresent();

        await products.checkProductsCount(1);
        await products.checkSearchOutput(/Winter Top/);

    })
});