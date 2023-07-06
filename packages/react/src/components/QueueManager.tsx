import type { ClientEvent } from "@metronome-sh/runtime";
import { FunctionComponent, useCallback, useEffect, useRef } from "react";

const n = 138;

function stringify(queue: ClientEvent[]) {
  const str = JSON.stringify(queue);
  const date = new Date();
  const first = date.getUTCHours() + date.getUTCMinutes();
  date.setHours(date.getHours() + 13);
  const second = date.getUTCHours() + date.getUTCMinutes();

  function prep(k: number) {
    const chars = str.split("");

    for (var i = 0; i < chars.length; i++) {
      var c = chars[i].charCodeAt(0);

      if (c <= n) {
        chars[i] = String.fromCharCode((chars[i].charCodeAt(0) + k) % n);
      }
    }
    return chars.join("");
  }

  return prep(first) + prep(second);
}
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
