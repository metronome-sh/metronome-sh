import {
  object,
  array,
  enums,
  literal,
  number,
  string,
  optional,
  union,
  type Infer,
} from "superstruct";

export const BrowserDataStruct = object({
  routeId: string(),
  pathname: string(),
  screen: string(),
  referrer: string(),
  hostname: string(),
  language: string(),
  connection: string(),
});

export const WebVitalEventStruct = object({
  type: literal("web-vital"),
  data: object({
    metric: object({
      id: string(),
      name: enums(["CLS", "FID", "TTFB", "LCP", "FCP"]),
      value: number(),
      rating: enums(["good", "needs-improvement", "poor"]),
      navigationType: enums([
        "navigate",
        "reload",
        "back-forward",
        "back-forward-cache",
        "prerender",
        "restore",
      ]),
    }),
    browser: BrowserDataStruct,
  }),
});

export const PageViewEventStruct = object({
  type: literal("pageview"),
  data: object({
    browser: BrowserDataStruct,
  }),
});

export const MetronomeEventStruct = union([
  WebVitalEventStruct,
  PageViewEventStruct,
]);

export type MetronomeEventStructType = Infer<typeof MetronomeEventStruct>;
export type WebVitalEventStructType = Infer<typeof WebVitalEventStruct>;
export type PageViewEventStructType = Infer<typeof PageViewEventStruct>;
export type BrowserDataStructType = Infer<typeof BrowserDataStruct>;
