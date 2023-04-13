import fs from "fs";
import path from "path";

export async function getDirSize(
  currentPath: string,
  pathsToAnalyzed: string[] = [],
  fileSizes: number[] = []
): Promise<any> {
  pathsToAnalyzed.pop();
  const directoryContents = await fs.promises.opendir(currentPath);
  for await (const x of directoryContents) {
    if (x.isDirectory()) {
      const pathWithDir = path.join(currentPath, x.name);

      pathsToAnalyzed.push(pathWithDir);
    } else {
      const pathWithFile = path.join(currentPath, x.name);
      const { size } = await fs.promises.stat(pathWithFile);
      fileSizes.push(size);
    }
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
