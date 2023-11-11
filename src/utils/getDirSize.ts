import { opendir, stat } from "node:fs/promises";
import path from "node:path";

export async function getDirSize(
  currentPath: string,
  pathsToAnalyzed: string[] = [],
  fileSizes: number[] = []
): Promise<any> {
  pathsToAnalyzed.pop();
  try {
    const directoryContents = await opendir(currentPath);
    for await (const x of directoryContents) {
      if (x.isDirectory()) {
        const pathWithDir = path.join(currentPath, x.name);

        pathsToAnalyzed.push(pathWithDir);
      } else {
        const pathWithFile = path.join(currentPath, x.name);
        const { size } = await stat(pathWithFile);
        fileSizes.push(size);
      }
    }
  } catch (e) {

  }

  if (pathsToAnalyzed.length > 0) {
    return getDirSize(
      pathsToAnalyzed[pathsToAnalyzed.length - 1],
      pathsToAnalyzed,
      fileSizes
    );
  } else {
    return fileSizes;
  }
}
