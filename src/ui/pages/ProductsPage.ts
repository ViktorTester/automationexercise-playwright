import {expect, Locator, Page} from "@playwright/test";
import {BasePage} from "@pages/BasePage";
import {productsCopy as text} from "@ui/copy/productsCopy";

export class ProductsPage extends BasePage {

    readonly centerTitle: Locator;
    readonly saleBanner: Locator;
    readonly singleProduct: Locator;
    readonly firstProduct: Locator;

    readonly productName: Locator;
    readonly productCategory: Locator;
    readonly productPrice: Locator;
    readonly productAvailability: Locator;
    readonly productCondition: Locator;
    readonly productBrand: Locator;

    readonly searchInput: Locator;
    readonly searchBtn: Locator;
    readonly searchedProductsTitle: Locator
    readonly searchedProductCount: Locator;
    readonly searchResults: Locator;

    constructor(page: Page) {
        super(page);

        this.centerTitle = page.getByRole('heading', {name: 'All Products'});
        this.saleBanner = page.locator('#sale_image');
        this.singleProduct = page.getByRole('img', {name: 'ecommerce website products'});
        this.firstProduct = page.getByRole('link', {name: ' View Product'}).first();

        this.productName = page.getByRole('heading', { name: 'Blue Top' });
        this.productCategory = page.getByText('Category: Women > Tops');
        this.productPrice = page.getByText('Rs. 500');
        this.productAvailability = page.getByText('Availability: In Stock');
        this.productCondition = page.getByText('Condition: New');
        this.productBrand = page.getByText('Brand: Polo');

        this.searchInput = page.locator('#search_product');
        this.searchBtn = page.locator('#submit_search');
        this.searchedProductsTitle = page.locator('.title.text-center');

        this.searchedProductCount = page.locator('.features_items .col-sm-4');
        this.searchResults = page.locator('.productinfo.text-center > p')

    }

    async checkAllProductsSelected(): Promise<void> {
        await this.expectUrl('/products');
    }

    async expectedSections(): Promise<void> {
        await expect(this.centerTitle).toBeVisible();
        await expect(this.saleBanner).toBeVisible();
    }

    async allProductsPresent(count: number): Promise<void> {
        await expect(this.singleProduct).toHaveCount(count);
    }

    async productIsVisible(): Promise<void> {
        await expect(this.singleProduct.first()).toBeVisible();
    }

    async clickFirstProduct(): Promise<void> {
        await this.firstProduct.click();
        await this.expectUrl('/product_details/1');
    }

    async checkProductInfo(): Promise<void> {
        await expect(this.productName).toBeVisible();
        await expect(this.productCategory).toBeVisible();
        await expect(this.productPrice).toBeVisible();
        await expect(this.productAvailability).toBeVisible();
        await expect(this.productCondition).toBeVisible();
        await expect(this.productBrand).toBeVisible();
    }

    async searchForProduct(productName: string): Promise<void> {
        await this.searchInput.fill(productName);
        await this.searchBtn.click();
    }

    async searchedProductsTitlePresent(): Promise<void> {
        await expect(this.searchedProductsTitle).toHaveText(text.searchedProductsTitle);
    }

    async checkProductsCount(count: number) {
        await expect(this.searchedProductCount).toHaveCount(count);
    }

    async checkSearchOutput(productName: RegExp) {
        await expect(this.searchResults).toContainText(productName);
    }
}