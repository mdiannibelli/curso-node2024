import { BcryptjsAdapter } from "../../config/bcryptjs.adapter";
import { JwtAdapter } from "../../config/jwt.adapter";
import { UserModel } from "../../data/mongo/models/user.model";
import { LoginUserDto } from "../../domain/dtos/auth/login-user.dto";
import { RegisterUserDto } from "../../domain/dtos/auth/register-user.dto";
import { UserEntity } from "../../domain/entities/user.entity";
import { CustomError } from "../../domain/errors/custom.error";

export class AuthService {
    constructor() { }

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


            // 2. JWT Token

            // 3. Enviar email

            const userEntity = UserEntity.fromObject(user); // return 'id' and not '_id'
            return {
                user: userEntity,
                token: 'ABC'
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
    }
}