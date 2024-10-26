import simpleGit from 'simple-git'

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

      const commitMessages = commits.all.map(commit => commit.message);
      const version = latestTag;
  
      console.log(`Commits since last release: ${commitMessages.length}`);

      console.log('--------')
      console.log('Release description preview:')
      console.log(commitMessages.map(item => `- ${item}`).join('\n'));
  
      return { commitMessages, version };
    } catch (error) {
      console.error('Error getting commits:', error);
    }
  }  
}
