import { OriginatedEvent } from "./OriginatedEvent";
import { ClientEvent, ServerEvent } from "./runtime.types";

export abstract class EventExporter {
  private apiKey: string | undefined;
  private metronomeUrl: string | undefined;
  private metronomeDebug: string | undefined;
  private metronomeSuppressWarnings: string | undefined;

  protected noApiKeyWarningLogged = false;

  abstract send(
    events: OriginatedEvent<ClientEvent | ServerEvent>[]
  ): Promise<void>;

  constructor({
    apiKey,
    metronomeUrl,
    metronomeDebug,
    metronomeSuppressWarnings,
  }: {
    apiKey: string | undefined;
    metronomeUrl: string | undefined;
    metronomeDebug: string | undefined;
    metronomeSuppressWarnings: string | undefined;
  }) {
    this.apiKey = apiKey;
    this.metronomeUrl = metronomeUrl;
    this.metronomeDebug = metronomeDebug;
    this.metronomeSuppressWarnings = metronomeSuppressWarnings;
  }

  protected getApiKey(): string | undefined {
    if (!this.apiKey && !this.noApiKeyWarningLogged) {
      // prettier-ignore
      if (this.metronomeSuppressWarnings !== "true" && typeof console !== "undefined") {
        // prettier-ignore
        console.warn("No METRONOME_API_KEY environment variable set. No data will be sent to Metronome.");
      }
      this.noApiKeyWarningLogged = true;
    }

    return this.apiKey;
  }

  protected getUrl(): string {
    return this.metronomeUrl ?? "https://metrics.metronome.sh/v1/process";
  }

  protected getDebug(): boolean {
    return this.metronomeDebug === "true";
  }

  protected encode(events: OriginatedEvent<ClientEvent | ServerEvent>[]) {
    return JSON.stringify(events);
  }
}
