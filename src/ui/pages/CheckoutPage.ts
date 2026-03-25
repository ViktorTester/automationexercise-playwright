import {BasePage} from "@pages/BasePage";
import {expect, Locator, Page} from "@playwright/test";
import {ConsentModal} from "@pages/components/ConsentModal";
import {cardData as card} from "@testdata/payments/cardData";

/**
 * Checkout page object
 */
export class CheckoutPage extends BasePage {

    readonly consentModal: ConsentModal;
    readonly adressDetailstitle: Locator;
    readonly reviewOrderTitle: Locator;
    readonly commentField: Locator;
    readonly placeOrderBtn: Locator;

    readonly cardholderNameInput: Locator;
    readonly cardNumberInput: Locator;
    readonly cvcInput: Locator;
    readonly expiryMonthInput: Locator;
    readonly expiryYearInput: Locator;
    readonly confirmOrderBtn: Locator;
    readonly orderPlacedTitle: Locator;

    constructor(page: Page) {
        super(page);

        this.consentModal = new ConsentModal(page);

        this.adressDetailstitle = page.getByRole('heading', {name: 'Address Details'});
        this.reviewOrderTitle = page.getByRole('heading', {name: 'Review Your Order'});
        this.commentField = page.locator('textarea[name="message"]');
        this.placeOrderBtn = page.getByRole('link', {name: 'Place Order'});

        this.cardholderNameInput = page.getByTestId('name-on-card');
        this.cardNumberInput = page.getByTestId('card-number');
        this.cvcInput = page.getByTestId('cvc');
        this.expiryMonthInput = page.getByTestId('expiry-month');
        this.expiryYearInput = page.getByTestId('expiry-year');
        this.confirmOrderBtn = page.getByTestId('pay-button');
        this.orderPlacedTitle = page.getByText('Order Placed!');
    }

    async checkHeadings(): Promise<void> {
        await expect(this.adressDetailstitle).toBeVisible();
        await expect(this.reviewOrderTitle).toBeVisible();
    }

    async enterComment(comment: string): Promise<void> {
        await this.commentField.fill(comment);
        await expect(this.commentField).toHaveValue(comment);
    }

    async clickPlaceOrder(): Promise<void> {
        await this.placeOrderBtn.click();
        await this.consentModal.closePopupsIfPresent();
    }

    async enterPaymentDetails(): Promise<void> {
        await this.cardholderNameInput.fill(card.name);
        await this.cardNumberInput.fill(card.number);
        await this.cvcInput.fill(card.cvv);
        await this.expiryMonthInput.fill(card.expiryMonth);
        await this.expiryYearInput.fill(card.expiryYear);
    }

    async clickConfirmOrder(): Promise<void> {
        await this.confirmOrderBtn.click();
        await expect(this.orderPlacedTitle).toBeVisible();
    }
}
