import {Locator, Page} from "@playwright/test";

/**
 * Shared component for the Consent Modal flow.
 */
export class ConsentModal {

    readonly consentBtn: Locator;

    constructor(private page: Page) {
        this.page = page;
        this.consentBtn = page.getByRole('button', {name: 'Consent'});
    }

    async closeConsentIfPresent(): Promise<void> {
        if (await this.consentBtn.isVisible({ timeout: 2000 })) {
            await this.consentBtn.click();
        }
    }
}

