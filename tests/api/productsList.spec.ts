import {test} from 'tests/fixtures/pages';
import {IsNotEmptyObject, verifyApiResponse} from "src/api/asserts";

test.describe('GET/api/productsList tests', () => {

    test('@smoke @regresssion [GET/api/productsList] should return all product list', async ({api}) => {

        const response = await api
            .products().productsList('GET').withLogs();

        verifyApiResponse(response, 200, [
            {path: 'products.0.id', expected: 1},
            {path: 'products.0.category', expected: IsNotEmptyObject},
        ]);

    })

})
