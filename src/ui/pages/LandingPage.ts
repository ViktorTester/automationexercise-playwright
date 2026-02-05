import {expect, Locator, Page} from "@playwright/test";

/**
 * Landing page object
 */
export class LandingPage {
    readonly page: Page;
    readonly inputs: Locator;
    readonly mockExams: Locator;
    readonly mainTitle: Locator;

    constructor(private page: Page) {
        this.page = page;

        this.inputs = page.getByText('Web inputs');
        this.mockExams = page.getByText('Free ISTQB Mock Exams');
        this.mainTitle = page.getByLabel('SUT')

    }

    /**
     * Opens landing page
     */
    async open(): Promise<void> {
        await this.page.goto('/');
        await expect(this.mockExams).toBeVisible();
        await expect(this.mainTitle).toBeVisible();

    }

    /**
     * Opens 'Web inputs' page
     */
    async openWebInputs(): Promise<void> {
        await this.inputs.click();
    }

}