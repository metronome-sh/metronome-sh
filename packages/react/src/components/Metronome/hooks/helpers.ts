import type { RouteModules } from "@remix-run/server-runtime/dist/routeModules";

declare global {
  interface Window {
    __metronomeQueue: any;
    __metronomeLoaded: boolean;
    __remixRouteModules: RouteModules<any>;
  }
}

export function getCurrentRouteId() {
  const routeId = Object.keys(window.__remixRouteModules).pop();
  return routeId;
}
