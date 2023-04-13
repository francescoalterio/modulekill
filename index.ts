import inquirer from "inquirer";
import { filterAllModules } from "./src/utils/filterAllModules.js";
import { getModuleSizesInMB } from "./src/utils/getModuleSizes.js";

import fs from "fs";

export interface ModulePath {
  path: string;
  size: string;
  isDeleted: boolean;
}

let state: ModulePath[] = [];

filterAllModules(process.cwd())
  .then(getModuleSizesInMB)
  .then((data) => {
    state = data.map((x) => ({ isDeleted: false, ...x }));
    createDeleteScreen();
  });

function createDeleteScreen() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "moduleToDelete",
        message: "Select the routes to delete",
        choices: state.map(
          ({ path, size, isDeleted }) =>
            `[${isDeleted ? "DELETED" : size + " MB"}] ${path}`
        ),
      },
    ])
    .then(async (answers) => {
      const path = answers.moduleToDelete.split(" ")[2];
      fs.promises.rm(path, { recursive: true }).then(() => {
        state = state.map((module) =>
          module.path === path ? { ...module, isDeleted: true } : module
        );
        createDeleteScreen();
      });
    });
}
