export interface MetronomeConfig {
  endpoint?: string | null;
  ignoredRoutes?: (string | RegExp)[];
  ignoredPathnames?: (string | RegExp)[];
  ignoreHeadMethod?: boolean;
}
