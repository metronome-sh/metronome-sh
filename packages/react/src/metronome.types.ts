import type { IncomingEventData } from "@metronome-sh/runtime";
import type {
  UNSAFE_RouteManifest,
  UNSAFE_RouteModules,
} from "@remix-run/react";

declare global {
  interface Window {
    __metronomeQueue?: IncomingEventData[];
    __remixManifest: UNSAFE_RouteManifest<unknown>;
    __remixRouteModules: UNSAFE_RouteModules;
  }
}
