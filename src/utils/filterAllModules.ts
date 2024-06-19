import { readdir, lstat } from "node:fs/promises";
import path from "node:path";

export async function filterAllModules(
  currentPath: string,
  pathsToAnalyzed: string[] = [],
  pathsWithModules: string[] = []
): Promise<string[]> {
  try {
    const directoryContents = await readdir(currentPath);
    const promises = [];
    for (const x of directoryContents) {
      const newPath = path.join(currentPath, x);
      promises.push({ path: newPath, promise: lstat(newPath) });
    }
    const stats = await Promise.all(promises.flatMap(({ promise }) => promise));
    for (let i = 0; i < stats.length; i++) {
      if (stats[i].isDirectory()) {
        if (promises[i].path.includes("node_modules"))
          pathsWithModules.push(promises[i].path);
        else pathsToAnalyzed.push(promises[i].path);
      }
    }
  } catch (error) {}

  if (pathsToAnalyzed.length > 0) {
    return filterAllModules(
      pathsToAnalyzed.pop() as string,
      pathsToAnalyzed,
      pathsWithModules
    );
  } else {
    return pathsWithModules;
  }
}
