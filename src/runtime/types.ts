import type { createRequestHandler } from "@remix-run/server-runtime/server";
import type {
  callRouteAction,
  callRouteLoader,
} from "@remix-run/server-runtime/data";

export type Meta = {
  metronomeVersion: string;
  version: string;
  hash: string;
};

export type CreateRequestHandlerFn = typeof createRequestHandler;

export type CallRouteActionFn = typeof callRouteAction;

export type CallRouteLoaderFn = typeof callRouteLoader;
