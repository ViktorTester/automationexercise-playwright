export type ApiAssertMatcherKind =
    | 'is_not_empty_list'
    | 'is_not_empty_object'
    | 'is_empty_object'
    | 'is_empty_list'
    | 'is_null'
    | 'is_not_null'
    | 'equals_or_greater'
    | 'equals_or_less';

export type ApiAssertMatcher = Readonly<{
    __apiMatcher: true;
    kind: ApiAssertMatcherKind;
    value?: number;
}>;

const matcher = (kind: ApiAssertMatcherKind, value?: number): ApiAssertMatcher =>
    Object.freeze({__apiMatcher: true, kind, ...(value !== undefined ? {value} : {})});

export const IsNotEmptyList = matcher('is_not_empty_list');
export const IsNotEmptyObject = matcher('is_not_empty_object');
export const IsEmptyObject = matcher('is_empty_object');
export const IsEmptyList = matcher('is_empty_list');
export const IsNull = matcher('is_null');
export const IsNotNull = matcher('is_not_null');
export const EqualsOrGreater = (value: number): ApiAssertMatcher => matcher('equals_or_greater', value);
export const EqualsOrLess = (value: number): ApiAssertMatcher => matcher('equals_or_less', value);

export function isApiAssertMatcher(value: unknown): value is ApiAssertMatcher {
    return Boolean(
        value &&
        typeof value === 'object' &&
        '__apiMatcher' in value &&
        (value as {__apiMatcher?: unknown}).__apiMatcher === true &&
        'kind' in value
    );
}
