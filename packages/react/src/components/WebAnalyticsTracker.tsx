import { useLocation } from "@remix-run/react";
import { FunctionComponent, useEffect, useRef } from "react";
import { useQueue, useGetBrowserData } from "../hooks";
import { PageviewIncomingEventData } from "@metronome-sh/runtime";
import { METRONOME_VERSION } from "../constants";

export type WebAnalyticsTrackerProps = {
  doNotTrack?: boolean;
};

const metronomeLsKey = `__metronome__${METRONOME_VERSION.replace(/\./g, "_")}`;

export const WebAnalyticsTracker: FunctionComponent<
  WebAnalyticsTrackerProps
> = ({ doNotTrack }) => {
  const lastLocationKey = useRef<string | null>();

  const location = useLocation();

  const getBrowserData = useGetBrowserData();

  const { enqueue } = useQueue();

  useEffect(() => {
    if (doNotTrack) return;

    const { key } = location;

    if (lastLocationKey.current === key) return;

    const pageViewIncomingEventData: PageviewIncomingEventData = {
      name: "pageview",
      timestamp: Date.now(),
      ...getBrowserData(),
    };

    enqueue(pageViewIncomingEventData);

    lastLocationKey.current = key;
  }, [location, getBrowserData, doNotTrack]);

  return null;
};

WebAnalyticsTracker.displayName = "MetronomeWebAnalyticsTracker";
