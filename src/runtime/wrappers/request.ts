import { isInternalRequest, handleInternalRequest } from "../handlers";
import { Span, PARENT_SPAN_CONTEXT_KEY } from "../span";
import { sendSpan } from "../exporter";
import { CreateRequestHandlerFn, Meta } from "../types";

const getRequestType = (request: Request) => {
  const url = new URL(request.url);
  return url.searchParams.has("_data") ? "data" : "document";
};

export const wrapCreateRequestHandler = (
  remixCreateRequestHandler: CreateRequestHandlerFn,
  meta: Meta
): CreateRequestHandlerFn => {
  return (build, platform, mode) => {
    const handleRequest = remixCreateRequestHandler(build, platform, mode);

    return async (request, loadContext) => {
      if (isInternalRequest(request)) {
        return handleInternalRequest(request, loadContext, meta);
      }

      const attributes = {
        "remix.request.type": getRequestType(request),
        "http.url": request.url,
        "http.method": request.method,
        "app.version": meta.version,
        "app.hash": meta.hash,
      };

      const span = new Span("request", { attributes });

      // Assign the parent span to the context
      if (loadContext !== undefined) {
        loadContext[PARENT_SPAN_CONTEXT_KEY] = span;
      } else {
        loadContext = { [PARENT_SPAN_CONTEXT_KEY]: span };
      }

      try {
        const response = await handleRequest(request, loadContext);

        span.end({
          attributes: {
            "http.status.code": response.status,
            "http.status.text": response.statusText,
          },
        });

        await sendSpan(span);

        return response;
      } catch (error) {
        await span.end({ error: error as Error });

        await sendSpan(span);

        throw error;
      }
    };
  };
};
