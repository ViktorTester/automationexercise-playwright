import { expect, type Page } from '@playwright/test';

export abstract class BasePage {
    protected constructor(
        protected readonly page: Page
    ) {}

    async expectUrl(expected: string | RegExp): Promise<void> {
        await expect(this.page).toHaveURL(expected);
    }

}
