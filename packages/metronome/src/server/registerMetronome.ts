import { MetronomeResolvedConfig, RouteMap, Routes } from "../common/types";
import { wrapRemixFunction } from "./wrapRemixFunction";
import { createClientReportRouteModule } from "./createClientReportRouteModule";
import * as webVitalsModule from "./webVitalsModule";
import { METRONOME_REPORT_ROUTE, METRONOME_WEB_VITALS_ROUTE } from "../common/constants";

export function registerMetronome(routes: Routes, config: MetronomeResolvedConfig): Routes {
  const routeMap: RouteMap = {};
  const newRoutes: Routes = {};

  newRoutes[METRONOME_REPORT_ROUTE] = {
    id: METRONOME_REPORT_ROUTE,
    parentId: undefined,
    path: METRONOME_REPORT_ROUTE,
    index: false,
    caseSensitive: undefined,
    module: createClientReportRouteModule({ routeMap, config }),
  };

  newRoutes[METRONOME_WEB_VITALS_ROUTE] = {
    id: METRONOME_WEB_VITALS_ROUTE,
    parentId: undefined,
    path: METRONOME_WEB_VITALS_ROUTE,
    index: false,
    caseSensitive: undefined,
    module: webVitalsModule,
  };

  for (const [routeId, route] of Object.entries(routes)) {
    if (routeId === METRONOME_WEB_VITALS_ROUTE || routeId === METRONOME_REPORT_ROUTE) {
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
