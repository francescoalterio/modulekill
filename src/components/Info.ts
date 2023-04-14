import chalk from "chalk";

export function Info(
  spaceTaken: number,
  spaceFreed: number,
  timeToAnalyze: number
) {
  const ScreenData = `\n${chalk.blue("Space taken:")} ${spaceTaken.toFixed(
    2
  )} MB | ${chalk.yellow("Space freed:")} ${spaceFreed.toFixed(
    2
  )} MB | ${chalk.green("Data found in:")} ${timeToAnalyze}s\n\n`;
  console.log(ScreenData);
}
