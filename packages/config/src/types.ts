export interface MetronomeConfig {
  ignoredRoutes?: (string | RegExp)[];
  ignoredPathnames?: (string | RegExp)[];
  ignoreHeadMethod?: boolean;
}
