import type { ActionFunction, LoaderFunction } from "@remix-run/server-runtime";
import { MetronomeWrapperOptions } from "../common/types";
import { METRONOME_VERSION } from "../common/constants";
import { getIp } from "../common/getIp";
import { Span } from "../common/instrumentation/Span";
import { startInstrumentation, tracer } from "../common/instrumentation/Tracer";
import { SemanticAttributes } from "../common/instrumentation/SemanticAttributes";
import { asyncLocalStorage } from "@asyncLocalStorage";
import { isDeferredData, isResponse, match } from "./helpers";

export const wrapRemixFunction = (
  remixFunction: ActionFunction | LoaderFunction,
  options: MetronomeWrapperOptions
): ActionFunction | LoaderFunction => {
  startInstrumentation(options.config);
  return async (...args) => {
    const store = asyncLocalStorage.getStore();
    const [{ request }] = args;

    const ignoredPathnames = options.config.ignoredPathnames ?? ["/healthcheck"];
    const shouldIgnoreRouteByPathname = ignoredPathnames.some((value) => {
      const { pathname } = new URL(
        request.url,
        `http://${request.headers.get("host") ?? "localhost"}`
      );
      return match(value, pathname ?? "");
    });

    const ignoredRoutes = options.config.ignoredRoutes ?? [];
    const shouldIgnoreRouteByRouteId = ignoredRoutes.some((value) => match(value, options.routeId));

    if (shouldIgnoreRouteByPathname || shouldIgnoreRouteByRouteId) {
      if (store) {
        store.doNotTrack = true;
        store.doNotTrackErrors = true;
      }
      return remixFunction(...args);
    }

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
      [SemanticAttributes.MetronomeAdapter]: "vite",
      [SemanticAttributes.HttpPathname]: new URL(
        request.url,
        `http://${request.headers.get("host") ?? "localhost"}`
      ).pathname,
      ...options.config.remixPackages,
    };

    if (store) {
      store.requestResolvedAttributes = {
        "app.version": options.assetsManifest.version ?? "",
        ...options.config.remixPackages,
      };
    }

    return tracer().startActiveSpan(options.type, { attributes }, async (span: Span) => {
      try {
        const result = await remixFunction(...args);

        if (isResponse(result)) {
          span.setAttribute(SemanticAttributes.HttpStatusCode, result.status);
        } else if (isDeferredData(result)) {
          span.setAttribute(SemanticAttributes.HttpStatusCode, result.init?.status ?? 200);
          span.setAttribute(SemanticAttributes.RemixDeferred, true);
        } else {
          span.setAttribute(SemanticAttributes.HttpStatusCode, 200);
        }

        if (!store?.doNotTrack) {
          span.end();
        }

        return result;
      } catch (throwable) {
        span.setAttribute(SemanticAttributes.AppErrored, true);

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
        } else {
          span.setAttribute(SemanticAttributes.ErrorType, (throwable as Error).name);
          span.recordException(throwable as Error);
        }

        if (!store?.doNotTrackErrors) {
          span.end();
        }

        throw throwable;
      }
    });
  };
};
