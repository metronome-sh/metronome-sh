import { MetronomeInternalConfig, RouteMap, Routes } from "../common/types";
import { wrapRemixFunction } from "./wrapRemixFunction";
import { createClientReportRouteModule } from "./createClientReportRouteModule";
import { type AssetsManifest } from "@remix-run/server-runtime/dist/entry";

export function registerMetronome(
  routes: Routes,
  assetsManifest: Pick<AssetsManifest, "version">,
  config: MetronomeInternalConfig
): Routes {
  if (!config.apiKey) {
    config.apiKey = process.env.METRONOME_API_KEY;
  }

  const routeMap: RouteMap = {};

  for (const [routeId, route] of Object.entries(routes)) {
    routeMap[routeId] = {
      id: routeId,
      parentId: route.parentId,
      path: route.path,
    };

    const newRoute = { ...route, module: { ...route.module } };

    const wrapperOptions = {
      routeId,
      routePath: route.path,
      config,
      assetsManifest,
    };

    if (route.module.action) {
      newRoute.module.action = wrapRemixFunction(route.module.action, {
        type: "action",
        ...wrapperOptions,
      });
    }
    if (route.module.loader) {
      newRoute.module.loader = wrapRemixFunction(route.module.loader, {
        type: "loader",
        ...wrapperOptions,
      });
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
    module: createClientReportRouteModule({
      routeMap,
      config,
      assetsManifest,
    }),
  };

  return routes;
}
