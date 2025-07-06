import test, { expect } from "@playwright/test";
import UsersController from "../../api/controllers/UsersController.ts";
import AuthController from "../../api/controllers/AuthController.ts";
import { usersList } from "../../test-data/users.ts";

test.describe('Delete users', () => {
    let usersController: UsersController;
    let authController: AuthController;

    test.beforeEach(async ({ request }) => {
        usersController = new UsersController(request);
        authController = new AuthController(request);
    });

    test('Delete user', async () => {
        const sid =  await authController.getAuthCookie(usersList.mainUser.userEmail, usersList.mainUser.userPassword);
        const response = await usersController.deleteUser(sid);
        const body = await response.json();

        expect(response.status()).toBe(200);
    });
});