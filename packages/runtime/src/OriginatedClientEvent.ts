import { OriginatedEvent } from "./OriginatedEvent";
import { ClientEvent, EventOrigin } from "./runtime.types";

export class OriginatedClientEvent extends OriginatedEvent<ClientEvent> {
  protected origin = EventOrigin.Client;

  protected timestamp() {
    throw new Error("OriginatedClientEvent must have a timestamp");
    return 0n;
  }
}
