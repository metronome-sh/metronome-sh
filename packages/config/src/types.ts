export interface MetronomeConfig {
  ignoredRoutes?: (string | RegExp)[];
  ignoredPathnames?: (string | RegExp)[];
  ignoreHeadMethod?: boolean;
  doNotTrack?: (request: Request) => Promise<boolean | undefined | null>;
}
