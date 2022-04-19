import { z } from "zod";

// TODO can validate the connection, routeId, routePath, and pathname more thoroughly
export const webVitalSchema = z.object({
  metric: z.object({
    name: z.enum(["CLS", "FID", "TTFB", "LCP", "FCP"]),
    value: z.number(),
    id: z.string(),
    delta: z.number(),
  }),
  connection: z.string(),
  routeId: z.string(),
  routePath: z.string().optional(),
  pathname: z.string(),
});
