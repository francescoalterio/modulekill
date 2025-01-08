import { readdir, lstat } from "node:fs/promises";
import path from "node:path";
import { glob } from "glob";

export async function filterAllModules(): Promise<string[]> {
  let data: string[] = [];
  try {
    const nodeModules: string[] = await glob("**/node_modules", {
      includeChildMatches: false,
    });
    data = nodeModules.map((x) => path.join(process.cwd(), x));
  } catch (error) {}
  return data;
}
