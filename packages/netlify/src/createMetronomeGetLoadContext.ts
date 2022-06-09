// import { metronomeLoadContext } from "@metronome-sh/runtime";
import type { ServerBuild } from "@remix-run/server-runtime";
import type { HandlerEvent, HandlerContext } from "@netlify/functions";
import { NodeSpan, SpanName, NodeSpanExporter } from "@metronome-sh/node";
import {
  GetLoadContextOptions,
  METRONOME_CONTEXT_KEY,
  METRONOME_VERSION,
} from "@metronome-sh/runtime";

import type { ContextWithMetronome } from "@metronome-sh/runtime";
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

  return (event: HandlerEvent, _: HandlerContext): ContextWithMetronome => {
    if (
      config.shouldIgnoreMethod(event.httpMethod) ||
      process.env.NODE_ENV === "development" ||
      (!!options?.mode && options.mode === "development")
    ) {
      return {};
    }

    const metronomeContext = {
      config,
      exporter,
      hash,
      metronomeVersion: METRONOME_VERSION,
      SpanClass: NodeSpan,
    };

    if (config.shouldIgnorePath(event.path)) {
      return { [METRONOME_CONTEXT_KEY]: metronomeContext };
    }

    const requestType =
      typeof event.queryStringParameters?.["_data"] === "undefined"
        ? "document"
        : "data";

    const attributes = {
      "http.method": event.httpMethod,
      "http.path": event.path,
      "remix.runtime": "netlify",
      "remix.request.type": requestType,
    };

    const span = new NodeSpan(SpanName.Request, { attributes });

    exporter.send(span);

    return { [METRONOME_CONTEXT_KEY]: { ...metronomeContext, rootSpan: span } };
  };
};
