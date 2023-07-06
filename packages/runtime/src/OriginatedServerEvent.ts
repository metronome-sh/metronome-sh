import { OriginatedEvent } from "./OriginatedEvent";
import { EventOrigin, ServerEvent } from "./runtime.types";

export abstract class OriginatedServerEvent extends OriginatedEvent<ServerEvent> {
  protected origin = EventOrigin.Server;
  protected abstract timestamp(): bigint;

  public end() {
    if (this.event.data.timestamp) {
      this.event.data.duration = this.timestamp() - this.event.data.timestamp;
    }

    this.event.data.duration = 0n;
  }
}
