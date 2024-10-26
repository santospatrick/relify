import inquirer from "inquirer";
import { VersionQuestion } from "./questions/VersionQuestion.js";
import { LatestReleaseService } from "./services/LatestReleaseService.js";
import { OwnerRepoService } from "./services/OwnerRepoService.js";
import { CommitsPresenter } from "./presenters/CommitsPresenter.js";
import { GithubReleaseService } from "./services/GithubReleaseService.js";
import { BranchQuestion } from "./questions/BranchQuestion.js";
import { GithubAuthQuestion } from "./questions/GithubAuthQuestion.js";
import { validateNextVersion } from "./utils/validateNextVersion.js";
import { DraftQuestion } from "./questions/DraftQuestion.js";
import { bumpVersion } from "./utils/bumpVersion.js";
import { DEFAULT_VERSION_IF_NONE_FOUND } from "./enums.js";
import { ConfirmQuestion } from "./questions/ConfirmQuestion.js";

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

    console.log('--------')
    console.log('Release description preview:')
    const description = CommitsPresenter.execute(commitMessages);
    console.log(description)
    console.log(''); // empty line

    const nextSuggestedTagVersion = latestTag ? bumpVersion(latestTag) : DEFAULT_VERSION_IF_NONE_FOUND;
    
    const versionConfirmAnswers = await inquirer.prompt([
        VersionQuestion({ defaultVersion: nextSuggestedTagVersion }),
    ]);

    const { version: nextVersion } = versionConfirmAnswers;

    await validateNextVersion(latestTag, nextVersion);

    const secondQuestionsBatch = await inquirer.prompt([
        GithubAuthQuestion,
        BranchQuestion,
        DraftQuestion,
        ConfirmQuestion
    ]);

    const { authToken, branch, draft: draftAnswer, confirmRelease } = secondQuestionsBatch;

    if (!confirmRelease) {
        console.log('Release cancelled.');
        return;
    }

    const draft = draftAnswer.includes('Draft')

    const githubReleaseService = new GithubReleaseService({ authToken });

    await githubReleaseService.execute({
        owner, 
        repo, 
        version: nextVersion, 
        description, 
        branch, 
        draft
    });
}