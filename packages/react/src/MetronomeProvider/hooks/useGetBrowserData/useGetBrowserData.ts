import { useCallback, useEffect, useRef, useState } from "react";
import type { BrowserDataStructType } from "@metronome-sh/runtime";
import { useGetRouteId } from "../useGetRouteId";
import { useLocation } from "@remix-run/react";

export function useGetBrowserData() {
  const getRouteId = useGetRouteId();
  const { pathname } = useLocation();

  const useGetBrowserData = useCallback((): BrowserDataStructType => {
    const connection =
      (navigator as any).connection ||
      (navigator as any).mozConnection ||
      (navigator as any).webkitConnection;

    return {
      routeId: getRouteId({ pathname }),
      pathname,
      hostname: window.location.hostname,
      referrer: document.referrer,
      screen: `${window.screen.width}x${window.screen.height}`,
      language: navigator.language,
      connection: connection?.effectiveType || "unknown",
    };
  }, [getRouteId, location]);

  return useGetBrowserData;
}
