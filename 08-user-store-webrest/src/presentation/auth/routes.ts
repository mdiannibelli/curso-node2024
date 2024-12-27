import { Router } from "express";
import { AuthController } from "./controller";

export class AuthRouter {
    static get routes(): Router {
        const router = Router();

        const { loginUser, registerUser, validateEmail } = new AuthController();

        router.post('/login', loginUser);
        router.post('/register', registerUser);
        router.get('/validate-email/:token', validateEmail);

        return router;
    }
}