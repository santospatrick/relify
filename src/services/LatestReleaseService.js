import simpleGit from 'simple-git'
import { CommitsPresenter } from '../presenters/CommitsPresenter.js';

export class LatestReleaseService {
  constructor() {
    this.git = simpleGit();
  }

  async getCommitsSinceLatestRelease() {
    try {
      const tags = await this.git.tags();
      const latestTag = tags.latest;
  
      let commits;
      if (latestTag) {
        console.log(`Latest release tag: ${latestTag}`);
  
        commits = await this.git.log({ from: latestTag, to: 'HEAD' });
      } else {
        console.log('Latest release tag: none');
        
        commits = await this.git.log();
      }

      if (!commits.all.length) {
        console.log('❌ No commits found since last release');
        console.log('Add commits to the repository to create a new release');
        process.exit(0);
      }

      const commitMessages = commits.all.map(commit => commit.message);
      const version = latestTag;
  
      console.log(`Commits since last release: ${commitMessages.length}`);
      
      return { commitMessages, version };
    } catch (error) {
      console.error('Error getting commits:', error);
    }
  }  
}
