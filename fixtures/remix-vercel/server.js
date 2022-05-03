import { createRequestHandler } from "@remix-run/vercel";
import * as build from "@remix-run/dev/server-build";
import {
  registerMetronome,
  createMetronomeGetLoadContext,
} from "@metronome-sh/vercel";

const buildWithMetronome = registerMetronome(build);
const metronomeGetLoadContext =
  createMetronomeGetLoadContext(buildWithMetronome);

export default createRequestHandler({
  build: buildWithMetronome,
  getLoadContext: metronomeGetLoadContext,
  mode: process.env.NODE_ENV,
});
