import { Locator } from "@playwright/test";
import BasePage from "../BasePage";

export default class SignInForm extends BasePage {
    private readonly emailField: Locator = this.page.locator('//input[@id="signinEmail"]');
    private readonly passwordField: Locator = this.page.locator('//input[@id="signinPassword"]');
    private readonly loginButton: Locator = this.page.locator('//app-signin-modal//button[@class="btn btn-primary"]');

    async enterEmail(email: string) {
        await this.emailField.fill(email);
    }

    async enterPassword(password: string){
        await this.passwordField.fill(password);
    }

    async clickLoginButton() {
        await this.loginButton.click();
    }

    async loginWithCredentials(email: string, password: string) {
        await this.enterEmail(email);
        await this.enterPassword(password);
        await this.clickLoginButton();
    }
};