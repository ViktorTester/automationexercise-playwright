import {test} from 'tests/fixtures/pages';
import {numberInputCases} from "../../src/testdata/inputs/numberInputData";
import {LoginPage} from "../../src/ui/pages/LoginPage";
import {loadEnvConfig} from "../../src/utils/envLoader";
import {loadTestData} from "../../src/utils/dataValidator";

// const config = loadEnvConfig();
// const data = loadTestData(config.env);

test.describe("Test Case 1: Register User", () => {
    test.beforeEach(async ({home}) => {
        await home.open();
        await home.openLogin();
    });

    // test.afterEach(async ({inputs}) => {
    //     await inputs.expectMainTextIsVisible();
    //     await inputs.expectDescriptionIsVisible();
    // })

    test("@smoke Register and delete the user", async ({login}) => {

        await login.checkLoginText();
        await login.checkSignupText();

        await login.inputName("test");
        await login.inputEmail("test@tedt.com");
        await login.pressSignupBtn();

    });

})
