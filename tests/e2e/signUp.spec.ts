import { test } from "@playwright/test";
import {usersList} from "../../test-data/users";
import HomePage from "../../pom/pages/HomePage";
import SignUpForm from "../../pom/forms/SignUpForm";
let homePage: HomePage;
let signUpForm: SignUpForm;


test.describe('Sign up test', () => {
    test.beforeEach(async ({page}) => {
      homePage = new HomePage(page);
      signUpForm = new SignUpForm(page);
      await test.step('Open Home page and click on Sign Up button', async () => {
        await homePage.open();
        await homePage.openSignUpForm();
      });
    });
      
      test.describe('Field "Name"', () => {
        test.describe("Positive cases", () => {
          test("Name with 2 letters is valid", async () =>  {
            await signUpForm.enterData("Li", signUpForm.nameField);
            await signUpForm.verifyDataIsValid(signUpForm.nameField);
          });
    
          test("Name with 20 letters is valid", async () => {
            await signUpForm.enterData("A".repeat(20), signUpForm.nameField);
            await signUpForm.verifyDataIsValid(signUpForm.nameField);
          });
        });
    
        test.describe("Negative cases", () => {
            test("Name is required", async () => {
            await signUpForm.generateErrorByFocusAndBlur(signUpForm.nameField);
            await signUpForm.verifyDataIsInvalid(signUpForm.nameField);
            await signUpForm.NameRequiredError();
          });
    
          test("Only English letters are allowed", async () => {
            await signUpForm.enterData('Анна', signUpForm.nameField);
            await signUpForm.verifyDataIsInvalid(signUpForm.nameField);
            await signUpForm.NameIsInvalidError();
          });
    
          test("Name with 1 letter is invalid", async () => {
            await signUpForm.enterData('A', signUpForm.nameField);
            await signUpForm.verifyDataIsInvalid(signUpForm.nameField);
            await signUpForm.NameLengthError();
          });
    
          test("Name with 21 letters is invalid", async () => {
            await signUpForm.enterData('A'.repeat(21), signUpForm.nameField);
            await signUpForm.verifyDataIsInvalid(signUpForm.nameField);
            await signUpForm.NameLengthError();
          });
        });
      });
    
      test.describe('Field "Last Name"', () => {
        test.describe("Positive cases", () => {
          test("Last Name with 2 letters is valid", async () => {
            await signUpForm.enterData("Pi", signUpForm.lastNameField);
            await signUpForm.verifyDataIsValid(signUpForm.lastNameField);
          });
    
          test("Last Name with 20 letters is valid", async () => {
            await signUpForm.enterData("A".repeat(20), signUpForm.lastNameField);
            await signUpForm.verifyDataIsValid(signUpForm.lastNameField);
          });
        });
    
        test.describe("Negative cases", () => {
          test("Last Name is required", async() => {
            await signUpForm.generateErrorByFocusAndBlur(signUpForm.lastNameField);
            await signUpForm.verifyDataIsInvalid(signUpForm.lastNameField);
            await signUpForm.LastNameRequiredError();
          });
    
          test("Only English letters are allowed", async() => {
            await signUpForm.enterData('Богаченко', signUpForm.lastNameField);
            await signUpForm.verifyDataIsInvalid(signUpForm.lastNameField);
            await signUpForm.LastNameIsInvalidError();
          });
    
          test("Last Name with 1 letter is invalid", async () => {
            await signUpForm.enterData('B', signUpForm.lastNameField);
            await signUpForm.verifyDataIsInvalid(signUpForm.lastNameField);
            await signUpForm.LastNameLengthError();
          });
    
          test("Last Name with 21 letters is invalid", async () => {
            await signUpForm.enterData('B'.repeat(21), signUpForm.lastNameField);
            await signUpForm.verifyDataIsInvalid(signUpForm.lastNameField);
            await signUpForm.LastNameLengthError();
          });
        });
      });
    
      test.describe('Field "Email"', () => {
        test.describe("Positive cases", () => {
          test("Email is valid", async () => {
            await signUpForm.enterData(`${usersList.newUser.userEmail}`, signUpForm.emailField)
            await signUpForm.verifyDataIsValid(signUpForm.emailField);
          });
        });
    
        test.describe("Negative cases", () => {
          test("Email is required", async () => {
            await signUpForm.generateErrorByFocusAndBlur(signUpForm.emailField);
            await signUpForm.verifyDataIsInvalid(signUpForm.emailField);
            await signUpForm.EmailRequiredError();
          });
    
          test("Email is invalid", async () => {
            await signUpForm.enterData(`aqa.invalid`, signUpForm.emailField)
            await signUpForm.verifyDataIsInvalid(signUpForm.emailField);
            await signUpForm.EmailIsInvalidError();
          });
        });
      });
    
      test.describe('Field "Password"', () => {
        test.describe("Positive cases", () => {
          test("Password with 15 letters is valid", async () => {
            await signUpForm.enterData(`Qwerty123456789`, signUpForm.passwordField)
            await signUpForm.verifyDataIsValid(signUpForm.passwordField);
          });
    
          test("Password with 8 letters is valid", async () => {
            await signUpForm.enterData(`Qwerty12`, signUpForm.passwordField)
            await signUpForm.verifyDataIsValid(signUpForm.passwordField);
          });
        });
    
        test.describe("Negative cases", () => {
          test("Password is required", async () => {
            await signUpForm.generateErrorByFocusAndBlur(signUpForm.passwordField)
            await signUpForm.verifyDataIsInvalid(signUpForm.passwordField);
            await signUpForm.PasswordRequiredError();
          });
    
          test("Password with 7 letters is invalid", async () => {
            await signUpForm.enterData('Qwerty1', signUpForm.passwordField)
            await signUpForm.verifyDataIsInvalid(signUpForm.passwordField);
            await signUpForm.PasswordRequirementsError();
          });
    
          test("Password with 16 letters is invalid", async () => {
            await signUpForm.enterData('Qwerty1234567890', signUpForm.passwordField)
            await signUpForm.verifyDataIsInvalid(signUpForm.passwordField);
            await signUpForm.PasswordRequirementsError();
          });
    
          test ("1 integer is required", async () => {
            await signUpForm.enterData('NoInteger', signUpForm.passwordField)
            await signUpForm.verifyDataIsInvalid(signUpForm.passwordField);
            await signUpForm.PasswordRequirementsError();
          });
    
          test("1 capital letter is required", async () => {
            await signUpForm.enterData('nocapital1etter', signUpForm.passwordField)
            await signUpForm.verifyDataIsInvalid(signUpForm.passwordField);
            await signUpForm.PasswordRequirementsError();
          });
    
          test("1 small letter is required", async () => {
            await signUpForm.enterData('NOSMALLLETTER1', signUpForm.passwordField)
            await signUpForm.verifyDataIsInvalid(signUpForm.passwordField);
            await signUpForm.PasswordRequirementsError();
          });
        });
      });
    
      test.describe('Field "Re-enter password"', () => {
        test.describe("Positive cases", () => {
          test("Re-enter password is valid", async () => {
            await signUpForm.enterData(`${usersList.newUser.userPassword}`, signUpForm.passwordField);
            await signUpForm.enterData(`${usersList.newUser.userPassword}`, signUpForm.repeatPasswordField);       
          	await signUpForm.verifyDataIsValid(signUpForm.repeatPasswordField);
          });
        });
    
        test.describe("Negative cases", () => {
          test("Re-enter password is required", async () => {
            await signUpForm.generateErrorByFocusAndBlur(signUpForm.repeatPasswordField);
            await signUpForm.verifyPasswordIsInvalid(signUpForm.repeatPasswordField)
            await signUpForm.ReEnterPasswordRequiredError();
          });
    
          test("Re-enter password is invalid", async () => {
            await signUpForm.enterData(`${usersList.newUser.userPassword}`, signUpForm.passwordField)
            await signUpForm.enterData(`12345Qwerty`, signUpForm.repeatPasswordField);  
            await signUpForm.verifyPasswordIsInvalid(signUpForm.repeatPasswordField);
            await signUpForm.ReEnterPasswordMatchError();
          });
        });
      });
    
      test.describe("Sending form", () => {
        test.describe("Positive cases", () => {
          test("New User is created when data is correct", async () => {
            await signUpForm.signUpWithValidCredentials('Anna', 'Bohachenko', `${usersList.newUser.userEmail}`, `${usersList.newUser.userPassword}`);
            await signUpForm.verifySuccessMessage();
          });
        });
    
        test.describe("Negative cases", () => {
          test("[Register] button is disabled when form is empty", async () => {
            await signUpForm.ConfirmSignUpButtonIsDisabled();
          });

          test("[Register] button is disabled when data is incorrect", async () => {
            await signUpForm.signUpWithInvalidCredentials('Anna', 'Bohachenko', `${usersList.newUser.userEmail}`, `${usersList.newUser.userPassword}`, `${usersList.newUser.userPassword}1`);
            await signUpForm.ConfirmSignUpButtonIsDisabled();
          });
        });
      });
    });