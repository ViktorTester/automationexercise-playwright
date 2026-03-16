export const customResponseMessages = {
    SEARCH_PRODUCT_MISSING: {
        message: 'Bad request, search_product parameter is missing in POST request.'
    },

    LOGIN_CREDENTIALS_MISSING: {
        message: 'Bad request, email or password parameter is missing in POST request.'
    },

    USER_EXISTS: {
        message: 'User exists!'
    },

    USER_NOT_FOUND: {
        message: 'User not found!'
    },

    USER_CREATED: {
        message: 'User created!'
    },

    USER_DELETED: {
        message: 'Account deleted!'
    }

} as const;
