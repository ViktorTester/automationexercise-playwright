import {test} from '@fixtures/pages';

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

    test('@regression Add products in cart', async ({home, cart}) => {

        await home.hoverOverFirstProduct();
        await home.addFirstProductToCart();
        await home.closeTheModal();

        await home.hoverOverSecondProduct();
        await home.addSecondProductToCart();
        await home.clickViewCart();

        await cart.ckeckCartItemsQty(2);
        await cart.checkFirstProductData('Rs. 500', '1');
        await cart.checkSecondProductData('Rs. 400', '1');

    })
});
