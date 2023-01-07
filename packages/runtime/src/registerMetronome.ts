import type { ServerBuild } from "@remix-run/server-runtime";
import { wrapAction, wrapLoader } from "./wrappers";
import { scriptRoute, reportRoute } from "./routes";

export const registerMetronome = (build: ServerBuild): ServerBuild => {
  const routes: Record<string, ServerBuild["routes"][string]> = {};

  for (const [routeId, route] of Object.entries(build.routes)) {
    const newRoute = { ...route, module: { ...route.module } };

    const wrapperOptions = { routeId };

    if (route.module.action) {
      newRoute.module.action = wrapAction(route.module.action, wrapperOptions);
    }

    if (route.module.loader) {
      newRoute.module.loader = wrapLoader(route.module.loader, wrapperOptions);
    }

    routes[routeId] = newRoute;
  }

  // Register custom metronome routes
  const baseUrl = "__metronome";

  routes[`${baseUrl}/$hash[.js]`] = {
    id: `${baseUrl}/$hash[.js]`,
    parentId: undefined,
    path: `${baseUrl}/:hash.js`,
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
