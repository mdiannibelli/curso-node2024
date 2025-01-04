import { BcryptjsAdapter } from "../config/bcryptjs.adapter";
import { envs } from "../config/envs";
import { JwtAdapter } from "../config/jwt.adapter";
import { UserModel } from "../data/mongo/models/user.model";
import { LoginUserDto } from "../domain/dtos/auth/login-user.dto";
import { RegisterUserDto } from "../domain/dtos/auth/register-user.dto";
import { UserEntity } from "../domain/entities/user.entity";
import { CustomError } from "../domain/errors/custom.error";
import { EmailService } from "./email.service";

export class AuthService {
    constructor(
        private readonly emailService: EmailService
    ) { }

    public async registerUser(registerUserDto: RegisterUserDto) {
        const existUser = await UserModel.findOne({ email: registerUserDto.email });
        if (existUser) throw CustomError.badRequest("Email already exist");

        try {
            const user = new UserModel({
                ...registerUserDto,
                // 1. Encriptar contraseña
                password: BcryptjsAdapter.hash(registerUserDto.password)
            });
            await user.save();

            const userEntity = UserEntity.fromObject(user); // return 'id' and not '_id'

            // 2. JWT Token
            const token = await JwtAdapter.generateToken({ id: user.id }, '15m');
            if (!token) throw CustomError.internalServer("Error while generating token");

            // 3. Enviar email
            this.sendEmailWithValidationLink(user.email);

            return {
                user: userEntity,
                token: token
            };
        } catch (error) {
            throw CustomError.internalServer(`${error}`);
        }
    }

    public async loginUser(loginUserDto: LoginUserDto) {
        const user = await UserModel.findOne({ email: loginUserDto.email });
        if (!user) throw CustomError.badRequest("User does not exist!");

        if (!BcryptjsAdapter.compare(loginUserDto.password, user.password)) throw CustomError.badRequest("Invalid password");
        const token = await JwtAdapter.generateToken({ id: user.id }, '15m');
        if (!token) throw CustomError.internalServer("Error while generating token");
        return {
            user: user,
            token: token
        }

        //? In frontend you must be provide Bearer token in every request or save token in cookies: 
        //? fetch("https://api.tuapp.com/algun-recurso", {
        //?     method: "GET",
        //?     headers: {
        //?       Authorization: `Bearer ${token}`,
        //?       "Content-Type": "application/json",
        //?     },
        //?   })
    }

    private sendEmailWithValidationLink = async (email: string) => {
        try {
            const token = await JwtAdapter.generateToken({ email });
            if (!token) throw CustomError.internalServer("Error while generating token");

            const link = `${envs.WEBSERVICE_URL}/auth/validate-email/${token}`;
            const html = `
                <h1>Validate your email</h1>
                <p>Click on the following button to validate your email</p>
                <a href="${link}">Validate email</a>
            `;

            const options = {
                to: email,
                subject: 'Validate your email',
                htmlBody: html
            };
            const isSent = await this.emailService.sendEmail(options);
            if (!isSent) throw CustomError.internalServer("Error sending email");

            return true;
        } catch (error) {
            throw CustomError.internalServer(`${error}`);
        }
    }

    public validatingEmail = async (token: string) => {
        const payload = await JwtAdapter.validateToken(token);
        if (!payload) throw CustomError.unAuthorized("Invalid token");

        const { email } = payload as { email: string };
        if (!email) throw CustomError.internalServer("Email not in token");

        const user = await UserModel.findOne({ email });
        if (!user) throw CustomError.notFound(`User not found with email ${email}`);

        user.emailValidated = true;
        await user.save();

        return true;
    }
}