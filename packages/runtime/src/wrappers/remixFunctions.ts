import { SpanName } from "../AbstractSpan";
import type { ContextWithMetronome } from "../types";
import type { ActionFunction, LoaderFunction } from "@remix-run/server-runtime";
import { isResponse } from "@remix-run/server-runtime/responses";
import { METRONOME_CONTEXT_KEY } from "../constants";

export interface MetronomeWrapperOptions {
  type: SpanName.Action | SpanName.Loader;
  routeId: string;
}

const wrapRemixFunction = (
  actionFunction: ActionFunction | LoaderFunction,
  options: MetronomeWrapperOptions
): ActionFunction | LoaderFunction => {
  return async (...args) => {
    const [{ context }] = args;

    console.debug({ context });

    const metronomeContext = (context as ContextWithMetronome)[
      METRONOME_CONTEXT_KEY
    ];

    if (!metronomeContext) {
      return actionFunction(...args);
    }

    const {
      metronomeVersion = "",
      hash = "",
      version = "",
      SpanClass,
      exporter,
    } = metronomeContext;

    const { type, routeId } = options;

    const attributes = {
      "remix.function": type,
      "remix.route": routeId,
      "app.version": version,
      "app.hash": hash,
      "metronome.version": metronomeVersion,
    };

    const parent = (context as ContextWithMetronome)[METRONOME_CONTEXT_KEY]
      ?.rootSpan;

    const span = new SpanClass(type, { attributes, parent });

    try {
      const response = await actionFunction(...args);
      span.end({
        attributes: {
          "http.status.code": response.status,
          "http.status.text": response.statusText,
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
