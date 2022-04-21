import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import sucrase from "@rollup/plugin-sucrase";
import { terser } from "rollup-plugin-terser";
import defaultConfig from "@metronome-sh/config/rollup";

const production = !process.env.ROLLUP_WATCH;

export default {
  ...defaultConfig,
  input: "src/script/index.ts",
  output: {
    dir: "dist/script/",
    format: "iife",
  },
  plugins: [
    nodeResolve(),
    sucrase({
      exclude: ["node_modules/**", "*.json"],
      transforms: ["typescript"],
    }),
    commonjs(),
    production && terser({ mangle: true, compress: { drop_console: true } }),
  ],
};
