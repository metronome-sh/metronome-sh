import type { RouteModules } from "@remix-run/server-runtime/dist/routeModules";
import { useEffect, useState } from "react";
import { useLocation } from "@remix-run/react";

declare global {
  interface Window {
    __metronomeQueue: any;
    __metronomeLoaded: boolean;
    __remixRouteModules: RouteModules<any>;
  }
}

export function useRemixInternals() {
  const location = useLocation();

  const [routeId, setRouteId] = useState<string | undefined>(undefined);

  useEffect(() => {
    setRouteId(Object.keys(window.__remixRouteModules).pop()!);
  }, [location.pathname, location.search]);

  return { routeId };
}
