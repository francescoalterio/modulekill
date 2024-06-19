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
      size: (fileSizes / 1000000).toFixed(2),
    }))
  );
}
