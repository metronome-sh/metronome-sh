import { FunctionComponent, useEffect, useLayoutEffect } from "react";

export const QueueManager: FunctionComponent = () => {
  // Set up the queue
  useLayoutEffect(() => {
    if (!window.__metronomeQueue) {
      window.__metronomeQueue = [];
    }
  }, []);

  return null;
};

QueueManager.displayName = "MetronomeQueueManager";
