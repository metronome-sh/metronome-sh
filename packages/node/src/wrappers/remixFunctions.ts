import { Span } from "../transport/span";
import { sendSpan } from "../transport/exporter";
import { ContextWithMetronome, Meta } from "../types";
import type { ActionFunction, LoaderFunction } from "@remix-run/server-runtime";
import { isResponse } from "@remix-run/server-runtime/responses";
import { METRONOME_CONTEXT_KEY } from "../contants";

const wrapRemixFunction = (
  type: "loader" | "action",
  actionFunction: ActionFunction,
  meta: Meta
): ActionFunction => {
  return async (...args) => {
    let [{ context }] = args;

    const isInternalRequest = (context as ContextWithMetronome)[
      METRONOME_CONTEXT_KEY
    ]?.isInternalRequest;

    if (isInternalRequest) {
      // Inject the meta to pass to the internal functions
      args[0].context = { ...context, [METRONOME_CONTEXT_KEY]: { ...meta } };
      return actionFunction(...args);
    }

    const attributes = {
      "remix.function": type,
      "remix.route": meta.routeId,
      "app.version": meta.version,
      "app.hash": meta.hash,
      "metronome.version": meta.metronomeVersion,
    };

    const parent = (context as ContextWithMetronome)[METRONOME_CONTEXT_KEY]
      ?.rootSpan;

    const span = new Span(type, { attributes, parent });

    try {
      const response = await actionFunction(...args);
      span.end({
        attributes: {
          "http.status.code": response.status,
          "http.status.text": response.statusText,
        },
      });

      await sendSpan(span);

      return response;
    } catch (error) {
      // TODO track response throwing :)
      if (isResponse(error)) {
        throw error;
      }

      span.end({ error: error as Error });

      await sendSpan(span);

      throw error;
    }
  };
};

export const wrapAction = (actionFunction: ActionFunction, meta: Meta) => {
  return wrapRemixFunction("action", actionFunction, meta);
};

export const wrapLoader = (loaderFunction: LoaderFunction, meta: Meta) => {
  return wrapRemixFunction("loader", loaderFunction, meta);
};
