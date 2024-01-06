import { FunctionComponent, useCallback, useEffect, useRef } from "react";
import { stringify } from "../hooks/helpers";
import { useMetronomeContext } from "../metronomeContext";

export const QueueManager: FunctionComponent = () => {
  const intervalId = useRef<NodeJS.Timer | undefined>(undefined);

  const { doNotTrack } = useMetronomeContext();

  const report = useCallback(() => {
    if (
      !window.__metronomeQueue ||
      window.__metronomeQueue.length === 0 ||
      doNotTrack
    ) {
      return;
    }

    const str = stringify(window.__metronomeQueue);

    if (navigator.sendBeacon) {
      navigator.sendBeacon("/__metronome", str);
    } else {
      fetch("/__metronome", { body: str, method: "POST", keepalive: true });
    }

    window.__metronomeQueue = [];
  }, []);

  // Set up the queue
  useEffect(() => {
    if (!window.__metronomeQueue) {
      window.__metronomeQueue = [];
    }

    if (doNotTrack) return;

    const visibilityChangeCallback = () => {
      if (document.visibilityState === "hidden") {
        report();
      }
    };

    // Window events
    addEventListener("visibilitychange", visibilityChangeCallback);

    addEventListener("pagehide", report);

    addEventListener("beforeunload", report);

    intervalId.current = setInterval(report, 5000);

    // Flush the queue
    return () => {
      clearInterval(intervalId.current);
      removeEventListener("visibilitychange", visibilityChangeCallback);
      removeEventListener("pagehide", report);
      removeEventListener("beforeunload", report);

      // if (doNotTrack) return;

      // report();
    };
  }, [report, doNotTrack]);

  return null;
};

QueueManager.displayName = "MetronomeQueueManager";
