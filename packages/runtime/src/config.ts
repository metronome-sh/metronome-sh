import type { LoadedMetronomeConfig, MetronomeConfig } from "./types";

const defaultConfig: MetronomeConfig = {
  ignoredPathnames: [],
  ignoredRoutes: [],
};

let loadedConfig: MetronomeConfig;

export function config(configPath?: string): LoadedMetronomeConfig {
  function shouldIgnoreRoute(routeId: string) {}

  function shouldIgnorePathname(urlString?: string) {
    if (!urlString) return false;

    const { pathname } = new URL(urlString);

    return !!loadedConfig.ignoredPathnames?.some((pathnamePattern) => {
      if (typeof pathnamePattern === "string") {
        return pathname === pathnamePattern;
      }

      return pathname.match(pathnamePattern);
    });
  }

  // function shouldIgnorePathname(pathname: string, config: MetronomeConfig) {
  //   return config.ignoredPathnames.some((path) => {
  //     if (typeof path === "string") {
  //       return pathname === path;
  //     } else if (path instanceof RegExp) {
  //       return path.test(pathname);
  //     }
  //   });
  // }

  if (!loadedConfig) {
    //
  }

  // console.log()

  return { config: loadedConfig, shouldIgnoreRoute, shouldIgnorePathname };
}
