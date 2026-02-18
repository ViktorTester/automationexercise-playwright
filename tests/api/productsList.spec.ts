import {test} from 'tests/fixtures/pages';
import {IsNotEmptyList, IsNotEmptyObject, verifyApiResponse} from "src/api/asserts";


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

    test('@smoke [GET/api/brandsList] Should return all brands list', async ({api}) => {

        const response = await api
            .brands().brandsList('GET');

        verifyApiResponse(response, 200, [
            {path: 'brands', expected: IsNotEmptyList},
            {path: 'brands.0.id', expected: 1},
            {path: 'brands.0.brand', expected: 'Polo'},
        ]);

    })

    test('@smoke [GET/api/brandsList] Should validate wrong method', async ({api}) => {

        const response = await api
            .brands().brandsList('POST');

        verifyApiResponse(response, 200, [
            {path: 'responseCode', expected: 405},
            {path: 'message', expected: 'This request method is not supported.'}
        ]);

    })

    test('@smoke [GET/api/brandsList] Should return a specific product info', async ({api}) => {

        const response = await api
            .products().searchProducts('POST')
            .withLogs();

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

})
