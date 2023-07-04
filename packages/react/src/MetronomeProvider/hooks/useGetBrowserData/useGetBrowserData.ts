import { useCallback, useEffect, useRef, useState } from "react";
import type { BrowserDataStructType } from "@metronome-sh/runtime";
import { useGetRouteId } from "../useGetRouteId";
import { useLocation } from "@remix-run/react";
import { get } from "http";

export function useGetBrowserData() {
  const getRouteId = useGetRouteId();
  const { pathname } = useLocation();

  const useGetBrowserData = useCallback((): BrowserDataStructType => {
    return {
      routeId: getRouteId({ pathname }),
      pathname,
      hostname: window.location.hostname,
      referrer: document.referrer,
      screen: `${window.screen.width}x${window.screen.height}`,
    };
  }, [getRouteId]);

  return useGetBrowserData;
}
