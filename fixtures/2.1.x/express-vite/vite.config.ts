import { unstable_vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { metronome } from "metronome-sh/vite";

export default defineConfig({
  plugins: [
    remix(),
    tsconfigPaths(),
    metronome({
      debug: true,
      endpoint: "http://localhost:3004",
      apiKey: "test-api-key",
    }),
  ],
});
