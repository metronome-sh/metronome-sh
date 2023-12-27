import type { ActionFunction } from "@remix-run/server-runtime";
import { decodeObject, getRemixData } from "./helpers";
import {
  ContextWithMetronome,
  RouteMap,
  RegexpRouteMap,
} from "../runtime.types";
import { METRONOME_CONTEXT_KEY, METRONOME_VERSION } from "../constants";
import { z } from "zod";
import { pathToRegexp } from "path-to-regexp";
import { PageviewEvent, WebVitalEvent, ClientErrorEvent } from "../events";
import { ServerRouteModule } from "@remix-run/server-runtime/dist/routeModules";

const regexpRouteMap: RegexpRouteMap = {} as RegexpRouteMap;

function toRegexpRouteMap(routeMap: RouteMap) {
  const regexpRouteMap: RegexpRouteMap = {} as RegexpRouteMap;

  for (const [key, value] of Object.entries(routeMap)) {
    if (value.path) {
      regexpRouteMap[key] = { ...value, regexp: pathToRegexp(value.path) };
    }
  }

  return regexpRouteMap;
}

export const createReportRouteModule = ({
  routeMap,
  hash,
}: {
  routeMap: RouteMap;
  hash: string;
}): ServerRouteModule => {
  const action: ActionFunction = async ({ request, context }) => {
    const text = await request.text();

    const events = await decodeObject(text);

    const result = z.array(z.any()).safeParse(events);

    if (!result.success) {
      // prettier-ignore
      console.log("Metronome: Invalid event", JSON.stringify(events), result.error);
      return new Response("", { status: 204 });
    }

    const metronomeContext = (context as ContextWithMetronome)[
      METRONOME_CONTEXT_KEY
    ];

    if (!metronomeContext) {
      return new Response("", { status: 204 });
    }

    const { adapter, exporter, ip, config } = metronomeContext;

    if (await config.shoudNotTrack(request)) {
      return new Response("", { status: 204 });
    }

    const ua = request.headers.get("User-Agent") || "";

    const identifier = { ip, ua };

    const metronome = { version: METRONOME_VERSION, adapter };

    const instances = result.data.map((incoming) => {
      const remix = getRemixData({ routeMap, hash, path: incoming.pathname });

      if (PageviewEvent.isIncomingPageviewEvent(incoming)) {
        const { name, ...rest } = incoming;
        return new PageviewEvent({
          ...rest,
          ...metronome,
          ...identifier,
          ...remix,
        });
      }

      if (ClientErrorEvent.isIncomingClientErrorEvent(incoming)) {
        const { name, ...rest } = incoming;
        return new ClientErrorEvent({
          ...rest,
          ...metronome,
          ...identifier,
          ...remix,
        });
      }

      if (WebVitalEvent.isIncomingWebVitalEvent(incoming)) {
        const { name, ...rest } = incoming;
        return new WebVitalEvent({
          ...rest,
          ...metronome,
          ...identifier,
          ...remix,
        });
      }

      throw new Response("", { status: 204 });
    });

    await exporter.send(instances);

    return new Response("", { status: 204 });
  };

  return { action: action, default: undefined };
};
