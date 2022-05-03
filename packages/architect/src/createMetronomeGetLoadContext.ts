import type { ServerBuild } from "@remix-run/server-runtime";
import invariant from "ts-invariant";
import path from "path";
import type { APIGatewayProxyEventV2 } from "aws-lambda";
import { NodeSpan, SpanName, NodeSpanExporter } from "@metronome-sh/node";
import {
  ContextWithMetronome,
  METRONOME_CONTEXT_KEY,
} from "@metronome-sh/runtime";

export const createMetronomeGetLoadContext = (build: ServerBuild) => {
  const arcConfig = process.env.__ARC_CONFIG__;

  invariant(arcConfig, "Couldn't get Architect configuration");

  const exporter = new NodeSpanExporter({
    apiKey: process.env.METRONOME_API_KEY,
    metronomeUrl: process.env.METRONOME_URL,
    metronomeDebug: process.env.METRONOME_DEBUG,
  });

  const { projectSrc } = JSON.parse(arcConfig);

  const { version } = require(path.resolve(projectSrc, "package.json"));

  const { version: hash } = build.assets;
  const { version: metronomeVersion } = require("../package.json");

  const projectMeta = { version, hash, metronomeVersion };

  return (request: APIGatewayProxyEventV2): ContextWithMetronome => {
    if (process.env.NODE_ENV !== "production") return {};

    const { requestContext, queryStringParameters } = request;

    if (requestContext.http.path.includes("__metronome")) {
      return {
        [METRONOME_CONTEXT_KEY]: {
          ...projectMeta,
          exporter,
          SpanClass: NodeSpan,
        },
      };
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

    return {
      [METRONOME_CONTEXT_KEY]: {
        rootSpan: span,
        ...projectMeta,
        exporter,
        SpanClass: NodeSpan,
      },
    };
  };
};
