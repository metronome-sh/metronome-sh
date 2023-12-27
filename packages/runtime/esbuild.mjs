import { build } from "esbuild";
import { replace } from "esbuild-plugin-replace";

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
};

(async () =>
  await Promise.all([
    build({
      ...esbuildConfig,
      plugins: [
        ...esbuildConfig.plugins,
        replace({ "process.env.METRONOME_DEVELOPMENT": false }),
      ],
      format: "cjs",
      outdir: "dist/cjs",
    }),
  ]))();
