import { useLocation } from "@remix-run/react";
import { FunctionComponent, useEffect, useRef } from "react";
import { useGetRouteId, useGetBrowserData } from "../../hooks";
import { useQueue } from "../../hooks/useQueue/useQueue";

export type PageViewTrackerProps = {
  doNotTrack?: boolean;
};

export const PageViewTracker: FunctionComponent<PageViewTrackerProps> = ({
  doNotTrack,
}) => {
  const lastLocationKey = useRef<string | null>();

  const location = useLocation();

  const getRouteId = useGetRouteId();

  const getBrowserData = useGetBrowserData();

  const { enqueue } = useQueue();

  useEffect(() => {
    if (doNotTrack) return;

    const { key, pathname } = location;

    const routeId = getRouteId({ pathname });

    if (lastLocationKey.current === key || !routeId) return;

    enqueue({
      type: "pageview",
      data: { browser: getBrowserData() },
    });

    lastLocationKey.current = key;
  }, [location, getBrowserData, getRouteId, doNotTrack]);

  return null;
};

PageViewTracker.displayName = "MetronomePageViewTracker";
