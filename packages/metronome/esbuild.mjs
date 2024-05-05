import { build } from "esbuild";
import { replace } from "esbuild-plugin-replace";
import packageJson from "./package.json" assert { type: "json" };
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const webVitalsAttributes = fs.readFileSync(
  path.resolve(__dirname, "./node_modules/web-vitals/dist/web-vitals.iife.js"),
  "utf-8"
);

const replaceAsyncStoragePlugin = {
  name: "replace-async-storage",
  setup(build) {
    build.onResolve({ filter: /^@asyncLocalStorage$/ }, (args) => {
      return { path: "./async-local-storage.js", external: true };
    });
  },
};

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
      "process.env.METRONOME_WEB_VITALS": JSON.stringify(webVitalsAttributes),
      "process.env.METRONOME_DEV": process.env.NODE_ENV !== "production",
    }),
    replaceAsyncStoragePlugin,
  ],
  external: ["@asyncLocalStorage"],
};

export const reactConfig = {
  ...commonConfig,
  entryPoints: ["src/react/react.ts"],
  format: "esm",
  outfile: "dist/esm/react.js",
  platform: "browser",
  define: {
    "process.env.NODE_ENV": "process.env.NODE_ENV",
  },
};

export const viteConfig = {
  ...commonConfig,
  entryPoints: ["src/vite/vite.ts"],
  format: "esm",
  outfile: "dist/esm/vite.js",
  platform: "node",
  define: {
    "process.env.METRONOME_WEB_VITALS": "process.env.METRONOME_WEB_VITALS",
  },
};

export const serverConfig = {
  ...commonConfig,
  entryPoints: ["src/server/server.ts"],
  format: "esm",
  outfile: "dist/esm/server.js",
  platform: "node",
};

export const expressConfig = {
  ...commonConfig,
  entryPoints: ["src/express/express.ts"],
  format: "esm",
  outfile: "dist/esm/express.js",
  platform: "node",
};

export const asyncStorageConfig = {
  ...commonConfig,
  entryPoints: ["src/common/asyncLocalStorage.ts"],
  format: "esm",
  outfile: "dist/esm/async-local-storage.js",
  platform: "node",
};

(async () => {
  await Promise.all([
    build(reactConfig),
    build(viteConfig),
    build(serverConfig),
    build(expressConfig),
    build(asyncStorageConfig),
  ]);
})();
