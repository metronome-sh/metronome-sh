import { vitePlugin as remix } from "@remix-run/dev";
import { installGlobals } from "@remix-run/node";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { metronome } from "metronome-sh/vite";

installGlobals({ nativeFetch: true });

export default defineConfig({
  plugins: [
    remix({
      future: {
        unstable_singleFetch: true,
      },
    }),
    tsconfigPaths(),
    metronome({
      debug: true,
      unstable_sourceMaps: true,
      // endpoint: "http://localhost:3000",
      apiKey: "ak_2qOLYxI0fbiKlWs8AtcbS9QArUVSib4UcCajf6BS",
    }),
  ],
});
