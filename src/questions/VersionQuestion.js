import { semverPattern } from "../enums.js";

export const VersionQuestion = ({ version }) => ({
    type: 'input',
    name: 'version',
    message: 'Enter the next release version (x.y.z):',
    default: !version ? '0.0.1' : undefined,
    validate(input) {
      return semverPattern.test(input) || 'Version must follow "x.y.z" format';
    }
})