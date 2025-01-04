import { NextFunction, Request, Response } from "express";

export class FilesMiddleware {
    static containsFiles = (req: Request, res: Response, next: NextFunction) => {
        if (!req.files || Object.keys(req.files).length === 0) return res.status(400).json({ error: 'No files were selected' });

        if (!Array.isArray(req.files.file)) {
            req.body.files = [req.files.file] // Array with only 1 file
        } else {
            req.body.files = req.files.file; // Array with all files => .file as 'key' in formData
        };

        next();
    }
}