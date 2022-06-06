import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import sucrase from "@rollup/plugin-sucrase";
import autoExternal from "rollup-plugin-auto-external";
import { terser } from "rollup-plugin-terser";
import config from "@metronome-sh/dev/rollup";
import copy from "rollup-plugin-copy";

const production = !process.env.ROLLUP_WATCH;

export default {
  ...config,
  plugins: [
    autoExternal(),
    nodeResolve({ extensions: [".ts", ".tsx", ".js", ".jsx"] }),
    sucrase({
      exclude: ["node_modules/**", "*.json"],
      transforms: ["typescript", "jsx"],
    }),
    commonjs({ ignoreDynamicRequires: true }),
    json(),
    production && terser({ mangle: true }),
    copy({
      targets: [{ src: "src/metronome.config.js", dest: "dist" }],
    }),
  ],
};
