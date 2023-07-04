import { useLocation } from "@remix-run/react";
import { FunctionComponent, useEffect, useRef } from "react";
import { useGetRouteId, useGetBrowserData } from "../../hooks";

export const PageViewTracker: FunctionComponent = () => {
  const lastLocationKey = useRef<string | null>();

  const location = useLocation();

  const getRouteId = useGetRouteId();

  const getBrowserData = useGetBrowserData();

  useEffect(() => {
    const { key, pathname } = location;

    const routeId = getRouteId({ pathname });

    if (lastLocationKey.current === key || !routeId) return;

    console.log("test", { browser: getBrowserData() });

    lastLocationKey.current = key;
  }, [location, getBrowserData, getRouteId]);

  return null;
};

PageViewTracker.displayName = "MetronomePageViewTracker";
