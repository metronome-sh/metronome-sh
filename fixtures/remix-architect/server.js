import { createRequestHandler } from "@remix-run/architect";
import * as build from "@remix-run/dev/server-build";
import {
  createMetronomeGetLoadContext,
  registerMetronome,
} from "@metronome-sh/architect";

process.env.METRONOME_API_KEY = "cl26o928710842cuc4dwslf3q";
process.env.METRONOME_DEBUG = true;
process.env.METRONOME_URL = "http://metronome.local:3000";

const buildWithMetronome = registerMetronome(build);
const metronomeGetLoadContext =
  createMetronomeGetLoadContext(buildWithMetronome);

export const handler = createRequestHandler({
  build: buildWithMetronome,
  mode: process.env.NODE_ENV,
  getLoadContext: metronomeGetLoadContext,
});
