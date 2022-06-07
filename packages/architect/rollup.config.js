import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import sucrase from "@rollup/plugin-sucrase";
import { terser } from "rollup-plugin-terser";
import defaultConfig from "@metronome-sh/dev/rollup";

const production = !process.env.ROLLUP_WATCH;

export default {
  ...defaultConfig,
  plugins: [
    json(),
    nodeResolve(),
    sucrase({
      exclude: ["node_modules/**", "*.json"],
      transforms: ["typescript", "jsx"],
    }),
    commonjs({ ignoreDynamicRequires: true }),
    production && terser({ mangle: true }),
  ],
  external: ["@remix-run/node", "@remix-run/architect", "@remix-run/dev"],
};
