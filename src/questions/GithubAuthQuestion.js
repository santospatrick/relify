export const GithubAuthQuestion = {
    type: 'input',
    name: 'authToken',
    message: 'Please provide your Github personal access token \n(you can generate one at: https://github.com/settings/tokens/new):',
    validate: (value) => {
        if (!value.length) {
            return 'Please enter your Github personal access token';
        }

        if (!value.startsWith('ghp_')) {
            return 'Invalid token. Please make sure it starts with "ghp_"';
        }

        return true;
    }
};
