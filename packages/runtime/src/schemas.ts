import { z } from "zod";

export const BrowserDataSchema = z.object({
  pathname: z.string(),
  screen: z.string(),
  referrer: z.string(),
  hostname: z.string(),
  language: z.string(),
  connection: z.string(),
});

export const RemixDataSchema = z.object({
  version: z.string(),
  routeId: z.string(),
  routePath: z.string().optional(),
});

export const PageviewEventSchema = z.object({
  type: z.literal("pageview"),
  data: z.object({
    timestamp: z.number(),
    browser: BrowserDataSchema,
    remix: RemixDataSchema,
  }),
});

export const WebVitalEventSchema = z.object({
  type: z.literal("web-vital"),
  data: z.object({
    timestamp: z.number(),
    metric: z.object({
      id: z.string(),
      name: z.enum(["CLS", "FID", "TTFB", "LCP", "FCP", "INP"]),
      value: z.number(),
      rating: z.enum(["good", "needs-improvement", "poor"]),
      // prettier-ignore
      navigationType: z.enum(["navigate", "reload", "back-forward", "back-forward-cache", "prerender", "restore"]),
    }),
    browser: BrowserDataSchema,
    remix: RemixDataSchema,
  }),
});

export const ClientErrorEventSchema = z.object({
  type: z.literal("client-error"),
  data: z.object({
    timestamp: z.number(),
    error: z.object({
      message: z.string(),
      stack: z.string(),
      filename: z.string(),
      lineno: z.number(),
      colno: z.number(),
    }),
    browser: BrowserDataSchema,
    remix: RemixDataSchema,
  }),
});

export const RequestEventSchema = z.object({
  type: z.literal("request"),
  data: z.object({
    timestamp: z.bigint().optional(),
    duration: z.bigint().optional(),
    errored: z.boolean(),
    httpMethod: z.string(),
    httpStatusCode: z.number(),
    httpPathname: z.string(),
    remix: RemixDataSchema,
  }),
});

export const ClientEventSchema = z.union([
  WebVitalEventSchema,
  PageviewEventSchema,
  ClientErrorEventSchema,
]);

export const ServerEventSchema = RequestEventSchema; // union soon

export const ClientEventSchemaArray = z.array(ClientEventSchema);

export const EventSchema = z.union([ClientEventSchema, ServerEventSchema]);
