import { Meta } from "../types";
import { handleWebVitalsRequest } from "./webVitals";

export const isInternalRequest = (request: Request): boolean => {
  return (
    request.url.endsWith("__metronome") &&
    request.method.toLowerCase() === "post"
  );
};

export const handleInternalRequest = (
  request: Request,
  loadContext: any,
  meta: Meta
): Promise<Response> => {
  return handleWebVitalsRequest(request, meta);
};
