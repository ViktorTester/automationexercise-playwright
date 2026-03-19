import {test} from "@fixtures/pages";
import {TestUsers as user} from "@testdata/users/testUsers";
import {IsNotNull, verifyApiResponse} from "@asserts";

test.describe('Get User Detail tests', () => {
    test('@smoke @regression Get user detail by email', async ({api}) => {

        const response = await api
            .account()
            .getUserDetails(user.validUser.email);

        verifyApiResponse(response, 200, [
            {path: 'responseCode', expected: 200},
            {path: 'user.id', expected: IsNotNull},
            {path: 'user.email', expected: user.validUser.email},
            {path: 'user.title', expected: user.validUser.title},
            {path: 'user.first_name', expected: user.validUser.firstName},
            {path: 'user.last_name', expected: user.validUser.lastName},
            {path: 'user.company', expected: user.validUser.company},
            {path: 'user.address1', expected: user.validUser.address1},
            {path: 'user.address2', expected: user.validUser.address2},
            {path: 'user.country', expected: user.validUser.country},
            {path: 'user.state', expected: user.validUser.state},
            {path: 'user.city', expected: user.validUser.city},
            {path: 'user.zipcode', expected: user.validUser.zipCode}

        ]);

    })
});