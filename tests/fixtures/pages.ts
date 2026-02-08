import {test as base, expect, type Page} from '@playwright/test'
import {HomePage} from "../../src/ui/pages/HomePage";
import {InputsPage} from "../../src/ui/pages/InputsPage";
import {loadEnvConfig} from "../../src/utils/envLoader";
import type {EnvConfig} from '../../src/types/EnvConfig';
import {LoginPage} from "../../src/ui/pages/LoginPage";

/**
 * Page Object fixtures
 *
 * Fixtures provide ready-to-use Page Object instances
 * and must not contain assertions or test logic
 *
 */
type WorkerFixtures = {
    config: EnvConfig;
};

type PagesFixtures = {
    page: Page
    home: HomePage
    login: LoginPage
}

export const test = base.extend<PagesFixtures, WorkerFixtures>({

    /**
     * Worker-scoped fixture
     * {scope: 'worker'}:
     * “Load the configuration once for a group of tests
     * executed within a single process, and reuse it across those tests.”
     *
     * env config is loaded once per worker
     */
    config: [
        async ({}, use) => {
            const cfg = loadEnvConfig();
            await use(cfg);
        },
        { scope: 'worker' },
    ],

    // Page with baseURL applied
    page: async ({browser, config}, use) => {
        const context = await browser.newContext({
            baseURL: config.baseUrl,
        });

        const page = await context.newPage();
        await use(page);
        await context.close();
    },

    home: async ({page}, use) => {
        await use(new HomePage(page));
    },

    login: async ({page}, use) => {
        await use(new LoginPage(page));
    }
})

export {expect}