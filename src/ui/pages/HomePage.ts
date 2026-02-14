import {expect, Locator, Page} from "@playwright/test";
import {LoginCopy} from "@ui/copy/login.copy";
import {BasePage} from "@pages/BasePage";
import {ContinueSection} from "@pages/components/ContinueSection";

/**
 * Home page object
 */
export class HomePage extends BasePage {
    readonly consentBtn: Locator;
    readonly mainTitile: Locator;
    readonly copyright: Locator;
    readonly loginPage: Locator;

    readonly accountDeletedTitle: Locator;
    readonly accountDeletedText1: Locator;
    readonly accountDeletedText2: Locator;

    readonly continueSection: ContinueSection;
    readonly deleteAccBtn: Locator;

    constructor(page: Page) {
        super(page);

        this.consentBtn = page.getByRole('button', {name: 'Consent'})
        this.mainTitile = page.getByRole('link', {name: 'Website for automation'})
        this.copyright = page.getByText('Copyright © 2021 All rights')
        this.loginPage = page.getByRole('link', {name: ' Signup / Login'})

        this.accountDeletedTitle = page.getByText(LoginCopy.accDeletedTitle);
        this.accountDeletedText1 = page.getByText(LoginCopy.accDeletedText1);
        this.accountDeletedText2 = page.getByText(LoginCopy.accDeletedText2);

        this.deleteAccBtn = page.getByRole('link', { name: ' Delete Account' })
        this.continueSection = new ContinueSection(page);

    }

    /**
     * Opens home page
     */
    async open(): Promise<void> {
        await this.page.goto('/');
        await this.closeConsentIfPresent();
    }

    /**
     * Opens Signup / Login page
     */
    async openLogin(): Promise<void> {
        await this.loginPage.click();
    }

    /**
     * Deletes the account
     */
    async deleteAccount(): Promise<void> {
        await this.deleteAccBtn.click();
    }

    /**
     * Verifies that key home page elements are rendered.
     */
    async assertLoaded(): Promise<void> {
        await this.checkMainTitle();
        await this.checkCopyright();
    }

    // Actions
    async closeConsentIfPresent(): Promise<void> {
        if (await this.consentBtn.isVisible({ timeout: 2000 })) {
            await this.consentBtn.click();
        }
    }

    async clickContinue(): Promise<void> {
        await this.continueSection.clickContinue();
    }

    // Assertions
    async checkMainTitle(): Promise<void> {
        await expect(this.mainTitile).toBeVisible();
    }

    async checkCopyright(): Promise<void> {
        await expect(this.copyright).toBeVisible();
    }

    // Validate 'account deleted' page titles
    async expectAccountDeleted(): Promise<void> {
        await this.checkAccountDeletedTitle();
        await this.checkAccountDeletedText1();
        await this.checkAccountDeletedText2();
    }

    async checkAccountDeletedTitle(): Promise<void> {
        await expect(this.accountDeletedTitle).toBeVisible();
    }

    async checkAccountDeletedText1(): Promise<void> {
        await expect(this.accountDeletedText1).toBeVisible();
    }

    async checkAccountDeletedText2(): Promise<void> {
        await expect(this.accountDeletedText2).toBeVisible();
    }

}
