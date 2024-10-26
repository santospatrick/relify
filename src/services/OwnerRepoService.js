import simpleGit from "simple-git";
import { promisify } from 'util';

export class OwnerRepoService {
    constructor() {
        this.git = simpleGit()
    }

    async execute() {
        const listRemote = promisify(this.git.listRemote.bind(this.git));

        try {
            const data = await listRemote(['--get-url']);
            const [owner, repo] = data.split(':').pop().split('.git')[0].split('/');

            return { owner, repo };
        } catch (err) {
            console.error('Error getting remote:', err);
            throw err;
        }
    }
}