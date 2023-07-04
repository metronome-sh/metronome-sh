import { useLocation } from "@remix-run/react";
import { useRemixManifest } from "../useRemixManifest";
import { useCallback, useMemo } from "react";

export function useGetRouteId() {
  const routeMap = useMemo(() => {
    if (!window.__remixManifest) {
      console.warn("Metronome: Remix manifest was not loaded");
      return {};
    }

    const routeIdPathMap = Object.entries(window.__remixManifest.routes).reduce(
      (acc, [routeId, route]) => {
        if (!route.path && route.index && route.parentId) {
          return {
            ...acc,
            [route.parentId == "root" ? "" : route.parentId]: routeId,
          };
        }

        if (route.path) {
          return { ...acc, [route.path]: routeId };
        }

        return acc;
      },
      {} as Record<string, string>
    );

    return routeIdPathMap;
  }, []);

  const location = useLocation();

  const getRouteId = useCallback(
    ({ pathname }: { pathname: string }) => {
      const path = location.pathname.slice(1);
      return routeMap[path];
    },
    [routeMap, location]
  );

  return getRouteId;
}
