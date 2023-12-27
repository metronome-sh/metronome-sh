import {
  ContextWithMetronome,
  METRONOME_CONTEXT_KEY,
  METRONOME_VERSION,
  RequestEvent,
} from "@metronome-sh/runtime";
import type { ServerBuild } from "@remix-run/node";
import { NodeExporter, NodeRemixFunctionEvent } from "@metronome-sh/node";
import { MetronomeConfig, MetronomeConfigHandler } from "@metronome-sh/config";
import { createRemixRequest } from "@remix-run/express/dist/server";
import type * as express from "express";

let config: MetronomeConfigHandler;

export function createMetronomeGetLoadContext(
  build: ServerBuild,
  {
    configPath,
    metronome,
  }: { configPath?: string | null; metronome?: MetronomeConfig }
) {
  console.log({
    apiKey: process.env.METRONOME_API_KEY,
    metronomeUrl: process.env.METRONOME_URL,
    metronomeDebug: process.env.METRONOME_DEBUG,
    metronomeSuppressWarnings: process.env.METRONOME_SUPPRESS_WARNINGS,
  });

  let exporter: NodeExporter;

  const { version: hash } = build.assets;

  return async (
    request: express.Request,
    response: express.Response
  ): Promise<ContextWithMetronome> => {
    if (!config) {
      // prettier-ignore
      config = new MetronomeConfigHandler(metronome ?? (configPath ? (await import(configPath))?.default || {} : undefined));
    }

    if (!exporter) {
      exporter = new NodeExporter({
        endpoint: config.getEndpoint(),
        apiKey: process.env.METRONOME_API_KEY,
        metronomeDebug: process.env.METRONOME_DEBUG,
        metronomeSuppressWarnings: process.env.METRONOME_SUPPRESS_WARNINGS,
      });
    }

    console.log({
      evaluation:
        (process.env.NODE_ENV !== "production" &&
          process.env.METRONOME_BYPASS !== "true") ||
        config.shouldIgnoreMethod(request.method) ||
        (await config.shoudNotTrack(
          createRemixRequest(request, response) as any
        )),
      NODE_ENV: process.env.NODE_ENV,
      METRONOME_BYPASS: process.env.METRONOME_BYPASS,
      check:
        process.env.NODE_ENV !== "production" &&
        process.env.METRONOME_BYPASS !== "true",
      shouldIgnoreMethod: config.shouldIgnoreMethod(request.method),
      shoudNotTrack: await config.shoudNotTrack(
        createRemixRequest(request, response) as any
      ),
    });

    // prettier-ignore
    if (
      (process.env.NODE_ENV !== "production" && process.env.METRONOME_BYPASS !== "true") ||
      config.shouldIgnoreMethod(request.method) ||
      (await config.shoudNotTrack(createRemixRequest(request, response) as any))
    ) {
      return {};
    }

    let ip = "";

    if (request.headers["x-forwarded-for"]) {
      ip = (request.headers["x-forwarded-for"] as string).split(",")[0];
    } else if (request.socket.remoteAddress) {
      ip = request.socket.remoteAddress;
    }

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

    const ua = request.headers["user-agent"] ?? "";

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
      ip,
      ua,
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
