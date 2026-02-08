import {test} from 'tests/fixtures/pages';
import {loadEnvConfig} from "../../src/utils/envLoader";
import {TestUsers} from "../../src/testdata/users/testUsers";
import {expect} from "@playwright/test";
import {Title} from "@app-types/SignupTypes/Title";
import {InputField} from "@app-types/SignupTypes/InputField";

const config = loadEnvConfig();

test.describe("Test Case 1: Register User", () => {
    test.beforeEach(async ({home}) => {
        await home.open();
        await home.openLogin();
    });

    test("@smoke Register and delete the user", async ({signup}) => {

        // Validate 'signup' page titles
        await signup.checkLoginText();
        await signup.checkSignupText();

        // Complete first step
        await signup.inputName(TestUsers.validUser.firstName);
        await signup.inputEmail(TestUsers.validUser.email);
        await signup.pressSignupBtn();

        // Validate 'account info' page titles
        await signup.checkAccountInfoTitle();
        await signup.checkAddressInfoTitle();
        await signup.checkStreetInfoTitle();

        // Validate prefilled inputs
        await signup.isNamePrefilled(TestUsers.validUser.name);
        await signup.isEmailPrefilled(TestUsers.validUser.email);

        // Continue filling the form
        await signup.chooseTitle(Title.Mr);
        await signup.fillTheInput(InputField.Password, TestUsers.validUser.password);
        await signup.fillTheInput(InputField.FirstName, TestUsers.validUser.firstName);
        await signup.fillTheInput(InputField.LastName, TestUsers.validUser.lastName);
        await signup.fillTheInput(InputField.Company, TestUsers.validUser.company);
        await signup.fillTheInput(InputField.Address1, TestUsers.validUser.address1);
        await signup.fillTheInput(InputField.Address2, TestUsers.validUser.address2);
        await signup.fillTheInput(InputField.Country, TestUsers.validUser.country);
        await signup.fillTheInput(InputField.State, TestUsers.validUser.state);
        await signup.fillTheInput(InputField.City, TestUsers.validUser.city);
        await signup.fillTheInput(InputField.ZipCode, TestUsers.validUser.zipCode);
        await signup.fillTheInput(InputField.MobileNr, TestUsers.validUser.mobileNr);

    });

    test('@smoke DELETE /deleteAccount - Should delete a user', async ({ request }) => {

        const baseURL = config.baseUrl + "/api";

        const formData = {
            email: TestUsers.validUser.email,
            password: TestUsers.validUser.password,
        };

        // 🔎 LOG REQUEST
        console.log('➡️ REQUEST');
        console.log('DELETE', `${baseURL}/deleteAccount`);
        console.log('Payload:', JSON.stringify(formData, null, 2));

        const response = await request.delete(`${baseURL}/deleteAccount`, {
            form: formData,
        });

        expect(response.status()).toBe(200);

        // LOG RESPONSE
        console.log('⬅️ RESPONSE BODY');
        console.log(JSON.stringify(response, null, 2));


    });

})
