import { type MetronomeConfig } from "@metronome/config";

export default {
  ignoredRoutes: [],
  ignoredPathnames: ["/healthcheck"],
  ignoreHeadMethod: true,
  // @ts-ignore
  doNotTrack: (request) => {
    // Track all events
    return false;
  },
} satisfies MetronomeConfig;
