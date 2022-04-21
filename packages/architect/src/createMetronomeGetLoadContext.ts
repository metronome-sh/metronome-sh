// import { metronomeLoadContext } from "@metronome-sh/runtime";
import type { ServerBuild } from "@remix-run/server-runtime";
import invariant from "ts-invariant";
import path from "path";
import type { APIGatewayProxyEventV2 } from "aws-lambda";
import {
  METRONOME_CONTEXT_KEY,
  Span,
  SpanName,
  SpanExporter,
} from "@metronome-sh/node";

export const createMetronomeGetLoadContext = (build: ServerBuild) => {
  const arcConfig = process.env.__ARC_CONFIG__;

  invariant(arcConfig, "Couldn't get Architect configuration");

  const exporter = new SpanExporter();

  const { projectSrc } = JSON.parse(arcConfig);

  const { version } = require(path.resolve(projectSrc, "package.json"));

  const { version: hash } = build.assets;
  const { version: metronomeVersion } = require("../package.json");

  const projectMeta = { version, hash, metronomeVersion };

  return (request: APIGatewayProxyEventV2) => {
    const { requestContext, queryStringParameters } = request;

    if (requestContext.http.path.includes("__metronome")) {
      return { [METRONOME_CONTEXT_KEY]: { ...projectMeta } };
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

    const span = new Span(SpanName.Request, { attributes });

    exporter.send(span);

    return { [METRONOME_CONTEXT_KEY]: { rootSpan: span, ...projectMeta } };
  };
};
