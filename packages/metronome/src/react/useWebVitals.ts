import { useEffect, useRef } from "react";
import { useGetBrowserData } from "./useGetBrowserData";
import type { useQueue } from "./useQueue";
import { onLCP, onFID, onCLS, onTTFB, onFCP, onINP, type Metric } from "web-vitals/attribution";

export function useWebVitals(enqueue: ReturnType<typeof useQueue>["enqueue"]) {
  const mounted = useRef(false);
  const getBrowserData = useGetBrowserData();

  useEffect(() => {
    if (mounted.current) return;

    function enqueueWebVital(metric: Metric) {
      const webVitalMetric = {
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

      console.log(webVitalMetric);
      enqueue(webVitalMetric);
    }

    onLCP(enqueueWebVital);
    onFCP(enqueueWebVital);
    onFID(enqueueWebVital);
    onCLS(enqueueWebVital);
    onTTFB(enqueueWebVital);
    onINP(enqueueWebVital);

    mounted.current = true;
  }, [enqueue, getBrowserData]);
}
