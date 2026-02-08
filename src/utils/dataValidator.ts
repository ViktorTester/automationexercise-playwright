import fs from 'fs';
import path from 'path';

type CredentialEnvRef = { username: string; email: string };

type EnvConfigLike = {
    env: string;
    // dataVersion: string;
    credentialEnv?: CredentialEnvRef;
};

/**
 * Loads versioned test data and optionally overlays credentials from environment variables.
 * This keeps secrets out of version control while allowing local defaults.
 */
export function loadTestData(env: string, version: string): any;
export function loadTestData(config: EnvConfigLike): any;
export function loadTestData(arg1: string | EnvConfigLike, arg2?: string) {
    const env = typeof arg1 === 'string' ? arg1 : arg1.env;
    const version = typeof arg1 === 'string' ? (arg2 as string) : arg1.dataVersion;

   // const dataPath = path.resolve(`data/${env}/${version}.json`);

    // if (!fs.existsSync(dataPath)) {
    //     throw new Error(`Test data ${version} for ${env} not found`);
    // }

    // const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

    // Overlay valid credentials from CI secrets (if provided).
    // The config holds only the env-var *names*; actual values come from runtime environment.
    const credentialEnv = typeof arg1 === 'string' ? undefined : arg1.credentialEnv;
    if (credentialEnv?.username && credentialEnv?.email) {
        const username = process.env[credentialEnv.username];
        const email = process.env[credentialEnv.email];

        if (username) data.users.valid.username = username;
        if (email) data.users.valid.email = email;
    }

    // return data;
}