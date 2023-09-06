import { useCallback, useMemo } from "react";
import { type RemixData } from "@metronome-sh/runtime";

export function useGetRemixData() {
  const routes = useMemo(() => {
    if (typeof window === "undefined") return {};

    if (!window.__remixManifest) {
      console.warn("Metronome: Remix manifest was not loaded");
      return {};
    }

    return window.__remixManifest.routes;
  }, []);

  const getFullPath = useCallback(
    (key: keyof typeof routes) => {
      if (!routes[key]) {
        throw new Error(`Invalid key: ${key}`);
      }

      let path: string[] = [];
      let route = routes[key];
      let visited = new Set();

      while (route) {
        path = [route.path || "", ...path];

        if (!route.parentId || visited.has(route.parentId)) break;

        // This should never happen, but just to prevent infinite loops
        visited.add(route.parentId);

        route = routes[route.parentId];
      }

      const fullPath = path.join("/");

      return fullPath;
    },
    [routes]
  );

  const currentRemixRouteId = useMemo(() => {
    if (typeof window === "undefined") return "";

    if (!window.__remixRouteModules) {
      console.warn("Metronome: Remix route modules was not loaded");
      return "";
    }

    return Object.keys(window.__remixRouteModules).at(-1);
  }, []);

  const getRouteData = useCallback((): RemixData => {
    const route = routes[currentRemixRouteId || ""];

    const data = {
      hash: window.__remixManifest.version,
      routeId: route.id,
      routePath: getFullPath(route.id),
    };

    return data;
  }, [routes, currentRemixRouteId, getFullPath]);

  return getRouteData;
}
