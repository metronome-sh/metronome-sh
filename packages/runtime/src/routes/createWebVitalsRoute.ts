import type { ActionFunction } from "@remix-run/node";
import { decodeObject } from "./helpers";
import { ContextWithMetronome } from "../types";
import { METRONOME_CONTEXT_KEY } from "../constants";
import { WebVital } from "../schemas";
import { is } from "superstruct";
import { AbstractSpan, SpanName } from "../AbstractSpan";
import { AbstractSpanExporter } from "../AbstractSpanExporter";

export const createWebVitalsRoute = (
  SpanExporter: new (
    ...args: ConstructorParameters<typeof AbstractSpanExporter>
  ) => AbstractSpanExporter,
  Span: new (
    ...args: ConstructorParameters<typeof AbstractSpan>
  ) => AbstractSpan
) => {
  const exporter = new SpanExporter();

  const action: ActionFunction = async ({ request, context }) => {
    const text = await request.text();

    const webVital = await decodeObject(text);

    if (!is(webVital, WebVital)) {
      return new Response("", { status: 204 });
    }

    const {
      version = "",
      metronomeVersion = "",
      hash = "",
    } = (context as ContextWithMetronome)[METRONOME_CONTEXT_KEY] || {};

    const userAgent = request.headers.get("User-Agent") || "";

    const { connection, metric, routeId, routePath, pathname } = webVital;

    const { name, value, id, delta } = metric;

    const attributes = {
      "device.ua": userAgent,
      "device.connection": connection || "unknown",
      "remix.route.id": routeId,
      "remix.route.path": routePath,
      "remix.pathname": pathname,
      "vital.name": name,
      "vital.value": value,
      "vital.id": id,
      "vital.delta": delta,
      "app.version": version,
      "app.hash": hash,
      "metronome.version": metronomeVersion,
    };

    // prettier-ignore
    const span = new Span(SpanName.WebVital, { attributes, startTime: 0 }).end({ endTime: 0 });
    await exporter.send(span);

    return new Response("", { status: 204 });
  };

  return { action };
};
