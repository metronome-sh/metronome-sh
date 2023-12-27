import yargs, { argv } from "yargs";
import { hideBin } from "yargs/helpers";
import patchRemixRunServe from "./commands/patchRemixRunServe";
import createConfigFile from "./commands/createConfigFile";

yargs(hideBin(process.argv))
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
    (yargs) => {
      yargs.option("ts", {
        describe: "Create the Metronome configuration using TypeScript",
        type: "boolean",
        default: false,
      });
    },
    (argv) => {
      createConfigFile({ useTypeScript: argv.ts as boolean });
    }
  )
  .help()
  .parse();
