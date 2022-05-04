import type { ServerBuild } from "@remix-run/server-runtime";
import type { APIGatewayProxyEventV2 } from "aws-lambda";
import { NodeSpan, SpanName, NodeSpanExporter } from "@metronome-sh/node";
import {
  ContextWithMetronome,
  METRONOME_CONTEXT_KEY,
} from "@metronome-sh/runtime";

export const createMetronomeGetLoadContext = (build: ServerBuild) => {
  const exporter = new NodeSpanExporter({
    apiKey: process.env.METRONOME_API_KEY,
    metronomeUrl: process.env.METRONOME_URL,
    metronomeDebug: process.env.METRONOME_DEBUG,
  });

  const { version: hash } = build.assets;
  const { version: metronomeVersion } = require("../package.json");

  const projectMeta = { version: "", hash, metronomeVersion };

  return (request: APIGatewayProxyEventV2): ContextWithMetronome => {
    if (
      process.env.ARC_ENV !== "production" &&
      process.env.ARC_ENV !== "staging"
    ) {
      return {};
    }

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
