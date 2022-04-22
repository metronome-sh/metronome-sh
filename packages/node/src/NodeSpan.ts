import { AbstractSpan } from "@metronome-sh/runtime";
export { SpanName } from "@metronome-sh/runtime";

export class NodeSpan extends AbstractSpan {
  getStartTime() {
    return process.hrtime.bigint();
  }

  getEndTime() {
    return process.hrtime.bigint();
  }
}
