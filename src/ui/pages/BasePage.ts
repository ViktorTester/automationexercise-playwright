import {expect, type Page} from '@playwright/test';
import {ConsentModal} from "@pages/components/ConsentModal";

export abstract class BasePage {
    protected readonly page: Page;
    readonly consentModal: ConsentModal;

    protected constructor(page: Page) {
        this.page = page;
        this.consentModal = new ConsentModal(page);
    }

    async expectUrl(expected: string | RegExp): Promise<void> {
        try {
            await expect(this.page).toHaveURL(expected, {timeout: 5000});
        } catch {
            await this.consentModal.closePopupsIfPresent();
            await expect(this.page).toHaveURL(expected);
        }
    }
}

