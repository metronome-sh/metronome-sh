import type { ActionFunction, LoaderFunction, TypedDeferredData } from "@remix-run/server-runtime";
import { HeaderAllowlist, MetronomeWrapperOptions } from "../common/types";
import { METRONOME_VERSION } from "../common/constants";
import { getIp } from "../common/getIp";
import { Span } from "../common/instrumentation/Span";
import { startInstrumentation, tracer } from "../common/instrumentation/Tracer";
import { SemanticAttributes } from "../common/instrumentation/SemanticAttributes";
// let nondeferredDataOrResponseWarning = false;

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

function isDeferredData(value: any): value is TypedDeferredData<any> {
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
  if (!headersAllowlist || (Array.isArray(headersAllowlist) && headersAllowlist.length === 0)) {
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
    if (Array.isArray(headersAllowlist) && !headersAllowlist.includes(key.toLowerCase())) {
      return;
    }
    span.setAttribute(`http.${type}.header.${key}`, value.split(","));
  });
}

function setTraceIdToResponse(response: Response | TypedDeferredData<any>, span: Span) {
  // TODO enable this
  const __metronome = JSON.stringify({
    documentTraceId: span.getContext().traceId,
  });
  const metronomeCookie = `__metronome=${__metronome}; Path=/`;

  if (isResponse(response)) {
    const existing = response.headers.get("Set-Cookie");

    if (existing) {
      response.headers.set("Set-Cookie", `${existing}, ${metronomeCookie}`);
    } else {
      response.headers.set("Set-Cookie", metronomeCookie);
    }

    return;
  }

  if (isDeferredData(response)) {
    if (!response.init) {
      response.init = { headers: { "Set-Cookie": metronomeCookie } };
      return;
    }

    const headers = response.init.headers;

    if (!headers) {
      response.init.headers = { "Set-Cookie": metronomeCookie };
      return;
    }

    if (Array.isArray(headers)) {
      // Try to check if the header already exists
      const existing = headers.find(([key]) => key === "Set-Cookie");

      if (existing) {
        existing[1] = `${existing[1]}, ${metronomeCookie}`;
      } else {
        headers.push(["Set-Cookie", metronomeCookie]);
      }

      return;
    }

    if (headers instanceof Headers) {
      const existing = headers.get("Set-Cookie");

      if (existing) {
        headers.set("Set-Cookie", `${existing}, ${metronomeCookie}`);
      } else {
        headers.set("Set-Cookie", metronomeCookie);
      }

      return;
    }

    const existing = headers["Set-Cookie"];

    if (existing) {
      headers["Set-Cookie"] = `${existing}, ${metronomeCookie}`;
    } else {
      headers["Set-Cookie"] = metronomeCookie;
    }
  }
}

export const wrapRemixFunction = (
  remixFunction: ActionFunction | LoaderFunction,
  options: MetronomeWrapperOptions
): ActionFunction | LoaderFunction => {
  startInstrumentation(options.config);

  const headersAllowlist: HeaderAllowlist =
    options.config.headersAllowlist === "all"
      ? "all"
      : options.config.headersAllowlist?.map((header) => header.toLowerCase());

  return async (...args) => {
    const [{ request }] = args;

    const ip = getIp(request) ?? "0.0.0.0";

    const attributes = {
      [SemanticAttributes.HttpMethod]: request.method.toUpperCase(),
      [SemanticAttributes.UrlFull]: request.url,
      [SemanticAttributes.MetronomeVersion]: METRONOME_VERSION,
      [SemanticAttributes.AppVersion]: options.assetsManifest.version ?? "",
      [SemanticAttributes.ClientAddress]: ip,
      [SemanticAttributes.UserAgentOriginal]: request.headers.get("user-agent") ?? "",
      [SemanticAttributes.RemixRouteId]: options.routeId,
      [SemanticAttributes.RemixRoutePath]: options.routePath ?? "",
      [SemanticAttributes.RemixFunction]: options.type,
      ...options.config.remixPackages,
    };

    const store = tracer().getAsyncLocalStore();

    if (store) {
      store.requestResolvedAttributes = {
        "app.version": options.assetsManifest.version ?? "",
        ...options.config.remixPackages,
      };
    }

    return tracer().startActiveSpan(options.type, { attributes }, async (span: Span) => {
      setHeadersToSpan({
        result: request,
        span,
        headersAllowlist,
      });

      try {
        const result = await remixFunction(...args);

        if (isResponse(result)) {
          setHeadersToSpan({ result, span, headersAllowlist });
          // setTraceIdToResponse(result, span);
          span.setAttribute(SemanticAttributes.HttpStatusCode, result.status);
        } else if (isDeferredData(result)) {
          span.setAttribute(SemanticAttributes.HttpStatusCode, result.init?.status ?? 200);
          span.setAttribute(SemanticAttributes.RemixDeferred, true);
          setHeadersToSpan({ result, span, headersAllowlist });
          // setTraceIdToResponse(result, span);
        } else {
          span.setAttribute(SemanticAttributes.HttpStatusCode, 200);
        }

        span.end();

        // if (
        //   !nondeferredDataOrResponseWarning &&
        //   !isDeferredData(result) &&
        //   !isResponse(result)
        // ) {
        //   console.warn(
        //     `Metronome: The response returned from your ${options.type} is not a Response or DeferredData object. Metronome will not be able to relate the ${options.type} span with the document .`
        //   );
        //   nondeferredDataOrResponseWarning = true;
        // }

        return result;
      } catch (throwable) {
        if (isResponse(throwable)) {
          span.setAttribute(SemanticAttributes.HttpStatusCode, throwable.status);
          span.setAttribute(SemanticAttributes.RemixThrownResponse, true);

          if (throwable.status >= 400) {
            span.setAttribute(SemanticAttributes.ErrorType, throwable.status);

            span.recordException({
              code: throwable.status,
              name: throwable.statusText,
            });
          }
          setHeadersToSpan({ result: throwable, span, headersAllowlist });
          // setTraceIdToResponse(throwable, span);
        } else {
          span.setAttribute(SemanticAttributes.ErrorType, (throwable as Error).name);
          span.recordException(throwable as Error);
        }

        span.end();

        throw throwable;
      }
    });
  };
};
