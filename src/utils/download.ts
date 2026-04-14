import {expect, type Download, type Page} from '@playwright/test';

type HasPage = {
    page: Page;
};

type DownloadOptions = {
    fileName?: RegExp;
};

export async function waitForDownload(
    context: HasPage,
    trigger: () => Promise<void>,
    options?: DownloadOptions
): Promise<Download> {
    const [download] = await Promise.all([
        context.page.waitForEvent('download'),
        trigger(),
    ]);

    if (options?.fileName) {
        expect(download.suggestedFilename()).toMatch(options.fileName);
    }

    const path = await download.path();
    expect(path).toBeTruthy();

    return download;
}