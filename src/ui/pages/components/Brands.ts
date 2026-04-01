import {Locator, Page} from "@playwright/test";
import {Brand} from "@constants/brands";
import {BasePage} from "@pages/BasePage";

export class BrandsSection extends BasePage{

    constructor(page: Page) {
        super(page)
    }

    private brandTitle(brandName: string): Locator {
        return this.page.getByRole("link", {name: brandName});
    }

    async selectBrand(brand: Brand): Promise<void> {
        await this.brandTitle(brand.label).click();
        await this.expectUrl('/brand_products/' + brand.path);
    }

}