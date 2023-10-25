import { build } from "esbuild";
import { replace } from "esbuild-plugin-replace";
import { readFile } from "fs/promises";

import packageJson from "./package.json" assert { type: "json" };

/**
 * @type {import('esbuild').BuildOptions}
 */
export const esbuildConfig = {
  entryPoints: ["src/index.ts"],
  bundle: true,
  sourcemap: true,
  packages: "external",
  plugins: [
    replace({
      "process.env.METRONOME_VERSION": JSON.stringify(packageJson.version),
    }),
  ],
  platform: "node",
};

(async () =>
  await Promise.all([
    // build({ ...esbuildConfig, format: "esm", outdir: "dist/esm" }),
    build({ ...esbuildConfig, format: "cjs", outdir: "dist/cjs" }),
  ]))();
