import { NextFunction, Request, Response } from "express";
import { JwtAdapter } from "./../config/jwt.adapter";
import { UserModel } from "./../data/mongo/models/user.model";
import { UserEntity } from "./../domain/entities/user.entity";

export class AuthMiddleware {
    static async authRequired(req: Request, res: Response, next: NextFunction) {
        const authorization = req.header('Authorization'); // Find "Authorization" in the request header to get the JWT token
        if (!authorization) return res.status(401).json({ error: 'No token provided' });
        if (!authorization.startsWith('Bearer ')) return res.status(401).json({ error: 'Invalid token' });

        const token = authorization.split(' ')[1] || ''; // Bearer sh29jfwoak492gk2k

        try {
            const payload = await JwtAdapter.validateToken<{ id: string }>(token);
            if (!payload) return res.status(401).json({ error: "Invalid token" });

            const { id } = payload;
            const user = await UserModel.findById(id);
            // TODO: validate if user is active
            if (!user) return res.status(401).json({ error: "User not found" });

            req.body.user = UserEntity.fromObject(user);
            next();
        } catch (error) {
            console.log(error); // use winston
            res.status(500).json({ error: "Internal Server Error - check logs :(" });
        }
    }
}