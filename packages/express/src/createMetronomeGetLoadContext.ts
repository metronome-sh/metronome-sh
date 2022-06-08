import type { ServerResponse, IncomingMessage } from "http";
import {
  ContextWithMetronome,
  METRONOME_CONTEXT_KEY,
  METRONOME_VERSION,
  GetLoadContextOptions,
} from "@metronome-sh/runtime";
import { NodeSpan, SpanName } from "@metronome-sh/node";
import type { ServerBuild } from "@remix-run/node";
import { NodeSpanExporter } from "@metronome-sh/node";
import { MetronomeConfig, MetronomeConfigHandler } from "@metronome-sh/config";
import fs from "fs";
import path from "path";

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

  const configPath =
    options?.configPath || path.resolve(process.cwd(), "./metronome.config.js");

  const metronomeConfig = options?.config
    ? options.config
    : fs.existsSync(configPath)
    ? (require(configPath) as MetronomeConfig)
    : undefined;

  const config = new MetronomeConfigHandler(metronomeConfig);

  return (
    request: IncomingMessage,
    response: ServerResponse
  ): ContextWithMetronome => {
    if (process.env.NODE_ENV !== "production") {
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
