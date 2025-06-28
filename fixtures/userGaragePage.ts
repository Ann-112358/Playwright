import {test as base} from '@playwright/test';
import GaragePage from '../pom/pages/GaragePage';

type PageFixtures = {
    garagePage: GaragePage;
}

export const test = base.extend<PageFixtures>({
    garagePage: async ({browser}, use) => {

        const context = await browser.newContext({
            storageState: 'test-data/states/mainUserState.json'
        });
        const page = await context.newPage();
        const garagePage = new GaragePage(page);
        
        await use(garagePage);
    }
});