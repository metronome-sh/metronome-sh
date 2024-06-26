import type { ActionFunction, LoaderFunction } from "@remix-run/server-runtime";
import { CloudflareLoadContext, MetronomeWrapperOptions } from "../common/types";
import { METRONOME_VERSION } from "../common/constants";
import { getIp } from "../common/getIp";
import { Span } from "../common/instrumentation/Span";
import { startInstrumentation, tracer } from "../common/instrumentation/Tracer";
import { SemanticAttributes } from "../common/instrumentation/SemanticAttributes";
import { asyncLocalStorage } from "@asyncLocalStorage";
import { isDeferredData, isResponse, match } from "./helpers";
import { getClientAttributes } from "../common/clientAttributes";

export const wrapRemixFunction = (
  remixFunction: ActionFunction | LoaderFunction,
  options: MetronomeWrapperOptions
): ActionFunction | LoaderFunction => {
  const isCloudflare = Object.keys(options.config.remixPackages).some((key) =>
    key.includes("cloudflare")
  );

  startInstrumentation(options.config);

  return async (...args) => {
    const requestStore = asyncLocalStorage.getStore();
    const [{ request, context, params }] = args;

    const cloudflareWaitUntil = (context as CloudflareLoadContext)?.cloudflare?.waitUntil;

    if (isCloudflare) {
      tracer().setCloudflareContext((context as CloudflareLoadContext)?.cloudflare);
    }

    if (isCloudflare && !cloudflareWaitUntil) {
      console.warn(
        "Metronome: cloudflare prop was not found in the context, this route might not be instrumented as waitUntil is not available."
      );
    }

    // Don't track head requests
    if (request.method.toLowerCase() === "head") return remixFunction(...args);

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
    // Wait for the unstable_exclude function to resolve before continuing at most 1 second
    const controller = new AbortController();
    const { signal } = controller;

    const shouldExcludeRequest = options.config.unstable_exclude
      ? await Promise.race([
          (async () => {
            const result = await options.config.unstable_exclude!({
              request: request.clone(),
              context,
              params,
            });
            controller.abort();
            return result;
          })(),
          new Promise<false>((resolve) =>
            setTimeout(() => {
              if (!signal.aborted) {
                // prettier-ignore
                console.warn(`Metronome: exclude function took too long to resolve [${options.config.unstable_excludeTimeout}ms]`);
              }
              resolve(false);
            }, options.config.unstable_excludeTimeout)
          ),
        ])
      : false;

    if (shouldExcludeRequest && options.config.debug) {
      console.warn("Metronome: request was excluded by the exclude function");
    }

    if (shouldIgnoreRouteByPathname || shouldIgnoreRouteByRouteId || shouldExcludeRequest) {
      if (requestStore) {
        requestStore.doNotTrack = true;
        requestStore.doNotTrackErrors = true;
      }
      return remixFunction(...args);
    }

    const ip = getIp(request) ?? "0.0.0.0";

    const clientAttributes = await getClientAttributes(request.headers);

    const attributes = {
      [SemanticAttributes.HttpMethod]: request.method.toUpperCase(),
      [SemanticAttributes.UrlFull]: request.url,
      [SemanticAttributes.MetronomeVersion]: METRONOME_VERSION,
      [SemanticAttributes.AppVersion]: options.config.version ?? "",
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
      ...clientAttributes,
    };

    if (requestStore) {
      requestStore.requestResolvedAttributes = {
        "app.version": options.config.version ?? "",
        ...options.config.remixPackages,
      };
    }

    return tracer().startActiveSpan(
      options.type,
      { attributes, traceId: requestStore?.traceId },
      async (span: Span) => {
        return asyncLocalStorage.run({ traceId: span.getContext().traceId }, async () => {
          try {
            const result = await remixFunction(...args);

            const remixFunctionStore = asyncLocalStorage.getStore();

            // Bubble up the doNotTrack and doNotTrackErrors flags to the request store
            if (requestStore) {
              requestStore.doNotTrack = remixFunctionStore?.doNotTrack ?? false;
              requestStore.doNotTrackErrors = remixFunctionStore?.doNotTrackErrors ?? false;
            }

            if (isResponse(result)) {
              span.setAttribute(SemanticAttributes.HttpStatusCode, result.status);
            } else if (isDeferredData(result)) {
              span.setAttribute(SemanticAttributes.HttpStatusCode, result.init?.status ?? 200);
              span.setAttribute(SemanticAttributes.RemixDeferred, true);
            } else {
              span.setAttribute(SemanticAttributes.HttpStatusCode, 200);
            }

            if (!requestStore?.doNotTrack) {
              span.end();
              cloudflareWaitUntil?.(tracer().flush());
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

            if (!requestStore?.doNotTrackErrors) {
              span.end();
              cloudflareWaitUntil?.(tracer().flush());
            }

            throw throwable;
          }
        });
      }
    );
  };
};
