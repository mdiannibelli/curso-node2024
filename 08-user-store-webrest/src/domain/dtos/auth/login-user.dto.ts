import { regularExps } from "../../../config/regular-exp";

export class LoginUserDto {
    constructor(
        public readonly email: string,
        public readonly password: string
    ) { }

    static login(object: { [key: string]: any }): [string?, LoginUserDto?] {
        const { email, password } = object;
        if (!email) return ["Email required"];
        if (!regularExps.email.test(email)) return ["Invalid email"];
        if (!password) return ["Password required"];
        if (password.length < 6) return ["Password too short!"];

        return [undefined, new LoginUserDto(email, password)]
    }
}