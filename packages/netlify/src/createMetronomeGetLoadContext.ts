// import { metronomeLoadContext } from "@metronome-sh/runtime";
import type { ServerBuild } from "@remix-run/server-runtime";
import path from "path";
import type { HandlerEvent, HandlerContext } from "@netlify/functions";
import {
  METRONOME_CONTEXT_KEY,
  METRONOME_VERSION,
  Span,
  SpanName,
  SpanExporter,
} from "@metronome-sh/node";

export const createMetronomeGetLoadContext = (build: ServerBuild) => {
  const exporter = new SpanExporter();

  const projectSrc = process.env.LAMBDA_RUNTIME_DIR;

  const { version } = projectSrc
    ? require(path.resolve(projectSrc, "package.json"))
    : { version: undefined };

  const metronomeVersion = METRONOME_VERSION;

  const { version: hash } = build.assets;

  const projectMeta = { version, hash, metronomeVersion };

  return (event: HandlerEvent, _: HandlerContext) => {
    if (event.path.includes("__metronome")) {
      return {};
    }

    const attributes = {
      "http.method": event.httpMethod,
      "http.path": event.path,
      "remix.runtime": "netlify",
      "remix.request.type":
        typeof event.queryStringParameters?.["_data"] === "undefined"
          ? "document"
          : "data",
    };

    const span = new Span(SpanName.Request, { attributes });

    exporter.send(span);

    return { [METRONOME_CONTEXT_KEY]: { rootSpan: span, ...projectMeta } };
  };
};
