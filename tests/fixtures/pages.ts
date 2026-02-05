import {LandingPage} from "../../src/ui/pages/LandingPage";
import {InputsPage} from "../../src/ui/pages/InputsPage";
import { test as base, expect } from '@playwright/test'
/**
 * Page Object fixtures
 *
 * Fixtures provide ready-to-use Page Object instances
 * and must not contain assertions or test logic
 *
 */

type PagesFixtures = {
    landing: LandingPage;
    inputs: InputsPage;
}

export const test = base.extend<PagesFixtures>(  {
    landing: async ({ page }, use) => {
        await use(new LandingPage(page));
    },

    inputs: async ({ page }, use) => {
        await use(new InputsPage(page))
    }
})


export {expect}