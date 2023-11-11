import { opendir } from "node:fs/promises";
import path from "node:path";

type FilterAllModules = (currentPath: string, pathsToAnalyzed?: string[], pathsWithModules?: string[]) => Promise<string[]>

export const filterAllModules: FilterAllModules = async function (
  currentPath,
  pathsToAnalyzed = [],
  pathsWithModules = []
) {

  try {
    const directoryContents = await opendir(currentPath);
    for await (const x of directoryContents) {
      if (x.isDirectory()) {
        const pathWithDir = path.join(currentPath, x.name);
        if (x.name === "node_modules") pathsWithModules.push(pathWithDir)
        else pathsToAnalyzed.push(pathWithDir);
      }
    }
  } catch (error) {
  }

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
