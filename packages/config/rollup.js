const commonjs = require("@rollup/plugin-commonjs");
const json = require("@rollup/plugin-json");
const { nodeResolve } = require("@rollup/plugin-node-resolve");
const sucrase = require("@rollup/plugin-sucrase");
const autoExternal = require("rollup-plugin-auto-external");
const { terser } = require("rollup-plugin-terser");

const production = !process.env.ROLLUP_WATCH;

module.exports = {
  input: "src/index.ts",
  output: {
    dir: "dist",
    format: "cjs",
    sourcemap: !production,
    exports: "auto",
  },
  plugins: [
    autoExternal(),
    nodeResolve({ extensions: [".ts", ".tsx", ".js", ".jsx"] }),
    sucrase({
      exclude: ["node_modules/**", "*.json"],
      transforms: ["typescript", "jsx"],
    }),
    commonjs({ ignoreDynamicRequires: true }),
    json(),
    production && terser({ mangle: true, compress: { drop_console: true } }),
  ],
  external: ["dayjs/plugin/utc"],
};
