import {test as base, expect} from '@playwright/test'
import {LandingPage} from "../../src/ui/pages/LandingPage";
import {InputsPage} from "../../src/ui/pages/InputsPage";
import {loadEnvConfig} from "../../src/utils/envLoader";
import type {EnvConfig} from '../../src/types/EnvConfig';

/**
 * Page Object fixtures
 *
 * Fixtures provide ready-to-use Page Object instances
 * and must not contain assertions or test logic
 *
 */

type PagesFixtures = {
    config: EnvConfig;
    landing: LandingPage;
    inputs: InputsPage;
}

export const test = base.extend<PagesFixtures>({

    /**
     * {scope: 'worker'}:
     * “Load the configuration once for a group of tests
     * executed within a single process, and reuse it across those tests.”
     *
     * env config is loaded once per worker
     */
    config: [
        async (_args, use) => {
            await use(loadEnvConfig());
        }, {scope: 'worker'}
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

    landing: async ({page}, use) => {
        await use(new LandingPage(page));
    },

    inputs: async ({page}, use) => {
        await use(new InputsPage(page))
    }
})

export {expect}