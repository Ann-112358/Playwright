import test, { expect } from "@playwright/test";
import { usersList } from "../../test-data/users.ts";
import AuthController from "../../api/controllers/AuthController.ts";
import CarsController from "../../api/controllers/CarsController.ts";
import { CarsFactory } from "../../api/factory/CarsFactory.ts";

let authController: AuthController;
let carsController: CarsController;
let sid: string;


    test.describe('Tests for adding cars', () => {
        test.beforeEach(async ({ request }) => {
            authController = new AuthController(request);
            carsController = new CarsController(request);
            sid = await authController.getAuthCookie(usersList.mainUser.userEmail, usersList.mainUser.userPassword);
            expect(sid).not.toBeUndefined();    
        })

        test('Add new car Porsche Cayenne [/api/cars/]', async () => {
            const carToAdd = CarsFactory.createCar(4, 17, 1000);
            const response = await carsController.addCar(carToAdd, sid);
            const body = await response.json();

            expect(response.status()).toBe(201);
            expect(body.data.carBrandId).toBe(carToAdd.carBrandId);
            expect(body.data.carModelId).toBe(carToAdd.carModelId);
            expect(body.data.mileage).toBe(carToAdd.mileage);
            expect(body.data.model).toBe('Cayenne')
            expect(body.data.brand).toBe('Porsche');
        })

        test('Add new car with incorrect carBrandId', async () => {
            const carWithIncorrectBrandId = CarsFactory.createCar(10, 17, 1000);
            const response = await carsController.addCar(carWithIncorrectBrandId, sid);
            const body = await response.json();

            expect(response.status()).toBe(404);
            expect(body.status).toBe('error');
            expect(body.message).toBe('Brand not found')
        })

        test('Add new car with incorrect carModelId', async () => {
            const carWithIncorrectModelId = CarsFactory.createCar(4, 99, 1000);
            const response = await carsController.addCar(carWithIncorrectModelId, sid);
            const body = await response.json();

            expect(response.status()).toBe(404);
            expect(body.status).toBe('error');
            expect(body.message).toBe('Model not found')
        })

    });