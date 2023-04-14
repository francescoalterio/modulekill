#!/usr/bin/env node

import { filterAllModules } from "./src/utils/filterAllModules.js";
import { getModuleSizesInMB } from "./src/utils/getModuleSizes.js";

import { AnalyzingScreen } from "./src/screens/AnalyzingScreen.js";
import { DeleteScreen } from "./src/screens/DeleteScreen.js";

const startingTime = Date.now();

console.clear();
const analyzingSpinner = AnalyzingScreen();

filterAllModules(process.cwd())
  .then(getModuleSizesInMB)
  .then((data) => {
    const timeToAnalyze = (Date.now() - startingTime) / 1000;
    const spaceTaken = data.reduce(
      (acc, module) => acc + Number(module.size),
      0
    );
    analyzingSpinner.success();
    DeleteScreen(data, { timeToAnalyze, spaceTaken });
  });
