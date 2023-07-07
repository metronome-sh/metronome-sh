import { useLocation } from "@remix-run/react";
import { FunctionComponent, useEffect, useRef } from "react";
import { useQueue, useGetBrowserData, useGetRemixData } from "../hooks";
import { NavigateAwayEvent } from "@metronome-sh/runtime";
import { stringify } from "../hooks/helpers";

export type WebAnalyticsTrackerProps = {
  doNotTrack?: boolean;
};

export const WebAnalyticsTracker: FunctionComponent<
  WebAnalyticsTrackerProps
> = ({ doNotTrack }) => {
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

  useEffect(() => {
    if (doNotTrack) return;

    function handleOnBeforeUnload() {
      const event: NavigateAwayEvent = {
        type: "navigate-away",
        data: {
          browser: getBrowserData(),
          timestamp: Date.now(),
          remix: getRemixData(),
        },
      };

      if (navigator.sendBeacon) {
        navigator.sendBeacon("/__metronome", stringify([event]));
      } else {
        fetch("/__metronome", {
          body: stringify([event]),
          method: "POST",
          keepalive: true,
        });
      }
    }

    window.addEventListener("beforeunload", handleOnBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleOnBeforeUnload);
    };
  }, [getRemixData, getBrowserData, enqueue, doNotTrack]);

  return null;
};

WebAnalyticsTracker.displayName = "MetronomeWebAnalyticsTracker";
