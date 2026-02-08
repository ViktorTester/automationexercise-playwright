import {expect, Locator, Page} from "@playwright/test";
import {HomePage} from "./HomePage";
import {LoginCopy} from "../copy/login.copy";
import {Title} from "@app-types/SignupTypes/Title";
import {InputField} from "@app-types/SignupTypes/InputField";

/**
 * Login / Signup page object
 */
export class SignupPage {

    readonly loginText: Locator;
    readonly signupText: Locator;
    readonly signupName: Locator;
    readonly signupEmail: Locator;
    readonly signupBtn: Locator;

    readonly accountInfoText: Locator;
    readonly addressInfotext: Locator;
    readonly streetInfoText: Locator;

    private readonly title: Record<Title, Locator>;
    private readonly input: Record<InputField, Locator>;

    constructor(
        private page: Page,
        private home: HomePage
    ) {
        this.page = page;

        this.loginText = page.locator(".login-form > h2");
        this.signupText = page.locator(".signup-form > h2");
        this.signupName = page.getByTestId('signup-name');
        this.signupEmail = page.getByTestId('signup-email');
        this.signupBtn = page.getByTestId('signup-button');

        this.accountInfoText = page.getByText(LoginCopy.accountInfo);
        this.addressInfotext = page.getByText(LoginCopy.addressInfo);
        this.streetInfoText = page.getByText(LoginCopy.streetInfo);

        this.title = {
            [Title.Mr]: page.getByTestId('#id_gender1')
        };
        this.input = {
            [InputField.Name]: page.getByTestId('name'),
            [InputField.Email]: page.getByTestId('email'),
            [InputField.Password]: page.getByTestId('password'),
            [InputField.FirstName]: page.getByTestId('first_name'),
            [InputField.LastName]: page.getByTestId('last_name'),
            [InputField.Company]: page.getByTestId('company'),
            [InputField.Address1]: page.getByTestId('address1'),
            [InputField.Address2]: page.getByTestId('address2'),
            [InputField.Country]: page.getByTestId('country'),
            [InputField.State]: page.getByTestId('state'),
            [InputField.City]: page.getByTestId('city'),
            [InputField.ZipCode]: page.getByTestId('zipcode'),
            [InputField.MobileNr]: page.getByTestId('mobile_number')

        };

    }

    // Actions
    async inputName(name: string): Promise<void> {
        await this.signupName.fill(name)
    }

    async inputEmail(email: string): Promise<void> {
        await this.signupEmail.fill(email)
    }

    async pressSignupBtn(): Promise<void> {
        await this.signupBtn.click();
    }

    // to make checbox mapping
    async chooseTitle(title: Title): Promise<void> {
        const locator = this.title[title];
        await locator.check();
        await this.isChecked(locator);
    }

    async fillTheInput(input: InputField, value: string): Promise<void> {
        const locator = this.input[input];
        await locator.fill(value);
        await this.isValueFilled(locator, value);
    }

    // Assertions
    async checkLoginText(): Promise<void> {
        await expect(this.loginText).toHaveText(LoginCopy.login);
    }

    async checkSignupText(): Promise<void> {
        await expect(this.signupText).toHaveText(LoginCopy.signup);
    }

    async checkAccountInfoTitle(): Promise<void> {
        await expect(this.accountInfoText).toBeVisible();
    }

    async checkAddressInfoTitle(): Promise<void> {
        await expect(this.addressInfotext).toBeVisible();
    }

    async checkStreetInfoTitle(): Promise<void> {
        await expect(this.accountInfoText).toBeVisible();
    }

    async isChecked(title: Locator): Promise<void> {
        await expect(title.isChecked());
    }

    async isNamePrefilled(value: string): Promise<void> {
        await expect(this.input.Name).toHaveValue(value);
    }

    async isEmailPrefilled(value: string): Promise<void> {
        await expect(this.input.Email).toHaveValue(value);
    }

    async isValueFilled(input: Locator, value: string): Promise<void> {
        await expect(input).toHaveValue(value)
    }
}