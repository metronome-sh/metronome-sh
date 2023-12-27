import { z } from "zod";
import { MetronomeEvent } from "../events";
import {
  BrowserDataSchema,
  IdentifierSchema,
  MetronomeDataSchema,
} from "./sharedSchemas";

export const WebVitalEventSchema = z
  .object({
    timestamp: z.number(),
    metric: z.object({
      id: z.string(),
      name: z.enum(["CLS", "FID", "TTFB", "LCP", "FCP", "INP"]),
      value: z.number(),
      rating: z.enum(["good", "needs-improvement", "poor"]),
      // prettier-ignore
      navigationType: z.enum(["navigate", "reload", "back-forward", "back-forward-cache", "prerender", "restore"]),
    }),
  })
  .merge(BrowserDataSchema)
  .merge(IdentifierSchema)
  .merge(MetronomeDataSchema);

export const WebVitalIncomingEventSchema = WebVitalEventSchema.merge(
  z.object({ name: z.literal("web-vital") })
).omit({ ip: true, ua: true, version: true, adapter: true });

export class WebVitalEvent extends MetronomeEvent<
  z.infer<typeof WebVitalEventSchema>
> {
  public schema = WebVitalEventSchema;

  static isIncomingWebVitalEvent(
    data: any
  ): data is z.infer<typeof WebVitalIncomingEventSchema> {
    return WebVitalIncomingEventSchema.safeParse(data).success;
  }

  constructor(details: z.infer<typeof WebVitalEvent.prototype.schema>) {
    super("web-vital", details);
  }
}
