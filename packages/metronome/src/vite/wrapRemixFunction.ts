import type {
  ActionFunction,
  LoaderFunction,
  TypedDeferredData,
} from "@remix-run/server-runtime";
import { HeaderAllowlist, MetronomeWrapperOptions } from "../types";
import { trace, Span } from "@opentelemetry/api";
import { METRONOME_VERSION } from "../constants";
import { getIp } from "./getIp";

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

function isDeferredData(value: any): value is TypedDeferredData<{}> {
  return (
    value &&
    typeof value === "object" &&
    typeof value.data === "object" &&
    typeof value.unlistenAbortSignal === "function" &&
    typeof value.controller === "object" &&
    typeof value.abortPromise === "object" &&
    typeof Array.isArray(value.valueKeys) &&
    value.subscribers instanceof Set &&
    value.pendingKeysSet instanceof Set
  );
}

function transformHeadersInit(headersInit: HeadersInit): [string, string][] {
  if (Array.isArray(headersInit)) {
    // Already in the desired format
    return headersInit;
  } else if (headersInit instanceof Headers) {
    // Convert Headers object to an array of key-value pairs
    return Array.from(headersInit.entries());
  } else {
    // Convert Record<string, string> to an array of key-value pairs
    return Object.entries(headersInit);
  }
}

function setHeadersToSpan({
  result,
  span,
  headersAllowlist,
}: {
  result: any;
  span: Span;
  headersAllowlist?: HeaderAllowlist;
}) {
  if (
    !headersAllowlist ||
    (Array.isArray(headersAllowlist) && headersAllowlist.length === 0)
  ) {
    return;
  }

  const type = result instanceof Request ? "request" : "response";

  const headerEntries =
    type === "request"
      ? result.headers
      : isResponse(result)
      ? result.headers
      : isDeferredData(result)
      ? result.init?.headers
      : [];

  transformHeadersInit(headerEntries ?? []).forEach(([key, value]) => {
    if (
      Array.isArray(headersAllowlist) &&
      !headersAllowlist.includes(key.toLowerCase())
    ) {
      return;
    }
    span.setAttribute(`http.${type}.header.${key}`, value.split(","));
  });
}

const wrapRemixFunction = (
  remixFunction: ActionFunction | LoaderFunction,
  options: MetronomeWrapperOptions
): ActionFunction | LoaderFunction => {
  const headersAllowlist: HeaderAllowlist =
    options.config.headersAllowlist === "all"
      ? "all"
      : options.config.headersAllowlist?.map((header) => header.toLowerCase());

  return async (...args) => {
    const tracer = trace.getTracer("remix");

    const [{ request }] = args;

    const ip = getIp(request);

    const url = new URL(request.url);

    const attributes = {
      "http.method": request.method.toUpperCase(),
      "http.path": url.pathname,
      "metronome.version": METRONOME_VERSION,
      "remix.route_id": options.routeId,
      "remix.route_path": options.routePath ?? "",
      "remix.function": options.type,
      "app.version": options.version ?? "",
      "client.address": ip ?? "0.0.0.0",
      "user_agent.original": request.headers.get("user-agent") ?? "",
      ...options.config.remixPackages,
    };

    return tracer.startActiveSpan(
      options.type,
      { attributes },
      async (span: Span) => {
        setHeadersToSpan({
          result: request,
          span,
          headersAllowlist,
        });

        try {
          const result = await remixFunction(...args);

          if (isResponse(result)) {
            setHeadersToSpan({ result, span, headersAllowlist });
            span.setAttribute("http.status_code", result.status);
          } else if (isDeferredData(result)) {
            span.setAttribute("http.status_code", result.init?.status ?? 200);
            span.setAttribute("remix.deferred", true);
            setHeadersToSpan({ result, span, headersAllowlist });
          } else {
            span.setAttribute("http.status_code", 200);
          }

          span.end();
          return result;
        } catch (throwable) {
          if (isResponse(throwable)) {
            span.setAttribute("http.status_code", throwable.status);
            span.setAttribute("remix.thrown_response", true);

            if (throwable.status >= 400) {
              span.setAttribute("error.type", throwable.status);

              span.recordException({
                code: throwable.status,
                name: throwable.statusText,
              });
            }
            setHeadersToSpan({ result: throwable, span, headersAllowlist });
          } else {
            span.setAttribute("error.type", (throwable as Error).name);
            span.recordException(throwable as Error);
          }

          span.end();

          throw throwable;
        }
      }
    );
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
