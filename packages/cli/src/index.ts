import yargs from "yargs";
import patchRemixRunServe from "./commands/patchRemixRunServe";
import init from "./commands/init";

yargs
  .scriptName("metronome")
  .command(
    "patch @remix-run/serve",
    "Patches Metronome config into @remix-run/serve",
    () => null,
    patchRemixRunServe
  )
  .command<{ route: string }>(
    "init",
    "Initializes Metronome by creating a config file",
    () => null,
    init
  )
  .help()
  .parse();
