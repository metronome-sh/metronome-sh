import { object, number, string, enums, optional } from "superstruct";

// TODO can validate the connection, routeId, routePath, and pathname more thoroughly
export const WebVital = object({
  metric: object({
    name: enums(["CLS", "FID", "TTFB", "LCP", "FCP"]),
    value: number(),
    id: string(),
  }),
  connection: string(),
  routeId: string(),
  routePath: optional(string()),
  pathname: string(),
});
