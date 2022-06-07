import { METRONOME_CONTEXT_KEY } from "./constants";
import type { AbstractSpan } from "./AbstractSpan";
import { AbstractSpanExporter } from "./AbstractSpanExporter";
import type {
  MetronomeConfig,
  MetronomeConfigHandler,
} from "@metronome-sh/config";

export type Meta = {
  routeId: string;
} & ProjectMeta;

export type ProjectMeta = {
  metronomeVersion: string;
  version: string;
  hash: string;
};

type SpanClass = new (
  ...args: ConstructorParameters<typeof AbstractSpan>
) => AbstractSpan;

export interface ContextWithMetronome extends Record<string, any> {
  [METRONOME_CONTEXT_KEY]?: {
    config: MetronomeConfigHandler;
    exporter: AbstractSpanExporter;
    hash: string;
    metronomeVersion: string;
    rootSpan?: AbstractSpan;
    SpanClass: SpanClass;
  };
}

export interface GetLoadContextOptions {
  configPath?: string;
  config?: MetronomeConfig;
  mode?: string;
}
