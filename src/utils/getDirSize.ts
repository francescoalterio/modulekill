import { readdir, lstat } from "node:fs/promises";
import path from "node:path";
import { type Stats } from "node:fs";

interface PromiseAndPath {
  newPath: string;
  stat: Stats;
}

export async function getDirSize(currentPath: string) {
  const pathsToAnalyzed = [currentPath];
  let totalSize = 0;

  while (pathsToAnalyzed.length > 0) {
    const currentPath = pathsToAnalyzed.pop() as string;
    try {
      const directoryContents = await readdir(currentPath);
      const statsPromises: Promise<PromiseAndPath>[] = [];
      for (let i = 0; i < directoryContents.length; i++) {
        const x = directoryContents[i];
        const newPath = path.join(currentPath, x);
        statsPromises.push(lstat(newPath).then((stat) => ({ stat, newPath })));
      }
      const stats = await Promise.all(statsPromises);
      for (let i = 0; i < stats.length; i++) {
        if (stats[i].stat.isDirectory()) {
          pathsToAnalyzed.push(stats[i].newPath);
        } else {
          totalSize += stats[i].stat.size;
        }
      }
    } catch (e) {
      // Manejar el error
    }
  }

  return totalSize;
}
