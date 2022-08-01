import fs from "fs";
import path from "path";

const remixServeIndexPath = path.join(
  process.cwd(),
  "node_modules/@remix-run/serve/dist/index.js"
);

function isRemixServeInstalled() {
  return fs.existsSync(remixServeIndexPath);
}

function isRemixServeAlreadyPatched() {
  const source = fs.readFileSync(remixServeIndexPath, "utf8");
  return source === SERVER_STUB;
}

export default function patchRemixRunServe() {
  if (!isRemixServeInstalled()) {
    // prettier-ignore
    console.error("@remix-run/serve is not installed.\nYou can only run this command in a Remix project that uses Remix App Server.");
    return;
  }

  if (isRemixServeAlreadyPatched()) {
    console.error("@remix-run/serve is already patched.");
    return;
  }

  try {
    fs.writeFileSync(remixServeIndexPath, SERVER_STUB, { encoding: "utf-8" });
  } catch (error) {
    console.error("Unable to patch @remix-run/serve", error);
    return;
  }

  console.log("@remix-run/serve is patched.");
}

const SERVER_STUB = `
/**
 * @remix-run/serve v1.5.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var express = require('express');
var compression = require('compression');
var morgan = require('morgan');
var express$1 = require('@remix-run/express');
var {registerMetronome,createMetronomeGetLoadContext} = require('@metronome-sh/express');
var path = require('path');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var express__default = /*#__PURE__*/_interopDefaultLegacy(express);
var compression__default = /*#__PURE__*/_interopDefaultLegacy(compression);
var morgan__default = /*#__PURE__*/_interopDefaultLegacy(morgan);

function createApp(buildPath, mode = "production") {
  let app = express__default["default"]();
  app.disable("x-powered-by");
  app.use(compression__default["default"]());
  app.use("/build", express__default["default"].static("public/build", {
    immutable: true,
    maxAge: "1y"
  }));
  app.use(express__default["default"].static("public", {
    maxAge: "1h"
  }));
  app.use(morgan__default["default"]("tiny"));

  var configPath = path.resolve(process.cwd(), './metronome.config.js');
  var buildWithMetronome = registerMetronome(require(buildPath));
  var getLoadContext = createMetronomeGetLoadContext(buildWithMetronome, { configPath });

  app.all("*", mode === "production" ? express$1.createRequestHandler({
    build: buildWithMetronome,
    getLoadContext,
    mode
  }) : (req, res, next) => {
    // require cache is purged in @remix-run/dev where the file watcher is
    var buildWithMetronome = registerMetronome(require(buildPath));
    var getLoadContext = createMetronomeGetLoadContext(buildWithMetronome, { configPath });

    return express$1.createRequestHandler({
      build: buildWithMetronome,
      getLoadContext,
      mode
    })(req, res, next);
  });
  return app;
}

exports.createApp = createApp;
`;
