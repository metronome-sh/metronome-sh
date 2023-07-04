import { UNSAFE_RouteManifest } from "@remix-run/react";
import { useEffect, useState } from "react";

declare global {
  interface Window {
    __remixManifest: UNSAFE_RouteManifest<unknown>;
  }
}

export function useRemixManifest() {
  // const [manifest, setManifest] = useState<
  //   typeof window.__remixManifest | null
  // >(null);

  // useEffect(() => {
  //   if (manifest) return;

  //   if (window.__remixManifest) {
  //     setManifest(window.__remixManifest);
  //     return;
  //   }

  //   // Retry every 100ms until the manifest is set
  //   // try for a certain amount of seconds and then bail out
  //   let retries = 0;

  //   const interval = setInterval(() => {
  //     if (window.__remixManifest) {
  //       clearInterval(interval);
  //       setManifest(window.__remixManifest);
  //     }

  //     retries += 1;

  //     if (retries > 100) {
  //       clearInterval(interval);
  //     }
  //   }, 100);
  // }, [manifest]);

  return window.__remixManifest;
}
