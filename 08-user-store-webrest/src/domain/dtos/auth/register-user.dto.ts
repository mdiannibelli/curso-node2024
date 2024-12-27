import { regularExps } from "../../../config/regular-exp";

export class RegisterUserDto {
    private constructor(
        public readonly email: string,
        public readonly name: string,
        public readonly password: string
    ) { }

    static create(object: { [key: string]: any }): [string?, RegisterUserDto?] {
        const { email, name, password } = object;
        if (!name) return ["Name required"];
        if (!email) return ["Email required"];
        if (!regularExps.email.test(email)) return ["Invalid email"];
        if (!password) return ["Password required"];
        if (password.length < 6) return ["Password too short"];

        return [undefined, new RegisterUserDto(email, name, password)];
    }
}