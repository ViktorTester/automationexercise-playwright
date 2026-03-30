import {test} from '@fixtures/pages';
import {Categories} from "@constants/categories";

test.describe('"Products" page tests', () => {

    test.beforeEach(async ({home}) => {
        await home.open();
        await home.assertLoaded();
    })

    test('@smoke @regression Open the Products page and reach the PDP', async ({home, products}) => {
        await home.openProducts();

        await products.checkAllProductsSelected();
        await products.expectedSections();
        await products.productIsVisible();
        await products.allProductsPresent(34);
        await products.clickFirstProduct();
        await products.checkProductInfo();

    })

    test('@regression Search for a product', async ({home, products}) => {
        await home.openProducts();

        await products.checkAllProductsSelected();
        await products.searchForProduct('Winter Top');
        await products.searchedProductsTitlePresent();
        await products.checkProductsCount(1);
        await products.checkSearchOutput(/Winter Top/);

    })

    test('@regression Add products in cart', async ({home, cart}) => {
        await home.openProducts();

        await home.hoverOverFirstProduct();
        await home.addFirstProductToCart();
        await home.closeTheModal();

        await home.hoverOverSecondProduct();
        await home.addSecondProductToCart();
        await home.clickViewCart();

        await cart.checkCartItemsQty(2);
        await cart.checkFirstProductData('Rs. 500', 'Rs. 500', '1');
        await cart.checkSecondProductData('Rs. 400', '1');

    })

    test('@regression Verify product quantity in cart', async ({home, products, cart}) => {
        await products.clickFirstProduct();
        await products.increaseProductQtyTo('4');
        await products.addProductToCart();
        await home.clickViewCart();
        await cart.checkCartItemsQty(1);
        await cart.checkFirstProductData('Rs. 500','Rs. 2000', '4');

    })

    test('@regression Remove products from cart', async ({home, cart}) => {
        await home.openProducts();

        await home.hoverOverFirstProduct();
        await home.addFirstProductToCart();
        await home.closeTheModal();
        await home.openCart();

        await cart.clickRemoveItem();

    })

    test('@regression View category products', async ({home}) => {

        // Choose a category filter and validate it
        await home.checkCategoriesPresent(3);
        await home.selectCategory(Categories.WOMEN_DRESS);

        // Choose another category and validate it
        await home.selectCategory(Categories.KIDS_DRESS);

    })
});
