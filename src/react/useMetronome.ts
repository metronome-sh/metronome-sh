import { useEffect } from "react";
import { getLCP, getFID, getCLS, getTTFB, getFCP } from "web-vitals";
import type { ReportHandler } from "web-vitals";

export const useMetronome = () => {
  useEffect(() => {
    const onReport: ReportHandler = ({ name, value, id, delta }) => {
      const connection =
        (navigator as any).connection ||
        (navigator as any).mozConnection ||
        (navigator as any).webkitConnection;
      fetch(`/__metronome`, {
        method: "POST",
        body: JSON.stringify({
          metric: { name, value, id, delta },
          connection: connection?.effectiveType || "unknown",
        }),
      });
    };
    getLCP(onReport);
    getFID(onReport);
    getCLS(onReport);
    getTTFB(onReport);
    getFCP(onReport);
  }, []);
};
