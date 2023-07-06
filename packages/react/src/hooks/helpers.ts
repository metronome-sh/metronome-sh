import type { RouteModules } from "@remix-run/server-runtime/dist/routeModules";

export function getCurrentRouteId() {
  const routeId = Object.keys(window.__remixRouteModules).pop();
  return routeId;
}
