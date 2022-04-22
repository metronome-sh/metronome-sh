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

export interface ContextWithMetronome extends Record<string, any> {
  [METRONOME_CONTEXT_KEY]?: {
    hash: string;
    metronomeVersion: string;
    rootSpan?: AbstractSpan;
    version: string;
    exporter: AbstractSpanExporter;
    SpanClass: new (
      ...args: ConstructorParameters<typeof AbstractSpan>
    ) => AbstractSpan;
  };
}
