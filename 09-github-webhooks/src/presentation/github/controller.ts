import { Request, Response } from "express";

export class GithubController {
    constructor() { }

    public webhookHandler = (req: Request, res: Response) => {
        res.json({ ok: "ok" });
    }
}