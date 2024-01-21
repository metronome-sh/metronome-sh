import { MetronomeInternalConfig } from "../types";
import { Exporter } from "./Exporter";
import { Metric } from "./Metric";
import { SemanticAttributes } from "./SemanticAttributes";

export class MetricExporter extends Exporter {
  constructor(readonly config: MetronomeInternalConfig) {
    super(config);
  }

  protected prepare(metric: Metric) {
    const metricObject = metric.toObject();

    // Web vitals
    if (["FCP", "LCP", "CLS", "FID", "TTFB", "INP"].includes(metricObject.name)) {
      return {
        name: "web-vital",
        details: {
          timestamp: metricObject.timestamp,
          name: metricObject.name,
          value: metricObject.value,
          rating: metricObject.attributes[SemanticAttributes.WebVitalRating],
          navigationType: metricObject.attributes[SemanticAttributes.WebVitalNavigationType],
          hash: metricObject.attributes[SemanticAttributes.AppVersion],
          routeId: metricObject.attributes[SemanticAttributes.RemixRouteId],
          routePath: metricObject.attributes[SemanticAttributes.RemixRoutePath],
          ip: metricObject.attributes[SemanticAttributes.ClientAddress],
          ua: metricObject.attributes[SemanticAttributes.UserAgentOriginal],
          pathname: metricObject.attributes[SemanticAttributes.HttpPathname],
          query: metricObject.attributes[SemanticAttributes.UrlQuery] ?? "?",
          screen: metricObject.attributes[SemanticAttributes.ClientScreen],
          referrer: metricObject.attributes[SemanticAttributes.ClientReferrer],
          hostname: metricObject.attributes[SemanticAttributes.AppHostname],
          language: metricObject.attributes[SemanticAttributes.ClientLanguage],
          connection: metricObject.attributes[SemanticAttributes.ClientConnection],
          deviceCategory: metricObject.attributes[SemanticAttributes.ClientDeviceCategory],
          metric: {
            id: metricObject.id,
            name: metricObject.name,
            value: metricObject.value,
            rating: metricObject.attributes[SemanticAttributes.WebVitalRating],
            navigationType: metricObject.attributes[SemanticAttributes.WebVitalNavigationType],
          },
        },
      };
    }

    // Pageviews
    if (metricObject.name === "pageview") {
      return {
        name: "pageview",
        details: {
          timestamp: metricObject.timestamp,
          pathname: metricObject.attributes[SemanticAttributes.HttpPathname],
          query: metricObject.attributes[SemanticAttributes.UrlQuery],
          screen: metricObject.attributes[SemanticAttributes.ClientScreen],
          referrer: metricObject.attributes[SemanticAttributes.ClientReferrer],
          hostname: metricObject.attributes[SemanticAttributes.AppHostname],
          language: metricObject.attributes[SemanticAttributes.ClientLanguage],
          connection: metricObject.attributes[SemanticAttributes.ClientConnection],
          deviceCategory: metricObject.attributes[SemanticAttributes.ClientDeviceCategory],
          hash: metricObject.attributes[SemanticAttributes.AppVersion],
          routeId: metricObject.attributes[SemanticAttributes.RemixRouteId],
          routePath: metricObject.attributes[SemanticAttributes.RemixRoutePath],
          ip: metricObject.attributes[SemanticAttributes.ClientAddress],
          ua: metricObject.attributes[SemanticAttributes.UserAgentOriginal],
        },
      };
    }

    return null;
  }
}
