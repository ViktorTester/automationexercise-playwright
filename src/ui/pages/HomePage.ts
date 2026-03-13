import {expect, Locator, Page} from "@playwright/test";
import {loginCopy} from "@ui/copy/loginCopy";
import {BasePage} from "@pages/BasePage";
import {ContinuBtn} from "@pages/components/ContinuBtn";
import {ConsentModal} from "@pages/components/ConsentModal";
import {contactCopy} from "@ui/copy/contactCopy";
import {testCasesCopy} from "@ui/copy/testCasesCopy";
import {productsCopy} from "@ui/copy/productsCopy";
import {homeCopy} from "@ui/copy/homeCopy";
import {cartCopy} from "@ui/copy/cartCopy";

/**
 * Home page object
 */
export class HomePage extends BasePage {

    readonly mainTitile: Locator;
    readonly copyright: Locator;
    readonly loginPage: Locator;
    readonly contactPage: Locator;
    readonly testCasesPage: Locator;
    readonly productsPage: Locator;
    readonly cartPage: Locator;

    readonly accountDeletedTitle: Locator;
    readonly accountDeletedText1: Locator;
    readonly accountDeletedText2: Locator;

    readonly continueBtn: ContinuBtn;
    readonly consentModal: ConsentModal;
    readonly deleteAccBtn: Locator;
    readonly logoutBtn: Locator;

    readonly subscriptionText: Locator;
    readonly subscriptionInput: Locator;
    readonly subscriptionBtn: Locator;
    readonly successSubscriptionAlert: Locator;

    readonly addToCartBtn: Locator;
    readonly productOverlay: Locator;
    readonly productAddedText: Locator
    readonly continueShoppingBtn: Locator;
    readonly viewCartBtn: Locator;

    constructor(page: Page) {
        super(page);

        this.continueBtn = new ContinuBtn(page);
        this.consentModal = new ConsentModal(page);

        this.mainTitile = page.getByRole('link', {name: 'Website for automation'});
        this.copyright = page.getByText('Copyright © 2021 All rights');
        this.loginPage = page.getByRole('link', {name: ' Signup / Login'});
        this.contactPage = page.getByRole('link', {name: ' Contact us'});
        this.testCasesPage = page.getByRole('link', {name: ' Test Cases'});
        this.productsPage = page.getByRole('link', {name: ' Products'});
        this.cartPage = page.getByRole('link', {name: ' Cart'})

        this.accountDeletedTitle = page.getByText(loginCopy.accDeletedTitle);
        this.accountDeletedText1 = page.getByText(loginCopy.accDeletedText1);
        this.accountDeletedText2 = page.getByText(loginCopy.accDeletedText2);

        this.deleteAccBtn = page.getByRole('link', { name: ' Delete Account' });
        this.logoutBtn = page.getByRole('link', { name: ' Logout' });

        this.subscriptionText = page.getByRole('heading', {name: 'SUBSCRIPTION'});
        this.subscriptionInput = page.locator('#susbscribe_email');
        this.subscriptionBtn = page.locator('#subscribe');
        this.successSubscriptionAlert = page.locator('.alert-success');

        this.addToCartBtn = page.getByText('Add to cart');
        this.productOverlay = page.locator('.product-overlay');
        this.productAddedText = page.getByText(homeCopy.productAddedToCart);
        this.continueShoppingBtn = page.getByRole('button', {name: 'Continue Shopping'});
        this.viewCartBtn = page.getByRole('link', {name: 'View Cart'});

    }

    /**
     * Opens 'Home' page
     */
    async open(): Promise<void> {
        await this.page.goto('/');
        await this.closeConsentIfPresent();
    }

    /**
     * Opens 'Signup / Login' page
     */
    async openSignup(): Promise<void> {
        await this.loginPage.click();
        await expect (this.page).toHaveTitle(loginCopy.title);
    }

    /**
     * Opens 'Contact Us' page
     */
    async openContactUs(): Promise<void> {
        await this.contactPage.click();
        await expect(this.page).toHaveTitle(contactCopy.title);
    }

    /**
     * Opens 'Test Cases' page
     */
    async openTestCases(): Promise<void> {
        await this.testCasesPage.click();
        await expect(this.page).toHaveTitle(testCasesCopy.title);
    }

    /**
     * Opens 'Products' page
     */
    async openProducts(): Promise<void> {
        await this.productsPage.click();
        await expect(this.page).toHaveTitle(productsCopy.title);
    }

    /**
     * Logouts
     */
    async logout(): Promise<void> {
        await this.logoutBtn.click();
        await this.expectUrl('/login');
    }

    /**
     * Deletes the account
     */
    async deleteAccount(): Promise<void> {
        await this.deleteAccBtn.click();
    }

    /**
     * Opens 'Cart' page
     */
    async openCart(): Promise<void> {
        await this.cartPage.click();
        await expect(this.page).toHaveTitle(cartCopy.title);
    }

// Actions
    async clickContinue(): Promise<void> {
        await this.continueBtn.clickContinue();
    }

    async closeConsentIfPresent(): Promise<void> {
        await this.consentModal.closeConsentIfPresent();
    }

    async hoverOverFirstProduct(): Promise<void> {
        await this.addToCartBtn.first().hover();
        await expect(this.productOverlay.first()).toBeVisible();
        await expect(this.productOverlay.nth(2)).toBeHidden();
    }

    async hoverOverSecondProduct(): Promise<void> {
        await this.addToCartBtn.nth(2).hover();
        await expect(this.productOverlay.nth(1)).toBeVisible();
        await expect(this.productOverlay.first()).toBeHidden();
    }

    async addFirstProductToCart(): Promise<void> {
        await this.addToCartBtn.first().click();
        await this.checkProductAddedText('visible');
    }

    async addSecondProductToCart(): Promise<void> {
        await this.addToCartBtn.nth(2).click();
        await this.checkProductAddedText('visible');
    }

    async closeTheModal(): Promise<void> {
        await this.continueShoppingBtn.click();
        await this.checkProductAddedText('hidden');
    }

    async clickViewCart(): Promise<void> {
        await this.viewCartBtn.click();
        await this.expectUrl(/view_cart/);

    }


// Assertions
    /**
     * Validate 'account deleted' page titles
     */
    async expectAccountDeleted(): Promise<void> {
        await expect(this.accountDeletedTitle).toBeVisible();
        await expect(this.accountDeletedText1).toBeVisible();
        await expect(this.accountDeletedText2).toBeVisible();
    }

    /**
     * Verifies that key home page elements are rendered.
     */
    async assertLoaded(): Promise<void> {
        await expect(this.mainTitile).toBeVisible();
        await expect(this.copyright).toBeVisible();
    }

    async assertSectionsPresent():  Promise<void> {
        await expect(this.logoutBtn).toBeVisible();
        await expect(this.deleteAccBtn).toBeVisible();
    }

    async scrollToFooter(): Promise<void> {
        await this.copyright.scrollIntoViewIfNeeded();
    }

    async verifySubsriptionVisible(): Promise<void> {
        await expect(this.subscriptionText).toContainText('Subscription');
    }

    async subscribe(email: string): Promise<void> {
        await this.subscriptionInput.fill(email);
        await this.subscriptionBtn.click();
    }

    async checkSubscriptionSuccessAlert(): Promise<void> {
        await expect(this.successSubscriptionAlert).toContainText(homeCopy.subsriptionSuccess);
    }

    async checkProductAddedText(option: string): Promise<void> {
        if (option === 'visible') {
            await expect(this.productAddedText).toBeVisible();
        } else {
            await expect(this.productAddedText).toBeHidden();
        }
    }
}
