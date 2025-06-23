import { Locator, Page } from "@playwright/test";
import BasePage from "../BasePage";


export default class HomePage extends BasePage {
    private readonly signUpButton: Locator = this.page.getByRole('button', { name: 'Sign up' });

    async open() {
        await this.page.goto('/');
    }

    async openSignUpForm() {
        await this.signUpButton.click();
    }
}