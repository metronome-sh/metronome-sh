import type { ActionFunction } from "@remix-run/server-runtime";
import { getIp } from "../common/getIp";

import { METRONOME_VERSION } from "../common/constants";
import { z } from "zod";
import { ServerRouteModule } from "@remix-run/server-runtime/dist/routeModules";

import { CloudflareLoadContext, MetronomeResolvedConfig, RouteMap } from "../common/types";
import { deobfuscate, getRemixAttributes } from "../common/helpers";
import { ClientErrorSchema, PageviewSchema, WebVitalSchema } from "../common/schemas";
import { startInstrumentation, tracer } from "../common/instrumentation/Tracer";
import { SemanticAttributes } from "../common/instrumentation/SemanticAttributes";
import { getClientAttributes } from "../common/clientAttributes";

export const createClientReportRouteModule = ({
  routeMap,
  config,
}: {
  routeMap: RouteMap;
  config: MetronomeResolvedConfig;
}): ServerRouteModule => {
  const action: ActionFunction = async ({ request, context, params }) => {
    const controller = new AbortController();
    const { signal } = controller;

    const shouldExcludeRequest = config.unstable_exclude
      ? await Promise.race([
          (async () => {
            const result = await config.unstable_exclude!({
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
                console.warn(`Metronome: exclude function took too long to resolve [${config.unstable_excludeTimeout}ms]`);
              }
              resolve(false);
            }, config.unstable_excludeTimeout)
          ),
        ])
      : false;

    if (shouldExcludeRequest) {
      if (config.debug) {
        console.warn("Metronome: request was excluded by the exclude function");
      }
      return new Response(null, { status: 204 });
    }

    startInstrumentation(config);

    const cloudflareWaitUntil = (context as CloudflareLoadContext)?.cloudflare?.waitUntil;

    const events = deobfuscate(await request.text());

    const ip = getIp(request) ?? "0.0.0.0";

    if (!events) {
      if (config.debug) {
        console.warn("Metronome: couldn't process events");
      }
      return new Response(null, { status: 204 });
    }

    const result = z.array(z.any()).safeParse(events);

    if (!result.success) {
      if (config.debug) {
        console.warn("Metronome: Invalid event(s)", JSON.stringify(events));
      }
      return new Response(null, { status: 204 });
    }

    const clientAttributes = await getClientAttributes(request.headers);

    result.data.forEach((incoming) => {
      const remixAttributes = getRemixAttributes({
        routeMap,
        version: config.version,
        path: incoming.pathname,
      });

      // Web vitals
      const wvResult = WebVitalSchema.safeParse(incoming);
      if (wvResult.success) {
        const { data } = wvResult;
        const metric = tracer().createHistogram(data.metric.name, { id: data.metric.id });

        metric
          .record(data.metric.value, {
            [SemanticAttributes.WebVitalName]: data.metric.name,
            [SemanticAttributes.WebVitalRating]: data.metric.rating,
            [SemanticAttributes.WebVitalNavigationType]: data.metric.navigationType,
            [SemanticAttributes.MetronomeVersion]: METRONOME_VERSION,
            [SemanticAttributes.ClientAddress]: ip,
            [SemanticAttributes.UserAgentOriginal]: request.headers.get("user-agent") ?? "",
            [SemanticAttributes.HttpPathname]: data.pathname,
            [SemanticAttributes.UrlFull]: data.url,
            [SemanticAttributes.AppHostname]: data.hostname,
            [SemanticAttributes.ClientReferrer]: data.referrer,
            [SemanticAttributes.ClientScreen]: data.screen,
            [SemanticAttributes.ClientLanguage]: data.language,
            [SemanticAttributes.ClientConnection]: data.connection,
            [SemanticAttributes.ClientDeviceCategory]: data.deviceCategory,
            ...remixAttributes,
            ...clientAttributes,
            ...config.remixPackages,
          })
          .dispose();

        cloudflareWaitUntil?.(tracer().flush());

        return;
      }

      // Pageviews
      const pvResult = PageviewSchema.safeParse(incoming);

      if (pvResult.success) {
        const metric = tracer().createCounter("pageview");

        const url = new URL(pvResult.data.url);

        metric
          .add(1, {
            [SemanticAttributes.MetronomeVersion]: METRONOME_VERSION,
            [SemanticAttributes.ClientAddress]: ip,
            [SemanticAttributes.UserAgentOriginal]: request.headers.get("user-agent") ?? "",
            [SemanticAttributes.UrlQuery]: url.search,
            [SemanticAttributes.ClientScreen]: pvResult.data.screen,
            [SemanticAttributes.ClientReferrer]: pvResult.data.referrer,
            [SemanticAttributes.AppHostname]: url.hostname,
            [SemanticAttributes.ClientLanguage]: pvResult.data.language,
            [SemanticAttributes.ClientConnection]: pvResult.data.connection,
            [SemanticAttributes.ClientDeviceCategory]: pvResult.data.deviceCategory,
            [SemanticAttributes.HttpPathname]: pvResult.data.pathname,
            ...remixAttributes,
            ...clientAttributes,
            ...config.remixPackages,
          })
          .dispose();

        cloudflareWaitUntil?.(tracer().flush());

        return;
      }

      // Client errors
      const ceResult = ClientErrorSchema.safeParse(incoming);

      if (ceResult.success) {
        const { data } = ceResult;

        const span = tracer().startSpan("client_error", {
          kind: "client",
          attributes: {
            [SemanticAttributes.MetronomeVersion]: METRONOME_VERSION,
            [SemanticAttributes.ClientAddress]: ip,
            [SemanticAttributes.UserAgentOriginal]: request.headers.get("user-agent") ?? "",
            ...remixAttributes,
            ...clientAttributes,
            ...config.remixPackages,
          },
        });

        span.addEvent(
          "exception",
          {
            [SemanticAttributes.ExceptionType]: data.error.name || "Error",
            [SemanticAttributes.ExceptionEscaped]: false,
            [SemanticAttributes.ExceptionStacktrace]: data.error.stack,
            [SemanticAttributes.ExceptionMessage]: data.error.message,
            [SemanticAttributes.ExceptionFilename]: data.error.filename,
            [SemanticAttributes.ExceptionLineno]: data.error.lineno,
            [SemanticAttributes.ExceptionColno]: data.error.colno,
          },
          data.timestamp
        );

        span.end();

        cloudflareWaitUntil?.(tracer().flush());

        return;
      }
    });

    return new Response(null, { status: 204 });
  };

  return { action, default: undefined };
};
