import yargs from "yargs";
import patchRemixRunServe from "./commands/patchRemixRunServe";

yargs
  .scriptName("metronome")
  .command(
    "patch @remix-run/serve",
    "Patches Metronome config into @remix-run/serve",
    () => null,
    patchRemixRunServe
  )
  .help().argv;
