import fs from "fs";
import path from "path";

let cachedResult: string | null | undefined;
let notFoundWarning = false;

export const findConfigFile = (directories: string[]): string | null => {
  if (cachedResult !== undefined) {
    return cachedResult;
  }

  for (const startDir of directories) {
    let currentDir = startDir;

    while (currentDir !== path.parse(currentDir).root) {
      if (fs.existsSync(path.join(currentDir, "metronome.config.js"))) {
        cachedResult = `${currentDir}/metronome.config.js`;
        return cachedResult;
      }
      currentDir = path.dirname(currentDir);
    }
  }

  cachedResult = null;
  return null;
};
