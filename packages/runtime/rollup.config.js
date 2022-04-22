import replace from "@rollup/plugin-replace";
import defaultConfig from "@metronome-sh/config/rollup";
import { version } from "./package.json";
import fs from "fs";
import path from "path";

const metronomeScriptPath = path.resolve(__dirname, "./dist/script/index.js");
const metronomeScript = fs.readFileSync(metronomeScriptPath, "ascii");

export default {
  ...defaultConfig,
  plugins: [
    ...defaultConfig.plugins,
    replace({
      preventAssignment: false,
      values: {
        "process.env.METRONOME_SCRIPT": JSON.stringify(metronomeScript),
        "process.env.METRONOME_VERSION": JSON.stringify(version),
      },
    }),
  ],
};
