import { context } from "esbuild";
import { esbuildConfig } from "./esbuild.mjs";

const cjsContext = await context({
  ...esbuildConfig,
  format: "cjs",
  outdir: "dist/cjs",
});

await Promise.all([
  // esmContext.rebuild(),
  cjsContext.rebuild(),
]);

await Promise.all([
  // esmContext.watch(),
  cjsContext.watch(),
]);

console.log(" 👀 Watching for changes...");
