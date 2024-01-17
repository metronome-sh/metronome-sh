import { useEffect, useRef } from "react";
import { useGetBrowserData } from "./useGetBrowserData";
import { useQueue } from "./useQueue";

export function useClientErrors(
  enqueue: ReturnType<typeof useQueue>["enqueue"]
) {
  const queue = useQueue();
  const getBrowserData = useGetBrowserData();
  const mounted = useRef(false);

  useEffect(() => {
    if (mounted.current) return;

    function eventHandler(event: ErrorEvent) {
      const { message, filename, lineno, colno, error } = event;
      const { stack } = error;

      queue.enqueue({
        name: "client-error",
        timestamp: Date.now(),
        error: { error, message, filename, lineno, colno, stack },
        ...getBrowserData(),
      });
    }

    window.addEventListener("error", eventHandler);

    mounted.current = true;
  }, [getBrowserData, queue]);
}
