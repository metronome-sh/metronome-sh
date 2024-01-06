import { type MetronomeConfig, findConfigFile } from "@metronome-sh/config";
import { createRequestHandler as createRemixRequestHandler } from "@remix-run/express";
import { createMetronomeGetLoadContext } from "./createMetronomeGetLoadContext";
import { registerMetronome } from "@metronome-sh/runtime";
import { asyncLocalStorage } from "./asyncLocalStorage";
import { randomBytes } from "crypto";

type MetronomeCreateRequestHandlerParams = Parameters<
  typeof createRemixRequestHandler
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
  const { metronome, build, getLoadContext, mode } = params;

  const metronomeBuild = registerMetronome(build, () => {
    return asyncLocalStorage.getStore();
  });

  const configPath = metronome
    ? undefined
    : findConfigFile([process.cwd(), __dirname]);

  const metronomeGetLoadContext = createMetronomeGetLoadContext(
    metronomeBuild,
    {
      configPath,
      metronome,
      asyncLocalStorageGetter: () => asyncLocalStorage.getStore(),
    }
  );

  const remixHandler = createRemixRequestHandler({
    build: metronomeBuild,
    mode,
    getLoadContext: async (res, req) => {
      return {
        ...((await getLoadContext?.(res, req)) || {}),
        ...(await metronomeGetLoadContext(res, req)),
      };
    },
  });

  const metronomeRequestHandler: typeof remixHandler = async (
    req,
    res,
    next
  ) => {
    return asyncLocalStorage.run(
      { traceId: randomBytes(16).toString("hex"), doNotTrack: false },
      async () => {
        // Uncomment for traceId handling
        // let cookieSet = false;

        // const res: Response = new Proxy(originalRes, {
        //   set: (target, prop, value, receiver) => {
        //     if (
        //       prop === "statusMessage" &&
        //       !cookieSet &&
        //       !req.url.includes("/__metronome")
        //     ) {
        //       const store = asyncLocalStorage.getStore();

        //       if (store) {
        //         target.cookie(
        //           "__metronome",
        //           JSON.stringify({ tid: store.traceId, dnt: store.doNotTrack })
        //         );

        //         cookieSet = true;
        //       }
        //     }

        //     return Reflect.set(target, prop, value, receiver);
        //   },
        // });

        return remixHandler(req, res, next);
      }
    );
  };

  return metronomeRequestHandler;
}
