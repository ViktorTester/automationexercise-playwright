import {test} from "@fixtures/pages";

test.describe('Page scroller scenarios', () => {

    test.beforeEach(async ({home}) => {
        await home.open();
        await home.assertLoaded();
    });

    test('@smoke @regression Verify Scroll Up and Down functionality', async ({home}) => {

        await home.scrollToFooter();
        await home.verifySubsriptionVisible();

        // Press the scroller arrow and validate the title
        await home.pressArrowUpScroll();
        await home.checkMainPageCarouselTitle();

    })
});