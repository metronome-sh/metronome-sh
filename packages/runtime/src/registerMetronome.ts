import type { ServerBuild } from "@remix-run/server-runtime";
import { wrapAction, wrapLoader } from "./wrappers";
import { createReportRouteModule } from "./createReportRouteModule";
import { RouteMap } from "./runtime.types";

export function registerMetronome(
  build: ServerBuild | (() => Promise<ServerBuild>)
): ServerBuild {
  const routeMap: RouteMap = {};
  const routes: Record<string, ServerBuild["routes"][string]> = {};

  if (typeof build === "function") {
    throw new Error(
      "registerMetronome does not support async build functions yet"
    );
  }

  for (const [routeId, route] of Object.entries(build.routes)) {
    routeMap[routeId] = {
      id: routeId,
      parentId: route.parentId,
      path: route.path,
    };

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
    module: createReportRouteModule({
      routeMap,
      hash: build.assets.version,
    }),
  };

  return { ...build, routes };
}
