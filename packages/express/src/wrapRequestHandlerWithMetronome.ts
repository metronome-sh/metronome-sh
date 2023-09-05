import { registerMetronome } from "@metronome-sh/runtime";
import { findConfigFile } from "@metronome-sh/config";
import { createMetronomeGetLoadContext } from "./createMetronomeGetLoadContext";
import type { createRequestHandler as createRequestHandlerRemix } from "@remix-run/express";

/**
 * Wraps express `createRequestHandler` from `@remix-run/express` with Metronome.
 * @returns RequestHandler
 */
export function wrapRequestHandlerWithMetronome(
  createRequestHandler: typeof createRequestHandlerRemix
): typeof createRequestHandlerRemix {
  return (...args: Parameters<typeof createRequestHandlerRemix>) => {
    const [{ build, getLoadContext, mode }] = args;
    const metronomeBuild = registerMetronome(build);

    const configPath = findConfigFile([process.cwd(), __dirname]);

    const metronomeGetLoadContext = createMetronomeGetLoadContext(
      metronomeBuild,
      configPath
    );

    return createRequestHandler({
      build: metronomeBuild,
      mode,
      getLoadContext: async (res, req) => {
        return {
          ...(getLoadContext?.(res, req) || {}),
          ...(await metronomeGetLoadContext(res, req)),
        };
      },
    });
  };
}
