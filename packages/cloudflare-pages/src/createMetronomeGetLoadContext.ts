import {
  ContextWithMetronome,
  METRONOME_CONTEXT_KEY,
  METRONOME_VERSION,
} from "@metronome-sh/runtime";
import type { ServerBuild } from "@remix-run/server-runtime";
import { CloudflareSpan } from "./CloudflareSpan";
import { CloudflareSpanExporter } from "./CloudflareSpanExporter";

let exporter: CloudflareSpanExporter;

export const createMetronomeGetLoadContext = (build: ServerBuild) => {
  const metronomeVersion = METRONOME_VERSION;

  const { version: hash } = build.assets;

  const projectMeta = { version: "", hash, metronomeVersion };

  return (context: EventContext<any, any, any>): ContextWithMetronome => {
    const { env, request } = context;

    console.log(context);

    if (!exporter) {
      exporter = new CloudflareSpanExporter({
        apiKey: env.METRONOME_API_KEY,
        metronomeUrl: env.METRONOME_URL,
        metronomeDebug: env.METRONOME_DEBUG,
      });
    }

    if (request.url.includes("__metronome")) {
      return {
        [METRONOME_CONTEXT_KEY]: {
          ...projectMeta,
          exporter,
          SpanClass: CloudflareSpan,
        },
      };
    }

    // const attributes = {
    //   "http.method": event.httpMethod,
    //   "http.path": event.path,
    //   "remix.runtime": "netlify",
    //   "remix.request.type":
    //     typeof event.queryStringParameters?.["_data"] === "undefined"
    //       ? "document"
    //       : "data",
    // };
    // const span = new Span(SpanName.Request, { attributes });
    // exporter.send(span);
    // return { [METRONOME_CONTEXT_KEY]: { rootSpan: span, ...projectMeta } };
    return {};
  };
};
