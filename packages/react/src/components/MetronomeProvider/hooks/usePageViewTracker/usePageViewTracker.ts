import { useRemixInternals } from "../useRemixInternals";

export function usePageViewTracker() {
  const { routeId } = useRemixInternals();

  console.error({ routeId });

  return { routeId };
}
