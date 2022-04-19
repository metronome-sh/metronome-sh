import yargs from "yargs";
import { postbuild } from "./postbuild";
import { patch } from "./setup";

// prettier-ignore
yargs
  .scriptName("metronome")
  .command("setup", "Installs Metronome into Remix", () => null, patch)
  .command("postbuild", "Uploads the project build metadata to Metronome", () => null, postbuild)
  .help().argv;
