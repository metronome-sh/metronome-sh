import { Span, PARENT_SPAN_CONTEXT_KEY } from "../span";
import { sendSpan } from "../exporter";
import { CallRouteActionFn, Meta } from "../types";

export const wrapCallRouteAction = (
  remixCallRouteAction: CallRouteActionFn,
  meta: Meta
): CallRouteActionFn => {
  return async (args) => {
    const { loadContext, match } = args;

    const attributes = {
      "remix.function": "action",
      "remix.route": match.route.id,
      "remix.route.parent": match.route.parentId,
      "app.version": meta.version,
      "app.hash": meta.hash,
      "metronome.version": meta.metronomeVersion,
    };

    const parent = (loadContext as any)[PARENT_SPAN_CONTEXT_KEY];

    const span = new Span("action", { attributes, parent });

    try {
      const response = await remixCallRouteAction(args);
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
