import { getLCP, getFID, getCLS, getTTFB, getFCP } from "web-vitals/base";
import type { ReportHandler } from "web-vitals";
import type { EntryContext } from "@remix-run/react/entry";
import { encodeObject } from "../routes/helpers";
import type { MetronomeReport } from "../schemas";
import type { Infer } from "superstruct";

declare global {
  interface Window {
    __metronomeQueue: Infer<typeof MetronomeReport>;
  }
}

window.__metronomeQueue = {
  webVitals: [],
};

const remixContext = (window as any).__remixContext as EntryContext;

const getQueueEntriesCount = (queue: typeof window.__metronomeQueue) => {
  return Object.values(queue).reduce((acc, items) => acc + items.length, 0);
};

const enqueue = (key: keyof typeof window.__metronomeQueue, data: any) => {
  window.__metronomeQueue[key].push(data);

  if (getQueueEntriesCount(window.__metronomeQueue) >= 10) {
    reportMetrics();
  }
};

const reportMetrics = () => {
  const queue = window.__metronomeQueue;
  window.__metronomeQueue = { webVitals: [] };

  if (getQueueEntriesCount(queue) === 0) return;

  const encoded = encodeObject(queue);

  if (navigator.sendBeacon) {
    navigator.sendBeacon("/__metronome", encoded);
  } else {
    fetch("/__metronome", { body: encoded, method: "POST", keepalive: true });
  }
};

// Report periodically every 30 seconds
const intervalId = setInterval(reportMetrics, 30000);

const enqueueWebVital: ReportHandler = ({ name, value, id }) => {
  const connection =
    (navigator as any).connection ||
    (navigator as any).mozConnection ||
    (navigator as any).webkitConnection;

  const { matches } = remixContext;

  const entryRoute = [...matches].pop()!;

  const webVital = {
    metric: { name, value, id },
    connection: connection?.effectiveType || "unknown",
    routeId: entryRoute.route.id,
    routePath: entryRoute.route.path,
    pathname: entryRoute.pathname,
  };

  enqueue("webVitals", webVital);
};

addEventListener("visibilitychange", () => {
  if (document.visibilityState === "hidden") {
    clearInterval(intervalId);
    reportMetrics();
  }
});

addEventListener("pagehide", () => {
  clearInterval(intervalId);
  reportMetrics();
});

getLCP(enqueueWebVital);
getFID(enqueueWebVital);
getCLS(enqueueWebVital);
getTTFB(enqueueWebVital);
getFCP(enqueueWebVital);
