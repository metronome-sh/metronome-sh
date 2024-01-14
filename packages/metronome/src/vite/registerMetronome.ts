import superjson from "superjson";
import { MetronomeConfigWithRemixPackages, RouteMap, Routes } from "../types";
import { wrapAction, wrapLoader } from "./wrapRemixFunction";
import { startInstrumentation } from "./instrumentation";
import {} from "@remix-run/server-runtime";

export function registerMetronome(
  routes: Routes,
  remixConfig: { version: string },
  configString: string
): Routes {
  startInstrumentation();

  const config = superjson.parse(
    configString
  ) as MetronomeConfigWithRemixPackages;

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
      ...remixConfig,
    };
    if (route.module.action) {
      newRoute.module.action = wrapAction(route.module.action, wrapperOptions);
    }
    if (route.module.loader) {
      newRoute.module.loader = wrapLoader(route.module.loader, wrapperOptions);
    }
    routes[routeId] = newRoute;
  }

  return routes;
  // const routeMap: RouteMap = {};
  // const routes: Record<string, ServerBuild["routes"][string]> = {};
  // if (typeof build === "function") {
  //   throw new Error(
  //     "registerMetronome does not support async build functions yet"
  //   );
  // }
  // for (const [routeId, route] of Object.entries(build.routes)) {
  //   routeMap[routeId] = {
  //     id: routeId,
  //     parentId: route.parentId,
  //     path: route.path,
  //   };
  //   const newRoute = { ...route, module: { ...route.module } };
  //   const wrapperOptions = { routeId, routePath: route.path };
  //   if (route.module.action) {
  //     newRoute.module.action = wrapAction(route.module.action, wrapperOptions);
  //   }
  //   if (route.module.loader) {
  //     newRoute.module.loader = wrapLoader(route.module.loader, wrapperOptions);
  //   }
  //   routes[routeId] = newRoute;
  // }
  // // Register custom metronome route
  // const baseUrl = "__metronome";
  // routes[baseUrl] = {
  //   id: baseUrl,
  //   parentId: undefined,
  //   path: baseUrl,
  //   index: undefined,
  //   caseSensitive: undefined,
  //   module: createReportRouteModule({
  //     routeMap,
  //     hash: build.assets.version,
  //   }),
  // };
  // return { ...build, routes };
}
