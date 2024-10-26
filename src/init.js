import inquirer from "inquirer";
import { VersionQuestion } from "./questions/VersionQuestion.js";
import { ConfirmQuestion } from "./questions/ConfirmQuestion.js";
import { LatestReleaseService } from "./services/LatestReleaseService.js";
import { OwnerRepoService } from "./services/OwnerRepoService.js";
import { CommitsPresenter } from "./presentes/CommitsPresenter.js";
import { GithubReleaseService } from "./services/GithubReleaseService.js";
import { BranchQuestion } from "./questions/BranchQuestion.js";

export async function init() {
    console.log(`
        ,     ,
       (\\____/)  "Beep, boop! 🤖"
        (_oo_)
          (O)
        __||__    \\)
    []/______\\\\[]
    / \\\\______/ \\\\
   /    /__\\\\    \\
  (\\   /____\\\\   /)
   """"      """" 

  Relify - Simple Releases
  =============================
    
  This CLI is still in ALPHA.
  ⚠️  WARNING: Do NOT use in production. ⚠️
`);

    const latestReleaseService = new LatestReleaseService()
    const ownerRepoService = new OwnerRepoService();

    const { owner, repo } = await ownerRepoService.execute()
    console.log(`Repository: ${owner}/${repo}`);
    const { commitMessages, version: latestTag } = await latestReleaseService.getCommitsSinceLatestRelease();

    console.log('\n');
    
    const versionConfirmAnswers = await inquirer.prompt([
        VersionQuestion({ version: latestTag }),
        ConfirmQuestion,
    ]);

    const { version: nextVersion, confirmRelease } = versionConfirmAnswers;

    if (!confirmRelease) {
        console.log('Release cancelled');
        return;
    }

    const branchAnswer = await inquirer.prompt([
        BranchQuestion
    ]);

    const { branch } = branchAnswer


    const description = CommitsPresenter.execute(commitMessages)

    await GithubReleaseService.execute({ owner, repo, version: nextVersion, description, branch });
}