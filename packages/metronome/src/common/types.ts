import { ActionFunctionArgs, LoaderFunctionArgs, ServerBuild } from "@remix-run/server-runtime";
import { type EventContext } from "@cloudflare/workers-types";

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
  debug?: boolean;
  unstable_sourceMaps?: boolean;
  /**
   * @description Exclude requests from being tracked by Metronome
   */
  unstable_exclude?: (args: UnstableExcludeArgs) => boolean | Promise<boolean>;
  unstable_excludeTimeout?: number;
}

type UnstableExcludeArgs = {
  request: LoaderFunctionArgs["request"] | ActionFunctionArgs["request"];
  context: LoaderFunctionArgs["context"] | ActionFunctionArgs["context"];
  params: LoaderFunctionArgs["params"] | ActionFunctionArgs["params"];
};

export interface MetronomeResolvedConfig
  extends Omit<MetronomeConfig, "endpoint" | "unstable_excludeTimeout"> {
  endpoint: string;
  remixPackages: Record<string, string>;
  version: string;
  unstable_excludeTimeout: number;
}

export interface MetronomeWrapperOptions {
  type: "action" | "loader";
  routeId: string;
  routePath?: string;
  config: MetronomeResolvedConfig;
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
  doNotTrack?: boolean;
  doNotTrackErrors?: boolean;
  requestResolvedAttributes?: Record<string, OtelAttribute>;
};

export type DoNotTrackOptions = {
  doNotTrackErrors: boolean;
};

export type CloudflareLoadContext<
  Env = { [key: string]: string },
  Params extends string = any,
  Data extends Record<string, unknown> = Record<string, unknown>
> = {
  cloudflare?: CloudflareContext<Env, Params, Data>;
};

export type CloudflareContext<
  Env = { [key: string]: string },
  Params extends string = any,
  Data extends Record<string, unknown> = Record<string, unknown>
> = EventContext<Env, Params, Data> & {
  cf: EventContext<Env, Params, Data>["request"]["cf"];
  ctx: {
    waitUntil: EventContext<Env, Params, Data>["waitUntil"];
    passThroughOnException: EventContext<Env, Params, Data>["passThroughOnException"];
  };
  caches: CacheStorage;
};
