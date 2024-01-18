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
import { SemanticAttributes } from "../common/instrumentation/SemanticAttributes";

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

    const url = new URL(req.url || "/", `http://${req.headers.host || "localhost"}`);

    const attributes = {
      [SemanticAttributes.MetronomeAdapter]: "express",
      [SemanticAttributes.HttpMethod]: req.method.toUpperCase(),
      [SemanticAttributes.UrlFull]: req.url,
      [SemanticAttributes.MetronomeVersion]: METRONOME_VERSION,
      [SemanticAttributes.ClientAddress]: ip,
      [SemanticAttributes.UserAgentOriginal]: req.headers["user-agent"] ?? "",
      [SemanticAttributes.RemixRequestType]: url.searchParams.has("_data") ? "data" : "document",
      [SemanticAttributes.HttpPathname]: url.pathname,
    };

    tracer().startActiveSpan("request", { attributes }, (span) => {
      res.on("finish", () => {
        span.setAttributes({
          ...(tracer().getAsyncLocalStore()?.requestResolvedAttributes ?? {}),
          [SemanticAttributes.HttpStatusCode]: res.statusCode,
        });
        span.end();
      });
      next();
    });
  };
}
