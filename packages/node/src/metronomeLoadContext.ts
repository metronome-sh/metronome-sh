import { METRONOME_CONTEXT_KEY } from "./contants";
import { getRequestType, isInternalRequest } from "./helpers";
import { Span } from "./transport/span";
import type { ServerResponse, IncomingMessage } from "http";
import { sendSpan } from "./transport/exporter";
import { getProjectMeta } from "./helpers";
import { ContextWithMetronome } from "./types";

export const metronomeLoadContext = (
  request: IncomingMessage,
  response: ServerResponse
): ContextWithMetronome => {
  // TODO uncomment this
  // if (process.env.NODE_ENV !== "production") {
  //   return {};
  // }

  if (isInternalRequest(request)) {
    return {
      [METRONOME_CONTEXT_KEY]: {
        isInternalRequest: true,
      },
    };
  }

  const requestType = getRequestType(request);

  const attributes = {
    "http.method": request.method,
    "http.url": request.url,
    "remix.request.type": requestType,
  };

  const span = new Span("request", { attributes });

  response.once("finish", async () => {
    span.end({
      attributes: {
        "http.status.code": response.statusCode,
        "http.status.message": response.statusMessage,
      },
    });

    await sendSpan(span);
  });

  return {
    [METRONOME_CONTEXT_KEY]: { rootSpan: span, isInternalRequest: false },
  };
};
