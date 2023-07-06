import { ClientEvent } from "@metronome-sh/runtime";
import { useCallback } from "react";

export function useQueue() {
  const enqueue = useCallback((event: ClientEvent) => {
    // Make sure we have a queue
    if (!window.__metronomeQueue) {
      window.__metronomeQueue = [];
    }

    // Add the event to the queue
    window.__metronomeQueue.push(event);
  }, []);

  return { enqueue };
}
