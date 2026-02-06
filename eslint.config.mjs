import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import playwright from "eslint-plugin-playwright";

export default [
    // ignore artefacts
    {
        ignores: [
            "**/node_modules/**",
            "**/playwright-report/**",
            "**/test-results/**",
            "**/.playwright/**",
            "**/dist/**",
            "**/build/**"
        ],
    },

    // Base JS recommendations
    js.configs.recommended,

    // Base TS recommendations
    ...tseslint.configs.recommended,

    // Test file config
    {
        files: ["tests/**/*.{ts,js}", "e2e/**/*.{ts,js}", "**/*.{spec,test}.{ts,js}"],
        plugins: { playwright },
        languageOptions: {
            globals: {
                ...globals.node,
            },
        },
        rules: {
            // Allow (_, use) in fixtures
            "@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],
            // Allow empty destructuring ({}, use)
            "no-empty-pattern": "off",
            // Playwright best practices
            "playwright/no-focused-test": "error",          // Restrict test.only
            "playwright/no-skipped-test": "warn",           // test.skip warnings
            "playwright/no-wait-for-timeout": "warn",       // Restrict waitForTimeout
            "playwright/prefer-web-first-assertions": "warn"// Prefer toHave* assertions
        },
    },
];