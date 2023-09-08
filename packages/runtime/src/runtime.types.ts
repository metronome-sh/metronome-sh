import { METRONOME_CONTEXT_KEY } from "./constants";
import type {
  MetronomeConfig,
  MetronomeConfigHandler,
} from "@metronome-sh/config";
import type { EventExporter } from "./EventExporter";
import { z } from "zod";

import {
  BrowserDataSchema,
  ClientErrorIncomingEventSchema,
  PageviewIncomingEventSchema,
  RemixFunctionEvent,
  WebVitalIncomingEventSchema,
} from "./events";

type RemixFunctionEventClass = new (
  ...args: ConstructorParameters<typeof RemixFunctionEvent>
) => RemixFunctionEvent;

export interface ContextWithMetronome extends Record<string, any> {
  [METRONOME_CONTEXT_KEY]?: {
    adapter: string;
    hash: string;
    metronomeVersion: string;
    ip: string;
    config: MetronomeConfigHandler;
    exporter: EventExporter;
    RemixFunctionEventClass: RemixFunctionEventClass;
  };
}

export interface GetLoadContextOptions {
  configPath?: string;
  config?: MetronomeConfig;
  mode?: string;
}

export type BrowserData = z.infer<typeof BrowserDataSchema>;

export type PageviewIncomingEventData = z.infer<
  typeof PageviewIncomingEventSchema
>;
export type WebVitalIncomingEventData = z.infer<
  typeof WebVitalIncomingEventSchema
>;
export type ClientErrorIncomingEventData = z.infer<
  typeof ClientErrorIncomingEventSchema
>;

export type IncomingEventData =
  | PageviewIncomingEventData
  | WebVitalIncomingEventData
  | ClientErrorIncomingEventData;

export type RouteMap = Record<
  string,
  {
    id: string;
    parentId: string | undefined;
    path: string | undefined;
  }
>;

export type RegexpRouteMap = Record<
  string,
  {
    id: string;
    parentId: string | undefined;
    path: string | undefined;
    regexp: RegExp;
  }
>;
