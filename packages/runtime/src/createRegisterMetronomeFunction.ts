import type { ServerBuild } from "@remix-run/node";
import { wrapAction, wrapLoader } from "./wrappers";

import { createScriptRoute, createWebVitalsRoute } from "./routes";
import { AbstractSpanExporter } from "./AbstractSpanExporter";
import { AbstractSpan } from "./AbstractSpan";

export const createRegisterMetronomeFunction = (
  SpanExporter: new (
    ...args: ConstructorParameters<typeof AbstractSpanExporter>
  ) => AbstractSpanExporter,
  Span: new (
    ...args: ConstructorParameters<typeof AbstractSpan>
  ) => AbstractSpan
) => {
  return (build: ServerBuild): ServerBuild => {
    const routes: Record<string, ServerBuild["routes"][string]> = {};

    // Wrap routes
    for (const [routeId, route] of Object.entries(build.routes)) {
      const newRoute = { ...route, module: { ...route.module } };

      // if (process.env.NODE_ENV !== "production") {
      //   routes[routeId] = newRoute;
      //   continue;
      // }

      const options = { routeId, Span, SpanExporter };

      if (route.module.action) {
        newRoute.module.action = wrapAction(route.module.action, options);
      }

      if (route.module.loader) {
        newRoute.module.loader = wrapLoader(route.module.loader, options);
      }

      routes[routeId] = newRoute;
    }

    // Register custom metronome routes
    const base = "__metronome";

    routes[`${base}/metronome-$hash[.js]`] = {
      id: `${base}/metronome-$hash[.js]`,
      parentId: undefined,
      path: `${base}/metronome-:hash.js`,
      index: undefined,
      caseSensitive: undefined,
      module: createScriptRoute() as any,
    };

    routes[`${base}/web-vitals`] = {
      id: `${base}/web-vitals`,
      parentId: undefined,
      path: `${base}/web-vitals`,
      index: undefined,
      caseSensitive: undefined,
      module: createWebVitalsRoute(SpanExporter, Span) as any,
    };

    // routes['__metronome/web-analytics']
    // routes['__metronome/event']

    return { ...build, routes };
  };
};
