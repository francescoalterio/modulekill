import { createSpinner } from "nanospinner";
import { Info } from "../components/Info.js";
import { Title } from "../components/Title.js";

export function DeletingScreen(
  path: string,

  {
    spaceTaken,
    spaceFreed,
    timeToAnalyze,
  }: { spaceTaken: number; spaceFreed: number; timeToAnalyze: number },
  size?: string
) {
  console.clear();
  Title();
  Info(spaceTaken, spaceFreed, timeToAnalyze);
  const spinner = createSpinner(
    `Removing ${size} MB from the path ${path}`
  ).start();
  return spinner;
}
