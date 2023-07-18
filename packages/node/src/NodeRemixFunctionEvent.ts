import { RemixFunctionEvent } from "@metronome-sh/runtime";

export class NodeRemixFunctionEvent extends RemixFunctionEvent {
  protected now(): bigint {
    return process.hrtime.bigint();
  }
}
