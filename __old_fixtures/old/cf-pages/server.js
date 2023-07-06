import {
  combineGetLoadContexts,
  createMetronomeGetLoadContext,
  registerMetronome,
} from "@metronome-sh/cloudflare-pages";
import { createPagesFunctionHandler } from "@remix-run/cloudflare-pages";
import * as build from "@remix-run/dev/server-build";

const buildWithMetronome = registerMetronome(build);

const metronomeGetLoadContext = createMetronomeGetLoadContext(
  buildWithMetronome,
  { config: require("./metronome.config.js") }
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

// import { createPagesFunctionHandler } from "@remix-run/cloudflare-pages";
// import * as build from "@remix-run/dev/server-build";

// const handleRequest = createPagesFunctionHandler({
//   build,
//   mode: process.env.NODE_ENV,
//   getLoadContext: (context) => context.env,
// });

// export function onRequest(context) {
//   return handleRequest(context);
// }
