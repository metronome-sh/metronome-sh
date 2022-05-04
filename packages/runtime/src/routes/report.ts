import type { ActionFunction } from "@remix-run/server-runtime";
import { decodeObject } from "./helpers";
import { ContextWithMetronome } from "../types";
import { METRONOME_CONTEXT_KEY } from "../constants";
import { MetronomeReport, WebVital } from "../schemas";
import { Infer, is } from "superstruct";
import { AbstractSpan, SpanName } from "../AbstractSpan";

function createWebVitalSpans(
  metronomeContext: ContextWithMetronome,
  webVitals: Infer<typeof WebVital>[],
  userAgent: string | null = ""
): AbstractSpan[] {
  // prettier-ignore
  const { version = "", metronomeVersion = "", hash = "", SpanClass } = metronomeContext;

  return webVitals.map((webVital) => {
    const { connection, metric, routeId, routePath, pathname } = webVital;

    const { name, value, id } = metric;

    const attributes = {
      "device.ua": userAgent,
      "device.connection": connection || "unknown",
      "remix.route.id": routeId,
      "remix.route.path": routePath,
      "remix.pathname": pathname,
      "vital.name": name,
      "vital.value": value,
      "vital.id": id,
      "app.version": version,
      "app.hash": hash,
      "metronome.version": metronomeVersion,
    };

    // prettier-ignore
    return new SpanClass(SpanName.WebVital, { attributes, startTime: 0 }).end({ endTime: 0 });
  });
}

export const action: ActionFunction = async ({ request, context }) => {
  const text = await request.text();

  const report = await decodeObject(text);

  if (!is(report, MetronomeReport)) {
    return new Response("", { status: 204 });
  }

  const metronomeContext = (context as ContextWithMetronome)[
    METRONOME_CONTEXT_KEY
  ];

  if (!metronomeContext) {
    return new Response("", { status: 204 });
  }

  const { exporter } = metronomeContext;

  const webVitalSpans = createWebVitalSpans(
    metronomeContext,
    report.webVitals,
    request.headers.get("User-Agent")
  );

  await exporter.send(webVitalSpans);

  return new Response("", { status: 204 });
};
