import {Locator, Page} from "@playwright/test";
import {Category} from "@constants/categories";
import {BasePage} from "@pages/BasePage";

export class CategoriesSection extends BasePage{

    constructor(page: Page) {
        super(page)
    }

    private groupToggle(categoryGroup: string): Locator {
        return this.page.getByRole("link", {name: categoryGroup});
    }

    private categoryLink(categoryName: string): Locator {
        return this.page.getByRole("link", {name: categoryName});
    }

    async selectCategory(category: Category): Promise<void> {
        await this.groupToggle(category.group).click();
        await this.categoryLink(category.name).click();
        await this.expectUrl('/category_products/' + category.id);
    }

}