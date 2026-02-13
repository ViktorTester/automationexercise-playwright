import { test as base } from '@playwright/test';
import { RequestClient } from '../../src/api/RequestClient';
import { AccountBlock } from '../../src/api/blocks/AccountBlock';
import {loadEnvConfig} from "@utils/envLoader";

type ApiFixtures = {
    account: AccountBlock;
};

/**
 * API Fixture
 *
 * Purpose:
 * - Centralized creation of API infrastructure
 * - Dependency injection for domain blocks
 * - Environment-based configuration
 *
 * Lifecycle:
 * - Created per test
 * - Isolated
 * - Reproducible
 *
 * What happens here:
 * 1. Create logger (enabled based on env/config)
 * 2. Create RequestClient (transport layer)
 * 3. Create domain blocks (AccountBlock.ts)
 * 4. Inject them into test context
 *
 * Test sees only:
 *   ({ account }) => {}
 */
export const test = base.extend<ApiFixtures>({
    account: async ({ request }, use) => {

        // Control logging via env variable
        // const logger = new ConsoleApiLogger(
        //     process.env.API_LOGS === 'true'
        // );

        const config = loadEnvConfig();

        const client = new RequestClient(
            request,
            config.apiBaseUrl,
            //logger
        );

        const accountBlock = new AccountBlock(client);

        await use(accountBlock);
    },
});

export { expect } from '@playwright/test';
