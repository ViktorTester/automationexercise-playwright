import {test} from 'tests/fixtures/pages';
import {IsNotEmptyObject, verifyApiResponse} from "src/api/asserts";


test.describe('GET/api/productsList tests', () => {

    test('@smoke @regresssion [GET/api/productsList] Should return all products list', async ({api}) => {

        const response = await api
            .products().productsList('GET');

        verifyApiResponse(response, 200, [
            {path: 'products.0.id', expected: 1},
            {path: 'products.0.category', expected: IsNotEmptyObject},
        ]);

    })

    test('@regression [GET/api/productsList] Should validate wrong method', async ({api}) => {

        const response = await api
            .products().productsList('POST');

        verifyApiResponse(response, 200, [
            {path: 'responseCode', expected: 405},
            {path: 'message', expected: 'This request method is not supported.'}
        ]);

    })

})
