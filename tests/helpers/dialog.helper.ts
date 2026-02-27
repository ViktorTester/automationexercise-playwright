import { Page } from '@playwright/test';

export type DialogAction = 'accept' | 'dismiss';

export async function handleNextDialog(
    page: Page,
    action: DialogAction = 'accept'
) {
    page.once('dialog', async dialog => {
        if (action === 'accept') {
            await dialog.accept();
        } else {
            await dialog.dismiss();
        }
    });
}