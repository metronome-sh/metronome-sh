import type { RouteModules } from "@remix-run/server-runtime/dist/routeModules";
import { useEffect, useRef } from "react";
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

  const routeIdRef = useRef<string>();

  useEffect(() => {
    routeIdRef.current = Object.keys(window.__remixRouteModules).pop()!;
  }, [location.pathname]);

  console.log({ routeId: routeIdRef.current });

  return {
    routeId: routeIdRef.current,
  };
}
