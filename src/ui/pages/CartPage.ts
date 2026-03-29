import {expect, Locator, Page} from "@playwright/test";
import {BasePage} from "@pages/BasePage";

/**
 * Cart page object
 */
export class CartPage extends BasePage{

    readonly cartItemsList: Locator;
    readonly productPrice: Locator;
    readonly totalPrice: Locator;
    readonly quantity: Locator;

    readonly checkoutBtn: Locator;
    readonly registerLoginBtn: Locator;

    readonly removeItemBtn: Locator;

    constructor(page: Page) {
        super(page);

        this.cartItemsList = page.locator('tbody > tr');
        this.productPrice = page.locator('.cart_price p');
        this.totalPrice = page.locator('.cart_total p');
        this.quantity = page.locator('.cart_quantity button');

        this.checkoutBtn = page.locator('.check_out');
        this.registerLoginBtn = page.getByRole('link', {name: 'Register / Login'});

        this.removeItemBtn = page.locator('.cart_quantity_delete');
    }

    // Actions
    async proceedToCheckout(): Promise<void> {
        await this.checkoutBtn.click();
    }

    async beginRegistration(): Promise<void> {
        await this.registerLoginBtn.click();
    }

    async clickRemoveItem(): Promise<void> {
        await this.removeItemBtn.click();
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