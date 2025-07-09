import test, { expect } from "@playwright/test";
import UsersController from "../../api/controllers/UsersController.ts";
import { UsersFactory } from "../../api/factory/UsersFactory.ts";
import { usersList } from "../../test-data/users.ts";

test.describe('Create users', () => {
    let usersController: UsersController;

    test.beforeEach(async ({ request }) => {
        usersController = new UsersController(request);
    });

    test('Register new user', async () => {
        const user = UsersFactory.createUser(usersList.mainUser.name, usersList.mainUser.lastName, usersList.mainUser.userEmail, usersList.mainUser.userPassword, usersList.mainUser.userPassword);
        const {name, lastName, email, password, repeatPassword} = user;
        const response = await usersController.registerUser(name, lastName, email, password, repeatPassword);
        const body = await response.json();

        expect(response.status()).toBe(201);
    });
});