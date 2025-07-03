import test, { expect } from "@playwright/test";
import HomePage from "../pom/pages/HomePage";
import SignInForm from "../pom/forms/SignInForm";
import { usersList } from "../test-data/users";
import AuthController from "../api/controllers/AuthController.ts";

let homePage: HomePage;
let signInForm: SignInForm;
let authController: AuthController;
let sid: string;

const carToAdd = {
    "carBrandId": 4,
    "carModelId": 17,
    "mileage": 1000
}

const carWithIncorrectBrandId = {
    "carBrandId": 10,
    "carModelId": 17,
    "mileage": 1000
}

const carWithIncorrectModelId = {
    "carBrandId": 4,
    "carModelId": 99,
    "mileage": 1000
}


    test.describe('Tests for adding cars', () => {
        test.beforeAll(async ({ request }) => {
            authController = new AuthController(request);
            sid = await authController.getAuthCookie(usersList.mainUser.userEmail, usersList.mainUser.userPassword);
        })

        test.beforeEach((async ({ page }) => {
            homePage = new HomePage(page);
            signInForm = new SignInForm(page);
        }));


        test('Add new car Porsche Cayenne [/api/cars/]', async ({ request }) => {
            const response = await request.post('/api/cars/', {
                data: carToAdd,
                headers: {
                    'Cookie': sid
                }
            });
            const body = await response.json();
            expect(response.status()).toBe(201);
            expect(body.data.carBrandId).toBe(carToAdd.carBrandId);
            expect(body.data.carModelId).toBe(carToAdd.carModelId);
            expect(body.data.mileage).toBe(carToAdd.mileage);
            expect(body.data.model).toBe('Cayenne')
            expect(body.data.brand).toBe('Porsche');
        })

        test('Add new car with incorrect carBrandId', async ({ request }) => {
            const response = await request.post('/api/cars/', {
                data: carWithIncorrectBrandId,
                headers: {
                    'Cookie': sid
                }
            });
            const body = await response.json();
            expect(response.status()).toBe(404);
            expect(body.status).toBe('error');
            expect(body.message).toBe('Brand not found')
        })

        test('Add new car with incorrect carModelId', async ({ request }) => {
            const response = await request.post('/api/cars/', {
                data: carWithIncorrectModelId,
                headers: {
                    'Cookie': sid
                }
            });
            const body = await response.json();
            expect(response.status()).toBe(404);
            expect(body.status).toBe('error');
            expect(body.message).toBe('Model not found')
        })

    })
