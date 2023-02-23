import { getCurrentRouteId } from "../helpers";
import { useRemixInternals } from "../useRemixInternals";

export function usePageViewTracker() {
  const { routeId } = useRemixInternals();

  console.log({ routeId });
}
