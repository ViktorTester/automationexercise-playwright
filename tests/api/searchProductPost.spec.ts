import {test} from 'tests/fixtures/pages';
import {IsNotEmptyList, IsNotEmptyObject, verifyApiResponse} from "../../src/api/asserts";
import {commonResponses as common} from "@constants/commonResponses";
import {customResponseMessages as custom} from "@constants/customResponseMessages";

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
                {path: 'responseCode', expected: common.METHOD_NOT_SUPPORTED.code},
                {path: 'message', expected: common.METHOD_NOT_SUPPORTED.message}
            ]);
    })

    test('@regression [POST/api/searchProduct] Should validate empty "search_product" param ', async ({api}) => {

        const response = await api
            .searchProduct().emptyParam('POST');

        verifyApiResponse(response, 200,
            [
                {path: 'responseCode', expected: common.BAD_REQUEST.code},
                {path: 'message', expected: custom.SEARCH_PRODUCT_MISSING.message},
            ]);
    })
});