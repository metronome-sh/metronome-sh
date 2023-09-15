import fs from "fs";
import path from "path";
import { pathToFileURL } from "url";

let cachedResult: string | null;
let notFoundWarning = false;

export const findConfigFile = (directories: string[]): string | null => {
  if (cachedResult !== undefined) {
    return cachedResult;
  }

  for (const startDir of directories) {
    let currentDir = startDir;

    while (currentDir !== path.parse(currentDir).root) {
      if (fs.existsSync(path.join(currentDir, "metronome.config.js"))) {
        cachedResult = pathToFileURL(
          `${currentDir}/metronome.config.js`
        ).toString();

        return cachedResult;
      }
      currentDir = path.dirname(currentDir);
    }
  }

  cachedResult = null;
  return null;
};
