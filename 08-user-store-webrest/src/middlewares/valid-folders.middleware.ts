import { NextFunction, Request, Response } from "express";

export class ValidFoldersMiddleware {
    static validFolders = (arrayFolders: string[]) => {
        return (req: Request, res: Response, next: NextFunction) => {
            const folder = req.params.folder;
            if (!arrayFolders.includes(folder)) return res.status(400).json({ error: `Invalid folder ${folder}, valid ones ${arrayFolders}` });
            next();
        }
    }
}