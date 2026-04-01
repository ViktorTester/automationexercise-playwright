import {test} from '@fixtures/pages';
import {IsNotEmptyList, verifyApiResponse} from "@asserts";
import {commonResponses as common} from "@constants/commonResponses";

test.describe('GET/api/brandsList tests', () => {
    test('@smoke @regression [GET/api/brandsList] Should return all brands.ts list', async ({api}) => {

        const response = await api
            .brands().brandsList('GET');

        verifyApiResponse(response, 200, [
            {path: 'brands', expected: IsNotEmptyList},
            {path: 'brands.ts.0.id', expected: 1},
            {path: 'brands.ts.0.brand', expected: 'Polo'},
        ]);

    })

    test('@regression [GET/api/brandsList] Should validate unsupported method', async ({api}) => {

        const response = await api
            .brands().brandsList('POST');

        verifyApiResponse(response, 200, [
            {path: 'responseCode', expected: common.METHOD_NOT_SUPPORTED.code},
            {path: 'message', expected: common.METHOD_NOT_SUPPORTED.message}
        ]);

    })

})
