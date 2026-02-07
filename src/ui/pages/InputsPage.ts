import {expect, Locator, Page} from "@playwright/test";
import {InputsCopy} from "../copy/inputs.copy";
import {LandingPage} from "./LandingPage";
import {InputField} from "../../types/InputField";

/**
 * Inputs page object
 */
export class InputsPage {
    readonly title: Locator;
    readonly description: Locator;

    readonly displayInputsBtn: Locator;
    readonly clearInputsBtn: Locator;

    private readonly inputs: Record<InputField, Locator>;
    private readonly outputs: Record<InputField, Locator>;

    constructor(
        private page: Page,
        private landing: LandingPage
    ) {
        this.page = page;

        this.title = page.locator('nav[aria-label="breadcrumb mb-2"] + h1');
        this.description = page.locator('#core .row.mt-3 > p').first();

        this.displayInputsBtn = page.locator("#btn-display-inputs");
        this.clearInputsBtn = page.locator("#btn-clear-inputs");

        this.inputs = {
            [InputField.Number]: page.locator('#input-number'),
            [InputField.Text]: page.locator('#input-text'),
            [InputField.Password]: page.locator('#input-password'),
            [InputField.Date]: page.locator('#input-date'),
        };

        this.outputs = {
            [InputField.Number]: page.locator('#output-number'),
            [InputField.Text]: page.locator('#output-text'),
            [InputField.Password]: page.locator('#output-password'),
            [InputField.Date]: page.locator('#output-date'),
        };
    }

    async open(): Promise<void> {
        await this.landing.open();
        await this.landing.openWebInputs();
    }

    // Actions
    async inputValue(field: InputField, value: string): Promise<void> {

        // The input field is problematic, which is why
        // such complex logic for entering values was needed.
        await this.inputs[field].waitFor({state: 'visible'});
        await this.inputs[field].scrollIntoViewIfNeeded();
        await this.inputs[field].click({force: true});
        await this.inputs[field].fill(value);

        await expect(this.inputs[field]).toHaveValue(value);
    }

    async clickDisplayInputsBtn(): Promise<void> {
        await this.displayInputsBtn.click();
    }

    async clearAllInputs(): Promise<void> {
        await this.clearInputsBtn.click();
    }

    // Assertions
    async expectDescriptionIsVisible(): Promise<void> {
        await expect(this.description).toContainText(InputsCopy.description1);
        await expect(this.description).toContainText(InputsCopy.description2);
    }

    async expectMainTextIsVisible(): Promise<void> {
        await expect(this.title).toHaveText(InputsCopy.title);
    }

    async expectOutput(field: InputField, expected: string): Promise<void> {
        await expect(this.outputs[field]).toHaveText(expected);
    }

    async expectCleared(field: InputField): Promise<void> {
        await expect(this.inputs[field]).toHaveText('');
    }

    async inputEdgeValue(field: InputField, value: string): Promise<void> {
        await this.inputs[field].fill(value);
        await expect(this.inputs[field]).toHaveValue('');
    }

}
