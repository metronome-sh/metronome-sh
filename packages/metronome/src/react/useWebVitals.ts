import { useEffect, useRef, useState } from "react";
import { useGetBrowserData } from "./useGetBrowserData";
import type { useQueue } from "./useQueue";
import { METRONOME_VERSION } from "../common/constants";
import type * as WebVitals from "web-vitals/attribution";

declare global {
  interface Window {
    _webVitals?: typeof WebVitals;
  }
}

export function useWebVitals(enqueue: ReturnType<typeof useQueue>["enqueue"]) {
  const getBrowserData = useGetBrowserData();
  const [webVitalScriptLoaded, setWebVitalScriptLoaded] = useState(false);

  useEffect(() => {
    const handleOnLoad = () => {
      window._webVitals = window.webVitals as unknown as typeof WebVitals;
      setWebVitalScriptLoaded(true);
    };

    const script = document.createElement("script");
    script.src = `/__metronome/web-vitals/${METRONOME_VERSION}`;
    script.onload = handleOnLoad;
    document.head.appendChild(script);
  }, []);

  useEffect(() => {
    if (!webVitalScriptLoaded || typeof window._webVitals === "undefined") return;

    function enqueueWebVital(metric: WebVitals.Metric) {
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

      enqueue(webVitalMetric);
    }

    window._webVitals.onFCP(enqueueWebVital);
    window._webVitals.onFCP(enqueueWebVital);
    window._webVitals.onFID(enqueueWebVital);
    window._webVitals.onCLS(enqueueWebVital);
    window._webVitals.onTTFB(enqueueWebVital);
    window._webVitals.onINP(enqueueWebVital);
  }, [webVitalScriptLoaded]);
}
