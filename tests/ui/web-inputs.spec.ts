import {test} from 'tests/fixtures/pages';

test.describe("web-inputs", () => {
    test.beforeEach(async ({landing}) => {
        await landing.open();
        await landing.openWebInputs();
    })

    test("@smoke @regression input number", async({inputs}) =>  {

        await inputs.expectTextsAreVisible();

    })
})
