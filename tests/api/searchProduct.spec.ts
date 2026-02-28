import {test} from 'tests/fixtures/pages';
import {IsNotEmptyList, IsNotEmptyObject, verifyApiResponse} from "../../src/api/asserts";
import {BAD_REQUEST, METHOD_NOT_SUPPORTED} from "../../src/constants/apiErrors";
import {BAD_REQUEST_CUSTOM} from "../../src/constants/customErrorMessages";

test.describe('POST/api/searchProduct tests' , () => {
    test('@smoke @regression [POST/api/searchProduct] Should return a specific product info', async ({api}) => {

        const response = await api
            .searchProduct().searchProduct('POST');

        verifyApiResponse(response, 200,
            [
                {path: 'products', expected: IsNotEmptyList},
                {path: 'products.0.id', expected: 1},
                {path: 'products.0.name', expected: 'Blue Top'},
                {path: 'products.0.price', expected: 'Rs. 500'},
                {path: 'products.0.category', expected: IsNotEmptyObject},
                {path: 'products.0.category.usertype', expected: IsNotEmptyObject},
            ]);

    })

    test('@regression [POST/api/searchProduct] Should validate wrong method', async ({api}) => {

        // Custom API realization (Not RESTful)
        // Status is always 200
        const response = await api
            .searchProduct().searchProduct('PUT')

        verifyApiResponse(response, 200,
            [
                {path: 'responseCode', expected: METHOD_NOT_SUPPORTED.code},
                {path: 'message', expected: METHOD_NOT_SUPPORTED.message}
            ]);
    })

    test('@regression [POST/api/searchProduct] Should validate empty "search_product" param ', async ({api}) => {

        const response = await api
            .searchProduct().emptyParam('POST');

        verifyApiResponse(response, 200,
            [
                {path: 'responseCode', expected: BAD_REQUEST.code},
                {path: 'message', expected: BAD_REQUEST_CUSTOM.message},
            ]);
    })
});