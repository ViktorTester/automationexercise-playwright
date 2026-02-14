import {expect, Locator, Page} from "@playwright/test";

/**
 * Shared component for the Continue button flow.
 */
export class ContinueSection {

    readonly continueBtn: Locator;

    constructor(private page: Page) {
        this.page = page;
        this.continueBtn = page.getByTestId('continue-button');
    }

    async clickContinue(expectedPath: string = '/'): Promise<void> {
        await this.continueBtn.click();
        await expect(this.page).toHaveURL(expectedPath);
    }
}
