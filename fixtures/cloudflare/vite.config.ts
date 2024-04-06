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
    remix(),
    tsconfigPaths(),
    metronome({
      // debug: true,
      endpoint: process.env.METRONOME_ENDPOINT ?? "http://localhost:3000",
      apiKey: process.env.METRONOME_API_KEY ?? "ak_kR8rW1JBW9pDI4MPmGJPW0GJrFt4yNJSCODtHSpV",
    }),
  ],
});
