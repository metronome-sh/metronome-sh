import { EventOrigin, Event, MetronomeInfo, Identifier } from "./runtime.types";

export abstract class OriginatedEvent<T extends Event> {
  protected event: T;
  protected identifier: Identifier;
  protected metronome: MetronomeInfo;

  protected abstract origin: EventOrigin;
  protected abstract timestamp(): bigint;

  constructor({
    event,
    metronome,
    identifier,
  }: {
    event: T;
    metronome: MetronomeInfo;
    identifier: Identifier;
  }) {
    this.metronome = metronome;
    this.identifier = identifier;
    this.event = event;

    if (!this.event.data.timestamp) {
      this.event.data.timestamp = this.timestamp();
    }
  }

  public toJson(): string {
    return JSON.stringify(
      {
        origin: this.origin,
        event: this.event,
        identifier: this.identifier,
        metronome: this.metronome,
      },
      (_, v) => (typeof v === "bigint" ? v.toString() : v)
    );
  }
}
