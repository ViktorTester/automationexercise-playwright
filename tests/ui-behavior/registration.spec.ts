import {test} from 'tests/fixtures/pages';
import {loadEnvConfig} from "../../src/utils/envLoader";

const config = loadEnvConfig();

test.describe("Test Case 1: Register User", () => {
    test.beforeEach(async ({home}) => {
        await home.open();
        await home.openLogin();
    });

    test("@smoke Register and delete the user", async ({login}) => {

        await login.checkLoginText();
        await login.checkSignupText();

        await login.inputName(config.credentials.username);
        await login.inputEmail(config.credentials.email);
        await login.pressSignupBtn();

    });

})
