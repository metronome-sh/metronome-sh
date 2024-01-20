import { HeaderAllowlist } from "../common/types";
import { isDeferredData, isResponse } from "./helpers";
import { Span } from "../common/instrumentation/Span";

export function setHeadersToSpan({
  result,
  span,
  headersAllowlist,
}: {
  result: any;
  span: Span;
  headersAllowlist?: HeaderAllowlist;
}) {
  if (!headersAllowlist || (Array.isArray(headersAllowlist) && headersAllowlist.length === 0)) {
    return;
  }

  const type = result instanceof Request ? "request" : "response";

  const headerEntries =
    type === "request"
      ? result.headers
      : isResponse(result)
      ? result.headers
      : isDeferredData(result)
      ? result.init?.headers
      : [];

  transformHeadersInit(headerEntries ?? []).forEach(([key, value]) => {
    if (Array.isArray(headersAllowlist) && !headersAllowlist.includes(key.toLowerCase())) {
      return;
    }
    span.setAttribute(`http.${type}.header.${key}`, value.split(","));
  });
}

function transformHeadersInit(headersInit: HeadersInit): [string, string][] {
  if (Array.isArray(headersInit)) {
    // Already in the desired format
    return headersInit;
  } else if (headersInit instanceof Headers) {
    // Convert Headers object to an array of key-value pairs
    return Array.from(headersInit.entries());
  } else {
    // Convert Record<string, string> to an array of key-value pairs
    return Object.entries(headersInit);
  }
}

function setTraceIdToResponse(response: Response | TypedDeferredData<any>, span: Span) {
  // TODO enable this
  const __metronome = JSON.stringify({
    documentTraceId: span.getContext().traceId,
  });
  const metronomeCookie = `__metronome=${__metronome}; Path=/`;

  if (isResponse(response)) {
    const existing = response.headers.get("Set-Cookie");

    if (existing) {
      response.headers.set("Set-Cookie", `${existing}, ${metronomeCookie}`);
    } else {
      response.headers.set("Set-Cookie", metronomeCookie);
    }

    return;
  }

  if (isDeferredData(response)) {
    if (!response.init) {
      response.init = { headers: { "Set-Cookie": metronomeCookie } };
      return;
    }

    const headers = response.init.headers;

    if (!headers) {
      response.init.headers = { "Set-Cookie": metronomeCookie };
      return;
    }

    if (Array.isArray(headers)) {
      // Try to check if the header already exists
      const existing = headers.find(([key]) => key === "Set-Cookie");

      if (existing) {
        existing[1] = `${existing[1]}, ${metronomeCookie}`;
      } else {
        headers.push(["Set-Cookie", metronomeCookie]);
      }

      return;
    }

    if (headers instanceof Headers) {
      const existing = headers.get("Set-Cookie");

      if (existing) {
        headers.set("Set-Cookie", `${existing}, ${metronomeCookie}`);
      } else {
        headers.set("Set-Cookie", metronomeCookie);
      }

      return;
    }

    const existing = headers["Set-Cookie"];

    if (existing) {
      headers["Set-Cookie"] = `${existing}, ${metronomeCookie}`;
    } else {
      headers["Set-Cookie"] = metronomeCookie;
    }
  }
}
