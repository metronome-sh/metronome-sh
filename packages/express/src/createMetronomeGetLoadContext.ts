import type { ServerResponse, IncomingMessage } from "http";
import {
  ContextWithMetronome,
  METRONOME_CONTEXT_KEY,
  METRONOME_VERSION,
  GetLoadContextOptions,
  config,
} from "@metronome-sh/runtime";
import { NodeSpan, SpanName } from "@metronome-sh/node";
import type { ServerBuild } from "@remix-run/node";
import { NodeSpanExporter } from "@metronome-sh/node";

export const createMetronomeGetLoadContext = (
  build: ServerBuild,
  options?: GetLoadContextOptions
) => {
  const exporter = new NodeSpanExporter({
    apiKey: process.env.METRONOME_API_KEY,
    metronomeUrl: process.env.METRONOME_URL,
    metronomeDebug: process.env.METRONOME_DEBUG,
  });

  const { version: hash } = build.assets;
  const metronomeVersion = METRONOME_VERSION;

  const projectMeta = { version: "", hash, metronomeVersion };

  const metronomeConfig = config(options?.configPath);

  return (
    request: IncomingMessage,
    response: ServerResponse
  ): ContextWithMetronome => {
    if (process.env.NODE_ENV !== "production") {
      return {};
    }

    const metronomeContext = {
      ...projectMeta,
      exporter,
      metronomeConfig,
      SpanClass: NodeSpan,
    };

    if (
      request.url?.includes("__metronome") ||
      metronomeConfig.shouldIgnorePathname(request.url)
    ) {
      return { [METRONOME_CONTEXT_KEY]: metronomeContext };
    }

    // prettier-ignore
    const url = new URL(request.url || "/", `http://${request.headers.host || "localhost"}`);

    const requestType = url.searchParams.has("_data") ? "data" : "document";

    const attributes = {
      "http.method": request.method,
      "http.url": request.url,
      "remix.runtime": "node",
      "remix.request.type": requestType,
    };

    const span = new NodeSpan(SpanName.Request, { attributes });

    response.once("finish", async () => {
      span.end({
        attributes: {
          "http.status.code": response.statusCode,
          "http.status.message": response.statusMessage,
        },
      });

      await exporter.send(span);
    });

    return { [METRONOME_CONTEXT_KEY]: { ...metronomeContext, rootSpan: span } };
  };
};
