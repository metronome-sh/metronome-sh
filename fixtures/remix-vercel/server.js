import { createRequestHandler } from "@remix-run/vercel";
import * as build from "@remix-run/dev/server-build";
import {
  registerMetronome,
  createMetronomeGetLoadContext,
} from "@metronome-sh/vercel";

const getLoadContext = createMetronomeGetLoadContext(build);

export default createRequestHandler({
  build: registerMetronome(build),
  getLoadContext,
  mode: process.env.NODE_ENV,
});
