import { useLocation } from "@remix-run/react";
import { FunctionComponent, useEffect, useRef } from "react";
import { useQueue, useGetBrowserData, useGetRemixData } from "../hooks";

export type PageViewTrackerProps = {
  doNotTrack?: boolean;
};

export const PageViewTracker: FunctionComponent<PageViewTrackerProps> = ({
  doNotTrack,
}) => {
  const lastLocationKey = useRef<string | null>();

  const location = useLocation();

  const getBrowserData = useGetBrowserData();

  const getRemixData = useGetRemixData();

  const { enqueue } = useQueue();

  useEffect(() => {
    if (doNotTrack) return;

    const { key } = location;

    const remix = getRemixData();

    if (lastLocationKey.current === key || !remix.routeId) return;

    enqueue({
      type: "pageview",
      data: { browser: getBrowserData(), timestamp: Date.now(), remix },
    });

    lastLocationKey.current = key;
  }, [location, getBrowserData, getRemixData, doNotTrack]);

  return null;
};

PageViewTracker.displayName = "MetronomePageViewTracker";
