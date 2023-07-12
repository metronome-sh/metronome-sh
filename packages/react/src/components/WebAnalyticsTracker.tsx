import { useBeforeUnload, useLocation } from "@remix-run/react";
import { FunctionComponent, useCallback, useEffect, useRef } from "react";
import { useQueue, useGetBrowserData, useGetRemixData } from "../hooks";
import { NavigateAwayEvent } from "@metronome-sh/runtime";
import { stringify } from "../hooks/helpers";

export type WebAnalyticsTrackerProps = {
  doNotTrack?: boolean;
};

const metronomeLsKey = "__metronome__v2__";

export const WebAnalyticsTracker: FunctionComponent<
  WebAnalyticsTrackerProps
> = ({ doNotTrack }) => {
  const id = useRef<string>(
    Math.random().toString(36).substring(2, 10) +
      Math.random().toString(36).substring(2, 10)
  );

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

  const getLocalStorage = useCallback(() => {
    try {
      const metronomeLs = JSON.parse(
        localStorage.getItem(metronomeLsKey) || '{ "ids": [] }'
      ) as { ids: string[] };

      if (Array.isArray(metronomeLs.ids)) return metronomeLs;

      return { ids: [] };
    } catch (error) {
      return { ids: [] };
    }
  }, []);

  const setLocalStorage = useCallback((metronomeLs: { ids: string[] }) => {
    localStorage.setItem(metronomeLsKey, JSON.stringify(metronomeLs));
  }, []);

  useEffect(() => {
    const metronomeLs = getLocalStorage();
    metronomeLs.ids = [...new Set([...metronomeLs.ids, id.current])];
    setLocalStorage(metronomeLs);
  }, []);

  useBeforeUnload(
    useCallback(() => {
      const metronomeLs = getLocalStorage();
      metronomeLs.ids = metronomeLs.ids.filter((w) => w !== id.current);
      setLocalStorage(metronomeLs);

      if (doNotTrack || metronomeLs.ids.length > 0) return;

      const event: NavigateAwayEvent = {
        type: "navigate-away",
        data: {
          browser: getBrowserData(),
          timestamp: Date.now(),
          remix: getRemixData(),
        },
      };
      navigator.sendBeacon?.("/__metronome", stringify([event]));
    }, [doNotTrack, getRemixData, getBrowserData])
  );

  return null;
};

WebAnalyticsTracker.displayName = "MetronomeWebAnalyticsTracker";
