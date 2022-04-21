import type { ServerResponse, IncomingMessage } from "http";
import {
  ContextWithMetronome,
  METRONOME_CONTEXT_KEY,
  METRONOME_VERSION,
} from "@metronome-sh/runtime";
import { Span, SpanName } from "./Span";
import type { ServerBuild } from "@remix-run/node";
import { SpanExporter } from "./SpanExporter";

export const createMetronomeGetLoadContext = (build: ServerBuild) => {
  const exporter = new SpanExporter();

  const { version } = require(process.env.PWD + "/package.json");

  return (
    request: IncomingMessage,
    response: ServerResponse
  ): ContextWithMetronome => {
    if (request.url?.includes("__metronome")) {
      return {};
    }

    // if (process.env.NODE_ENV !== "production") {
    //   return {};
    // }

    const { version: hash } = build.assets;
    const metronomeVersion = METRONOME_VERSION;

    // prettier-ignore
    const url = new URL(request.url || "/", `http://${request.headers.host || "localhost"}`);

    const requestType = url.searchParams.has("_data") ? "data" : "document";

    const attributes = {
      "http.method": request.method,
      "http.url": request.url,
      "remix.request.type": requestType,
    };

    const span = new Span(SpanName.Request, { attributes });

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
      },
    };
  };
};
