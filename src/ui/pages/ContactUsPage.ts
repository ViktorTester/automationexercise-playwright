import {expect, Locator, Page} from "@playwright/test";
import {contactCopy} from "@ui/copy/contactCopy";
import {BasePage} from "@pages/BasePage";

export class ContactUsPage extends BasePage {

    readonly formTitle: Locator;
    readonly nameInput: Locator;
    readonly emailInput: Locator;
    readonly messageInput: Locator;

    readonly fileUploadBtn: Locator;
    readonly submitBtn: Locator;
    readonly homeBtn: Locator;

    readonly successMessage: Locator;

    constructor(page: Page) {
        super(page)

        this.formTitle = page.getByRole('heading', { name: 'Get In Touch' });
        this.nameInput = page.getByTestId("name");
        this.emailInput = page.getByTestId("email");
        this.messageInput = page.getByTestId("message");

        this.fileUploadBtn = page.getByRole("button", { name: "Choose File"});
        this.submitBtn = page.getByTestId('submit-button');
        this.homeBtn = page.locator(".btn.btn-success");

        this.successMessage = page.locator(".status.alert.alert-success");

    }

    // Actions
    async fillTheForm(name: string, email: string, message: string): Promise<void> {
        await this.nameInput.fill(name);
        await this.emailInput.fill(email);
        await this.messageInput.fill(message);
    }

    async uploadFile(filePath: string, expectedValue: RegExp): Promise<void> {
        await this.fileUploadBtn.setInputFiles(filePath);
        expect(this.fileUploadBtn).toHaveValue(expectedValue);
    }

    async clockHomeBtn(): Promise<void> {
        await this.homeBtn.click();
        await Promise.race([
            this.expectUrl(/\/$/),
            this.expectUrl(/\/contact_us#google_vignette$/)
        ]);
    }

    async submitTheForm(page: Page): Promise<void> {
        // Very bad practice, don't do this in real projects
        await page.waitForTimeout(3000);
        await this.submitBtn.click();
    }

    // Assertions
    async expectFormTitle(): Promise<void> {
        expect(this.formTitle).toBeVisible();
    }

    async expectSuccessMessage(): Promise<void> {
        expect(this.successMessage).toHaveText(contactCopy.successMessage);
    }

}