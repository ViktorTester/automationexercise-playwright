import type { FullConfig } from '@playwright/test';
import { writeAllureMetadata } from './allureMetadata';

async function globalSetup(config: FullConfig): Promise<void> {
    await writeAllureMetadata(config);
}

export default globalSetup;
