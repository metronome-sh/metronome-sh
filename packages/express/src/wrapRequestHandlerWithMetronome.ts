import { registerMetronome } from "@metronome-sh/runtime";
import { createMetronomeGetLoadContext } from "./createMetronomeGetLoadContext";
import type { createRequestHandler as createRequestHandlerRemix } from "@remix-run/express";
import type { MetronomeConfig } from "@metronome-sh/config";

/**
 * Wrap express createRequestHandler with Metronome.
 * @param params
 * @returns RequestHandler
 */
export function wrapRequestHandlerWithMetronome(
  createRequestHandler: typeof createRequestHandlerRemix,
  metronome?: MetronomeConfig
): typeof createRequestHandlerRemix {
  return (...args: Parameters<typeof createRequestHandlerRemix>) => {
    const [{ build, getLoadContext, mode }] = args;
    const metronomeBuild = registerMetronome(build);

    const metronomeGetLoadContext = createMetronomeGetLoadContext(
      metronomeBuild,
      metronome
    );

    return createRequestHandler({
      build: metronomeBuild,
      mode,
      getLoadContext: (res, req) => {
        return {
          ...(getLoadContext?.(res, req) || {}),
          ...metronomeGetLoadContext(res, req),
        };
      },
    });
  };
}
