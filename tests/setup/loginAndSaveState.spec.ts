import test from '@playwright/test';
import HomePage from "../../pom/pages/HomePage";
import SignInForm from "../../pom/forms/SignInForm";
import { usersList } from "../../test-data/users";
import GaragePage from "../../pom/pages/GaragePage";

let homePage: HomePage;
let signInForm: SignInForm;
let garagePage: GaragePage;

test.describe('Login to users and save states', ()=>{

    test.beforeEach((async ({page}) =>{
        homePage = new HomePage(page);
        signInForm = new SignInForm(page);
        garagePage = new GaragePage(page);

        await homePage.open();
        await homePage.openSignInForm();
    }))

    test('Successful sign in', async ({page})=>{
        await signInForm.loginWithCredentials(usersList.mainUser.userEmail, usersList.mainUser.userPassword)
        await garagePage.verifyPageIsOpen();
        await page.context().storageState({path: 'test-data/states/mainUserState.json'});

    })
})