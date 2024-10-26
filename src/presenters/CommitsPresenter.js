export class CommitsPresenter {
    static execute(commits) {
        if (!Array.isArray(commits)) {
            throw new Error('Commits must be an array');
        }

        const formattedCommits = commits.map(commit => `- ${commit}`);
        return formattedCommits.join('\n');
    }
}