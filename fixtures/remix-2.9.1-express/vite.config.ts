import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { metronome } from "metronome-sh/vite";
import { routeExtensions } from "remix-custom-routes";
import path from "path";

export default defineConfig({
  plugins: [
    remix({
      ignoredRouteFiles: ["**/.*"],
      future: {
        unstable_singleFetch: true,
      },
      routes: () => {
        const appDirectory = path.resolve(__dirname, "app");

        const routes = routeExtensions(appDirectory);

        return routes;
      },
    }),
    tsconfigPaths(),
    metronome({
      debug: true,
      // unstable_sourceMaps: true,
      // endpoint: "http://localhost:3004",
      apiKey: "ak_TOh5XryVbjCEanmWlFtngYMD7qvkz4f3F80MOQcU",
      unstable_exclude: async ({ request }) => {
        return false;
      },
    }),
  ],
});
