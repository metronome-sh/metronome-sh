import type { ContextWithMetronome } from "../runtime.types";
import type { ActionFunction, LoaderFunction } from "@remix-run/server-runtime";
import { METRONOME_CONTEXT_KEY, METRONOME_VERSION } from "../constants";

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
  type: "action" | "loader";
  routeId: string;
  routePath?: string;
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
      ip,
      adapter,
      hash = "",
      RemixFunctionEventClass,
      exporter,
      config,
    } = metronomeContext;

    if (await config.shoudNotTrack(request.clone())) {
      return remixFunction(...args);
    }

    const { type, routeId, routePath } = options;

    const ua = request.headers.get("User-Agent") || "";

    const identifier = { ip, ua };

    if (
      config.shouldIgnoreRoute(routeId) ||
      config.shouldIgnorePath(request.url)
    ) {
      return remixFunction(...args);
    }

    const details = {
      timestamp: Date.now(),
      duration: 0n,
      errored: false,
      httpMethod: request.method,
      httpStatusCode: 200,
      httpStatusText: "OK",
      httpPathname: new URL(request.url).pathname,
      version: METRONOME_VERSION,
      adapter,
      routeId,
      routePath: routePath || "",
      hash,
      ...identifier,
    };

    const event = new RemixFunctionEventClass(type, details);

    try {
      const response = await remixFunction(...args);

      event.update({
        httpStatusCode: isResponse(response) ? response.status : 200,
        httpStatusText: isResponse(response)
          ? response.statusText
          : "null_or_undefined",
      });

      event.end();

      await exporter.send(event);

      return response;
    } catch (throwable) {
      if (isResponse(throwable)) {
        event.update({
          httpStatusCode: throwable ? throwable.status : 200,
          httpStatusText: throwable
            ? throwable.statusText
            : "null_or_undefined",
        });

        event.end();

        await exporter.send(event);

        throw throwable;
      } else {
        event.update({
          errored: true,
          httpStatusCode: 513,
          httpStatusText: "Remix function error",
        });

        event.end();
      }

      await exporter.send(event);

      throw throwable;
    }
  };
};

export const wrapAction = (
  actionFunction: ActionFunction,
  options: Omit<MetronomeWrapperOptions, "type">
) => {
  return wrapRemixFunction(actionFunction, {
    type: "action",
    ...options,
  });
};

export const wrapLoader = (
  loaderFunction: LoaderFunction,
  options: Omit<MetronomeWrapperOptions, "type">
) => {
  return wrapRemixFunction(loaderFunction, {
    type: "loader",
    ...options,
  });
};
