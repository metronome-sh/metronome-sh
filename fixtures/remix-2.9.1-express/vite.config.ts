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
      endpoint: "http://localhost:3004",
      apiKey: "ak_bq4ImM8lXuoM9ORGXIvac4rMck8zszCfhhOX38fA",
      unstable_exclude: async ({ request }) => {
        return false;
      },
    }),
  ],
});
