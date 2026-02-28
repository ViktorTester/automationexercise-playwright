/**
 * Central catalog of API paths.
 * baseUrl comes from config (env) and is injected into RequestClient.
 *
 * Keep endpoint paths relative (without leading "/") for safe URL resolution with apiBaseUrl.
 */
export const Endpoints = {

    Account: {
        DeleteAccount: 'deleteAccount',
    },

    Products: {
        ProductsList: 'productsList',
    },

    Brands: {
        BrandsList: 'brandsList'
    },

    SearchProduct: {
        SearchForProduct: 'searchProduct'
    },

    VerifyLogin: {
        VerifyLogin: 'verifyLogin'
    }

} as const;
