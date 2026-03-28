import { Locator, Page } from '@playwright/test';

/**
 * Shared component for consent and ad popups.
 */
export class ConsentModal {
    private readonly page: Page;
    readonly consentBtn: Locator;
    readonly adFrames: Locator;

    constructor(page: Page) {
        this.page = page;
        this.consentBtn = page.getByRole('button', { name: 'Consent' });
        this.adFrames = page.locator('iframe[name^="aswift_"]');
    }

    async closePopupsIfPresent(): Promise<void> {
        await this.closeConsentIfPresent();
        await this.closeAdIfPresent();
    }

    async closeConsentIfPresent(): Promise<void> {
        const isConsentVisible = await this.consentBtn
            .isVisible({ timeout: 2000 })
            .catch(() => false);

        if (!isConsentVisible) return;

        await this.consentBtn.click().catch(() => {});
    }

    async closeAdIfPresent(): Promise<void> {
        const framesCount = await this.adFrames.count();

        for (let i = 0; i < framesCount; i++) {
            const frame = this.adFrames.nth(i).contentFrame();
            const closeAdBtn = frame.getByRole('button', { name: /close ad/i });

            const isVisible = await closeAdBtn
                .isVisible({ timeout: 1000 })
                .catch(() => false);

            if (!isVisible) continue;

            await closeAdBtn.click().catch(() => {});
            return;
        }
    }
}