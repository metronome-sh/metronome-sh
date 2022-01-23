import { PluginObj, transformFromAstSync } from "@babel/core";
import { parse, print } from "recast";
import babelParser from "recast/parsers/babel";
import path from "path";
import fs from "fs";
import * as plugins from "./plugins";

type File = {
  filename: string;
  plugin: () => PluginObj<any>;
  backupName: string;
};

const files: File[] = [
  {
    // prettier-ignore
    filename: path.resolve(process.cwd(), "./node_modules/@remix-run/server-runtime/data.js"),
    backupName: "data.js.bak",
    plugin: plugins.data,
  },
  {
    // prettier-ignore
    filename: path.resolve(process.cwd(), "./node_modules/@remix-run/server-runtime/esm/data.js"),
    backupName: "data.esm.js.bak",
    plugin: plugins.dataEsm,
  },
  {
    // prettier-ignore
    filename: path.resolve(process.cwd(), "./node_modules/@remix-run/server-runtime/server.js"),
    backupName: "server.js.bak",
    plugin: plugins.server,
  },
  {
    // prettier-ignore
    filename: path.resolve(process.cwd(), "./node_modules/@remix-run/server-runtime/esm/server.js"),
    backupName: "server.esm.js.bak",
    plugin: plugins.serverEsm,
  },
  {
    // prettier-ignore
    filename: path.resolve(process.cwd(), './node_modules/@remix-run/react/browser.js'),
    backupName: "browser.js.bak",
    plugin: plugins.browser,
  },
  {
    // prettier-ignore
    filename: path.resolve(process.cwd(), './node_modules/@remix-run/react/esm/browser.js'),
    backupName: "browser.esm.js.bak",
    plugin: plugins.browserEsm,
  },
];

const isPatched = (filename: string) => {
  return fs.readFileSync(filename, "utf-8").match(/metronome/g);
};

const backup = (files: File[]) => {
  files.forEach(({ filename, backupName }) => {
    const destination = path.resolve(__dirname, backupName);
    fs.copyFileSync(filename, destination);
  });
};

const restore = (files: File[]) => {
  files.forEach(({ filename, backupName }) => {
    fs.copyFileSync(path.resolve(__dirname, backupName), filename);
  });
};

const cleanup = (files: File[]) => {
  files.forEach(({ backupName }) => {
    fs.unlinkSync(path.resolve(__dirname, backupName));
  });
};

const patchFile = (
  { filename, plugin }: File,
  meta: { version: string; hash: string }
) => {
  if (isPatched(filename)) return;

  const code = fs.readFileSync(filename, "utf-8");
  const ast = parse(code, { parser: babelParser });

  const options = {
    filename: path.basename(filename),
    plugins: [[plugin, { meta }]],
    cloneInputAst: false,
    code: false,
    ast: true,
  };

  const { ast: transformedAST } = transformFromAstSync(ast, code, options)!;

  const result = print(transformedAST!).code;

  fs.writeFileSync(filename, result, { encoding: "utf-8" });
};

const getMeta = () => {
  const { version = "" } = require(path.resolve(
    process.cwd(),
    "./package.json"
  ));

  let hash = "";

  try {
    hash = require("child_process")
      .execSync("git rev-parse --short HEAD", { stdio: "pipe" })
      .toString()
      .trim();
  } catch (e) {}

  return { version, hash };
};

export const patch = () => {
  backup(files);
  try {
    const meta = getMeta();
    files.forEach((file) => patchFile(file, meta));

    console.log("Successfully setup Metronome for Remix.");
  } catch (error) {
    console.log(`Could not setup Metronome: ${(error as Error).message}`);
    restore(files);
  } finally {
    cleanup(files);
  }
};
