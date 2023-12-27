import { build } from "esbuild";
import { replace } from "esbuild-plugin-replace";

import packageJson from "./package.json" assert { type: "json" };

/**
 * @type {import('esbuild').BuildOptions}
 */
export const esbuildConfig = (options) => {
  return {
    entryPoints: ["src/index.ts"],
    bundle: true,
    treeShaking: true,
    platform: "node",
    sourcemap: true,
    packages: "external",
    target: "node14",
    plugins: [
      replace({
        "process.env.METRONOME_VERSION": JSON.stringify(packageJson.version),
        "process.env.METRONOME_DEVELOPMENT": JSON.stringify(!!options?.dev),
      }),
    ],
  };
};

(async () =>
  await Promise.all([
    build({ ...esbuildConfig(), format: "esm", outdir: "dist/esm" }),
    build({ ...esbuildConfig(), format: "cjs", outdir: "dist/cjs" }),
  ]))();
