import { MetronomeConfigHandler } from "@metronome-sh/config";
import {
  ContextWithMetronome,
  GetLoadContextOptions,
  METRONOME_CONTEXT_KEY,
  METRONOME_VERSION,
  SpanName,
} from "@metronome-sh/runtime";
import type { ServerBuild } from "@remix-run/server-runtime";
import { CloudflarePagesSpan } from "./CloudflarePagesSpan";
import { CloudflarePagesSpanExporter } from "./CloudflarePagesSpanExporter";

export const createMetronomeGetLoadContext = (
  build: ServerBuild,
  options?: Omit<GetLoadContextOptions, "configPath">
) => {
  const { version: hash } = build.assets;

  const config = new MetronomeConfigHandler(options?.config);

  return (context: EventContext<any, any, any>): ContextWithMetronome => {
    if (!!options?.mode && options.mode === "development") {
      return {};
    }

    const { env, request } = context;

    const exporter = new CloudflarePagesSpanExporter({
      apiKey: env.METRONOME_API_KEY,
      metronomeUrl: env.METRONOME_URL,
      metronomeDebug: env.METRONOME_DEBUG,
    });

    exporter.setEventContext(context);

    const metronomeContext = {
      config,
      exporter,
      hash,
      metronomeVersion: METRONOME_VERSION,
      SpanClass: CloudflarePagesSpan,
    };

    const url = new URL(
      request.url || "/",
      `http://${request.headers.get("host") || "localhost"}`
    );

    if (config.shouldIgnorePath(url.pathname)) {
      return { [METRONOME_CONTEXT_KEY]: metronomeContext };
    }

    const requestType = url.searchParams.has("_data") ? "data" : "document";

    const attributes = {
      "http.method": request.method,
      "http.path": url.pathname,
      "remix.runtime": "cloudflare",
      "remix.request.type": requestType,
    };

    const span = new CloudflarePagesSpan(SpanName.Request, { attributes });

    exporter.send(span);

    return { [METRONOME_CONTEXT_KEY]: { ...metronomeContext, rootSpan: span } };
  };
};
