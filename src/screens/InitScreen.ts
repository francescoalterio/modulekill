import chalk from "chalk";
import inquirer from "inquirer";

export async function InitScreen() {
  console.log(
    chalk.yellow(
      "We recommend running ModuleKill in your working folder to reduce the wait time.\n"
    )
  );
  return await inquirer.prompt([
    {
      type: "confirm",
      name: "init",
      message: "Do you want to run ModuleKill in this folder?",
    },
  ]);
}
