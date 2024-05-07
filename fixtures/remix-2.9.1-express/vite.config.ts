import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { metronome } from "metronome-sh/vite";

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
      // endpoint: "http://localhost:3004",
      apiKey: "ak_2qOLYxI0fbiKlWs8AtcbS9QArUVSib4UcCajf6BS",
      unstable_exclude: async ({ request }) => {
        return false;
      },
    }),
  ],
});
