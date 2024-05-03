import {
  vitePlugin as remix,
  cloudflareDevProxyVitePlugin as remixCloudflareDevProxy,
} from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

import { metronome } from "metronome-sh/vite";

export default defineConfig({
  plugins: [
    remixCloudflareDevProxy(),
    remix({}),
    tsconfigPaths(),
    metronome({
      debug: true,
      unstable_sourcemaps: true,
      // endpoint: process.env.METRONOME_ENDPOINT ?? "http://localhost:3004",
      // apiKey: process.env.METRONOME_API_KEY ?? "ak_kR8rW1JBW9pDI4MPmGJPW0GJrFt4yNJSCODtHSpV",
      endpoint: "https://test.metronome.sh",
      apiKey: "ak_ppl6NKtAJ98thNay5RILU66syWPSBpFkmvyspFMT",
    }),
  ],
});
