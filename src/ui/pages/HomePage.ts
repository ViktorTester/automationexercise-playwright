import {expect, Locator, Page} from "@playwright/test";

/**
 * Home page object
 */
export class HomePage {
    readonly consentBtn: Locator;
    readonly mainTitile: Locator;
    readonly copyright: Locator;
    readonly loginPage: Locator;

    constructor(private page: Page) {
        this.page = page;

        this.consentBtn = page.getByRole('button', { name: 'Consent' })
        this.mainTitile = page.getByRole('link', { name: 'Website for automation' })
        this.copyright = page.getByText('Copyright © 2021 All rights')

        this.loginPage = page.getByRole('link', { name: ' Signup / Login' })

    }

    /**
     * Opens home page
     * Validates some of the main page functions
     */
    async open(): Promise<void> {
        await this.page.goto('/');
        await this.consentBtn.click();
        await this.checkMainTitle();
        await this.checkCopyright();

    }

    // Actions
    async confirmAdvForm(): Promise<void> {
        await this.consentBtn.click();
    }

    // Assertions
    async checkMainTitle(): Promise<void> {
        await expect(this.mainTitile).toBeVisible();
    }

    async checkCopyright(): Promise<void> {
        await expect(this.copyright).toBeVisible();
    }

    /**
     * Opens Signup / Login page
     */
    async openLogin(): Promise<void> {
        await this.loginPage.click();
    }

}