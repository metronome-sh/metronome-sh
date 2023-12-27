import { existsSync } from "fs";
import { parse, join, dirname } from "path";
import { pathToFileURL } from "url";

let cachedResult: string | null;

export const findConfigFile = (directories: string[]): string | null => {
  if (cachedResult !== undefined) {
    return cachedResult;
  }

  for (const startDir of directories) {
    let currentDir = startDir;

    while (currentDir !== parse(currentDir).root) {
      if (existsSync(join(currentDir, "metronome.config.js"))) {
        cachedResult = pathToFileURL(
          `${currentDir}/metronome.config.js`
        ).toString();

        return cachedResult;
      }
      currentDir = dirname(currentDir);
    }
  }

  cachedResult = null;
  return null;
};
