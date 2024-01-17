import { useCallback } from "react";
import { useLocation } from "@remix-run/react";

export function useGetBrowserData() {
  const location = useLocation();

  const useGetBrowserData = useCallback((): any => {
    // const useGetBrowserData = useCallback((): BrowserData => {
    const connection =
      (navigator as any).connection ||
      (navigator as any).mozConnection ||
      (navigator as any).webkitConnection;

    const minWidth = 768;
    // prettier-ignore
    const hasTouchSupport = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    let deviceCategory = "desktop";

    if (hasTouchSupport) {
      const hasSmallScreen = window.screen.width < minWidth;
      deviceCategory = hasSmallScreen ? "mobile" : "tablet";
    }

    return {
      pathname: location.pathname,
      url: window.location.href,
      hostname: window.location.hostname,
      referrer: document.referrer,
      screen: `${window.screen.width}x${window.screen.height}`,
      language: navigator.language,
      connection: connection?.effectiveType || "unknown",
      deviceCategory,
    };
  }, [location]);

  return useGetBrowserData;
}
