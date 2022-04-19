const commonjs = require("@rollup/plugin-commonjs");
const json = require("@rollup/plugin-json");
const { nodeResolve } = require("@rollup/plugin-node-resolve");
const sucrase = require("@rollup/plugin-sucrase");
const autoExternal = require("rollup-plugin-auto-external");
const { terser } = require("rollup-plugin-terser");

import config from "@metronome-sh/config/rollup";

const production = !process.env.ROLLUP_WATCH;

const script = {
  ...config,
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

export default [config, script];
