import { GithubIssue } from "../../../interfaces/github-issue.interface";
import { GithubStar } from "../../../interfaces/github-star.interface";

export class GithubService {
    constructor() { }

    onStar(payload: GithubStar): string {
        const { action, sender, repository, starred_at } = payload;
        return `User ${sender.login} ${action} star on ${repository.full_name}`;
    }

    onIssue(payload: GithubIssue): string {
        let message: string;
        const { action, issue, repository, sender } = payload;
        if (action === 'opened') {
            message = `An issue was opened with this title "${issue.title}"`;
            return message;
        }
        if (action === 'reopened') {
            message = `An issue was reopened by ${issue.user.login}`;
            return message;
        }

        if (action === 'closed') {
            message = `An issue was closed by ${issue.user.login}`;
            return message;
        }
        return `Unknown issue event ${action} has ocurred`;
    }
}