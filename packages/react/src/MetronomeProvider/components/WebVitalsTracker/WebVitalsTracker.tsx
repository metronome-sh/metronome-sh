import { FunctionComponent, useEffect, useRef } from "react";
import { onLCP, onFID, onCLS, onTTFB, onFCP, type Metric } from "web-vitals";
import { useQueue } from "../../hooks/useQueue/useQueue";
import { useGetBrowserData } from "../../hooks";

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
      enqueue({
        type: "web-vital",
        data: {
          browser: getBrowserData(),
          metric: {
            id: metric.id,
            name: metric.name,
            navigationType: metric.navigationType,
            rating: metric.rating,
            value: metric.value,
          },
        },
      });
    }

    onLCP(enqueueWebVital);
    onFCP(enqueueWebVital);
    onFID(enqueueWebVital);
    onCLS(enqueueWebVital);
    onTTFB(enqueueWebVital);

    mounted.current = true;
  }, [enqueue, getBrowserData, doNotTrack]);

  return null;
};

WebVitalsTracker.displayName = "MetronomeWebVitalsTracker";
