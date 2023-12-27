export interface MetronomeConfig {
  endpoint?: string | null;
  ignoredRoutes?: (string | RegExp)[];
  ignoredPathnames?: (string | RegExp)[];
  ignoreHeadMethod?: boolean;
  doNotTrack?: (
    request: Request
  ) => boolean | undefined | null | Promise<boolean | undefined | null>;
}
