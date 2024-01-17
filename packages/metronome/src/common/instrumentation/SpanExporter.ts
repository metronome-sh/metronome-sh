import { MetronomeInternalConfig } from "../types";
import { Span } from "./Span";

export class SpanExporter {
  constructor(readonly config: MetronomeInternalConfig) {}

  export(span: Span) {
    console.log(JSON.stringify(span, null, 2));
  }
}
