import { FunctionComponent, useEffect, useRef } from "react";
import {
  onLCP,
  onFID,
  onCLS,
  onTTFB,
  onFCP,
  onINP,
  type Metric,
} from "web-vitals";
import { useQueue, useGetBrowserData } from "../hooks";
import { WebVitalIncomingEventData } from "@metronome-sh/runtime";

export type WebVitalsTrackerProps = {
  doNotTrack?: boolean;
};

export const WebVitalsTracker: FunctionComponent<WebVitalsTrackerProps> = ({
  doNotTrack,
}) => {
  const { enqueue } = useQueue();

  const getBrowserData = useGetBrowserData();

  const mounted = useRef(false);

  useEffect(() => {
    if (doNotTrack || mounted.current) return;

    function enqueueWebVital(metric: Metric) {
      const webVitalIncomingEventData: WebVitalIncomingEventData = {
        name: "web-vital",
        timestamp: Date.now(),
        metric: {
          id: metric.id,
          name: metric.name,
          value: metric.value,
          rating: metric.rating,
          navigationType: metric.navigationType,
        },
        ...getBrowserData(),
      };

      enqueue(webVitalIncomingEventData);
    }

    onLCP(enqueueWebVital);
    onFCP(enqueueWebVital);
    onFID(enqueueWebVital);
    onCLS(enqueueWebVital);
    onTTFB(enqueueWebVital);
    onINP(enqueueWebVital);

    mounted.current = true;
  }, [enqueue, getBrowserData, doNotTrack]);

  return null;
};

WebVitalsTracker.displayName = "MetronomeWebVitalsTracker";
