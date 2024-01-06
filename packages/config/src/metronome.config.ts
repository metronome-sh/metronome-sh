import { type MetronomeConfig } from "@metronome-sh/config";

export default {
  ignoredRoutes: [],
  ignoredPathnames: ["/healthcheck"],
  ignoreHeadMethod: true,
} satisfies MetronomeConfig;
