import { METRONOME_CONTEXT_KEY } from "./constants";
import type { AbstractSpan } from "./AbstractSpan";
import type {
  MetronomeConfig,
  MetronomeConfigHandler,
} from "@metronome-sh/config";
import type { EventExporter } from "./EventExporter";
import { z } from "zod";
import {
  BrowserDataSchema,
  ClientErrorEventSchema,
  ClientEventSchema,
  EventSchema,
  NavigateAwayEventSchema,
  PageviewEventSchema,
  RemixDataSchema,
  RequestEventSchema,
  WebVitalEventSchema,
} from "./schemas";
import { OriginatedServerEvent } from "./OriginatedServerEvent";

type OriginatedServerEventClass = new (
  ...args: ConstructorParameters<typeof OriginatedServerEvent>
) => OriginatedServerEvent;

export interface ContextWithMetronome extends Record<string, any> {
  [METRONOME_CONTEXT_KEY]?: {
    hash: string;
    metronomeVersion: string;
    adapter: string;
    ip: string;
    config: MetronomeConfigHandler;
    exporter: EventExporter;
    rootSpan?: AbstractSpan;
    OriginatedServerEventClass: OriginatedServerEventClass;
  };
}

export interface GetLoadContextOptions {
  configPath?: string;
  config?: MetronomeConfig;
  mode?: string;
}

export enum EventOrigin {
  Client = "client",
  Server = "server",
}

export type Identifier = { ip: string; ua: string | null };

export type MetronomeInfo = { adapter: string; version: string };

// Client events
export type WebVitalEvent = z.infer<typeof WebVitalEventSchema>;
export type PageviewEvent = z.infer<typeof PageviewEventSchema>;
export type ClientErrorEvent = z.infer<typeof ClientErrorEventSchema>;
export type NavigateAwayEvent = z.infer<typeof NavigateAwayEventSchema>;

export type ClientEvent = z.infer<typeof ClientEventSchema>;

// Server events
export type BrowserData = z.infer<typeof BrowserDataSchema>;
export type RemixData = z.infer<typeof RemixDataSchema>;
export type RequestEvent = z.infer<typeof RequestEventSchema>;

export type ServerEvent = z.infer<typeof RequestEventSchema>;

// Generic event
export type Event = z.infer<typeof EventSchema>;
