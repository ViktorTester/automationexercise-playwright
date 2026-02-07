import {test} from 'tests/fixtures/pages';
import {numberInputCases} from "../../src/testdata/inputs/numberInputData";
import {InputField} from "../../src/types/InputField";

test.describe("web-inputs", () => {
    test.beforeEach(async ({inputs}) => {
        await inputs.open();

    });

    test.afterEach(async ({inputs}) => {
        await inputs.expectMainTextIsVisible();
        await inputs.expectDescriptionIsVisible();
    })

    test("@smoke Input number", async ({inputs}) => {

        const testValue = "12345698";

        await inputs.inputValue(InputField.Number, testValue);
        await inputs.clickDisplayInputsBtn();
        await inputs.expectOutput(InputField.Number, testValue);

        await inputs.clearAllInputs();
        await inputs.expectCleared(InputField.Number);

    });

    for (const tc of numberInputCases) {
        test(`@regression Regression suite for "${InputField.Number}" input: "${tc.title}"`, async ({inputs}) => {

            await inputs.inputValue(InputField.Number, tc.value);
            await inputs.clickDisplayInputsBtn();
            await inputs.expectOutput(InputField.Number, tc.expectedValue);

            await inputs.clearAllInputs();
            await inputs.expectCleared(InputField.Number);

        });
    }

    test("@regression Very big number ", async ({inputs}) => {

        await inputs.inputEdgeValue(InputField.Number, '9'.repeat(309));
        await inputs.clickDisplayInputsBtn();
        await inputs.expectOutput(InputField.Number, '');

        await inputs.clearAllInputs();
        await inputs.expectCleared(InputField.Number);

    });
})
