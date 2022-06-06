import { createEventHandler } from "@remix-run/cloudflare-workers";
import * as build from "@remix-run/dev/server-build";
import {
  registerMetronome,
  createMetronomeGetLoadContext,
} from "@metronome-sh/cloudflare-workers";

import metronomeConfig from "./metronome.config.js";

const buildWithMetronome = registerMetronome(build);

const getLoadContext = createMetronomeGetLoadContext(buildWithMetronome, {
  config: metronomeConfig,
  mode: process.env.NODE_ENV,
});

addEventListener(
  "fetch",
  createEventHandler({
    build: buildWithMetronome,
    mode: process.env.NODE_ENV,
    getLoadContext,
  })
);
