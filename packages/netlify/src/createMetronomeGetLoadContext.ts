// import { metronomeLoadContext } from "@metronome-sh/runtime";
import type { ServerBuild } from "@remix-run/server-runtime";
import path from "path";
import type { HandlerEvent, HandlerContext } from "@netlify/functions";
import { NodeSpan, SpanName, NodeSpanExporter } from "@metronome-sh/node";
import {
  METRONOME_CONTEXT_KEY,
  METRONOME_VERSION,
} from "@metronome-sh/runtime";

import type { ContextWithMetronome } from "@metronome-sh/runtime";

export const createMetronomeGetLoadContext = (build: ServerBuild) => {
  const exporter = new NodeSpanExporter({
    apiKey: process.env.METRONOME_API_KEY,
    metronomeUrl: process.env.METRONOME_URL,
    metronomeDebug: process.env.METRONOME_DEBUG,
  });

  const projectSrc = process.env.LAMBDA_RUNTIME_DIR;

  const metronomeVersion = METRONOME_VERSION;

  const { version: hash } = build.assets;

  const projectMeta = { version: "", hash, metronomeVersion };

  return (event: HandlerEvent, _: HandlerContext): ContextWithMetronome => {
    if (event.path.includes("__metronome")) {
      return {
        [METRONOME_CONTEXT_KEY]: {
          ...projectMeta,
          exporter,
          SpanClass: NodeSpan,
        },
      };
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
