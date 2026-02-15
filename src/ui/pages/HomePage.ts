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
    readonly logoutBtn: Locator;

    constructor(page: Page) {
        super(page);

        this.continueSection = new ContinueSection(page);

        this.consentBtn = page.getByRole('button', {name: 'Consent'})
        this.mainTitile = page.getByRole('link', {name: 'Website for automation'})
        this.copyright = page.getByText('Copyright © 2021 All rights')
        this.loginPage = page.getByRole('link', {name: ' Signup / Login'})

        this.accountDeletedTitle = page.getByText(LoginCopy.accDeletedTitle);
        this.accountDeletedText1 = page.getByText(LoginCopy.accDeletedText1);
        this.accountDeletedText2 = page.getByText(LoginCopy.accDeletedText2);

        this.deleteAccBtn = page.getByRole('link', { name: ' Delete Account' })
        this.logoutBtn = page.getByRole('link', { name: ' Logout' })

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
    async openSignup(): Promise<void> {
        await this.loginPage.click();
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
    // Validate 'account deleted' page titles
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

}
