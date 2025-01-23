import { Request, Response } from "express";
import { GithubService } from "../../services/github.service";
import { DiscordService } from "../../services/discord.service";

export class GithubController {
    constructor(
        private readonly githubService = new GithubService(),
        private readonly discordService = new DiscordService()
    ) { }

    public webhookHandler = (req: Request, res: Response) => {
        const githubEvent = req.header('x-github-event') ?? 'unknown';
        const githubSignature = req.header('x-hub-signature-256') ?? 'unknown';
        const payload = req.body;

        let message: string;
        switch (githubEvent) {
            case 'star':
                message = this.githubService.onStar(payload)
                this.discordService.notify(message)
                    .then((msg) => res.status(202).send(msg))
                    .catch(() => res.status(500).json({ error: 'Internal Server Error' }))
                break;
            case 'issues':
                message = this.githubService.onIssue(payload)
                this.discordService.notify(message)
                    .then((msg) => res.status(202).send(msg))
                    .catch(() => res.status(500).json({ error: 'Internal Server Error' }))
                break;
            default:
                message = `Unkonwn event ${githubEvent}`;
                this.discordService.notify(message)
                    .then((msg) => res.status(202).send(msg))
                    .catch(() => res.status(500).json({ error: 'Internal Server Error' }))
                break;
        }

        console.log(message)

        res.status(202).send('Accepted');
    }
}