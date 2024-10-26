export function bumpVersion(version) {
    const versionParts = version.split('.');
    const patch = parseInt(versionParts[2]) + 1;

    return `${versionParts[0]}.${versionParts[1]}.${patch}`;
}