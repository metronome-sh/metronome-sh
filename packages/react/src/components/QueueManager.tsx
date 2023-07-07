import { FunctionComponent, useCallback, useEffect, useRef } from "react";
import { stringify } from "../hooks/helpers";

export const QueueManager: FunctionComponent = () => {
  const intervalId = useRef<NodeJS.Timer | undefined>(undefined);

  const report = useCallback(() => {
    if (!window.__metronomeQueue || window.__metronomeQueue.length === 0) {
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

    // Window events
    addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden") {
        report();
      }
    });

    addEventListener("pagehide", () => {
      report();
    });

    addEventListener("beforeunload", () => {
      report();
    });

    intervalId.current = setInterval(report, 30000);

    // Flush the queue
    return () => {
      clearInterval(intervalId.current);
      report();
    };
  }, []);

  return null;
};

QueueManager.displayName = "MetronomeQueueManager";
