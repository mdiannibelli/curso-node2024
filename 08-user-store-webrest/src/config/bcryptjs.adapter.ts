import { compareSync, genSaltSync, hashSync } from 'bcryptjs'

export class BcryptjsAdapter {
    constructor() { }

    static hash(password: string) {
        const salt = genSaltSync();
        return hashSync(password, salt);
    };

    static compare(password: string, hashedPassword: string) {
        return compareSync(password, hashedPassword);
    }
}