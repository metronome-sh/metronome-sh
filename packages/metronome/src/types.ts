import { ServerBuild } from "@remix-run/server-runtime";

export type Routes = Record<string, ServerBuild["routes"][string]>;

export type RouteMap = Record<
  string,
  {
    id: string;
    parentId: string | undefined;
    path: string | undefined;
  }
>;

export type HeaderAllowlist = string[] | "all" | undefined;

export interface MetronomeConfig {
  endpoint?: string | null;
  ignoredRoutes?: (string | RegExp)[];
  ignoredPathnames?: (string | RegExp)[];
  headersAllowlist?: HeaderAllowlist;
}

export interface RemixPackages {
  remixPackages: Record<string, string>;
}

export type MetronomeConfigWithRemixPackages = MetronomeConfig & RemixPackages;

export interface MetronomeWrapperOptions {
  type: "action" | "loader";
  routeId: string;
  version: string;
  routePath?: string;
  config: MetronomeConfigWithRemixPackages;
}
