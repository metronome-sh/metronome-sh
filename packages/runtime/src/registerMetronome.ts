import type { ServerBuild } from "@remix-run/server-runtime";
import { wrapAction, wrapLoader } from "./wrappers";

import { scriptRoute, webVitalsRoute } from "./routes";

export const registerMetronome = (build: ServerBuild): ServerBuild => {
  const routes: Record<string, ServerBuild["routes"][string]> = {};

  // Wrap routes
  for (const [routeId, route] of Object.entries(build.routes)) {
    const newRoute = { ...route, module: { ...route.module } };

    const options = { routeId };

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
    module: scriptRoute as any,
  };

  routes[`${base}/web-vitals`] = {
    id: `${base}/web-vitals`,
    parentId: undefined,
    path: `${base}/web-vitals`,
    index: undefined,
    caseSensitive: undefined,
    module: webVitalsRoute as any,
  };

  // routes['__metronome/web-analytics']
  // routes['__metronome/event']

  return { ...build, routes };
};
