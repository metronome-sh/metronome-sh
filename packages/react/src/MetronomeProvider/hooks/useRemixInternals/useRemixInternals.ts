import type { RouteModules } from "@remix-run/server-runtime/dist/routeModules";
import { useEffect, useState } from "react";
import { useLocation } from "@remix-run/react";

export function useRemixInternals() {
  const location = useLocation();

  const [routeId, setRouteId] = useState<string | undefined>(undefined);

  useEffect(() => {
    console.log({ test: window.__remixRouteModules });
    setRouteId(Object.keys(window.__remixRouteModules).pop()!);
  }, [location.pathname, location.search]);

  return { routeId };
}
