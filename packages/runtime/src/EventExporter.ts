import { MetronomeEvent } from "./events";

export abstract class EventExporter {
  private endpoint: string;
  private apiKey: string | undefined;
  private metronomeDebug: string | undefined;
  private metronomeSuppressWarnings: string | undefined;

  protected noApiKeyWarningLogged = false;

  abstract send(
    events: MetronomeEvent<any> | MetronomeEvent<any>[]
  ): Promise<void>;

  constructor({
    endpoint,
    apiKey,
    metronomeDebug,
    metronomeSuppressWarnings,
  }: {
    endpoint: string;
    apiKey: string | undefined;
    metronomeDebug: string | undefined;
    metronomeSuppressWarnings: string | undefined;
  }) {
    this.apiKey = apiKey;
    this.endpoint = endpoint;
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
    return this.endpoint;
  }

  protected getDebug(): boolean {
    return this.metronomeDebug === "true";
  }
}
