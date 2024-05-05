import { CloudflareContext, MetronomeResolvedConfig } from "../types";

export abstract class Exporter {
  private cloudflareContext: CloudflareContext | undefined;

  constructor(readonly config: MetronomeResolvedConfig) {}
  abstract pathname: string;
  private exportables: Promise<any>[] = [];

  public flush(): Promise<void> {
    return Promise.all(this.exportables).then(() => {
      this.exportables = [];
    });
  }

  public setCloudflareContext(context: CloudflareContext | undefined) {
    this.cloudflareContext = context;
  }

  public export<T extends object>(exportable: T): void {
    const apiKey = this.config.apiKey
      ? // Config
        this.config.apiKey
      : // Cloudflare
      this.cloudflareContext?.env?.METRONOME_API_KEY
      ? this.cloudflareContext?.env?.METRONOME_API_KEY
      : // Node
      typeof process !== "undefined"
      ? process.env.METRONOME_API_KEY
      : null;

    if (!apiKey) {
      console.log("Metronome: Cannot export: No API key provided");
      return;
    }

    const url = new URL(this.pathname, this.config.endpoint);

    const data = JSON.stringify([exportable], (_, v) => {
      return typeof v === "bigint" ? v.toString() : v;
    });

    if (this.config.debug) console.log(`Metronome: Sending metric data to metronome: \n${data}`);

    const promise = fetch(url, {
      body: data,
      method: "POST",
      headers: { "Content-Type": "application/json", "x-api-key": apiKey! },
    });

    this.exportables.push(promise);

    try {
      promise.catch((error) => {
        if (this.config.debug) {
          console.error(`Metronome: Metric data was not sent to metronome`);
          console.error(error);
        }
      });
    } catch (error) {
      if (this.config.debug) {
        console.error(`Metronome: Metric data was not sent to metronome`);
        console.error(error);
      }
    }
  }
}
