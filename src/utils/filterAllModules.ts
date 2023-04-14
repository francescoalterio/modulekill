import fs from "fs";
import path from "path";

export async function filterAllModules(
  currentPath: string,
  pathsToAnalyzed: string[] = [],
  pathsWithModules: string[] = []
): Promise<string[]> {
  pathsToAnalyzed.pop();
  const directoryContents = await fs.promises.opendir(currentPath);
  for await (const x of directoryContents) {
    if (x.isDirectory()) {
      const pathWithDir = path.join(currentPath, x.name);
      x.name === "node_modules"
        ? pathsWithModules.push(pathWithDir)
        : pathsToAnalyzed.push(pathWithDir);
    }
  }

  if (pathsToAnalyzed.length > 0) {
    return filterAllModules(
      pathsToAnalyzed[pathsToAnalyzed.length - 1],
      pathsToAnalyzed,
      pathsWithModules
    );
  } else {
    return pathsWithModules;
  }
}
