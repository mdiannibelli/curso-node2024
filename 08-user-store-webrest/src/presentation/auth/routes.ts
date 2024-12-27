import { Router } from "express";
import { AuthController } from "./controller";
import { AuthService } from "../services/auth.service";

export class AuthRouter {
    static get routes(): Router {
        const router = Router();

        const authService = new AuthService();
        const { loginUser, registerUser, validateEmail } = new AuthController(authService);

        router.post('/login', loginUser);
        router.post('/register', registerUser);
        router.get('/validate-email/:token', validateEmail);

        return router;
    }
}