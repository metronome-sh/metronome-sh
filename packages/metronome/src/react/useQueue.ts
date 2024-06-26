import { useCallback, useEffect, useRef } from "react";
import { obfuscate } from "../common/helpers";
import { METRONOME_REPORT_ROUTE } from "../common/constants";

if (typeof window !== "undefined") {
  window.__metronomeQueue = window.__metronomeQueue ?? [];
  window.__metronomeDoNotTrack = window.__metronomeDoNotTrack ?? false;
}

export function useQueue() {
  const intervalId = useRef<NodeJS.Timeout | undefined>(undefined);

  const report = useCallback(() => {
    if (window.__metronomeQueue.length === 0 || window.__metronomeDoNotTrack) {
      return;
    }

    const str = obfuscate(window.__metronomeQueue);

    if (navigator.sendBeacon) {
      navigator.sendBeacon(METRONOME_REPORT_ROUTE, str);
    } else {
      fetch(METRONOME_REPORT_ROUTE, { body: str, method: "POST", keepalive: true });
    }

    window.__metronomeQueue = [];
  }, []);

  // Set up the queue
  useEffect(() => {
    const visibilityChangeHandler = () => {
      if (document.visibilityState === "hidden") {
        report();
      }
    };

    addEventListener("visibilitychange", visibilityChangeHandler);
    addEventListener("pagehide", report);
    addEventListener("beforeunload", report);
    intervalId.current = setInterval(report, 5000);

    // Flush the queue
    return () => {
      removeEventListener("visibilitychange", visibilityChangeHandler);
      removeEventListener("pagehide", report);
      removeEventListener("beforeunload", report);
      clearInterval(intervalId.current);
      report();
    };
  }, []);

  const enqueue = useCallback((event: any) => {
    window.__metronomeQueue.push(event);
  }, []);

  return { enqueue };
}
