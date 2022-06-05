import yargs from "yargs";
import patchRemixRunServe from "./commands/patchRemixRunServe";
import configTestRoute from "./commands/configTestRoute";

yargs
  .scriptName("metronome")
  .command(
    "patch @remix-run/serve",
    "Patches Metronome config into @remix-run/serve",
    () => null,
    patchRemixRunServe
  )
  .command(
    "config test-route <path>",
    "Tests if a route is ignored by Metronome using the config file",
    () => null,
    configTestRoute
  )
  .help().argv;
