import { Request, Response } from "express";
import { RegisterUserDto } from "../../domain/dtos/auth/register-user.dto";
import { AuthService } from "../services/auth.service";
import { CustomError } from "../../domain/errors/custom.error";
import { LoginUserDto } from "../../domain/dtos/auth/login-user.dto";

export class AuthController {
    // DI Dependency Injection
    constructor(
        public readonly authService: AuthService
    ) { }

    private handleError(res: Response, error: unknown) {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ error: error.message })
        }
        return res.status(500).json({ error: 'Server Internal Error 500' }) // save logs
    }

    registerUser = (req: Request, res: Response) => {
        const [error, registerDto] = RegisterUserDto.create(req.body);
        if (error) return res.status(400).json({ error });

        this.authService.registerUser(registerDto!)
            .then(response => res.json(response))
            .catch(error => this.handleError(res, error));
    };

    loginUser = (req: Request, res: Response) => {
        const [error, loginUserDto] = LoginUserDto.login(req.body);
        if (error) return res.status(400).json({ error: error });

        this.authService.loginUser(loginUserDto!)
            .then(response => res.json(response))
            .catch(error => this.handleError(res, error))
    };

    validateEmail = (req: Request, res: Response) => {
        const { token } = req.params;
        if (!token) throw CustomError.badRequest("No token found!");

        this.authService.validatingEmail(token)
            .then(() => res.json('Email vaildated'))
            .catch(error => this.handleError(res, error));
    };

}