import { createRegisterMetronomeFunction } from "@metronome-sh/runtime";
import { SpanExporter } from "./SpanExporter";
import { Span } from "./Span";

export const registerMetronome = createRegisterMetronomeFunction(
  SpanExporter,
  Span
);
