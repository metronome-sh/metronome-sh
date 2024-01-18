import type { ActionFunction, ActionFunctionArgs } from "@remix-run/server-runtime";
import { getIp } from "../common/getIp";

import { METRONOME_VERSION } from "../common/constants";
import { z } from "zod";
import { ServerRouteModule } from "@remix-run/server-runtime/dist/routeModules";

import { MetronomeInternalConfig, RouteMap } from "../common/types";
import { deobfuscate, getRemixAttributes } from "../common/helpers";
import { ClientErrorSchema, PageviewSchema, WebVitalSchema } from "../common/schemas";
import { type AssetsManifest } from "@remix-run/server-runtime/dist/entry";
import { startInstrumentation, tracer } from "../common/instrumentation/Tracer";
import { SemanticAttributes } from "../common/instrumentation/SemanticAttributes";

export const createClientReportRouteModule = ({
  routeMap,
  assetsManifest,
  config,
}: {
  routeMap: RouteMap;
  assetsManifest: AssetsManifest;
  config: MetronomeInternalConfig;
}): ServerRouteModule => {
  const action: ActionFunction = async ({ request }) => {
    startInstrumentation(config);

    const events = await deobfuscate(await request.text());

    const ip = getIp(request) ?? "0.0.0.0";

    if (!events) {
      console.warn("Metronome: couldn't process events");
      return new Response("", { status: 204 });
    }

    const result = z.array(z.any()).safeParse(events);

    if (!result.success) {
      console.warn("Metronome: Invalid event(s)", JSON.stringify(events));
      return new Response("", { status: 204 });
    }

    result.data.forEach((incoming) => {
      const remixAttributes = getRemixAttributes({
        routeMap,
        version: assetsManifest.version,
        path: incoming.pathname,
      });

      // Web vitals
      const wvResult = WebVitalSchema.safeParse(incoming);
      if (wvResult.success) {
        const { data } = wvResult;
        const metric = tracer().createHistogram(data.metric.name);

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
            ...config.remixPackages,
          })
          .dispose();

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
            ...config.remixPackages,
          })
          .dispose();

        return;
      }

      // Client errors
      const ceResult = ClientErrorSchema.safeParse(incoming);

      if (ceResult.success) {
        const { data } = ceResult;

        const span = tracer().startSpan("client_error", {
          attributes: {
            [SemanticAttributes.MetronomeVersion]: METRONOME_VERSION,
            [SemanticAttributes.ClientAddress]: ip,
            [SemanticAttributes.UserAgentOriginal]: request.headers.get("user-agent") ?? "",
            ...remixAttributes,
            ...config.remixPackages,
          },
        });

        span.addEvent(
          "exception",
          {
            [SemanticAttributes.ExceptionType]: data.error.error || "Error",
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

        return;
      }
    });

    return new Response("", { status: 204 });
  };

  return {
    action,
    // action: async (args: ActionFunctionArgs) => {
    //   try {
    //     return await action(args);
    //   } catch (error) {
    //     console.error("Metronome: failed to process events", error);
    //     return new Response("", { status: 204 });
    //   }
    // },
    default: undefined,
  };
};
