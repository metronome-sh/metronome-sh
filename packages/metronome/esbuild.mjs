import { build } from "esbuild";
import { replace } from "esbuild-plugin-replace";

import packageJson from "./package.json" assert { type: "json" };

/**
 * @type {import('esbuild').BuildOptions}
 */
const commonConfig = {
  bundle: true,
  sourcemap: true,
  packages: "external",
  plugins: [
    replace({
      "process.env.METRONOME_VERSION": JSON.stringify(packageJson.version),
    }),
  ],
};

export const reactConfig = {
  ...commonConfig,
  entryPoints: ["src/react/react.ts"],
  format: "esm",
  outfile: "dist/esm/react.js",
  platform: "browser",
};

export const viteConfig = {
  ...commonConfig,
  entryPoints: ["src/vite/vite.ts"],
  format: "esm",
  outfile: "dist/esm/vite.js",
  platform: "node",
};

export const serverConfig = {
  ...commonConfig,
  entryPoints: ["src/server/server.ts"],
  format: "esm",
  outfile: "dist/esm/server.js",
  platform: "node",
};

(async () => {
  await Promise.all([
    build(reactConfig),
    build(viteConfig),
    build(serverConfig),
  ]);
})();
