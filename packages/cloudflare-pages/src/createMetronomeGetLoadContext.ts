import {
  ContextWithMetronome,
  METRONOME_CONTEXT_KEY,
  METRONOME_VERSION,
  SpanName,
} from "@metronome-sh/runtime";
import type { ServerBuild } from "@remix-run/server-runtime";
import { CloudflarePagesSpan } from "./CloudflarePagesSpan";
import { CloudflarePagesSpanExporter } from "./CloudflarePagesSpanExporter";

export const createMetronomeGetLoadContext = (build: ServerBuild) => {
  const metronomeVersion = METRONOME_VERSION;

  const { version: hash } = build.assets;

  const projectMeta = { version: "", hash, metronomeVersion };

  return (context: EventContext<any, any, any>): ContextWithMetronome => {
    const { env, request } = context;

    const exporter = new CloudflarePagesSpanExporter({
      apiKey: env.METRONOME_API_KEY,
      metronomeUrl: env.METRONOME_URL,
      metronomeDebug: env.METRONOME_DEBUG,
    });

    exporter.setEventContext(context);

    if (request.url.includes("__metronome")) {
      return {
        [METRONOME_CONTEXT_KEY]: {
          ...projectMeta,
          exporter,
          SpanClass: CloudflarePagesSpan,
        },
      };
    }

    const url = new URL(
      request.url || "/",
      `http://${request.headers.get("host") || "localhost"}`
    );

    const requestType = url.searchParams.has("_data") ? "data" : "document";

    const attributes = {
      "http.method": request.method,
      "http.path": url.pathname,
      "remix.runtime": "cloudflare",
      "remix.request.type": requestType,
    };

    const span = new CloudflarePagesSpan(SpanName.Request, { attributes });

    exporter.send(span);

    return {
      [METRONOME_CONTEXT_KEY]: {
        rootSpan: span,
        ...projectMeta,
        exporter,
        SpanClass: CloudflarePagesSpan,
      },
    };
  };
};
