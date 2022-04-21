import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import sucrase from "@rollup/plugin-sucrase";
import { terser } from "rollup-plugin-terser";
import replace from "@rollup/plugin-replace";
import defaultConfig from "@metronome-sh/config/rollup";
import { version } from "./package.json";
import fs from "fs";
import path from "path";

const metronomeScriptPath = path.resolve(__dirname, "./dist/script/index.js");
const metronomeScript = fs.readFileSync(metronomeScriptPath, "ascii");

// const production = !process.env.ROLLUP_WATCH;

export default {
  ...defaultConfig,
  plugins: [
    ...defaultConfig.plugins,
    replace({
      preventAssignment: false,
      // delimiters: ["", ""],
      values: {
        "process.env.METRONOME_SCRIPT": JSON.stringify(metronomeScript),
        "process.env.METRONOME_VERSION": JSON.stringify(version),
        // foo: "bar",
      },
    }),
  ],
};
