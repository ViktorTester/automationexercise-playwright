import {expect, Locator, Page} from "@playwright/test";
import {LoginCopy} from "../copy/login.copy";
import {Title} from "@app-types/SignupTypes/Title";
import {InputField} from "@app-types/SignupTypes/InputField";
import {BasePage} from "@pages/BasePage";
import {SignupUser} from "@app-types/users/SignupUser";
import {SignupStart} from "@app-types/users/SignupUser";
import {ContinueSection} from "@pages/components/ContinueSection";

/**
 * Login / Signup page object
 */
export class SignupPage extends BasePage {

    readonly loginText: Locator;
    readonly signupText: Locator;

    // Signup form elements
    readonly signupName: Locator;
    readonly signupEmail: Locator;
    readonly signupBtn: Locator;

    // Login form elements
    readonly loginEmail: Locator;
    readonly loginPassword: Locator;
    readonly loginBtn: Locator;

    readonly accountInfoText: Locator;
    readonly addressInfotext: Locator;
    readonly streetInfoText: Locator;
    readonly accountCreatedTitle: Locator;
    readonly accountCreatedText1: Locator;
    readonly accountCreatedText2: Locator;

    readonly createAccountBtn: Locator;
    readonly continueSection: ContinueSection;

    private readonly title: Record<Title, Locator>;
    private readonly input: Record<InputField, Locator>;

    constructor(page: Page) {
        super(page);

        this.continueSection = new ContinueSection(page);

        this.loginText = page.locator(".login-form > h2");

        this.signupText = page.locator(".signup-form > h2");
        this.signupName = page.getByTestId('signup-name');
        this.signupEmail = page.getByTestId('signup-email');
        this.signupBtn = page.getByTestId('signup-button');

        this.loginEmail = page.getByTestId('login-email');
        this.loginPassword = page.getByTestId('login-password');
        this.loginBtn = page.getByTestId('login-button');

        this.accountInfoText = page.getByText(LoginCopy.accountInfo);
        this.addressInfotext = page.getByText(LoginCopy.addressInfo);
        this.streetInfoText = page.getByText(LoginCopy.streetInfo);
        this.accountCreatedTitle = page.getByText(LoginCopy.accountCreated);
        this.accountCreatedText1 = page.getByText(LoginCopy.accCreatedText1);
        this.accountCreatedText2 = page.getByText(LoginCopy.accCreatedText2);

        this.createAccountBtn = page.getByTestId('create-account')

        this.title = {
            [Title.Mr]: page.locator('#id_gender1')
        };

        this.input = {
            [InputField.Name]: page.getByTestId('name'),
            [InputField.Email]: page.getByTestId('email'),
            [InputField.Password]: page.getByTestId('password'),
            [InputField.FirstName]: page.getByTestId('first_name'),
            [InputField.LastName]: page.getByTestId('last_name'),
            [InputField.Company]: page.getByTestId('company'),
            [InputField.Address1]: page.getByTestId('address'),
            [InputField.Address2]: page.getByTestId('address2'),
            [InputField.Country]: page.getByTestId('country'),
            [InputField.State]: page.getByTestId('state'),
            [InputField.City]: page.getByTestId('city'),
            [InputField.ZipCode]: page.getByTestId('zipcode'),
            [InputField.MobileNr]: page.getByTestId('mobile_number')

        };

    }

    /**
     * Submits name and email on the signup form.
     */
    async startSignup(user: SignupStart): Promise<void> {
        await this.signupName.fill(user.firstName);
        await this.signupEmail.fill(user.email);
        await this.signupBtn.click();
    }

    /**
     * Fills out the main part of the form and clicks Create Account
     */
    async registerUser(user: SignupUser): Promise<void> {
        await this.chooseTitle(user.title);

        await this.fillTheInput(InputField.Password, user.password);
        await this.fillTheInput(InputField.FirstName, user.firstName);
        await this.fillTheInput(InputField.LastName, user.lastName);
        await this.fillTheInput(InputField.Company, user.company);
        await this.fillTheInput(InputField.Address1, user.address1);
        await this.fillTheInput(InputField.Address2, user.address2);

        await this.chooseCountry(InputField.Country, user.country);

        await this.fillTheInput(InputField.State, user.state);
        await this.fillTheInput(InputField.City, user.city);
        await this.fillTheInput(InputField.ZipCode, user.zipCode);
        await this.fillTheInput(InputField.MobileNr, user.mobileNr);

        // Click the account creation button
        await this.createAccount();
    }

    /**
     * Submits email and password on the login form.
     */
    async startLogin(email: string, password: string): Promise<void> {
        await this.loginEmail.fill(email);
        await this.loginPassword.fill(password);
        await this.loginBtn.click();
    }

    // Actions
    async chooseCountry(input: InputField, country: string): Promise<void> {
        await this.input[input].selectOption(country)
    }

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

    async createAccount(): Promise<void> {
        await this.createAccountBtn.click();
        await this.checkAccountCreatedTitle();
    }

    async clickContinue(): Promise<void> {
        await this.continueSection.clickContinue();
        await this.expectUrl('/')

    }

    // Assertions
    async assertSignupLoaded(): Promise<void> {
        await this.checkLoginText();
        await this.checkSignupText();
    }

    async assertAccountInfoLoaded(): Promise<void> {
        await this.checkAccountInfoTitle();
        await this.checkAddressInfoTitle();
        await this.checkStreetInfoTitle();
    }

    async assertSignupPrefilled(user: SignupStart): Promise<void> {
        await this.isNamePrefilled(user.firstName);
        await this.isEmailPrefilled(user.email);
    }

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

    async checkAccountCreatedTitle(): Promise<void> {
        await expect(this.accountCreatedTitle).toBeVisible();
    }

    async checkAccountCreatedText1(): Promise<void> {
        await expect(this.accountCreatedText1).toBeVisible();
    }

    async checkAccountCreatedText2(): Promise<void> {
        await expect(this.accountCreatedText2).toBeVisible();
    }

    async checkStreetInfoTitle(): Promise<void> {
        await expect(this.streetInfoText).toBeVisible();
    }

    async isChecked(title: Locator): Promise<void> {
        await expect(title).toBeChecked();
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

    // Validate 'account created' page titles
    async expectAccountCreated(): Promise<void> {
        await this.checkAccountCreatedTitle();
        await this.checkAccountCreatedText1();
        await this.checkAccountCreatedText2();
    }


}
