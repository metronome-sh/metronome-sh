import type { ServerBuild } from "@remix-run/server-runtime";
import { wrapAction, wrapLoader } from "./wrappers";
import { reportRoute } from "./routes";

export const registerMetronome = (build: ServerBuild): ServerBuild => {
  const routes: Record<string, ServerBuild["routes"][string]> = {};

  for (const [routeId, route] of Object.entries(build.routes)) {
    const newRoute = { ...route, module: { ...route.module } };

    const wrapperOptions = { routeId, routePath: route.path };

    if (route.module.action) {
      newRoute.module.action = wrapAction(route.module.action, wrapperOptions);
    }

    if (route.module.loader) {
      newRoute.module.loader = wrapLoader(route.module.loader, wrapperOptions);
    }

    routes[routeId] = newRoute;
  }

  // Register custom metronome route
  const baseUrl = "__metronome";

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
