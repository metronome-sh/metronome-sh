import type { ServerResponse, IncomingMessage } from "http";
import {
  ContextWithMetronome,
  METRONOME_CONTEXT_KEY,
  METRONOME_VERSION,
} from "@metronome-sh/runtime";
import { NodeSpan, SpanName } from "./NodeSpan";
import type { ServerBuild } from "@remix-run/node";
import { NodeSpanExporter } from "./NodeSpanExporter";

export const createMetronomeGetLoadContext = (build: ServerBuild) => {
  const exporter = new NodeSpanExporter({
    apiKey: process.env.METRONOME_API_KEY,
    metronomeUrl: process.env.METRONOME_URL,
    metronomeDebug: process.env.METRONOME_DEBUG,
  });

  const { version } = require(process.env.PWD + "/package.json");
  const { version: hash } = build.assets;
  const metronomeVersion = METRONOME_VERSION;

  return (
    request: IncomingMessage,
    response: ServerResponse
  ): ContextWithMetronome => {
    if (request.url?.includes("__metronome")) {
      return {
        [METRONOME_CONTEXT_KEY]: {
          hash,
          metronomeVersion,
          version,
          exporter,
          SpanClass: NodeSpan,
        },
      };
    }

    // if (process.env.NODE_ENV !== "production") {
    //   return {};
    // }

    // prettier-ignore
    const url = new URL(request.url || "/", `http://${request.headers.host || "localhost"}`);

    const requestType = url.searchParams.has("_data") ? "data" : "document";

    const attributes = {
      "http.method": request.method,
      "http.url": request.url,
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

    return {
      [METRONOME_CONTEXT_KEY]: {
        rootSpan: span,
        hash,
        metronomeVersion,
        version,
        exporter,
        SpanClass: NodeSpan,
      },
    };
  };
};
