import { expect, Locator } from "@playwright/test";
import BasePage from "../BasePage";

export default class SignUpForm extends BasePage {

    public readonly nameField: Locator = this.page.locator('input#signupName');
    public readonly lastNameField: Locator = this.page.locator('input#signupLastName');
    public readonly emailField: Locator = this.page.locator('input#signupEmail');
    public readonly passwordField: Locator = this.page.locator('input#signupPassword');
    public readonly repeatPasswordField: Locator = this.page.locator('input#signupRepeatPassword');
    public readonly invalidFeedback: Locator = this.page.locator('.invalid-feedback');
    public readonly registerButton: Locator = this.page.locator('div.modal-footer>button.btn-primary');
    public readonly successMessage: Locator = this.page.locator('div.alert-success');

    async enterData(data: string, field: Locator){
        await field.fill(data);
        await field.blur();
    }

    async confirmSignUp(){
        await this.registerButton.click();
    }

    async generateErrorByFocusAndBlur(field: Locator){
        await field.focus();
        await field.blur();
    }

    async signUpWithValidCredentials(name: string, lastName: string, email: string, password: string){
        await this.enterData(name, this.nameField);
        await this.enterData(lastName, this.lastNameField);
        await this.enterData(email, this.emailField);
        await this.enterData(password, this.passwordField);
        await this.enterData(password, this.repeatPasswordField);
        await this.confirmSignUp();
    }

    async signUpWithInvalidCredentials(name: string, lastName: string, email: string, password: string, rePassword: string){
        await this.enterData(name, this.nameField);
        await this.enterData(lastName, this.lastNameField);
        await this.enterData(email, this.emailField);
        await this.enterData(password, this.passwordField);
        await this.enterData(rePassword, this.repeatPasswordField);
    }

    async verifySuccessMessage(){
        await expect(this.successMessage).toBeVisible();
        await expect(this.successMessage).toHaveText('Registration complete');
    }

    async verifyDataIsValid(field: Locator){
        await expect(field).toContainClass('ng-valid');
    }

    async verifyDataIsInvalid(field: Locator){
        await expect(field).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(field).toContainClass('ng-invalid');
    }

    async verifyPasswordIsInvalid(field: Locator){
        await expect(field).toHaveCSS('border-color', 'rgb(220, 53, 69)')
        await expect(field).toContainClass('is-invalid')
    }

    async NameRequiredError(){
        await expect(this.invalidFeedback).toBeVisible();
        await expect(this.invalidFeedback).toHaveText('Name required');
    }

    async NameIsInvalidError(){
        await expect(this.invalidFeedback).toBeVisible();
        await expect(this.invalidFeedback).toHaveText('Name is invalid');
    }

    async NameLengthError(){
        await expect(this.invalidFeedback).toBeVisible();
        await expect(this.invalidFeedback).toHaveText('Name has to be from 2 to 20 characters long');
    }

    async LastNameRequiredError(){
        await expect(this.invalidFeedback).toBeVisible();
        await expect(this.invalidFeedback).toHaveText('Last name required');
    }

    async LastNameIsInvalidError(){
        await expect(this.invalidFeedback).toBeVisible();
        await expect(this.invalidFeedback).toHaveText('Last name is invalid');
    }

    async LastNameLengthError(){
        await expect(this.invalidFeedback).toBeVisible();
        await expect(this.invalidFeedback).toHaveText('Last name has to be from 2 to 20 characters long');
    }

    async EmailRequiredError(){
        await expect(this.invalidFeedback).toBeVisible();
        await expect(this.invalidFeedback).toHaveText('Email required');
    }

    async EmailIsInvalidError(){
        await expect(this.invalidFeedback).toBeVisible();
        await expect(this.invalidFeedback).toHaveText('Email is incorrect');
    }
    
    async PasswordRequiredError(){
        await expect(this.invalidFeedback).toBeVisible();
        await expect(this.invalidFeedback).toHaveText('Password required');
    }

    async PasswordRequirementsError(){
        await expect(this.invalidFeedback).toBeVisible();
        await expect(this.invalidFeedback).toHaveText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
    }

    async ReEnterPasswordRequiredError(){
        await expect(this.invalidFeedback).toBeVisible();
        await expect(this.invalidFeedback).toHaveText('Re-enter password required');
    }

    async ReEnterPasswordMatchError(){
        await expect(this.invalidFeedback).toBeVisible();
        await expect(this.invalidFeedback).toHaveText('Passwords do not match');
    }

    async ConfirmSignUpButtonIsDisabled(){
        await expect(this.registerButton).toHaveAttribute('disabled')
    }
    
}