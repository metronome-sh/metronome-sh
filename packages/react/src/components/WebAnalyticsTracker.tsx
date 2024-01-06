import { useLocation } from "@remix-run/react";
import { FunctionComponent, useEffect, useRef } from "react";
import { useQueue, useGetBrowserData } from "../hooks";
import { PageviewIncomingEventData } from "@metronome-sh/runtime";
import { METRONOME_VERSION } from "../constants";

const metronomeLsKey = `__metronome__${METRONOME_VERSION.replace(/\./g, "_")}`;

export const WebAnalyticsTracker: FunctionComponent = () => {
  const lastLocationKey = useRef<string | null>();

  const location = useLocation();

  const getBrowserData = useGetBrowserData();

  const { enqueue } = useQueue();

  const intervalId = useRef<NodeJS.Timer | undefined>(undefined);

  useEffect(() => {
    const { key } = location;

    if (lastLocationKey.current === key) return;

    const pageViewIncomingEventData: PageviewIncomingEventData = {
      name: "pageview",
      timestamp: Date.now(),
      ...getBrowserData(),
    };

    setTimeout(() => {
      enqueue(pageViewIncomingEventData);
    }, 1000);

    lastLocationKey.current = key;

    return () => {
      clearInterval(intervalId.current);
    };
  }, [location, getBrowserData]);

  return null;
};

WebAnalyticsTracker.displayName = "MetronomeWebAnalyticsTracker";
