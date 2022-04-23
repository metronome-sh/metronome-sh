import type { ActionFunction } from "@remix-run/server-runtime";
import { decodeObject } from "./helpers";
import { ContextWithMetronome } from "../types";
import { METRONOME_CONTEXT_KEY } from "../constants";
import { WebVital } from "../schemas";
import { is } from "superstruct";
import { SpanName } from "../AbstractSpan";

export const action: ActionFunction = async ({ request, context }) => {
  const text = await request.text();

  const webVital = await decodeObject(text);

  if (!is(webVital, WebVital)) {
    return new Response("", { status: 204 });
  }

  const metronomeContext = (context as ContextWithMetronome)[
    METRONOME_CONTEXT_KEY
  ];

  if (!metronomeContext) {
    return new Response("", { status: 204 });
  }

  const {
    version = "",
    metronomeVersion = "",
    hash = "",
    SpanClass,
    exporter,
  } = metronomeContext;

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
  const span = new SpanClass(SpanName.WebVital, { attributes, startTime: 0 }).end({ endTime: 0 });
  await exporter.send(span);

  return new Response("", { status: 204 });
};
