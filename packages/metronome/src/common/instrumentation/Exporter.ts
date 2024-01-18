import { MetronomeInternalConfig } from "../types";
import http from "node:http";
import https from "node:https";

export abstract class Exporter {
  constructor(readonly config: MetronomeInternalConfig) {}

  protected abstract prepare(data: any): unknown;

  public export<T extends object>(exportable: T): void {
    const prepared = this.prepare(exportable);

    if (!prepared) {
      console.log("Metronome: Cannot export: ", exportable);
      return;
    }

    const url = `${this.config.endpoint}/v4/process`;

    const { hostname, protocol, port, pathname } = new URL(url);

    const options = {
      hostname,
      path: pathname,
      port,
      method: "POST",
      headers: { "Content-Type": "application/json", ApiKey: this.config.apiKey! },
    };

    const data = JSON.stringify([prepared], (_, v) => {
      return typeof v === "bigint" ? v.toString() : v;
    });

    if (this.config.debug) console.log(`Metronome: Sending metric data to metronome: \n${data}`);

    try {
      const request = protocol.startsWith("https") ? https.request(options) : http.request(options);

      request.write(data, "utf-8");

      request.on("error", (error: Error) => {
        if (this.config.debug) {
          console.error(`Metronome: Metric data was not sent to metronome`);
          console.error(error);
        }

        request.removeAllListeners();
      });

      request.end(() => {
        request.removeAllListeners();
      });
    } catch (error) {
      if (this.config.debug) {
        console.error(`Metronome: Metric data was not sent to metronome`);
        console.error(error);
      }
    }
  }
}
