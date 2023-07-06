import type { ServerResponse, IncomingMessage } from "http";
import {
  ContextWithMetronome,
  METRONOME_CONTEXT_KEY,
  METRONOME_VERSION,
} from "@metronome-sh/runtime";
import { NodeSpan, SpanName } from "@metronome-sh/node";
import type { ServerBuild } from "@remix-run/node";
import { NodeExporter, NodeOriginatedServerEvent } from "@metronome-sh/node";
import { MetronomeConfig, MetronomeConfigHandler } from "@metronome-sh/config";

export function createMetronomeGetLoadContext(
  build: ServerBuild,
  metronomeConfig?: MetronomeConfig
) {
  const exporter = new NodeExporter({
    apiKey: process.env.METRONOME_API_KEY,
    metronomeUrl: process.env.METRONOME_URL,
    metronomeDebug: process.env.METRONOME_DEBUG,
    metronomeSuppressWarnings: process.env.METRONOME_SUPPRESS_WARNINGS,
  });

  const { version: hash } = build.assets;
  const config = new MetronomeConfigHandler(metronomeConfig);

  return (
    request: IncomingMessage,
    response: ServerResponse
  ): ContextWithMetronome => {
    if (
      (config.shouldIgnoreMethod(request.method) ||
        process.env.NODE_ENV !== "production") &&
      process.env.METRONOME_BYPASS !== "true"
    ) {
      return {};
    }

    const ip =
      (request.headers["x-forwarded-for"] as string) ||
      request.socket.remoteAddress ||
      "";

    const metronomeContext: ContextWithMetronome[typeof METRONOME_CONTEXT_KEY] =
      {
        adapter: "express",
        config,
        exporter,
        hash,
        ip,
        metronomeVersion: METRONOME_VERSION,
        OriginatedServerEventClass: NodeOriginatedServerEvent,
      };

    if (config.shouldIgnorePath(request.url)) {
      return { [METRONOME_CONTEXT_KEY]: metronomeContext };
    }

    // prettier-ignore
    const url = new URL(request.url || "/", `http://${request.headers.host || "localhost"}`);

    const requestType = url.searchParams.has("_data") ? "data" : "document";

    const attributes = {
      "metronome.version": METRONOME_VERSION,
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

      // await exporter.send(span);
    });

    return { [METRONOME_CONTEXT_KEY]: { ...metronomeContext, rootSpan: span } };
  };
}
