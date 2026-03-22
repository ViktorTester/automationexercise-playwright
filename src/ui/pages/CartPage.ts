import {expect, Locator, Page} from "@playwright/test";

/**
 * Cart page object
 */
export class CartPage {

    readonly cartItemsList: Locator;
    readonly productPrice: Locator;
    readonly totalPrice: Locator;
    readonly quantity: Locator;

    constructor(page: Page) {

        this.cartItemsList = page.locator('tbody > tr');
        this.productPrice = page.locator('.cart_price p');
        this.totalPrice = page.locator('.cart_total p');
        this.quantity = page.locator('.cart_quantity button');
    }

    // Assertions
    async checkCartItemsQty(count: number): Promise<void> {
        expect(this.cartItemsList).toHaveCount(count);
    }

    async checkFirstProductData(productPrice: string, totalPrice: string, qty: string): Promise<void> {
        expect(this.productPrice.first()).toHaveText(productPrice);
        expect(this.totalPrice.first()).toHaveText(totalPrice);
        expect(this.quantity.first()).toHaveText(qty);
    }

    async checkSecondProductData(price: string, qty: string): Promise<void> {
        expect(this.productPrice.nth(1)).toHaveText(price);
        expect(this.totalPrice.nth(1)).toHaveText(price);
        expect(this.quantity.nth(1)).toHaveText(qty);
    }
}