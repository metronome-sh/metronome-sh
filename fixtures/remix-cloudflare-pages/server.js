import { createPagesFunctionHandler } from "@remix-run/cloudflare-pages";
import * as build from "@remix-run/dev/server-build";
import {
  combineGetLoadContexts,
  createMetronomeGetLoadContext,
  registerMetronome,
} from "@metronome-sh/cloudflare-pages";

import metronomeConfig from "./metronome.config.js";

const buildWithMetronome = registerMetronome(build);

const metronomeGetLoadContext = createMetronomeGetLoadContext(
  buildWithMetronome,
  {
    config: metronomeConfig,
    mode: process.env.NODE_ENV,
  }
);

const handleRequest = createPagesFunctionHandler({
  build: buildWithMetronome,
  mode: process.env.NODE_ENV,
  getLoadContext: combineGetLoadContexts(
    (context) => context.env,
    metronomeGetLoadContext
  ),
});

export function onRequest(context) {
  return handleRequest(context);
}
