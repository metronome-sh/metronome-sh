import { getLCP, getFID, getCLS, getTTFB, getFCP } from "web-vitals/base";
import type { ReportHandler } from "web-vitals";
import { encodeObject } from "../routes/helpers";
import type { Infer } from "superstruct";
import type { RouteModules } from "@remix-run/server-runtime/dist/routeModules";

declare global {
  interface Window {
    __metronomeQueue: any;
    __metronomeLoaded: boolean;
    __remixRouteModules: RouteModules<any>;
  }
}

window.__metronomeQueue = [];

const getQueueEntriesCount = (queue: typeof window.__metronomeQueue) => {
  return window.__metronomeQueue.length;
  // return Object.values(queue).reduce((acc, items) => acc + items.length, 0);
};

const enqueue = (key: keyof typeof window.__metronomeQueue, data: any) => {
  window.__metronomeQueue.push(data);

  if (getQueueEntriesCount(window.__metronomeQueue) >= 10) {
    reportMetrics();
  }
};

const reportMetrics = () => {
  const queue = window.__metronomeQueue;
  // window.__metronomeQueue = { webVitals: [] };

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

  const routeId = Object.keys(window.__remixRouteModules).pop()!;

  const webVital = {
    metric: { name, value, id },
    connection: connection?.effectiveType || "unknown",
    routeId,
    pathname: new URL(window.location.href).pathname,
  };

  // enqueue("webVitals", webVital);
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

window.__metronomeLoaded = false;

let waitForRemixIntervalId = setInterval(() => {
  if (window.__remixRouteModules) {
    clearInterval(waitForRemixIntervalId);
    getLCP(enqueueWebVital);
    getFID(enqueueWebVital);
    getCLS(enqueueWebVital);
    getTTFB(enqueueWebVital);
    getFCP(enqueueWebVital);
    window.__metronomeLoaded = true;
  }
}, 1000);
