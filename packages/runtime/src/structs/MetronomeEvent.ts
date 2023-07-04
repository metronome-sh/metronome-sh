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
});

export const WebVitalEventStruct = object({
  type: literal("web-vital"),
  data: object({
    metric: object({
      name: enums(["CLS", "FID", "TTFB", "LCP", "FCP"]),
      value: number(),
      id: string(),
    }),
    browser: BrowserDataStruct,
  }),
});

export const PageViewEventStruct = object({
  type: literal("page-view"),
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
