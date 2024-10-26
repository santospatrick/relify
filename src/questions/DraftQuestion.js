export const DraftQuestion = {
    type: 'list',
    name: 'draft',
    message: 'Do you want to draft a new release?',
    choices: ['✍️ Draft a new release, I want to review and make changes to the description.', '✨ Create a Github release automatically, what\'s shown in the CLI looks good.'],
    default: 0,
};