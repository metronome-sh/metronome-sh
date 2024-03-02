import { unstable_vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { metronome } from "metronome-sh/vite";

export default defineConfig({
  plugins: [
    remix(),
    tsconfigPaths(),
    metronome({
      // sourcemap: false,
      debug: true,
      endpoint: process.env.METRONOME_ENDPOINT ?? "http://localhost:3004",
      apiKey: process.env.METRONOME_API_KEY ?? "ak_5SF7iqbgeoY1ZHMKKesrPpLh8AsXXCV1SYCBiPJL",
    }),
  ],
});
