import { useCallback, useEffect, useMemo, useRef } from "react";
import { getLCP, getFID, getCLS, getTTFB, getFCP } from "web-vitals";
import type { ReportHandler } from "web-vitals";
import { EntryContext } from "@remix-run/react/entry";

export const useMetronome = () => {
  const { current: queue } = useRef<any[]>([]);

  const { current: remixContext } = useRef<EntryContext>(
    typeof window !== "undefined" ? (window as any).__remixContext : undefined
  );

  const connection = useMemo(
    () =>
      (navigator as any).connection ||
      (navigator as any).mozConnection ||
      (navigator as any).webkitConnection,
    []
  );

  const report = useCallback<ReportHandler>(
    ({ name, value, id, delta }) => {
      const { matches } = remixContext;
      const entryRoute = matches[matches.length - 1]!;

      const payload = {
        metric: { name, value, id, delta },
        connection: connection?.effectiveType || "unknown",
        routeId: entryRoute.route.id,
        routePath: entryRoute.route.path,
        pathname: entryRoute.pathname,
      };

      queue.push(payload);

      if (queue.length === 1) {
        queueMicrotask(() => {
          const body = JSON.stringify(queue);
          queue.length = 0;
          fetch(`/__metronome`, { method: "POST", body });
        });
      }
    },
    [connection]
  );

  useEffect(() => {
    getLCP(report);
    getFID(report);
    getCLS(report);
    getTTFB(report);
    getFCP(report);
  }, [report]);
};
