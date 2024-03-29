import { MetronomeInternalConfig } from "../types";
import fetch from "node-fetch";

export abstract class Exporter {
  constructor(readonly config: MetronomeInternalConfig) {}

  protected abstract prepare(data: any): unknown;

  public export<T extends object>(exportable: T): void {
    if (!this.config.apiKey) {
      console.log("Metronome: Cannot export: No API key provided");
      return;
    }

    const prepared = this.prepare(exportable);

    if (!prepared) {
      console.log("Metronome: Cannot export: ", exportable);
      return;
    }

    const url = `${this.config.endpoint}/v4/process`;

    const data = JSON.stringify([prepared], (_, v) => {
      return typeof v === "bigint" ? v.toString() : v;
    });

    if (this.config.debug) console.log(`Metronome: Sending metric data to metronome: \n${data}`);

    try {
      fetch(url, {
        body: data,
        method: "POST",
        headers: { "Content-Type": "application/json", ApiKey: this.config.apiKey! },
      }).catch((error) => {
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
