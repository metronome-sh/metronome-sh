import type {
  UNSAFE_RemixContextObject,
  UNSAFE_RouteManifest,
  UNSAFE_RouteModules,
} from "@remix-run/react";

declare global {
  interface Window {
    __metronomeQueue: any; // IncomingEventData[];
    __remixManifest: UNSAFE_RouteManifest<unknown>;
    __remixRouteModules: UNSAFE_RouteModules;
    __remixContext: UNSAFE_RemixContextObject;
  }
}

// interface InstrumentationData
