import { semverPattern } from "../enums.js";

export const VersionQuestion = ({ defaultVersion }) => ({
    type: 'input',
    name: 'version',
    message: 'Enter the next release version (x.y.z):',
    default: defaultVersion,
    validate(input) {
      return semverPattern.test(input) || 'Version must follow "x.y.z" format';
    }
})