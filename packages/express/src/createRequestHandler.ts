import type { MetronomeConfig } from "@metronome-sh/config";
import { createRequestHandler as createRequestHandlerRemix } from "@remix-run/express";
import { wrapRequestHandlerWithMetronome } from "./wrapRequestHandlerWithMetronome";

type MetronomeCreateRequestHandlerParams = Parameters<
  typeof createRequestHandlerRemix
>[0] & {
  metronome?: MetronomeConfig;
};

/**
 * createRequestHandler enhanced with Metronome.
 * @param params
 * @returns RequestHandler
 */
export function createRequestHandler(
  params: MetronomeCreateRequestHandlerParams
) {
  const { metronome, ...rest } = params;

  return wrapRequestHandlerWithMetronome(
    createRequestHandlerRemix,
    metronome
  )(rest);
}
