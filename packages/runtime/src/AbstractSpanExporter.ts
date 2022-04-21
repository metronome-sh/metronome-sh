import { AbstractSpan } from "./AbstractSpan";

let noApiKeyWarningLogged = false;

export abstract class AbstractSpanExporter {
  protected apiKey: string | undefined;
  protected url: string;
  protected debug: boolean;

  abstract send(span: AbstractSpan | AbstractSpan[]): Promise<void>;

  constructor() {
    this.apiKey = process.env.METRONOME_API_KEY!;
    this.url = process.env.METRONOME_URL
      ? process.env.METRONOME_URL
      : "https://metronome.sh";

    this.debug = process.env.METRONOME_DEBUG === "true";

    if (!this.apiKey && !noApiKeyWarningLogged) {
      console.log("[Error] METRONOME_API_KEY environment variable is not set");
      noApiKeyWarningLogged = true;
    }
  }
}
