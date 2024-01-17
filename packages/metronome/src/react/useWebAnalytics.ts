import { useLocation } from "@remix-run/react";
import { useEffect, useRef } from "react";
import { useGetBrowserData } from "./useGetBrowserData";
import { useQueue } from "./useQueue";

export function useWebAnalytics(
  enqueue: ReturnType<typeof useQueue>["enqueue"]
) {
  const lastLocationKey = useRef<string | null>();

  const location = useLocation();

  const getBrowserData = useGetBrowserData();

  useEffect(() => {
    const { key } = location;

    if (lastLocationKey.current === key) return;

    const pageviewMetric = {
      name: "pageview",
      timestamp: Date.now(),
      ...getBrowserData(),
    };

    enqueue(pageviewMetric);

    lastLocationKey.current = key;
  }, [location, getBrowserData]);
}
