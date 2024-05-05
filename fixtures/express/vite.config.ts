import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { metronome } from "metronome-sh/vite";

export default defineConfig({
  plugins: [
    remix(),
    tsconfigPaths(),
    metronome({
      debug: true,
      unstable_sourcemaps: true,
      // endpoint: "http://localhost:3004",
      // apiKey: process.env.METRONOME_API_KEY ?? "ak_m7QJZggmUgaXXApDAjHCpjhZ3kJu2RyiH0reRXXy",
      endpoint: "https://test.metronome.sh",
      apiKey: "ak_NyQEc7iyP3rP464Lz4UOkWTv7BuCyHTaxrXZLcZC",
    }),
  ],
});
