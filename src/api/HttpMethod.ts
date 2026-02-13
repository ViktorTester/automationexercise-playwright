/**
 * Explicit HTTP method union.
 * Prevents passing random strings and keeps typing strict.
 */
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
