import type { RouteModules } from "@remix-run/server-runtime/dist/routeModules";
import type { MetronomeEventStructType } from "@metronome-sh/runtime";
import type { UNSAFE_RouteManifest } from "@remix-run/react";

declare global {
  interface Window {
    __metronomeQueue?: MetronomeEventStructType[];
    __remixManifest: UNSAFE_RouteManifest<unknown>;
  }
}
