import { createRequestHandler } from "@remix-run/architect";
import * as build from "@remix-run/dev/server-build";
import {
  createMetronomeGetLoadContext,
  registerMetronome,
} from "@metronome-sh/architect";

const getLoadContext = createMetronomeGetLoadContext(build);

export const handler = createRequestHandler({
  build: registerMetronome(build),
  mode: process.env.NODE_ENV,
  getLoadContext,
});
