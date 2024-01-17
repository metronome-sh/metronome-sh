import {
  type Request as ExpressRequest,
  type Response as ExpressResponse,
  type NextFunction,
} from "express";
import { startInstrumentation, tracer } from "../common/instrumentation/Tracer";
import { getIp } from "../common/getIp";
import { METRONOME_VERSION } from "../common/constants";
import { MetronomeInternalConfig } from "src/common/types";
import { invariant } from "ts-invariant";

export function createMetronomeMiddleware(build: any) {
  const config = build.metronome as MetronomeInternalConfig;

  // prettier-ignore
  invariant(config, "Metronome config is missing. Check the following: \n 1. Add the metronome vite plugin to your vite.config.ts \n 2. Pass the remix build to the createMetronomeMiddleware")

  startInstrumentation(config);

  return function metronomeMiddleware(
    req: ExpressRequest,
    res: ExpressResponse,
    next: NextFunction
  ) {
    if (req.url === "/__metronome") return next();

    const ip = getIp(req) ?? "0.0.0.0.";

    const attributes = {
      "metronome.adapter": "express",
      "http.method": req.method.toUpperCase(),
      "url.full": req.url,
      "metronome.version": METRONOME_VERSION,
      "client.address": ip,
      "user_agent.original": req.headers["user-agent"] ?? "",
    };

    tracer().startActiveSpan("request", { attributes }, (span) => {
      res.on("finish", () => {
        span.setAttributes(tracer().getAsyncLocalStore()?.requestResolvedAttributes ?? {});
        span.end();
      });
      next();
    });
  };
}
