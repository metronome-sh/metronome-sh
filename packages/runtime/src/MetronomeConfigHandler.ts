import type { MetronomeConfig } from "./types";
import fs from "fs";

const defaultConfig: MetronomeConfig = {};

export class MetronomeConfigHandler {
  private config: MetronomeConfig;

  constructor(configPath: string) {
    if (!fs.existsSync(configPath)) {
      this.config = defaultConfig;
    }

    try {
      this.config = require(configPath);
    } catch (error) {
      throw new Error(`Failed to load config file: ${configPath}`);
    }

    console.log({ config: this.config });
  }
}

// export function config(configPath?: string): LoadedMetronomeConfig {
//   function shouldIgnoreRoute(routeId: string) {}

//   function shouldIgnorePathname(urlString?: string) {
//     if (!urlString) return false;

//     const { pathname } = new URL(urlString);

//     return !!loadedConfig.ignoredPathnames?.some((pathnamePattern) => {
//       if (typeof pathnamePattern === "string") {
//         return pathname === pathnamePattern;
//       }

//       return pathname.match(pathnamePattern);
//     });
//   }

//   // function shouldIgnorePathname(pathname: string, config: MetronomeConfig) {
//   //   return config.ignoredPathnames.some((path) => {
//   //     if (typeof path === "string") {
//   //       return pathname === path;
//   //     } else if (path instanceof RegExp) {
//   //       return path.test(pathname);
//   //     }
//   //   });
//   // }

//   if (!loadedConfig) {
//     //
//   }

//   // console.log()

//   // return { config: loadedConfig, shouldIgnoreRoute, shouldIgnorePathname };
// }
