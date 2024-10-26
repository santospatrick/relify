/**
 * @name ConfirmQuestion
 * @type {Object}
 * @property {string} type - confirm
 * @property {string} name - confirmRelease
 * @property {string} message - Are you sure you want to create this release?
 * @property {boolean} default - false
 */
export const ConfirmQuestion = {
    type: 'confirm',
    name: 'confirmRelease',
    message: 'Are you sure you want to create this release?',
    default: false,
};