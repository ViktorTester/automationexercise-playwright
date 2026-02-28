export type ApiError = Readonly<{
    code: number;
    message: string;
}>;

export const METHOD_NOT_SUPPORTED: ApiError = {
    code: 405,
    message: 'This request method is not supported.'
} as const;

export const BAD_REQUEST: ApiError = {
    code: 400,
    message: 'Bad request.'
}

