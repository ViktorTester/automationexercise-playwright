import {Locator, Page} from "@playwright/test";
import {Category} from "@constants/categories";
import {BasePage} from "@pages/BasePage";

export class CategoriesSection extends BasePage{

    constructor(page: Page) {
        super(page)
    }


    private groupToggle(CategoryGroup: string): Locator {
        return this.page.getByRole("link", {name: CategoryGroup});
    }

    private categoryLink(CategoryName: string): Locator {
        return this.page.getByRole("link", {name: CategoryName});
    }

    async selectCategory(category: Category): Promise<void> {
        await this.groupToggle(category.group).click();
        await this.categoryLink(category.name).click();
        await this.expectUrl('/category_products/' + category.id);
    }

}