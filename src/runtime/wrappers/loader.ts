import { Span, PARENT_SPAN_CONTEXT_KEY } from "../span";
import { sendSpan } from "../exporter";
import { CallRouteLoaderFn, Meta } from "../types";

export const wrapCallRouteLoader = (
  remixCallRouteLoader: CallRouteLoaderFn,
  meta: Meta
): CallRouteLoaderFn => {
  return async (args) => {
    const { loadContext, match } = args;

    const parent = (loadContext as any)[PARENT_SPAN_CONTEXT_KEY];

    const attributes = {
      "remix.function": "loader",
      "remix.route": match.route.id,
      "remix.route.parent": match.route.parentId,
      "app.version": meta.version,
      "app.hash": meta.hash,
    };

    const span = new Span("loader", { attributes, parent });

    try {
      const response = await remixCallRouteLoader(args);

      span.end({
        attributes: {
          "http.status.code": response.status,
          "http.status.text": response.statusText,
        },
      });

      await sendSpan(span);

      return response;
    } catch (error) {
      span.end({ error: error as Error });

      await sendSpan(span);

      throw error;
    }
  };
};
