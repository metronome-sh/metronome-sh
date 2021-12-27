import autoExternal from "rollup-plugin-auto-external";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2";

const production = !process.env.ROLLUP_WATCH;

const cli = {
  input: "src/cli/index.ts",
  output: {
    dir: "dist/cli",
    format: "cjs",
    banner: "#!/usr/bin/env node",
    sourcemap: !production,
  },
  external: ["recast/parsers/babel"],
  plugins: [
    autoExternal(),
    nodeResolve({ extensions: [".ts"] }),
    typescript(),
    commonjs(),
  ],
};

const react = {
  input: "src/react/index.ts",
  output: {
    dir: "dist/react",
    format: "cjs",
    sourcemap: !production,
  },
  plugins: [
    autoExternal(),
    nodeResolve({ extensions: [".ts", ".tsx"] }),
    typescript(),
    commonjs(),
  ],
};

const runtime = {
  input: "src/runtime/index.ts",
  output: {
    dir: "dist/runtime",
    format: "cjs",
    sourcemap: !production,
  },
  external: ["dayjs/plugin/utc"],
  plugins: [
    autoExternal(),
    nodeResolve({ extensions: [".ts", ".tsx"] }),
    typescript(),
    commonjs(),
  ],
};

export default [cli, react, runtime];
