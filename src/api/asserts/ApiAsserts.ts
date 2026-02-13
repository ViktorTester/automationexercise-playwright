import {expect} from '@playwright/test';
import type {ApiCallResponse} from '../RequestClient';

/**
 * Defines a single response body validation rule.
 *
 * Each rule verifies that a specific field (defined by `path`)
 * matches the expected value or regular expression.
 *
 * Examples:
 *  { path: 'success', expected: true }
 *  { path: 'message', expected: 'Account deleted!' }
 *  { path: 'data.id', expected: /^\d+$/ }
 */
export type BodyAssert = {
    path: string;
    expected: unknown | RegExp;
    message?: string;
};


/**
 * Verifies HTTP status and (optionally) selected response body fields.
 *
 * Always validates HTTP status.
 * Body fields are validated only if `bodyAsserts` is provided.
 *
 * @param r - Captured API call response (status, method, url, body).
 * @param expectedStatus - Expected HTTP status code.
 * @param bodyAsserts - Optional list of body field validations.
 */
export function verifyApiResponse(
    r: ApiCallResponse,
    expectedStatus: number,
    bodyAsserts?: BodyAssert[]
): void {
    expect(r.status, `Unexpected HTTP status for ${r.method} ${r.url}`)
        .toBe(expectedStatus);

    // Body is validated ONLY if requested
    if (!bodyAsserts?.length) return;

    for (const a of bodyAsserts) {
        const actual = getByPath(r.body, a.path);
        const hint = a.message ?? `Unexpected body field "${a.path}" for ${r.method} ${r.url}`;

        if (a.expected instanceof RegExp) {
            expect(String(actual), hint).toMatch(a.expected);
        } else {
            expect(actual, hint).toEqual(a.expected);
        }
    }
}


/**
 * Resolves a nested value from an object using dot/bracket notation.
 *
 * Supports:
 *  - "field"
 *  - "data.id"
 *  - "items[0].name"
 *
 * Returns undefined if path does not exist.
 *
 * @param obj - Source object.
 * @param path - Property path.
 */
function getByPath(obj: unknown, path: string): unknown {
    if (!path) return obj;

    // supports: a.b, a[0].b, a.b[1]
    const tokens = path
        .replace(/\[(\d+)]/g, '.$1')
        .split('.')
        .filter(Boolean);

    let cur: unknown = obj;
    for (const t of tokens) {
        if (cur == null) return undefined;
        if (typeof cur !== 'object' && typeof cur !== 'function') return undefined;
        cur = (cur as Record<string, unknown>)[t];
    }
    return cur;
}
