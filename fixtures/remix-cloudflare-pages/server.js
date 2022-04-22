import { createPagesFunctionHandler } from "@remix-run/cloudflare-pages";
import * as build from "@remix-run/dev/server-build";
import {
  combineGetLoadContexts,
  createMetronomeGetLoadContext,
  registerMetronome,
} from "@metronome-sh/cloudflare-pages";

const getMetronomeLoadContext = createMetronomeGetLoadContext(build);

const handleRequest = createPagesFunctionHandler({
  build: registerMetronome(build),
  mode: process.env.NODE_ENV,
  getLoadContext: combineGetLoadContexts(
    (context) => context.env,
    getMetronomeLoadContext
  ),
});

export function onRequest(context) {
  return handleRequest(context);
}
