import { METRONOME_CONTEXT_KEY } from "./constants";
import type { AbstractSpan } from "./AbstractSpan";

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
    hash: string;
    metronomeVersion: string;
    rootSpan?: AbstractSpan;
    version: string;
  };
};
