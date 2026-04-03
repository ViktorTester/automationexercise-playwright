import {expect, Locator, Page} from "@playwright/test";
import {ConsentModal} from "@pages/components/ConsentModal";

/**
 * Shared component for the Continue button flow.
 */
export class ContinuBtn {

    readonly continueBtn: Locator;
    readonly consentModal: ConsentModal;

    constructor(private page: Page) {
        this.page = page;
        this.consentModal = new ConsentModal(page);
        this.continueBtn = page.getByTestId('continue-button');
    }

    async clickContinue(expectedPath: string = '/'): Promise<void> {
        await this.continueBtn.click();
        await this.consentModal.closePopupsIfPresent();
        await expect(this.page).toHaveURL(expectedPath);
    }
}
