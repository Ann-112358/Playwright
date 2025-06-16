import { test, expect } from "@playwright/test"

const userEmail = `aqa+test${Date.now()}@test.com`;
const userPassword = `Qwerty123456`;

test.describe('Sign up test', () => {
    test.beforeEach(async ({page}) => {
        await page.goto('/');
        await page.getByRole('button', { name: 'Sign up' }).click();

    })

    test.describe('Field "Name"', () => {
        test.describe("Positive cases", () => {
          test("Name with 2 letters is valid", async ({page}) => {
            const name = page.locator('input#signupName');

            await name.fill("Li");
            await name.blur();
            await expect(name).toContainClass('ng-valid');
          });
    
          test("Name with 20 letters is valid", async ({page}) => {
            const name = page.locator('input#signupName');
            
            await name.fill("A".repeat(20));
            await name.blur();
            await expect(name).toContainClass('ng-valid');
          });
        });
    
        test.describe("Negative cases", () => {
            test("Name is required", async ({page}) => {
            const name = page.locator('input#signupName');
            const invalidFeedback = page.locator('.invalid-feedback');

            await name.focus();
            await name.blur();
            await expect(name).toContainClass('ng-invalid');
            await expect(name).toHaveCSS('border-color', 'rgb(220, 53, 69)');
            await expect(invalidFeedback).toBeVisible();
            await expect(invalidFeedback).toHaveText('Name required');
          });
    
          test("Only English letters are allowed", async ({page}) => {
            const name = page.locator('input#signupName');
            const invalidFeedback = page.locator('.invalid-feedback');

            await name.fill("Анна");
            await name.blur();
            await expect(name).toContainClass('ng-invalid');
            await expect(name).toHaveCSS('border-color', 'rgb(220, 53, 69)');
            await expect(invalidFeedback).toBeVisible();
            await expect(invalidFeedback).toHaveText('Name is invalid');
          });
    
          test("Name with 1 letter is invalid", async ({page}) => {
            const name = page.locator('input#signupName');
            const invalidFeedback = page.locator('.invalid-feedback');

            await name.fill("A");
            await name.blur();
            await expect(name).toContainClass('ng-invalid');
            await expect(name).toHaveCSS('border-color', 'rgb(220, 53, 69)');
            await expect(invalidFeedback).toBeVisible();
            await expect(invalidFeedback).toHaveText('Name has to be from 2 to 20 characters long');
          });
    
          test("Name with 21 letters is invalid", async ({page}) => {
            const name = page.locator('input#signupName');
            const invalidFeedback = page.locator('.invalid-feedback');

            await name.fill("A".repeat(21));
            await name.blur();
            await expect(name).toContainClass('ng-invalid');
            await expect(name).toHaveCSS('border-color', 'rgb(220, 53, 69)');
            await expect(invalidFeedback).toBeVisible();
            await expect(invalidFeedback).toHaveText('Name has to be from 2 to 20 characters long');
          });
        });
      });
    
      test.describe('Field "Last Name"', () => {
        test.describe("Positive cases", () => {
          test("Last Name with 2 letters is valid", async ({page}) => {
            const lastName = page.locator('input#signupLastName');

            await lastName.fill("Pi");
            await lastName.blur();
            await expect(lastName).toContainClass('ng-valid');
          });
    
          test("Last Name with 20 letters is valid", async ({page}) => {
            const lastName = page.locator('input#signupLastName');

            await lastName.fill("A".repeat(20));
            await lastName.blur();
            await expect(lastName).toContainClass('ng-valid');
          });
        });
    
        test.describe("Negative cases", () => {
          test("Last Name is required", async({page}) => {
            const lastName = page.locator('input#signupLastName');
            const invalidFeedback = page.locator('.invalid-feedback');

            await lastName.focus();
            await lastName.blur();
            await expect(lastName).toContainClass('ng-invalid');
            await expect(lastName).toHaveCSS('border-color', 'rgb(220, 53, 69)');
            await expect(invalidFeedback).toBeVisible();
            await expect(invalidFeedback).toHaveText('Last name required');
          });
    
          test("Only English letters are allowed", async({page}) => {
            const lastName = page.locator('input#signupLastName');
            const invalidFeedback = page.locator('.invalid-feedback');

            await lastName.fill("Анна");
            await lastName.blur();
            await expect(lastName).toContainClass('ng-invalid');
            await expect(lastName).toHaveCSS('border-color', 'rgb(220, 53, 69)');
            await expect(invalidFeedback).toBeVisible();
            await expect(invalidFeedback).toHaveText('Last name is invalid');
          });
    
          test("Last Name with 1 letter is invalid", async ({page}) => {
            const lastName = page.locator('input#signupLastName');
            const invalidFeedback = page.locator('.invalid-feedback');

            await lastName.fill("A");
            await lastName.blur();
            await expect(lastName).toContainClass('ng-invalid');
            await expect(lastName).toHaveCSS('border-color', 'rgb(220, 53, 69)');
            await expect(invalidFeedback).toBeVisible();
            await expect(invalidFeedback).toHaveText('Last name has to be from 2 to 20 characters long');
          });
    
          test("Last Name with 21 letters is invalid", async ({page}) => {
            const lastName = page.locator('input#signupLastName');
            const invalidFeedback = page.locator('.invalid-feedback');

            await lastName.fill("A".repeat(21));
            await lastName.blur();
            await expect(lastName).toContainClass('ng-invalid');
            await expect(lastName).toHaveCSS('border-color', 'rgb(220, 53, 69)');
            await expect(invalidFeedback).toBeVisible();
            await expect(invalidFeedback).toHaveText('Last name has to be from 2 to 20 characters long');
          });
        });
      });
    
      test.describe('Field "Email"', () => {
        test.describe("Positive cases", () => {
          test("Email is valid", async ({page}) => {
            const email = page.locator('input#signupEmail');

            await email.fill(`${userEmail}`);
            await email.blur();
            await expect(email).toContainClass('ng-valid');
          });
        });
    
        test.describe("Negative cases", () => {
          test("Email is required", async ({page}) => {
            const email = page.locator('input#signupEmail');
            const invalidFeedback = page.locator('.invalid-feedback');

            await email.focus();
            await email.blur();
            await expect(email).toContainClass('ng-invalid');
            await expect(email).toHaveCSS('border-color', 'rgb(220, 53, 69)');
            await expect(invalidFeedback).toBeVisible();
            await expect(invalidFeedback).toHaveText('Email required');
          });
    
          test("Email is invalid", async ({page}) => {
            const email = page.locator('input#signupEmail');
            const invalidFeedback = page.locator('.invalid-feedback');

            await email.fill("aqa.invalid");
            await email.blur();
            await expect(email).toContainClass('ng-invalid');
            await expect(email).toHaveCSS('border-color', 'rgb(220, 53, 69)');
            await expect(invalidFeedback).toBeVisible();
            await expect(invalidFeedback).toHaveText('Email is incorrect');
          });
        });
      });
    
      test.describe('Field "Password"', () => {
        test.describe("Positive cases", () => {
          test("Password with 15 letters is valid", async ({page}) => {
            const password = page.locator('input#signupPassword');

            await password.fill("Qwerty123456789");
            await password.blur();
            await expect(password).toContainClass('ng-valid');
          });
    
          test("Password with 8 letters is valid", async ({page}) => {
            const password = page.locator('input#signupPassword');

            await password.fill("Qwerty12");
            await password.blur();
            await expect(password).toContainClass('ng-valid');
          });
        });
    
        test.describe("Negative cases", () => {
          test("Password is required", async ({page}) => {
            const password = page.locator('input#signupPassword');
            const invalidFeedback = page.locator('.invalid-feedback');

            await password.focus();
            await password.blur();
            await expect(password).toContainClass('ng-invalid');
            await expect(password).toHaveCSS('border-color', 'rgb(220, 53, 69)');
            await expect(invalidFeedback).toBeVisible();
            await expect(invalidFeedback).toHaveText('Password required');
          });
    
          test("Password with 7 letters is invalid", async ({page}) => {
            const password = page.locator('input#signupPassword');
            const invalidFeedback = page.locator('.invalid-feedback');

            await password.fill("Qwerty1");
            await password.blur();
            await expect(password).toContainClass('ng-invalid');
            await expect(password).toHaveCSS('border-color', 'rgb(220, 53, 69)');
            await expect(invalidFeedback).toBeVisible();
            await expect(invalidFeedback).toHaveText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
          });
    
          test("Password with 16 letters is invalid", async ({page}) => {
            const password = page.locator('input#signupPassword');
            const invalidFeedback = page.locator('.invalid-feedback');

            await password.fill("Qwerty1234567890");
            await password.blur();
            await expect(password).toContainClass('ng-invalid');
            await expect(password).toHaveCSS('border-color', 'rgb(220, 53, 69)');
            await expect(invalidFeedback).toBeVisible();
            await expect(invalidFeedback).toHaveText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
          });
    
          test ("1 integer is required", async ({page}) => {
            const password = page.locator('input#signupPassword');
            const invalidFeedback = page.locator('.invalid-feedback');

            await password.fill("NoInteger");
            await password.blur();
            await expect(password).toContainClass('ng-invalid');
            await expect(password).toHaveCSS('border-color', 'rgb(220, 53, 69)');
            await expect(invalidFeedback).toBeVisible();
            await expect(invalidFeedback).toHaveText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
          });
    
          test("1 capital letter is required", async ({page}) => {
            const password = page.locator('input#signupPassword');
            const invalidFeedback = page.locator('.invalid-feedback');

            await password.fill("nocapital1etter");
            await password.blur();
            await expect(password).toContainClass('ng-invalid');
            await expect(password).toHaveCSS('border-color', 'rgb(220, 53, 69)');
            await expect(invalidFeedback).toBeVisible();
            await expect(invalidFeedback).toHaveText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
          });
    
          test("1 small letter is required", async ({page}) => {
            const password = page.locator('input#signupPassword');
            const invalidFeedback = page.locator('.invalid-feedback');

            await password.fill("NOSMALLLETTER1");
            await password.blur();
            await expect(password).toContainClass('ng-invalid');
            await expect(password).toHaveCSS('border-color', 'rgb(220, 53, 69)');
            await expect(invalidFeedback).toBeVisible();
            await expect(invalidFeedback).toHaveText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
          });
        });
      });
    
      test.describe('Field "Re-enter password"', () => {
        test.describe("Positive cases", () => {
          test("Re-enter password is valid", async ({page}) => {
            const password = page.locator('input#signupPassword');
            const repeatPassword = page.locator('input#signupRepeatPassword');

            await password.fill(`${userPassword}`);
            await repeatPassword.fill(`${userPassword}`);
            await repeatPassword.blur();
            await expect(repeatPassword).toContainClass('ng-valid');
          });
        });
    
        test.describe("Negative cases", () => {
          test("Re-enter password is required", async ({page}) => {
            const repeatPassword = page.locator('input#signupRepeatPassword');
            const invalidFeedback = page.locator('.invalid-feedback');

            await repeatPassword.focus();
            await repeatPassword.blur();
            await expect(repeatPassword).toContainClass('ng-invalid');
            await expect(repeatPassword).toHaveCSS('border-color', 'rgb(220, 53, 69)');
            await expect(invalidFeedback).toBeVisible();
            await expect(invalidFeedback).toHaveText('Re-enter password required');
          });
    
          test("Re-enter password is invalid", async ({page}) => {
            const password = page.locator('input#signupPassword');
            const repeatPassword = page.locator('input#signupRepeatPassword');
            const invalidFeedback = page.locator('.invalid-feedback');

            await password.fill(`${userPassword}`);
            await repeatPassword.fill("12345Qwerty");
            await repeatPassword.blur();
            await expect(repeatPassword).toContainClass('is-invalid');
            await expect(repeatPassword).toHaveCSS('border-color', 'rgb(220, 53, 69)');
            await expect(invalidFeedback).toBeVisible();
            await expect(invalidFeedback).toHaveText('Passwords do not match');
          });
        });
      });
    
      test.describe("Sending form", () => {
        test.describe("Positive cases", () => {
          test("New User is created when data is correct", async ({page}) => {
            const name = page.locator('input#signupName');
            const lastName = page.locator('input#signupLastName');
            const email = page.locator('input#signupEmail');
            const password = page.locator('input#signupPassword');
            const repeatPassword = page.locator('input#signupRepeatPassword');
            const registerButton = page.locator('div.modal-footer>button.btn-primary');
            const successMessage = page.locator('div.alert-success');

            await name.fill("Anna");
            await lastName.fill("Bohachenko");
            await email.fill(`${userEmail}`);
            await password.fill(`${userPassword}`);
            await repeatPassword.fill(`${userPassword}`);
            await registerButton.click();
            await expect(successMessage).toBeVisible();
            await expect(successMessage).toHaveText('Registration complete');
          });
        });
    
        test.describe("Negative cases", () => {
          test("[Register] button is disabled when form is empty", async ({page}) => {
            const registerButton = page.locator('div.modal-footer>button.btn-primary');

            await expect(registerButton).toHaveAttribute('disabled');
          });

          test("[Register] button is disabled when data is incorrect", async ({page}) => {
            const name = page.locator('input#signupName');
            const lastName = page.locator('input#signupLastName');
            const email = page.locator('input#signupEmail');
            const password = page.locator('input#signupPassword');
            const repeatPassword = page.locator('input#signupRepeatPassword');
            const registerButton = page.locator('div.modal-footer>button.btn-primary');

            await name.fill("Anna");
            await lastName.fill("Bohachenko");
            await email.fill(`${userEmail}`);
            await password.fill(`${userPassword}`);
            await repeatPassword.fill(`qwerty54321`);
            await repeatPassword.blur();
            await expect(registerButton).toHaveAttribute('disabled');
          });
        });
      });
    });