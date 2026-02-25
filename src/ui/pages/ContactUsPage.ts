import {expect, Locator, Page} from "@playwright/test";

export class ContactUsPage {

    readonly formTitle: Locator;

    constructor(page: Page) {

        this.formTitle = page.getByRole('heading', { name: 'Get In Touch' });

    }

    // Assertions
    async expectFormTitle(): Promise<void> {
        expect(this.formTitle).toBeVisible();
    }
}