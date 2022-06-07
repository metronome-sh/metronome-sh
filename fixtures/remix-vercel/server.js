import { createRequestHandler } from "@remix-run/vercel";
import * as build from "@remix-run/dev/server-build";
import {
  registerMetronome,
  createMetronomeGetLoadContext,
} from "@metronome-sh/vercel";

import * as metronomeConfig from "./metronome.config.js";

const buildWithMetronome = registerMetronome(build);
const metronomeGetLoadContext = createMetronomeGetLoadContext(
  buildWithMetronome,
  { config: metronomeConfig }
);

export default createRequestHandler({
  build: buildWithMetronome,
  getLoadContext: metronomeGetLoadContext,
  mode: process.env.NODE_ENV,
});
