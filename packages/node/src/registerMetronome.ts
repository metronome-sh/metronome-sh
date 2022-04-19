import type { ServerBuild } from "@remix-run/node";
import { wrapAction, wrapLoader } from "./wrappers";

import { getProjectMeta } from "./helpers";
import { loader as scriptLoader } from "./routes/script";
import { action as webVitalsAction } from "./routes/web-vitals";

export const registerMetronome = (build: ServerBuild): ServerBuild => {
  const routes: Record<string, ServerBuild["routes"][string]> = {};

  const projectMeta = getProjectMeta(build);

  // Wrap routes
  for (const [routeId, route] of Object.entries(build.routes)) {
    const newRoute = { ...route, module: { ...route.module } };
    const meta = { routeId, ...projectMeta };

    if (process.env.NODE_ENV !== "production") {
      routes[routeId] = newRoute;
      continue;
    }

    if (route.module.action) {
      newRoute.module.action = wrapAction(route.module.action, meta);
    }

    if (route.module.loader) {
      newRoute.module.loader = wrapLoader(route.module.loader, meta);
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
    module: {
      loader: wrapLoader(scriptLoader, {
        routeId: `${base}/metronome-$hash[.js]`,
        ...projectMeta,
      }),
    } as any,
  };

  routes[`${base}/web-vitals`] = {
    id: `${base}/web-vitals`,
    parentId: undefined,
    path: `${base}/web-vitals`,
    index: undefined,
    caseSensitive: undefined,
    module: {
      action: wrapAction(webVitalsAction, {
        routeId: `${base}/web-vitals`,
        ...projectMeta,
      }),
    } as any,
  };

  // routes['__metronome/web-analytics']
  // routes['__metronome/event']

  return { ...build, routes };
};
