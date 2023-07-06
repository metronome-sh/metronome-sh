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
import { useQueue, useGetBrowserData, useGetRemixData } from "../hooks";

export type WebVitalsTrackerProps = {
  doNotTrack?: boolean;
};

export const WebVitalsTracker: FunctionComponent<WebVitalsTrackerProps> = ({
  doNotTrack,
}) => {
  const { enqueue } = useQueue();

  const getBrowserData = useGetBrowserData();

  const getRemixData = useGetRemixData();

  const mounted = useRef(false);

  useEffect(() => {
    if (doNotTrack || mounted.current) return;

    function enqueueWebVital(metric: Metric) {
      enqueue({
        type: "web-vital",
        data: {
          timestamp: Date.now(),
          metric: {
            id: metric.id,
            name: metric.name,
            value: metric.value,
            rating: metric.rating,
            navigationType: metric.navigationType,
          },
          browser: getBrowserData(),
          remix: getRemixData(),
        },
      });
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
