import type { ServerBuild } from "@remix-run/server-runtime";
import { NodeSpan, SpanName, NodeSpanExporter } from "@metronome-sh/node";
import {
  ContextWithMetronome,
  GetLoadContextOptions,
  METRONOME_CONTEXT_KEY,
  METRONOME_VERSION,
} from "@metronome-sh/runtime";
import { MetronomeConfigHandler } from "@metronome-sh/config";
import type { APIGatewayProxyEventV2 } from "aws-lambda";
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
    options?.configPath ||
    path.resolve(process.cwd(), "../metronome.config.js");

  const config = new MetronomeConfigHandler(
    fs.existsSync(configPath) ? require(configPath) : undefined
  );

  return (request: APIGatewayProxyEventV2): ContextWithMetronome => {
    if (
      process.env.ARC_ENV !== "production" &&
      process.env.ARC_ENV !== "staging"
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

    const { requestContext, queryStringParameters } = request;

    if (config.shouldIgnorePath(requestContext.http.path)) {
      return { [METRONOME_CONTEXT_KEY]: metronomeContext };
    }

    const attributes = {
      "http.method": requestContext.http.method,
      "http.path": requestContext.http.path,
      "remix.runtime": "architect",
      "remix.request.type":
        typeof queryStringParameters?.["_data"] === undefined
          ? "document"
          : "data",
    };

    const span = new NodeSpan(SpanName.Request, { attributes });

    exporter.send(span);

    return { [METRONOME_CONTEXT_KEY]: { ...metronomeContext, rootSpan: span } };
  };
};
