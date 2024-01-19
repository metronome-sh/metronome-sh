import { ServerBuild } from "@remix-run/server-runtime";
import { type AssetsManifest } from "@remix-run/server-runtime/dist/entry";

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
  /**
   * @description You should not use as your API key will be bundled in your server side code. Set `METRONOME_API_KEY` environment variable instead.
   */
  apiKey?: string | null;
  ignoredRoutes?: (string | RegExp)[];
  ignoredPathnames?: (string | RegExp)[];
  headersAllowlist?: HeaderAllowlist;
  debug?: boolean;
}

export interface MetronomeInternalConfig extends Omit<MetronomeConfig, "endpoint"> {
  remixPackages: Record<string, string>;
  endpoint: string;
}

export interface MetronomeWrapperOptions {
  type: "action" | "loader";
  routeId: string;
  routePath?: string;
  config: MetronomeInternalConfig;
  assetsManifest: Pick<AssetsManifest, "version">;
}

export type RegexpRouteMap = Record<
  string,
  {
    id: string;
    parentId: string | undefined;
    path: string | undefined;
    regexp: RegExp;
  }
>;

export type OtelAttribute =
  | string
  | number
  | bigint
  | boolean
  | Array<OtelAttribute>
  | { [key: string]: OtelAttribute };

export type OtelContext = {
  traceId: string;
};

export type AsyncLocalStore = {
  traceId: string;
  requestResolvedAttributes?: Record<string, OtelAttribute>;
};
