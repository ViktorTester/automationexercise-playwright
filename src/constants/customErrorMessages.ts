export type ApiError = Readonly<{
    message: string;
}>;

export const BAD_REQUEST_CUSTOM: ApiError = {
    message: 'Bad request, search_product parameter is missing in POST request.'
} as const;

