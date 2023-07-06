import { OriginatedServerEvent } from "@metronome-sh/runtime";

export class NodeOriginatedServerEvent extends OriginatedServerEvent {
  protected timestamp() {
    return process.hrtime.bigint();
  }
}
