import { createRequestHandler } from "@remix-run/architect";
import * as build from "@remix-run/dev/server-build";
import {
  createMetronomeGetLoadContext,
  registerMetronome,
} from "@metronome-sh/architect";

const buildWithMetronome = registerMetronome(build);
const metronomeGetLoadContext =
  createMetronomeGetLoadContext(buildWithMetronome);

export const handler = createRequestHandler({
  build: buildWithMetronome,
  mode: process.env.NODE_ENV,
  getLoadContext: metronomeGetLoadContext,
});
