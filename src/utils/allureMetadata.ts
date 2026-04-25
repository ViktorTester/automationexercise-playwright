import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import type { FullConfig } from '@playwright/test';
import { loadEnvConfig } from './envLoader';

const allureResultsDir = path.resolve('artifacts/allure-results');

type ExecutorInfo = {
    name: string;
    type: string;
    buildName: string;
    reportName: string;
    buildOrder?: number;
    buildUrl?: string;
};

function readGitValue(args: string[]): string | undefined {
    try {
        return execFileSync('git', args, {encoding: 'utf8'}).trim() || undefined;
    } catch {
        return undefined;
    }
}

function sanitizePropertyValue(value: string): string {
    return value.replace(/\n/g, ' ').trim();
}

function resolveExecutorInfo(envName: string, brand: string): ExecutorInfo {
    if (process.env.GITHUB_ACTIONS === 'true') {
        const repository = process.env.GITHUB_REPOSITORY;
        const runId = process.env.GITHUB_RUN_ID;
        const runNumber = process.env.GITHUB_RUN_NUMBER;
        const serverUrl = process.env.GITHUB_SERVER_URL ?? 'https://github.com';
        const workflow = process.env.GITHUB_WORKFLOW ?? 'CI';
        const buildUrl =
            repository && runId ? `${serverUrl}/${repository}/actions/runs/${runId}` : undefined;

        return {
            name: 'GitHub Actions',
            type: 'github',
            buildName: `${workflow} #${runNumber ?? 'local'}`,
            reportName: `Allure Report (${brand}/${envName})`,
            ...(runNumber ? {buildOrder: Number(runNumber)} : {}),
            ...(buildUrl ? {buildUrl} : {}),
        };
    }

    return {
        name: 'Local machine',
        type: 'local',
        buildName: 'Local Playwright run',
        reportName: `Allure Report (${brand}/${envName})`,
    };
}

export async function writeAllureMetadata(config: FullConfig): Promise<void> {
    const envConfig = loadEnvConfig();
    const commitSha = process.env.GITHUB_SHA ?? readGitValue(['rev-parse', 'HEAD']);
    const branchName =
        process.env.GITHUB_REF_NAME ??
        readGitValue(['rev-parse', '--abbrev-ref', 'HEAD']);

    const environmentProperties = new Map<string, string>([
        ['brand', envConfig.brand],
        ['environment', envConfig.env],
        ['baseUrl', envConfig.baseUrl],
        ['apiBaseUrl', envConfig.apiBaseUrl],
        ['ci', process.env.CI === 'true' ? 'true' : 'false'],
        ['headless', process.env.PW_HEADLESS ? (process.env.PW_HEADLESS !== '0' ? 'true' : 'false') : 'true'],
        ['workers', process.env.PW_WORKERS?.trim() || 'auto'],
        ['projects', config.projects.map((project) => project.name).join(', ')],
        ['crossBrowser', process.env.CROSS_BROWSER === '1' ? 'true' : 'false'],
    ]);

    if (branchName) {
        environmentProperties.set('branch', branchName);
    }

    if (commitSha) {
        environmentProperties.set('commit', commitSha);
    }

    await mkdir(allureResultsDir, {recursive: true});

    const serializedEnvironment = Array.from(environmentProperties.entries())
        .map(([key, value]) => `${key}=${sanitizePropertyValue(value)}`)
        .join('\n');

    await writeFile(
        path.join(allureResultsDir, 'environment.properties'),
        `${serializedEnvironment}\n`,
        'utf8',
    );

    await writeFile(
        path.join(allureResultsDir, 'executor.json'),
        JSON.stringify(resolveExecutorInfo(envConfig.env, envConfig.brand), null, 2),
        'utf8',
    );
}
