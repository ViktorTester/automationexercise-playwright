import { expect } from '@playwright/test';
import Ajv, { type ErrorObject, type JSONSchemaType } from 'ajv';
import addFormats from 'ajv-formats';
import type { ApiCallResponse } from '../RequestClient';

/**
 * Shared AJV instance for schema validation.
 * - allErrors: collect all validation errors
 * - strict: enforce stricter schema rules
 */
const ajv = new Ajv({
    allErrors: true,
    strict: true,
});

// Enables format validations (e.g. email, uri, date-time)
addFormats(ajv);

/**
 * Validates API response body against the provided JSON schema.
 * Automatically includes HTTP method and URL in the error output.
 */
export function verifySchema<T>(
    r: ApiCallResponse,
    schema: JSONSchemaType<T> | Record<string, unknown>
): void {
    const validate = ajv.compile(schema);
    const isValid = validate(r.body);

    expect(
        isValid,
        formatSchemaErrors(validate.errors, `Schema mismatch for ${r.method} ${r.url}`)
    ).toBeTruthy();
}

/**
 * Formats AJV validation errors into a readable message.
 * Includes JSON path and error description.
 */
function formatSchemaErrors(
    errors: ErrorObject[] | null | undefined,
    baseMessage: string
): string {
    if (!errors?.length) return baseMessage;

    const details = errors
        .map((e) => {
            const path = e.instancePath || '/';
            return `${path} ${e.message ?? 'schema validation error'}`;
        })
        .join('\n');

    return `${baseMessage}\n${details}`;
}