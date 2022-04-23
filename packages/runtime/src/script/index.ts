import { getLCP, getFID, getCLS, getTTFB, getFCP } from "web-vitals/base";
import type { ReportHandler } from "web-vitals";
import type { EntryContext } from "@remix-run/react/entry";
import { encodeObject } from "../routes/helpers";

const base = "__metronome";

const remixContext = (window as any).__remixContext as EntryContext;

const connection =
  (navigator as any).connection ||
  (navigator as any).mozConnection ||
  (navigator as any).webkitConnection;

const send = (payload: any) => {
  const encodedPayload = encodeObject(payload);
  if (navigator.sendBeacon) {
    navigator.sendBeacon(`${base}/web-vitals`, encodedPayload);
  } else {
    fetch("/analytics", {
      body: encodedPayload,
      method: "POST",
      keepalive: true,
    });
  }
};

const reportWebVitals: ReportHandler = ({ name, value, id, delta }) => {
  const { matches } = remixContext;

  const entryRoute = [...matches].pop()!;

  const payload = {
    metric: { name, value, id, delta },
    connection: connection?.effectiveType || "unknown",
    routeId: entryRoute.route.id,
    routePath: entryRoute.route.path,
    pathname: entryRoute.pathname,
  };

  send(payload);
};

getLCP(reportWebVitals);
getFID(reportWebVitals);
getCLS(reportWebVitals);
getTTFB(reportWebVitals);
getFCP(reportWebVitals);
