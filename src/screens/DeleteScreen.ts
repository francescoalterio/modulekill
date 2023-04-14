import inquirer from "inquirer";
import fs from "fs";
import { Title } from "../components/Title.js";
import chalk from "chalk";
import { Info } from "../components/Info.js";
import { DeletingScreen } from "./DeletingScreen.js";

export interface ModulePath {
  path: string;
  size: string;
  isDeleted?: boolean;
}

export interface DeleteScreenOptions {
  timeToAnalyze: number;
  spaceTaken: number;
}

let spaceFreed = 0;

export function DeleteScreen(
  modulePaths: ModulePath[],
  { timeToAnalyze, spaceTaken }: DeleteScreenOptions
) {
  console.clear();
  Title();

  Info(spaceTaken, spaceFreed, timeToAnalyze);
  inquirer
    .prompt([
      {
        type: "list",
        name: "moduleToDelete",
        message: "Select the routes to delete",
        choices: modulePaths.map(
          ({ path, size, isDeleted }) =>
            `${
              isDeleted
                ? chalk.green("[DELETED]")
                : chalk.yellow("[" + size + " MB]")
            } ${path}`
        ),
      },
    ])
    .then(async (answers) => {
      const path = answers.moduleToDelete.split(" ")[2];

      console.clear();
      const spinner = DeletingScreen(
        path,
        { spaceTaken, spaceFreed, timeToAnalyze },
        modulePaths.find((x) => x.path === path)?.size
      );
      fs.promises.rm(path, { recursive: true }).then(() => {
        spinner.success();
        modulePaths = modulePaths.map((module) => {
          if (module.path === path) {
            spaceTaken = spaceTaken - Number(module.size);
            spaceFreed = spaceFreed + Number(module.size);
            return { ...module, isDeleted: true };
          } else {
            return module;
          }
        });
        console.clear();
        DeleteScreen(modulePaths, { timeToAnalyze, spaceTaken });
      });
    });
}
