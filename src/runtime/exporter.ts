import { Span } from "./Span";
import { getApiKey } from "../helpers";

export const sendSpan = (span: Span) => {
  return sendSpans([span]);
};

export const sendSpans = (spans: Span[]) => {
  // @remix/server-runtime is getting bundled in the browser
  // so we need to check for it here
  // https://github.com/remix-run/remix/issues/550
  if (typeof window !== "undefined" || process.env.NODE_ENV === "development") {
    return Promise.resolve();
  }

  const http = require("http");
  const https = require("https");

  const apiKey = getApiKey();

  if (!apiKey) return Promise.resolve();

  // prettier-ignore
  const url = process.env.METRONOME_URL ? process.env.METRONOME_URL : 'https://metronome.sh';

  const { hostname, protocol, port } = new URL(url);

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

  if (process.env.METRONOME_DEBUG) {
    console.log(
      JSON.stringify({ spans: spans.map((span) => span.prepared()) }, null, 2)
    );
  }

  request.write(prepared, "utf-8");

  // This only waits for the request to be sent
  // We don't need the response
  return new Promise<void>((resolve) => {
    request.on("error", (error: Error) => {
      console.log(error);
      resolve();
    });

    // 300ms timeout to prevent locking up
    const timeoutId = setTimeout(() => {
      // prettier-ignore
      console.log("Metronome [warning]: metric data was not sent to metronome after 300 milliseconds timeout");
      resolve();
    }, 300);

    request.end(() => {
      clearTimeout(timeoutId);
      resolve();
    });
  });
};
