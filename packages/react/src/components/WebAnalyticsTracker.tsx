import { useBeforeUnload, useLocation } from "@remix-run/react";
import { FunctionComponent, useCallback, useEffect, useRef } from "react";
import { useQueue, useGetBrowserData, useGetRemixData } from "../hooks";
import {
  NavigateAwayIncomingEventData,
  PageviewIncomingEventData,
} from "@metronome-sh/runtime";
import { stringify } from "../hooks/helpers";
import { METRONOME_VERSION } from "../constants";

export type WebAnalyticsTrackerProps = {
  doNotTrack?: boolean;
};

const metronomeLsKey = `__metronome__${METRONOME_VERSION.replace(/\./g, "_")}`;

type WindowId = { id: string; ts: number };
type WindowIds = WindowId[];
type MetronomeLsData = { ids: WindowIds };

export const WebAnalyticsTracker: FunctionComponent<
  WebAnalyticsTrackerProps
> = ({ doNotTrack }) => {
  const windowId = useRef<WindowId>({
    id: Math.random().toString(36).substring(2, 10),
    ts: Date.now(),
  });

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

    const pageViewIncomingEventData: PageviewIncomingEventData = {
      name: "pageview",
      timestamp: Date.now(),
      ...getBrowserData(),
      ...remix,
    };

    enqueue(pageViewIncomingEventData);

    lastLocationKey.current = key;
  }, [location, getBrowserData, getRemixData, doNotTrack]);

  const getLocalStorage = useCallback((): MetronomeLsData => {
    try {
      const metronomeLs = JSON.parse(
        localStorage.getItem(metronomeLsKey) || '{ "ids": [] }'
      ) as { ids: { id: string; ts: number }[] };

      if (Array.isArray(metronomeLs.ids)) return metronomeLs;

      return { ids: [] };
    } catch (error) {
      return { ids: [] };
    }
  }, []);

  const setLocalStorage = useCallback((metronomeLs: MetronomeLsData) => {
    localStorage.setItem(metronomeLsKey, JSON.stringify(metronomeLs));
  }, []);

  useEffect(() => {
    const metronomeLs = getLocalStorage();

    metronomeLs.ids = [
      ...metronomeLs.ids.filter((i) => i.id !== windowId.current.id),
      windowId.current,
    ];

    setLocalStorage(metronomeLs);
  }, []);

  useBeforeUnload(
    useCallback(() => {
      const metronomeLs = getLocalStorage();

      // Clean up old window ids that are older than 30 minutes
      metronomeLs.ids = metronomeLs.ids.filter((w) => {
        return (
          w.id !== windowId.current.id || w.ts - Date.now() > 1000 * 60 * 30
        );
      });

      console.log(JSON.stringify({ windowId, metronomeLs }, null, 2));

      setLocalStorage(metronomeLs);

      if (doNotTrack || metronomeLs.ids.length > 0) return;

      const event: NavigateAwayIncomingEventData = {
        name: "navigate-away",
        timestamp: Date.now(),
        ...getRemixData(),
        ...getBrowserData(),
      };

      navigator.sendBeacon?.("/__metronome", stringify([event]));
    }, [doNotTrack, getRemixData, getBrowserData])
  );

  return null;
};

WebAnalyticsTracker.displayName = "MetronomeWebAnalyticsTracker";
