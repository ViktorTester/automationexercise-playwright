import {expect, Locator, Page} from "@playwright/test";
import {BasePage} from "@pages/BasePage";
import {productsCopy as text} from "@ui/copy/productsCopy";
import {Brand} from "@constants/brands";
import {BrandsSection} from "@pages/components/Brands";

export class ProductsPage extends BasePage {

    readonly brands: BrandsSection;

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

    readonly productQty: Locator;
    readonly addToCartBtn: Locator;

    readonly womenDressCategoryTitle: Locator;
    readonly productNames: Locator;

    constructor(page: Page) {
        super(page);

        this.centerTitle = page.getByRole('heading', {name: 'All Products'});
        this.saleBanner = page.locator('#sale_image');
        this.singleProduct = page.getByRole('img', {name: 'ecommerce website products'});
        this.firstProduct = page.getByRole('link', {name: ' View Product'}).first();

        this.productName = page.getByRole('heading', {name: 'Blue Top'});
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

        this.productQty = page.locator('#quantity');
        this.addToCartBtn = page.getByRole('button', {name: ' Add to cart'});

        this.womenDressCategoryTitle = page.getByRole('heading', {name: text.womenDressCategoryTitle})

        this.brands = new BrandsSection(page);
        this.productNames = page.locator('.single-products > div > p');

    }

    // Actions
    async searchForProduct(productName: string): Promise<void> {
        await this.searchInput.fill(productName);
        await this.searchBtn.click();
    }

    async clickFirstProduct(): Promise<void> {
        await this.firstProduct.click();
        await this.expectUrl('/product_details/1');
    }

    async increaseProductQtyTo(qty: string): Promise<void> {
        await this.productQty.fill(qty);
        await expect(this.productQty).toHaveValue(qty);
    }

    async addProductToCart(): Promise<void> {
        await this.addToCartBtn.click();
    }

    async selectBrand(brand: Brand): Promise<void> {
        await this.brands.selectBrand(brand)
    }

    // Assertions
    async checkProductInfo(): Promise<void> {
        await expect(this.productName).toBeVisible();
        await expect(this.productCategory).toBeVisible();
        await expect(this.productPrice).toBeVisible();
        await expect(this.productAvailability).toBeVisible();
        await expect(this.productCondition).toBeVisible();
        await expect(this.productBrand).toBeVisible();
    }

    async searchedProductsTitlePresent(): Promise<void> {
        await expect(this.searchedProductsTitle).toHaveText(text.searchedProductsTitle);
    }

    async checkProductsCount(count: number): Promise<void> {
        await expect(this.searchedProductCount).toHaveCount(count);
    }

    async checkSearchOutput(productName: RegExp): Promise<void> {
        await expect(this.searchResults).toContainText(productName);
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

    async checkFilterApplied(categoryId: string): Promise<void> {
        await this.expectUrl('/category_products/' + categoryId);
        await expect(this.womenDressCategoryTitle).toBeVisible();
    }

    async checkBrandsFiltering(expectedNames: string[]): Promise<void> {
        const actualNames = (await this.productNames.allTextContents());

        expect(actualNames.sort()).toEqual([...expectedNames].sort());
    }

}