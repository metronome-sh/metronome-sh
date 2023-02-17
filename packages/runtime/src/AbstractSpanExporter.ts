import { AbstractSpan } from "./AbstractSpan";

let noApiKeyWarningLogged = false;

export abstract class AbstractSpanExporter {
  private apiKey: string | undefined;
  private metronomeUrl: string | undefined;
  private metronomeDebug: string | undefined;

  abstract send(span: AbstractSpan | AbstractSpan[]): void | Promise<void>;

  protected getApiKey(): string | undefined {
    return this.apiKey;
  }

  protected getUrl(): string {
    return this.metronomeUrl ?? "https://metrics.metronome.sh";
  }

  protected getDebug(): boolean {
    return this.metronomeDebug === "true";
  }

  constructor({
    apiKey,
    metronomeUrl,
    metronomeDebug,
  }: {
    apiKey: string | undefined;
    metronomeUrl: string | undefined;
    metronomeDebug: string | undefined;
  }) {
    this.apiKey = apiKey;
    this.metronomeUrl = metronomeUrl;
    this.metronomeDebug = metronomeDebug;
  }
}
