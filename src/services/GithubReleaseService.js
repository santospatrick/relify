import { Octokit } from '@octokit/rest';
import ora from 'ora';

export class GithubReleaseService {
    constructor({ authToken }) {
        this.octokit = new Octokit({ auth: authToken })
    }

    async execute({ owner, repo, version, description, branch, draft }) {
        const spinner = ora({
            text: 'Creating a release on Github...',
            spinner: 'clock'
        }).start()

        try {        
            const release = await this.octokit.rest.repos.createRelease({
                owner,
                repo,
                tag_name: version,
                name: `Release ${version}`,
                body: description,
                target_commitish: branch,
                draft
            });

            spinner.succeed(`Release created successfully: ${release.data.html_url}`);
        } catch (error) {
            spinner.fail('Error creating release');
            throw new Error(`Error creating release: ${error}`);
        }
    }
}