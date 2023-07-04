import { MetronomeEventStructType } from "@metronome-sh/runtime";
import {
  FunctionComponent,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
} from "react";

export const QueueManager: FunctionComponent = () => {
  const intervalId = useRef<NodeJS.Timer | undefined>(undefined);

  const report = useCallback(() => {
    if (!window.__metronomeQueue || window.__metronomeQueue.length === 0) {
      return;
    }

    console.log("Reporting queue", window.__metronomeQueue);

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
