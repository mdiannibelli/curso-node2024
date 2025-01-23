import express from 'express';
import envs from './config/envs';
import { GithubController } from './presentation/github/github/controller';
import { GithubSha256Middleware } from './presentation/middlewares/github-sha256.middleware';


(() => {
    main();
})();

function main() {
    const app = express();

    const githubController = new GithubController();

    app.use(express.json());
    app.use(GithubSha256Middleware.verifyGithubSignature);
    app.post('/api/github', githubController.webhookHandler)

    app.listen(envs.PORT, () => {
        console.log(`Server running on port ${envs.PORT}`);
    })
}