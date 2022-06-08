import type { VercelRequest, VercelResponse } from "@vercel/node";
import type { ServerBuild } from "@remix-run/server-runtime";
import type {
  ContextWithMetronome,
  GetLoadContextOptions,
} from "@metronome-sh/runtime";
import { NodeSpan, SpanName, NodeSpanExporter } from "@metronome-sh/node";

import {
  METRONOME_CONTEXT_KEY,
  METRONOME_VERSION,
} from "@metronome-sh/runtime";
import { MetronomeConfigHandler } from "@metronome-sh/config";

export const createMetronomeGetLoadContext = (
  build: ServerBuild,
  options?: Omit<GetLoadContextOptions, "configPath">
) => {
  const exporter = new NodeSpanExporter({
    apiKey: process.env.METRONOME_API_KEY,
    metronomeUrl: process.env.METRONOME_URL,
    metronomeDebug: process.env.METRONOME_DEBUG,
  });

  const config = new MetronomeConfigHandler(options?.config);

  const { version: hash } = build.assets;

  return (
    request: VercelRequest,
    response: VercelResponse
  ): ContextWithMetronome => {
    if (config.shouldIgnoreMethod(request.method)) {
      return {};
    }

    const metronomeContext = {
      config,
      exporter,
      hash,
      metronomeVersion: METRONOME_VERSION,
      SpanClass: NodeSpan,
    };

    if (config.shouldIgnorePath(request.url)) {
      return { [METRONOME_CONTEXT_KEY]: metronomeContext };
    }

    // prettier-ignore
    const url = new URL(request.url || "/", `http://${request.headers.host || "localhost"}`);

    const requestType = url.searchParams.has("_data") ? "data" : "document";

    const attributes = {
      "http.method": request.method,
      "http.url": request.url,
      "remix.runtime": "vercel",
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
