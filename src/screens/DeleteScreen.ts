import inquirer from "inquirer";
import fs from "fs";
import { Title } from "../components/Title.js";
import chalk from "chalk";

export interface ModulePath {
  path: string;
  size: string;
  isDeleted?: boolean;
}

export interface DeleteScreenOptions {
  timeToAnalyze: number;
  spaceTaken: number;
}

export function DeleteScreen(
  modulePaths: ModulePath[],
  { timeToAnalyze, spaceTaken }: DeleteScreenOptions
) {
  console.clear();
  Title();

  const ScreenData = `\n${chalk.blue(
    "Space taken:"
  )} ${spaceTaken} MB | ${chalk.yellow("Space freed:")} ${0} MB | ${chalk.green(
    "Data found in:"
  )} ${timeToAnalyze}s\n\n`;
  console.log(ScreenData);

  inquirer
    .prompt([
      {
        type: "list",
        name: "moduleToDelete",
        message: "Select the routes to delete",
        choices: modulePaths.map(
          ({ path, size, isDeleted }) =>
            `[${isDeleted ? "DELETED" : size + " MB"}] ${path}`
        ),
      },
    ])
    .then(async (answers) => {
      const path = answers.moduleToDelete.split(" ")[2];
      fs.promises.rm(path, { recursive: true }).then(() => {
        modulePaths = modulePaths.map((module) =>
          module.path === path ? { ...module, isDeleted: true } : module
        );
        console.clear();
        DeleteScreen(modulePaths, { timeToAnalyze, spaceTaken });
      });
    });
}
