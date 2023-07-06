import { useCallback, useEffect, useRef, useState } from "react";
import type { BrowserData } from "@metronome-sh/runtime";
import { useLocation } from "@remix-run/react";

export function useGetBrowserData() {
  const location = useLocation();

  const useGetBrowserData = useCallback((): BrowserData => {
    const connection =
      (navigator as any).connection ||
      (navigator as any).mozConnection ||
      (navigator as any).webkitConnection;

    return {
      pathname: location.pathname,
      hostname: window.location.hostname,
      referrer: document.referrer,
      screen: `${window.screen.width}x${window.screen.height}`,
      language: navigator.language,
      connection: connection?.effectiveType || "unknown",
    };
  }, [location]);

  return useGetBrowserData;
}
