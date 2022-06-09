import { MetronomeConfigHandler } from "@metronome-sh/config";
import {
  ContextWithMetronome,
  GetLoadContextOptions,
  METRONOME_CONTEXT_KEY,
  METRONOME_VERSION,
  SpanName,
} from "@metronome-sh/runtime";
import type { ServerBuild } from "@remix-run/server-runtime";
import { CloudflareSpan } from "./CloudflareSpan";
import { CloudflareWorkerSpanExporter } from "./CloudflareWorkerSpanExporter";

declare global {
  var METRONOME_URL: string | undefined;
  var METRONOME_API_KEY: string | undefined;
  var METRONOME_DEBUG: string | undefined;
}

export const createMetronomeGetLoadContext = (
  build: ServerBuild,
  options?: Omit<GetLoadContextOptions, "configPath">
) => {
  const { version: hash } = build.assets;

  const config = new MetronomeConfigHandler(options?.config);

  return (event: FetchEvent): ContextWithMetronome => {
    if (
      config.shouldIgnoreMethod(event.request.method) ||
      (!!options?.mode && options.mode === "development")
    ) {
      return {};
    }

    const { request } = event;

    const apiKey =
      typeof METRONOME_API_KEY !== "undefined" ? METRONOME_API_KEY : undefined;

    const metronomeUrl =
      typeof METRONOME_URL !== "undefined" ? METRONOME_URL : undefined;

    const metronomeDebug =
      typeof METRONOME_DEBUG !== "undefined" ? METRONOME_DEBUG : undefined;

    const exporter = new CloudflareWorkerSpanExporter({
      apiKey,
      metronomeUrl,
      metronomeDebug,
    });

    exporter.setEvent(event);

    const metronomeContext = {
      config,
      exporter,
      hash,
      metronomeVersion: METRONOME_VERSION,
      SpanClass: CloudflareSpan,
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

    const span = new CloudflareSpan(SpanName.Request, { attributes });

    exporter.send(span);

    return { [METRONOME_CONTEXT_KEY]: { ...metronomeContext, rootSpan: span } };
  };
};
