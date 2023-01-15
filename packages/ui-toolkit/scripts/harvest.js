const { readFile, readdir, lstat, writeFile } = require('fs/promises');
const micromatch = require('micromatch');
const path = require('path');

const ROOT_PATH = '../../';

const getPackagePaths = async (workspacePatterns) => {
  const workspacePathPatterns = workspacePatterns.map((pattern) =>
    path.join(ROOT_PATH, pattern)
  );

  const packagePaths = [];

  async function fromDir(startPath) {
    const files = await readdir(startPath);
    for (const file of files) {
      // TODO: Exclude path
      if (file === 'node_modules' || file === '.git') {
        continue;
      }
      const filename = path.join(startPath, file);
      const stats = await lstat(filename);
      if (stats.isDirectory()) {
        const matches = micromatch([filename], workspacePathPatterns);
        if (matches.length > 0) {
          packagePaths.push(matches[0]);
        } else {
          await fromDir(filename);
        }
      }
    }
  }
  await fromDir(ROOT_PATH);

  return packagePaths;
};

const rootPackagePath = path.join(ROOT_PATH, 'package.json');
const getRootPackage = async () => JSON.parse(await readFile(rootPackagePath));

getRootPackage().then(async (rootPackage) => {
  if (rootPackage?.workspaces) {
    const subPackagePaths = await getPackagePaths(rootPackage.workspaces);
    const totalTrackings = [];

    for (const packagePath of subPackagePaths) {
      const trackingFilePath = path.join(packagePath, 'tracking.json');
      try {
        const data = JSON.parse(await readFile(trackingFilePath));
        totalTrackings.push(...data);
      } catch (err) {
        continue;
      }
    }

    await writeFile('total-tracking.json', JSON.stringify(totalTrackings));
  }
});
