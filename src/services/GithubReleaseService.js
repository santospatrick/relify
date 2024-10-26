import { Octokit } from '@octokit/rest';
import ora from 'ora';

export class GithubReleaseService {
    constructor() {
        this.message = 'ok'
        this.octokit = new Octokit({
            auth: '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'
        })
    }

    static async execute({ owner, repo, version, description, branch }) {
        const octokit = new GithubReleaseService().octokit;

        const spinner = ora({
            text: 'Creating a release on Github...',
            spinner: 'clock'
        }).start()

        try {        
            const release = await octokit.rest.repos.createRelease({
                owner,
                repo,
                tag_name: version,
                name: `Release ${version}`,
                body: description,
                target_commitish: branch,
            });

            spinner.succeed(`Release created successfully: ${release.data.html_url}`);
        } catch (error) {
            spinner.fail('Error creating release');
            throw new Error(`Error creating release: ${error}`);
        }
    }
}