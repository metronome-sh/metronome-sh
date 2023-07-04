import type { RouteModules } from "@remix-run/server-runtime/dist/routeModules";
import type { MetronomeEventStructType } from "@metronome-sh/runtime";

declare global {
  interface Window {
    __metronomeQueue?: MetronomeEventStructType[];
    __metronomeLoaded: boolean;
    __remixRouteModules: RouteModules<any>;
  }
}
