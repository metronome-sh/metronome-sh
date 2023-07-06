import { AbstractSpan } from "@metronome-sh/runtime";
export { SpanName } from "@metronome-sh/runtime";

export class CloudflareSpan extends AbstractSpan {
  getStartTime() {
    return BigInt(0);
  }

  getEndTime() {
    return BigInt(0);
  }
}
