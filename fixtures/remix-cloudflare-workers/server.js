import { createEventHandler } from "@remix-run/cloudflare-workers";
import * as build from "@remix-run/dev/server-build";
import {
  registerMetronome,
  createMetronomeGetLoadContext,
} from "@metronome-sh/cloudflare-workers";

const buildWithMetronome = registerMetronome(build);
const getLoadContext = createMetronomeGetLoadContext(buildWithMetronome);

addEventListener(
  "fetch",
  createEventHandler({
    build: buildWithMetronome,
    mode: process.env.NODE_ENV,
    getLoadContext,
  })
);
