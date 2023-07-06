import { registerMetronome } from "@metronome-sh/runtime";
import { createRequestHandler as createRequestHandlerRemix } from "@remix-run/express";
import { createMetronomeGetLoadContext } from "./createMetronomeGetLoadContext";
import type { MetronomeConfig } from "@metronome-sh/config";

type MetronomeCreateRequestHandlerParams = Parameters<
  typeof createRequestHandlerRemix
>[0] & {
  metronome?: MetronomeConfig;
};

/**
 * Wrap express createRequestHandler with Metronome.
 * @param params
 * @returns RequestHandler
 */
export function createRequestHandler(
  params: MetronomeCreateRequestHandlerParams
) {
  const { metronome, getLoadContext, build, mode } = params;

  const metronomeBuild = registerMetronome(build);

  const metronomeGetLoadContext = createMetronomeGetLoadContext(
    metronomeBuild,
    metronome
  );

  return createRequestHandlerRemix({
    build: metronomeBuild,
    mode,
    getLoadContext: (res, req) => {
      return {
        ...(getLoadContext?.(res, req) || {}),
        ...metronomeGetLoadContext(res, req),
      };
    },
  });
}
