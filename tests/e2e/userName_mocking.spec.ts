import {test, expect } from "@playwright/test";
import HomePage from "../../pom/pages/HomePage";
import SignInForm from "../../pom/forms/SignInForm";
import { usersList } from "../../test-data/users";

let homePage: HomePage;
let signInForm: SignInForm;


test('Mock profile after login', async ({ page }) => {
    homePage = new HomePage(page);
    signInForm = new SignInForm(page);

    await homePage.open();
    await homePage.openSignInForm();
    await signInForm.loginWithCredentials(usersList.mainUser.userEmail, usersList.mainUser.userPassword)
    await page.waitForTimeout(5000);

    await page.route('**/users/profile', async route => {
        await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify({
                status: "ok",
                data: {
                    userId: 1,
                    photoFilename: "default-user.png",
                    name: "Stanislav",
                    lastName: "Taran"
                }
            })
        });
    });

    await page.goto('panel/profile');

    await expect(page.getByText('Stanislav Taran')).toBeVisible();
});