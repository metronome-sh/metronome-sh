import yargs from "yargs";
import { patch } from "./setup";

yargs
  .scriptName("metronome")
  .command("setup", "Installs Metronome into Remix", () => null, patch)
  // .command(
  //   "sourcemaps",
  //   "Uploads sourcemap to Metronome",
  //   () => null,
  //   uploadSourceMaps
  // )
  .help().argv;
