import { Router } from "express";
import { AuthController } from "./controller";
import { AuthService } from "../../services/auth.service";
import { EmailService } from "../../services/email.service";
import { envs } from "../../config/envs";

export class AuthRouter {
    static get routes(): Router {
        const router = Router();

        const emailService = new EmailService(
            envs.MAILER_SERVICE,
            envs.MAILER_EMAIL,
            envs.MAILER_SECRET_KEY,
            envs.SEND_EMAIL
        );
        const authService = new AuthService(emailService);
        const { loginUser, registerUser, validateEmail } = new AuthController(authService);

        router.post('/login', loginUser);
        router.post('/register', registerUser);
        router.get('/validate-email/:token', validateEmail);

        return router;
    }
}