import { Locator} from "@playwright/test";
import BasePage from "../BasePage";


export default class HomePage extends BasePage {
    private readonly signUpButton: Locator = this.page.getByRole('button', { name: 'Sign up' });
    private readonly signInButton: Locator = this.page.locator('//button[contains(@class,"header_signin")]');


    async open() {
        await this.page.goto('/');
    }

    async openSignUpForm() {
        await this.signUpButton.click();
    }

    async openSignInForm() {
        await this.signInButton.click();
    }
}