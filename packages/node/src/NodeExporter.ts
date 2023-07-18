import { EventExporter, MetronomeEvent } from "@metronome-sh/runtime";

export class NodeExporter extends EventExporter {
  send(
    eventOrEvents: MetronomeEvent<any> | MetronomeEvent<any>[]
  ): Promise<void> {
    const apiKey = this.getApiKey();

    if (!apiKey) return Promise.resolve();

    const http = require("http");
    const https = require("https");

    const { hostname, protocol, port, pathname } = new URL(this.getUrl());

    const options = {
      hostname,
      path: pathname,
      port,
      method: "POST",
      headers: { "Content-Type": "application/json", ApiKey: apiKey },
    };

    const request = protocol.startsWith("https")
      ? https.request(options)
      : http.request(options);

    const events = Array.isArray(eventOrEvents)
      ? eventOrEvents
      : [eventOrEvents];

    // bigint serialization
    const data = JSON.stringify(events, (_, v) => {
      return typeof v === "bigint" ? v.toString() : v;
    });

    if (this.getDebug()) {
      console.debug("Sending data to Metronome");
      console.log(data);
    }

    request.write(data, "utf-8");

    // This only waits for the request to be sent
    // We don't need the response
    return new Promise<void>((resolve) => {
      request.on("error", (error: Error) => {
        resolve();
      });

      // Prevent locking up the thread too much time
      const TIMEOUT = 500;

      const timeoutId = setTimeout(() => {
        // prettier-ignore
        if (this.getDebug()) {
          console.warn(`Metronome: Metric data was not sent to metronome after ${TIMEOUT} milliseconds timeout`);
        }
        resolve();
      }, TIMEOUT);

      request.end(() => {
        clearTimeout(timeoutId);
        resolve();
      });
    });
  }
}
