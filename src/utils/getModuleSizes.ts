import { getDirSize } from "./getDirSize.js";

export function getModuleSizesInMB(modules: string[]) {
  return Promise.all(
    modules.map(async (module: string) => {
      const fileSizes = await getDirSize(module);
      return {
        fileSizes,
        path: module,
      };
    })
  ).then((sizes) =>
    sizes.map(({ path, fileSizes }) => ({
      path,
      size: (
        fileSizes.reduce((acc: number, bytes: number) => acc + bytes, 0) /
        1000000
      ).toFixed(2),
    }))
  );
}
