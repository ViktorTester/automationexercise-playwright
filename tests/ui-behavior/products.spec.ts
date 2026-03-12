import {test, expect} from 'tests/fixtures/pages';

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

    test('@regression Add multiple products to the cart', async ({page}) => {

        await page.getByText('Add to cart').first().hover();
        await expect(page.locator('.product-overlay').first()).toBeVisible();
        await expect(page.locator('.product-overlay').nth(2)).toBeHidden();
        await page.getByText('Add to cart').first().click();
        await expect(page.getByText('Your product has been added to cart.')).toBeVisible();

        await page.getByRole('button', {name: 'Continue Shopping'}).click();
        await expect(page.getByText('Your product has been added to cart.')).toBeHidden();

        await page.getByText('Add to cart').nth(2).hover();
        await expect(page.locator('.product-overlay').nth(1)).toBeVisible();
        await expect(page.locator('.product-overlay').first()).toBeHidden();
        await page.getByText('Add to cart').nth(2).click();
        await expect(page.getByText('Your product has been added to cart.')).toBeVisible();

        await page.getByRole('link', {name: 'View Cart'}).click();
        await expect(page).toHaveURL(/view_cart/);

        const cartItems = page.locator('tbody > tr');
        await expect(cartItems).toHaveCount(2);

        await expect(page.locator('.cart_price p').first()).toHaveText('Rs. 500');
        await expect(page.locator('.cart_total p').first()).toHaveText('Rs. 500');
        await expect(page.locator('.cart_quantity button').first()).toHaveText('1');

        await expect(page.locator('.cart_price p').nth(1)).toHaveText('Rs. 400');
        await expect(page.locator('.cart_total p').nth(1)).toHaveText('Rs. 400');
        await expect(page.locator('.cart_quantity button').nth(1)).toHaveText('1');


    })
});