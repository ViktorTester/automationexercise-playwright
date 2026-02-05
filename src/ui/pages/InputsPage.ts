import {expect, Locator, Page} from "@playwright/test";
import {InputsCopy} from "../copy/inputs.copy";

/**
 * Inputs page object
 */
export class InputsPage {
    readonly title: Locator;
    readonly description: Locator;

    constructor(private page: Page) {
        this.page = page;

        this.title = page.locator('nav[aria-label="breadcrumb mb-2"] + h1');
        this.description = page.locator('#core .row.mt-3 > p').first();

    }

    async expectTextsAreVisible(): Promise<void> {
        await expect(this.title).toHaveText(InputsCopy.title);
        await expect(this.description).toContainText(InputsCopy.description1);
        await expect(this.description).toContainText(InputsCopy.description2);
    }

}
