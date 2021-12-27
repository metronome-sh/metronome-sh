import type { ServerBuild, AppLoadContext } from "@remix-run/server-runtime";
import {
  callRouteLoader,
  callRouteAction,
} from "@remix-run/server-runtime/data";

import type { Params } from "react-router";

import {
  createRequestSpan,
  endSpan,
  createLoaderSpan,
  endSpanWithError,
  createActionSpan,
  createWebVitalSpan,
  PARENT_SPAN_CONTEXT_KEY,
} from "./span";
import { sendSpan } from "./exporter";

type CreateRemixRequestHandlerArgs = [build: any, mode: string];

type CreateRemixRequestHandlerFunction = (
  ...args: CreateRemixRequestHandlerArgs
) => RemixRequestWrapedFunction;

type RequesHandlerArgs = [request: Request, loadContext: Record<string, any>];

type RemixRequestWrapedFunction = (
  ...args: RequesHandlerArgs
) => Promise<Response>;

const handleWebVitalRequest = async (request: Request) => {
  await sendSpan(await createWebVitalSpan(request));
  return new Response("", { status: 204 });
};

export const wrapCreateRequestHandler = (
  createRequestHandler: CreateRemixRequestHandlerFunction
): CreateRemixRequestHandlerFunction => {
  const createRequestHandlerWrapper = (
    ...createRequestHandlerArgs: CreateRemixRequestHandlerArgs
  ) => {
    const handleRequest = createRequestHandler(...createRequestHandlerArgs);

    const handleRequestWrapper = async (
      ...handleRequestArgs: RequesHandlerArgs
    ) => {
      let [request, loadContext] = handleRequestArgs;

      // if (config === null || shouldIgnoreRequest(config, request)) {
      //   return handleRequest(...handleRequestArgs);
      // }

      // Handle __insights POST request
      if (
        request.url.endsWith("__metronome") &&
        request.method.toLowerCase() === "post"
      ) {
        return handleWebVitalRequest(request);
      }

      const span = createRequestSpan(request);

      if (loadContext !== undefined) {
        loadContext[PARENT_SPAN_CONTEXT_KEY] = span;
      } else {
        loadContext = { [PARENT_SPAN_CONTEXT_KEY]: span };
      }

      try {
        const response = await handleRequest(request, loadContext);
        await sendSpan(endSpan(span, response));
        return response;
      } catch (error) {
        await sendSpan(endSpanWithError(span, error as Error));
        throw error;
      }
    };

    return handleRequestWrapper;
  };

  return createRequestHandlerWrapper;
};

export const wrapCallRouteLoader = (
  remixCallRouteLoader: typeof callRouteLoader
): typeof callRouteLoader => {
  return async (args) => {
    const { request, loadContext, match } = args;

    const span = createLoaderSpan({
      routeId: match.route.id,
      request,
      context: loadContext,
    });

    try {
      const response = await remixCallRouteLoader(args);
      await sendSpan(endSpan(span, response));
      return response;
    } catch (error) {
      await sendSpan(endSpanWithError(span, error as Error));
      throw error;
    }
  };
};

export const wrapCallRouteAction = (
  remixCallRouteAction: typeof callRouteAction
): typeof callRouteAction => {
  return async (args) => {
    const { request, loadContext, match } = args;
    // if (config === null || shouldIgnoreRequest(config, request)) {
    //   return callRouteAction(args);
    // }

    const span = createActionSpan({
      routeId: match.route.id,
      request,
      context: loadContext,
    });

    console.log({ span });

    try {
      const response = await remixCallRouteAction(args);
      await sendSpan(endSpan(span, response));
      return response;
    } catch (error) {
      await sendSpan(endSpanWithError(span, error as Error));
      throw error;
    }
  };
};
