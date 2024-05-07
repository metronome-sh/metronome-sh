import { MetronomeResolvedConfig, RouteMap, Routes } from "../common/types";
import { wrapRemixFunction } from "./wrapRemixFunction";
import { createClientReportRouteModule } from "./createClientReportRouteModule";
import * as webVitalsModule from "./webVitalsModule";

export function registerMetronome(routes: Routes, config: MetronomeResolvedConfig): Routes {
  const routeMap: RouteMap = {};
  const newRoutes: Routes = {};
  // Register custom metronome route
  const baseUrl = "__metronome";

  newRoutes[baseUrl] = {
    id: baseUrl,
    parentId: undefined,
    path: baseUrl,
    index: undefined,
    caseSensitive: undefined,
    module: createClientReportRouteModule({ routeMap, config }),
  };

  newRoutes[`${baseUrl}/web-vitals.$version`] = {
    id: `${baseUrl}/web-vitals.$version`,
    parentId: undefined,
    path: `${baseUrl}/web-vitals/:version`,
    index: undefined,
    caseSensitive: undefined,
    module: webVitalsModule,
  };

  for (const [routeId, route] of Object.entries(routes)) {
    if (routeId === baseUrl || routeId.startsWith(baseUrl)) {
      continue;
    }

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

    newRoutes[routeId] = newRoute;
  }

  return newRoutes;
}
