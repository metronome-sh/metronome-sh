import { useCallback, useMemo } from "react";
import { RemixData } from "@metronome-sh/runtime";

export function useGetRemixData() {
  const routes = useMemo(() => {
    if (typeof window === "undefined") return {};

    if (!window.__remixManifest) {
      console.warn("Metronome: Remix manifest was not loaded");
      return {};
    }

    return window.__remixManifest.routes;
  }, []);

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
      routePath: route.path || "",
    };

    return data;
  }, [routes, currentRemixRouteId]);

  return getRouteData;
}
