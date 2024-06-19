import { opendir, stat, readdir, lstat } from "node:fs/promises";
import path from "node:path";
import { type Stats } from "node:fs";

interface PromiseAndPath {
  path: string;
  promise: Promise<Stats>;
}

export async function getDirSize(currentPath: string): Promise<number> {
  const pathsToAnalyzed = [currentPath];
  let totalSize = 0;

  while (pathsToAnalyzed.length > 0) {
    const currentPath = pathsToAnalyzed.pop() as string;
    try {
      const directoryContents = await readdir(currentPath);
      const promises: PromiseAndPath[] = [];
      for (const x of directoryContents) {
        const newPath = path.join(currentPath, x);
        promises.push({
          path: newPath,
          promise: lstat(newPath),
        });
      }
      const stats = await Promise.all(
        promises.flatMap(({ promise }) => promise)
      );
      totalSize += stats.reduce((total, file, index) => {
        if (file.isDirectory()) {
          pathsToAnalyzed.push(promises[index].path);
          return total;
        } else {
          return total + file.size;
        }
      }, 0);
    } catch (e) {
      // Manejar el error
    }
  }

  return totalSize;
}
