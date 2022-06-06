import { SpanName } from "../AbstractSpan";
import type { ContextWithMetronome } from "../types";
import type { ActionFunction, LoaderFunction } from "@remix-run/server-runtime";
import { METRONOME_CONTEXT_KEY } from "../constants";

// https://github.com/remix-run/remix/blob/973cd68528c8c58679a5b2d974ae8cefde0db455/packages/remix-server-runtime/responses.ts#L54
function isResponse(value: any): value is Response {
  return (
    value != null &&
    typeof value.status === "number" &&
    typeof value.statusText === "string" &&
    typeof value.headers === "object" &&
    typeof value.body !== "undefined"
  );
}

export interface MetronomeWrapperOptions {
  type: SpanName.Action | SpanName.Loader;
  routeId: string;
}

const wrapRemixFunction = (
  remixFunction: ActionFunction | LoaderFunction,
  options: MetronomeWrapperOptions
): ActionFunction | LoaderFunction => {
  return async (...args) => {
    const [{ context, request }] = args;

    const metronomeContext = (context as ContextWithMetronome)[
      METRONOME_CONTEXT_KEY
    ];

    if (!metronomeContext) {
      return remixFunction(...args);
    }

    const {
      metronomeVersion = "",
      hash = "",
      SpanClass,
      exporter,
      config,
    } = metronomeContext;

    const { type, routeId } = options;

    if (
      config.shouldIgnoreRoute(routeId) ||
      config.shouldIgnorePath(request.url)
    ) {
      return remixFunction(...args);
    }

    const attributes = {
      "remix.function": type,
      "remix.route": routeId,
      "app.hash": hash,
      "metronome.version": metronomeVersion,
    };

    const parent = (context as ContextWithMetronome)[METRONOME_CONTEXT_KEY]
      ?.rootSpan;

    const span = new SpanClass(type, { attributes, parent });

    try {
      const response = await remixFunction(...args);

      // TODO make a test for this
      span.end({
        attributes: {
          "http.status.code": response?.status || 204,
          "http.status.text": response?.statusText || "No Content",
        },
      });

      await exporter.send(span);

      return response;
    } catch (error) {
      // TODO track response throwing :)
      if (isResponse(error)) {
        throw error;
      }

      span.end({ error: error as Error });

      await exporter.send(span);

      throw error;
    }
  };
};

export const wrapAction = (
  actionFunction: ActionFunction,
  options: Omit<MetronomeWrapperOptions, "type">
) => {
  return wrapRemixFunction(actionFunction, {
    type: SpanName.Action,
    ...options,
  });
};

export const wrapLoader = (
  loaderFunction: LoaderFunction,
  options: Omit<MetronomeWrapperOptions, "type">
) => {
  return wrapRemixFunction(loaderFunction, {
    type: SpanName.Loader,
    ...options,
  });
};
