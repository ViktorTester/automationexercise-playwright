import {expect, Locator, Page} from "@playwright/test";
import {HomePage} from "./HomePage";
import {LoginCopy} from "../copy/login.copy";

/**
 * Login / Signup page object
 */
export class LoginPage {
    readonly loginText: Locator;
    readonly signupText: Locator;
    readonly signupName: Locator;
    readonly signupEmail: Locator;
    readonly signupBtn: Locator;

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

    }


    // Actions
    async inputName(name: string): Promise<string> {
        await this.signupName.fill(name)
    }

    async inputEmail(email: string): Promise<string> {
        await this.signupEmail.fill(email)
    }

    async pressSignupBtn(): Promise<void> {
        await this.signupBtn.click();
    }


    // Assertions
    async checkLoginText(): Promise<void> {
        await expect (this.loginText).toHaveText(LoginCopy.loginText);
    }

    async checkSignupText(): Promise<void> {
        await expect (this.signupText).toHaveText(LoginCopy.signupText);
    }

}