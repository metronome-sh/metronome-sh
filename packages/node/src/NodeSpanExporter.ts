import { AbstractSpanExporter } from "@metronome-sh/runtime";
import { NodeSpan } from "./NodeSpan";

export class NodeSpanExporter extends AbstractSpanExporter {
  private noApiKeyWarningLogged = false;

  send(span: NodeSpan | NodeSpan[]): Promise<void> {
    const apiKey = this.getApiKey();

    if (!apiKey) {
      if (!this.noApiKeyWarningLogged) {
        // prettier-ignore
        console.warn("No METRONOME_API_KEY environment variable set. No spans will be sent to Metronome.");
        this.noApiKeyWarningLogged = true;
      }
      return Promise.resolve();
    }

    const spans = Array.isArray(span) ? span : [span];

    // @remix/server-runtime is getting bundled in the browser
    // so we need to check for it here
    // https://github.com/remix-run/remix/issues/550
    if (typeof window !== "undefined") {
      return Promise.resolve();
    }

    const http = require("http");
    const https = require("https");

    const { hostname, protocol, port } = new URL(this.getUrl());

    const options = {
      hostname,
      port,
      path: "/insights",
      method: "POST",
      headers: { "Content-Type": "application/json", ApiKey: apiKey },
    };

    // prettier-ignore
    const request = protocol.startsWith('https') ? https.request(options) : http.request(options);

    const prepared = JSON.stringify({
      spans: spans.map((span) => span.prepared()),
    });

    if (this.getDebug()) {
      console.debug(
        JSON.stringify({ spans: spans.map((span) => span.prepared()) }, null, 2)
      );
    }

    request.write(prepared, "utf-8");

    // This only waits for the request to be sent
    // We don't need the response
    return new Promise<void>((resolve) => {
      request.on("error", (error: Error) => {
        resolve();
      });

      // 300ms timeout to prevent locking up
      const timeoutId = setTimeout(() => {
        // prettier-ignore
        console.warn("Metronome: Metric data was not sent to metronome after 300 milliseconds timeout");
        resolve();
      }, 300);

      request.end(() => {
        clearTimeout(timeoutId);
        resolve();
      });
    });
  }
}
