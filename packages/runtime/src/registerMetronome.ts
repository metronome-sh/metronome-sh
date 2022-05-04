import type { ServerBuild } from "@remix-run/server-runtime";
import { wrapAction, wrapLoader } from "./wrappers";

import { scriptRoute, reportRoute } from "./routes";

export const registerMetronome = (build: ServerBuild): ServerBuild => {
  const routes: Record<string, ServerBuild["routes"][string]> = {};

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
  const baseUrl = "__metronome";

  routes[`${baseUrl}/metronome-$hash[.js]`] = {
    id: `${baseUrl}/metronome-$hash[.js]`,
    parentId: undefined,
    path: `${baseUrl}/metronome-:hash.js`,
    index: undefined,
    caseSensitive: undefined,
    module: scriptRoute as any,
  };

  routes[baseUrl] = {
    id: baseUrl,
    parentId: undefined,
    path: baseUrl,
    index: undefined,
    caseSensitive: undefined,
    module: reportRoute as any,
  };

  return { ...build, routes };
};
