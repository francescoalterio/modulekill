import { createSpinner } from "nanospinner";
import { Title } from "../components/Title.js";

export function AnalyzingScreen() {
  Title();

  const spinner = createSpinner(
    `Scanning the path ${process.cwd()} for node_modules directories`
  ).start();
  return spinner;
}
