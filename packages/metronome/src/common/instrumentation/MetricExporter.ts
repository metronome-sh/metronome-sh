import { MetronomeInternalConfig } from "../types";
import { Metric } from "./Metric";
import { SemanticAttributes } from "./SemanticAttributes";
import http from "node:http";
import https from "node:https";

export class MetricExporter {
  constructor(readonly config: MetronomeInternalConfig) {}

  private toLegacyObject(metric: Metric) {
    const metricObject = metric.toObject();
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

  export(metric: Metric) {
    const url =
      this.config.endpoint === "https://metrics.metronome.sh"
        ? `${this.config.endpoint}/v4/process`
        : this.config.endpoint;

    const { hostname, protocol, port, pathname } = new URL(url);

    const options = {
      hostname,
      path: pathname,
      port,
      method: "POST",
      headers: { "Content-Type": "application/json", ApiKey: this.config.apiKey! },
    };

    const request = protocol.startsWith("https") ? https.request(options) : http.request(options);

    const legacyObject = this.toLegacyObject(metric);

    const data = JSON.stringify([legacyObject], (_, v) => {
      return typeof v === "bigint" ? v.toString() : v;
    });

    if (this.config.debug) {
      console.debug(`Sending data to ${url}`);
      console.log(JSON.stringify(JSON.parse(data), null, 2));
    }

    request.write(data, "utf-8");

    request.on("error", (error: Error) => {
      if (this.config.debug) {
        console.error(`Metronome: Metric data was not sent to metronome`);
        console.error(error);
      }

      request.removeAllListeners();
    });
  }
}

// export const BrowserDataSchema = z.object({
//   pathname: z.string(),
//   query: z.string(),
//   screen: z.string(),
//   referrer: z.string(),
//   hostname: z.string(),
//   language: z.string(),
//   connection: z.string(),
//   deviceCategory: z.string(),
// });

// export const RemixDataSchema = z.object({
//   hash: z.string(),
//   routeId: z.string(),
//   routePath: z.string().optional(),
// });

// export const IdentifierSchema = z.object({
//   ip: z.string(),
//   ua: z.string(),
// });

// export const MetronomeInfoSchema = z.object({
//   version: z.string(),
//   adapter: z.string(),
// });
