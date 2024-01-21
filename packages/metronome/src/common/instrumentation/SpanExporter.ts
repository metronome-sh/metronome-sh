import { MetronomeInternalConfig } from "../types";
import { Exporter } from "./Exporter";
import { SemanticAttributes } from "./SemanticAttributes";
import { Span } from "./Span";

export class SpanExporter extends Exporter {
  protected prepare(span: Span) {
    const data = span.toObject();

    // Requests
    if (span.name === "request") {
      return {
        name: "request",
        details: {
          timestamp: data.timestamp,
          method: data.attributes[SemanticAttributes.HttpMethod],
          errored: (data.attributes[SemanticAttributes.HttpStatusCode] as number) >= 400,
          duration: data.endTime - data.startTime,
          statusCode: data.attributes[SemanticAttributes.HttpStatusCode],
          pathname: data.attributes[SemanticAttributes.HttpPathname],
          type: data.attributes[SemanticAttributes.RemixRequestType],
          startTime: data.startTime.toString(),
          hash: data.attributes[SemanticAttributes.AppVersion],
          version: data.attributes[SemanticAttributes.MetronomeVersion],
          ip: data.attributes[SemanticAttributes.ClientAddress],
          ua: data.attributes[SemanticAttributes.UserAgentOriginal],
          adapter: data.attributes[SemanticAttributes.MetronomeAdapter],
          routeId: data.attributes[SemanticAttributes.RemixRouteId],
        },
      };
    }

    // Loaders and actions
    if (span.name === "loader" || span.name === "action") {
      return {
        name: span.name,
        details: {
          timestamp: data.timestamp,
          duration: data.endTime - data.startTime,
          errored: data.attributes[SemanticAttributes.AppErrored] ?? false,
          hash: data.attributes[SemanticAttributes.AppVersion],
          version: data.attributes[SemanticAttributes.MetronomeVersion],
          ip: data.attributes[SemanticAttributes.ClientAddress],
          ua: data.attributes[SemanticAttributes.UserAgentOriginal],
          adapter: data.attributes[SemanticAttributes.MetronomeAdapter],
          routeId: data.attributes[SemanticAttributes.RemixRouteId],
          routePath: data.attributes[SemanticAttributes.RemixRoutePath],
          type: data.attributes[SemanticAttributes.RemixRequestType],
          startTime: data.startTime.toString(),
          httpPathname: data.attributes[SemanticAttributes.HttpPathname],
          httpMethod: data.attributes[SemanticAttributes.HttpMethod],
          httpStatusCode:
            data.attributes[SemanticAttributes.HttpStatusCode] ??
            (data.attributes[SemanticAttributes.AppErrored] ? 500 : 200),
          httpStatusText: "",
        },
      };
    }

    return null;
  }
}
