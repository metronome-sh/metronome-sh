import { FunctionComponent } from "react";
import { useQueue } from "./useQueue";
import { useWebVitals } from "./useWebVitals";
import { useWebAnalytics } from "./useWebAnalytics";
import { useClientErrors } from "./useClientErrors";

export const MetronomeInstrumentation: FunctionComponent = () => {
  const { enqueue } = useQueue();
  useWebVitals(enqueue);
  useWebAnalytics(enqueue);
  useClientErrors(enqueue);

  return null;
};

MetronomeInstrumentation.displayName = "MetronomeInstrumentation";
