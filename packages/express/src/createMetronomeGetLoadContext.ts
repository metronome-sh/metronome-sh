import type { ServerResponse, IncomingMessage } from "http";
import {
  ContextWithMetronome,
  METRONOME_CONTEXT_KEY,
  METRONOME_VERSION,
  RequestEvent,
} from "@metronome-sh/runtime";
import type { ServerBuild } from "@remix-run/node";
import { NodeExporter, NodeRemixFunctionEvent } from "@metronome-sh/node";
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
        RemixFunctionEventClass: NodeRemixFunctionEvent,
      };

    if (config.shouldIgnorePath(request.url)) {
      return { [METRONOME_CONTEXT_KEY]: metronomeContext };
    }

    // prettier-ignore
    const url = new URL(request.url || "/", `http://${request.headers.host || "localhost"}`);

    const requestType = url.searchParams.has("_data") ? "data" : "document";

    const event = new RequestEvent({
      adapter: "express",
      duration: 0n,
      errored: false,
      method: request.method!,
      pathname: url.pathname,
      statusCode: 200,
      version: METRONOME_VERSION,
      hash,
      timestamp: Date.now(),
      startTime: process.hrtime.bigint(),
      type: requestType,
    });

    response.once("finish", async () => {
      event.update({
        errored: response.statusCode >= 400 && response.statusCode < 600,
        statusCode: response.statusCode,
        duration: process.hrtime.bigint() - event.details.startTime,
      });

      await exporter.send([event]);
    });

    return { [METRONOME_CONTEXT_KEY]: { ...metronomeContext } };
  };
}
