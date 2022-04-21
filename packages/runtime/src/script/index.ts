import { getLCP, getFID, getCLS, getTTFB, getFCP } from "web-vitals/base";
import type { ReportHandler } from "web-vitals";
import type { EntryContext } from "@remix-run/react/entry";
import { encodeObject, decodeObject } from "../routes/helpers";

const base = "__metronome";

const remixContext = (window as any).__remixContext as EntryContext;

const connection =
  (navigator as any).connection ||
  (navigator as any).mozConnection ||
  (navigator as any).webkitConnection;

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

  navigator.sendBeacon(`${base}/web-vitals`, encodeObject(payload));
};

getLCP(reportWebVitals);
getFID(reportWebVitals);
getCLS(reportWebVitals);
getTTFB(reportWebVitals);
getFCP(reportWebVitals);
