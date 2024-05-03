import { MetronomeResolvedConfig, RouteMap, Routes } from "../common/types";
import { wrapRemixFunction } from "./wrapRemixFunction";
import { createClientReportRouteModule } from "./createClientReportRouteModule";
import * as webVitalsModule from "./webVitalsModule";

export function registerMetronome(routes: Routes, config: MetronomeResolvedConfig): Routes {
  if (!config.apiKey) {
    console.warn("Metronome: apiKey is required to enable Metronome");
    return routes;
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
    module: createClientReportRouteModule({ routeMap, config }),
  };

  routes[`${baseUrl}/web-vitals.$version`] = {
    id: `${baseUrl}/web-vitals.$version`,
    parentId: undefined,
    path: `${baseUrl}/web-vitals/:version`,
    index: undefined,
    caseSensitive: undefined,
    module: webVitalsModule,
  };

  return routes;
}
