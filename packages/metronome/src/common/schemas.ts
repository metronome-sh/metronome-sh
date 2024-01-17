import { z } from "zod";

export const BrowserAttributesSchema = z.object({
  pathname: z.string(),
  screen: z.string(),
  referrer: z.string(),
  hostname: z.string(),
  language: z.string(),
  connection: z.string(),
  deviceCategory: z.string(),
  url: z.string(),
});

// export const IdentifierAttributesSchema = z.object({
//   ip: z.string(),
//   ua: z.string(),
// });

// export const MetronomeAttributesDataSchema = z.object({
//   version: z.string(),
//   adapter: z.string(),
// });

export const WebVitalSchema = z
  .object({
    name: z.literal("web-vital"),
    timestamp: z.number(),
    metric: z.object({
      id: z.string(),
      name: z.enum(["CLS", "FID", "TTFB", "LCP", "FCP", "INP"]),
      value: z.number(),
      rating: z.enum(["good", "needs-improvement", "poor"]),
      navigationType: z.enum([
        "navigate",
        "reload",
        "back-forward",
        "back-forward-cache",
        "prerender",
        "restore",
      ]),
    }),
  })
  .merge(BrowserAttributesSchema);
// .merge(IdentifierAttributesSchema)
// .merge(MetronomeAttributesDataSchema);

export const PageviewSchema = z
  .object({
    name: z.literal("pageview"),
    timestamp: z.number(),
  })
  .merge(BrowserAttributesSchema);
// .merge(IdentifierSchema)
// .merge(MetronomeDataSchema);

export const ClientErrorSchema = z
  .object({
    name: z.literal("client-error"),
    timestamp: z.number(),
    error: z.object({
      error: z.string().optional(),
      message: z.string(),
      stack: z.string(),
      filename: z.string(),
      lineno: z.number(),
      colno: z.number(),
    }),
  })
  .merge(BrowserAttributesSchema);
// .merge(IdentifierSchema)
// .merge(MetronomeDataSchema);
