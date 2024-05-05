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
      unstable_sourceMaps: true,
      // endpoint: "http://localhost:3000",
      apiKey: "ak_2qOLYxI0fbiKlWs8AtcbS9QArUVSib4UcCajf6BS",
    }),
  ],
});
