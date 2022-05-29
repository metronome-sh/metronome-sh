import { METRONOME_CONTEXT_KEY } from "./constants";
import type { AbstractSpan } from "./AbstractSpan";
import { AbstractSpanExporter } from "./AbstractSpanExporter";

export type Meta = {
  routeId: string;
} & ProjectMeta;

export type ProjectMeta = {
  metronomeVersion: string;
  version: string;
  hash: string;
};

export interface MetronomeConfig {
  ignoredRoutes?: (string | RegExp)[];
  ignoredPathnames?: (string | RegExp)[];
}

export interface LoadedMetronomeConfig {
  config: MetronomeConfig;
  shouldIgnoreRoute: (routeId: string) => boolean;
  shouldIgnorePathname: (urlString?: string) => boolean;
}

type SpanClass = new (
  ...args: ConstructorParameters<typeof AbstractSpan>
) => AbstractSpan;

export interface ContextWithMetronome extends Record<string, any> {
  [METRONOME_CONTEXT_KEY]?: {
    hash: string;
    metronomeVersion: string;
    metronomeConfig: LoadedMetronomeConfig;
    rootSpan?: AbstractSpan;
    version: string;
    exporter: AbstractSpanExporter;
    SpanClass: SpanClass;
  };
}

export interface GetLoadContextOptions {
  configPath?: string;
}
