export function validateNextVersion(currentVersion, nextVersion) {
  return new Promise((resolve, reject) => {
    const [currentMajor, currentMinor, currentPatch] = currentVersion.split('.').map(Number);
    const [nextMajor, nextMinor, nextPatch] = nextVersion.split('.').map(Number);

    if (
      nextMajor > currentMajor ||
      (nextMajor === currentMajor && nextMinor > currentMinor) ||
      (nextMajor === currentMajor && nextMinor === currentMinor && nextPatch > currentPatch)
    ) {
      resolve(`Next version ${nextVersion} is valid and higher than current version ${currentVersion}.`);
    } else {
      reject(new Error(`Error: Next version (${nextVersion}) must be higher than the current version (${currentVersion}).`));
    }
  });
}