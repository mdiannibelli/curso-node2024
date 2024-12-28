import jwt from 'jsonwebtoken';
import { envs } from './envs';

const JWT_SEED = envs.JWT_SEED;

export class JwtAdapter {
    //! DI => We should use a constructor to receive a JWT_SEED, this solves a hidden dependency

    static async generateToken(payload: any, duration: string = '15m') {
        return new Promise((resolve) => {
            jwt.sign(payload, JWT_SEED, { expiresIn: duration }, (err, token) => {
                if (err) return resolve(null);
                resolve(token);
            })
        })
    };

    static validateToken(token: string) {
        return new Promise((resolve) => {
            jwt.verify(token, JWT_SEED, (err, decoded) => {
                if (err) return resolve(null);
                resolve(decoded);
            })
        })
    }
}