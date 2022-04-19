import { METRONOME_CONTEXT_KEY } from "./contants";
import type { Span } from "./transport/span";

export type Meta = {
  routeId: string;
} & ProjectMeta;

export type ProjectMeta = {
  metronomeVersion: string;
  version: string;
  hash: string;
};

export type ContextWithMetronome = Record<string, any> & {
  [METRONOME_CONTEXT_KEY]?: {
    rootSpan?: Span;
    isInternalRequest: boolean;
    metronomeVersion?: string;
    version?: string;
    hash?: string;
    routeId?: string;
  };
};
